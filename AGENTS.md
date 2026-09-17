# Agent Rules

## TypeScript Linting
- **Strictly prohibit `@ts-ignore`**: The project's ESLint rules strictly enforce using `@ts-expect-error` instead of `@ts-ignore`. If you need to bypass a TypeScript error (for example, when attaching custom properties to `window`), always use `@ts-expect-error` with a description of why it is needed.

Example:
```tsx
// @ts-expect-error: window.locomotiveScroll is not typed
if (window.locomotiveScroll) window.locomotiveScroll.scrollTo("#home");
```
