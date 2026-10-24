/**
 * Content for the inner pages (About, Services, Solutions, Industries, Contact).
 * Facts come from AAVORAA's portfolio deck ("AAVORAA_Portfolio_BlackGold.pptx"); nothing here is invented proof.
 */
import type { PillarKey, Case } from './site';

/** URL slug for each service pillar: /services/<slug>/ */
export const pillarSlug: Record<PillarKey, string> = {
  build: 'software-development',
  brand: 'branding',
  grow: 'marketing-lead-generation',
  transform: 'ai-business-automation',
};
export const servicePath = (k: PillarKey) => `/services/${pillarSlug[k]}/`;

/** Pillar-page extras: hero copy and what each engagement usually starts with. */
export const pillarPage: Record<PillarKey, { eyebrow: string; intro: string; outcomes: string[]; startsWith: string; interest: string }> = {
  build: {
    eyebrow: 'Software Development',
    intro:
      'Websites, web and mobile apps, SaaS products and custom operational software — built around how your business actually works, not around a template.',
    outcomes: ['Software your team actually uses on the floor', 'Websites built to convert, not just to look good', 'Cloud platforms that grow with the business'],
    startsWith: 'Most software engagements start with a requirements and module review with the people who will use the system every day.',
    interest: 'Software / Website / App',
  },
  brand: {
    eyebrow: 'Branding',
    intro:
      'Brand strategy, positioning, USP and tagline, visual identity and the creative studio that keeps every touchpoint — store, social and sales — speaking with one voice.',
    outcomes: ['A clear position customers understand quickly', 'One consistent identity across every touchpoint', 'A creative system your team can keep using'],
    startsWith: 'Brand projects start with an audit of how the business is seen today, then positioning before any design work.',
    interest: 'Branding',
  },
  grow: {
    eyebrow: 'Marketing & Lead Generation',
    intro:
      'SEO and AI-search visibility, performance and social marketing, WhatsApp journeys, e-commerce growth and B2B lead generation — connected into one system that turns attention into qualified enquiries.',
    outcomes: ['Visibility on Google and in AI answers', 'Campaigns measured by leads and revenue, not reach', 'A pipeline that flows into a CRM you own'],
    startsWith: 'Growth engagements usually start with an audit of your website, search presence and funnel to find where enquiries are leaking.',
    interest: 'SEO / Digital Marketing / Lead Generation',
  },
  transform: {
    eyebrow: 'AI & Business Automation',
    intro:
      'Process mapping, workflow and CRM automation, system integrations, practical AI and growth consulting — removing repetitive work and giving leadership a clear operating model.',
    outcomes: ['Hours of manual work handed to reliable workflows', 'Systems that share data instead of copying it', 'A transformation roadmap leadership can run'],
    startsWith: 'Automation work starts with an opportunity assessment: we map the highest-hour, most repetitive workflows first.',
    interest: 'AI / Business Automation',
  },
};

export type ServiceDetail = {
  name: string;
  icon: string;
  summary: string;
  deliverables: string[];
  stack: string;
  model: string;
  proof?: { text: string; client: string; slug?: string };
};

