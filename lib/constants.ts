let isAnnual: Boolean = false

export const features_0 = [
    {
      title: "Start",
      items: [
        "Organized discussions",
        "Rich posts",
        "Content co-pilot",
        "Immersive courses",
        "Private spaces",
        "Automatic video transcriptions",
        "Member directory",
        "Customized branding",
      ],
    },
    {
      title: "Engage",
      items: [
        "Group chat rooms",
        "Private messaging",
        "Event spaces",
        "Live streams",
        "Weekly digests",
        "Automated check-ins",
        "Gamified rewards",
        "Bulk DMs",
      ],
    },
    {
      title: "Monetize",
     items: [
        "Paid memberships",
        "One-time payments",
        "Recurring subscriptions",
        "Gate access",
        "Free trials and upsells",
        "Payment installments",
        "Coupons and discounts",
        "Subscription renewal reminders",
      ],
    },
    {
      title: "Scale",
      items: [
        "Thousands of integrations",
        "Automated workflows",
        "Custom profile fields",
        "AI activity scores",
        "Bulk actions",
        "Single sign-on",
        "Roles & permissions",
        "Auto-remove churned members",
      ],
    },
  ]
  

 export  const pricingPlans = [
    {
      name: "Professional",
      price: isAnnual ? 99 * 12 : 99,
      description: "Get key community building features, all in one place",
      popular: true,
      features: [
        "Rich member profiles",
        "Searchable member directory",
        "Discussions",
        "Events",
        "Paid memberships",
        "Weekly community digest",
        "Gamification",
      ],
      additionalFeatures: [
        "Courses",
        "Live streams",
        "Live rooms",
        "Unlimited members",
        "Custom branding",
        "Reporting & analytics",
        "Custom code snippets",
        "Conversion tracking",
        "Migration services for payments",
      ],
    },
    {
      name: "Business",
      price: isAnnual ? 219 * 12 : 219,
      description: "Scale your community with workflows and customizations",
      features: [
        "Everything in Professional, plus:",
        "Workflows",
        "Custom profile fields",
        "Headless Member API",
        "Admin API",
        "Brand email notifications",
        "Content co-pilot",
        "Automated transcriptions",
        "Activity scores",
        "Custom domain",
      ],
      annualOnly: ["Migration services for courses"],
    },
    {
      name: "Enterprise",
      price: isAnnual ? 399 * 12 : 399,
      description:
        "Run your business with full feature access and the highest limits, supported by dedicated services and priority support",
      bestForBrands: true,
      features: [
        "Everything in Business, plus:",
        "Unlimited workflows",
        "Custom single sign-on (SSO)",
        "Priority support",
        "Advanced analytics",
        "Lower transaction fees",
        "Sandbox community",
        "Up to 10 admins & 100 moderators",
      ],
      annualOnly: [
        "Concierge onboarding",
        "Quarterly business reviews",
        "Dedicated customer success manager",
      ],
    },
  ];

 export const features = [
    {
      value: "start",
      name: "Start",
      title: "Your community, courses, and content – all in one place.",
      description:
        "Gone are the days of needing to make a whole bunch of different tools work together. With Circle, you can combine the exciting, interactive nature of a community with your content — all in one seamless experience.",
      imageSrc: "/start.webp",
    },
    {
      value: "engage",
      name: "Engage",
      title:
        "Courses, live streams, group chats, events, rich profile, and more.",
      description:
        "Your members are the star of the show — they just need the tools to connect with each other and shine. You want an active, buzzing community. And so do your members. With Circle you get powerful engagement features so that you can empower your members to build that vision with you.",
      imageSrc: "/engage.png",
    },
    {
      value: "monetize",
      name: "Monetize",
      title:
        "Whether you’re offering a course, a membership, one-time access to content, or monthly recurring subscriptions — Circle has you covered.",
      description:
        "Many of the top creators and brands run their entire business on Circle. You can easily start accepting payments in minutes. Whether you’re offering a membership, one-time access to content, providing free trials or monthly recurring subscriptions — Circle has you covered.",
      imageSrc: "/monetize.png",
    },
    {
      value: "scale",
      name: "Scale",
      title: "Manage and scale your community operations",
      description:
        "Get back the precious time you currently spend on repetitive, manual tasks so that you can focus on more meaningful work. Circle comes with powerful workflows, integrations, and AI-powered content and analytics tools to help you create an extraordinary member experience.",
      imageSrc: "/scale.png",
    },
  ];

  export const reviews = [
    {
      name: "Jack",
      username: "@jack",
      body: "I've never seen anything like this before. It's amazing. I love it.",
      img: "https://github.com/shadcn.png",
    },
    {
      name: "Jill",
      username: "@jill",
      body: "I don't know what to say. I'm speechless. This is amazing.",
      img: "https://github.com/shadcn.png",
    },
    {
      name: "John",
      username: "@john",
      body: "I'm at a loss for words. This is amazing. I love it.",
      img: "https://github.com/shadcn.png",
    },
    {
      name: "Jane",
      username: "@jane",
      body: "I'm at a loss for words. This is amazing. I love it.",
      img: "https://github.com/shadcn.png",
    },
    {
      name: "Jenny",
      username: "@jenny",
      body: "I'm at a loss for words. This is amazing. I love it.",
      img: "https://github.com/shadcn.png",
    },
    {
      name: "James",
      username: "@james",
      body: "I'm at a loss for words. This is amazing. I love it.",
      img: "https://github.com/shadcn.png",
    },
  ];