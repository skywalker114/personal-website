import type { ProjectMotionKind } from "@/lib/project-motion";

export type StoryDetails = {
  facts: { label: string; value: string }[];
  sections: { title: string; text: string }[];
  motion?: ProjectMotionKind;
  evidence?: string;
};

/** Editorial summaries based on the supplied CV and verified public coursework. */
export const storyDetails: Record<string, StoryDetails> = {
  vision: {
    motion: "vision",
    facts: [{ label: "Task", value: "20 image classes" }, { label: "Recorded score", value: "96.328% · Kaggle" }, { label: "Course placing", value: "20th / 393 · reported" }],
    sections: [
      { title: "The representation stays fixed; the learning loop changes", text: "The final system keeps DINOv3 ViT-H+/16 frozen and trains two small heads. A global token and averaged patch tokens form a 2,560-dimensional feature vector. Conservative pseudo-label selection and matched augmentation expose the heads to target-domain images without access to their hidden labels." },
      { title: "Keep the evaluation boundaries visible", text: "The earlier baseline's 99.86% validation accuracy belongs to its 8,047/1,419 split. The final round uses all labelled images, so it has no independent validation score. Its 96.328% is a recorded Kaggle leaderboard result; repeated selection against that leaderboard limits conclusions about new data." },
    ],
    evidence: "Course placing is reported by Harry; scores and losses are retained in the project records and public README/notebook. The illustration explains the pipeline and runs no model. The full case study includes the research journey and saved training trace.",
  },
  evaluation: {
    motion: "evaluation",
    facts: [{ label: "Tools", value: "WEKA" }, { label: "Scope", value: "3 datasets · 4 model families" }, { label: "Focus", value: "Evaluation & representation" }],
    sections: [
      { title: "Same accuracy, different mistakes", text: "On the 699-record classification benchmark, k-NN with K=3 and K=5 both classified 677 records correctly in ten-fold cross-validation. Yet false negatives changed from 10 to 8 and false positives from 12 to 14. On the second classification dataset, ordinal encoding changed neighbours without consistently improving performance." },
      { title: "What counts as future data?", text: "For the 21-record economic series, I trained on 1986–2000 and tested on 2001–2006. Saved RMSE was 5.1295 unemployment percentage points, compared with 1.1705 for random ten-fold cross-validation. The protocols use different training sizes and test different kinds of generalisation; the small sample warrants caution." },
    ],
    evidence: "Figures come from saved WEKA outputs, not a new run. This is an educational comparison of supplied datasets, with no clinical validation. Private records and reports are not embedded; the animation shows original example partitions.",
  },
  bayesian: {
    motion: "bayesian",
    facts: [{ label: "Approach", value: "Bayesian networks" }, { label: "Tools", value: "Python / Netica" }, { label: "Setting", value: "Synthetic-data study" }],
    sections: [
      { title: "Keep learning and evaluation apart", text: "The workflow connects preprocessing, parameter learning, inference, simulated annealing and evaluation. Four network structures share a split of 96 tuning cases and 24 reserved cases, making it possible to compare initial, learned and tuned models on the same held-out evidence." },
      { title: "Look at what accuracy leaves out", text: "All four tuned models predicted NoAlert for every reserved case. Their 58.33% accuracy hid zero recall for the ten Investigate cases. The decision-network extension added another question: how do the assumed costs and benefits of actions change the preferred choice?" },
    ],
    evidence: "Saved results from synthetic-data coursework; no clinical validation or causal findings. Netica and the supplied expert network are credited on the project page. Solution code and models stay private. The animation uses illustrative values, not case results.",
  },
  flatland: {
    motion: "flatland",
    facts: [{ label: "Setting", value: "Monash · FIT5222" }, { label: "Approach", value: "Space-time A* & LNS" }, { label: "Saved run", value: "56 server cases" }],
    sections: [
      { title: "The route belongs to more than one train", text: "Track direction limits where a train can go. Reservations add when it can go there. I used these constraints to coordinate shared cells and movements, then worked on a large-neighbourhood loop that reconsiders interacting trains together." },
      { title: "A valid schedule can still be late", text: "Malfunctions turn a plan into a repair problem. The saved server run completed 2,827 of 2,832 trains, but five remained unfinished. In one congested 150-train case, every train finished and only 12 arrived before their deadlines. Those results made punctuality and congestion important questions for the next iteration." },
    ],
    evidence: "Results describe a retained server evaluation, not a new run. Built in the provided Piglet / Flatland environment; solution code stays private. The animation is an original example schedule, not a solver replay.",
  },
  pacman: {
    motion: "pacman",
    facts: [{ label: "Setting", value: "Monash · FIT5047" }, { label: "Language", value: "Python" }, { label: "Focus", value: "Search & decisions" }],
    sections: [
      { title: "One maze, different questions", text: "Finding one food dot, planning a route through several and responding to ghosts need different ways of thinking. I used A* and maze-distance heuristics for navigation, then combined dynamic programming and a greedy fallback for food-route planning." },
      { title: "How far ahead should an agent look?", text: "The adversarial agent uses alpha-beta search, move ordering and adaptive depth to balance useful foresight with computation time. Selective ghost exploration reduces the work further, with the trade-off that it approximates the full adversarial search." },
    ],
    evidence: "Built in the provided UC Berkeley Pac-Man framework for Monash coursework. Solution code stays private. This original maze illustration explains the idea; it is not a recording or execution of the submitted agent.",
  },
  classifier: {
    motion: "classifier",
    facts: [{ label: "Task", value: "24 image classes" }, { label: "Framework", value: "TensorFlow / Keras" }, { label: "Saved test", value: "81.76% · SELU" }],
    sections: [
      { title: "Compare the choices inside a model", text: "This notebook studies sign-language letter images using dense neural networks. It compares batch normalisation with a SELU / AlphaDropout design, then explores Monte Carlo dropout and learning-rate scheduling." },
      { title: "Keep the experiment honest", text: "The saved outputs show test accuracy around 81.8%, below some of the recorded validation results. The MobileNet transfer-learning section is unfinished. That makes this a model-comparison story with useful results and a clear next step." },
    ],
    evidence: "Accuracy comes from the saved notebook outputs, not a new training run. The animation illustrates the workflow and does not run a model.",
  },
  systems: {
    motion: "shell",
    facts: [{ label: "Language", value: "C / Unix" }, { label: "Focus", value: "Processes & pipes" }, { label: "Setting", value: "Coursework" }],
    sections: [
      { title: "A command is a chain of mechanisms", text: "The shell exercises move from tokenising input to creating processes, executing programs and connecting file descriptors. The larger version includes code for pipes, redirection and wildcard expansion; the mini shell adds a smaller view of process and signal handling." },
      { title: "Look beyond the default branch", text: "Related operating-systems work lives on separate coursework branches. It includes memory-simulation code with LRU and Clock logic, reference traces and a small threaded TCP-server exercise. These are independent learning projects, rather than one operating-system product." },
    ],
    evidence: "The shell work includes course scaffold code. Source files and branches were inspected; the programs have not been built or run in this website update.",
  },
  booking: {
    motion: "booking",
    facts: [{ label: "Stage", value: "Prototype" }, { label: "Server", value: "Express / Node.js" }, { label: "Database", value: "MySQL" }],
    sections: [
      { title: "One flow, three layers", text: "The browser pages connect to Express routes and a MySQL schema. Accounts, sessions, room information and reservation records turn a simple booking idea into a full-stack application exercise." },
      { title: "The next iteration is reliability", text: "The source contains the main account and booking routes, with work still to do on password handling, booking dates and availability queries. I am presenting it as a prototype that can grow through better validation and tests." },
    ],
    evidence: "The project is a source-available prototype. The illustration shows an example booking flow, rather than a live reservation service.",
  },
  games: {
    motion: "games",
    facts: [{ label: "Medium", value: "MATLAB graphics" }, { label: "Interaction", value: "Mouse callbacks" }, { label: "Air battle", value: "40 Hz timer configured" }],
    sections: [
      { title: "Make a rule visible", text: "The grid puzzle updates a clicked cell and its neighbours, redraws image tiles and counts moves. The air-battle game connects mouse input, plane and projectile sprites, and a timed update loop." },
      { title: "Code can also be something to play", text: "These experiments bring a more playful side into the map. State changes become movement and feedback on screen, giving programming a different setting from databases, parsers or model training." },
    ],
    evidence: "The source contains two separate MATLAB experiments. The animation is a browser illustration; the games themselves run in MATLAB.",
  },
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
  "sign-language-classifier": "classifier",
  "unix-systems": "systems",
  "hotel-booking": "booking",
  "matlab-games": "games",
  "pacman-ai": "pacman",
  "flatland-train-scheduling": "flatland",
  "bayesian-decision-analysis": "bayesian",
  "weka-model-evaluation": "evaluation",
  "dinov3-image-classification": "vision",
};
