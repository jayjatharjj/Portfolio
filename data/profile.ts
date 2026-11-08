export const profile = {
  name: "Jay Santosh Jathar",
  short: "Jay Jathar",
  initials: "jj",
  email: "jayjatharjj@gmail.com",
  location: "Pune, India",
  github: "https://github.com/jayjatharjj",
  linkedin: "https://www.linkedin.com/in/jayjathar1409",
  // Drop a PDF into /public and set e.g. "resume.pdf" to show the download button.
  resume: "",
  headline: { lead: "I build Java applications &", accent: "ship them on the cloud." },
  intro:
    "Java developer with 3+ years of experience building Spring Boot microservices and deploying them on AWS and Azure. I build frontends with AI-assisted development, I have growing hands-on experience with agentic AI, and I take on freelance client projects alongside my day job.",
};

export type FlowNode = { icon: string; color: string; title: string; sub: string };
export const flow: FlowNode[] = [
  { icon: "2001", color: "#ff6d5a", title: "Born", sub: "2001" },
  { icon: "’17", color: "#f59e0b", title: "School", sub: "completed in 2017" },
  { icon: "’19", color: "#3b82f6", title: "Junior college", sub: "2019 · interest in web apps began" },
  { icon: "’23", color: "#22c55e", title: "Engineering", sub: "first class with distinction · fell in love with Java" },
  { icon: "INT", color: "#8b7bff", title: "Internships", sub: "SQL, Java & back-end, started early" },
  { icon: "2D", color: "#ec4899", title: "TwoDots", sub: "Oct 2023 – Jul 2026" },
  { icon: "BGI", color: "#14b8a6", title: "Bajaj General Insurance", sub: "Jul 2026 – now" },
  { icon: "→", color: "#64748b", title: "What's next", sub: "curious · growing in agentic AI" },
];

export type Stat = { label: string; n?: number; suffix?: string; text?: string };
export const stats: Stat[] = [
  { text: "8.32", label: "CGPA · B.E. IT, first class with distinction" },
  { n: 4, label: "internships, started early in college" },
  { n: 3, suffix: "+", label: "years of professional experience" },
  { n: 6, suffix: "+", label: "freelance client projects, plus landing pages" },
];

export type Project = { name: string; sub: string; stack: string; bullets: string[] };
export type Job = {
  company: string;
  role: string;
  when: string;
  where: string;
  current?: boolean;
  internship?: boolean;
  bullets?: string[];
  chips?: string[];
  projects?: Project[];
};

