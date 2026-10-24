/**
 * AAVORAA homepage content.
 * Source of truth: "MASTER PROMPT - AAVORAA Website Home Page.docx".
 * Contact details and project facts: "AAVORAA_Portfolio_BlackGold.pptx" (AAVORAA's own portfolio deck).
 * Edit content here rather than in the components.
 */

const env = import.meta.env;

export const integrations = {
  formEndpoint: (env.PUBLIC_FORM_ENDPOINT as string | undefined) || '',
  bookingUrl: (env.PUBLIC_BOOKING_URL as string | undefined) || '',
  ga4Id: (env.PUBLIC_GA4_ID as string | undefined) || '',
  gscVerification: (env.PUBLIC_GSC_VERIFICATION as string | undefined) || '',
};

/** Where "Book a Discovery Call" goes: the booking tool when configured, otherwise the enquiry form. */
export const bookingHref = integrations.bookingUrl || '/contact/';
export const bookingIsExternal = Boolean(integrations.bookingUrl);

export const site = {
  name: 'AAVORAA',
  url: 'https://aavoraa.com',
  title: 'AAVORAA | AI-Enabled Software, Branding & Business Growth',
  description:
    'Build smarter with AAVORAA. Explore software development, branding, digital marketing and AI automation solutions designed to help businesses transform and grow.',
  tagline: 'Build. Transform. Grow.',
  logoTagline: 'Beyond Possibilities', // the official logo tagline
  summary:
    'AAVORAA is an AI-enabled business transformation company that helps businesses build, transform and grow through software, digital experiences, branding, marketing, automation and business consulting.',
  // From AAVORAA's portfolio deck (slides 1 & 26).
  contact: {
    phoneDisplay: '+91 93427 21163',
    phoneHref: 'tel:+919342721163',
    email: 'info@aavoraa.com',
    location: 'Coimbatore, Tamil Nadu, India',
  },
};

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'Solutions', href: '/solutions/' },
  { label: 'Services', href: '/services/' },
  { label: 'Industries', href: '/industries/' },
  { label: 'Our Work', href: '/work/' },
  { label: 'Insights', href: '/insights/' },
  { label: 'About', href: '/about/' },
];

export type PillarKey = 'build' | 'brand' | 'grow' | 'transform';

/** A capability with its Lucide icon name (see src/components/LucideIcon.astro). */
export type Capability = { name: string; icon: string };

