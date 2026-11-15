import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { codeExperiments, education, experience, notes, profile, projects, toolkit } from "@/content/site";
import { storyDetails } from "@/content/story-details";

export const metadata: Metadata = { title: `About ${profile.fullName}`, description: profile.introduction };

export default function AboutPage() {
  return <>
    <header className="site-header"><a className="wordmark" href="/">harry<span>.</span></a><a className="quiet-link" href="/"><ArrowLeft size={14}/>Back to the space</a></header>
    <main className="about-reader" id="about">
      <span className="eyebrow">{profile.fullName.toUpperCase()} · MELBOURNE</span>
      <h1>The person<br /><em>behind the points.</em></h1>
      <div className="about-reader-intro">{profile.about.map(paragraph=><p key={paragraph}>{paragraph}</p>)}</div>
      <section className="about-reader-section" aria-labelledby="connection-title"><h2 id="connection-title">Where the threads meet.</h2>{storyDetails.harry.sections.map(section=><div className="about-story-paragraph" key={section.title}><h3>{section.title}</h3><p>{section.text}</p></div>)}</section>
      <section className="about-reader-section" aria-labelledby="education-title"><h2 id="education-title">Learning, along the way.</h2>{education.map(item=><article id={`study-${item.id}`} key={item.id}><span className="eyebrow">{item.dates}</span><h3>{item.degree}</h3><p>{item.institution}</p><div className="about-story-paragraph"><p>{storyDetails[item.id].sections[0].text}</p></div></article>)}</section>
      <section className="about-reader-section" aria-labelledby="experience-title"><h2 id="experience-title">Different settings.<br /><em>The same curiosity.</em></h2>{experience.map(item=><article id={`chapter-${item.id}`} key={item.id}><span className="eyebrow">{item.dates}</span><h3>{item.organisation}</h3><p className="about-reader-role">{item.role}</p>{storyDetails[item.id].sections.map(section=><div className="about-story-paragraph" key={section.title}><h4>{section.title}</h4><p>{section.text}</p></div>)}</article>)}</section>
      <section className="about-reader-section" aria-labelledby="projects-title"><h2 id="projects-title">See the ideas in motion.</h2><p className="about-project-intro">Planning, probabilistic reasoning, machine learning and software systems—different ways to explore what a program can do, and where its limits appear.</p>{[...projects].sort((a,b)=>Number(!!b.spotlight)-Number(!!a.spotlight)||Number(!!b.featured)-Number(!!a.featured)).map(project=><a className="about-project-link" href={`/projects/${project.slug}/`} key={project.slug}><span>{project.status && <span className="project-status">{project.spotlight?"Featured · ":""}{project.status}</span>}<strong>{project.shortTitle}</strong><small>{project.description}</small></span><ArrowUpRight size={18}/></a>)}</section>
      <section className="about-reader-section" aria-labelledby="experiments-title"><h2 id="experiments-title">Smaller experiments.</h2><p className="about-project-intro">A few more pieces of the learning process, with the code open to explore.</p>{codeExperiments.map(experiment=><a className="about-project-link" href={experiment.url} key={experiment.url} target="_blank" rel="noopener noreferrer"><span><span className="project-status">{experiment.status}</span><strong>{experiment.title}</strong><small>{experiment.description}</small></span><ArrowUpRight size={18}/></a>)}</section>
      <section className="about-reader-section" aria-labelledby="toolkit-title"><h2 id="toolkit-title">The tools along the way.</h2><dl>{toolkit.map(group=><div key={group.label}><dt>{group.label}</dt><dd>{group.tools}</dd></div>)}</dl></section>
      <section className="about-reader-section" aria-labelledby="notes-title"><h2 id="notes-title">A few notes.</h2>{notes.map(note=><a className="about-note-link" key={note.slug} href={`/notes/${note.slug}/`}><span>{note.title}</span><ArrowUpRight size={16}/></a>)}</section>
      <div className="about-reader-links"><a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub<ArrowUpRight size={13}/></a><a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn<ArrowUpRight size={13}/></a><a href={`mailto:${profile.email}`}>Say hello<ArrowUpRight size={13}/></a></div>
    </main>
    <footer className="site-footer"><a className="wordmark" href="/">harry<span>.</span></a><a className="quiet-link" href="/">Back to the space<ArrowUpRight size={14}/></a></footer>
  </>;
}