/** Service deep-dives per pillar — deliverables, stack, timeline/model and proof from the deck (slides 4–10). */
export const serviceDetails: Record<PillarKey, ServiceDetail[]> = {
  build: [
    {
      name: 'Custom Software Development',
      icon: 'CodeXml',
      summary:
        'Custom operational software — ERP, warehouse, POS, document intake and mobile floor apps — built around how the business actually works.',
      deliverables: [
        'Requirements and module review with your operations team',
        'Purchase / GRN, inventory, outward / inward, returns and payments',
        'Document intake: invoice photo or scan → structured data',
        'POS and mobile warehouse apps',
        'Reports with English / Tamil natural-language query and voice',
        'Cloud deployment on AWS with role-based access',
      ],
      stack: 'Python / Flask · React · Supabase → AWS · GitHub',
      model: 'Phased build with module-wise approvals, then ongoing support',
      proof: { text: 'Warehouse + POS platform, 33 reports and a floor app for a ~100-staff retailer.', client: 'ESSA Garments / Taqua Silks', slug: 'essa-warehouse-pos' },
    },
    {
      name: 'Website & App Development',
      icon: 'Globe',
      summary: 'Fast, secure, conversion-first websites and booking or customer apps — from focused business sites to full booking flows.',
      deliverables: [
        'Conversion-first website design and build',
        'Booking and enquiry apps',
        'WordPress-to-modern-stack migration',
        'WhatsApp-connected chat on site',
        'Speed, security and analytics set-up',
        'Content-managed, SEO-ready pages',
      ],
      stack: 'React · Next.js · WordPress · Vercel · AWS',
      model: '3–8 weeks one-time, with annual maintenance',
      proof: { text: 'A new website build alongside workflow automation — “loads in a blink and converts far better.”', client: 'V3 Data Solutions', slug: 'v3-data-solutions' },
    },
    {
      name: 'SaaS & Digital Products',
      icon: 'Cloud',
      summary: 'Product thinking for platforms that serve many users — modules, roles, dashboards and a roadmap that can grow over time.',
      deliverables: [
        'Product scoping and module roadmap',
        'Role-based dashboards for management and users',
        'Tiered packages for different customer sizes',
        'Cloud architecture and deployment',
        'Analytics and usage reporting',
        'Ongoing releases and support',
      ],
      stack: 'React · Node · Python · Supabase · AWS',
      model: 'Discovery and scoping, then phased releases',
      proof: { text: '“Smart School 360” — a school ERP / CRM app scoped in tiered packages with management and parent dashboards.', client: 'Holy Sai International School', slug: 'holy-sai-international-school' },
    },
  ],
  brand: [
    {
      name: 'Brand Strategy & Identity',
      icon: 'Target',
      summary: 'Brand strategy, visual identity and content architecture that give a business one voice across store, social and sales.',
      deliverables: [
        'Positioning, USP and messaging framework',
        'Logo and visual identity system',
        'Brand and tone-of-voice guidelines',
        'Collection and campaign naming systems',
        'Organisation and role branding — charts and handbooks',
        'Press and launch kits',
      ],
      stack: 'Canva Pro · Adobe CC · Figma · Notion',
      model: '3–6 weeks one-time; retainer for content systems',
      proof: { text: 'Seven collection “Edits” and a full organisation identity.', client: 'Taqua Silks, Tirupur', slug: 'taqua-silks-growth' },
    },
    {
      name: 'Creative Graphic Design',
      icon: 'PenTool',
      summary: 'Campaign creatives, ad sets, catalogues, in-store and print collateral in one consistent brand system — built to be tested.',
      deliverables: [
        'Ad creative sets — static, carousel and story',
        'Offer and festive campaign kits',
        'Product catalogues and lookbooks',
        'In-store POSM, standees and QR review cards',
        'Proposal, deck and org-chart design',
        'Brand template systems',
      ],
      stack: 'Adobe CC · Canva Pro · Figma',
      model: 'Per-campaign packs or a monthly retainer',
      proof: { text: 'Catalogue, campaign and D2C creative system for essa.in.', client: 'ESSA Garments', slug: 'essa-garments-d2c' },
    },
    {
      name: 'Content & Video Studio',
      icon: 'Clapperboard',
      summary: 'Reels, posts, scripts, store films and testimonial videos — in English, Tamil or Thanglish — shot and cut for the platform they run on.',
      deliverables: [
        'Content strategy and pillar map',
        'Reel scripts, shoot briefs and captions',
        'Product, collection and testimonial videos',
        'Reels / Shorts editing bank and ad video variants',
        'SEO web and landing-page copy',
        'Festive and launch content packs',
      ],
      stack: 'Canva · CapCut · Premiere · DaVinci · Notion',
      model: 'Shoot packages and a monthly content retainer',
      proof: { text: 'Customer-testimonial video tracks for the festive campaign and shoot packages for three property projects.', client: 'Taqua Silks · Greens Properties', slug: 'taqua-silks-social' },
    },
  ],
  grow: [
    {
      name: 'SEO & AI Search (GEO)',
      icon: 'Search',
      summary:
        'Audit-first SEO — technical, on-page, local / Google Business Profile, content and Generative Engine Optimisation for single sites and multi-branch networks.',
      deliverables: [
        'Technical and on-page audit with prioritised fixes',
        'Keyword and content architecture',
        'Local / GBP optimisation per branch',
        'GEO (AI-answer) visibility audit',
        'SEO homepage and service-page content packs',
        'Monthly ranking and traffic reporting',
      ],
      stack: 'GA4 · Search Console · Screaming Frog · Semrush',
      model: '2–3 week audit; one-time fix or retainer',
      proof: { text: 'GEO + SEO + GBP audit across 7 branches and 17+ loan officers.', client: 'Fairway Heritage Group, USA', slug: 'fairway-heritage-group' },
    },
    {
      name: 'Performance Marketing',
      icon: 'ChartColumnIncreasing',
      summary: 'Google, Meta and programmatic campaigns engineered for return — real-time bid and creative optimisation with transparent dashboards.',
      deliverables: [
        'Campaign architecture by funnel stage',
        'Creative and copy testing',
        'Geo / pincode targeting for stores and projects',
        'Lead-sheet automation',
        'Weekly optimisation',
        'Monthly ROAS / CPL reporting',
      ],
      stack: 'Google Ads · Meta Ads · GA4 · CAPI · Looker',
      model: 'Monthly retainer; ad spend at actuals',
      proof: { text: 'Google + Meta lead funnels with ROAS reporting for a property investment brand.', client: 'Property Wealth', slug: 'property-wealth' },
    },
    {
      name: 'B2B & B2C Lead Generation',
      icon: 'Users',
      summary: 'Intent-based B2B outbound (email + LinkedIn) and B2C funnels that deliver purchase-ready leads into a CRM you own.',
      deliverables: [
        'ICP and account list building',
        'Cold email + LinkedIn cadences',
        'Landing funnels and lead forms',
        'CRM nurturing workflows',
        'Dealer / distributor acquisition campaigns',
        'Lead-quality reporting',
      ],
      stack: 'Sales Navigator · Apollo · Mail automation · CRM',
      model: '30-day launch; retainer with a performance option',
      proof: { text: '500+ qualified leads turned into 250+ booked site visits.', client: 'Nova Pinnacle', slug: 'nova-pinnacle' },
    },
    {
      name: 'Social Media Marketing',
      icon: 'Share2',
      summary: 'Platform strategy, calendars, community and boosting across Instagram, Facebook, YouTube and LinkedIn — measured in enquiries and walk-ins.',
      deliverables: [
        'Channel audit and content pillars',
        'Monthly calendar across four platforms',
        'Daily stories and community replies',
        'Launch, festive and offer campaign arcs',
        'Boost strategy for top organic posts',
        'Monthly reach → enquiry reporting',
      ],
      stack: 'Meta Business Suite · Later · Canva · LinkedIn',
      model: '2-week set-up, then a monthly retainer',
      proof: { text: 'Instagram as a walk-in driver — around 16K followers and a catchment reaching Kerala.', client: 'Taqua Silks', slug: 'taqua-silks-social' },
    },
    {
      name: 'E-commerce Marketing',
      icon: 'ShoppingCart',
      summary: 'D2C and marketplace growth — store experience, catalogue content, acquisition and retention working together.',
      deliverables: [
        'Store audit and revamp (Shopify or custom)',
        'Product photoshoot and catalogue content',
        'Reels and reseller / wholesale content',
        'Acquisition campaigns and retargeting',
        'WhatsApp and email retention flows',
        'Festive and gifting campaign playbooks',
      ],
      stack: 'Shopify · Meta · Google Shopping · WhatsApp API',
      model: 'One-time revamp, then a growth retainer',
      proof: { text: 'essa.in D2C store revamp, photoshoot and growth-marketing programme.', client: 'ESSA Garments', slug: 'essa-garments-d2c' },
    },
    {
      name: 'WhatsApp Marketing',
      icon: 'MessageCircleMore',
      summary: 'Verified WhatsApp Business API set-ups that book, follow up and retain — bots, journeys and consent-led broadcasts.',
      deliverables: [
        'WABA set-up and template approvals',
        'Booking and enquiry chatbots',
        'Lifecycle journeys — reminders, reviews and offers',
        'Segmented broadcasts with frequency caps',
        'Website and ad click-to-WhatsApp',
        'Opt-in growth and CRM sync',
      ],
      stack: 'WhatsApp Business API · WATI · n8n / Make · CRM',
      model: '2–4 week set-up, then monthly management',
    },
  ],
  transform: [
    {
      name: 'Workflow & CRM Automation',
      icon: 'Workflow',
      summary: 'Workflow, CRM and AI automation that removes repetitive work from sales, marketing and operations.',
      deliverables: [
        'Process mapping and automation audit',
        'CRM and lead-routing workflows',
        'Funnel automation — forms → CRM → follow-up',
        'Reporting automation',
        'AI-assisted document and content workflows',
        'In-house email campaign platform',
      ],
      stack: 'Zapier · Make · n8n · Custom APIs · Gmail API',
      model: '2–6 weeks per workflow set; support retainer',
      proof: { text: '60% less manual workload — 40 hours saved every week.', client: 'V3 Data Solutions', slug: 'v3-data-solutions' },
    },
    {
      name: 'AI Inside Operations',
      icon: 'Bot',
      summary: 'Practical AI where it earns its place — reading documents, answering questions about your data and handling the repetitive steps between systems.',
      deliverables: [
        'Document intake that learns each supplier’s format',
        'Natural-language and voice queries on business reports',
        'AI-assisted drafting for content and communication',
        'Lead and enquiry classification and routing',
        'System integrations through custom APIs',
        'AI readiness assessment and roadmap',
      ],
      stack: 'Python · Custom APIs · n8n · Supabase · AWS',
      model: 'Assessment first, then phased delivery',
      proof: { text: 'Supplier-invoice intake and 33 reports with English / Tamil query and voice.', client: 'ESSA Garments / Taqua Silks', slug: 'essa-warehouse-pos' },
    },
    {
      name: 'Growth & Transformation Consulting',
      icon: 'TrendingUp',
      summary: 'We audit the numbers, interview the floor and redesign the operating model — then run the plan with management.',
      deliverables: [
        'POS / CRM data audit and root-cause analysis',
        'Staff interviews and department problem maps',
        'Transformation blueprint and management pitch',
        'Organisation structure, role charters and SOP handbooks',
        'Leadership sessions and 8-week rollout guides',
        'Joint-KPI accountability SOPs',
      ],
      stack: 'Excel · Whisper · Looker Studio · Notion',
      model: '6–10 week diagnostic; monthly retainer',
      proof: { text: 'Audit-led growth roadmap for one of South India’s largest textile retail chains.', client: 'Pothys', slug: 'pothys' },
    },
  ],
};