export const pillars: {
  key: PillarKey;
  label: string;   // text label used across the site
  visual: string;  // single word used inside the pillar artwork (unchanged)
  short: string;
  headline: string;
  description: string;
  capabilities: Capability[];
  cta: string;
}[] = [
  {
    key: 'build',
    label: 'Software Development',
    visual: 'Build',
    short: 'Software and digital products',
    headline: 'Technology Built Around Your Business.',
    description:
      'From business websites to custom software and digital products, we create digital solutions designed around your objectives, users and workflows.',
    capabilities: [
      { name: 'Custom Software Development', icon: 'CodeXml' },
      { name: 'Website Design & Development', icon: 'Globe' },
      { name: 'Web Applications', icon: 'AppWindow' },
      { name: 'Mobile App Development', icon: 'Smartphone' },
      { name: 'SaaS Product Development', icon: 'Cloud' },
      { name: 'AI-Enabled Digital Solutions', icon: 'Sparkles' },
    ],
    cta: 'Explore Software Solutions',
  },
  {
    key: 'brand',
    label: 'Branding',
    visual: 'Brand',
    short: 'Brand strategy and visual identity',
    headline: 'Build a Brand People Remember.',
    description:
      'Develop a distinctive market position and a consistent brand identity that communicates your value and supports long-term business growth.',
    capabilities: [
      { name: 'Brand Strategy and Positioning', icon: 'Target' },
      { name: 'USP and Tagline', icon: 'MessageSquareQuote' },
      { name: 'Logo and Visual Identity', icon: 'PenTool' },
      { name: 'Brand Guidelines', icon: 'BookOpen' },
      { name: 'Creative Direction', icon: 'Palette' },
      { name: 'Digital Brand Experiences', icon: 'MonitorSmartphone' },
    ],
    cta: 'Build Your Brand',
  },
  {
    key: 'grow',
    label: 'Marketing & Lead Generation',
    visual: 'Grow',
    short: 'Marketing and lead generation',
    headline: 'Turn Digital Attention Into Business Opportunities.',
    description:
      'Build a connected marketing system that improves visibility, attracts relevant audiences and helps convert demand into qualified enquiries.',
    capabilities: [
      { name: 'SEO and AI Search Visibility', icon: 'Search' },
      { name: 'Digital Marketing', icon: 'Megaphone' },
      { name: 'Performance Marketing', icon: 'ChartColumnIncreasing' },
      { name: 'Social Media Marketing', icon: 'Share2' },
      { name: 'B2B Lead Generation', icon: 'Users' },
      { name: 'Conversion Rate Optimization', icon: 'MousePointerClick' },
    ],
    cta: 'Explore Growth Solutions',
  },
  {
    key: 'transform',
    label: 'AI & Business Automation',
    visual: 'Transform',
    short: 'AI and business automation',
    headline: 'Replace Repetitive Work With Smarter Processes.',
    description:
      'Identify opportunities to streamline workflows, connect systems and use practical AI and automation to improve operational efficiency.',
    capabilities: [
      { name: 'AI Workflow Automation', icon: 'Bot' },
      { name: 'Business Process Automation', icon: 'Workflow' },
      { name: 'System Integrations', icon: 'Plug' },
      { name: 'Operational Workflow Design', icon: 'Network' },
      { name: 'AI Readiness and Consulting', icon: 'Lightbulb' },
      { name: 'Digital Transformation Consulting', icon: 'RefreshCcw' },
    ],
    cta: 'Explore Automation',
  },
];

export const approach = [
  { step: 'Understand', text: 'Understand the business, challenges and goals.' },
  { step: 'Strategize', text: 'Identify the right strategy and priorities.' },
  { step: 'Build', text: 'Build the technology, brand and digital experiences.' },
  { step: 'Connect', text: 'Connect processes, platforms and marketing systems.' },
  { step: 'Grow', text: 'Improve, measure and scale what works.' },
];

/** Why AAVORAA — "reality check" before/after pairs (the challenges, and what changes when they're connected). */
export const realityCheck = [
  {
    before: { title: 'Technology Without Strategy', text: 'Software and websites that don’t support business goals.', icon: 'CodeXml' },
    after: { title: 'Technology Built Around Your Goals', text: 'Software, sites and apps designed around your objectives.', icon: 'CodeXml' },
  },
  {
    before: { title: 'Branding Without Differentiation', text: 'Customers can’t see why they should choose you.', icon: 'Palette' },
    after: { title: 'A Brand People Remember', text: 'A clear position and one consistent identity.', icon: 'Palette' },
  },
  {
    before: { title: 'Marketing Without a System', text: 'Activity, but no clear path to qualified enquiries.', icon: 'Megaphone' },
    after: { title: 'A Connected Growth System', text: 'SEO, campaigns and conversion working together.', icon: 'Megaphone' },
  },
  {
    before: { title: 'Operations Without Automation', text: 'Teams lost in repetitive, manual work.', icon: 'Workflow' },
    after: { title: 'Smarter, Automated Operations', text: 'Practical automation that frees your team.', icon: 'Workflow' },
  },
];

export const warexxCapabilities = [
  { title: 'Supplier document management', text: 'Scan and manage supplier documents.' },
  { title: 'Procurement & receiving', text: 'Connect procurement and receiving workflows.' },
  { title: 'Inventory & stock movement', text: 'Track inventory and stock movements.' },
  { title: 'QR-based traceability', text: 'Support QR-based traceability.' },
  { title: 'Warehouse & store operations', text: 'Connect warehouse and store operations.' },
  { title: 'Operational visibility', text: 'Improve operational visibility.' },
];

