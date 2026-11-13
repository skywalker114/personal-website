import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { notes, profile } from "@/content/site";

export function generateStaticParams() { return notes.map(note => ({ slug: note.slug })); }
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const note = notes.find(n => n.slug === slug);
  return { title: `${note?.title || "Note"} — ${profile.name}`, description: note?.description };
}

export default async function NotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const note = notes.find(n => n.slug === slug);
  if (!note) notFound();
  return <><header className="site-header"><a className="wordmark" href="/">{profile.name.toLowerCase()}<span>.</span></a><a className="quiet-link" href="/#map"><ArrowLeft size={15} /> Back to the space</a></header><main id="main" className="article-shell"><div className="article-meta"><span>{note.category}</span><span>{note.readingTime}</span></div><h1>{note.title}</h1><p className="article-description">{note.description}</p>{note.sample && <aside className="article-sample">Sample note — this writing demonstrates the layout and will be replaced with personal stories.</aside>}<div className="article-body">{note.paragraphs.map(p => <p key={p}>{p}</p>)}</div><a className="article-back" href="/about/#notes-title">More notes <ArrowUpRight size={18} /></a></main><footer className="site-footer"><a href="/" className="wordmark">{profile.name.toLowerCase()}<span>.</span></a><span>A WORK IN PROGRESS, BY DESIGN.</span></footer></>;
}
