import os
import django
import datetime

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'bizz_be.settings')
django.setup()

from django.contrib.auth import get_user_model
from cataloge.models import Service, Technology
from blogs.models import BlogCategory, BlogPost

def seed_data():
    print("Starting data seeding...")
    
    # 1. Create Superuser / Admin
    User = get_user_model()
    admin_user = None
    if not User.objects.filter(username='admin').exists():
        admin_user = User.objects.create_superuser('admin', 'admin@example.com', 'admin123')
        print("Admin user created (Username: admin, Password: admin123)")
    else:
        admin_user = User.objects.get(username='admin')
        print("Admin user already exists")

    # 2. Seed Services (exclude crypto & blockchain)
    services_data = [
        {
            "title": "Custom Software Development",
            "slug": "custom-software-development",
            "icon": "cpu",
            "summary": "Tailor-made software architectures, enterprise ERP, CRM, and bespoke billing engines built to automate your operations.",
            "description": "### Tailored Software Engineering for Global Enterprises\n\nWe design, build, and deploy robust, custom software solutions that integrate seamlessly with your existing infrastructure. From legacy modernization to building new ERP/CRM systems from scratch, our software is engineered for scale, speed, and absolute security.\n\n#### What We Deliver:\n* **Enterprise Resource Planning (ERP):** Centralize operations, HR, finance, and logistics.\n* **Customer Relationship Management (CRM):** Sales tracking, pipeline management, and contact logs.\n* **Custom Billing Systems:** Complex multi-tenant subscription models and custom invoicing pipelines.\n* **Legacy Systems Modernization:** Upgrade older systems to modern web frameworks without downtime.",
            "category": "Software Engineering",
            "features": ["Legacy Modernization", "Bespoke ERP/CRM", "Multi-tenant SaaS", "Custom Billing Engines"]
        },
        {
            "title": "AI & Machine Learning Automation",
            "slug": "ai-ml-automation",
            "icon": "robot",
            "summary": "Neural automation, intelligent chatbots, predictive analytics, and customized generative AI tools designed to optimize business logic.",
            "description": "### Automating Workflows with Smart Machine Learning Models\n\nBridge the gap between data and action. We build intelligent automation systems using machine learning, computer vision, and Large Language Models (LLMs) to automate customer support, extract structured insights, and predict sales trends.\n\n#### What We Deliver:\n* **Generative AI Platforms:** Private instances of custom LLMs tuned on your corporate knowledge base.\n* **Predictive Analytics:** Forecasting sales, stock demand, and customer behavior with ML models.\n* **Intelligent Chatbots:** RAG-powered bots capable of solving customer tickets in real-time.\n* **Document Data Extraction:** Auto-scanning invoices, resumes, and PDFs using OCR and AI classifiers.",
            "category": "AI & Automation",
            "features": ["Generative AI & LLMs", "Predictive Analytics", "RAG Support Agents", "Computer Vision & OCR"]
        },
        {
            "title": "SaaS Platform Engineering",
            "slug": "saas-platform-engineering",
            "icon": "cloud-arrow-up",
            "summary": "Scalable, secure, and multi-tenant SaaS cloud platforms featuring subscriptions, metered usage, and high-speed API backends.",
            "description": "### Launching Enterprise SaaS Products at Speed\n\nTurn your SaaS ideas into scalable cloud platforms. We build clean, multi-tenant architectures featuring robust API structures, secure JWT/OAuth session controls, Stripe/PayPal payment hooks, and serverless background workers.\n\n#### What We Deliver:\n* **Multi-tenant Infrastructure:** Secure data isolation between accounts with seamless cross-region performance.\n* **Metered Billing & Subscriptions:** Usage-based tracking, subscription tiers, and recurring credit systems.\n* **Restful & GraphQL APIs:** High-throughput backend endpoints optimized for React/Next.js/Mobile clients.\n* **Third-Party Integrations:** Connect seamlessly with HubSpot, Salesforce, Slack, Sendgrid, and Twilio.",
            "category": "Software Engineering",
            "features": ["Multi-tenant Databases", "Stripe Metered Billing", "FastAPI/DRF Backends", "OAuth & SSO integration"]
        },
        {
            "title": "Mobile App Development",
            "slug": "mobile-app-development",
            "icon": "phone-vibrate",
            "summary": "Premium cross-platform and native iOS & Android applications featuring offline synchronization, animations, and geofencing.",
            "description": "### Engaging Mobile Experiences Engineered for Scale\n\nWe build high-performance mobile apps with fluid animations, intuitive layouts, and swift responsiveness. Utilizing native Kotlin/Swift and cross-platform Flutter/React Native frameworks, we deliver features like background sync, push alerts, and location routing.\n\n#### What We Deliver:\n* **Cross-Platform Apps:** Flutter & React Native setups to launch on iOS and Android with a single codebase.\n* **Native iOS & Android:** Swift and Kotlin code for memory-critical, high-performance needs.\n* **Offline-First Synchronization:** Work seamlessly without internet connection; auto-sync data on connection restore.\n* **Geofencing & CoreLocation:** Real-time user tracking, map routing, and proximity alerts.",
            "category": "Mobile Apps",
            "features": ["React Native & Flutter", "Native Swift & Kotlin", "Offline Synchronization", "Push Alerts & Geofencing"]
        },
        {
            "title": "Performance Marketing & Analytics",
            "slug": "performance-marketing-analytics",
            "icon": "graph-up-arrow",
            "summary": "ROI-focused Google Ads, Meta Ads, and custom analytics setups engineered to maximize acquisition without wasting budget.",
            "description": "### Data-Driven Acquisition for Software & Technology Brands\n\nNote: We are not a simple social media posting agency. We specialize strictly in performance-driven PPC campaigns, high-intent Google Search ads, Meta sales retargeting, and Google Analytics 4 conversion architectures to scale customer acquisitions.\n\n#### What We Deliver:\n* **Google Search & Shopping Ads:** Capture high-intent buyer clicks for your services or products.\n* **Meta Sales Funnels:** Retarget visitors with structured ad creatives to secure demo bookings.\n* **GA4 & Funnel Tracking:** Setup end-to-end custom event tracking to measure cost-per-acquisition (CPA).\n* **Conversion Rate Optimization (CRO):** Run landing page A/B tests to double click-to-lead percentages.",
            "category": "Marketing Solutions",
            "features": ["Google Search PPC Ads", "Meta Remarketing Funnels", "GA4 Event Architectures", "Landing Page A/B Testing"]
        },
        {
            "title": "WhatsApp Business API Marketing",
            "slug": "whatsapp-business-api-marketing",
            "icon": "whatsapp",
            "summary": "Verified business API templates, interactive automated chat buttons, and automated marketing broadcast managers.",
            "description": "### Scale Sales and Engagement Directly inside WhatsApp\n\nWe integrate the official Meta WhatsApp Business API into your custom software. Send automated transaction alerts, shipping links, and marketing broadcasts with rich buttons, achieving a 98% open rate compared to standard email.\n\n#### What We Deliver:\n* **Automated Transaction Alerts:** Trigger WhatsApp messages for order bookings, invoice links, or appointments.\n* **Marketing Broadcast Managers:** Securely blast newsletters to thousands of opt-in users with quick-reply buttons.\n* **Interactive Flow Chatbots:** Capture user feedback, book call appointments, and answer FAQs inside WhatsApp.\n* **Green Badge Verification:** Technical support in getting your brand account verified with Meta.",
            "category": "Marketing Solutions",
            "features": ["Meta API Verification", "Automated Alerts", "Flow Interactive Bots", "Broadcast Campaign Panels"]
        },
        {
            "title": "RCS Messaging & Automation",
            "slug": "rcs-messaging-automation",
            "icon": "chat-left-text",
            "summary": "Rich Communication Services to send interactive SMS with logos, image carousels, and quick reply actions directly to native dialers.",
            "description": "### Upgrading SMS to Rich, Interactive Brand Conversations\n\nTake advantage of next-gen mobile messaging. RCS (Rich Communication Services) allows businesses to send rich branded cards, carousels of products, and active action buttons directly to native phone SMS apps—no app download required.\n\n#### What We Deliver:\n* **Branded Sender Profiles:** Display verified brand logos, colors, and verification badges instead of random numbers.\n* **Rich Interactive Carousels:** Show product lists, brochures, and image feeds inside the inbox.\n* **Quick-Action Buttons:** Single-tap buttons to 'Call Agent', 'Open Map Route', or 'Confirm Appointment'.\n* **Real-time Delivery Analytics:** Read receipts, click-through rates, and message reply tracking.",
            "category": "Marketing Solutions",
            "features": ["Branded Inboxes", "Rich Product Carousels", "Quick-Reply Actions", "Read Receipt Analytics"]
        }
    ]

    for svc in services_data:
        Service.objects.get_or_create(
            slug=svc["slug"],
            defaults={
                "title": svc["title"],
                "icon": svc["icon"],
                "summary": svc["summary"],
                "description": svc["description"],
                "category": svc["category"],
                "features": svc["features"],
                "meta_title": f"{svc['title']} | Enterprise Software Agency",
                "meta_description": f"Need premium {svc['title']}? We deliver scalable, custom-engineered {svc['title']} for global enterprises."
            }
        )
    print(f"Seeded {len(services_data)} Services.")

    # 3. Seed Technologies
    techs_data = [
        # Frontend
        {"name": "Next.js", "category": "Frontend", "icon_svg": "nextjs", "order": 1},
        {"name": "React", "category": "Frontend", "icon_svg": "react", "order": 2},
        {"name": "Tailwind CSS", "category": "Frontend", "icon_svg": "tailwind", "order": 3},
        {"name": "TypeScript", "category": "Frontend", "icon_svg": "typescript", "order": 4},
        
        # Backend
        {"name": "Django", "category": "Backend", "icon_svg": "django", "order": 1},
        {"name": "Python", "category": "Backend", "icon_svg": "python", "order": 2},
        {"name": "FastAPI", "category": "Backend", "icon_svg": "fastapi", "order": 3},
        {"name": "Node.js", "category": "Backend", "icon_svg": "nodejs", "order": 4},
        
        # Mobile
        {"name": "Flutter", "category": "Mobile", "icon_svg": "flutter", "order": 1},
        {"name": "React Native", "category": "Mobile", "icon_svg": "reactnative", "order": 2},
        {"name": "Swift", "category": "Mobile", "icon_svg": "swift", "order": 3},
        {"name": "Kotlin", "category": "Mobile", "icon_svg": "kotlin", "order": 4},
        
        # Database & Cloud
        {"name": "PostgreSQL", "category": "Database & Cloud", "icon_svg": "postgres", "order": 1},
        {"name": "AWS", "category": "Database & Cloud", "icon_svg": "aws", "order": 2},
        {"name": "Docker", "category": "Database & Cloud", "icon_svg": "docker", "order": 3},
        {"name": "Kubernetes", "category": "Database & Cloud", "icon_svg": "kubernetes", "order": 4},
        
        # AI & Data
        {"name": "PyTorch", "category": "AI & Data Science", "icon_svg": "pytorch", "order": 1},
        {"name": "TensorFlow", "category": "AI & Data Science", "icon_svg": "tensorflow", "order": 2},
        {"name": "OpenAI API", "category": "AI & Data Science", "icon_svg": "openai", "order": 3},
        {"name": "Pandas", "category": "AI & Data Science", "icon_svg": "pandas", "order": 4},
    ]

    for tech in techs_data:
        Technology.objects.get_or_create(
            name=tech["name"],
            category=tech["category"],
            defaults={
                "icon_svg": tech["icon_svg"],
                "order": tech["order"]
            }
        )
    print(f"Seeded {len(techs_data)} Technologies.")

    # 4. Seed Blog Categories & Posts
    cat_tech, _ = BlogCategory.objects.get_or_create(name="Technology", slug="technology")
    cat_mkt, _ = BlogCategory.objects.get_or_create(name="Marketing & ROI", slug="marketing-roi")
    cat_ai, _ = BlogCategory.objects.get_or_create(name="AI & Automation", slug="ai-automation")

    blogs_data = [
        {
            "title": "Why Next.js and Django are the Ultimate Tech Stack for Modern SaaS",
            "slug": "why-nextjs-and-django-are-the-ultimate-tech-stack",
            "author": "Tech Architect",
            "category": cat_tech,
            "content": "Building a Software-as-a-Service (SaaS) application requires balancing speed-to-market with database safety, performance, and API load metrics.\n\n### The Frontend: Next.js\nNext.js offers out-of-the-box Server-Side Rendering (SSR), Static Site Generation (SSG), and incremental builds. This guarantees that your SaaS pages load instantly, helping you secure perfect search rank scores.\n\n### The Backend: Python Django\nDjango provides security features natively—preventing SQL Injection, XSS, and CSRF attacks by default. Additionally, Django's Object-Relational Mapper (ORM) makes structural changes simple, while Django REST Framework gives you class-based views to compose RESTful APIs quickly.\n\nCombined, this is the stack of choice for high-volume enterprise software products in 2026.",
            "image_url": "https://images.unsplash.com/photo-1618401471353-b98aedd07871?auto=format&fit=crop&w=800&q=80",
            "meta_title": "Why Next.js & Django is the Best Stack for SaaS in 2026",
            "meta_description": "Compare Next.js client-side rendering with Django's safe relational backend to see why it is the best stack to build SaaS web platforms."
        },
        {
            "title": "Scaling Business Sales by 10X using WhatsApp Business API Automation",
            "slug": "scaling-business-sales-with-whatsapp-api",
            "author": "Growth Strategist",
            "category": cat_mkt,
            "content": "Traditional email marketing click rates have dropped to less than 2% in the current landscape. WhatsApp Business API, however, offers up to a **98% open rate** and a **45% reply rate**.\n\n### Integrating WhatsApp into custom CRM systems\nBy connecting Meta's API directly to your sales pipeline, you can:\n* Trigger automated cart reminders when a client steps away.\n* Send PDF bills, shipping tracking numbers, and onboarding videos instantly.\n* Set up interactive Flows with buttons allowing users to book sales appointments inside the chat window.\n\nStop wasting thousands on cold calls. Meet your customers where they are.",
            "image_url": "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&q=80",
            "meta_title": "Scale Software Sales with WhatsApp Business API Automation",
            "meta_description": "Discover how businesses are replacing dead emails with WhatsApp Business API alerts and interactive quick-reply button flows to increase sales by 10x."
        },
        {
            "title": "Understanding Neural Automation: Building private AI Agents for Enterprise",
            "slug": "understanding-neural-automation-ai-agents",
            "author": "AI Researcher",
            "category": cat_ai,
            "content": "Artificial Intelligence is no longer just a chatbot widget on landing pages. Enterprises are now building **private Neural Automation agents** connected to internal document lakes.\n\n### How private RAG Agents operate\nRetrieval-Augmented Generation (RAG) feeds a secure, restricted database of your technical manuals, support tickets, and pricing plans directly to an LLM. When a question is asked, the model retrieves the exact documents first, ensuring 100% accurate responses without hallucinating.\n\nThis technology automates up to **80% of customer support tickets**, freeing your developers and specialists to focus on high-priority issues.",
            "image_url": "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80",
            "meta_title": "How to Build Private AI Agents for Enterprises",
            "meta_description": "Learn how private Retrieval-Augmented Generation (RAG) models are automating corporate knowledge bases and customer tickets with zero database leaks."
        }
    ]

    for post in blogs_data:
        BlogPost.objects.get_or_create(
            slug=post["slug"],
            defaults={
                "title": post["title"],
                "author": post["author"],
                "category": post["category"],
                "content": post["content"],
                "image_url": post["image_url"],
                "meta_title": post["meta_title"],
                "meta_description": post["meta_description"]
            }
        )
    print(f"Seeded {len(blogs_data)} Blog Posts.")
    print("Data seeding completed successfully!")

if __name__ == "__main__":
    seed_data()