/** Industries & fields AAVORAA works in (portfolio deck, slide 11). */
export const industries = [
  { name: 'Retail & E-commerce', icon: 'ShoppingBag' },
  { name: 'Textile & Apparel', icon: 'Shirt' },
  { name: 'Real Estate', icon: 'Building2' },
  { name: 'Education & EdTech', icon: 'GraduationCap' },
  { name: 'Healthcare & Wellness', icon: 'HeartPulse' },
  { name: 'SaaS & Technology', icon: 'Cpu' },
  { name: 'Finance & Mortgage', icon: 'Landmark' },
  { name: 'Manufacturing', icon: 'Factory' },
  { name: 'Logistics & Warehousing', icon: 'Warehouse' },
  { name: 'Automobile', icon: 'Car' },
  { name: 'Hospitality & Resorts', icon: 'Hotel' },
  { name: 'Food & Beverages', icon: 'UtensilsCrossed' },
  { name: 'Beauty & Cosmetics', icon: 'Sparkle' },
  { name: 'Sports & Fitness', icon: 'Dumbbell' },
  { name: 'Construction & Interiors', icon: 'HardHat' },
  { name: 'Recruitment & Staffing', icon: 'BriefcaseBusiness' },
];

/**
 * Case studies — every fact below is taken from AAVORAA's portfolio deck (slides 12–18).
 * Each one gets its own page at /work/<slug>/. `featured` ones also appear on the homepage.
 * `image` is optional: add a path in /public/ when approved project visuals are available.
 * Confirm client permission before publishing names.
 */
export type Case = {
  slug: string;
  client: string;
  sector: string;
  location?: string;
  pillars: PillarKey[];
  services: string[];
  challenge: string;
  research?: string;
  solution: string;
  delivered?: string[];
  outcome: string;
  metric?: { value: string; label: string };
  tools?: string[];
  featured?: boolean;
  art?: 'warehouse' | 'automation' | 'realestate' | 'search';
  image?: string;
  imageAlt?: string;
};

