/** Personal content from Harry's CV and verified profiles. See CONTENT_SOURCES.md. */
export const profile = {
  name: "Harry",
  fullName: "Shaoxuan (Harry) Tang",
  introduction: "I'm Harry Tang. I build software, study AI at Monash, and follow questions that take me beyond the screen.",
  focus: "Melbourne · AI at Monash",
  email: "harrytangskywalker@gmail.com",
  github: "https://github.com/skywalker114",
  linkedin: "https://au.linkedin.com/in/shaoxuan-tang",
  huggingFaceSpace: "",
  about: [
    "I'm Shaoxuan (Harry) Tang, a computer science graduate from the University of Adelaide and a Master of Artificial Intelligence student at Monash University.",
    "My experience connects software with the people who use it: full-stack development for education clients, data analysis for a football club, Linux systems, and the everyday realities of retail and e-commerce.",
    "Beyond code, I've researched Roman art and archaeology, writing about the Domus Aurea and regional differences in Roman pottery. This space has room for that curiosity, too.",
  ],
  interests: ["Machine intelligence", "Software systems", "Roman archaeology", "Research & writing"],
};

export const education = [
  { id: "monash", degree: "Master of Artificial Intelligence", institution: "Monash University", dates: "2025–2027 · expected" },
  { id: "adelaide", degree: "Bachelor of Computer Science", institution: "University of Adelaide", dates: "2021–2024" },
];

export const experience = [
  {
    id: "jiangsu",
    theme: "Software, with people in mind",
    role: "Product Manager & Full-Stack Engineer · Internship",
    organisation: "Jiangsu String Co., Ltd.",
    dates: "Jan–May 2024",
    description: "Translated school and institutional clients' requirements into Spring Boot and Vue features, supported MySQL migration, and helped clients use the systems through training and support.",
  },
  {
    id: "glenunga",
    theme: "Finding the story in the data",
    role: "Data Analyst & Web Data Acquisition Programmer · Part-time",
    organisation: "Glenunga Football Club",
    dates: "Apr–Dec 2023",
    description: "Built a web application for live match statistics and used Python, AI and mathematical models to turn team and player data into insights for the coaching staff.",
  },
  {
    id: "gillibrand",
    theme: "Understanding everyday operations",
    role: "Retail Operations Manager · Part-time",
    organisation: "Gillibrand Pty Ltd · Melbourne",
    dates: "From Mar 2024",
    description: "Experience across Shopify, product listings, orders, inventory, fulfilment and customer service — a practical view of how software fits into a working business.",
  },
];

export const toolkit = [
  { label: "Code & data", tools: "Python · C++ · C · R · MATLAB · Bash" },
  { label: "Web & backend", tools: "JavaScript · Node.js · PHP · Spring Boot · Vue · SQL" },
  { label: "Systems & analytics", tools: "Linux · MySQL · Oracle RAC · Kettle ETL · FineBI" },
];