/** The AAVORAA Growth Method (deck slide 21). */
export const growthMethod = [
  { n: '01', title: 'Listen & Audit', text: 'We dig into your goals, data and funnel to find where growth is leaking.', icon: 'Ear' },
  { n: '02', title: 'Strategize', text: 'A tailored, channel-by-channel roadmap built around your KPIs and budget.', icon: 'Compass' },
  { n: '03', title: 'Execute', text: 'Design, build and launch fast — creative, campaigns and code in motion.', icon: 'Rocket' },
  { n: '04', title: 'Measure & Scale', text: 'Track, optimise and double down on what compounds your revenue.', icon: 'ChartLine' },
];

/** How an engagement starts (deck slide 25). */
export const startSteps = [
  { n: '01', title: 'Book a Call', text: 'A free strategy session — we map your goals in 30 minutes.', icon: 'PhoneCall' },
  { n: '02', title: 'Get Your Plan', text: 'A tailored roadmap with clear deliverables and a timeline.', icon: 'ClipboardList' },
  { n: '03', title: 'We Launch', text: 'Our team executes — creative, campaigns and builds go live.', icon: 'Rocket' },
  { n: '04', title: 'Watch It Grow', text: 'Track results as leads, traffic and revenue move.', icon: 'TrendingUp' },
  { n: '05', title: 'Scale Together', text: 'We compound wins into long-term, predictable growth.', icon: 'Infinity' },
];