export const cases: Case[] = [
  {
    slug: 'essa-warehouse-pos',
    client: 'ESSA Garments / Taqua Silks',
    featured: true,
    art: 'warehouse',
    sector: 'Textile retail · Tirupur',
    location: 'Tirupur, India',
    pillars: ['build', 'transform'],
    services: ['Software', 'Warehouse & POS'],
    challenge: 'Manual GRN and Tally work, no warehouse-to-shop stock visibility and supplier invoices in varied formats.',
    research:
      'A module review with the client’s operations team. LR Entry and Invoice Entry were built first, with MRP reverse-calculation pricing and mandatory attributes before a GRN can be saved.',
    solution:
      'A warehouse platform with document intake, purchases/GRN, inventory with piece QRs, returns, payments, a floor app and POS, migrated to AWS.',
    delivered: [
      'Document intake that learns each supplier’s invoice format',
      'Purchases / GRN, inventory with piece QRs and carton labels',
      'Outward / inward movement, returns and payments',
      '33 reports with English / Tamil natural-language query and voice',
      'A phone app for the warehouse floor and the Taqua POS',
      'Cloud deployment on AWS with role-based access',
    ],
    outcome: 'Live cloud platform in phased rollout, with 33 reports and a floor app replacing manual GRN and Tally entry.',
    metric: { value: '33', label: 'reports on one platform' },
    tools: ['Python / Flask', 'React', 'Supabase → AWS'],
  },
  {
    slug: 'v3-data-solutions',
    client: 'V3 Data Solutions',
    featured: true,
    art: 'automation',
    sector: 'B2B data & technology',
    pillars: ['transform', 'build'],
    services: ['Automation', 'Website'],
    challenge: 'Manual reporting and CRM work consuming the team’s week, and a website that was not converting.',
    research: 'Process mapping to find the highest-hour workflows first, and a site audit for speed and conversion.',
    solution: 'Process mapping, workflow automation, CRM integration, automated reporting and a new website build.',
    delivered: ['Workflow automation for the highest-hour processes', 'CRM integration', 'Automated reporting', 'A new, conversion-focused website'],
    outcome: '60% less manual workload — 40 hours saved every week.',
    metric: { value: '60%', label: 'less manual workload' },
    tools: ['Automation', 'CRM', 'Reporting'],
  },
  {
    slug: 'nova-pinnacle',
    client: 'Nova Pinnacle',
    featured: true,
    art: 'realestate',
    sector: 'Real estate',
    pillars: ['grow'],
    services: ['Lead Generation'],
    challenge: 'A lead engine that produced volume but not site visits.',
    research: 'Geo-targeted intent audiences, and a nurture sequence designed from lead to booked visit.',
    solution: 'Geo-targeted intent audiences and a nurture sequence from lead to booked visit.',
    delivered: ['Geo-targeted ad campaigns', 'Lead generation funnels', 'A nurture sequence from enquiry to booked site visit'],
    outcome: '500+ qualified leads turned into 250+ booked site visits.',
    metric: { value: '250+', label: 'site visits booked' },
    tools: ['Geo ads', 'Lead gen', 'Nurture'],
  },
  {
    slug: 'fairway-heritage-group',
    client: 'Fairway Heritage Group',
    featured: true,
    art: 'search',
    sector: 'Mortgage network · USA',
    location: 'Texas & Florida, USA',
    pillars: ['grow'],
    services: ['SEO', 'AI Search (GEO)'],
    challenge: 'Seven branches and 17+ loan officers with different specialisms needing search visibility.',
    research:
      'Discovery across the existing stack, with GEO (AI-engine visibility) ranked first, SEO second and Google Business Profile third, plus a branch-level specialisation map.',
    solution: 'A multi-branch GEO, SEO and Google Business Profile audit framework with partner-content recommendations.',
    delivered: ['Multi-branch GEO / SEO / GBP audit framework', 'Branch-level specialisation map', 'Partner-content recommendations'],
    outcome: 'A prioritised GEO, SEO and GBP roadmap per branch and loan-officer specialism.',
    metric: { value: '7', label: 'branches · 17+ loan officers' },
    tools: ['Search Console', 'Semrush', 'GBP', 'WordPress'],
  },
  {
    slug: 'taqua-silks-growth',
    client: 'Taqua Silks',
    sector: 'Textile & saree retail · Tirupur',
    location: 'Tirupur, India',
    pillars: ['transform', 'brand'],
    services: ['Growth Consulting', 'Branding'],
    challenge: 'A slowing monthly revenue pace, no CRM follow-up, stale collections and no warehouse-to-shop stock visibility.',
    research:
      'A POS data audit and interviews across four departments traced the decline to customer retention rather than acquisition, followed by a transformation blueprint and management pitch.',
    solution:
      'POS data audit and interviews across four departments, a transformation blueprint, organisation restructure with role charters and SOPs, and a collection naming system.',
    delivered: [
      'Organisation restructure with 19 role charters, an SOP handbook and an 8-week rollout',
      'A leadership session for 14 managers',
      'The collection “Edit” naming system',
      'A festive joint-KPI SOP with a weekly review room',
    ],
    outcome: 'Customer data capture lifted from 52% to 84%, creating a usable base for loyalty and follow-up.',
    metric: { value: '52% → 84%', label: 'customer data capture' },
    tools: ['Excel', 'Whisper', 'Canva', 'Notion'],
  },
  {
    slug: 'pothys',
    client: 'Pothys',
    sector: 'Textile & saree retail chain · Tamil Nadu',
    location: 'Chennai & Tamil Nadu, India',
    pillars: ['transform'],
    services: ['Growth Consulting'],
    challenge: 'Sustaining growth across large-format stores as customers compare online before they walk in.',
    research:
      'A store, category and customer-journey audit, benchmarking against South Indian textile-retail leaders, and retention and repeat-visit analysis.',
    solution:
      'An audit-led growth roadmap covering retention, category mix and store-experience priorities, with an execution calendar and review cadence for management.',
    delivered: ['Store, category and customer-journey audit', 'Growth roadmap with an execution calendar', 'Quarterly review cadence for leadership'],
    outcome:
      'Prioritised growth roadmap and quarterly review cadence delivered to leadership; retention and store-experience workstreams defined for rollout.',
    tools: ['Excel', 'Looker Studio', 'Notion'],
  },
  {
    slug: 'kpr-mill',
    client: 'KPR Mill Limited',
    sector: 'Integrated textiles & apparel · Coimbatore',
    location: 'Coimbatore, India',
    pillars: ['brand'],
    services: ['Branding'],
    challenge: 'A diversified textile group needing one consistent brand voice across corporate, apparel and institutional communication.',
    research:
      'A brand audit across corporate collateral and digital touchpoints, with positioning aligned to the group’s scale and sustainability story.',
    solution: 'A brand identity system and corporate communication collateral — guidelines, templates and a presentation kit.',
    delivered: ['Brand identity system', 'Brand guidelines and templates', 'Corporate presentation kit'],
    outcome: 'Consistent brand system deployed across corporate collateral and presentations.',
    tools: ['Adobe CC', 'Canva Pro', 'Figma'],
  },
  {
    slug: 'holy-sai-international-school',
    client: 'Holy Sai International School',
    sector: 'Cambridge IGCSE school group · Tamil Nadu',
    location: 'Chennai · Coimbatore · Pollachi',
    pillars: ['brand', 'build'],
    services: ['Brand & Digital Audit', 'Software'],
    challenge: 'Three properties with an admissions target and no single platform bridging management and parents.',
    research:
      'A brand and digital audit covering brand, digital, competitors, software and compliance, with IGCSE competitor benchmarking at state, regional and national levels.',
    solution:
      'A brand and digital audit, a growth blueprint and “Smart School 360” — a school ERP/CRM app with management and parent dashboards.',
    delivered: [
      'Brand & digital audit',
      'Growth blueprint (brand → audience → ambassadors)',
      '“Smart School 360” ERP / CRM app scope with management and parent dashboards',
    ],
    outcome: 'Audit and growth blueprint adopted; the Smart School 360 platform scoped in tiered packages.',
    tools: ['React', 'Node', 'CRM', 'GA4'],
  },
  {
    slug: 'greens-properties-amaya',
    client: 'Greens Properties — Amaya River Retreat',
    sector: 'Luxury villa plots · Coimbatore',
    location: 'Coimbatore, India',
    pillars: ['grow', 'brand'],
    services: ['Lead Generation', 'Branding', 'CRM'],
    challenge: 'An 80-acre, 150-plot resort villa project needing premium buyers for its remaining plots.',
    research:
      'Project value calculation, Tamil Nadu and India market, audience and competitor analysis, and a brand and marketing gap analysis against local and national benchmarks.',
    solution: 'Property branding and CRM, a conversion website with SEO and a funnel-based performance plan with lead-sheet automation.',
    delivered: [
      'Property branding and CRM',
      'Conversion website with SEO',
      'Funnel-based performance plan across three projects',
      'Lead-sheet automation and monthly review',
    ],
    outcome: 'A funnel-based lead engine across three projects with CRM, lead-sheet automation and monthly review.',
    tools: ['Meta', 'Google Ads', 'CRM', 'Canva'],
  },
  {
    slug: 'property-wealth',
    client: 'Property Wealth',
    sector: 'Property investment advisory',
    pillars: ['grow'],
    services: ['Performance Marketing'],
    challenge: 'Reaching investment-ready buyers profitably across search and social.',
    research: 'Investor-intent audiences and lookalikes, with lead-quality scoring built into the funnel.',
    solution: 'Google and Meta lead funnels, landing pages, lead-sheet automation and ROAS reporting.',
    delivered: ['Google + Meta lead funnels', 'Landing pages', 'Lead-sheet automation', 'Monthly ROAS / CPL reporting'],
    outcome: 'Performance funnel live with lead-quality scoring and monthly ROAS / CPL reporting.',
    tools: ['Google Ads', 'Meta', 'CRM', 'Looker'],
  },
  {
    slug: 'hikigai-ai',
    client: 'Hikigai AI',
    sector: 'AI products · USA',
    location: 'USA',
    pillars: ['grow'],
    services: ['Performance Marketing'],
    challenge: 'Generating qualified demand for an AI product in a crowded, fast-moving category.',
    research: 'ICP and intent mapping, with a funnel-staged campaign architecture across search and paid social.',
    solution: 'Google and Meta demand-generation campaigns with creative testing, retargeting and weekly optimisation.',
    delivered: ['Funnel-staged campaign architecture', 'Creative testing and retargeting', 'Weekly optimisation and funnel-stage reporting'],
    outcome: 'Demand-generation engine live with funnel-stage reporting and cost-per-lead optimisation.',
    tools: ['Google Ads', 'Meta', 'GA4', 'Looker'],
  },
  {
    slug: 'taqua-silks-social',
    client: 'Taqua Silks — Instagram to Store',
    sector: 'Social commerce · Tirupur',
    location: 'Tirupur, India',
    pillars: ['grow', 'brand'],
    services: ['Social Media', 'Content', 'Video'],
    challenge: 'Instagram was the walk-in driver but ran without a calendar, collection naming or festive campaign architecture.',
    research:
      'An Instagram growth plan: most of the regular base wanted newness, so a collection-launch cadence was set, with the festive offer designed as a joint marketing–sales KPI.',
    solution: 'A content calendar and reels, collection “Edits”, festive creatives, testimonial video tracks and “Collections Loaded” teasers.',
    delivered: [
      'Calendar and reels, including Tamil-script content for the core base',
      'Seven collection “Edits” — Gentlemen’s, Elegance, Weaver’s, Bridal, Tiny Tots, Everyday and Classic',
      'Festive offer creatives and two testimonial video tracks',
    ],
    outcome: 'Around 16K followers, with walk-ins from a catchment reaching Kerala.',
    metric: { value: '~16K', label: 'Instagram followers' },
    tools: ['Instagram', 'Canva', 'CapCut', 'Premiere'],
  },
  {
    slug: 'essa-garments-d2c',
    client: 'ESSA Garments — essa.in',
    sector: 'D2C apparel · Tirupur',
    location: 'Tirupur, India',
    pillars: ['brand', 'grow'],
    services: ['Design', 'Content', 'E-commerce'],
    challenge: 'A D2C store with inconsistent product imagery and no campaign creative system.',
    research: 'A brand and catalogue audit, with a creative system aligned to the Taqua / ESSA family identity.',
    solution: 'Photoshoot direction, catalogue and lookbook design, campaign creative sets and D2C store creatives.',
    delivered: ['Photoshoot direction', 'Catalogue and lookbook design', 'Campaign creative sets', 'D2C store creatives and a growth-marketing programme'],
    outcome: 'Consistent catalogue and campaign creative system across essa.in and social.',
    tools: ['Adobe CC', 'Canva Pro', 'Shopify'],
  },
  {
    slug: 'lucas-health-tech',
    client: 'Lucas Health Tech',
    sector: 'Enterprise healthcare technology · USA',
    location: 'USA',
    pillars: ['build', 'transform'],
    services: ['Website', 'Automation'],
    challenge: 'A website that no longer reflected enterprise healthcare technology, clinical systems and AI-governance work.',
    research: 'A repositioning workshop, an SEO-ready structure so search can be layered in later, and an enquiry flow mapped to CRM.',
    solution: 'A repositioning workshop, website redesign with an SEO-ready structure and enquiry flow mapped to CRM.',
    delivered: ['Repositioning workshop', 'Website redesign on the client’s hosting', 'Care plan — hosting, maintenance and support', 'Enquiry automation into CRM'],
    outcome: 'Repositioned enterprise site live with a care plan and automated enquiry hand-off.',
    tools: ['WordPress', 'CRM', 'GA4'],
  },
  {
    slug: 'itp-recruitment',
    client: 'ITP – International Recruitment Specialists',
    sector: 'Recruitment · UK',
    location: 'United Kingdom',
    pillars: ['grow'],
    services: ['B2B Lead Generation'],
    challenge: 'Winning new employer clients in a crowded UK recruitment market without a large sales team.',
    research: 'An ICP by sector and hiring signal, an account list and persona map, and cold email + LinkedIn cadence design.',
    solution: 'An ICP by sector and hiring signal, verified account lists, and email + LinkedIn cadences with meeting booking into CRM.',
    delivered: ['Verified account lists', 'Email + LinkedIn cadences', 'Reply handling and meeting booking into CRM'],
    outcome: 'Outbound engine live with cadenced outreach and booked-meeting reporting.',
    tools: ['Sales Navigator', 'Apollo', 'CRM'],
  },
  {
    slug: 'prisms-group',
    client: 'Prisms Group',
    sector: 'Diversified business group · UAE',
    location: 'UAE',
    pillars: ['grow'],
    services: ['SEO'],
    challenge: 'A group website under-performing for GCC search intent across multiple business lines.',
    research: 'Technical and on-page audit, GCC keyword architecture by business line and competitor visibility benchmarking.',
    solution:
      'Technical fixes, on-page optimisation and content architecture for the group site, with monthly ranking and traffic reporting.',
    delivered: ['Technical and on-page audit and fixes', 'GCC keyword architecture by business line', 'Monthly ranking and traffic reporting'],
    outcome: 'Search-ready group site with a business-line keyword architecture and monthly reporting in place.',
    tools: ['Search Console', 'Screaming Frog', 'Semrush'],
  },
];

