"use client";

import { ArrowUpRight, Check, Copy, Github, Linkedin, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/content/site";

export default function ContactDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (!open || !dialog.current) return;
    const element = dialog.current;
    const previous = document.activeElement as HTMLElement | null;
    element.showModal(); closeButton.current?.focus();
    return () => { element.close(); previous?.focus({preventScroll:true}); setCopied(false); if(timer.current)clearTimeout(timer.current); };
  }, [open]);
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      timer.current = setTimeout(()=>setCopied(false),2200);
    } catch { window.location.href = `mailto:${profile.email}`; }
  }
  return <dialog ref={dialog} className="modal modal-contact" aria-labelledby="contact-dialog-title" onCancel={event=>{event.preventDefault();onClose();}} onClick={event=>{if(event.target===dialog.current){const rect=dialog.current.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)onClose();}}}>
    <div className="modal-heading"><div><span className="eyebrow">A NEW CONVERSATION</span><h2 id="contact-dialog-title">Hello, there.</h2></div><button ref={closeButton} className="icon-button" onClick={onClose} aria-label="Close contact details"><X size={20}/></button></div>
    <div className="contact-dialog"><p>A project, a question, or a good conversation. My inbox is open.</p><a className="contact-email" href={`mailto:${profile.email}`}>{profile.email}<ArrowUpRight size={20}/></a><button className="text-button" onClick={copyEmail}>{copied?<Check size={14}/>:<Copy size={14}/>} {copied?"Email copied":"Copy email"}</button><div className="contact-socials"><a href={profile.github} target="_blank" rel="noopener noreferrer"><Github size={16}/>GitHub<ArrowUpRight size={13}/></a><a href={profile.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin size={16}/>LinkedIn<ArrowUpRight size={13}/></a></div><span className="sr-only" role="status">{copied?"Email address copied to clipboard":""}</span></div>
  </dialog>;
}
