import { education, experience, notes, profile, projects, publicCode } from "./site";

export type MapKind = "person" | "project" | "work" | "study" | "life";
export type MapFilter = "all" | Exclude<MapKind, "person">;
export type MapNode = {
  id: string;
  kind: MapKind;
  label: string;
  title: string;
  subtitle: string;
  description: string;
  detail: string;
  skills: string[];
  href: string;
  linkLabel: string;
  external?: boolean;
  position: [number, number, number];
  compactPosition: [number, number, number];
};

export const mapCategories: { id: MapFilter; label: string; color: string }[] = [
  { id: "all", label: "Everything", color: "#efeee7" },
  { id: "project", label: "Building", color: "#c3f5b5" },
  { id: "work", label: "Working", color: "#c7b7f0" },
  { id: "study", label: "Learning", color: "#aacff2" },
  { id: "life", label: "Beyond code", color: "#e8c49a" },
];

export const mapColors: Record<MapKind, string> = {
  person: "#efeee7", project: "#c3f5b5", work: "#c7b7f0", study: "#aacff2", life: "#e8c49a",
};

export const personalMap: MapNode[] = [
  {
    id: "harry", kind: "person", label: "Harry Tang", title: profile.fullName,
    subtitle: "One person. Many connections.", description: profile.introduction,
    detail: "Software, people-facing work, AI study and Roman history. Follow a point to see a different part of my story.",
    skills: [], href: "/about/", linkLabel: "Meet the person", position: [0, 0, .9], compactPosition: [0, -.05, .9],
  },
  {
    id: "ctf", kind: "project", label: "CTF platform", title: projects[0].shortTitle,
    subtitle: projects[0].role, description: projects[0].description, detail: projects[0].outcome,
    skills: projects[0].tags, href: `/projects/${projects[0].slug}/`, linkLabel: "Explore the project",
    position: [-.70, .65, .35], compactPosition: [-.72, .84, .35],
  },
  {
    id: "attendance", kind: "project", label: "Attendance system", title: projects[1].shortTitle,
    subtitle: projects[1].role, description: projects[1].description, detail: projects[1].outcome,
    skills: projects[1].tags, href: `/projects/${projects[1].slug}/`, linkLabel: "Explore the project",
    position: [-.22, .91, -.2], compactPosition: [-.72, .49, -.2],
  },
  {
    id: "vm", kind: "project", label: "VM converter", title: projects[2].shortTitle,
    subtitle: projects[2].role, description: projects[2].description, detail: projects[2].outcome,
    skills: projects[2].tags, href: `/projects/${projects[2].slug}/`, linkLabel: "Explore the project",
    position: [-.78, .12, -.35], compactPosition: [-.72, .15, -.35],
  },
  {
    id: "cpp", kind: "project", label: "C++ foundations", title: publicCode.title,
    subtitle: "Public code · skywalker114", description: publicCode.description,
    detail: "An open look at the fundamentals: sorting, searching and recursive thinking.",
    skills: ["C++", "Sorting", "Recursive search"], href: "/projects/cpp-sorting-search/", linkLabel: "Explore the algorithms",
    position: [-.43, -.28, .2], compactPosition: [-.72, -.20, .2],
  },
  {
    id: "jiangsu", kind: "work", label: "Jiangsu String", title: experience[0].organisation,
    subtitle: `${experience[0].role} · ${experience[0].dates}`, description: experience[0].description,
    detail: "Worked with school and institutional clients, connecting their requirements with software, deployment and training.",
    skills: ["Spring Boot", "Vue", "MySQL", "Linux", "Kettle ETL"], href: "/about/#chapter-jiangsu", linkLabel: "See this work chapter",
    position: [.52, .75, -.3], compactPosition: [.72, .84, -.3],
  },
  {
    id: "glenunga", kind: "work", label: "Glenunga FC", title: experience[1].organisation,
    subtitle: `${experience[1].role} · ${experience[1].dates}`, description: experience[1].description,
    detail: "Live match statistics, team and player performance, and insights for the coaching staff.",
    skills: ["Python", "Data analysis", "AI & modelling", "PHP", "HTML / CSS"], href: "/about/#chapter-glenunga", linkLabel: "See this work chapter",
    position: [.87, .25, .2], compactPosition: [.72, .44, .2],
  },
  {
    id: "gillibrand", kind: "work", label: "Gillibrand", title: "Gillibrand · Melbourne",
    subtitle: `${experience[2].role} · ${experience[2].dates}`, description: experience[2].description,
    detail: "A practical view of the whole operation, from the online storefront to inventory, fulfilment and customer service.",
    skills: ["Shopify", "E-commerce", "Operations", "Customer experience"], href: "/about/#chapter-gillibrand", linkLabel: "See this work chapter",
    position: [.73, -.25, -.3], compactPosition: [.72, .04, -.3],
  },
  {
    id: "adelaide", kind: "study", label: "Adelaide · CS", title: education[1].institution,
    subtitle: `${education[1].degree} · ${education[1].dates}`,
    description: "My undergraduate chapter in computer science, before moving into postgraduate study in artificial intelligence.",
    detail: "Bachelor of Computer Science, February 2021–May 2024.",
    skills: ["Computer science", "Programming", "Systems"], href: "/about/#study-adelaide", linkLabel: "See my study path",
    position: [-.78, -.68, -.1], compactPosition: [-.72, -.59, -.1],
  },
  {
    id: "monash", kind: "study", label: "Monash · AI", title: education[0].institution,
    subtitle: education[0].degree,
    description: "My current learning chapter: a Master of Artificial Intelligence at Monash University.",
    detail: "July 2025–May 2027 · expected completion.",
    skills: ["Artificial intelligence", "Postgraduate study"], href: "/about/#study-monash", linkLabel: "See my study path",
    position: [-.13, -.88, .35], compactPosition: [0, -.91, .35],
  },
  {
    id: "roman", kind: "life", label: "Roman archaeology", title: "Roman art & archaeology",
    subtitle: "A personal research chapter", description: notes[0].description,
    detail: "Research and writing on the Domus Aurea, Roman artifacts and architectural sites, and regional differences in Roman pottery.",
    skills: ["Art & archaeology", "Research", "Academic writing"], href: `/notes/${notes[0].slug}/`, linkLabel: "Step beyond code",
    position: [.59, -.78, .2], compactPosition: [.72, -.62, .2],
  },
];