export const jobs: Job[] = [
  {
    company: "Bajaj General Insurance",
    role: "Full Stack Java Developer · Payroll: Pinnacle Technology",
    when: "Jul 2026 — Present",
    where: "Pune, India",
    current: true,
    bullets: [
      "Designed an AWS SQS FIFO flow (one message per claim) moving 60–100 documents per claim from DMS to S3; handles hundreds of claims daily.",
      "Configured FIFO SQS queues (DLQ, content-based deduplication, message group ID, retention) and integrated them with the app on EC2.",
      "Built AI workflows in n8n Cloud, using task-specific models, that generate claim summaries and flag contradictions and potential fraud across claim data and documents.",
      "Developed claim draft generation based on business logic defined by the legal team.",
      "Proactively redesigned the VLO React.js UI into a modern, clean interface, earning stakeholder approval and appreciation.",
    ],
    chips: ["Java", "Spring Boot", "AWS SQS · EC2 · S3", "React.js", "n8n Cloud"],
  },
  {
    company: "TwoDots Software Services",
    role: "Java Full Stack Developer · Cloud & Microservices",
    when: "Oct 2023 — Jul 2026",
    where: "Pune, India",
    projects: [
      {
        name: "Smart360",
        sub: "enterprise data collaboration platform",
        stack: "Java 17, Spring Boot, Spring Cloud, Vue 3, TypeScript, D3.js, PostgreSQL, AWS S3, GitLab CI/CD",
        bullets: [
          "Built 5 Spring Boot microservices and 60+ Vue.js components, delivering an enterprise data management platform with 100% client specification compliance.",
          "Implemented JWT/OAuth2 authentication with role-based access control at repository, table, and permission levels, reducing sign-in time by 60%",
          "Developed interactive D3.js visualizations with dynamic data tables supporting 10+ data types, bulk operations, and advanced filtering.",
          "Transformed monolithic user management system to microservices architecture with automated email notifications (Brevo), improving communication efficiency by 30%",
        ],
      },
      {
        name: "Deep Fathom / Benthic",
        sub: "compliance & risk management platform",
        stack: "Azure (ACA, PostgreSQL, Key Vault, Functions), Kubernetes, Docker, GitLab CI/CD, Bicep (IaC)",
        bullets: [
          "Provisioned and managed 30+ Azure resources across staging (Commercial) and production (FedRAMP GovCloud), including Container Apps, PostgreSQL Flexible Server, Key Vault, Redis Cache, Blob Storage, and Front Door Premium.",
          "Architected secure VNet topology with 6 subnets and 6 NSGs (21 security rules) per environment, implementing private endpoints, Azure Jumphost VM access.",
          "Configured PostgreSQL 17 with 3 least-privilege roles and implemented Row-Level Security across 50+ tables for multi-tenant isolation, managing 60+ schema migrations",
        ],
      },
      {
        name: "WebX & ImageX",
        sub: "AI web generator & AI image generator",
        stack: "Java 17, Spring Boot 3.x, React 19, TypeScript, PostgreSQL/MySQL, AWS S3, GitLab API",
        bullets: [
          "Integrated 5+ AI models through unified proxy architecture with intelligent routing, async processing for long-running operations (2-20 min)",
          "Built end-to-end AI website generator pipeline (keyword analysis → layout → HTML/CSS → image generation → GitLab deployment), reducing website creation from days to minutes with 100% automated deployment.",
          "Developed multi-provider image platform combining Freepik API, AI text-to-image generation, and background removal with image processing pipeline (resize, compress, convert) and S3 version-tracked storage.",
        ],
      },
    ],
  },
  {
    company: "Futurense Technologies",
    role: "Data Specialist · Apprenticeship",
    when: "May 2023 — Sep 2023",
    where: "Bengaluru, India · On-site",
    internship: true,
    bullets: [
      "Leveraged advanced Big Data technologies to handle larger datasets and employed advanced analysis techniques.",
      "Hands-on experience in multiple projects with diverse client scenarios, utilizing data engineering technologies to solve complex problems.",
      "Proficient in data analysis and visualization, extracting actionable insights that enhance decision-making processes.",
    ],
    chips: ["MySQL", "Sqoop", "Big Data"],
  },
  {
    company: "Biencaps Systems Pvt. Ltd.",
    role: "Back-end Developer · Internship",
    when: "Sep 2022 — May 2023",
    where: "Pune, India · On-site",
    internship: true,
    bullets: [
      "Developed expertise in client-server architecture, APIs, module-view control, frameworks, design patterns, and more.",
      "Proficient in Java (Spring Boot, Hibernate, Spring Data JPA) and practiced these skills on 100+ standalone functions and API setups.",
      "Contributed to the completion of 2 major projects: The Video Streaming Application and Student Management System.",
      "Collaborated with senior developers, ensuring seamless teamwork and knowledge sharing.",
    ],
    chips: ["Java", "Spring Boot", "Hibernate", "Spring Data JPA", "MySQL"],
  },
  {
    company: "Apptware",
    role: "Java Developer · Internship",
    when: "Aug 2022 — Oct 2022",
    where: "Pune, India · On-site",
    internship: true,
    bullets: [
      "Utilized Stream API, Spring Data JPA, RESTful API, and Spring Boot to build modules, enhancing system consistency.",
      "Cooperated with the team to optimize code efficiency, enhancing team efforts.",
      "Assisted in developing wallet service and delivery module for Apptmart, improving user experience.",
    ],
    chips: ["Core Java", "Spring Boot", "Stream API", "REST"],
  },
  {
    company: "Kantascrypt",
    role: "SQL Database Developer · Internship",
    when: "Oct 2021 — Jun 2022",
    where: "Remote",
    internship: true,
    bullets: [
      "Crafted and optimized over 100 complex queries, Stored Procedures, Functions, and Triggers, enhancing database performance.",
      "Partnered with business analysts to align schema with business requirements, ensuring a 100% fit.",
      "Innovated and normalized tables, improving data integrity and reducing query response time by 15%.",
    ],
    chips: ["SQL", "Stored procedures", "Triggers"],
  },
];

