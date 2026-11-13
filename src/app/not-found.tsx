import { ArrowUpRight } from "lucide-react";

export default function NotFound() {
  return <main className="not-found"><span className="eyebrow">404 — A LITTLE OFF THE MAP</span><h1>Nothing here.<br /><em>Yet.</em></h1><p>Even curiosity takes a wrong turn sometimes.</p><a className="button button-primary" href="/">Back to my corner <ArrowUpRight size={18} /></a></main>;
}