export function mapPosition(node: MapNode, filter: MapFilter, compact: boolean): [number, number, number] {
  if (filter === "all") return compact ? node.compactPosition : node.position;
  if (node.kind === "person") return [0, 0, .9];
  const members = personalMap.filter(item => item.kind === filter);
  const index = members.findIndex(item => item.id === node.id);
  const angle = -Math.PI / 2 + index * Math.PI * 2 / members.length;
  // A single life chapter sits beside the central point rather than over it.
  if (members.length === 1) return [.62, .24, .2];
  return [Math.cos(angle) * .72, -Math.sin(angle) * .72, node.position[2]];
}

// Connections group shared themes. They do not assert an undocumented project/employer relationship.
export const mapConnections: [string, string][] = [
  ...personalMap.filter(node => node.id !== "harry").map(node => ["harry", node.id] as [string, string]),
  ["ctf", "attendance"], ["ctf", "vm"], ["vm", "cpp"],
  ["jiangsu", "glenunga"], ["glenunga", "gillibrand"], ["adelaide", "monash"],
];

export type CloudPoint = {
  id: string;
  chapterId: string;
  label: string;
  kind: MapKind;
  isChapter: boolean;
  position: [number, number, number];
};

// A curated, genuinely three-dimensional layout. These are not computed t-SNE
// coordinates: no embedding model has been run on the biographical material.
const storyCoordinates: Record<string, [number, number, number]> = {
  harry: [0, 0, 0],
  ctf: [-1.85, .9, .25],
  attendance: [-1.45, -.05, 1.45],
  vm: [-1.85, -.9, -.85],
  cpp: [-.9, -1.2, -1.45],
  jiangsu: [1.25, 1.05, .85],
  glenunga: [1.8, -.4, 1.1],
  gillibrand: [2.0, .15, -1.0],
  adelaide: [.25, -1.7, -.5],
  monash: [-.15, -1.25, 1.35],
  roman: [.6, 1.8, -.6],
};

export const cloudPoints: CloudPoint[] = personalMap.flatMap((node, nodeIndex) => {
  const position = storyCoordinates[node.id];
  const chapter: CloudPoint = { id: node.id, chapterId: node.id, label: node.label, kind: node.kind, isChapter: true, position };
  const topics = node.id === "roman" ? ["Domus Aurea", "Roman pottery", "Research"] : node.skills.slice(0, 2);
  return [chapter, ...topics.map((label, index): CloudPoint => {
    const theta = index * 2.4 + nodeIndex * 1.27;
    const radius = .55 + index * .12;
    return {
      id: `${node.id}-topic-${index}`, chapterId: node.id, label, kind: node.kind, isChapter: false,
      position: [position[0] + Math.cos(theta) * radius, position[1] + Math.sin(theta) * radius * .8, position[2] + Math.sin(theta + 1.1) * radius],
    };
  })];
});

export const cloudConnections: [string, string][] = [
  ...mapConnections,
  ...cloudPoints.filter(point => !point.isChapter).map(point => [point.chapterId, point.id] as [string, string]),
];
