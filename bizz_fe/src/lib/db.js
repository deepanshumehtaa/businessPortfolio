import { DatabaseSync } from "node:sqlite";
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "src", "data");
const DB_PATH = path.join(DATA_DIR, "database.sqlite3");

// Ensure Data Directory Exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Open / Create SQLite Database
const db = new DatabaseSync(DB_PATH);

// Enable WAL Mode and Busy Timeout for multi-worker concurrency
try {
  db.exec("PRAGMA journal_mode = WAL;");
  db.exec("PRAGMA busy_timeout = 5000;");
} catch (err) {
  // Ignore if locked by concurrent worker
}

// Initialize Database Tables and Initial Seed Data
function initDatabase() {
  try {
    // 1. Services Table
    db.exec(`
      CREATE TABLE IF NOT EXISTS services (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        category TEXT NOT NULL,
        summary TEXT NOT NULL,
        features TEXT NOT NULL,
        description TEXT NOT NULL
      );
    `);

    // 2. Technologies Table
    db.exec(`
      CREATE TABLE IF NOT EXISTS technologies (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        desc TEXT NOT NULL
      );
    `);

    // 3. Categories Table
    db.exec(`
      CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL
      );
    `);

    // 4. Blogs Table
    db.exec(`
      CREATE TABLE IF NOT EXISTS blogs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        author TEXT NOT NULL,
        category_id INTEGER NOT NULL,
        category_name TEXT NOT NULL,
        category_slug TEXT NOT NULL,
        summary TEXT NOT NULL,
        image_url TEXT NOT NULL,
        content TEXT NOT NULL,
        published_at TEXT NOT NULL
      );
    `);

    // 5. Enquiries Table
    db.exec(`
      CREATE TABLE IF NOT EXISTS enquiries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        company TEXT,
        enquiry_type TEXT,
        message TEXT,
        status TEXT DEFAULT 'New',
        created_at TEXT NOT NULL
      );
    `);

    // 6. Calls Table
    db.exec(`
      CREATE TABLE IF NOT EXISTS calls (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        scheduled_datetime TEXT NOT NULL,
        notes TEXT,
        created_at TEXT NOT NULL
      );
    `);

    // 7. Demos Table
    db.exec(`
      CREATE TABLE IF NOT EXISTS demos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        company TEXT,
        service_required TEXT NOT NULL,
        booking_date TEXT NOT NULL,
        booking_time TEXT NOT NULL,
        is_read INTEGER DEFAULT 0,
        is_archived INTEGER DEFAULT 0,
        created_at TEXT NOT NULL
      );
    `);

    // Ensure columns exist on existing database files
    try {
      db.exec("ALTER TABLE demos ADD COLUMN phone TEXT;");
    } catch (e) {}
    try {
      db.exec("ALTER TABLE demos ADD COLUMN is_read INTEGER DEFAULT 0;");
    } catch (e) {}
    try {
      db.exec("ALTER TABLE demos ADD COLUMN is_archived INTEGER DEFAULT 0;");
    } catch (e) {}

    // Seed Initial Data if tables are empty
    const countServices = db.prepare("SELECT COUNT(*) as count FROM services").get().count;
    if (countServices === 0) {
      const insertService = db.prepare(`
        INSERT INTO services (title, slug, category, summary, features, description)
        VALUES (?, ?, ?, ?, ?, ?)
      `);

      const initialServices = [
        [
          "Custom Software Development",
          "custom-software-development",
          "Software Engineering",
          "Tailor-made software architectures, enterprise ERP, CRM, and bespoke billing engines built to automate your operations.",
          JSON.stringify(["Legacy Modernization", "Bespoke ERP/CRM", "Multi-tenant SaaS", "Custom Billing Engines"]),
          "### Tailored Software Engineering for Global Enterprises\n\nWe design, build, and deploy robust, custom software solutions that integrate seamlessly with your existing infrastructure. From legacy modernization to building new ERP/CRM systems from scratch, our software is engineered for scale, speed, and absolute security.\n\n#### What We Deliver:\n* **Enterprise Resource Planning (ERP):** Centralize operations, HR, finance, and logistics.\n* **Customer Relationship Management (CRM):** Sales tracking, pipeline management, and contact logs.\n* **Custom Billing Systems:** Complex multi-tenant subscription models and custom invoicing pipelines.\n* **Legacy Systems Modernization:** Upgrade older systems to modern web frameworks without downtime."
        ],
        [
          "AI & Machine Learning Automation",
          "ai-ml-automation",
          "AI & Automation",
          "Neural automation, intelligent chatbots, predictive analytics, and customized generative AI tools designed to optimize business logic.",
          JSON.stringify(["Generative AI & LLMs", "Predictive Analytics", "RAG Support Agents", "Computer Vision & OCR"]),
          "### Automating Workflows with Smart Machine Learning Models\n\nBridge the gap between data and action. We build intelligent automation systems using machine learning, computer vision, and Large Language Models (LLMs) to automate customer support, extract structured insights, and predict sales trends.\n\n#### What We Deliver:\n* **Generative AI Platforms:** Private instances of custom LLMs tuned on your corporate knowledge base.\n* **Predictive Analytics:** Forecasting sales, stock demand, and customer behavior with ML models.\n* **Intelligent Chatbots:** RAG-powered bots capable of solving customer tickets in real-time.\n* **Document Data Extraction:** Auto-scanning invoices, resumes, and PDFs using OCR and AI classifiers."
        ],
        [
          "SaaS Platform Engineering",
          "saas-platform-engineering",
          "Software Engineering",
          "Scalable, secure, and multi-tenant SaaS cloud platforms featuring subscriptions, metered usage, and high-speed API backends.",
          JSON.stringify(["Multi-tenant Databases", "Stripe Metered Billing", "FastAPI/DRF Backends", "OAuth & SSO integration"]),
          "### Launching Enterprise SaaS Products at Speed\n\nTurn your SaaS ideas into scalable cloud platforms. We build clean, multi-tenant architectures featuring robust API structures, secure JWT/OAuth session controls, Stripe/PayPal payment hooks, and serverless background workers.\n\n#### What We Deliver:\n* **Multi-tenant Infrastructure:** Secure data isolation between accounts with seamless cross-region performance.\n* **Metered Billing & Subscriptions:** Usage-based tracking, subscription tiers, and recurring credit systems.\n* **Restful & GraphQL APIs:** High-throughput backend endpoints optimized for React/Next.js/Mobile clients.\n* **Third-Party Integrations:** Connect seamlessly with HubSpot, Salesforce, Slack, Sendgrid, and Twilio."
        ],
        [
          "Mobile App Development",
          "mobile-app-development",
          "Mobile Apps",
          "Premium cross-platform and native iOS & Android applications featuring offline synchronization, animations, and geofencing.",
          JSON.stringify(["React Native & Flutter", "Native Swift & Kotlin", "Offline Synchronization", "Push Alerts & Geofencing"]),
          "### Engaging Mobile Experiences Engineered for Scale\n\nWe build high-performance mobile apps with fluid animations, intuitive layouts, and swift responsiveness. Utilizing native Kotlin/Swift and cross-platform Flutter/React Native frameworks, we deliver features like background sync, push alerts, and location routing.\n\n#### What We Deliver:\n* **Cross-Platform Apps:** Flutter & React Native setups to launch on iOS and Android with a single codebase.\n* **Native iOS & Android:** Swift and Kotlin code for memory-critical, high-performance needs.\n* **Offline-First Synchronization:** Work seamlessly without internet connection; auto-sync data on connection restore.\n* **Geofencing & CoreLocation:** Real-time user tracking, map routing, and proximity alerts."
        ],
        [
          "Performance Marketing & Analytics",
          "performance-marketing-analytics",
          "Marketing Solutions",
          "ROI-focused Google Ads, Meta Ads, and custom analytics setups engineered to maximize acquisition without wasting budget.",
          JSON.stringify(["Google Search PPC Ads", "Meta Remarketing Funnels", "GA4 Event Architectures", "Landing Page A/B Testing"]),
          "### Data-Driven Acquisition for Software & Technology Brands\n\nNote: We are not a simple social media posting agency. We specialize strictly in performance-driven PPC campaigns, high-intent Google Search ads, Meta sales retargeting, and Google Analytics 4 conversion architectures to scale customer acquisitions.\n\n#### What We Deliver:\n* **Google Search & Shopping Ads:** Capture high-intent buyer clicks for your services or products.\n* **Meta Sales Funnels:** Retarget visitors with structured ad creatives to secure demo bookings.\n* **GA4 & Funnel Tracking:** Setup end-to-end custom event tracking to measure cost-per-acquisition (CPA).\n* **Conversion Rate Optimization (CRO):** Run landing page A/B tests to double click-to-lead percentages."
        ],
        [
          "WhatsApp Business API Marketing",
          "whatsapp-business-api-marketing",
          "Marketing Solutions",
          "Verified business API templates, interactive automated chat buttons, and automated marketing broadcast managers.",
          JSON.stringify(["Meta API Verification", "Automated Alerts", "Flow Interactive Bots", "Broadcast Campaign Panels"]),
          "### Scale Sales and Engagement Directly inside WhatsApp\n\nWe integrate the official Meta WhatsApp Business API into your custom software. Send automated transaction alerts, shipping links, and marketing broadcasts with rich buttons, achieving a 98% open rate compared to standard email.\n\n#### What We Deliver:\n* **Automated Transaction Alerts:** Trigger WhatsApp messages for order bookings, invoice links, or appointments.\n* **Marketing Broadcast Managers:** Securely blast newsletters to thousands of opt-in users with quick-reply buttons.\n* **Interactive Flow Chatbots:** Capture user feedback, book call appointments, and answer FAQs inside WhatsApp.\n* **Green Badge Verification:** Technical support in getting your brand account verified with Meta."
        ],
        [
          "RCS Messaging & Automation",
          "rcs-messaging-automation",
          "Marketing Solutions",
          "Rich Communication Services to send interactive SMS with logos, image carousels, and quick reply actions directly to native dialers.",
          JSON.stringify(["Branded Inboxes", "Rich Product Carousels", "Quick-Reply Actions", "Read Receipt Analytics"]),
          "### Upgrading SMS to Rich, Interactive Brand Conversations\n\nTake advantage of next-gen mobile messaging. RCS (Rich Communication Services) allows businesses to send rich branded cards, carousels of products, and active action buttons directly to native phone SMS apps—no app download required.\n\n#### What We Deliver:\n* **Branded Sender Profiles:** Display verified brand logos, colors, and verification badges instead of random numbers.\n* **Rich Interactive Carousels:** Show product lists, brochures, and image feeds inside the inbox.\n* **Quick-Action Buttons:** Single-tap buttons to 'Call Agent', 'Open Map Route', or 'Confirm Appointment'.\n* **Real-time Delivery Analytics:** Read receipts, click-through rates, and message reply tracking."
        ]
      ];

      for (const svc of initialServices) {
        insertService.run(...svc);
      }
    }

    const countTech = db.prepare("SELECT COUNT(*) as count FROM technologies").get().count;
    if (countTech === 0) {
      const insertTech = db.prepare("INSERT INTO technologies (name, category, desc) VALUES (?, ?, ?)");
      const initialTechs = [
        ["Next.js", "Frontend", "For Server-Side Rendering and fast web apps"],
        ["React", "Frontend", "For modular interactive component builds"],
        ["Tailwind CSS", "Frontend", "For custom responsive styling"],
        ["TypeScript", "Frontend", "For type-safe code logic"],
        ["Django", "Backend", "For secure Class-Based API views & ORM"],
        ["Python", "Backend", "For ML models and scalable microservices"],
        ["FastAPI", "Backend", "For high-performance API endpoints"],
        ["Node.js", "Backend", "For fast backend API microservices"],
        ["Flutter", "Mobile", "For fast iOS & Android mobile apps"],
        ["React Native", "Mobile", "For React-driven cross-platform builds"],
        ["Swift", "Mobile", "For native iOS performance"],
        ["Kotlin", "Mobile", "For native Android features & SDKs"],
        ["PostgreSQL", "Cloud & Database", "For relational enterprise data"],
        ["AWS", "Cloud & Database", "For cloud infrastructure"],
        ["Docker", "Cloud & Database", "For isolated deployment environments"],
        ["Kubernetes", "Cloud & Database", "For scaling cloud containers"],
        ["PyTorch", "AI & Data Science", "For deep learning model design"],
        ["TensorFlow", "AI & Data Science", "For neural automation pipeline builds"],
        ["OpenAI API", "AI & Data Science", "For RAG agents & LLM integration"],
        ["Pandas", "AI & Data Science", "For processing high-volume datasets"]
      ];

      for (const tech of initialTechs) {
        insertTech.run(...tech);
      }
    }

    const countCat = db.prepare("SELECT COUNT(*) as count FROM categories").get().count;
    if (countCat === 0) {
      const insertCat = db.prepare("INSERT INTO categories (name, slug) VALUES (?, ?)");
      insertCat.run("Technology", "technology");
      insertCat.run("Marketing & ROI", "marketing-roi");
      insertCat.run("AI & Automation", "ai-automation");
    }

    const countBlogs = db.prepare("SELECT COUNT(*) as count FROM blogs").get().count;
    if (countBlogs === 0) {
      const insertBlog = db.prepare(`
        INSERT INTO blogs (title, slug, author, category_id, category_name, category_slug, summary, image_url, content, published_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      const initialBlogs = [
        [
          "Why Next.js and Django are the Ultimate Tech Stack for Modern SaaS",
          "why-nextjs-and-django-are-the-ultimate-tech-stack",
          "Tech Architect",
          1,
          "Technology",
          "technology",
          "Building a Software-as-a-Service (SaaS) application requires balancing speed-to-market with database safety, performance, and API load metrics.",
          "https://images.unsplash.com/photo-1618401471353-b98aedd07871?auto=format&fit=crop&w=800&q=80",
          "Building a Software-as-a-Service (SaaS) application requires balancing speed-to-market with database safety, performance, and API load metrics.\n\n### The Frontend: Next.js\nNext.js offers out-of-the-box Server-Side Rendering (SSR), Static Site Generation (SSG), and incremental builds. This guarantees that your SaaS pages load instantly, helping you secure perfect search rank scores.\n\n### The Backend API Engine\nProviding security features natively—preventing SQL Injection, XSS, and CSRF attacks by default.\n\nCombined, this is the stack of choice for high-volume enterprise software products in 2026.",
          "2026-08-01T10:00:00Z"
        ],
        [
          "Scaling Business Sales by 10X using WhatsApp Business API Automation",
          "scaling-business-sales-with-whatsapp-api",
          "Growth Strategist",
          2,
          "Marketing & ROI",
          "marketing-roi",
          "Traditional email marketing click rates have dropped to less than 2% in the current landscape. WhatsApp Business API, however, offers up to a 98% open rate.",
          "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&q=80",
          "Traditional email marketing click rates have dropped to less than 2% in the current landscape. WhatsApp Business API, however, offers up to a **98% open rate** and a **45% reply rate**.\n\n### Integrating WhatsApp into custom CRM systems\nBy connecting Meta's API directly to your sales pipeline, you can:\n* Trigger automated cart reminders when a client steps away.\n* Send PDF bills, shipping tracking numbers, and onboarding videos instantly.\n* Set up interactive Flows with buttons allowing users to book sales appointments inside the chat window.\n\nStop wasting thousands on cold calls. Meet your customers where they are.",
          "2026-08-03T12:00:00Z"
        ],
        [
          "Understanding Neural Automation: Building private AI Agents for Enterprise",
          "understanding-neural-automation-ai-agents",
          "AI Researcher",
          3,
          "AI & Automation",
          "ai-automation",
          "Artificial Intelligence is no longer just a chatbot widget on landing pages. Enterprises are now building private Neural Automation agents.",
          "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80",
          "Artificial Intelligence is no longer just a chatbot widget on landing pages. Enterprises are now building **private Neural Automation agents** connected to internal document lakes.\n\n### How private RAG Agents operate\nRetrieval-Augmented Generation (RAG) feeds a secure, restricted database of your technical manuals, support tickets, and pricing plans directly to an LLM. When a question is asked, the model retrieves the exact documents first, ensuring 100% accurate responses without hallucinating.\n\nThis technology automates up to **80% of customer support tickets**, freeing your developers and specialists to focus on high-priority issues.",
          "2026-08-05T09:00:00Z"
        ]
      ];

      for (const blog of initialBlogs) {
        insertBlog.run(...blog);
      }
    }
  } catch (err) {
    // Handle concurrency locked schema init
  }
}

// Run schema initialization
initDatabase();

// ------------------------------------------------------------------------------
// SQLite Query Helper Functions
// ------------------------------------------------------------------------------

export function getServices() {
  const rows = db.prepare("SELECT * FROM services").all();
  return rows.map((r) => ({
    ...r,
    features: JSON.parse(r.features || "[]"),
  }));
}

export function getServiceBySlug(slug) {
  const row = db.prepare("SELECT * FROM services WHERE slug = ?").get(slug);
  if (!row) return null;
  return {
    ...row,
    features: JSON.parse(row.features || "[]"),
  };
}

export function getTechnologies() {
  return db.prepare("SELECT * FROM technologies").all();
}

export function getCategories() {
  return db.prepare("SELECT * FROM categories").all();
}

export function getPosts(categorySlug = "") {
  if (!categorySlug) {
    return db.prepare("SELECT * FROM blogs ORDER BY id DESC").all();
  }
  return db
    .prepare("SELECT * FROM blogs WHERE category_slug = ? ORDER BY id DESC")
    .all(categorySlug);
}

export function getPostBySlug(slug) {
  return db.prepare("SELECT * FROM blogs WHERE slug = ?").get(slug);
}

export function addPost(postData) {
  const categoryObj =
    db.prepare("SELECT * FROM categories WHERE id = ?").get(parseInt(postData.category)) ||
    db.prepare("SELECT * FROM categories LIMIT 1").get();

  const publishedAt = new Date().toISOString();
  const summary = postData.content ? postData.content.substring(0, 150) + "..." : "";
  const imageUrl =
    postData.image_url ||
    "https://images.unsplash.com/photo-1618401471353-b98aedd07871?auto=format&fit=crop&w=800&q=80";

  const stmt = db.prepare(`
    INSERT INTO blogs (title, slug, author, category_id, category_name, category_slug, summary, image_url, content, published_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const result = stmt.run(
    postData.title,
    postData.slug,
    postData.author || "Admin",
    categoryObj.id,
    categoryObj.name,
    categoryObj.slug,
    summary,
    imageUrl,
    postData.content,
    publishedAt
  );

  return db.prepare("SELECT * FROM blogs WHERE id = ?").get(result.lastInsertRowid);
}

export function deletePost(id) {
  db.prepare("DELETE FROM blogs WHERE id = ?").run(parseInt(id));
  return true;
}

export function getEnquiries() {
  return db.prepare("SELECT * FROM enquiries ORDER BY id DESC").all();
}

export function addEnquiry(enquiryData) {
  const createdAt = new Date().toISOString();
  const stmt = db.prepare(`
    INSERT INTO enquiries (name, email, phone, company, enquiry_type, message, status, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const result = stmt.run(
    enquiryData.name,
    enquiryData.email,
    enquiryData.phone || "",
    enquiryData.company || "",
    enquiryData.enquiry_type || "General Inquiry",
    enquiryData.message || "",
    "New",
    createdAt
  );

  return db.prepare("SELECT * FROM enquiries WHERE id = ?").get(result.lastInsertRowid);
}

export function updateEnquiryStatus(id, status) {
  db.prepare("UPDATE enquiries SET status = ? WHERE id = ?").run(status, parseInt(id));
  return db.prepare("SELECT * FROM enquiries WHERE id = ?").get(parseInt(id));
}

export function getCalls() {
  return db.prepare("SELECT * FROM calls ORDER BY id DESC").all();
}

export function addCall(callData) {
  const createdAt = new Date().toISOString();
  const stmt = db.prepare(`
    INSERT INTO calls (name, email, phone, scheduled_datetime, notes, created_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  const result = stmt.run(
    callData.name,
    callData.email,
    callData.phone || "",
    callData.scheduled_datetime,
    callData.notes || "",
    createdAt
  );

  return db.prepare("SELECT * FROM calls WHERE id = ?").get(result.lastInsertRowid);
}

export function getDemos(archived = false) {
  const flag = archived ? 1 : 0;
  return db.prepare("SELECT * FROM demos WHERE is_archived = ? ORDER BY id DESC").all(flag);
}

export function updateDemo(id, updates) {
  const current = db.prepare("SELECT * FROM demos WHERE id = ?").get(parseInt(id));
  if (!current) return null;

  const is_read = updates.is_read !== undefined ? (updates.is_read ? 1 : 0) : current.is_read;
  const is_archived = updates.is_archived !== undefined ? (updates.is_archived ? 1 : 0) : current.is_archived;

  db.prepare("UPDATE demos SET is_read = ?, is_archived = ? WHERE id = ?").run(
    is_read,
    is_archived,
    parseInt(id)
  );

  return db.prepare("SELECT * FROM demos WHERE id = ?").get(parseInt(id));
}

export function deleteDemo(id) {
  db.prepare("DELETE FROM demos WHERE id = ?").run(parseInt(id));
  return true;
}

export function addDemo(demoData) {
  const createdAt = new Date().toISOString();
  const stmt = db.prepare(`
    INSERT INTO demos (name, email, phone, company, service_required, booking_date, booking_time, is_read, is_archived, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, 0, 0, ?)
  `);

  const result = stmt.run(
    demoData.name,
    demoData.email,
    demoData.phone || "",
    demoData.company || "",
    demoData.service_required,
    demoData.booking_date,
    demoData.booking_time,
    createdAt
  );

  return db.prepare("SELECT * FROM demos WHERE id = ?").get(result.lastInsertRowid);
}

export function getStats() {
  const totalEnquiries = db.prepare("SELECT COUNT(*) as count FROM enquiries").get().count;
  const totalCalls = db.prepare("SELECT COUNT(*) as count FROM calls").get().count;
  const totalDemos = db.prepare("SELECT COUNT(*) as count FROM demos").get().count;
  const totalBlogs = db.prepare("SELECT COUNT(*) as count FROM blogs").get().count;

  return {
    totalEnquiries,
    totalCalls,
    totalDemos,
    totalBlogs,
  };
}
