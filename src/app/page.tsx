"use client";

import { useState } from "react";
import PersonalMap from "@/components/personal-map";
import ContactDialog from "@/components/contact-dialog";

export default function Home() {
  const [contactOpen, setContactOpen] = useState(false);
  return <main id="main"><PersonalMap onContact={()=>setContactOpen(true)}/><ContactDialog open={contactOpen} onClose={()=>setContactOpen(false)}/></main>;
}