export const entryPoints = [
  {
    title: 'Website & SEO Growth Audit',
    text: 'A review of how your website and search presence support enquiries, with prioritised recommendations.',
    interest: 'SEO / Digital Marketing / Lead Generation',
  },
  {
    title: 'Software & Digital Product Consultation',
    text: 'A focused conversation to clarify requirements, priorities and the right approach for your software or product.',
    interest: 'Software / Website / App',
  },
  {
    title: 'AI & Business Automation Opportunity Assessment',
    text: 'A look at repetitive processes and disconnected systems to identify where automation can deliver practical value.',
    interest: 'AI / Business Automation',
  },
];

export const interestOptions = [
  'Software / Website / App',
  'Branding',
  'SEO / Digital Marketing / Lead Generation',
  'AI / Business Automation',
  'Business Consulting',
  'Not Sure Yet',
];

export const faqs = [
  {
    q: 'What does AAVORAA do?',
    a: 'AAVORAA is an AI-enabled business transformation company. We help businesses build, transform and grow by connecting software development, branding, marketing, automation and business consulting around one business strategy.',
  },
  {
    q: 'Is AAVORAA only a software development company?',
    a: 'No. We build software, websites and applications, and we also deliver branding, marketing and automation. Our role is to act as a business transformation partner that connects these capabilities to solve real business problems.',
  },
  {
    q: 'What types of software, websites and applications can AAVORAA build?',
    a: 'Business websites, web applications, mobile apps, SaaS products, custom operational software and AI-enabled digital solutions. WAREXX, our warehouse and operations platform, is one example of the software we build.',
  },
  {
    q: 'How can AAVORAA help improve our branding and marketing?',
    a: 'We work on brand strategy, positioning, USP, tagline and visual identity, then connect it to SEO, AI search visibility, digital and performance marketing, social media, B2B lead generation and conversion optimisation.',
  },
  {
    q: 'What business processes can be automated using AI?',
    a: 'It depends on how your business runs. Common candidates include repetitive data entry, document handling, reporting, lead routing, CRM follow-up and workflows that move information between systems. We start by identifying where automation will deliver practical value.',
  },
  {
    q: 'Can we work with AAVORAA for a single service?',
    a: 'Yes. Many engagements start with a single need, such as a website, a brand identity or an automation project. We will still consider how that piece fits with the rest of your business.',
  },
  {
    q: 'How does AAVORAA approach project pricing?',
    a: 'Pricing depends on scope, complexity and requirements. After understanding what you need, we define the scope and share a proposal so you know what is included before work begins.',
  },
  {
    q: 'How long does a typical project take?',
    a: 'Timelines depend on project complexity and requirements. We agree on scope, phases and milestones during planning so expectations are clear from the start.',
  },
  {
    q: 'Does AAVORAA work with businesses outside Coimbatore?',
    a: 'Yes. AAVORAA is based in Coimbatore, Tamil Nadu, and works with businesses across India, with a growing focus on GCC and international markets.',
  },
  {
    q: 'How do we get started?',
    a: 'Book a discovery call or share your requirements through the enquiry form. We will use the details to understand your goals and whether we are a good fit.',
  },
];

