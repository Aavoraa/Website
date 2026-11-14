/**
 * Website copy for each service page, from "All_Service_Page_Content_for_AAVORAA.docx" and "page content.docx" (client-supplied).
 * Keyed by the service name used in that document; `copyFor()` maps the site's names onto it.
 * Generated from the document — edit the wording here.
 */
export type ServiceCopy = {
  name: string;
  tagline: string;
  headline: string;
  lead: string;
  intro: string;
  whatWeDo: { name: string; desc: string; points?: string[] }[];
  process: { step: string; desc: string }[];
  receive: string[];
  tools: string;
  cta: string;
  /** optional extras from the second document ('page content.docx') */
  heroCta?: string;
  whatHead?: string;
  whatIntro?: string;
  closing?: { eyebrow: string; title: string; text: string; label: string };
};

export const serviceCopy: Record<string, ServiceCopy> = {
  "Brand Strategy & Identity": {
    "name": "Brand Strategy & Identity",
    "whatWeDo": [
      {
        "name": "Brand Discovery & Research",
        "desc": "Understand your business, audience, competitors and market context to identify what makes your brand distinct."
      },
      {
        "name": "Brand Positioning",
        "desc": "Define your value proposition, target audience, differentiators and the space you want to own in the market."
      },
      {
        "name": "Brand Personality & Voice",
        "desc": "Establish the character, tone and messaging principles that guide how your brand communicates."
      },
      {
        "name": "Logo & Visual Identity",
        "desc": "Develop a logo system, colour palette, typography, graphic elements and visual direction that work together."
      },
      {
        "name": "Brand Guidelines",
        "desc": "Create practical guidelines that help your team and partners apply the identity consistently across channels."
      },
      {
        "name": "Brand Applications",
        "desc": "Extend the identity across selected touchpoints such as stationery, packaging, presentations, social media and digital assets."
      }
    ],
    "process": [
      {
        "step": "Discover",
        "desc": "Align on business goals, audience, current perception and project requirements."
      },
      {
        "step": "Define",
        "desc": "Develop positioning, messaging direction and the creative brief."
      },
      {
        "step": "Design",
        "desc": "Explore concepts and refine the selected identity system."
      },
      {
        "step": "Deliver",
        "desc": "Prepare final assets, usage guidelines and agreed brand applications."
      }
    ],
    "receive": [
      "Brand strategy and positioning summary",
      "Brand personality, tone of voice and key messaging",
      "Primary and secondary logo variations",
      "Colour, typography and visual identity system",
      "Brand guideline document",
      "Export-ready brand assets and agreed collateral"
    ],
    "intro": "We bring strategy and creativity together to define how your brand looks, sounds and connects. Whether you are launching a new business or refreshing an existing identity, we build a brand system that is recognisable, relevant and ready to grow.",
    "tagline": "Build a brand people recognise, remember and trust.",
    "headline": "Create a Brand That Means Something.",
    "lead": "A strong brand is more than a logo. It is the complete experience people associate with your business—from your positioning and voice to your visual identity and customer touchpoints. AAVORAA helps shape a clear, consistent brand foundation that reflects your purpose and gives your business a distinctive place in the market.",
    "tools": "Adobe Illustrator, Adobe Photoshop, Figma and other design tools selected to suit the project.",
    "cta": "Ready to build a brand with a clear point of view? Let’s shape an identity your audience can recognise and trust."
  },
  "Creative Graphic Design": {
    "name": "Creative Graphic Design",
    "whatWeDo": [
      {
        "name": "Marketing & Campaign Creatives",
        "desc": "Design campaign visuals for launches, promotions, announcements and brand communications."
      },
      {
        "name": "Social Media Design",
        "desc": "Create platform-ready posts, carousels, stories, covers and reusable visual templates."
      },
      {
        "name": "Print & Promotional Design",
        "desc": "Develop brochures, flyers, posters, catalogues, banners and other print-ready materials."
      },
      {
        "name": "Packaging & Label Design",
        "desc": "Translate product positioning into packaging concepts and production-ready artwork."
      },
      {
        "name": "Presentation & Corporate Design",
        "desc": "Design pitch decks, company profiles, proposals, reports and internal communication materials."
      },
      {
        "name": "Design Adaptation & Production",
        "desc": "Resize and adapt approved creative assets for different channels, formats and specifications."
      }
    ],
    "process": [
      {
        "step": "Brief",
        "desc": "Understand the message, audience, objective, formats and delivery requirements."
      },
      {
        "step": "Direction",
        "desc": "Align on visual references, brand rules and creative approach."
      },
      {
        "step": "Create",
        "desc": "Design initial concepts and develop the selected direction."
      },
      {
        "step": "Refine & deliver",
        "desc": "Apply feedback, check specifications and supply final files."
      }
    ],
    "receive": [
      "Approved design concepts and final artwork",
      "Digital and print-ready file formats as required",
      "Social media and campaign asset sets",
      "Editable source files where included in scope",
      "Design templates and layout systems where required"
    ],
    "intro": "From everyday marketing creatives to campaign-led design systems, we create visuals that support your message and help your audience understand what matters. Every asset is designed around its purpose, audience, format and brand identity.",
    "tagline": "Make every visual communicate with purpose.",
    "headline": "Design That Makes Your Brand Stand Out.",
    "lead": "Great design turns information into communication and helps your brand make a stronger impression. AAVORAA creates purposeful graphic design that balances visual appeal, clarity and brand consistency across print and digital platforms.",
    "tools": "Adobe Illustrator, Photoshop, InDesign, Figma and other tools appropriate to the output.",
    "cta": "Have a message to communicate? Let’s turn it into a visual your audience notices and understands."
  },
  "Content & Video Studio": {
    "name": "Content & Video Studio",
    "whatWeDo": [
      {
        "name": "Content Planning",
        "desc": "Build content themes, formats and creative directions around your brand, audience and communication goals."
      },
      {
        "name": "Creative Concepts & Scripts",
        "desc": "Develop story angles, hooks, scripts and visual treatments for short-form and campaign content."
      },
      {
        "name": "Video Production",
        "desc": "Plan and produce agreed video assets, including brand, product, service and promotional videos."
      },
      {
        "name": "Video Editing & Motion",
        "desc": "Edit footage, add titles, transitions, motion elements, sound and platform-specific versions."
      },
      {
        "name": "Branded Content Design",
        "desc": "Create supporting thumbnails, covers, graphics and visual assets that make content feel consistent."
      },
      {
        "name": "Content Repurposing",
        "desc": "Adapt approved long-form or campaign content into shorter, channel-specific assets."
      }
    ],
    "process": [
      {
        "step": "Plan",
        "desc": "Identify the audience, objective, message, channels and content formats."
      },
      {
        "step": "Concept",
        "desc": "Develop the idea, script, storyboard or shot plan."
      },
      {
        "step": "Produce",
        "desc": "Coordinate the agreed filming, design and content creation work."
      },
      {
        "step": "Edit & publish-ready delivery",
        "desc": "Refine, format and export the final assets."
      }
    ],
    "receive": [
      "Content direction and creative concepts",
      "Scripts, storyboards or shot lists as scoped",
      "Edited video assets in agreed formats",
      "Supporting graphics, covers and thumbnails",
      "Channel-specific cut-downs and adaptations",
      "Content files ready for publishing"
    ],
    "intro": "We combine content thinking with visual production to create consistent, channel-ready communication. From creative concepts and scripts to design, editing and final delivery, each piece is developed around a clear audience and objective.",
    "tagline": "Turn your story into content worth watching.",
    "headline": "Content That Connects. Videos That Stay.",
    "lead": "Your audience experiences your brand through the stories, visuals and videos you share. AAVORAA helps plan and create content that communicates your value, brings your brand personality to life and gives your marketing channels something meaningful to publish.",
    "tools": "Adobe Premiere Pro, After Effects, Photoshop, Illustrator, CapCut and other production tools as appropriate.",
    "cta": "Let’s create content that gives your brand a stronger voice and a more memorable presence."
  },
  "Custom Software Development": {
    "name": "Custom Software Development",
    "whatWeDo": [
      {
        "name": "Business & Requirement Analysis",
        "desc": "Map existing workflows, user needs, business rules and system requirements before development begins."
      },
      {
        "name": "Custom Web Applications",
        "desc": "Build browser-based applications for internal operations, customer portals and business-specific workflows."
      },
      {
        "name": "Business Process Digitisation",
        "desc": "Convert manual or disconnected processes into structured digital workflows."
      },
      {
        "name": "System Integration",
        "desc": "Connect relevant systems and services through APIs and integrations where supported."
      },
      {
        "name": "Dashboards & Reporting",
        "desc": "Present operational information through role-relevant dashboards and reporting views."
      },
      {
        "name": "Maintenance & Enhancements",
        "desc": "Support agreed fixes, improvements, updates and feature development after launch."
      }
    ],
    "process": [
      {
        "step": "Discover",
        "desc": "Understand the business problem, users and current workflow."
      },
      {
        "step": "Specify",
        "desc": "Define scope, user journeys, features and technical approach."
      },
      {
        "step": "Build",
        "desc": "Develop the solution in planned stages with review points."
      },
      {
        "step": "Test & launch",
        "desc": "Validate functionality, resolve issues and deploy the agreed release."
      },
      {
        "step": "Improve",
        "desc": "Support ongoing optimisation based on feedback and evolving needs."
      }
    ],
    "receive": [
      "Requirement and scope documentation",
      "User flows and application structure",
      "Custom-developed software within agreed scope",
      "Testing and deployment support",
      "Technical handover documentation",
      "Post-launch support options"
    ],
    "intro": "We work from the problem outward: understanding how your team works, defining the right solution and building software that fits your business. The focus is on usability, maintainability and practical value—not adding technology for its own sake.",
    "tagline": "Software shaped around the way your business works.",
    "headline": "Your Business Needs More Than Off-the-Shelf Software.",
    "lead": "Every business has processes, requirements and challenges that standard tools may not fully address. AAVORAA develops custom software solutions designed around your operations, users and long-term business goals—helping bring disconnected activities into a more connected digital workflow.",
    "tools": "Technology is selected according to project needs and may include modern web frameworks, databases, cloud services and API technologies.",
    "cta": "Have a process that needs a better digital solution? Let’s explore what custom software can make possible."
  },
  "Website & App Development": {
    "name": "Website & App Development",
    "whatWeDo": [
      {
        "name": "Website Strategy & Structure",
        "desc": "Plan the site architecture, page hierarchy and user journeys around business goals."
      },
      {
        "name": "UI/UX Design",
        "desc": "Create intuitive layouts, wireframes and interface designs that make information easy to navigate."
      },
      {
        "name": "Business & Corporate Websites",
        "desc": "Develop professional websites that communicate your services, expertise and brand story."
      },
      {
        "name": "E-commerce Websites",
        "desc": "Build online storefront experiences with product discovery and agreed commerce functionality."
      },
      {
        "name": "Web & Mobile Applications",
        "desc": "Develop application experiences for the platforms and user requirements defined in the project."
      },
      {
        "name": "Optimisation & Support",
        "desc": "Improve agreed areas such as responsiveness, usability, performance and ongoing maintenance."
      }
    ],
    "process": [
      {
        "step": "Understand",
        "desc": "Define goals, audience, features, content and technical requirements."
      },
      {
        "step": "Structure",
        "desc": "Create sitemap, user flows and page or app architecture."
      },
      {
        "step": "Design",
        "desc": "Develop responsive UI concepts and refine key screens."
      },
      {
        "step": "Develop",
        "desc": "Build the approved experience and integrate agreed functionality."
      },
      {
        "step": "Validate & launch",
        "desc": "Test across relevant devices and browsers, then deploy."
      }
    ],
    "receive": [
      "Sitemap and user-flow structure",
      "Wireframes and UI designs",
      "Responsive website or app development",
      "Agreed integrations and functionality",
      "Testing and launch support",
      "Handover and maintenance options"
    ],
    "intro": "We bring structure, design and development together to create responsive websites and useful applications. Every project starts with the audience and the action you want them to take, then turns those needs into clear user journeys and dependable digital experiences.",
    "tagline": "Create digital experiences built for people and performance.",
    "headline": "Digital Experiences That Move Your Business Forward.",
    "lead": "Your website or app is often one of the first ways people interact with your business. AAVORAA designs and develops digital experiences that make it easier for visitors and users to understand, explore and engage with your products or services.",
    "tools": "Figma, HTML, CSS, JavaScript and suitable frontend, backend, CMS, database and hosting technologies selected per project.",
    "cta": "Let’s build a digital experience that makes the next step easy for your customers."
  },
  "SaaS & Digital Products": {
    "name": "SaaS & Digital Products",
    "whatWeDo": [
      {
        "name": "Product Discovery",
        "desc": "Clarify the problem, target users, value proposition, product goals and assumptions to validate."
      },
      {
        "name": "MVP Planning",
        "desc": "Prioritise the core features required to test the product concept with real users."
      },
      {
        "name": "Product UI/UX",
        "desc": "Design user journeys, dashboards, onboarding and interface patterns for a coherent experience."
      },
      {
        "name": "SaaS Platform Development",
        "desc": "Build agreed product modules, user roles, workflows and platform functionality."
      },
      {
        "name": "Integration & Data Design",
        "desc": "Plan and implement relevant integrations, data structures and system connections."
      },
      {
        "name": "Product Iteration",
        "desc": "Use feedback and product priorities to plan enhancements and future releases."
      }
    ],
    "process": [
      {
        "step": "Discover",
        "desc": "Define users, problem, value and success criteria."
      },
      {
        "step": "Prioritise",
        "desc": "Map the MVP, feature requirements and release plan."
      },
      {
        "step": "Design",
        "desc": "Prototype the key journeys and interface."
      },
      {
        "step": "Develop",
        "desc": "Build the product in reviewable stages."
      },
      {
        "step": "Launch & learn",
        "desc": "Release, gather feedback and prioritise improvements."
      }
    ],
    "receive": [
      "Product discovery and requirements summary",
      "MVP feature scope and roadmap",
      "User flows and interface designs",
      "Developed product features within scope",
      "Testing and release support",
      "Product handover and iteration recommendations"
    ],
    "intro": "Whether you are validating an idea or developing an existing product, we help translate product thinking into a buildable roadmap. We focus on the essential experience first, then create a foundation for learning, iteration and future development.",
    "tagline": "Turn a useful idea into a product people can use.",
    "headline": "From Product Idea to Digital Reality.",
    "lead": "A successful digital product needs more than a feature list. It needs a clear user problem, a thoughtful experience and a technical foundation that can evolve. AAVORAA helps businesses plan and develop SaaS platforms and digital products around real user needs and defined product goals.",
    "tools": "Figma, modern web application frameworks, APIs, databases, cloud infrastructure and analytics tools selected for the product.",
    "cta": "Have a product idea worth building? Let’s shape the first version around what users truly need."
  },
  "SEO & AI Search (GEO)": {
    "name": "SEO & AI Search (GEO)",
    "whatWeDo": [
      {
        "name": "SEO Audit",
        "desc": "Review technical health, indexing, site structure, content and opportunities for improvement."
      },
      {
        "name": "Keyword & Search Intent Research",
        "desc": "Identify relevant search themes and understand what users are trying to find."
      },
      {
        "name": "On-Page SEO",
        "desc": "Improve page titles, headings, metadata, internal links and content relevance."
      },
      {
        "name": "Technical SEO",
        "desc": "Address agreed technical factors such as crawlability, indexability, site structure and performance."
      },
      {
        "name": "Content Strategy",
        "desc": "Plan useful pages and content around audience questions, topics and business priorities."
      },
      {
        "name": "AI Search / GEO Readiness",
        "desc": "Structure clear, credible and well-organised information to improve the chance of being understood and surfaced in AI-assisted search experiences."
      }
    ],
    "process": [
      {
        "step": "Audit",
        "desc": "Establish the current visibility and technical baseline."
      },
      {
        "step": "Research",
        "desc": "Map keywords, questions, competitors and search intent."
      },
      {
        "step": "Optimise",
        "desc": "Prioritise technical and on-page improvements."
      },
      {
        "step": "Create",
        "desc": "Develop or refine content for relevant topics and audiences."
      },
      {
        "step": "Measure",
        "desc": "Review visibility, traffic and engagement, then refine the plan."
      }
    ],
    "receive": [
      "SEO audit and priority action list",
      "Keyword and search-intent map",
      "On-page optimisation recommendations or implementation",
      "Content briefs and page recommendations",
      "Technical SEO improvement plan",
      "Periodic performance reporting as agreed"
    ],
    "intro": "We connect technical health, search intent and content quality to create a practical visibility strategy. The work is focused on helping search engines and potential customers understand what you offer and why it matters.",
    "tagline": "Help the right audience discover your business.",
    "headline": "Be Found Where Your Customers Search.",
    "lead": "Search behaviour is changing, but visibility still begins with being useful, relevant and easy to understand. AAVORAA helps strengthen your organic search presence through SEO foundations and content structured for evolving search experiences, including AI-driven discovery.",
    "tools": "Google Search Console, Google Analytics, keyword research platforms, website crawlers and content optimisation tools as appropriate.",
    "cta": "Let’s make your business easier to discover—and your website more useful once people arrive."
  },
  "Performance Marketing": {
    "name": "Performance Marketing",
    "whatWeDo": [
      {
        "name": "Campaign Strategy",
        "desc": "Define campaign objectives, audience segments, offers, channels and measurement approach."
      },
      {
        "name": "Search Advertising",
        "desc": "Plan and manage relevant paid search campaigns around user intent and business goals."
      },
      {
        "name": "Social Media Advertising",
        "desc": "Develop paid campaigns across suitable social platforms using audience and creative testing."
      },
      {
        "name": "Creative & Landing Page Direction",
        "desc": "Align ad messaging and landing-page experience to make the next step clear."
      },
      {
        "name": "Tracking & Measurement",
        "desc": "Set up or review agreed conversion events, campaign tracking and reporting."
      },
      {
        "name": "Optimisation & Reporting",
        "desc": "Monitor results, test variations and recommend budget or campaign adjustments."
      }
    ],
    "process": [
      {
        "step": "Align",
        "desc": "Agree objectives, target audience, budget and conversion actions."
      },
      {
        "step": "Prepare",
        "desc": "Develop campaign structure, creative direction and tracking plan."
      },
      {
        "step": "Launch",
        "desc": "Activate campaigns and verify measurement."
      },
      {
        "step": "Optimise",
        "desc": "Review performance and test audience, creative and landing-page variables."
      },
      {
        "step": "Report",
        "desc": "Share insights, outcomes and next-step recommendations."
      }
    ],
    "receive": [
      "Campaign strategy and media plan",
      "Audience and targeting structure",
      "Ad copy and creative direction",
      "Campaign setup and management",
      "Conversion tracking plan",
      "Performance reports and optimisation recommendations"
    ],
    "intro": "We connect campaign strategy, creative, targeting and measurement to improve how your marketing budget works. Campaign decisions are guided by performance signals and business priorities rather than assumptions alone.",
    "tagline": "Turn marketing investment into measurable action.",
    "headline": "Campaigns Built to Perform. Decisions Built on Data.",
    "lead": "Paid campaigns should do more than generate clicks. They should reach the right audience, communicate a relevant offer and encourage meaningful action. AAVORAA plans and manages performance marketing campaigns with clear objectives, structured testing and ongoing optimisation.",
    "tools": "Google Ads, Meta Ads Manager, LinkedIn Campaign Manager and analytics/tracking tools selected for the campaign.",
    "cta": "Ready to make your campaigns more accountable? Let’s build a performance plan around your business goals."
  },
  "B2B & B2C Lead Generation": {
    "name": "B2B & B2C Lead Generation",
    "whatWeDo": [
      {
        "name": "Audience & Market Research",
        "desc": "Define target segments, buyer roles, customer needs and relevant channels."
      },
      {
        "name": "Lead Strategy",
        "desc": "Select suitable acquisition routes, offers, campaign themes and conversion points."
      },
      {
        "name": "Campaign & Outreach Support",
        "desc": "Develop and execute agreed inbound or outbound lead-generation activities."
      },
      {
        "name": "Landing Pages & Forms",
        "desc": "Create focused enquiry journeys with clear messaging and useful information capture."
      },
      {
        "name": "Lead Qualification & Routing",
        "desc": "Organise enquiries using agreed criteria and route them to the relevant team or workflow."
      },
      {
        "name": "Performance Review",
        "desc": "Track lead volume and quality indicators, then refine the approach."
      }
    ],
    "process": [
      {
        "step": "Define",
        "desc": "Align on ideal customer profiles, audience segments and goals."
      },
      {
        "step": "Build",
        "desc": "Develop messaging, offers, landing pages and capture mechanisms."
      },
      {
        "step": "Activate",
        "desc": "Launch the selected acquisition and outreach channels."
      },
      {
        "step": "Qualify",
        "desc": "Organise and route incoming leads using agreed rules."
      },
      {
        "step": "Improve",
        "desc": "Review quality and conversion patterns to refine campaigns."
      }
    ],
    "receive": [
      "Audience and lead strategy",
      "Campaign messaging and offer direction",
      "Lead capture landing-page or form requirements",
      "Lead qualification and routing logic",
      "Lead tracking and reporting structure",
      "Improvement recommendations"
    ],
    "intro": "We bring audience research, messaging, campaign execution and lead-flow planning together. The goal is to make it easier for potential customers to discover your offer, express interest and move into a clear follow-up journey.",
    "tagline": "Create a more consistent path from attention to enquiry.",
    "headline": "Reach the Right People. Start Better Conversations.",
    "lead": "Lead generation is about connecting the right audience with a relevant reason to take action. AAVORAA helps businesses plan and execute lead-generation programmes that attract, capture and organise enquiries across suitable B2B and B2C channels.",
    "tools": "CRM platforms, advertising channels, landing-page tools, forms, analytics and automation platforms based on the agreed workflow.",
    "cta": "Let’s create a lead-generation system that gives your team more relevant conversations to work with."
  },
  "Social Media Marketing": {
    "name": "Social Media Marketing",
    "whatWeDo": [
      {
        "name": "Social Media Strategy",
        "desc": "Define channel priorities, audience, content pillars, tone and publishing direction."
      },
      {
        "name": "Content Calendar",
        "desc": "Plan monthly or campaign-based content themes, formats and posting schedules."
      },
      {
        "name": "Creative Content Development",
        "desc": "Create static posts, carousels, stories, short-form video concepts and supporting copy."
      },
      {
        "name": "Page & Profile Optimisation",
        "desc": "Improve agreed profile elements, descriptions, links and brand presentation."
      },
      {
        "name": "Community & Engagement Direction",
        "desc": "Recommend practical approaches for responding, engaging and maintaining brand conversations."
      },
      {
        "name": "Insights & Reporting",
        "desc": "Review channel performance and identify content themes or formats worth improving."
      }
    ],
    "process": [
      {
        "step": "Audit",
        "desc": "Review current channels, audience and brand consistency."
      },
      {
        "step": "Plan",
        "desc": "Define content pillars, formats and calendar."
      },
      {
        "step": "Create",
        "desc": "Develop copy and creative assets for approval."
      },
      {
        "step": "Publish",
        "desc": "Prepare and schedule agreed content."
      },
      {
        "step": "Review",
        "desc": "Assess performance and refine upcoming content."
      }
    ],
    "receive": [
      "Social media strategy and channel recommendations",
      "Monthly or campaign content calendar",
      "Post copy, captions and creative assets",
      "Short-form video concepts or edits as scoped",
      "Publishing-ready content files",
      "Performance summary and next-step recommendations"
    ],
    "intro": "We focus on making your social channels purposeful—not simply active. Content themes, formats and messages are planned around your audience, brand identity and business objectives so each post has a clear role.",
    "tagline": "Build a social presence with something to say.",
    "headline": "Make Your Brand Part of the Conversation.",
    "lead": "Social media is where people discover brands, explore ideas and form opinions. AAVORAA helps businesses build a consistent social presence through content planning, creative development, publishing support and performance review.",
    "tools": "Meta Business Suite, Instagram, Facebook, LinkedIn, scheduling tools and creative platforms as appropriate.",
    "cta": "Let’s give your social channels a clearer voice, stronger visuals and a more consistent direction."
  },
  "E-commerce Marketing": {
    "name": "E-commerce Marketing",
    "whatWeDo": [
      {
        "name": "E-commerce Growth Strategy",
        "desc": "Review the store, audience, product range and current acquisition approach to identify opportunities."
      },
      {
        "name": "Product & Category Content",
        "desc": "Improve product messaging, category descriptions and campaign content for clearer discovery."
      },
      {
        "name": "Paid Acquisition",
        "desc": "Plan suitable search and social campaigns to bring relevant shoppers to the store."
      },
      {
        "name": "Conversion Journey Review",
        "desc": "Identify friction across key shopping steps and recommend improvements to product pages and checkout journeys."
      },
      {
        "name": "Retention & Remarketing",
        "desc": "Plan remarketing and customer communication to encourage repeat visits and purchases."
      },
      {
        "name": "Campaign & Performance Reporting",
        "desc": "Review traffic, engagement and sales-related indicators to guide future activity."
      }
    ],
    "process": [
      {
        "step": "Understand",
        "desc": "Review store structure, product range and business goals."
      },
      {
        "step": "Map",
        "desc": "Identify customer journeys, acquisition channels and conversion opportunities."
      },
      {
        "step": "Plan",
        "desc": "Create campaign, content and retention priorities."
      },
      {
        "step": "Activate",
        "desc": "Execute agreed marketing activities and improvements."
      },
      {
        "step": "Optimise",
        "desc": "Review performance and refine the customer journey."
      }
    ],
    "receive": [
      "E-commerce marketing audit",
      "Channel and campaign strategy",
      "Product and category content recommendations",
      "Paid campaign setup or management as scoped",
      "Remarketing and retention recommendations",
      "Performance reporting and optimisation plan"
    ],
    "intro": "We look at the customer journey as a connected experience—from the first product impression to the post-purchase relationship. Marketing activity is planned around the store’s products, audience, seasonality and commercial priorities.",
    "tagline": "Help more shoppers discover, choose and return.",
    "headline": "Turn Product Interest Into Online Sales.",
    "lead": "An e-commerce business needs more than visitors. It needs product discovery, compelling communication and a smooth path from browsing to purchase. AAVORAA helps online stores strengthen their marketing across acquisition, product content, campaigns and customer engagement.",
    "tools": "E-commerce platforms, Google Analytics, Google Ads, Meta Ads Manager, email/WhatsApp tools and feed-management solutions as required.",
    "cta": "Let’s make every stage of your online shopping journey work harder for your store."
  },
  "WhatsApp Marketing": {
    "name": "WhatsApp Marketing",
    "whatWeDo": [
      {
        "name": "WhatsApp Strategy",
        "desc": "Define the role of WhatsApp in customer acquisition, service, updates and retention."
      },
      {
        "name": "Campaign Messaging",
        "desc": "Develop concise message copy and creative direction for approved campaigns."
      },
      {
        "name": "Audience Segmentation",
        "desc": "Organise opted-in audiences into useful groups based on relevant customer attributes."
      },
      {
        "name": "Automated Responses & Flows",
        "desc": "Plan approved automated replies and workflows for common questions, enquiries and follow-ups."
      },
      {
        "name": "CRM & Platform Integration",
        "desc": "Connect WhatsApp with relevant CRM or business systems where supported and within platform policies."
      },
      {
        "name": "Campaign Tracking",
        "desc": "Review delivery and engagement indicators available through the selected platform."
      }
    ],
    "process": [
      {
        "step": "Plan",
        "desc": "Define audience, purpose, consent and communication rules."
      },
      {
        "step": "Structure",
        "desc": "Map message types, segments and response journeys."
      },
      {
        "step": "Create",
        "desc": "Prepare message copy, templates and creative assets."
      },
      {
        "step": "Connect",
        "desc": "Configure the selected platform and agreed integrations."
      },
      {
        "step": "Review",
        "desc": "Monitor available engagement data and refine communication."
      }
    ],
    "receive": [
      "WhatsApp communication strategy",
      "Audience segmentation approach",
      "Campaign message templates and creative",
      "Automated response or workflow map",
      "Integration requirements and setup as scoped",
      "Campaign performance summary"
    ],
    "intro": "We help connect WhatsApp communication to your customer journey. From message planning and audience segmentation to automation and enquiry handling, the focus is on relevant communication that makes it easier for customers to respond and take action.",
    "tagline": "Make customer communication more direct and useful.",
    "headline": "Turn Everyday Messages Into Better Customer Connections.",
    "lead": "WhatsApp can help businesses communicate with customers in a direct, familiar and timely way. AAVORAA helps plan WhatsApp marketing and communication workflows that support enquiries, updates, campaigns and customer follow-up with clear messaging and responsible audience practices.",
    "tools": "WhatsApp Business Platform or approved providers, CRM systems and automation tools selected for the business requirements.",
    "cta": "Let’s make your customer communication more timely, organised and valuable."
  },
  "Workflow & CRM Automation": {
    "name": "Workflow & CRM Automation",
    "whatWeDo": [
      {
        "name": "Process Mapping & Automation Audit",
        "desc": "Review existing workflows to identify repetitive steps, hand-offs, bottlenecks and automation opportunities."
      },
      {
        "name": "CRM & Lead-Routing Workflows",
        "desc": "Automate lead capture, assignment, status updates and follow-up tasks using agreed rules."
      },
      {
        "name": "Connected Business Workflows",
        "desc": "Connect forms, CRM, email and other business tools so information moves with less manual handling."
      },
      {
        "name": "Reporting Automation",
        "desc": "Reduce repeated reporting work by automating data collection, updates and report distribution where feasible."
      },
      {
        "name": "AI-Assisted Workflows",
        "desc": "Introduce AI support for selected document, content or communication tasks with appropriate review steps."
      },
      {
        "name": "Internal Campaign & Communication Tools",
        "desc": "Build or connect workflow tools that support structured internal or customer communication."
      }
    ],
    "process": [
      {
        "step": "Audit",
        "desc": "Map the current process, tools, users and pain points."
      },
      {
        "step": "Design",
        "desc": "Define the future workflow, rules, exceptions and approvals."
      },
      {
        "step": "Build",
        "desc": "Configure integrations and automation using suitable tools or APIs."
      },
      {
        "step": "Test",
        "desc": "Validate normal cases, exceptions and hand-offs with users."
      },
      {
        "step": "Deploy & support",
        "desc": "Launch the workflow, document it and refine based on use."
      }
    ],
    "receive": [
      "Process map and automation opportunity audit",
      "Workflow design and logic",
      "CRM and lead-routing automation",
      "Forms, email and system integrations",
      "Reporting or AI-assisted workflow components as scoped",
      "Testing, documentation and support options"
    ],
    "intro": "We identify where work gets repeated, delayed or passed between tools, then design automation around the actual process. The aim is to improve consistency, visibility and team capacity while keeping people involved where judgement is needed.",
    "tagline": "Reduce repetitive work. Give your team time back.",
    "headline": "Replace Repetitive Work With Smarter Processes.",
    "lead": "Manual tasks, disconnected tools and repeated data entry can slow teams down and make important information harder to track. AAVORAA helps businesses map these workflows and connect the systems they already use through practical automation.",
    "tools": "Zapier, Make, n8n, Custom APIs and Gmail API, depending on the workflow and integration requirements.",
    "cta": "Let’s identify the repetitive work your team can stop doing manually."
  },
  "AI Inside Operations": {
    "name": "AI Inside Operations",
    "whatWeDo": [
      {
        "name": "AI Readiness Assessment",
        "desc": "Review data, systems, workflows and team requirements to identify realistic AI opportunities."
      },
      {
        "name": "Document Intake & Processing",
        "desc": "Build workflows to receive, classify and extract relevant information from business documents in supported formats."
      },
      {
        "name": "Natural-Language Business Queries",
        "desc": "Enable users to ask questions about selected business information using text or voice interfaces where appropriate."
      },
      {
        "name": "AI-Assisted Communication",
        "desc": "Support drafting and summarisation of selected business content with review by authorised team members."
      },
      {
        "name": "Lead & Enquiry Classification",
        "desc": "Use defined criteria to classify, prioritise or route incoming enquiries for follow-up."
      },
      {
        "name": "Custom AI & API Integration",
        "desc": "Connect suitable AI capabilities to existing systems through APIs and workflow tools."
      }
    ],
    "process": [
      {
        "step": "Assess",
        "desc": "Understand the use case, data sources, risks and expected value."
      },
      {
        "step": "Prepare",
        "desc": "Confirm data access, quality, permissions and workflow requirements."
      },
      {
        "step": "Prototype",
        "desc": "Test the use case with representative examples."
      },
      {
        "step": "Integrate",
        "desc": "Connect the approved capability to the relevant process or system."
      },
      {
        "step": "Monitor",
        "desc": "Review accuracy, user feedback and exceptions; refine as needed."
      }
    ],
    "receive": [
      "AI readiness and use-case assessment",
      "Prioritised AI implementation roadmap",
      "Prototype or proof of concept as scoped",
      "AI-enabled workflow or integration",
      "Human review and exception-handling approach",
      "Usage documentation and improvement recommendations"
    ],
    "intro": "We focus on use cases grounded in your data, processes and team needs. This may include document intake, natural-language reporting queries, enquiry classification or drafting assistance—supported by clear controls and human review where appropriate.",
    "tagline": "Put practical AI to work inside your business.",
    "headline": "Bring Intelligence Into Everyday Operations.",
    "lead": "AI becomes valuable when it helps people make sense of information and complete real work more effectively. AAVORAA helps businesses identify practical AI opportunities and integrate AI-assisted capabilities into selected operational workflows.",
    "tools": "Python, Custom APIs, n8n, Supabase and AWS, with AI services selected according to the use case.",
    "cta": "Let’s find the right place for AI to make everyday work simpler and more informed."
  },
  "Growth & Transformation Consulting": {
    "name": "Growth & Transformation Consulting",
    "whatWeDo": [
      {
        "name": "Business & Data Audit",
        "desc": "Review relevant POS, CRM, operational and reporting information to understand current performance and gaps."
      },
      {
        "name": "Root-Cause & Process Analysis",
        "desc": "Identify recurring issues, process friction, unclear ownership and operational bottlenecks."
      },
      {
        "name": "Department & Role Mapping",
        "desc": "Understand team responsibilities, hand-offs and capability requirements across functions."
      },
      {
        "name": "Transformation Blueprint",
        "desc": "Prioritise initiatives and create a phased roadmap aligned with business goals."
      },
      {
        "name": "Organisation Structure & SOPs",
        "desc": "Develop role charters, process documentation and standard operating procedures where required."
      },
      {
        "name": "Leadership Alignment & Rollout Support",
        "desc": "Facilitate leadership discussions and create practical rollout guidance, accountability and KPI structures."
      }
    ],
    "process": [
      {
        "step": "Diagnose",
        "desc": "Review data, workflows, organisational structure and stakeholder input."
      },
      {
        "step": "Analyse",
        "desc": "Identify root causes, priority gaps and improvement opportunities."
      },
      {
        "step": "Design",
        "desc": "Develop the transformation blueprint, ownership model and KPIs."
      },
      {
        "step": "Align",
        "desc": "Review recommendations with leadership and agree priorities."
      },
      {
        "step": "Implement",
        "desc": "Support the rollout through agreed sessions, SOPs and progress reviews."
      }
    ],
    "receive": [
      "Business diagnostic and findings summary",
      "Root-cause and process improvement map",
      "Transformation roadmap and priority initiatives",
      "Organisation structure and role charters as scoped",
      "SOP and accountability framework",
      "Leadership presentation and rollout guidance"
    ],
    "intro": "We combine operational review, data analysis and organisational thinking to help leaders see where improvements matter most. The outcome is a structured plan that connects business priorities with responsibilities, processes and measurable action.",
    "tagline": "Find the friction. Define the next stage of growth.",
    "headline": "Turn Business Complexity Into a Clear Growth Plan.",
    "lead": "As a business grows, processes, responsibilities and reporting can become harder to manage. AAVORAA helps leadership teams understand what is holding the organisation back and translate those findings into a practical transformation roadmap.",
    "tools": "Excel, Whisper, Looker Studio and Notion, alongside relevant business data sources and workshop methods.",
    "cta": "Let’s turn your business challenges into a practical plan your team can act on."
  },
  "Digital Marketing": {
    "name": "Digital Marketing",
    "whatWeDo": [
      {
        "name": "Digital Marketing Strategy",
        "desc": "Build a clear marketing roadmap based on your business goals, audience and market position.",
        "points": [
          "Digital presence and competitor analysis",
          "Target audience research",
          "Marketing channel selection",
          "Campaign planning and execution",
          "Customer journey planning",
          "Marketing performance analysis"
        ]
      },
      {
        "name": "Search & Online Visibility",
        "desc": "Help potential customers discover your business when they search for relevant products and services.",
        "points": [
          "Search visibility strategy",
          "SEO planning and optimisation",
          "Website traffic improvement",
          "Search performance monitoring",
          "Online brand visibility"
        ]
      },
      {
        "name": "Social Media Marketing",
        "desc": "Create a consistent digital presence through relevant content and audience engagement.",
        "points": [
          "Social media strategy",
          "Content calendar planning",
          "Creative campaign development",
          "Platform management support",
          "Audience engagement",
          "Social media performance tracking"
        ]
      },
      {
        "name": "Digital Campaign Management",
        "desc": "Plan and execute campaigns that connect your brand with the right audience.",
        "points": [
          "Campaign strategy",
          "Audience targeting",
          "Campaign creative direction",
          "Lead generation campaigns",
          "Retargeting strategies",
          "Campaign optimisation"
        ]
      },
      {
        "name": "Analytics & Performance Tracking",
        "desc": "Understand what works and make informed marketing decisions.",
        "points": [
          "Website and campaign tracking",
          "Conversion monitoring",
          "Traffic and engagement analysis",
          "Marketing performance reports",
          "Growth recommendations"
        ]
      }
    ],
    "process": [
      {
        "step": "Discover",
        "desc": "Understand your business, audience, competition and objectives."
      },
      {
        "step": "Strategise",
        "desc": "Create a channel-wise digital marketing roadmap."
      },
      {
        "step": "Execute",
        "desc": "Launch campaigns and implement marketing activities."
      },
      {
        "step": "Optimise",
        "desc": "Analyse performance and improve marketing effectiveness."
      },
      {
        "step": "Scale",
        "desc": "Identify opportunities to expand successful marketing activities."
      }
    ],
    "receive": [
      "Digital marketing strategy",
      "Channel-wise marketing roadmap",
      "Campaign planning and execution",
      "Audience research and targeting",
      "Digital content and campaign creatives",
      "Website and campaign performance insights",
      "Marketing reports and recommendations"
    ],
    "closing": {
      "eyebrow": "Let's Build Your Digital Growth.",
      "title": "Be Visible. Be Relevant. Be Remembered.",
      "text": "Your next customer could be one meaningful digital interaction away. Let's build a marketing strategy that brings your business closer to them.",
      "label": "Book a Free Consultation"
    },
    "tagline": "Build Visibility. Attract Opportunities. Accelerate Growth.",
    "headline": "Your Business Deserves to Be Seen.",
    "heroCta": "Let's Grow Your Business",
    "whatHead": "Digital Marketing That Works Together",
    "whatIntro": "We bring different digital channels under one strategic direction, ensuring your marketing efforts work towards a common goal.",
    "tools": "Google Analytics 4 · Google Search Console · Google Ads · Meta Ads Manager · LinkedIn · Looker Studio · Canva · HubSpot.",
    "lead": "Your customers are online. Your brand should be where they are.",
    "intro": "AAVORAA develops digital marketing strategies that help businesses strengthen their online presence, reach relevant audiences and turn digital interactions into meaningful business opportunities. From channel strategy to campaign execution, we connect the right marketing activities to your business objectives.",
    "cta": "Your next customer could be one meaningful digital interaction away. Let's build a marketing strategy that brings your business closer to them."
  },
  "Content Marketing": {
    "name": "Content Marketing",
    "whatWeDo": [
      {
        "name": "Content Strategy & Planning",
        "desc": "Build a content direction that connects your business objectives with audience interests.",
        "points": [
          "Audience and industry research",
          "Content pillar development",
          "Topic and keyword research",
          "Content calendar planning",
          "Channel-specific content strategy",
          "Competitor content analysis"
        ]
      },
      {
        "name": "Website & Blog Content",
        "desc": "Communicate your expertise through clear, useful and search-friendly content.",
        "points": [
          "Website page content",
          "Blog articles",
          "Industry insights",
          "Educational articles",
          "Service descriptions",
          "SEO-focused content"
        ]
      },
      {
        "name": "Brand Storytelling",
        "desc": "Give your brand a distinctive voice through meaningful stories and communication.",
        "points": [
          "Brand story development",
          "Company profiles",
          "Founder stories",
          "Brand messaging",
          "Customer success stories",
          "Case studies"
        ]
      },
      {
        "name": "Social Media Content",
        "desc": "Keep your brand relevant with content designed for digital audiences.",
        "points": [
          "Social media post copy",
          "Carousel content",
          "Educational posts",
          "Promotional content",
          "Campaign storytelling",
          "Short-form video scripts"
        ]
      },
      {
        "name": "Content Distribution",
        "desc": "Make sure your content reaches the right audience through relevant channels.",
        "points": [
          "Content distribution planning",
          "Platform-specific adaptations",
          "Newsletter content",
          "Content repurposing",
          "Performance monitoring",
          "Content improvement recommendations"
        ]
      }
    ],
    "process": [
      {
        "step": "Research",
        "desc": "Understand your audience, industry, brand and content opportunities."
      },
      {
        "step": "Plan",
        "desc": "Define content themes, topics, formats and publishing schedules."
      },
      {
        "step": "Create",
        "desc": "Develop engaging content aligned with your brand voice."
      },
      {
        "step": "Publish",
        "desc": "Prepare and distribute content across selected channels."
      },
      {
        "step": "Analyse",
        "desc": "Review engagement and performance to improve future content."
      }
    ],
    "receive": [
      "Content marketing strategy",
      "Monthly or campaign-based content calendar",
      "Website and blog content",
      "Brand storytelling and messaging",
      "Social media content and scripts",
      "Case studies and educational content",
      "Content performance insights"
    ],
    "closing": {
      "eyebrow": "Let's Make Your Brand Worth Listening To.",
      "title": "Valuable Content Creates Lasting Connections.",
      "text": "Give your audience something useful, something relatable and something worth remembering.",
      "label": "Start Your Content Strategy"
    },
    "tagline": "Create Value. Build Trust. Become the Brand They Remember.",
    "headline": "Don't Just Promote. Give People a Reason to Connect.",
    "heroCta": "Let's Create Your Content Strategy",
    "whatHead": "Content With a Clear Purpose",
    "whatIntro": "We develop content that supports every stage of your customer journey—from discovering your brand to choosing your services.",
    "tools": "WordPress · Google Analytics 4 · Google Search Console · Canva · Adobe Creative Cloud · Notion · Grammarly.",
    "lead": "People connect with brands that understand their needs and provide something valuable.",
    "intro": "AAVORAA creates strategic content that educates, informs and engages your audience while communicating what makes your business different. From blogs and articles to brand storytelling and digital content, we help turn your expertise into meaningful communication.",
    "cta": "Give your audience something useful, something relatable and something worth remembering."
  },
  "LinkedIn Marketing": {
    "name": "LinkedIn Marketing",
    "whatWeDo": [
      {
        "name": "LinkedIn Company Page Management",
        "desc": "Build a professional company presence that communicates your brand's value.",
        "points": [
          "Company page setup and optimisation",
          "Company profile content",
          "Service and business descriptions",
          "Banner and visual direction",
          "Company page content planning",
          "Page performance monitoring"
        ]
      },
      {
        "name": "Personal Branding & Founder Positioning",
        "desc": "Position founders, leaders and professionals as recognisable voices in their industries.",
        "points": [
          "Personal profile optimisation",
          "Professional headline and summary",
          "Founder positioning strategy",
          "Thought leadership content",
          "Industry-focused personal posts",
          "Professional brand development"
        ]
      },
      {
        "name": "LinkedIn Content Marketing",
        "desc": "Share valuable ideas that make your business more visible and relevant.",
        "points": [
          "LinkedIn content strategy",
          "Industry insights and updates",
          "Educational and informative posts",
          "Founder and leadership posts",
          "Company announcements",
          "Case studies and success stories",
          "LinkedIn carousel content"
        ]
      },
      {
        "name": "B2B Lead Generation",
        "desc": "Connect with relevant businesses and decision-makers through targeted LinkedIn activities.",
        "points": [
          "Ideal customer profile research",
          "Industry and company targeting",
          "Decision-maker identification",
          "Connection strategy",
          "Personalised outreach messaging",
          "Lead qualification support",
          "CRM lead organisation"
        ]
      },
      {
        "name": "LinkedIn Engagement & Growth",
        "desc": "Build stronger professional relationships through consistent and relevant interactions.",
        "points": [
          "Audience engagement planning",
          "Industry conversation monitoring",
          "Relevant connection development",
          "Content engagement analysis",
          "Network growth strategy",
          "Performance reporting"
        ]
      }
    ],
    "process": [
      {
        "step": "Understand",
        "desc": "Identify your business goals, target industries and ideal audience."
      },
      {
        "step": "Optimise",
        "desc": "Strengthen company pages and relevant professional profiles."
      },
      {
        "step": "Strategise",
        "desc": "Develop a content, engagement and outreach plan."
      },
      {
        "step": "Execute",
        "desc": "Publish content and conduct targeted LinkedIn activities."
      },
      {
        "step": "Improve",
        "desc": "Monitor engagement, connections and lead-generation outcomes."
      }
    ],
    "receive": [
      "LinkedIn marketing strategy",
      "Company page optimisation",
      "Personal branding recommendations",
      "LinkedIn content calendar",
      "Post copy and creative assets",
      "Target audience and decision-maker research",
      "B2B outreach messaging",
      "Lead tracking and performance reports"
    ],
    "closing": {
      "eyebrow": "Let's Build Your Professional Presence.",
      "title": "The Right Connection Can Create the Next Opportunity.",
      "text": "Make your brand visible to the people who matter. Let's turn your LinkedIn presence into a valuable business channel.",
      "label": "Let's Talk LinkedIn Growth"
    },
    "tagline": "Build Authority. Connect With Decision-Makers. Generate Opportunities.",
    "headline": "Turn Your LinkedIn Presence Into Business Potential.",
    "heroCta": "Strengthen Your LinkedIn Presence",
    "whatHead": "More Than Connections. Meaningful Business Relationships.",
    "whatIntro": "We help you use LinkedIn strategically to increase visibility, establish credibility and create valuable professional connections.",
    "tools": "LinkedIn · LinkedIn Sales Navigator · Canva · Adobe Creative Cloud · CRM platforms · Analytics and reporting tools.",
    "lead": "LinkedIn is where professionals build relationships, share expertise and discover business opportunities.",
    "intro": "AAVORAA helps businesses and professionals establish a stronger LinkedIn presence through strategic positioning, meaningful content and targeted audience engagement. From company page development to B2B lead generation, we help your brand become part of the right professional conversations.",
    "cta": "Make your brand visible to the people who matter. Let's turn your LinkedIn presence into a valuable business channel."
  },
  "Paid Ads": {
    "name": "Paid Ads",
    "whatWeDo": [
      {
        "name": "Google Ads Management",
        "desc": "Reach people actively searching for products and services like yours.",
        "points": [
          "Google Search campaigns",
          "Display advertising",
          "Keyword research",
          "Search intent analysis",
          "Ad copy development",
          "Conversion tracking",
          "Campaign optimisation"
        ]
      },
      {
        "name": "Meta Ads Management",
        "desc": "Connect your business with relevant audiences across Facebook and Instagram.",
        "points": [
          "Facebook advertising",
          "Instagram advertising",
          "Audience research and targeting",
          "Lead generation campaigns",
          "Traffic and engagement campaigns",
          "Creative testing",
          "Retargeting campaigns"
        ]
      },
      {
        "name": "LinkedIn Ads Management",
        "desc": "Reach professional audiences, businesses and decision-makers through targeted advertising.",
        "points": [
          "B2B audience targeting",
          "Company and industry targeting",
          "Lead generation campaigns",
          "Sponsored content",
          "Professional audience segmentation",
          "Campaign performance analysis"
        ]
      },
      {
        "name": "Ad Creative & Campaign Development",
        "desc": "Create advertising messages that capture attention and encourage action.",
        "points": [
          "Campaign concepts",
          "Ad copywriting",
          "Static and carousel creatives",
          "Video ad concepts",
          "Landing-page messaging",
          "Call-to-action development",
          "Creative variations for testing"
        ]
      },
      {
        "name": "Retargeting & Remarketing",
        "desc": "Reconnect with people who have already interacted with your business.",
        "points": [
          "Website visitor retargeting",
          "Social media audience retargeting",
          "Customer audience campaigns",
          "Funnel-based advertising",
          "Audience exclusions",
          "Remarketing performance review"
        ]
      },
      {
        "name": "Campaign Analytics & Optimisation",
        "desc": "Understand campaign performance and improve results through informed decisions.",
        "points": [
          "Conversion tracking",
          "Cost-per-lead monitoring",
          "Click-through rate analysis",
          "Campaign budget optimisation",
          "Creative and audience testing",
          "Performance dashboards",
          "Campaign reporting"
        ]
      }
    ],
    "process": [
      {
        "step": "Discover",
        "desc": "Understand your goals, audience, budget and advertising requirements."
      },
      {
        "step": "Plan",
        "desc": "Select the appropriate platforms, campaign structure and targeting strategy."
      },
      {
        "step": "Create",
        "desc": "Develop campaign messaging, creatives and landing-page direction."
      },
      {
        "step": "Launch",
        "desc": "Set up campaigns, tracking and conversion measurement."
      },
      {
        "step": "Optimise",
        "desc": "Monitor results, test variations and refine campaign performance."
      }
    ],
    "receive": [
      "Paid advertising strategy",
      "Platform-wise campaign plan",
      "Audience research and targeting",
      "Ad copy and creative direction",
      "Campaign setup and management",
      "Conversion tracking configuration",
      "Retargeting strategy",
      "Performance reports and optimisation recommendations"
    ],
    "closing": {
      "eyebrow": "Make Your Advertising Work Smarter.",
      "title": "Better Targeting. Stronger Campaigns. Measurable Progress.",
      "text": "Let's build advertising campaigns that connect your business with the right audience and support your growth goals.",
      "label": "Get Your Campaign Strategy"
    },
    "tagline": "Reach Faster. Target Smarter. Make Every Campaign Count.",
    "headline": "Put Your Brand in Front of the Right People.",
    "heroCta": "Launch Your Next Campaign",
    "whatHead": "Advertising With a Clear Direction",
    "whatIntro": "We combine audience research, campaign strategy, creative communication and performance analysis to build more effective advertising campaigns.",
    "tools": "Google Ads · Meta Ads Manager · LinkedIn Campaign Manager · Google Analytics 4 · Google Tag Manager · Looker Studio.",
    "lead": "Getting attention online is important. Getting attention from the right audience is what makes the difference.",
    "intro": "AAVORAA plans and manages paid advertising campaigns that help businesses reach relevant audiences, generate enquiries and improve campaign performance. From audience targeting to creative development and optimisation, we focus on making your advertising investment work towards measurable business objectives.",
    "cta": "Let's build advertising campaigns that connect your business with the right audience and support your growth goals."
  },
  "Email Marketing": {
    "name": "Email Marketing",
    "whatWeDo": [
      {
        "name": "Email Marketing Strategy",
        "desc": "Create a clear communication plan based on your audience and business objectives.",
        "points": [
          "Email marketing audit",
          "Audience research",
          "Campaign planning",
          "Email frequency strategy",
          "Customer journey mapping",
          "Email marketing calendar"
        ]
      },
      {
        "name": "Email Campaign Management",
        "desc": "Deliver relevant messages through structured email campaigns.",
        "points": [
          "Promotional email campaigns",
          "Product and service announcements",
          "Company updates",
          "Newsletter campaigns",
          "Event invitations",
          "Seasonal and festive campaigns"
        ]
      },
      {
        "name": "Email Design & Copywriting",
        "desc": "Create emails that communicate clearly and encourage meaningful action.",
        "points": [
          "Email subject line development",
          "Email copywriting",
          "Newsletter content",
          "Responsive email templates",
          "Visual email design",
          "Call-to-action development"
        ]
      },
      {
        "name": "Email Automation",
        "desc": "Create automated communication journeys that help maintain consistent customer engagement.",
        "points": [
          "Welcome email sequences",
          "Lead nurturing workflows",
          "Follow-up email automation",
          "Enquiry acknowledgement emails",
          "Customer re-engagement campaigns",
          "Behaviour-based email journeys where supported"
        ]
      },
      {
        "name": "Audience Segmentation & Personalisation",
        "desc": "Make communication more relevant by organising audiences around their interests and interactions.",
        "points": [
          "Subscriber list organisation",
          "Audience segmentation",
          "Personalised email content",
          "Customer lifecycle communication",
          "Contact list management",
          "Consent and subscription preference management"
        ]
      },
      {
        "name": "Email Performance & Optimisation",
        "desc": "Understand how your audience interacts with your emails and improve future campaigns.",
        "points": [
          "Email delivery monitoring",
          "Open and click reporting where available",
          "Conversion tracking",
          "Subject line testing",
          "Campaign performance analysis",
          "List health and engagement review"
        ]
      }
    ],
    "process": [
      {
        "step": "Understand",
        "desc": "Identify your audience, business objectives and email marketing requirements."
      },
      {
        "step": "Organise",
        "desc": "Structure subscriber lists, segments and communication journeys."
      },
      {
        "step": "Create",
        "desc": "Develop email content, design and campaign templates."
      },
      {
        "step": "Automate & Send",
        "desc": "Configure approved campaigns and automated email workflows."
      },
      {
        "step": "Measure",
        "desc": "Analyse campaign engagement and improve future communication."
      }
    ],
    "receive": [
      "Email marketing strategy",
      "Email campaign calendar",
      "Newsletter content and design",
      "Promotional email campaigns",
      "Automated email sequences",
      "Subscriber segmentation strategy",
      "Email templates",
      "Campaign performance reports",
      "Continuous improvement recommendations"
    ],
    "closing": {
      "eyebrow": "Let's Make Every Email Meaningful.",
      "title": "Stay in Their Inbox. Stay in Their Mind.",
      "text": "Build stronger customer relationships through relevant communication that keeps your brand connected with your audience.",
      "label": "Plan Your Email Campaigns"
    },
    "tagline": "Build Relationships. Nurture Leads. Stay Connected.",
    "headline": "Your Next Customer Might Be in Their Inbox.",
    "heroCta": "Start Your Email Marketing",
    "whatHead": "Communication That Goes Beyond the Inbox.",
    "whatIntro": "We develop email marketing strategies that support customer engagement, lead nurturing and business communication throughout the customer journey.",
    "tools": "Mailchimp · Brevo · HubSpot · Zoho Campaigns · CRM platforms · Email automation tools · Google Analytics 4.",
    "lead": "Every customer interaction is an opportunity to build a relationship.",
    "intro": "AAVORAA helps businesses use email marketing to communicate with their audience, nurture potential customers and maintain meaningful connections through relevant and well-timed campaigns. From newsletters to automated email journeys, we create communication strategies that keep your brand connected with the people who matter.",
    "cta": "Build stronger customer relationships through relevant communication that keeps your brand connected with your audience."
  },
  "Personal Branding": {
    "name": "Personal Branding",
    "tagline": "Be the name people recognise, trust and remember.",
    "headline": "People Buy From People They Trust.",
    "lead": "Clients, partners and talent often look at the people behind a business before they look at the business itself. AAVORAA helps founders, leaders and professionals build a personal brand that reflects who they are, what they stand for and the value they bring.",
    "intro": "We start with clarity — your expertise, audience and the reputation you want to own — then turn it into a consistent voice and a visible presence across the platforms that matter to you. The goal is credibility that grows over time and supports your business, not attention for its own sake.",
    "whatWeDo": [
      {
        "name": "Personal Brand Discovery",
        "desc": "Understand your story, strengths, expertise and the audience you want to reach.",
        "points": [
          "Personal brand audit",
          "Audience and peer review",
          "Strengths and expertise mapping"
        ]
      },
      {
        "name": "Positioning & Messaging",
        "desc": "Define what you want to be known for and how you talk about it.",
        "points": [
          "Personal positioning statement",
          "Core messages and topics",
          "Tone of voice guidance"
        ]
      },
      {
        "name": "Profile Optimisation",
        "desc": "Make your online profiles clear, credible and consistent with your position.",
        "points": [
          "LinkedIn profile, headline and summary",
          "Professional bio and speaker profile",
          "Profile visuals and banner direction"
        ]
      },
      {
        "name": "Thought Leadership Content",
        "desc": "Share useful ideas that show your expertise and keep you visible.",
        "points": [
          "Content pillars and calendar",
          "Posts, articles and carousels",
          "Ghostwriting in your voice"
        ]
      },
      {
        "name": "Visual Identity & Photography",
        "desc": "Give your personal brand a consistent, professional look.",
        "points": [
          "Personal visual style",
          "Professional photoshoot direction",
          "Templates for posts and presentations"
        ]
      },
      {
        "name": "Visibility & Opportunities",
        "desc": "Extend your presence beyond your own profile.",
        "points": [
          "Speaking and podcast opportunities",
          "PR and media profile support",
          "Engagement and network growth"
        ]
      }
    ],
    "process": [
      {
        "step": "Discover",
        "desc": "Understand your goals, story, expertise and audience."
      },
      {
        "step": "Define",
        "desc": "Shape your positioning, key messages and voice."
      },
      {
        "step": "Build",
        "desc": "Optimise your profiles and create your visual and content system."
      },
      {
        "step": "Publish",
        "desc": "Share consistent, valuable content across the right platforms."
      },
      {
        "step": "Grow",
        "desc": "Review engagement and opportunities, then refine the plan."
      }
    ],
    "receive": [
      "Personal brand audit and positioning summary",
      "Key messages, topics and tone-of-voice guide",
      "Optimised LinkedIn and professional profiles",
      "Professional bio and speaker profile",
      "Content calendar and ghostwritten posts",
      "Visual templates and photography direction",
      "Monthly visibility and engagement report"
    ],
    "tools": "LinkedIn, Canva, Adobe Creative Cloud, Notion and scheduling tools as appropriate.",
    "cta": "Let’s build a personal brand that opens doors for you and your business.",
    "heroCta": "Build Your Personal Brand",
    "closing": {
      "eyebrow": "Let’s Build Your Personal Brand.",
      "title": "Be Known for What You Do Best.",
      "text": "Let’s build a personal brand that opens doors for you and your business.",
      "label": "Start Your Personal Brand"
    }
  }
};

/** Site service names that differ from the document's headings. */
const alias: Record<string, string> = {
  'SEO & AI Search Visibility': 'SEO & AI Search (GEO)',
  'Lead Generation': 'B2B & B2C Lead Generation',
};
export const copyFor = (name: string): ServiceCopy | undefined => serviceCopy[alias[name] ?? name];
