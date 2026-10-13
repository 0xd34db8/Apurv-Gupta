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
