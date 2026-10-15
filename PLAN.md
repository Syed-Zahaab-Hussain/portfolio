# Portfolio Upgrade Plan

Created: 2026-11-04

Purpose: Turn the existing portfolio into a content-managed developer portfolio with an owner-only dashboard and a grounded AI assistant. Keep Vercel hosting for now and preserve a practical path to AWS later.

## Tracking and scope

- `[ ]` means remaining; `[x]` means completed and verified.
- Mark a task complete only when its acceptance criteria have been met. Record the verification performed and any limitations.
- Keep implementation, automated verification, browser verification, and production verification distinct.
- This file authorizes planning only. Implement phases after the user authorizes the relevant work.
- Do not stage, commit, push, provision services, incur charges, or change production data without explicit user authorization.
- Preserve unrelated changes. Update this checklist as authorized implementation progresses.
- Define database changes in `prisma/schema.prisma` and let Prisma generate migration files using `prisma migrate dev`. Never hand-write migration files or add custom SQL triggers to migrations. Do not apply migrations without authorization for the target environment.
- Development migrations accept a descriptive name: `bun run db:migrate:dev --name <change-name>`. Prisma config loads `.env` using dotenv and requires `DIRECT_URL` for the Neon development branch; application queries use pooled `DATABASE_URL`.

## Mandatory sensitive-information rules

These rules apply throughout planning, implementation, testing, troubleshooting, and deployment:

- **Do not actively open, print, search, copy, or edit private `.env` files or expose their values.** Normal application, package-manager, and CLI loading of environment configuration is permitted. Work directly in the main repository; a separate source copy is not required. `.env.example` may be accessed and maintained with placeholders only.
- **Never access other sensitive files or information**, including API keys, passwords, tokens, database connection strings, private keys, credential stores, cloud credentials, session cookies, authentication headers, database dumps, private messages, or personal data that has not been explicitly approved for publication.
- Exclude sensitive paths from searches, indexing, exports, AI context, screenshots, logs, and generated artifacts. Do not run broad commands that could expose their contents, including environment-variable dumps.
- Never ask the user to paste secrets into chat. The user must configure secrets directly in their local environment or provider dashboard. Document variable names and placeholder values only in ordinary documentation.
- Do not inspect provider dashboards, browser storage, process environments, or logs to recover secrets. If verification depends on sensitive access, explain the limitation and provide a user-run check that reports only a safe success/failure result.
- Approved application code may consume user-configured secrets at runtime through environment variables. This does not authorize the assistant to inspect their values, and secrets must never reach client bundles or logs.
- Never ingest sensitive information into the RAG knowledge base or send it to OpenRouter, an embedding provider, or another external service.
- If sensitive information appears accidentally, stop that inspection, do not repeat or save the information, and notify the user without quoting it.

## Architecture and decisions

| Area | Direction | Status |
| --- | --- | --- |
| Framework | Upgrade existing App Router application to latest stable Next.js 16.x; align React and tooling | Agreed direction |
| Hosting | Vercel initially; document a later AWS move | Agreed |
| Database | Neon PostgreSQL | Agreed |
| ORM and schema migrations | Prisma | Agreed |
| Authentication | Better Auth with Prisma adapter; owner-only access | Implemented in main repository; live Neon verification pending |
| Login security | Email/password and password reset | Implemented; live flow verification pending |
| Media | Cloudinary behind a small upload/delete/storage interface | Tentative; confirm |
| AI model access | OpenRouter for answer generation | Proposed provider; confirm model and budget |
| Retrieval | Published content only; Neon pgvector if corpus size warrants it | Agreed approach; implementation to assess |
| Agent actions | Outside initial scope | Deferred |
| Articles/blog | Decide whether needed in initial release | Open |

Cloudinary uses its own API rather than an S3-compatible endpoint. Future migration to S3 requires transferring assets and updating references. Moving application hosting to AWS does not require moving Neon or Cloudinary simultaneously.

### Development database scope

- The database name is `portfolio`. It serves the entire application during development, including authentication, portfolio content, enquiries, and future retrieval data; it is not an authentication-only test database.
- Neon is the selected database host for both development and production, using separate branches/databases. The local Docker database previously renamed to `portfolio` is not the selected development backend.
- Prisma and Better Auth are implemented directly in the main repository; normal environment loading by application/tooling is allowed, without actively inspecting private `.env` files or their values.
- Use separate development and production databases or Neon branches. Automated tests that reset or delete data must use a disposable database or branch, never the persistent development database.
- No Neon environment has been provisioned or selected by the assistant. The user supplies configuration privately, without the assistant inspecting `.env` files or credentials.

