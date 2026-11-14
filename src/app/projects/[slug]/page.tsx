import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { profile, projects } from "@/content/site";
import ProjectCover from "@/components/project-cover";
import ProjectMotion from "@/components/project-motion";
import { projectStoryIds, storyDetails } from "@/content/story-details";

export function generateStaticParams() { return projects.map(p => ({ slug: p.slug })); }
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find(p => p.slug === slug);
  return { title: `${project?.shortTitle || "Project"} — ${profile.fullName}`, description: project?.description };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find(p => p.slug === slug);
  if (!project) notFound();
  const story = storyDetails[projectStoryIds[slug]];
  return <>
    <header className="site-header"><a className="wordmark" href="/">harry<span>.</span></a><a className="quiet-link" href="/#map"><ArrowLeft size={15} /> Back to the space</a></header>
    <main className="case-study">
      <div className="article-meta"><span>{project.category}</span><span>PROJECT {project.number}</span></div>
      <h1>{project.title}</h1>
      <p className="case-subtitle">{project.shortTitle}</p>
      <div className="case-facts"><div><span>MY ROLE</span><p>{project.role}</p></div><div><span>FOCUS</span><p>{project.tags.join(" · ")}</p></div></div>
      {story?.motion ? <ProjectMotion kind={story.motion} /> : <div className={`case-banner case-${project.visual}`}><ProjectCover visual={project.visual} /><span>PROJECT ILLUSTRATION</span></div>}
      <div className="case-body">
        <section><h2>The project</h2><p>{project.overview}</p></section>
        {story?.sections[0] && <section><h2>{story.sections[0].title}</h2><p>{story.sections[0].text}</p></section>}
        <section><h2>My contribution</h2><ul>{project.contributions.map(item=><li key={item}>{item}</li>)}</ul></section>
        {story?.sections[1] && <section><h2>{story.sections[1].title}</h2><p>{story.sections[1].text}</p></section>}
        <section className="case-outcome"><span className="eyebrow">OUTCOME</span><p>{project.outcome}</p>{story?.evidence && <small>{story.evidence}</small>}</section>
        <section><h2>The wider picture</h2><p>{project.perspective}</p></section>
        <nav className="case-other-projects" aria-label="More projects"><span className="eyebrow">KEEP EXPLORING</span>{projects.filter(item=>item.slug!==slug).map(item=><a href={`/projects/${item.slug}/`} key={item.slug}><span>{item.shortTitle}</span><ArrowUpRight size={16}/></a>)}</nav>
      </div>
      <div className="case-links"><a href="/">Explore the space <ArrowUpRight size={17} /></a>{project.repository && <a href={project.repository} target="_blank" rel="noopener noreferrer">Source code <ArrowUpRight size={17} /></a>}<a href={profile.github} target="_blank" rel="noopener noreferrer">My GitHub <ArrowUpRight size={17} /></a></div>
    </main>
    <footer className="site-footer"><a className="wordmark" href="/">harry<span>.</span></a><span>SOFTWARE, SYSTEMS & A LITTLE CURIOSITY.</span></footer>
  </>;
}
