<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Folder plan

- `public/animations/`: Lottie animation assets.
- `src/app/projects/page.tsx`: projects index route.
- `src/app/projects/[category]/page.tsx`: project category route.
- `src/app/projects/[category]/[slug]/page.tsx`: project detail route.
- `src/components/sections/projects/`: project route presentation components.
- `src/components/sections/projects/CardGrid.tsx`: responsive grid for project and category cards.
- `src/components/layout/PageFrame.tsx`: shared rounded page frame.
- `src/components/layout/NavDropdown.tsx`: project navigation dropdown.
- `src/components/sections/about/`: AboutHero, Journey, Drives, Skills and ClosingBand sections.
- `src/types/about.ts`: strict type for the About page content shape.
- `src/components/ui/MediaCard.tsx`: shared base card markup.
- `src/components/ui/CategoryCard.tsx`: category card wrapper.
- `src/components/ui/ProjectCard.tsx`: linked project card.
- `src/content/categories.ts`: project category data.
- `src/content/projects.ts`: project data and lookup helpers.
- Cards have an empty image area until a real image path is added in categories.ts or projects.ts.
- All cards use MediaCard. Never copy card markup.

## Content rules

- Never invent project facts. Placeholder text starts with [PLACEHOLDER]

## Components

- Client components only for interactive or browser-dependent behavior; keep the rest as Server Components.
- Allowed small client components include `src/components/layout/NavDropdown.tsx` for the desktop Projects menu.
- Allowed UI packages include `simple-icons` for rendering individual imported brand icons as inline SVGs.
- Skills list stays at 12 tools or fewer. Only tools I can discuss in an interview.
- About page is one screen on desktop. Skills list stays at 6 tools.

## Design

- Cards: floating 3D images with a label pill