## Phase 0: Confirm scope and content inputs

- [x] Confirm Better Auth and the proposed login/recovery methods.
- [ ] Confirm Cloudinary for images and decide how CV documents will be stored and delivered.
- [ ] Confirm OpenRouter, choose a suitable generation model, and agree usage/spending limits.
- [ ] Choose an embedding provider/model separately if vector retrieval is needed; verify current availability and pricing during implementation.
- [ ] Decide whether articles belong in the first release.
- [ ] Select 3–5 showcase projects and confirm what can be published, especially for private/client work.
- [ ] Obtain approved biography, education, experience, availability, CV, certificate details, project descriptions, and media.
- [ ] Identify development, preview, and production environments; the user configures their credentials privately.

Acceptance: Scope and outstanding choices are recorded; public content is approved without inventing experience, credentials, results, or completion claims.

## Phase 1: Upgrade Next.js independently

- [x] Inspect relevant source/configuration and existing user changes without accessing sensitive files.
- [x] Upgrade to the latest stable Next.js 16.x and compatible React, types, and ESLint tooling; avoid prereleases.
- [ ] Check the actual local and Vercel Node.js runtimes against supported requirements.
- [x] Review async request APIs, image configuration/defaults, lint configuration, and navigation behaviour.
- [ ] Adopt `proxy.ts` if request interception is needed; enforce authorization separately at server entry points.
- [ ] Keep Cache Components adoption separate from the initial version upgrade; assess it when introducing database-backed pages.
- [x] Run lint, type checking, and production build; fix upgrade regressions.
- [ ] Browser-check navigation, tabs, images, animations, responsive layouts, and contact form UI without sending unsolicited messages.

Acceptance: Existing behaviour is preserved, required checks pass, and browser limitations are documented before new features are introduced.

## Phase 2: Database and application foundation

- [x] Add Prisma with a compatible PostgreSQL driver/connection strategy for Neon and Vercel.
- [ ] Define models for profile/settings, projects, skills, experience, education, certificates, media, CV metadata, and enquiries.
- [x] Add authentication models through the chosen auth integration.
- [ ] Model stable slugs, draft/published state, ordering, featured projects, timestamps, and media relationships.
- [ ] Design enquiry retention and deletion behaviour; keep private enquiries separate from public content.
- [ ] Let Prisma generate migrations from schema changes; review the generated output and apply only to the user-authorized environment.
- [ ] Import approved existing content through an explicit, non-destructive process.
- [ ] Document configuration variable names and setup steps without reading or writing `.env*` files.

Acceptance: The schema and migrations support approved features, development data is isolated, and public queries expose only intended published records.

## Phase 3: Owner authentication and authorization

- [ ] Integrate Better Auth with Next.js, Prisma, and Neon after confirmation.
- [ ] Provide a controlled process for the user to establish the single owner account; disable public and implicit signup paths.
- [ ] Verify login, logout, session expiry, and password reset with email and password.
- [ ] Enforce owner authorization on protected pages, Route Handlers, Server Actions, and upload-signing endpoints.
- [ ] Configure secure session cookies, trusted origins, and appropriate authentication rate limiting.
- [ ] Ensure protected responses cannot be cached publicly.
- [ ] Verify unauthenticated and authenticated-but-unauthorized requests cannot read or mutate admin data.
- [ ] Verify sign-in, sign-out, recovery, and session behaviour using user-approved test accounts without inspecting credentials or session values.

Acceptance: Only the designated owner can administer content. Hiding UI or redirecting a page is never the sole authorization check.

## Phase 4: Media and admin dashboard

### Phase 4A: Redesign the admin workspace before adding content features

The dashboard currently links to Projects, and the list, editor, and preview each handle their own navigation. Make the existing draft-to-publish flow the centerpiece of a shared owner workspace. Complete this pass before adding media uploads or new content sections.

#### Design and shared layout

