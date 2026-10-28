<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Folder plan

- `src/app/`: route files, root layout and template only.
- `src/components/layout/`: Container, PageFrame, Header, DesktopNav, ProjectsDropdown and MobileMenu.
- `src/components/home/`: Hero and FloatingCard.
- `src/components/about/`: ProfileCard, AboutIntro, FocusAreas and about.css.
- `src/components/projects/`: ProjectCards, CardGrid, PageHeading, BackLink and ProjectDetails.
- `src/components/shared/`: Icons, SocialLinks and LottiePlayer.
- `src/content/`: site, home, about, experience, category and project data and types.
- `src/lib/navigation.ts`: shared active-path helper.
- `src/lib/projects.ts`: category and project lookup helpers.
- `src/styles/globals.css`: design tokens and shared, header, home and projects styles.
- `public/animations/`: Lottie animation assets.
- Cards have an empty image area until a real image path is added in categories.ts or projects.ts.
- All cards use MediaCard. Never copy card markup.

## Content rules

- Never invent project facts. Placeholder text starts with [PLACEHOLDER]

## Components

- Client components only for interactive or browser-dependent behavior; keep the rest as Server Components.
- Allowed small client components include `src/components/layout/ProjectsDropdown.tsx` for the desktop Projects menu.
- Allowed UI packages include `simple-icons` for rendering individual imported brand icons as inline SVGs.
- About page is one screen on desktop.
- About page tools live in about.focusAreas; 12 tools max, only tools I can discuss in an interview.

## Design

- Cards: floating 3D images with a label pill
