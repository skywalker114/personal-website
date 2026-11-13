import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { education, experience, notes, profile, toolkit } from "@/content/site";

export const metadata: Metadata = { title: `About ${profile.fullName}`, description: profile.introduction };

export default function AboutPage() {
  return <>
    <header className="site-header"><a className="wordmark" href="/">harry<span>.</span></a><a className="quiet-link" href="/"><ArrowLeft size={14}/>Back to the space</a></header>
    <main className="about-reader" id="about">
      <span className="eyebrow">{profile.fullName.toUpperCase()} · MELBOURNE</span>
      <h1>The person<br /><em>behind the points.</em></h1>
      <div className="about-reader-intro">{profile.about.map(paragraph=><p key={paragraph}>{paragraph}</p>)}</div>
      <section className="about-reader-section" aria-labelledby="education-title"><h2 id="education-title">Learning, along the way.</h2>{education.map(item=><article id={`study-${item.id}`} key={item.id}><span className="eyebrow">{item.dates}</span><h3>{item.degree}</h3><p>{item.institution}</p></article>)}</section>
      <section className="about-reader-section" aria-labelledby="experience-title"><h2 id="experience-title">Different settings.<br /><em>The same curiosity.</em></h2>{experience.map(item=><article id={`chapter-${item.id}`} key={item.id}><span className="eyebrow">{item.dates}</span><h3>{item.organisation}</h3><p className="about-reader-role">{item.role}</p><p>{item.description}</p></article>)}</section>
      <section className="about-reader-section" aria-labelledby="toolkit-title"><h2 id="toolkit-title">The tools along the way.</h2><dl>{toolkit.map(group=><div key={group.label}><dt>{group.label}</dt><dd>{group.tools}</dd></div>)}</dl></section>
      <section className="about-reader-section" aria-labelledby="notes-title"><h2 id="notes-title">A few notes.</h2>{notes.map(note=><a className="about-note-link" key={note.slug} href={`/notes/${note.slug}/`}><span>{note.title}</span><ArrowUpRight size={16}/></a>)}</section>
      <div className="about-reader-links"><a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub<ArrowUpRight size={13}/></a><a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn<ArrowUpRight size={13}/></a><a href={`mailto:${profile.email}`}>Say hello<ArrowUpRight size={13}/></a></div>
    </main>
    <footer className="site-footer"><a className="wordmark" href="/">harry<span>.</span></a><a className="quiet-link" href="/">Back to the space<ArrowUpRight size={14}/></a></footer>
  </>;
}