- [ ] Sketch the Overview, Projects list, and project editor at desktop and phone widths using the fields and states already in the app. Review the sketches before implementation. Use [Anthropic’s Frontend Design guide](https://github.com/anthropics/claude-code/blob/main/plugins/frontend-design/skills/frontend-design/SKILL.md) as a reference for visual hierarchy, typography, and purposeful motion.
- [ ] Define shared semantic CSS tokens for canvas (`#101116`), surface (`#181A22`), border (`#30323D`), text (`#F4F4F6`), muted text (`#A4A7B4`), and violet accent (`#A78BFA`). Verify contrast for text, buttons, focus indicators, and statuses. Use a label alongside every status color.
- [ ] Use the existing Inter typography, left-aligned headings, and a consistent spacing scale. Give the admin solid surfaces and subtle dividers. Reserve gradients and more expressive motion for the public portfolio.
- [ ] Build a shared protected layout for the admin home, project list, editor, and private preview. Add a desktop sidebar with **Overview** and **Projects**, plus **View portfolio** and **Sign out** at the bottom. Highlight the current section, including on nested project routes.
- [ ] Use a compact top bar and menu on mobile. Give the menu keyboard focus management and Escape dismissal, and close it after navigation. Show a breadcrumb on nested routes.
- [ ] Keep login and password reset in their standalone auth layout and align their colors and controls with the new tokens. Keep server pages responsible for data loading and authorization. Use client components for interactive pieces such as the mobile menu and form feedback. Retain independent owner checks on protected data reads and mutations.

#### Overview and Projects

- [ ] Make **Continue editing** the primary section on Overview. Show recent drafts ordered by last update, with title, timestamp, and a direct editor link. Provide a **New project** action and a link to all projects. When there are no drafts, give the owner a clear way to start one.
- [ ] Present Projects as a compact list with title, status, last updated, and edit action. Let rows stack on mobile without horizontal scrolling. Show a **New project** action and a useful empty state. Keep navigation limited to the sections that exist.

#### Editor and private preview

- [ ] Group title, summary, description, and technologies under the project content. Group slug, demo URL, and source URL separately. Explain auto-generated slugs and why the slug becomes read-only after first publication.
- [ ] Make the workflow explicit. A new project starts with **Save draft** and requires only a title. After the first save, offer **Preview** and **Publish**. For published projects, label the save action **Save changes** and expose **Unpublish** separately. Make it clear that preview shows the last saved version and that saving changes to a published project updates the live site.
- [ ] Show the current status beside the title. On desktop, keep save and publish controls easy to reach as the editor grows. On phones, ensure controls fit without covering fields or validation messages.
- [ ] Return field-specific validation and recoverable save errors inline, preserve entered values, and show pending and success states. Before publishing, explain any missing required fields. Confirm unpublishing with copy that explains its effect on the public page.
- [ ] Give the preview a clearly labeled private header and a **Back to editor** link. Reuse the public project presentation inside the preview and keep the owner check in place.
- [ ] Handle slug collisions without a generic error and preserve the slug lock if edits and publishing happen concurrently. Verify those cases alongside the ordinary save flow.

#### Review and acceptance

- [ ] Review the Overview, Projects list, editor, auth screens, and preview at phone and desktop widths. Check keyboard navigation, focus visibility, reduced-motion behavior, long project titles, and the empty, loading, and error states.
- [ ] On the development app, verify title-only draft creation, edits, private preview, publish, public card and detail visibility, unpublish, and sign-out. Check that signed-out and unauthorized requests cannot read drafts or invoke project mutations. Run lint, TypeScript, and a production build.

Acceptance for Phase 4A. The owner can go from Overview to a draft, understand its saved and published states, and manage it on desktop or mobile. The redesign uses the existing schema and auth flow. Media, additional content sections, and the public visual refresh follow separately.

### Phase 4B: Media and additional content management

- [ ] Integrate the confirmed storage provider through a small interface for upload, delete, and delivery metadata.
- [ ] Store provider identifiers, resource types, dimensions, alt text, and delivery references in PostgreSQL.
- [ ] Validate file types and sizes; authorize signed uploads and keep provider secrets server-side.
- [ ] Provide owner interfaces to manage profile, projects, skills, experience, education, certificates, CV, and media.
- [ ] Support draft editing, authenticated preview, publishing/unpublishing, ordering, and featured-project selection.
- [ ] Handle media replacement and deletion without breaking referenced published content; require explicit confirmation for destructive dashboard actions.
- [ ] Add loading, empty, success, validation, and failure states.
- [ ] Refresh public content caches when content is published, updated, or unpublished.

Acceptance: The owner can maintain portfolio content without editing source files; drafts and previews remain private, and published changes appear correctly.

## Phase 5: Public content and portfolio experience

After the admin review, apply the shared visual palette to the public site in a separate pass.

- [ ] Apply the shared canvas, typography, and violet accent to the navbar, hero, project cards, project details, contact section, and footer. Keep teal as an occasional public accent and reduce competing gradients.
- [ ] Align public card typography, spacing, and actions across legacy and database-backed projects. Use subtle motion to direct attention to content and honor reduced-motion preferences.
- [ ] Rewrite the hero/About around current, approved experience and availability; remove outdated or unsupported claims.
- [ ] Group skills by area and distinguish practical experience from current learning.
- [ ] Replace stock project and certificate imagery with approved assets.
- [ ] Add project detail pages covering the problem, contribution, features, technical decisions, challenges, status, and screenshots.
- [ ] Provide working demo/source links where available and accurate explanations for private repositories or unavailable demos.
- [ ] Add experience, education, verifiable certificate links, and a working CV download.
- [ ] Derive relevant counts from published records; remove unsupported statistics.
- [ ] Fix or remove inactive Details, CV, share, and other controls.
- [ ] Add per-page metadata, canonical URLs, social previews, sitemap entries, and structured data where appropriate.
- [ ] Review mobile layouts, keyboard navigation, labels, contrast, reduced-motion preferences, and image loading.
- [ ] Add privacy-conscious traffic/conversion analytics only after choosing a provider and reviewing data collection.
- [ ] Add articles only if approved; defer filtering until enough content makes it useful.

Acceptance: Visitors can quickly understand the developer's capabilities, inspect real work, access the CV, and make contact without encountering placeholder content or dead controls.

## Phase 6: Enquiry management

- [ ] Persist validated contact submissions privately in PostgreSQL and retain email notifications.
- [ ] Track unread/read/resolved status in the admin dashboard.
- [ ] Define safe behaviour for database success with email failure so accepted enquiries are not lost or misleadingly rejected.
- [ ] Retain spam protection and introduce deployment-appropriate rate limiting rather than relying solely on process memory.
- [ ] Set retention/deletion rules and avoid logging enquiry bodies or personal contact details.
- [ ] Verify the complete flow with explicit authorization to submit test enquiries and send test email.

Acceptance: Accepted enquiries are stored reliably, only the owner can access them, and notification failures are handled clearly.

## Phase 7: RAG portfolio assistant

- [ ] Add an accessible “Ask about my work” interface with streaming responses, suggested questions, and error states.
- [ ] Integrate OpenRouter on the server using the selected model; keep model choice configurable.
- [ ] Build a knowledge source from approved published biography, skills, experience, CV content, projects, and optional articles.
- [ ] Assess corpus size: use curated context if sufficient, or chunk/embed content and retrieve with Neon pgvector.
- [ ] Keep retrieval queries in a dedicated layer; use Prisma for application records and appropriate parameterized vector queries as needed.
- [ ] Maintain source IDs/URLs, content versions, and indexing status; refresh on publication changes and remove unpublished/deleted content from retrieval promptly.
- [ ] Add admin indexing status, retry/reindex controls, and safe failure handling.
- [ ] Ground answers in retrieved content, link supporting sources, and acknowledge missing information.
- [ ] Support project/skill questions and optional job-description matching that identifies evidence and gaps without inventing qualifications.
- [ ] Treat visitor input and retrieved text as untrusted data; prohibit arbitrary SQL, private-data retrieval, admin mutations, and action-taking tools.
- [ ] Apply input/context/output limits, rate limits, timeouts, concurrency controls, and a practical spending cap/kill switch.
- [ ] Decide chat retention and disclose external AI processing; default to no persistent conversation storage unless explicitly approved.
- [ ] Evaluate representative questions, unsupported claims, stale/unpublished content, prompt injection, irrelevant questions, provider outages, latency, and cost.

Acceptance: Answers are useful and traceable to current public content; unsupported questions receive an honest limitation, private data remains inaccessible, and the assistant can be disabled without affecting the portfolio.

## Phase 8: Verification, Vercel deployment, and AWS readiness

- [ ] Run appropriate lint, type, build, and meaningful integration checks for implemented behaviour.
- [ ] Verify public/admin workflows in a browser at mobile and desktop sizes.
- [ ] Record automated, browser, and production evidence separately, including unverified flows.
- [ ] Document Vercel deployment settings, user-managed configuration names, build steps, and production migration procedure.
- [ ] Ensure preview deployments do not mutate production content or consume production AI budgets unintentionally.
- [ ] Prepare rollback and database/media backup-and-restore procedures without accessing secrets or private backups.
- [ ] Deploy only with explicit user authorization and record safe post-deployment checks.
- [ ] Document an AWS hosting path, including runtime packaging, HTTPS, networking, background indexing, email, caching, observability, and operational costs.
- [ ] Document optional later migration from Neon to PostgreSQL on AWS and Cloudinary to S3/CloudFront, including data/asset transfer and reference updates.

Acceptance: The authorized release works on Vercel with documented operational steps. AWS remains a migration plan until separately authorized and verified.

## Deferred work

- Action-taking agents, autonomous communication, and scheduling integrations.
- Public visitor accounts or multi-user administration.
- Testimonials without genuine approved source material.
- AWS provisioning, production database migration, and S3 asset migration.

## Verification log

Record date, completed task, evidence, and remaining limitations here during implementation. Do not include secrets, private data, or raw sensitive logs.

- 2026-11-04: Upgraded Next.js to 16.4.5 in source and lockfile, with React 19.3.1 and matching lint tooling. In an isolated copy without `.env*` files, ESLint, TypeScript, and production build passed; `/`, `/og`, `/robots.txt`, and `/sitemap.xml` returned HTTP 200. Open Graph now uses the Node.js runtime. Browser preview timed out, Vercel runtime and production remain unchecked, and workspace dependencies still need installation. No email was sent.
- 2026-11-04: Prepared an incomplete Better Auth/Prisma prototype in the isolated `portfolio-auth` work directory. Prisma client generation, targeted lint, type checking, and production build passed without real credentials. No migration or account was created. Database-backed authentication tests and an authorization issue involving sessions created before two-factor enrollment remain unresolved; the prototype has not been integrated into the application. Local Docker was unavailable.
- 2026-11-04 (supersedes the prototype status above): Authentication code and dependencies are now integrated in the main repository. The user clarified that normal environment loading is permitted and selected Neon for development as well as production. Added session-version triggers and a database-backed owner guard; two regression tests execute the SQL migrations in in-memory PostgreSQL and reject pre-enrollment, outdated, expired, and non-owner sessions. Main-repository type checking and production build passed. Neon configuration is not yet supplied, so live migrations, owner creation, email delivery, MFA/recovery, and browser acceptance remain pending. Setup instructions are in `docs/authentication.md`; no deployment or commit was made.
- 2026-11-04 (migration workflow correction): Removed both migration SQL files and the manually added migration lockfile. Future migrations must be generated by Prisma from schema changes. Removed the regression test dependent on those SQL files and its in-memory database dependency. The session-version mechanism must be implemented at the application level and integration-tested before owner setup; default version-zero sessions are denied dashboard access. Earlier SQL regression results are historical, not evidence for the current implementation. No database changes were applied.
- 2026-11-04: Replaced interactive owner creation with an environment-configured Prisma seed calling a seed-only Better Auth signup instance; public signup remains disabled. Admin routes use server page components with separate client forms. Seed and sign-in flows await Neon configuration, Prisma-generated migrations, and database-backed verification; MFA session versioning remains unfinished and dashboard access remains blocked by default.
- 2026-11-04: Seed now creates its own Prisma client using DIRECT_URL and injects it into the seed-only Better Auth instance, with safe validation and stage-specific failure messages. Type checking and focused lint passed. The seed was not executed; the cause of the user's earlier failure is not yet confirmed.
- 2026-11-04: Refreshed the authentication layout, login controls, and recovery-code presentation. Type checking, targeted lint, and the existing policy test passed. Browser/mobile visual verification and database-backed authentication tests remain outstanding. MFA session-version invalidation is still unimplemented; the existing fail-closed guard remains in place.
- 2026-11-07: User chose owner email/password authentication. Removed MFA plugin, setup and challenge flow, and session-version checks. Retained MFA-related database schema pending separate cleanup. Live authentication verification remains outstanding.
- 2026-11-07: Added the project schema and initial admin draft/editor, owner-only preview, published detail route, and public project cards. Prisma client generation, schema validation, targeted lint, type checking, and an initial build passed. The project migration has not been generated or applied. Live create/edit/publish/unpublish and authorization checks remain unverified. Improve inline validation and collision/concurrency handling before calling the project workflow complete.
- 2026-11-07: The Prisma-generated `add_projects` migration exists. Browser testing against the running development app verified owner login, saving a title-only draft, its private preview, draft public 404, editing and publishing, the public detail page and portfolio card, unpublishing, public 404 afterward, and signed-out preview redirect. A clearly labelled test project remains as a draft. Validation error presentation and slug-collision concurrency handling still need work.