/** Reasons clients stay (deck slide 24). */
export const reasons = [
  { title: 'One Roof, Zero Handoffs', text: 'Strategy, creative, code and ads in one team — no finger-pointing between vendors.', icon: 'House' },
  { title: 'Speed That Compounds', text: 'We ship fast and iterate weekly, so momentum builds instead of stalling.', icon: 'Zap' },
  { title: 'Numbers Over Noise', text: 'Every rupee is tracked to an outcome. We optimise for revenue, not vanity metrics.', icon: 'ChartNoAxesCombined' },
  { title: 'Skin in Your Game', text: 'We win when you win — structured around your growth, not billable hours.', icon: 'Handshake' },
  { title: 'Tailored, Never Templated', text: 'Your market is unique; your strategy is built for it, not copy-pasted.', icon: 'Fingerprint' },
  { title: 'Radical Transparency', text: 'Live dashboards and honest updates — you always know where things stand.', icon: 'Eye' },
];

/** Client testimonials (deck slide 23). Confirm permission before launch. */
export const testimonials = [
  { quote: 'AAVORAA rebuilt our lead engine from the ground up. The quality and volume of leads transformed our pipeline within weeks.', who: 'Marketing Lead', org: 'Nova Pinnacle' },
  { quote: 'Our new website loads in a blink and converts far better. Fast, transparent and genuinely strategic from start to finish.', who: 'CEO', org: 'V3 Data Solutions' },
  { quote: 'The funnel automation they built cut our manual work dramatically. They truly understand how a tech business runs.', who: 'Director', org: 'i-Cons Technologies' },
];