/** About AAVORAA — headline numbers (10+ years / 500+ projects from AAVORAA; the rest from the portfolio deck). */
export const stats = [
  { value: 10, suffix: '+', label: 'Years of experience', icon: 'Award' },
  { value: 500, suffix: '+', label: 'Projects delivered', icon: 'FolderCheck' },
  { value: 30, suffix: '+', label: 'Brands served', icon: 'BadgeCheck' },
  { value: 20, suffix: '+', label: 'Specialists', icon: 'Users' },
];

export const aboutFacts = [
  { icon: 'MapPin', text: 'Coimbatore, India' },
  { icon: 'Globe2', text: 'India · GCC · Global' },
  { icon: 'History', text: 'Evolved from Phoenixx IT' },
  { icon: 'Boxes', text: 'Makers of WAREXX' },
];

/** Clients — logos from the AAVORAA portfolio deck (slide 22). Confirm permissions before launch. */
export const clients: { name: string; logo?: string; src?: string }[] = [
  { name: 'V3 Data Solutions', logo: 'v3-data-solutions' },
  { name: 'Greens Property Developers', logo: 'greens-property-developers' },
  { name: 'ESSA Garments', logo: 'essa-garments' },
  { name: 'Taqua Silks', logo: 'taqua-silks' },
  { name: 'Pothys', logo: 'pothys' },
  { name: 'KPR Mill', logo: 'kpr-mill' },
  { name: 'IBM', logo: 'ibm' },
  { name: 'TVS', logo: 'sundaram-motors' },
  { name: 'MG Motor', logo: 'morris-garages' },
  { name: 'Nova Pinnacle', logo: 'nova-pinnacle' },
  { name: 'Property Wealth', logo: 'property-wealth' },
  { name: 'MaxCorp', logo: 'maxcorp' },
  { name: 'Hikigai AI' },
  { name: 'Oceans Talent', logo: 'oceans-talent' },
  { name: 'Prisms Group', logo: 'prisms-group' },
  { name: 'Klassy Homes', logo: 'klassy-homes' },
  { name: 'Rubfila International', logo: 'rubfila-international' },
  { name: 'Ramani Cars', logo: 'ramani-cars' },
  { name: 'i-Cons Technologies', logo: 'i-cons-technologies' },
  { name: 'Coliseum Sports', logo: 'coliseum-sports' },
  { name: 'WAREXX', src: '/brand/warexx-logo-dark.png' },
  { name: 'Cosmic Park Resorts' },
];

