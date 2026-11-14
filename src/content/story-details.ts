import type { ProjectMotionKind } from "@/lib/project-motion";

export type StoryDetails = {
  facts: { label: string; value: string }[];
  sections: { title: string; text: string }[];
  motion?: ProjectMotionKind;
  evidence?: string;
};

/** Editorial summaries based on the supplied CV and verified public coursework. */
export const storyDetails: Record<string, StoryDetails> = {
  harry: {
    facts: [{ label: "Based in", value: "Melbourne" }, { label: "Now", value: "AI at Monash" }, { label: "Before", value: "Computer science at Adelaide" }],
    sections: [
      { title: "A few threads, one person", text: "My path connects computer science in Adelaide, postgraduate AI study in Melbourne, and work across software, sport and retail. Different settings have given me different views of the same question: how does a system become useful to the people around it?" },
      { title: "Room for another kind of curiosity", text: "Roman art and archaeology belong here alongside the code. Research into architectural sites and pottery adds a different way of examining evidence, finding connections and explaining what they mean." },
    ],
  },
  ctf: {
    motion: "ctf",
    facts: [{ label: "Role", value: "Project leader" }, { label: "Setting", value: "Team project" }, { label: "Use", value: "Multiple events" }],
    sections: [
      { title: "Two sides of the same event", text: "Participants needed a way to access challenges and follow their scores. Organisers needed authentication, challenge management and an administrator interface. The platform brought those two experiences into one system." },
      { title: "The work behind the scoreboard", text: "I led the team and worked on authentication, challenge administration and real-time scoring. Deployment across multiple events made this more than a standalone coding exercise: the software supported a shared learning activity." },
    ],
    evidence: "Event use and participant scale are reported in my CV. The animation is an explanatory example of the workflow.",
  },
  attendance: {
    motion: "attendance",
    facts: [{ label: "Role", value: "Lead developer" }, { label: "Focus", value: "HR workflow" }, { label: "Result", value: "≈40% fewer manual errors" }],
    sections: [
      { title: "Make the everyday easier", text: "Attendance information has to travel from an employee's record into an HR workflow and a useful report. Re-entering that information by hand creates opportunities for mistakes. The project focused on reducing that friction." },
      { title: "An interface connected to a process", text: "I led development of the interface and reporting capabilities, integrating the system with existing HR workflows. The reported result was fewer manual attendance errors and clearer visibility of employee hours." },
    ],
    evidence: "The approximate 40% reduction is reported in my CV. The illustration uses example attendance records and report data.",
  },
  vm: {
    motion: "vm",
    facts: [{ label: "Setting", value: "Personal project" }, { label: "Built", value: "Parser + VM converter" }, { label: "Focus", value: "Language & execution" }],
    sections: [
      { title: "Follow an instruction down a layer", text: "A program can look very different depending on the level at which it is represented. This project explored that gap by building a recursive descent parser and translating virtual-machine instructions into assembly language." },
      { title: "Structure, then execution", text: "Parsing deals with the structure of the input; translation expresses operations in a lower-level form. Working on both made compiler design and execution models concrete implementation problems, rather than concepts described only on a page." },
    ],
    evidence: "The illustration uses sample VM and assembly instructions to explain the stack operation.",
  },
  cpp: {
    motion: "sorting",
    facts: [{ label: "Language", value: "C++" }, { label: "Setting", value: "Public coursework" }, { label: "Includes", value: "Sorting + binary search" }],
    sections: [
      { title: "A small enough problem to inspect", text: "The public practice repository contains bubble sort, quicksort and recursive binary search. These exercises make the steps of an algorithm visible: which values are compared, how the sequence changes, and when a search can stop." },
      { title: "From source to something you can see", text: "The illustration runs bubble sort on a short example sequence. Watch adjacent comparisons build a sorted suffix, one pass at a time. The original C++ files remain available in the linked repository." },
    ],
    evidence: "The original C++ source is linked below. The browser illustration traces bubble sort on example values.",
  },
  jiangsu: {
    facts: [{ label: "When", value: "Jan–May 2024" }, { label: "Setting", value: "Internship" }, { label: "Work", value: "Product + full stack" }],
    sections: [
      { title: "Between a requirement and a working feature", text: "At Jiangsu String, the work connected school and institutional clients with a Spring Boot and Vue application. My role combined translating requirements, full-stack development and supporting the people using the software." },
      { title: "The part after implementation", text: "My work also included MySQL migration, Linux systems and Kettle ETL, alongside training and client support. It is a chapter about the full life of a feature: understanding the need, implementing it, and helping it fit into daily use." },
    ],
  },
  glenunga: {
    facts: [{ label: "When", value: "Apr–Dec 2023" }, { label: "Setting", value: "Part-time" }, { label: "Audience", value: "Football coaching staff" }],
    sections: [
      { title: "A match, seen through data", text: "At Glenunga Football Club, I built a web application for live match statistics. The work paired web data acquisition with Python, AI and mathematical models to examine team and player performance." },
      { title: "Give the numbers somewhere to go", text: "The intended audience was the coaching staff. An analysis gains a different purpose when the people reading it are making decisions about a real team. This chapter connects data work with an interface and a specific sporting context." },
    ],
  },
  gillibrand: {
    facts: [{ label: "When", value: "From Mar 2024" }, { label: "Where", value: "Melbourne" }, { label: "Setting", value: "Retail operations" }],
    sections: [
      { title: "The whole journey of an order", text: "At Gillibrand, my work has covered Shopify, product listings, orders, inventory, fulfilment and customer service. It puts software in the context of an operation that has to work from the storefront through to the customer." },
      { title: "Why this belongs beside the code", text: "An online store is one part of a larger process. Stock information, listings and customer communication all meet in everyday retail work. This chapter adds an operational view to my background in software and data." },
    ],
  },
  adelaide: {
    facts: [{ label: "When", value: "2021–2024" }, { label: "Degree", value: "Computer Science" }, { label: "University", value: "Adelaide" }],
    sections: [
      { title: "The foundation underneath the projects", text: "My Bachelor of Computer Science at the University of Adelaide ran from February 2021 to May 2024. It is the undergraduate chapter behind the software and systems work elsewhere in this space." },
      { title: "Keep the fundamentals visible", text: "The public C++ exercises are one small window into that foundation. Sorting, searching and recursive thinking sit alongside the later parser and virtual-machine project, connecting individual instructions to larger software systems." },
    ],
  },
  monash: {
    facts: [{ label: "Started", value: "Jul 2025" }, { label: "Degree", value: "Master of AI" }, { label: "Completion", value: "May 2027 · expected" }],
    sections: [
      { title: "The current learning chapter", text: "I am studying a Master of Artificial Intelligence at Monash University. It follows my computer science degree and adds a new focus to a background that already spans web applications, data analysis and systems." },
      { title: "Connect the model to the rest of the system", text: "This website brings the AI study together with that earlier work. A model, the software around it, the interface and the person using it are all parts of the same picture I want this space to explore." },
    ],
  },
  roman: {
    facts: [{ label: "Subject", value: "Roman art & archaeology" }, { label: "Includes", value: "Domus Aurea" }, { label: "Method", value: "Research & writing" }],
    sections: [
      { title: "Reading a different kind of evidence", text: "My personal research examined Roman artifacts and architectural sites. The writing included the Domus Aurea and regional differences in Roman pottery, with attention to what material objects and places can tell us." },
      { title: "A life with more than one subject", text: "Research and academic writing are part of this story too. Archaeology gives this space a subject beyond computing, while sharing the work of examining evidence carefully and making an explanation clear." },
    ],
  },
};

export const projectStoryIds: Record<string, string> = {
  "ctf-platform": "ctf",
  "attendance-system": "attendance",
  "vm-converter": "vm",
  "cpp-sorting-search": "cpp",
};