export const markets = ['India', 'USA', 'United Kingdom', 'UAE', 'Australia', 'Southeast Asia'];

/** Industries page detail: how AAVORAA typically helps, and related case studies (slugs). */
export const industryDetail: Record<string, { text: string; needs: string[]; cases?: string[] }> = {
  'Retail & E-commerce': {
    text: 'Store and online channels working as one — footfall, D2C sales and the systems behind the counter.',
    needs: ['POS, inventory and CRM foundations', 'D2C store revamps and catalogue content', 'Festive and offer campaigns that bring walk-ins'],
    cases: ['essa-garments-d2c', 'taqua-silks-social'],
  },
  'Textile & Apparel': {
    text: 'From the warehouse to the shop floor to Instagram — the sector where AAVORAA has the deepest operating experience.',
    needs: ['Warehouse, GRN and supplier-document automation', 'Retention, CRM and collection naming', 'Brand systems for groups and retail chains'],
    cases: ['essa-warehouse-pos', 'taqua-silks-growth', 'pothys', 'kpr-mill'],
  },
  'Real Estate': {
    text: 'Projects that need premium, ready-to-visit buyers rather than a pile of unqualified leads.',
    needs: ['Geo-targeted lead engines and nurture', 'Project branding and conversion websites', 'CRM and lead-sheet automation'],
    cases: ['nova-pinnacle', 'greens-properties-amaya', 'property-wealth'],
  },
  'Education & EdTech': {
    text: 'Admissions growth and the platforms that connect management, staff and parents.',
    needs: ['Brand and digital audits for schools', 'Admissions marketing and growth blueprints', 'School ERP / CRM apps and dashboards'],
    cases: ['holy-sai-international-school'],
  },
  'Healthcare & Wellness': {
    text: 'Clear, trustworthy positioning and websites for organisations where credibility comes first.',
    needs: ['Repositioning and website redesign', 'Enquiry flows mapped into CRM', 'Care plans for hosting and maintenance'],
    cases: ['lucas-health-tech'],
  },
  'SaaS & Technology': {
    text: 'Demand generation and operations for technology businesses selling into crowded categories.',
    needs: ['Funnel-staged performance campaigns', 'Workflow and CRM automation', 'Conversion-first product websites'],
    cases: ['hikigai-ai', 'v3-data-solutions'],
  },
  'Finance & Mortgage': {
    text: 'Search and AI-answer visibility for multi-branch networks, and profitable lead funnels for advisory brands.',
    needs: ['GEO, SEO and Google Business Profile per branch', 'Investor-intent lead funnels', 'Lead-quality scoring and ROAS reporting'],
    cases: ['fairway-heritage-group', 'property-wealth'],
  },
  Manufacturing: {
    text: 'One consistent voice for diversified groups, and operational software for the work between plant and market.',
    needs: ['Corporate brand systems and collateral', 'Dealer and distributor acquisition', 'Operational software and integrations'],
    cases: ['kpr-mill'],
  },
  'Logistics & Warehousing': {
    text: 'Connected procurement, receiving, inventory and stock movement — the problem WAREXX was built to solve.',
    needs: ['Supplier-document intake and GRN', 'Inventory with QR traceability', 'Warehouse-to-store visibility and reporting'],
    cases: ['essa-warehouse-pos'],
  },
  Automobile: {
    text: 'Showroom footfall, test-drive enquiries and dealer marketing measured in leads, not impressions.',
    needs: ['Geo-targeted showroom campaigns', 'Lead capture and CRM follow-up', 'WhatsApp journeys for bookings and service'],
  },
  'Hospitality & Resorts': {
    text: 'Destination brands and resort projects that need the right guests and buyers to find them.',
    needs: ['Property and destination branding', 'Booking and enquiry funnels', 'Content and video that sells the experience'],
    cases: ['greens-properties-amaya'],
  },
  'Food & Beverages': {
    text: 'Brand, social and local visibility for food businesses competing on taste, trust and convenience.',
    needs: ['Brand identity and packaging direction', 'Social content and offer campaigns', 'Local search and Google Business Profile'],
  },
  'Beauty & Cosmetics': {
    text: 'Visual-first brands that live on social and grow through D2C and repeat purchase.',
    needs: ['Brand and creative systems', 'Reels and influencer-ready content', 'D2C growth and retention flows'],
  },
  'Sports & Fitness': {
    text: 'Memberships, academies and sports brands that need consistent enquiries and community.',
    needs: ['Lead funnels for memberships and trials', 'Social calendars and community', 'Booking and WhatsApp journeys'],
  },
  'Construction & Interiors': {
    text: 'High-consideration projects where portfolio, trust and follow-up decide the deal.',
    needs: ['Portfolio websites and project showcases', 'Qualified lead generation', 'CRM follow-up and quotation workflows'],
  },
  'Recruitment & Staffing': {
    text: 'Winning employer clients and candidates without a large sales team.',
    needs: ['B2B outbound to hiring companies', 'Email + LinkedIn cadences', 'Meeting booking and CRM reporting'],
    cases: ['itp-recruitment'],
  },
};

