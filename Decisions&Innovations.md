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
