# Custom Cursor & Native Fallback System

## Overview
Primary cursor is a high-framerate PNG floating element. Fallback is Windows-native hardware `.cur` files.

## Failure Modes Handled
1. Hybrid Touch Devices (Surface, Yoga, touch laptops with trackpads)
2. PNG decode / network / content-blocker failure
3. DOM occlusion / watchdog timeout

## Testing Hooks
- `window.__triggerCursorFallback()`: Immediate runtime switch
- `window.__resetCursorMode()`: Resets `localStorage` and restores PNG cursor

---

# Cinematic Curtain & Preloader System

## Overview
A dual-tier introductory loading system designed to mask initial bundle execution, font hydration, and asset decodes while delivering a cinematic first impression:
1. **Primary ([Curtain.tsx](file:///A:/Work/Visual%20Studio%20Projects/Web_apps/Apurv-Gupta/src/components/ui/Curtain.tsx))**: An active, hardware-accelerated video mask curtain orchestrated with real-time buffer calculation, tabular typography, and smooth exit crossfades.
2. **Modular Embed / Standalone ([Preloader.tsx](file:///A:/Work/Visual%20Studio%20Projects/Web_apps/Apurv-Gupta/src/components/ui/Preloader.tsx))**: A media-agnostic preloader supporting offline HTML5 video assets and remote YouTube embeds via the iframe `postMessage` API.

## Design Aesthetics & Choreography
- **Color & Atmosphere**: Absolute pitch black (`bg-black`, `z-[100]`) eliminating light bleeds and layout flickers during hydration.
- **Tabular Numerical Counter**: High-contrast, large-format percentage indicator (`text-6xl font-light tracking-tighter tabular-nums`) preventing character-width jitter as the buffer updates.
- **Micro Hairline Gauge**: 1px progress track (`bg-white/10`) with dynamic white fill expanding proportionally to media buffer state.
- **Video Mask Projection**: Centered responsive viewport framing (`w-[80%] md:w-[50%]`) revealing the brand logo animation (`/LOGO.webm`, `/LOGO.mp4`, `/LOGO.mov`).
- **Pill Skip Affordance**: Frosted-glass "Skip Intro" control (`bg-black/40 backdrop-blur-md border border-white/10 uppercase tracking-[0.3em]`) revealed after a 500ms delay for rapid user bypass.

## Multi-Format Video Pipeline
To ensure instantaneous video decoding and cross-platform compatibility, assets are served in a cascading format hierarchy:
1. **WebM (`/LOGO.webm`)**: High-efficiency VP9/AV1 codec with hardware acceleration on modern Chromium and Gecko engines.
2. **MP4 (`/LOGO.mp4`)**: H.264 video baseline for universal desktop and mobile browser support.
3. **MOV (`/LOGO.mov`)**: Apple QuickTime format fallback.

All video elements enforce `autoPlay`, `muted`, `playsInline`, `webkit-playsinline="true"`, and `preload="auto"` to guarantee frictionless autoplay without user gesture requirements across mobile WebKit (iOS Safari) and desktop browsers.

## Buffer Tracking & Lifecycle State Machine
1. **Buffer Measurement**:
   - Subscribes to the HTMLMediaElement `progress` event.
   - Calculates buffered duration: `bufferedEnd = video.buffered.end(video.buffered.length - 1)`.
   - Computes completion percentage: `Math.round((bufferedEnd / video.duration) * 100)`.
   - Enforces monotonic progress (`Math.max(prev, actualPercent)`) to prevent visual regression.
2. **Ready Trigger**:
   - Triggers when `video.readyState >= 3` (`HAVE_FUTURE_DATA`) or `canplaythrough` fires.
   - Forces progress to 100%, waits 400ms, then initiates crossfade into video playback.
3. **Completion & Lift**:
   - On video `ended` event (or skip trigger), curtain unmounts (`isVisible = false`) and invokes `onVideoEnd()`.

## Failure Modes & Self-Healing Resiliency
1. **Autoplay Policy Blocking**:
   - Browsers may reject programmatic media playback. The `video.play()` promise is captured; if rejected, the error is logged and the curtain immediately lifts via `handleEnd()` rather than blocking user interaction.
2. **Buffer Stalling & Slow Connections (6s Failsafe)**:
   - A hard 6000ms timeout watchdog automatically triggers the entrance sequence if network constraints prevent the video buffer from completing.
3. **Infinite Buffer Deadlock Recovery (3s Watchdog)**:
   - If progress reaches 100% but playback does not start within 3000ms, the system attempts a single page reload guarded by `localStorage.getItem("videoRefreshedOnce")` to resolve GPU/media decoder locks without infinite loops.
4. **User Escape Valve**:
   - The "Skip Intro" button provides an immediate exit hatch, bypassing all media timers and directly lifting the veil.

## Routing, Deep-Linking & Application Orchestration
- **Landing-Only Gate**: The intro curtain executes strictly on the root landing page (`/` or `/index.html#home`).
- **Instant Deep-Link Bypass**: Direct access to blog posts (`/blog/:id`) or sub-sections (`#works`, `#blogs`, etc.) automatically disables the curtain (`showIntro = false`, `introFinished = true`) for immediate content accessibility.
- **Scroll Lock Coordination**: `document.body.style.overflow` is clamped to `"hidden"` while the curtain is active, restoring cleanly upon unmount.
- **Choreographed Hero Synchronization**: Hero section entrance animations (`startAnimation={!isLandingPage || introFinished}`) remain suspended until the curtain fully lifts, ensuring spring physics, text shimmers, and ambient glow blooms render in sync with user visibility.

## Modular Embed Preloader ([Preloader.tsx](file:///A:/Work/Visual%20Studio%20Projects/Web_apps/Apurv-Gupta/src/components/ui/Preloader.tsx))
- **Remote Embeds**: Handles YouTube embeds with `enablejsapi=1` and listens for `window.message` events (`video-ended` / `playerState === 0`).
- **Timeout Fallback**: Configurable timeout (default 8000ms) with an 800ms ease-out fade transition.


---

# Dynamic Markdown Blogging & Automated SEO Architecture

## Overview
A zero-CMS, file-based content architecture that leverages Vite glob imports, frontmatter parsing, reactive client-side routing, and static XML sitemap generation to deliver high-performance editorial publishing with full SEO indexing.

## File-Based Content Pipeline
- **Raw Markdown Storage**: Articles reside in `src/content/blogs/*.md`.
- **Vite Glob Ingestion**: Consumed via dynamic raw globbing (`import.meta.glob("../../content/blogs/*.md", { query: "?raw", import: "default" })`), eliminating manual registry files or hardcoded article arrays.
- **Frontmatter Parsing**: Uses `front-matter` (`fm`) to extract YAML metadata headers:
  - `title`: Article headline
  - `description`: Meta summary
  - `date`: Publication timestamp (used for automatic descending chronological ordering)
  - `tags`: Classification categories
  - `slug`: Derived directly from the file basename (`path.split("/").pop().replace(/\.md$/, "")`).

## Presentation & Reader Experience
1. **Showcase Carousel & Grid ([Blogs.tsx](file:///A:/Work/Visual%20Studio%20Projects/Web_apps/Apurv-Gupta/src/components/sections/Blogs.tsx))**:
   - **Responsive Presentation**: Renders a touch-friendly horizontal swipe carousel with snap points on mobile devices (`flex overflow-x-auto snap-x snap-mandatory no-scrollbar`), transforming into a multi-column responsive grid on tablet and desktop (`md:grid md:grid-cols-2 lg:grid-cols-3`).
   - **Visual Accents**: Glassmorphic cards (`bg-transparent sm:bg-white/[0.01] sm:hover:bg-white/[0.03] border border-white/5 hover:border-blue-500/30`) with animated blue sheen gradients, monospace date badges, category pill tags, and external link affordances (`↗`).
   - **Multi-Tab Opening**: Blog cards enforce `target="_blank" rel="noopener noreferrer"`, allowing readers to open articles in separate tabs without losing their scroll position on the landing page.
2. **Dedicated Reader Engine ([BlogPost.tsx](file:///A:/Work/Visual%20Studio%20Projects/Web_apps/Apurv-Gupta/src/components/sections/BlogPost.tsx))**:
   - **Route Pattern**: Mounted on `/blog/:slug`.
   - **Typography Engine**: Formatted with `react-markdown` and `@tailwindcss/typography` (`prose prose-invert prose-lg prose-blue max-w-none`), providing rich code block styling, responsive typography, and high-contrast links.
   - **Async Skeleton State**: Displays pulsing layout skeletons while markdown content is parsed, preventing content pop-in and layout shift.

## Dynamic Head Metadata & Structured SEO Schema
When a blog post is viewed, [`BlogPost.tsx`](file:///A:/Work/Visual%20Studio%20Projects/Web_apps/Apurv-Gupta/src/components/sections/BlogPost.tsx) programmatically enhances head metadata for search engine indexing and social sharing:
1. **Title & Open Graph Tags**:
   - Sets `document.title` to `${attributes.title} | Apurv Gupta`.
   - Injects/updates `meta[name="description"]`, `meta[property="og:description"]`, `meta[property="og:title"]`, and `meta[property="og:type="article"]`.
2. **JSON-LD Structured Data**:
   - Injects a dynamic `script#seo-schema` element containing a `BlogPosting` schema.
   - Supplies `headline`, `description`, ISO `datePublished`, and `author` payload (`@type: "Person", name: "Apurv Gupta"`).
3. **Lifecycle Cleanup**:
   - The unmount cleanup hook purges dynamically appended meta/script nodes and restores the canonical document title to `"Apurv Gupta"`.

## Static Build-Time Sitemap Generation ([scripts/generate-sitemap.js](file:///A:/Work/Visual%20Studio%20Projects/Web_apps/Apurv-Gupta/scripts/generate-sitemap.js))
- Executed automatically as part of the build pipeline (`npm run build`: `node scripts/generate-sitemap.js && tsc -b && vite build`).
- Synchronously scans `src/content/blogs/`, extracts slugs from all `.md` files, and generates `public/sitemap.xml`.
- Emits standard `<urlset>` XML referencing canonical URLs (`https://apurv-gupta.vercel.app/blog/{slug}`) with monthly change frequency and 0.8 search engine indexing priority.
