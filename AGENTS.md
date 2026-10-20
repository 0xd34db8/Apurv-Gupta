## TypeScript Linting
- **Strictly prohibit `@ts-ignore`**: The project's ESLint rules strictly enforce using `@ts-expect-error` instead of `@ts-ignore`. If you need to bypass a TypeScript error (for example, when attaching custom properties to `window`), always use `@ts-expect-error` with a description of why it is needed.

Example:
```tsx
// @ts-expect-error: window.locomotiveScroll is not typed
if (window.locomotiveScroll) window.locomotiveScroll.scrollTo("#home");
```

# Commit Message Syntax

**Standard Format:**
When generating commit messages for this repository, ALWAYS use the following plain-text format. Do NOT use markdown. Start with a lowercase commit type (e.g. `feat:`, `fix:`, `chore:`), followed by a brief description. Then, on the next lines, provide a bulleted list of specific changes using an indent and single hyphens (`- `).

Example:
```text
feat: improve package management and download UX
- Optimistic UI on Global Pkgs uninstall
- Display size of each package in global packages & the total size of all pacakges
- Show npm version sizes on the Version Manager page & Download page
```

# Commit Message Workflow

**Writing Commits to .gitmessage:**
When changes are substantial enough to warrant a commit, agents should generate the commit message and add it to the `.gitmessage` file (create if not found & add to gitignore).
- **Append, Do NOT Overwrite:** Always ADD (append) new commit messages. You must NEVER overwrite any previous text already present in `.gitmessage`.

# Git Execution Rules

- **Observational Commands Only:** Agents are strictly restricted to observation/read-only Git commands (e.g., viewing status, viewing git history/logs, diffs):
  - Allowed: `git status`, `git log`, `git diff`, `git show`, `git branch` (listing only).
- **No Mutating Git Operations Without Prior Confirmation:** NEVER execute any Git commands that modify files, branches, commits, stashes, or interact with remotes without first asking for and receiving explicit confirmation from the user (unless explicitly authorized priorly in the prompt).
  - Prohibited without prior confirmation: `git commit`, `git checkout`, `git restore`, `git reset`, `git switch`, `git branch` (creating/deleting), `git add`, `git push`, `git pull`, `git rebase`, `git merge`, `git stash`, etc.


# Design System & Layout Conventions

To maintain visual cohesion, rhythm, and responsive consistency across all sections and components, all agents must adhere to the following standards:

## 1. Section Spacing & Sizing
Every top-level `<section>` on the landing page must follow the standard responsive padding pattern:

- **Vertical Padding:** `py-12 sm:py-16 md:py-24`
  - Mobile (`< 640px`): `py-12` (48px top and bottom; ensures 96px combined gap between adjacent sections).
  - Tablet (`640px - 767px`): `sm:py-16` (64px top and bottom).
  - Desktop (`>= 768px`): `md:py-24` (96px top and bottom).
  - *Avoid:* Hardcoding non-standard top/bottom padding (e.g. `pt-30`, `py-32`) or omitting mobile padding (`lg:py-24` without mobile `py-12`).
- **Horizontal Padding:** `px-4 sm:px-6 md:px-16`
  - Mobile: `px-4` (16px gutter).
  - Tablet: `sm:px-6` (24px gutter).
  - Desktop: `md:px-16` (64px gutter).
  - *Goal:* Aligns the content margins across all sections (Hero, Experience, Skills, Works, Blogs, Philosophy, Contact) to the exact same left/right grid lines.
- **Content Max-Width:**
  - Standard sections use an inner wrapper: `<div className="max-w-7xl mx-auto relative z-10">`.
  - Secondary / showcase containers use `max-w-6xl mx-auto relative z-10`.

## 2. Section Headers
All section titles follow a uniform two-tier hierarchy:

1. **Subheading / Category Tag:**
   ```tsx
   <motion.h3
     initial={{ opacity: 0, y: 20 }}
     whileInView={{ opacity: 1, y: 0 }}
     viewport={{ once: true }}
     transition={{ duration: 0.5 }}
     className="text-xs sm:text-sm font-mono text-gray-500 uppercase mb-4 flex items-center gap-2"
   >
     / Section Name
   </motion.h3>
   ```
   - Always use `mb-4` so spacing to the main title is identical across sections.

2. **Main Title:**
   ```tsx
   <h2 className="text-4xl md:text-7xl font-bold tracking-tighter leading-none pb-4 flex items-baseline mb-8 sm:mb-20">
     <StreakBurst
       text="SectionTitle"
       className="italic text-transparent bg-clip-text bg-gradient-to-r from-gray-400 via-gray-100 to-white pb-2"
       delay={0.4}
     />
   </h2>
   ```
   - Always use `mb-8 sm:mb-20` (or `mb-8 sm:mb-12 md:mb-20`) for the space between the heading and section content.

## 3. Cards & Surfaces
Card components (e.g., Blog cards, Experience cards, Skill groups) adhere to these rules:

- **Background:**
  - Mobile: `bg-transparent` (preserves wireframe and ambient background visibility on compact screens).
  - PC / Tablet: `sm:bg-white/[0.01] sm:hover:bg-white/[0.03]`.
  - *Strictly Avoid:* Opaque solid dark backgrounds with blur (`sm:bg-[#0d1117]/60 sm:backdrop-blur-md`) and hover transparency (`group-hover:bg-transparent`).
- **Borders & Corners:**
  - `border border-white/5` with hover accent `hover:border-blue-500/30` or `hover:border-white/10`.
  - Corner radius: `rounded-2xl`.
  - Internal Padding: `p-6 sm:p-8`.
- **Transitions:**
  - `transition-all duration-500`.

## 4. Section Background Fades
When sections fade into adjacent dark backgrounds:
- Standard fade height: `h-28 md:h-40` (e.g. `className="absolute inset-x-0 bottom-0 h-28 md:h-40 pointer-events-none z-10"`).
- *Strictly Avoid:* Excessive heights like `h-52` (208px) on mobile which drown out section contents.

## 5. Wireframe Overlays
- **Standard Wireframes:** Fit within `max-w-5xl h-full` using `maskSize: "contain"`. Mobile offset: `pt-10` (never excessive offsets like `pt-35`).
- **Large Wireframes (`large = true`):** Scaled to `w-[85%] sm:w-[90%] max-w-4xl flex items-center justify-center` to prevent edge-to-edge overflow.

## 6. Mobile Touch & Scrolling
- **Horizontal Carousels:** Do NOT add `touch-pan-x` to containers with `overflow-x-auto`. In CSS, `touch-action: pan-x` explicitly disables vertical scrolling gestures starting on cards. Allow default touch action (`overflow-x-auto snap-x snap-mandatory no-scrollbar`) so users can vertically scroll past cards naturally.
