"use client";

import dynamic from "next/dynamic";
import { ArrowUpRight, X } from "lucide-react";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { cloudPoints, mapCategories, mapConnections, mapPosition, personalMap, type MapFilter, type MapKind } from "@/content/personal-map";
import { profile } from "@/content/site";
import { storyDetails } from "@/content/story-details";
import { mapPalettes, mapThemeAt, type MapTheme } from "@/lib/map-theme";
import type { ViewCommand } from "./personal-map-scene";

const Scene = dynamic(() => import("./personal-map-scene"), { ssr: false });
const ProjectMotion = dynamic(() => import("./project-motion"));
const kindNames: Record<MapKind, string> = { person: "THE PERSON", project: "BUILDING", work: "WORKING", study: "LEARNING", life: "BEYOND CODE" };

export default function PersonalMap({ onContact }: { onContact: () => void }) {
  const [filter, setFilter] = useState<MapFilter>("all");
  const [previewId, setPreviewId] = useState<string | null>(null);
  const [pinnedId, setPinnedId] = useState<string | null>(null);
  const [capability, setCapability] = useState({ webgl: false, compact: false, reduced: true });
  const [sceneReady, setSceneReady] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [theme, setTheme] = useState<MapTheme>("night");
  const colors = mapPalettes[theme];
  const viewCommand = useMemo<ViewCommand>(() => ({ id: 0, type: "reset" }), []);
  const labels = useRef<Record<string, HTMLButtonElement | null>>({});
  const popup = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const suppressFocus = useRef(false);
  const onReady = useCallback(() => setSceneReady(true), []);
  const onFailure = useCallback(() => { setSceneReady(false); setCapability(current => ({ ...current, webgl: false })); }, []);

  useEffect(() => {
    const preview = new URLSearchParams(window.location.search).get("theme");
    const updateTheme = () => setTheme(preview === "day" || preview === "night" ? preview : mapThemeAt(new Date()));
    updateTheme();
    const timer = window.setInterval(updateTheme, 60_000);
    document.addEventListener("visibilitychange", updateTheme);
    window.addEventListener("focus", updateTheme);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", updateTheme);
      window.removeEventListener("focus", updateTheme);
    };
  }, []);

  useEffect(() => {
    const compact = window.matchMedia("(max-width: 700px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let webgl = false;
    try {
      const probe = document.createElement("canvas").getContext("webgl2");
      webgl = Boolean(probe);
      probe?.getExtension("WEBGL_lose_context")?.loseContext();
    } catch { /* Story labels remain usable in the SVG fallback. */ }
    const update = () => setCapability({ webgl, compact: compact.matches, reduced: reduced.matches });
    update();
    compact.addEventListener("change", update);
    reduced.addEventListener("change", update);
    const visibility = () => setPageVisible(!document.hidden);
    visibility();
    document.addEventListener("visibilitychange", visibility);
    document.body.classList.add("immersive-home");
    return () => {
      compact.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", visibility);
      document.body.classList.remove("immersive-home");
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  const visibleNodes = useMemo(() => personalMap.filter(node => filter === "all" || node.kind === "person" || node.kind === filter), [filter]);
  const visiblePoints = useMemo(() => cloudPoints.filter(point => filter === "all" || point.kind === "person" || point.kind === filter), [filter]);
  const showTopics = !capability.compact;
  const labelPoints = sceneReady && showTopics ? visiblePoints : visiblePoints.filter(point => point.isChapter);
  const activeId = pinnedId || previewId;
  const activePoint = cloudPoints.find(point => point.id === activeId);
  const chapter = activePoint ? personalMap.find(node => node.id === activePoint.chapterId)! : null;
  const story = chapter ? storyDetails[chapter.id] : null;
  const moving = !capability.reduced && pageVisible && !pinnedId;
  const related = chapter ? personalMap.filter(node => node.kind === chapter.kind && node.id !== chapter.id).slice(0, 3) : [];

  function cancelClose() {
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null; }
  }
  function closeInfo(restoreFocus = false) {
    cancelClose();
    const previous = pinnedId || previewId;
    setPinnedId(null);
    setPreviewId(null);
    if (restoreFocus && previous && labels.current[previous]) {
      suppressFocus.current = true;
      labels.current[previous]?.focus({ preventScroll: true });
    }
  }
  function enterPoint(id: string) {
    cancelClose();
    if (!pinnedId) setPreviewId(id);
  }
  function leavePoint() {
    cancelClose();
    if (!pinnedId) closeTimer.current = setTimeout(() => setPreviewId(null), 180);
  }
  function pinPoint(id: string) {
    cancelClose();
    setPinnedId(id);
    setPreviewId(null);
  }
  function chooseCategory(next: MapFilter) {
    closeInfo();
    setFilter(next);
  }

  useEffect(() => {
    if (pinnedId) {
      closeButton.current?.focus({ preventScroll: true });
      if (popup.current) popup.current.scrollTop = 0;
    }
  }, [pinnedId]);

  useEffect(() => {
    const escape = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape" && (pinnedId || previewId)) { event.preventDefault(); closeInfo(true); }
    };
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  });

  // The popup follows the rendered word, including manual orbiting and zoom.
  // Only its DOM position changes; the page does not rerender on animation frames.
  useLayoutEffect(() => {
    if (!activeId) return;
    let frame = 0;
    const place = () => {
      const card = popup.current, anchor = labels.current[activeId];
      if (card && anchor) {
        if (capability.compact) {
          card.style.left = "16px"; card.style.right = "16px";
          card.style.bottom = "20px"; card.style.top = "auto";
        } else {
          const rect = anchor.getBoundingClientRect();
          const width = card.offsetWidth, height = card.offsetHeight;
          let left = rect.right + 18;
          if (left + width > window.innerWidth - 26) left = rect.left - width - 18;
          const top = Math.max(window.innerWidth <= 1200 ? 166 : 120, Math.min(rect.top - 30, window.innerHeight - height - 32));
          card.style.left = `${Math.max(24, Math.min(left, window.innerWidth - width - 24))}px`;
          card.style.top = `${top}px`; card.style.right = "auto"; card.style.bottom = "auto";
        }
      }
      frame = requestAnimationFrame(place);
    };
    place();
    return () => cancelAnimationFrame(frame);
  }, [activeId, capability.compact, Boolean(pinnedId)]);

  useEffect(() => {
    if (sceneReady) return;
    visibleNodes.forEach(node => {
      const [x, y] = mapPosition(node, filter, capability.compact);
      const element = labels.current[node.id];
      if (element) { element.style.left = `${50 + x * (capability.compact ? 38 : 40)}%`; element.style.top = `${50 - y * 33}%`; }
    });
  }, [sceneReady, visibleNodes, filter, capability.compact]);

  function navigateNodes(event: KeyboardEvent<HTMLButtonElement>, currentId: string) {
    if (event.key === "Home") { event.preventDefault(); labels.current.harry?.focus(); return; }
    const direction = { ArrowLeft: [-1,0], ArrowRight: [1,0], ArrowUp: [0,-1], ArrowDown: [0,1] }[event.key];
    if (!direction) return;
    event.preventDefault();
    const origin = labels.current[currentId]!.getBoundingClientRect();
    const candidate = labelPoints.filter(point => point.id !== currentId).map(point => {
      const rect = labels.current[point.id]!.getBoundingClientRect();
      const dx = rect.left - origin.left, dy = rect.top - origin.top;
      return { point, forward: dx * direction[0] + dy * direction[1], score: Math.hypot(dx,dy) + Math.abs(dx * direction[1] - dy * direction[0]) * 1.5 };
    }).filter(item => item.forward > 5).sort((a,b)=>a.score-b.score)[0];
    if (candidate) labels.current[candidate.point.id]?.focus();
  }

  return <section className="space-shell" data-theme={theme} id="map" aria-label="Harry Tang's interactive 3D story space">
    <h1 className="sr-only">{profile.fullName} — a life in three dimensions</h1>
    <a className="skip-link" href="/about/">Read my story as a page</a>
    <header className="space-header"><a href="/" className="space-brand" aria-label="Harry Tang, home">harry<span>.</span></a><span className="space-byline">A LIFE, CONNECTED.</span><div><a href="/about/">About</a><button onClick={()=>{closeInfo();onContact();}}>Say hello <ArrowUpRight size={13} /></button></div></header>
    <nav className="space-navigation" aria-label="Explore by theme">{mapCategories.map(category => <button key={category.id} aria-pressed={filter === category.id} onClick={()=>chooseCategory(category.id)} style={{"--node-color":category.id === "all" ? colors.person : colors[category.id]} as CSSProperties}><i />{category.label}</button>)}</nav>

    <div className={`story-space scatter-stage ${sceneReady ? "has-3d" : ""}`} id="atlas-explorer" onPointerDown={event => { const target = event.target as HTMLElement; if (!target.closest(".atlas-node,.space-popover,.space-header,.space-navigation")) closeInfo(); }}>
      <div className="space-glow" aria-hidden="true" />
      <svg className={`space-fallback ${sceneReady ? "is-ready" : ""}`} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">{mapConnections.map(([a,b])=>{
        const from=visibleNodes.find(node=>node.id===a),to=visibleNodes.find(node=>node.id===b);
        if(!from||!to)return null;
        const [x1,y1]=mapPosition(from,filter,capability.compact),[x2,y2]=mapPosition(to,filter,capability.compact);
        return <line key={`${a}-${b}`} x1={50+x1*(capability.compact?38:40)} y1={50-y1*33} x2={50+x2*(capability.compact?38:40)} y2={50-y2*33} stroke={theme === "day" ? "#637961" : "#93b18c"} strokeWidth=".09" opacity=".3"/>;
      })}</svg>
      {capability.webgl&&<div className="atlas-webgl" aria-hidden="true"><Scene points={visiblePoints} filter={filter} compact={capability.compact} theme={theme} selected={activeId||"harry"} hovered={previewId} moving={moving} viewCommand={viewCommand} labels={labels} onReady={onReady} onFailure={onFailure}/></div>}
      <div className="atlas-node-layer" role="group" aria-label="Story points — hover to preview, select to explore">
        {labelPoints.map(point=>{
          const node=personalMap.find(chapter=>chapter.id===point.chapterId)!;
          const [x,y]=mapPosition(node,filter,capability.compact);
          return <button key={point.id} ref={element=>{labels.current[point.id]=element;}} className={`atlas-node node-${point.kind} ${point.isChapter?"scatter-chapter":"scatter-word"} ${activeId===point.id?"is-selected":""}`} style={{"--node-color":colors[point.kind],left:`${50+x*(capability.compact?38:40)}%`,top:`${50-y*33}%`} as CSSProperties} onPointerEnter={event=>{if(event.pointerType!=="touch")enterPoint(point.id);}} onPointerLeave={leavePoint} onFocus={()=>{if(suppressFocus.current){suppressFocus.current=false;return;}enterPoint(point.id);}} onBlur={leavePoint} onKeyDown={event=>navigateNodes(event,point.id)} onClick={()=>pinPoint(point.id)} aria-label={point.isChapter?`Explore ${node.id==="harry"?"Harry Tang":node.title}`:`Explore ${point.label} in ${node.title}`} aria-pressed={pinnedId===point.id} aria-describedby={previewId===point.id?"space-point-info":undefined} aria-haspopup="dialog"><span className="atlas-node-point" aria-hidden="true"/><span className="atlas-node-label">{point.label}</span></button>;
        })}
      </div>
    </div>

    {activePoint&&chapter&&<div ref={popup} className={`space-popover ${pinnedId?"is-pinned":"is-preview"}`} role={pinnedId?"dialog":"tooltip"} aria-modal={pinnedId?false:undefined} id="space-point-info" aria-labelledby="space-info-title" style={{"--node-color":colors[chapter.kind]} as CSSProperties} onPointerEnter={cancelClose} onPointerLeave={leavePoint}>
      <div className="space-info-top"><span>{kindNames[chapter.kind]}{!activePoint.isChapter?` / ${activePoint.label}`:""}</span>{pinnedId&&<button ref={closeButton} className="space-info-close" onClick={()=>closeInfo(true)} aria-label="Close story details"><X size={17}/></button>}</div>
      <h2 id="space-info-title">{chapter.title}</h2><p className="space-info-subtitle">{chapter.subtitle}</p>
      <p className="space-info-description">{chapter.description}</p>
      {pinnedId?<>
        <a className="space-info-link" href={chapter.href} target={chapter.external?"_blank":undefined} rel={chapter.external?"noopener noreferrer":undefined}>{chapter.linkLabel}<ArrowUpRight size={15}/></a>
        {story?.motion && <ProjectMotion key={chapter.id} kind={story.motion} compact />}
        {story && <dl className="space-story-facts">{story.facts.map(fact => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}</dl>}
        {story?.sections.map(section => <section className="space-story-section" key={section.title}><h3>{section.title}</h3><p>{section.text}</p></section>)}
        <p className="space-info-detail">{chapter.detail}</p>
        {chapter.skills.length>0&&<div className="space-info-skills">{chapter.skills.map(skill=><span key={skill}>{skill}</span>)}</div>}
        {story?.evidence && <p className="space-story-evidence">{story.evidence}</p>}
        {related.length>0&&<div className="space-info-related"><span>CONNECTED STORIES</span>{related.map(node=><button key={node.id} onClick={()=>pinPoint(node.id)}>{node.label}<ArrowUpRight size={11}/></button>)}</div>}
      </>:<span className="space-preview-hint">Click the point to explore <ArrowUpRight size={11}/></span>}
    </div>}

    <p className="sr-only" role="status">{pinnedId&&chapter?`Opened ${chapter.title}`:""}</p>
  </section>;
}
