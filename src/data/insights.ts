/** Insights articles, written for AAVORAA. Plain text only; rendered by src/pages/insights/[slug].astro. */
export type ArticleSection = { heading: string; paragraphs: string[]; points?: string[] };
export type Article = {
  slug: string;
  title: string;
  excerpt: string;        // 1–2 sentences, under 200 characters
  category: 'build' | 'brand' | 'grow' | 'transform';
  date: string;           // '2026-10-16'
  readMinutes: number;    // round(words / 220)
  intro: string;          // 2–3 sentence opening paragraph
  sections: ArticleSection[];
  takeaways: string[];    // 3–5 short bullet takeaways
};

export const articles: Article[] = [
  {
    slug: 'why-your-website-isnt-generating-enquiries',
    title: 'Why Your Website Isn’t Generating Enquiries — and What to Fix First',
    excerpt: 'Most underperforming websites leak enquiries in several small places at once. Here is how to find the leaks, and the order in which to fix them.',
    category: 'grow',
    date: '2026-10-16',
    readMinutes: 4,
    intro: 'Many business websites look perfectly acceptable and still produce very few enquiries. The cause is rarely one big failure; it is usually a chain of small leaks between the first visit and the first conversation. This is how we diagnose those leaks, and the order in which we fix them.',
    sections: [
      {
        heading: 'The offer isn’t clear in the first few seconds',
        paragraphs: [
          'A visitor landing on your home page is quietly asking three questions: what do you do, is it for someone like me, and why should I trust you. If the headline is a slogan rather than an answer, most visitors won’t scroll far enough to find out.',
          'We often see lines such as “Excellence in every solution” sitting above a carousel of stock images. Nothing in that sentence tells a hospital administrator, a factory owner or a property developer that they are in the right place. A plain statement – what you do, for whom, and the outcome – does far more work than a clever phrase.',
        ],
        points: [
          'Name the service in the words your customer would type or say',
          'Name the customer, or the industry, you serve best',
          'State the outcome you deliver, not the process you follow',
          'Place proof – a client name, a result, a project – close to the headline',
        ],
      },
      {
        heading: 'Traffic without intent',
        paragraphs: [
          'A rising visitor count is encouraging, but it isn’t the same as demand. Broad keywords, social posts that travel outside your market and campaigns aimed at everyone in a city can all deliver visitors who were never going to buy.',
          'Look at where your enquiries come from, not where your traffic comes from. In most accounts we review, a small number of specific searches, referrers or campaigns produce nearly all the useful conversations. Those sources deserve more budget and better landing pages; the rest deserve scrutiny. Our work with Nova Pinnacle, a real estate developer, started here: the lead engine was rebuilt around geo-targeted intent audiences and a nurture sequence, and the result was 500+ qualified leads turned into 250+ booked site visits.',
        ],
      },
      {
        heading: 'Calls to action that ask for too much, or nothing at all',
        paragraphs: [
          'Many pages end without telling the visitor what to do next. Others offer a single option – “Request a quote” – that suits only people ready to buy today. Visitors at different stages need different next steps.',
          'A practical structure is one primary action and one lower-commitment alternative on every key page. The primary action might be a consultation or a quote; the alternative might be a WhatsApp chat, a callback request or a price guide. Keep the wording specific: “Book a 20-minute site assessment” is clearer than “Contact us”.',
        ],
      },
      {
        heading: 'Friction in forms, and pages that load slowly',
        paragraphs: [
          'Every field in a form is a small reason to leave. Ask only for what you need to start the conversation – usually a name, a phone number or email, and one qualifying question. Everything else can be gathered on the first call.',
          'Speed works the same way. Heavy images, autoplay video, piles of tracking scripts and bloated themes slow a page down, and the effect is worst on mobile data, which is where many of your visitors are. A page that takes too long to become usable loses people before they read a single line.',
        ],
        points: [
          'Test every form yourself, on a phone, on mobile data',
          'Remove any field that doesn’t change how you respond',
          'Show a clear confirmation and explain what happens next',
          'Compress images and remove scripts nobody uses',
        ],
      },
      {
        heading: 'No follow-up after the enquiry',
        paragraphs: [
          'This is the leak businesses notice least, because it happens after the website has done its job. An enquiry lands in a shared inbox, sits there over a weekend and is answered on Tuesday – by which time the prospect has spoken to two competitors.',
          'The fix is a simple, reliable path: form submissions go straight into a CRM, the right person is notified immediately, and the prospect gets an acknowledgement on the channel they prefer, which in India and the GCC is often WhatsApp. A short nurture sequence then keeps you present for people who aren’t ready yet. None of this needs to be elaborate; it needs to be consistent.',
        ],
      },
      {
        heading: 'No measurement, so no learning',
        paragraphs: [
          'If you can’t say how many enquiries came from the website last month, which pages produced them and how many became customers, every decision about the site is a guess. Basic measurement isn’t difficult: track form submissions, calls and WhatsApp clicks as conversions, tag your campaigns, and record the source of each lead in the CRM.',
          'The aim isn’t a dashboard for its own sake. It is being able to answer one question each month: what changed, and did it bring us more of the right conversations?',
        ],
      },
      {
        heading: 'What to fix first',
        paragraphs: [
          'When everything looks broken, sequence matters. We generally work from the cheapest, highest-impact fixes towards the slower, more expensive ones.',
          'Fixing follow-up and measurement before anything visible can feel backwards. But there is little point sending more visitors to a site that already loses the enquiries it gets.',
        ],
        points: [
          'First, follow-up: route every enquiry to a named person and reply the same working day',
          'Second, measurement: track enquiries and their sources so you can see what improves',
          'Third, offer clarity: rewrite the headline and key page introductions in plain language',
          'Fourth, calls to action and forms: one clear primary action, one lighter option, fewer fields',
          'Fifth, speed: fix the heaviest pages, starting with mobile',
          'Sixth, traffic quality: move budget towards sources that produce real enquiries',
        ],
      },
    ],
    takeaways: [
      'A clear headline that names the service, customer and outcome beats a slogan',
      'Judge traffic by the enquiries it produces, not by volume',
      'Slow follow-up quietly wastes enquiries the website has already earned',
      'Measure enquiries by source before spending more on traffic',
      'Fix follow-up and measurement first, then clarity, forms, speed and traffic',
    ],
  },
  {
    slug: 'what-to-automate-first',
    title: 'What to Automate First: A Practical Way to Find Automation Wins',
    excerpt: 'The best first automation is rarely the most visible one. A simple method for mapping, measuring and scoring processes points you to the work worth automating.',
    category: 'transform',
    date: '2026-10-16',
    readMinutes: 4,
    intro: 'Most businesses know they should be automating more, but few know where to begin. The usual mistake is starting with the most visible idea – a chatbot, or a tool someone saw in a demo – rather than the work that quietly consumes the most hours. A short, structured method finds better starting points.',
    sections: [
      {
        heading: 'Map what actually happens',
        paragraphs: [
          'Before choosing any tool, write down how work really moves through the business. Pick one area – sales, operations, finance or customer service – and trace a single piece of work from start to finish: an enquiry, an order, an invoice, a delivery.',
          'Note every step, who does it, which system it touches and where information is copied from one place to another. The written procedure and the actual practice are often different. Spreadsheets on someone’s laptop, WhatsApp groups used as task lists, data re-typed from email into accounting software – this is where automation opportunities hide.',
        ],
        points: [
          'What triggers the process, and who starts it',
          'Every system the work passes through',
          'Every point where someone copies, re-types or reformats data',
          'Every approval or judgement a person makes',
          'Where work waits, and for how long',
        ],
      },
      {
        heading: 'Measure hours and the cost of errors',
        paragraphs: [
          'For each process, estimate two things: how many hours it takes per week across the team, and what it costs when it goes wrong. Rough figures are fine. Ask the people who do the work; they usually know exactly which tasks eat their afternoons.',
          'Error cost is often the more revealing number. A mistyped GST number, a missed follow-up or a wrong stock count takes seconds to cause and days to correct. A task that takes modest time but produces expensive mistakes can be a better candidate than one that takes longer but rarely goes wrong.',
        ],
      },
      {
        heading: 'Score each candidate',
        paragraphs: [
          'Once you have a list, score each process on four factors, using a one-to-five scale for each, and multiply the scores. Multiplying rather than adding pushes the strongest candidates clearly to the top and sinks anything that is weak on any one factor.',
          'The highest scorers are usually frequent, time-consuming, predictable tasks where an error is easy to catch. Those are your first projects. Processes that score low on rules or high on risk aren’t ruled out; they simply come later, once the team has experience with and trust in the systems.',
        ],
        points: [
          'Frequency: how often it happens – hourly, daily, weekly, monthly',
          'Time: how long each instance takes',
          'Rules-based: whether the steps can be written as clear rules or rely on judgement',
          'Risk: how contained the damage is if the automation gets it wrong (lower risk scores higher)',
        ],
      },
      {
        heading: 'Begin at the handoffs between systems',
        paragraphs: [
          'In our experience the quickest wins sit at the joins between tools rather than inside any one of them. A website form that emails a person, who types the details into a CRM, who then has to remember to follow up – that chain has three handoffs, and each is a place where time is lost and leads slip.',
          'Common starting points are form-to-CRM routing with automatic follow-up, scheduled reporting that pulls from several systems, and document intake, where invoices, delivery notes or purchase orders are read and entered automatically. For V3 Data Solutions, a B2B data firm, the work combined workflow automation, CRM integration and automated reporting. The result was 60% less manual workload — 40 hours saved every week.',
          'For ESSA Garments and Taqua Silks, the handoff problem lived in the warehouse. We built a warehouse and POS platform with document intake, GRN, inventory with piece QRs, 33 reports and a floor app, replacing manual GRN and Tally entry. The gain came from removing re-entry between the floor, the stockroom and the accounts.',
        ],
      },
      {
        heading: 'Where AI fits, and where plain rules are better',
        paragraphs: [
          'AI is useful where inputs are messy or varied: reading supplier invoices in different layouts, classifying incoming emails or tickets, extracting fields from scanned documents, and drafting first versions of replies, summaries or reports for a person to review.',
          'Where the logic is clear – route orders above a threshold to a manager, assign leads from a region to a named person – plain rules are cheaper, faster and easier to audit. Using AI for a decision a simple condition could make adds cost and unpredictability without adding value. The strongest systems usually combine both: AI to read and sort, rules to route and act.',
        ],
      },
      {
        heading: 'Keep people in the approvals',
        paragraphs: [
          'Automation should remove repetitive effort, not accountability. Payments, credit decisions, customer commitments, price changes and anything with legal or regulatory weight should keep a named person in the loop, at least until the system has a long record of getting it right.',
          'A good pattern is to let the system prepare everything – collect the data, check it, draft the output – and leave a person to approve it in one step. You keep the time saving and preserve judgement where it matters.',
        ],
      },
      {
        heading: 'Measure before and after',
        paragraphs: [
          'Record the baseline before you change anything. Without it, you will have opinions about whether the project worked rather than evidence. After launch, measure the same things for several weeks and talk to the people affected; their feedback usually points to the next process worth tackling.',
        ],
        points: [
          'Hours spent per week on the process',
          'Time from trigger to completion',
          'Errors or corrections per month',
          'Volume handled without adding staff',
        ],
      },
    ],
    takeaways: [
      'Map the real process, including spreadsheets and WhatsApp workarounds',
      'Score candidates on frequency, time, rules and risk, and multiply',
      'The quickest wins usually sit at the handoffs between systems',
      'Use AI for messy inputs and drafting; use rules for clear decisions',
      'Keep people on approvals and measure a baseline before you start',
    ],
  },
  {
    slug: 'geo-getting-found-in-ai-answers',
    title: 'GEO: How to Get Your Business Found in AI Answers',
    excerpt: 'Buyers increasingly ask AI assistants for recommendations. Generative Engine Optimisation is the work of making your business clear, consistent and easy to cite.',
    category: 'grow',
    date: '2026-10-16',
    readMinutes: 4,
    intro: 'More buyers now ask an AI assistant for a recommendation before they look at a page of search results. Those assistants assemble answers from what they can find and trust about your business. Generative Engine Optimisation, or GEO, is the work of making sure what they find is clear, consistent and worth citing.',
    sections: [
      {
        heading: 'GEO and SEO: related, not identical',
        paragraphs: [
          'Classic SEO aims to rank a page in a list of links. GEO aims to have your business named, described accurately or cited when an AI engine composes an answer. The two overlap heavily – crawlable pages, useful content and authority still matter – but the emphasis shifts.',
          'A search engine can send a visitor to a page and let them work out the details. An AI answer tends to summarise, so it leans on facts it can state with confidence: who you are, what you do, where you operate and why you are a credible choice. If those facts are vague or contradictory across the web, the engine has less reason to mention you.',
        ],
      },
      {
        heading: 'Entity clarity: make your business easy to describe',
        paragraphs: [
          'AI systems tend to work with entities – a business, its services, its locations, its people – and the relationships between them. The clearer your entity, the easier it is to include you in an answer.',
          'In our audits, the most common problem isn’t missing content but inconsistent content. A company is a “consultancy” on its website, an “agency” on LinkedIn and a “software firm” in a directory. The phone number differs between listings. A service has one name on one page and another name elsewhere. Each inconsistency is a small reason for an engine to hedge.',
        ],
        points: [
          'Use one business name, spelled the same way everywhere',
          'Describe your category in the same words across your site and profiles',
          'Keep address, phone number and hours identical across listings',
          'Publish an About page that states plainly what you do, where and for whom',
          'Add structured data (schema markup) for your organisation, services and locations',
        ],
      },
      {
        heading: 'Structured service pages',
        paragraphs: [
          'A single “Services” page listing everything you do gives an engine very little to work with. A dedicated page for each core service, written to a predictable structure, is far easier to interpret and to quote.',
          'Each page should state what the service is, who it is for, what problem it solves, how it works, where you offer it and what proof you have. Short, direct sentences help, as do headings that match how people actually phrase their needs.',
        ],
      },
      {
        heading: 'Answer the questions people actually ask',
        paragraphs: [
          'People ask AI assistants full questions: “Which mortgage lender near me works with self-employed borrowers?” or “What should a mid-sized garment business expect from a warehouse system?” Content written in a question-and-answer form, in the language your customers use, tends to line up well with prompts like these.',
          'Collect real questions from sales calls, enquiry forms and your customer service inbox. Answer each one honestly and specifically – on the relevant service or location page, or in a well-organised FAQ. Avoid padding; a clear two-paragraph answer is more useful than a long article that circles the point.',
        ],
      },
      {
        heading: 'Multi-location businesses: consistency at every branch',
        paragraphs: [
          'For businesses with several branches, each location is its own small entity, with its own address, team, reviews and Google Business Profile. Gaps or contradictions at one branch can weaken visibility for that location even when the main brand is strong.',
          'Fairway Heritage Group, a US mortgage network with 7 branches and 17+ loan officers, is a useful example. In our work with them, GEO (AI-engine visibility) ranked first, SEO second and Google Business Profile third. We built a multi-branch GEO/SEO/GBP audit framework and a prioritised roadmap per branch, so each location could be fixed in the order that mattered most rather than everything at once.',
        ],
        points: [
          'A location page for each branch, with consistent details',
          'A complete, accurate Google Business Profile for every location',
          'Specialists and team members linked to the right branch',
          'Reviews requested and answered at branch level',
        ],
      },
      {
        heading: 'Third-party mentions',
        paragraphs: [
          'What others say about you carries weight. Industry directories, association listings, local press, partner websites, review platforms and genuine customer reviews all help confirm that your business is real and relevant. In our audits, businesses with consistent third-party mentions tend to be described more accurately in AI answers than those relying on their own website alone.',
          'This isn’t about volume or paid placements. A handful of credible, accurate mentions in places your industry respects is worth more than dozens of low-quality listings – and an outdated listing with the wrong details can work against you.',
        ],
      },
      {
        heading: 'Measure visibility by testing prompts',
        paragraphs: [
          'There is no single ranking report for AI answers, so measurement has to be practical. Build a list of prompts a real customer might use and test them regularly across the major AI assistants. Record whether you are mentioned, how you are described and which sources are cited.',
          'Answers vary by engine, by phrasing and over time, so look for patterns rather than reacting to any single response. When a description is wrong, trace it to the source it most likely came from and correct it there.',
        ],
        points: [
          'Prompts by service: “best [service] for [type of business]”',
          'Prompts by location: “[service] near [city or area]”',
          'Prompts by problem: the questions customers ask before they know your name',
          'Prompts about you: “What does [your business] do?”',
        ],
      },
    ],
    takeaways: [
      'GEO builds on SEO but rewards clear, consistent, quotable facts',
      'Inconsistent names, categories and listings give AI engines reasons to hedge',
      'Give each core service its own structured page and answer real questions',
      'Multi-location businesses need consistency and a roadmap at every branch',
      'Track visibility by testing real customer prompts regularly',
    ],
  },
  {
    slug: 'positioning-before-marketing',
    title: 'Positioning Before Promotion: Why Your Brand Needs a Clear Position Before the Next Campaign',
    excerpt: 'More promotion spreads an unclear message further. Settle who you serve, what problem you solve and why you, before the next campaign goes live.',
    category: 'brand',
    date: '2026-10-16',
    readMinutes: 4,
    intro: 'When enquiries slow down, the instinct is to run another campaign. But if the market doesn’t clearly understand who you are for and why you are the better choice, more promotion simply carries an unclear message further. Positioning comes first.',
    sections: [
      {
        heading: 'What positioning actually is',
        paragraphs: [
          'Positioning is the decision about where your business stands in a customer’s mind. It answers three questions: who exactly you serve, what problem you solve for them, and why they should choose you over the alternatives – including doing nothing.',
          'It is a strategic choice, not a piece of copy. A good position means saying no to some customers so that you can be the obvious answer for others. That feels uncomfortable for a growing business that wants every enquiry, but a business that tries to appeal to everyone usually ends up memorable to no one.',
        ],
      },
      {
        heading: 'USP and tagline are outputs, not starting points',
        paragraphs: [
          'Many brand exercises begin by brainstorming a tagline. That is the wrong end of the process. A tagline is a compressed expression of a position; without the position, it becomes a pleasant phrase that could belong to any competitor.',
          'The same applies to a unique selling proposition. A USP is only unique if it rests on something real – a capability, a process, a track record, a focus – that customers value and competitors can’t easily claim. Settle the position first, and the USP and tagline become much easier to write and far more convincing.',
        ],
      },
      {
        heading: 'How unclear positioning wastes ad spend',
        paragraphs: [
          'Advertising amplifies whatever message you give it. If the message is generic, you pay to reach people who can’t see why you are different, and the platforms optimise towards whoever clicks, not whoever buys.',
          'The symptoms are familiar: reasonable click-through rates but few enquiries, enquiries from the wrong kind of customer, sales calls spent explaining what you do, and steady pressure to compete on price. Each is often a positioning problem presenting itself as a marketing problem.',
          'Sometimes the real issue isn’t acquisition at all. With Taqua Silks, a textile retailer in Tirupur, a POS data audit and customer interviews traced a revenue decline to retention, not acquisition. More advertising would have filled the top of the funnel while existing customers kept drifting away. Customer data capture lifted from 52% to 84%, giving the business the foundation to bring customers back.',
        ],
      },
      {
        heading: 'A simple positioning worksheet',
        paragraphs: [
          'You don’t need a long workshop to start. Five questions, answered honestly and specifically, will tell you whether your position is clear.',
          'If any answer is vague, or could be pasted onto a competitor’s website unchanged, that is where the work is. Test your answers with a few real customers; the words they use to explain why they chose you are often better than anything written internally.',
        ],
        points: [
          'Audience: who is your best-fit customer? Describe them by situation and need, not just demographics',
          'Category: what do they think they are buying? Use their words, not your internal terms',
          'Problem: what pain, risk or ambition brings them to you?',
          'Proof: what evidence shows you can deliver – results, clients, credentials, process?',
          'Difference: what do you do that credible alternatives don’t, and why does it matter to this audience?',
        ],
      },
      {
        heading: 'Naming systems for products and collections',
        paragraphs: [
          'Positioning also shapes how you name what you sell. Ad hoc product names make a range harder to understand and harder to market. A naming system – a consistent logic for how collections, lines and products are named – makes the range easier to navigate and reinforces the brand every time a customer sees it.',
          'For Taqua Silks, we developed a collection naming system built around “Edits”. Rather than treating each collection as a one-off, the system gives every release a consistent structure, so customers learn to recognise a Taqua collection and the business can launch new ranges without reinventing its naming each season.',
        ],
        points: [
          'Choose one naming logic and apply it across the range',
          'Make names easy to say, spell and search',
          'Let the structure show how products relate to each other',
          'Check names for clashes with existing brands before launch',
        ],
      },
      {
        heading: 'Keep brand, website and campaigns consistent',
        paragraphs: [
          'A position only works if customers meet it everywhere. The headline on your website, the opening of your sales deck, your social profiles, your ad copy and the way your team introduces the business on a call should all say the same thing in compatible words.',
          'Inconsistency creeps in because each piece is written at a different time by a different person. A short positioning document – audience, problem, proof and difference, plus a few approved phrases – gives everyone the same reference point. Revisit it when you launch a new service or enter a new market, not every time someone wants a fresh campaign idea.',
          'Get the position right, and every campaign after it starts with an advantage: the market already knows who you are for.',
        ],
      },
    ],
    takeaways: [
      'Positioning answers who you serve, what problem you solve and why you',
      'Write the USP and tagline after the position, not before',
      'Generic messages make ad platforms optimise for clicks, not buyers',
      'Check whether the real problem is retention before buying more reach',
      'One short positioning document keeps brand, website and campaigns aligned',
    ],
  },
];
