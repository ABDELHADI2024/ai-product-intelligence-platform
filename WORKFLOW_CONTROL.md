# Workflow Control

> **Purpose:** Operating rules for OpenCode sessions on this project.  
> **Applies to:** Every chat, every phase, every edit.

---

## 1. Roles

| Role | Who | Responsibilities |
|---|---|---|
| **CTO / Controller** | ChatGPT (human prompt author) | Roadmap, prioritisation, review, approves/rejects output, writes OpenCode prompts |
| **Executor** | OpenCode | Reads project memory, edits files, runs `npm run build`, reports results |
| **Project memory** | Repo markdown files | `PHASE_STATUS.md`, `DAILY_HANDOFF.md`, `WORKFLOW_CONTROL.md`, `PROJECT_MAP.md`, `HOMEPAGE_REFERENCE_SPEC.md` — survive between chats |

---

## 2. Current Scope

- v1 supports **smartphones** and **foldable smartphones only**
- No laptops, tablets, smartwatches, earbuds, AI devices, or other categories until explicitly scoped in a future phase

---

## 3. Architecture Rules

| Rule | Explanation |
|---|---|
| **Supabase is source of truth** | All product data comes from `getTopProducts()`, `getAllProducts()`, `getProductBySlug()` |
| **Fallback must work** | App must function without Supabase env vars — falls back to 12 hardcoded products |
| **Never show $0** | Use "Price N/A" when price is missing or zero |
| **Keep all routes working** | `/`, `/products`, `/products/[slug]`, `/compare`, `/smart-search`, `/assistant`, `/robots.txt`, `/sitemap.xml` |
| **Vercel deploy is final only** | No deployment until Phase 16 |
| **JSON-LD preserved** | Homepage must keep WebSite + SearchAction structured data |
| **Mobile menu functional** | Hamburger + dropdown must navigate correctly |

---

## 4. Forbidden Unless Explicitly Approved

- OpenAI / LangChain / RAG / embeddings (OpenAI path **permanently blocked** per Phase 18-M0)
- Prisma / Redis / Docker
- Authentication / authorisation / admin panels
- New product categories (laptops, tablets, etc.)
- New npm dependencies
- Modifications to `package.json`
- Modifications to `src/lib/supabase.ts`, `src/lib/types.ts`, or `src/lib/fallback-data.ts`

> **Phase 18-M0 update:** OpenAI embeddings are not approved for Witflag. The preferred future lab path is Google AI Studio / Gemini. If Gemini does not work, embeddings pause instead of falling back to OpenAI.

---

## 5. Phase Rules

1. **Do not jump phases** — complete current phase before starting next
2. **Every phase must pass `npm run build`** with zero errors before reporting done
3. **Surgical edits only** — change only what the phase requires; do not refactor unrelated code
4. **Report after each phase:**
   - Files changed
   - What changed in each file
   - Build result (errors, warnings, route count)
   - Any remaining known gaps
5. **Update `PHASE_STATUS.md` and `DAILY_HANDOFF.md`** when a phase starts/completes

---

## 6. Current Phase Flow

| Order | Phase | Description |
|---|---|---|
| Complete | 15-G1 | Final Tiny Cleanup (TopPicks Score Guard) |
| Complete | 18-M0 | Embedding Provider Strategy Update |
| Next | 16 | Final Vercel deploy |
| Next | 18-M1 | Gemini embedding lab evaluation (blocked until ready) |

---

## 7. Daily Workflow

1. **CTO starts a new ChatGPT project chat**
2. **CTO pastes `DAILY_HANDOFF.md`** into the chat as context
3. **CTO writes the OpenCode prompt** for the next task
4. **OpenCode executes** the prompt — reads files, edits code, runs build
5. **OpenCode returns** results to the chat (files changed, build output, gaps)
6. **CTO reviews** and either approves or sends back for revision
7. **At end of day / phase:** OpenCode updates `DAILY_HANDOFF.md` and `PHASE_STATUS.md` so the next chat can pick up fresh

---

## 8. Reference Files

| File | Purpose |
|---|---|
| `PROJECT_MAP.md` | System architecture, routes, data flow, component map |
| `HOMEPAGE_REFERENCE_SPEC.md` | Full written homepage UI specification |
| `PHASE_STATUS.md` | Phase tracking, build status, env vars, route map |
| `DAILY_HANDOFF.md` | Daily state, known issues, next actions |
| `WORKFLOW_CONTROL.md` | This file — operating rules for every session |