export type Work = { num: string; tag: string; title: string; text: string; metrics: [string, string][] };
export const work: Work[] = [
  {
    num: "01",
    tag: "Insurance · AI",
    title: "Virtual Legal Officer",
    text: "A claims analysis platform for the legal team: queued document ingestion on AWS SQS, AI-generated summaries with contradiction and fraud flags, and automated drafts behind a clean React UI.",
    metrics: [["60–100", "docs per claim"], ["100s", "claims per day"]],
  },
  {
    num: "02",
    tag: "Cloud · Security",
    title: "Benthic on FedRAMP GovCloud",
    text: "Modular Bicep infrastructure across Commercial and GovCloud with isolated networking and Postgres Row-Level Security for true multi-tenancy.",
    metrics: [["30+", "Azure resources"], ["57%", "faster pipeline"]],
  },
  {
    num: "03",
    tag: "Data platform",
    title: "Smart360",
    text: "Enterprise data collaboration platform on Spring Boot microservices and Vue 3, with D3.js visualizations and fine-grained role-based access.",
    metrics: [["5", "microservices"], ["60+", "Vue components"], ["30+", "releases"]],
  },
  {
    num: "04",
    tag: "Generative AI",
    title: "WebX & ImageX",
    text: "Multi-model AI platforms that go from a keyword to a deployed website and generate, edit and store images across providers.",
    metrics: [["5+", "AI models"], ["20+", "API endpoints"]],
  },
];

export const stack: { title: string; items: string[] }[] = [
  { title: "Languages", items: ["Java", "Python", "JavaScript", "TypeScript"] },
  { title: "Backend", items: ["Spring Boot", "Spring Cloud", "Spring Data JPA", "Hibernate", "REST", "OAuth2 · JWT"] },
  { title: "Cloud & DevOps", items: ["AWS EC2 · S3 · SQS", "Azure", "Docker", "Kubernetes", "GitLab CI/CD", "Jenkins", "Bicep", "Linux"] },
  { title: "Data", items: ["PostgreSQL", "MySQL", "Redis"] },
  { title: "Frontend (AI-assisted)", items: ["React", "Vue.js", "D3.js", "Tailwind"] },
  { title: "Growing in", items: ["Agentic AI", "n8n workflows", "LLM APIs"] },
];

export type FreelanceStatus = "Live" | "In progress" | "Awaiting client";
export type Client = { name: string; url?: string; status: FreelanceStatus; text: string };
export const freelance: Client[] = [
  {
    name: "Grahboli",
    url: "https://grahboli.com/",
    status: "Live",
    text: "Astrology consultation platform: slot booking, Razorpay payments, Google Calendar and WhatsApp notifications. Spring Boot + MySQL backend, React frontend.",
  },
  {
    name: "Electric Desk",
    url: "https://electricdesk.in/home/",
    status: "Live",
    text: "Website for an electrical maintenance and installation company in Nagpur, with service listings and a booking form.",
  },
  {
    name: "Swamini Foods",
    url: "https://www.swaminifoods.in/",
    status: "Live",
    text: "Business website for a food brand.",
  },
  {
    name: "Dnyanraj Industries",
    url: "https://www.dnyanrajindustries.com/",
    status: "Live",
    text: "Business website for Dnyanraj Industries.",
  },
  {
    name: "SPCA World",
    status: "Awaiting client",
    text: "Shutdown-loss calculator landing page that captures leads into Google Sheets with WhatsApp follow-up. Built; waiting on client changes before deployment.",
  },
  {
    name: "The Munchin Co",
    status: "In progress",
    text: "Full-stack web app: React (Vite, Tailwind, 3D visuals) frontend with an Express + MySQL API. Currently in development.",
  },
];

export const certifications = [
  { name: "Microsoft Certified: Azure Developer Associate", date: "Jan 2026" },
  { name: "Oracle Cloud Infrastructure 2025 Certified: Generative AI Professional", date: "Dec 2025" },
];
export const achievements = [
  { name: "Appreciation Award — Exceptional Work Delivery, TwoDots", date: "Feb 2026" },
  { name: "Spotlight Award — Quick Learner, TwoDots", date: "Feb 2024" },
];
export const education = {
  name: "B.E. Information Technology · Smt. Kashibai Navale College of Engineering, Savitribai Phule Pune University",
  note: "CGPA 8.32 / 10",
  date: "Jun 2023",
};