/** Solutions page — organised by the business problem rather than the service. */
export const solutions: {
  key: string;
  title: string;
  problem: string;
  signs: string[];
  approach: string[];
  pillars: PillarKey[];
  caseSlug?: string;
  icon: string;
  interest: string;
}[] = [
  {
    key: 'enquiries',
    title: 'Get More Qualified Enquiries',
    problem: 'Traffic and leads that don’t turn into conversations, site visits or sales.',
    signs: ['Ads bring clicks but few real enquiries', 'Leads go cold before anyone follows up', 'No clear view of which channel actually works'],
    approach: ['Audit the funnel from first click to booked meeting', 'Rebuild targeting, landing pages and lead forms around intent', 'Connect every lead to a CRM and a nurture sequence'],
    pillars: ['grow', 'transform'],
    caseSlug: 'nova-pinnacle',
    icon: 'Magnet',
    interest: 'SEO / Digital Marketing / Lead Generation',
  },
  {
    key: 'visibility',
    title: 'Get Found on Google and in AI Answers',
    problem: 'Customers search — on Google, Maps and AI assistants — and find your competitors first.',
    signs: ['Thin or outdated service pages', 'Branches or locations with inconsistent profiles', 'Your business is missing from AI-generated answers'],
    approach: ['Technical, on-page and local audit with prioritised fixes', 'Keyword and content architecture by service and location', 'GEO visibility audit and content that answers real questions'],
    pillars: ['grow'],
    caseSlug: 'fairway-heritage-group',
    icon: 'Search',
    interest: 'SEO / Digital Marketing / Lead Generation',
  },
  {
    key: 'operations',
    title: 'Digitise and Connect Operations',
    problem: 'Spreadsheets, paper and disconnected tools between the supplier, the warehouse and the store.',
    signs: ['Manual GRN, invoice and stock entry', 'No live view of stock across locations', 'Reports that take days to put together'],
    approach: ['Module review with the people who run operations', 'A platform for documents, inventory, POS and reporting', 'Phased rollout with module-wise approvals'],
    pillars: ['build', 'transform'],
    caseSlug: 'essa-warehouse-pos',
    icon: 'Boxes',
    interest: 'Software / Website / App',
  },
  {
    key: 'automation',
    title: 'Remove Repetitive Manual Work',
    problem: 'Talented people spending their week copying data, chasing follow-ups and building reports.',
    signs: ['The same data typed into several systems', 'Follow-ups depend on someone remembering', 'Weekly reports built by hand'],
    approach: ['Map processes and rank them by hours and errors', 'Automate hand-offs between forms, CRM, email and reports', 'Add AI only where it is genuinely reliable'],
    pillars: ['transform'],
    caseSlug: 'v3-data-solutions',
    icon: 'Workflow',
    interest: 'AI / Business Automation',
  },
  {
    key: 'brand',
    title: 'Build a Brand That Stands Apart',
    problem: 'Customers can’t tell why they should choose you — so they compare on price.',
    signs: ['Different messages on the website, store and social', 'A logo but no real brand system', 'Campaigns that look and sound different every time'],
    approach: ['Positioning, USP and tagline before design', 'Identity, guidelines and naming systems', 'A creative system the team can keep using'],
    pillars: ['brand'],
    caseSlug: 'kpr-mill',
    icon: 'Gem',
    interest: 'Branding',
  },
  {
    key: 'roadmap',
    title: 'Plan Growth With a Clear Roadmap',
    problem: 'Growth has slowed and it isn’t clear whether the cause is marketing, people, product or process.',
    signs: ['Revenue pace slowing without an obvious reason', 'Teams working hard on different priorities', 'Data exists, but nobody uses it to decide'],
    approach: ['Audit the numbers and interview the floor', 'Find the root cause and build a transformation blueprint', 'Run the plan with management through clear KPIs'],
    pillars: ['transform', 'brand'],
    caseSlug: 'taqua-silks-growth',
    icon: 'Map',
    interest: 'Business Consulting',
  },
];