/** Tools & platforms the team works with (portfolio deck). `si` = Simple Icons export name. */
export const tools = [
  { name: 'Figma', si: 'siFigma' },
  { name: 'Adobe Creative Cloud', si: 'siAdobe' },
  { name: 'Canva', si: 'siCanva' },
  { name: 'Notion', si: 'siNotion' },
  { name: 'React', si: 'siReact' },
  { name: 'Next.js', si: 'siNextdotjs' },
  { name: 'Node.js', si: 'siNodedotjs' },
  { name: 'Python', si: 'siPython' },
  { name: 'Flask', si: 'siFlask' },
  { name: 'Supabase', si: 'siSupabase' },
  { name: 'AWS', si: 'siAmazonwebservices' },
  { name: 'GitHub', si: 'siGithub' },
  { name: 'WordPress', si: 'siWordpress' },
  { name: 'Shopify', si: 'siShopify' },
  { name: 'Google Analytics', si: 'siGoogleanalytics' },
  { name: 'Search Console', si: 'siGooglesearchconsole' },
  { name: 'Semrush', si: 'siSemrush' },
  { name: 'Google Ads', si: 'siGoogleads' },
  { name: 'Meta', si: 'siMeta' },
  { name: 'Looker Studio', si: 'siLooker' },
  { name: 'WATI', si: '', lucide: 'MessageCircleMore' },
  { name: 'Zapier', si: 'siZapier' },
  { name: 'Make', si: 'siMake' },
  { name: 'n8n', si: 'siN8n' },
  { name: 'HubSpot', si: 'siHubspot' },
];
