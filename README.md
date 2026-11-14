# Harry — a personal space

An English-first personal website for technology, experiments, writing, and the person behind them. Next.js App Router + TypeScript + React Three Fiber. Exports to static HTML for Cloudflare Workers Static Assets or Pages; no paid service or API key is required for the included experiments.

## The personal atlas

The homepage is one full-viewport 3D space. Harry is the central point, connected to four project/code chapters, three work chapters, two education chapters and Roman archaeology. No permanent sidebar, hero blocks or bento cards appear on the landing page. Hover or keyboard-focus a point for a small anchored preview; click or press Enter to keep its details open. Close the floating details with Escape, the close button or an empty-space click. Rotation resumes when the information is dismissed. Category filters simplify the scene, and arrow keys move between words (Home returns to Harry).

`src/content/personal-map.ts` holds the semantic points, thematic connections and curated XYZ story coordinates. `src/components/personal-map.tsx` provides accessible HTML word buttons, filtering and temporary point-anchored information. `personal-map-scene.tsx` renders the perspective scatter plot with Three.js BufferGeometry/Points and connecting lines. There is no enclosing chart frame, floor grid or axis overlay. OrbitControls provides automatic rotation, mouse/touch orbiting and wheel/pinch zoom. The bottom instruction text and toolbar are omitted for a clean view. Hover pauses rotation and holds the labels steady; click details pause rotation until dismissed. Label positions ease between updates, and size and opacity follow depth.

The ten story chapters plus Harry's central point have 21 related skill/research words, for 32 plotted points in the complete view. Topic words open their parent story. On small screens the 3D plot and automatic rotation remain available at a lower pixel ratio, while topic labels are hidden for readability. Tapping a point opens a temporary bottom sheet without scrolling away from the space. Reduced-motion preferences disable automatic rotation while preserving manual orbiting and zoom. The SVG fallback keeps the chapter buttons and stories available if WebGL fails.

This is an **embedding-projector-style visualization**, not a claim that Word2Vec or t-SNE has been run. Story positions are explicitly curated in `storyCoordinates`, and the surrounding topic coordinates are deterministically generated near their parent. A future offline embedding/t-SNE pipeline can replace those coordinates without changing the story interface.

The full biography, education, work chapters, toolkit and notes index live at `/about/`. Work and study links target that page's matching anchors. Individual project and note pages remain accessible from the floating story details. The contact dialog is available from the minimal header.

## Run locally

The homepage uses a bright palette from 07:00 to 19:00 in each visitor's device time zone, and the original dark palette at night. It rechecks every minute and when the tab regains focus. Add `?theme=day` or `?theme=night` to the homepage URL to preview either appearance; the plain URL uses automatic timing. This needs no location permission or external service.

Requirements: Node.js 20.9+ and pnpm (or npm).

```sh
pnpm install
pnpm dev
```

Open http://127.0.0.1:3000. With npm, use `npm install` and `npm run dev` instead. This repository includes `pnpm-lock.yaml`; prefer pnpm for reproducible versions.

```sh
pnpm typecheck
pnpm build
```

The production build is the `out/` directory. Run `pnpm preview` (or `npm run preview`) to inspect it at http://127.0.0.1:3002. The included preview server binds only to localhost; production hosting is handled by Cloudflare.

## Make it personal

Edit **`src/content/site.ts`**:

- The biography, education, work, toolkit and contact details now use Harry's supplied CV. GitHub is the user-confirmed skywalker114 profile; LinkedIn matches the CV's employer and education. See `CONTENT_SOURCES.md` for provenance and retrieval limits.
- Add to `projects` for case studies at `/projects/<slug>/`. Existing case studies cover the CTF platform, attendance system and VM converter. Repository links remain empty until the matching source is provided; the linked C++ practice repository is kept separate.
- The two notes now introduce Harry's Roman archaeology research and VM converter. They are freshly drafted project summaries, not reproductions of his prior writing. Add personal essays and original research articles to the same array for routes at `/notes/<slug>/`.
- Update the chapter/skill words and curated positions in `src/content/personal-map.ts`; keep every destination matched to a real page or About anchor.
- `huggingFaceSpace` is reserved content configuration; the immersive landing currently embeds no external model demo.

The immersive interface lives in `src/components/personal-map.tsx`, contact behavior in `contact-dialog.tsx`, and the readable biography in `src/app/about/page.tsx`. Styles and responsive breakpoints live in `src/app/globals.css`. Fonts are served by Google Fonts, with system serif/sans/monospace fallbacks if unavailable. Self-host the fonts if you want to remove that external request.

Before public launch, review the newly drafted copy and CV-reported outcomes, then change the `robots` metadata in `src/app/layout.tsx` to allow indexing. Add a canonical domain and social image once a real domain exists. The supplied CV's phone number and residency details are not included on the website, and the original PDF is not a public asset.

## Deploy on Cloudflare Workers

The existing Cloudflare Worker project is named `personal-website`. The committed `wrangler.jsonc` tells Wrangler to upload the static `out/` directory and serve the exported `404.html` for missing routes. This explicit configuration avoids automatically adapting the project with OpenNext.

Use these settings in the Worker's Git-connected build configuration:

- Production branch: `main`
- Root directory: the repository root
- Build command: `npm run build` (or `pnpm build`)
- Deploy command: `npx wrangler deploy`

Commit and push `wrangler.jsonc` with the source; Cloudflare builds `out/` on each deployment, so keep `out/` ignored. The Worker name in the configuration must match the existing Cloudflare project. No Worker script or OpenNext adapter is needed for this static export.

Official reference: https://developers.cloudflare.com/workers/static-assets/routing/static-site-generation/

## Alternative: Cloudflare Pages

This project uses `output: "export"`; it does not require a Next.js server or the Workers adapter.

1. Push this project to your GitHub repository, excluding ignored folders and secrets.
2. In Cloudflare Pages, connect the repository and use **Next.js (Static HTML Export)** or set the build command to `pnpm build` and output directory to **`out`**. With npm, use `npm run build`.
3. Select a supported Node.js version (22 LTS is suitable) and deploy.
4. Add your own domain in the Pages project's custom-domain settings and follow the DNS instructions Cloudflare returns.

Official reference: https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/

The local configuration does not create or deploy cloud resources. Cloudflare is the intended hosting target; the source is portable.

## Experiments and accessibility

- Lazy-loads the 3D bundle, caps rendering resolution, reduces decorative particles on small screens, respects reduced-motion preferences and stops automatic rotation while the browser tab is hidden.
- Point previews use tooltip semantics. Pinned story information is a non-modal dialog so the space stays accessible; Escape and the close button return focus to the originating word. Contact uses a native modal dialog.
- Includes labelled controls, focus indicators, arrow-key navigation and an accessible link to the plain-text About page.
- The legacy `neural-field.tsx` component remains in source for future experimentation; it is not exposed as a current portfolio project.

## Add an AI assistant later

The site currently sends no chat requests and stores no keys. A real assistant needs approved profile material, a model provider, and a separate Cloudflare Worker or Pages Function. Keep provider API keys in server-side secrets, add request limits and input limits, and call that endpoint from the browser. Do not put secrets in `NEXT_PUBLIC_*` variables or the content file. A Hugging Face Space is a separate deployment and may have its own usage limits or sleep behavior.

Student domain benefits and free provider allowances change. Verify current eligibility and renewal prices directly before relying on a free domain or a permanent zero-cost backend.