/** Photography (licence-free Unsplash, toned in CSS). Cases use their own `image` first, then their art, then their main pillar. */
export const pillarPhoto: Record<PillarKey, string> = {
  build: '/img/work/software.jpg',
  brand: '/img/work/brand.jpg',
  grow: '/img/work/marketing.jpg',
  transform: '/img/work/strategy.jpg',
};
const artPhoto: Record<NonNullable<Case['art']>, string> = {
  warehouse: '/img/work/software.jpg',
  automation: '/img/work/data.jpg',
  realestate: '/img/work/marketing.jpg',
  search: '/img/work/search.jpg',
};
export const caseImage = (c: Case) => c.image ?? (c.art ? artPhoto[c.art] : pillarPhoto[c.pillars[0]]);

/** Article header photos (fall back to the article's pillar). */
const articlePhoto: Record<string, string> = {
  'why-your-website-isnt-generating-enquiries': '/img/work/marketing.jpg',
  'what-to-automate-first': '/img/work/data.jpg',
  'geo-getting-found-in-ai-answers': '/img/work/search.jpg',
  'positioning-before-marketing': '/img/work/brand.jpg',
};
export const articleImage = (a: { slug: string; category: PillarKey }) => articlePhoto[a.slug] ?? pillarPhoto[a.category];

/** Extra words visitors use for each industry, so the Industries search finds them. */
export const industryKeywords: Record<string, string> = {
  'Retail & E-commerce': 'shop store stores ecommerce online d2c marketplace shopify',
  'Textile & Apparel': 'garments garment saree sarees clothing fashion silk mill apparel',
  'Real Estate': 'property properties plots villas apartments realty builders developers housing',
  'Education & EdTech': 'school schools college university admissions academy coaching',
  'Healthcare & Wellness': 'hospital clinic clinics medical doctors pharma health',
  'SaaS & Technology': 'software tech startup app apps it product ai',
  'Finance & Mortgage': 'bank banking loans lending fintech insurance investment wealth mortgage',
  Manufacturing: 'factory factories industrial plant production engineering',
  'Logistics & Warehousing': 'warehouse supply chain distribution transport inventory',
  Automobile: 'car cars dealer dealership showroom vehicle vehicles automotive bikes',
  'Hospitality & Resorts': 'hotel hotels resort travel tourism homestay',
  'Food & Beverages': 'restaurant restaurants cafe bakery fmcg food',
  'Beauty & Cosmetics': 'salon skincare makeup spa cosmetics',
  'Sports & Fitness': 'gym gyms fitness academy sports club',
  'Construction & Interiors': 'builders architecture interior design contractors construction homes',
  'Recruitment & Staffing': 'hr hiring jobs staffing manpower recruitment agency',
};
