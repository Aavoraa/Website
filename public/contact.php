<?php
/**
 * AAVORAA enquiry form handler (for GoDaddy / cPanel PHP hosting).
 *
 * Receives the JSON POST sent by the homepage enquiry form and emails it to RECIPIENT.
 * Returns {"ok": true} only when the server's mail system accepted the message, so the
 * site never shows a false "sent" confirmation. Requires PHP 7.4+ with mail() enabled
 * (standard on GoDaddy cPanel hosting).
 */

// ---------------------------------------------------------------- settings
const RECIPIENT = 'info@aavoraa.com';
const SUBJECT_PREFIX = 'Website enquiry';
const MAX_BODY_BYTES = 12000;
const RATE_LIMIT_SECONDS = 30; // one enquiry per visitor per 30 seconds

$INTERESTS = [
    'Software / Website / App',
    'Branding',
    'SEO / Digital Marketing / Lead Generation',
    'AI / Business Automation',
    'Business Consulting',
    'Not Sure Yet',
];

// ---------------------------------------------------------------- helpers
ini_set('display_errors', '0'); // never let PHP notices corrupt the JSON response

if (!function_exists('mb_substr')) {   // fallback if the mbstring extension is missing
    function mb_substr($s, $start, $len = null) { return $len === null ? substr($s, $start) : substr($s, $start, $len); }
    function mb_strlen($s) { return strlen($s); }
}

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

function respond(int $status, array $payload): void
{
    http_response_code($status);
    echo json_encode($payload);
    exit;
}

/** Single-line text: trim, strip control characters (prevents header injection), cap length. */
function clean_line($value, int $max): string
{
    $value = is_string($value) ? $value : '';
    $value = (string) preg_replace('/[\x00-\x1F\x7F]+/u', ' ', $value); // invalid UTF-8 -> ''
    $value = trim((string) preg_replace('/\s+/u', ' ', $value));
    return (string) mb_substr($value, 0, $max);
}

/** Multi-line text: keep line breaks, strip other control characters, cap length. */
function clean_text($value, int $max): string
{
    $value = is_string($value) ? $value : '';
    $value = str_replace(["\r\n", "\r"], "\n", $value);
    $value = (string) preg_replace('/[\x00-\x09\x0B-\x1F\x7F]+/u', ' ', $value);
    return (string) mb_substr(trim($value), 0, $max);
}

// ---------------------------------------------------------------- request checks
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, ['ok' => false, 'error' => 'method_not_allowed']);
}

// Same-site requests only (the form lives on this domain)
$host = strtolower((string) preg_replace('/:\d+$/', '', (string) ($_SERVER['HTTP_HOST'] ?? '')));
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '') {
    $originHost = strtolower((string) parse_url($origin, PHP_URL_HOST));
    if ($originHost !== $host) {
        respond(403, ['ok' => false, 'error' => 'forbidden']);
    }
}

$raw = file_get_contents('php://input', false, null, 0, MAX_BODY_BYTES + 1);
if ($raw === false || strlen($raw) > MAX_BODY_BYTES) {
    respond(413, ['ok' => false, 'error' => 'too_large']);
}
$data = json_decode($raw, true);
if (!is_array($data)) {
    respond(400, ['ok' => false, 'error' => 'invalid_json']);
}

// Honeypot (hidden field humans never fill): pretend success, send nothing
if (!empty($data['website'])) {
    respond(200, ['ok' => true]);
}

// Simple per-visitor rate limit
if (session_status() === PHP_SESSION_NONE) {
    @session_start();
}
$now = time();
if (isset($_SESSION['aav_last_enquiry']) && ($now - (int) $_SESSION['aav_last_enquiry']) < RATE_LIMIT_SECONDS) {
    respond(429, ['ok' => false, 'error' => 'too_many_requests']);
}

// ---------------------------------------------------------------- validation (mirrors the form)
$name     = clean_line($data['name'] ?? '', 120);
$email    = clean_line($data['email'] ?? '', 160);
$company  = clean_line($data['company'] ?? '', 160);
$interest = clean_line($data['interest'] ?? '', 80);
$offer    = clean_line($data['offer'] ?? '', 120);
$message  = clean_text($data['message'] ?? '', 1500);

$errors = [];
if (mb_strlen($name) < 2)    { $errors[] = 'name'; }
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) { $errors[] = 'email'; }
if (mb_strlen($company) < 2) { $errors[] = 'company'; }
if (!in_array($interest, $INTERESTS, true)) { $errors[] = 'interest'; }
if ($errors) {
    respond(422, ['ok' => false, 'error' => 'validation', 'fields' => $errors]);
}

// Campaign attribution sent by the site (optional)
$attribution = [];
foreach (['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'landing_page', 'referrer', 'page'] as $key) {
    if (!empty($data[$key])) {
        $attribution[$key] = clean_line($data[$key], 200);
    }
}

// ---------------------------------------------------------------- compose and send
$lines = [
    'New enquiry from the AAVORAA website',
    str_repeat('-', 40),
    'Name:            ' . $name,
    'Work email:      ' . $email,
    'Company:         ' . $company,
    'Needs help with: ' . $interest,
];
if ($offer !== '') {
    $lines[] = 'Interested in:   ' . $offer;
}
$lines[] = '';
$lines[] = 'Challenge:';
$lines[] = $message !== '' ? $message : '(not provided)';
if ($attribution) {
    $lines[] = '';
    $lines[] = 'Source:';
    foreach ($attribution as $k => $v) {
        $lines[] = '  ' . $k . ': ' . $v;
    }
}
$lines[] = '';
$lines[] = 'Received: ' . gmdate('Y-m-d H:i') . ' UTC';
$body = implode("\n", $lines);

$domain = preg_replace('/^www\./', '', $host) ?: 'aavoraa.com';
$fromAddress = 'no-reply@' . $domain;
$subject = SUBJECT_PREFIX . ': ' . $company . ' — ' . $interest;
$encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';

$headers = [
    'From: AAVORAA Website <' . $fromAddress . '>',
    'Reply-To: ' . trim((string) preg_replace('/[<>",;:]/', '', $name)) . ' <' . $email . '>',
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'X-Mailer: AAVORAA-Website',
];

$sent = @mail(RECIPIENT, $encodedSubject, $body, implode("\r\n", $headers), '-f' . $fromAddress);
if (!$sent) {
    // some mail setups reject the -f envelope flag; retry without it
    $sent = @mail(RECIPIENT, $encodedSubject, $body, implode("\r\n", $headers));
}

if (!$sent) {
    respond(502, ['ok' => false, 'error' => 'mail_failed']);
}

$_SESSION['aav_last_enquiry'] = $now;
respond(200, ['ok' => true]);