export const projects = [
  {
    slug: "ctf-platform",
    title: "A place to learn by breaking things",
    shortTitle: "Cybersecurity CTF platform",
    category: "SECURITY & LEARNING",
    number: "01",
    visual: "ctf",
    role: "Project leader · Team project",
    description: "A capture-the-flag platform that brought challenges, live scores and practical cybersecurity learning together.",
    tags: ["Authentication", "Live scoring", "Team leadership"],
    outcome: "Used across multiple events, supporting hundreds of participants.",
    overview: "I led a team building a cybersecurity capture-the-flag platform. The system combined real-time scoring with challenge management, giving participants a place to practise and organisers a way to run events.",
    contributions: ["Led the team through development of the platform.", "Implemented user authentication and challenge management.", "Built an administrator control panel and real-time scoring capabilities.", "Deployed the platform across multiple cybersecurity events."],
    perspective: "The project brings together the technical and organisational sides of a learning platform: participants need an accessible way to find challenges and follow their progress, while event organisers need tools to manage the experience.",
    repository: "",
  },
  {
    slug: "attendance-system",
    title: "Less friction in the everyday",
    shortTitle: "Employee attendance system",
    category: "WORKFLOW & SOFTWARE",
    number: "02",
    visual: "attendance",
    role: "Lead developer · Team project",
    description: "An attendance system designed around existing HR workflows, with a clearer interface and useful reporting.",
    tags: ["Workflow integration", "Reporting", "Team project"],
    outcome: "Approximately 40% fewer manual attendance errors, with better visibility of employee hours.",
    overview: "As lead developer, I designed and implemented an employee attendance system with a user-friendly interface and reporting capabilities. It integrated with existing HR workflows to reduce manual entry and attendance errors.",
    contributions: ["Led development of the attendance system within a team.", "Designed and implemented the interface and reporting capabilities.", "Integrated the system with existing HR workflows.", "Improved visibility of employee hours while reducing manual attendance errors."],
    perspective: "This is the kind of software whose value appears in everyday use: less repeated data entry, fewer avoidable mistakes, and a clearer picture of information people already need to manage.",
    repository: "",
  },
  {
    slug: "vm-converter",
    title: "Looking beneath the abstraction",
    shortTitle: "Virtual machine converter",
    category: "LANGUAGES & SYSTEMS",
    number: "03",
    visual: "vm",
    role: "Developer · Personal project",
    description: "A recursive descent parser and VM-to-assembly converter exploring what sits beneath higher-level instructions.",
    tags: ["Parsing", "Compiler design", "Virtual machines"],
    outcome: "A hands-on exploration of parsing, compiler design and underlying execution models.",
    overview: "This personal project involved building a recursive descent parser and a converter from virtual machine instructions to assembly language. It was a way to explore the relationship between language structure and the instructions used to execute it.",
    contributions: ["Built a recursive descent parser.", "Developed a virtual machine-to-assembly language converter.", "Explored compiler design, parsing and underlying execution models through implementation."],
    perspective: "An abstraction is easier to reason about when its lower layers become visible. Parsing and translation connect the structure of a program with the execution model beneath it.",
    repository: "",
  },
];

export const publicCode = {
  title: "C++ sorting & search exercises",
  url: "https://github.com/skywalker114/prac7",
  description: "Public coursework with bubble sort, quicksort and recursive binary search source files.",
};

// Website summaries of documented projects, not reproductions of prior articles.
export const notes = [
  {
    slug: "roman-art-and-archaeology",
    category: "BEYOND CODE",
    title: "A different kind of exploration",
    description: "Roman art, archaeology, and a curiosity that reaches beyond computing.",
    readingTime: "1 min read",
    sample: false,
    paragraphs: [
      "Not everything in this space begins with a terminal. Alongside computer science, I've carried out a personal research project on Roman art and archaeology, analysing artifacts and architectural sites.",
      "My writing covered the Domus Aurea and regional differences in Roman pottery. The project also developed my research and academic writing skills, adding another kind of work to a background usually described through software and data.",
      "This page is a short introduction to that research, rather than a reproduction of the original articles. The website is a place to bring these interests together: the technical projects, the questions outside computing, and the stories that connect them.",
    ],
  },
  {
    slug: "beneath-the-abstraction",
    category: "PROJECT NOTE",
    title: "Beneath the abstraction",
    description: "A short introduction to my parser and virtual machine converter project.",
    readingTime: "1 min read",
    sample: false,
    paragraphs: [
      "One of my personal projects involved building a recursive descent parser and a converter from virtual machine instructions to assembly language.",
      "The work deepened my understanding of compiler design, parsing and underlying execution models. Those topics connect the structure of a program to the lower-level instructions that make it run.",
      "This is an overview of the project rather than a full technical walkthrough. A detailed account can grow here alongside the implementation, with concrete examples and design decisions from the source code.",
    ],
  },
];
