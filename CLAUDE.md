# Frontend Engineering & Design Standards

## Mission

Build frontend software that feels intentionally designed and professionally engineered.

The goal is NOT to produce the most code, use the newest framework, or make every interface look like a trendy AI/SaaS landing page.

The goal is to produce a frontend that is:

- visually strong
- appropriate for its brand and audience
- fast
- accessible
- responsive
- maintainable
- secure
- SEO-friendly when applicable
- tested appropriately
- easy for another developer to understand
- production-ready

The implementation should feel human-designed and human-maintained.

---

# 1. TECHNOLOGY IS A TOOL, NOT A RELIGION

Do not assume that React, Next.js, Vue, Angular, Astro, Svelte, Solid, Nuxt, Remix, vanilla HTML/CSS/JS, or any other framework is automatically the correct choice.

Choose technology based on the actual project.

Consider:

- project requirements
- interactivity
- rendering model
- SEO requirements
- content structure
- expected traffic
- team familiarity
- existing codebase
- hosting/deployment
- integrations
- accessibility
- performance
- maintenance burden
- ecosystem maturity
- long-term stability

Use an existing stack when the project already has one unless there is a compelling reason to change it.

Do not rewrite a project just because a different framework is fashionable.

---

# 2. DEFAULT TECHNOLOGY DECISION PROCESS

Before starting a new frontend project, determine:

1. Is this primarily static/content-driven?
2. Does it require significant client-side interactivity?
3. Does it need server rendering?
4. Does it need authentication?
5. Does it need complex application state?
6. Does it need a backend/API?
7. Is SEO important?
8. Is the project likely to grow into a larger application?
9. Are there existing platform/framework constraints?
10. What is the simplest architecture that satisfies the requirements?

Possible choices include, but are not limited to:

### Static/content-heavy websites

Consider:

- Astro
- plain HTML/CSS/JS
- Eleventy
- another appropriate static-site tool

Do not add React merely for a navigation menu or a few interactive elements.

### Interactive applications

Consider:

- React
- Vue
- Svelte
- Angular
- Solid
- other mature frameworks appropriate to the project

### Full-stack applications

Consider:

- Next.js
- Nuxt
- SvelteKit
- Remix / React Router frameworks
- Angular-based full-stack architecture
- another appropriate full-stack solution

The framework is less important than choosing the correct architecture.

---

# 3. FRAMEWORK SELECTION RULE

When multiple technologies would work, prefer the one that gives the project:

1. the smallest reasonable complexity
2. strong performance
3. good developer experience
4. appropriate accessibility support
5. good SEO support when needed
6. maintainability
7. reliable deployment
8. a healthy ecosystem
9. a reasonable amount of client-side JavaScript

Do not choose technology because:

- it is new
- it is popular on social media
- an AI model recommended it
- it has the most GitHub stars
- it has the most animations
- it looks impressive on a résumé

Choose based on the product.

---

# 4. DO NOT OVER-ENGINEER

The simplest correct solution is usually preferable.

Do not introduce:

- a state-management library for a tiny amount of local state
- a database for data that can remain static
- an API layer that adds no value
- a component library for three buttons
- a complex animation library for a CSS transition
- a CMS when content rarely changes
- a design system with hundreds of tokens for a five-page website
- microservices for a small application
- unnecessary abstractions

However, do not avoid useful architecture merely to keep the code short.

The goal is appropriate complexity.

---

# 5. EXISTING PROJECTS

When entering an existing codebase:

1. Inspect the architecture first.
2. Read the package configuration.
3. Identify the framework and rendering model.
4. Inspect existing components.
5. Inspect styling conventions.
6. Inspect state/data-fetching patterns.
7. Inspect testing conventions.
8. Identify the project's design system.
9. Understand important backend/API boundaries.
10. Follow existing conventions unless they are clearly harmful.

Do not immediately replace existing architecture.

Do not introduce a competing pattern when the project already has a good one.

---

# 6. DESIGN BEFORE CODE

Do not start by generating JSX/templates/components immediately.

First think through:

- audience
- purpose
- hierarchy
- content
- interaction
- composition
- responsive behavior
- visual identity
- primary conversion/action
- edge cases

Ask:

> What should the user notice first?

> What should the user do next?

> What can be removed?

> What makes this design appropriate for this specific brand?

Then implement.

---

# 7. DESIGN SHOULD BE BRAND-SPECIFIC

Do not make every project look the same.

A restaurant, law firm, nightclub, hotel, construction company, SaaS product, portfolio, gym, and luxury brand should NOT all receive the same visual treatment.

Before designing, identify:

- brand personality
- audience
- industry
- tone
- competitive environment
- content type
- desired conversion
- photography style
- typography direction
- color system

Reuse engineering patterns.

Do not reuse a visual identity blindly.

---

# 8. ANTI-AI-SLOP DESIGN

Avoid generic AI-generated design patterns unless the project genuinely calls for them.

Be especially suspicious of:

- purple/blue gradients
- gradient text everywhere
- giant rounded cards
- glassmorphism everywhere
- cards inside cards
- excessive shadows
- excessive pills
- excessive badges
- meaningless statistics
- fake testimonials
- fake logos
- generic "trusted by" sections
- enormous hero sections containing very little information
- identical three-card grids repeated throughout the page
- excessive centered text
- decorative blobs with no purpose
- random floating UI
- excessive icon usage
- unnecessary emoji
- excessive animations
- every element fading in
- generic marketing phrases
- interchangeable SaaS layouts

Do not add visual elements simply because AI-generated websites frequently use them.

---

# 9. VISUAL HIERARCHY

Every page and section needs hierarchy.

Use:

- typography
- scale
- spacing
- contrast
- alignment
- composition
- imagery
- color

intentionally.

Do not make every element visually loud.

If everything is emphasized, nothing is emphasized.

The primary action should be clear without making every other element compete with it.

---

# 10. COMPOSITION

Do not automatically create:

```text
centered container
headline
paragraph
button
three cards
three cards
three cards
CTA
footer
```

That is a pattern, not a design.

Consider:

- asymmetric layouts
- editorial composition
- strong alignment
- controlled negative space
- overlapping elements
- large visual treatments
- horizontal layouts
- intentional cropping
- varied section density
- full-width moments
- unexpected but usable composition

Use these when they improve the design.

Do not create asymmetry purely to appear creative.

---

# 11. TYPOGRAPHY

Typography is a primary design tool.

Choose fonts appropriate to the brand.

Prefer a small, deliberate type system.

Rules:

- readable body text
- intentional heading hierarchy
- controlled line length
- consistent weights
- limited font families
- deliberate letter spacing
- deliberate uppercase usage
- responsive typography

Do not make every heading enormous.

Do not make everything bold.

Do not use a decorative font for body copy.

Do not add five font families just because they look interesting.

If the project already has a typography system, preserve it.

---

# 12. COLOR

Create a coherent color system.

Prefer semantic tokens where appropriate:

- background
- foreground
- muted
- border
- primary
- primary-foreground
- secondary
- accent
- destructive
- success
- warning

Do not create random colors component-by-component.

Do not bypass the design system with arbitrary hex values unless there is a legitimate reason.

A restrained palette is usually stronger than a palette containing every color.

---

# 13. SPACING

Use a coherent spacing scale.

Do not randomly accumulate arbitrary values.

Prefer:

- existing design tokens
- CSS variables
- framework spacing scales
- `clamp()` where appropriate
- consistent container widths

However:

Consistency does not mean every section must have identical spacing.

Spacing should support hierarchy and rhythm.

---

# 14. RESPONSIVE DESIGN

Responsive design is not "make desktop smaller."

Design intentionally for:

- small phones
- large phones
- tablets
- laptops
- desktop monitors
- wide screens when relevant

Check:

- typography
- navigation
- images
- grids
- spacing
- buttons
- forms
- tables
- fixed elements
- horizontal overflow
- touch targets
- content order

If a desktop composition does not work on mobile, redesign it rather than merely shrinking it.

---

# 15. ACCESSIBILITY

Accessibility is part of implementation, not an optional polish step.

Use:

- semantic HTML
- correct heading hierarchy
- real buttons for actions
- real links for navigation
- labels for form controls
- accessible names for icon buttons
- keyboard navigation
- visible focus states
- appropriate contrast
- meaningful alt text
- reduced-motion support
- correct ARIA only when necessary

Do not use ARIA to compensate for incorrect HTML when semantic HTML solves the problem.

---

# 16. COMPONENT ARCHITECTURE

Components should represent meaningful concepts.

Good examples:

- `Hero`
- `ProductCard`
- `BookingForm`
- `ProjectShowcase`
- `PricingTable`
- `Navigation`
- `Footer`

Avoid meaningless abstractions such as:

- `Thing`
- `Box`
- `Wrapper2`
- `UniversalSection`
- `GenericContent`
- `ComponentWithEverything`

Do not extract a component simply because it contains 20 lines.

Extract when it represents a meaningful concept or provides genuine reuse.

---

# 17. COMPONENT SIZE

Avoid both extremes.

Bad:

- one 1,000-line page component

Also bad:

- 40 components containing 3 lines each

Split by responsibility and concept.

Keep simple things simple.

---

# 18. STATE MANAGEMENT

Use the smallest appropriate state solution.

Prefer local state for local concerns.

Do not install global state management because the project has two pieces of state.

Use a state library when the application actually benefits from it.

Separate:

- UI state
- server state
- form state
- URL state
- persistent application state

Do not treat every type of state as the same problem.

---

# 19. DATA FETCHING

Use the framework's recommended data-fetching model where appropriate.

Avoid:

- unnecessary client-side fetching
- duplicate requests
- fetching data that can be rendered server-side
- waterfall requests when parallelization is possible
- putting all data logic inside giant UI components

Handle:

- loading
- success
- empty
- error

appropriately.

---

# 20. TYPESCRIPT

When TypeScript is used:

- prefer strict typing
- avoid `any`
- avoid unnecessary type assertions
- avoid `@ts-ignore`
- model important domain data clearly
- use discriminated unions when useful
- keep types readable
- avoid clever type gymnastics

Do not create enormous generic types when a simple interface/type is clearer.

TypeScript should make the code easier to understand, not harder.

---

# 21. JAVASCRIPT / TYPESCRIPT CODE QUALITY

Write readable code.

Avoid:

- deeply nested ternaries
- enormous functions
- duplicated business logic
- dead code
- unexplained magic values
- unnecessary effects
- unnecessary memoization
- premature optimization
- clever one-liners that reduce readability

Prefer boring code when boring code is clearer.

---

# 22. REACT-SPECIFIC RULES

When React is used:

- avoid unnecessary `useEffect`
- do not use effects for derived values that can be calculated directly
- keep components focused
- avoid unnecessary memoization
- use stable keys
- keep state close to where it is used
- prefer composition over giant configuration components
- respect the framework's current recommended patterns
- avoid client components when server rendering can handle the work

Do not turn every component into a client component automatically.

---

# 23. FRAMEWORK-SPECIFIC RULES

When using a framework:

Use its intended architecture.

Examples:

- Astro: prefer islands for genuinely interactive regions
- Next.js: use server/client boundaries intentionally
- Nuxt: use server/client rendering appropriately
- SvelteKit: respect load/server boundaries
- Angular: use the framework's current recommended component/state patterns
- Vue: keep reactivity understandable
- static-site generators: keep unnecessary JavaScript out of the browser

Do not fight the framework.

Also do not blindly follow outdated tutorials when the framework has moved to a newer recommended architecture.

---

# 24. CSS / TAILWIND

If Tailwind is used:

- use the existing design tokens
- keep class lists understandable
- extract meaningful components
- avoid arbitrary values unless necessary
- avoid duplicating the same long utility string everywhere

If plain CSS/CSS Modules/Sass is used:

- use clear naming
- avoid global leakage
- organize styles logically
- use variables/tokens
- avoid excessive specificity

Do not treat Tailwind as mandatory.

Good CSS is more important than the styling technology.

---

# 25. UI LIBRARIES

UI libraries are tools.

Before installing one:

1. Check whether the project already has a component system.
2. Check whether the browser/framework can solve the problem.
3. Check bundle/runtime implications.
4. Check accessibility quality.
5. Check customization.
6. Check maintenance.
7. Check whether the project actually needs it.

If shadcn/ui is used, treat it as a source-code foundation, not a mandatory visual style.

If another UI library is already established, don't replace it without a reason.

---

# 26. ICONS

Use one coherent icon system where possible.

Avoid:

- mixing five icon libraries
- manually drawing SVGs for common icons
- using emojis as UI icons
- inconsistent icon sizes

Icons should support comprehension, not decorate every piece of text.

---

# 27. ANIMATION

Animation should have a purpose.

Good uses:

- state transitions
- navigation feedback
- subtle emphasis
- meaningful interaction
- visual continuity

Avoid:

- every element animating
- endless scroll animations
- excessive parallax
- random bouncing
- excessive blur transitions
- animation delays on every child

Prefer CSS for simple animations.

Use animation libraries when their capabilities genuinely justify the dependency.

Respect `prefers-reduced-motion`.

---

# 28. IMAGES

Images are both a design and performance concern.

Use:

- appropriate formats
- responsive sizing
- correct aspect ratios
- lazy loading when appropriate
- explicit dimensions/aspect ratios to prevent layout shifts
- optimized delivery

Do not use huge images when a smaller asset is sufficient.

Do not distort images.

Choose cropping intentionally.

---

# 29. PERFORMANCE

Performance is a feature.

Protect:

- LCP
- INP
- CLS
- initial JavaScript size
- image weight
- font loading
- network requests

Avoid:

- unnecessary client-side JavaScript
- massive dependencies
- render-blocking assets
- layout shifts
- expensive animations
- unnecessary hydration
- duplicated requests
- loading everything before the user needs it

Prefer platform/browser capabilities when they are sufficient.

---

# 30. SEO

For public websites where SEO matters:

- semantic HTML
- useful titles
- useful descriptions
- canonical URLs where appropriate
- proper headings
- descriptive links
- crawlable content
- structured data when appropriate
- optimized images
- sitemap/robots configuration where appropriate

Do not hide important SEO content behind unnecessary client-side rendering.

---

# 31. FORMS

Forms must provide clear feedback.

Consider:

- labels
- validation
- error messages
- loading state
- disabled state
- success state
- keyboard support
- mobile usability

Validate on the client for UX.

Validate on the server/backend for trust and security.

Never treat client-side validation as security.

---

# 32. LOADING, EMPTY & ERROR STATES

Every meaningful asynchronous interface should consider:

- loading
- success
- empty
- error

Do not leave blank areas when something is loading.

Do not show spinners everywhere if a skeleton or optimistic interaction is more appropriate.

Error messages should explain what happened and, when possible, what the user can do next.

---

# 33. SECURITY

Never expose secrets in frontend code.

Never ship:

- private API keys
- service credentials
- database credentials
- privileged tokens

Understand what code runs in the browser versus on the server.

Never trust client-side authorization or validation.

---

# 34. BACKEND BOUNDARIES

The backend is part of the product whenever the product requires one.

Do not treat frontend work as the only "real" work.

If the backend already works:

Do not rewrite it casually.

For frontend-only work:

- preserve API contracts
- preserve authentication
- preserve database logic
- preserve business rules
- avoid unrelated backend changes

If a backend change is genuinely necessary, understand the impact before making it.

If a backend is required but does not yet exist, design and implement the necessary backend professionally rather than faking the functionality in the client.

---

# 35. SEO, ACCESSIBILITY AND PERFORMANCE ARE NOT "LATER"

Do not build a visually impressive page and postpone all technical quality.

Consider these while implementing.

A polished frontend that is:

- slow
- inaccessible
- impossible to index
- broken on mobile
- full of console errors

is not finished.

---

# 36. TESTING STRATEGY

Do not test everything equally.

Test according to risk.

For a simple marketing site:

- build/typecheck
- lint
- visual inspection
- important links/forms
- responsive inspection

For an application:

- unit/component tests where useful
- integration tests
- end-to-end tests for critical flows

If Playwright is available, use it for important browser flows.

Examples:

- sign in
- checkout
- booking
- form submission
- navigation
- critical dashboard workflows

Use the project's existing testing tools where possible.

Do not introduce multiple testing frameworks without a reason.

---

# 37. VISUAL QA

After implementing UI, inspect the rendered result.

Check at least:

- mobile
- tablet
- desktop
- wide desktop when relevant

Look for:

- awkward line breaks
- poor hierarchy
- inconsistent spacing
- overflow
- clipped content
- bad image crops
- broken fixed elements
- buttons that are too small
- unreadable text
- inconsistent components
- accidental layout shifts
- weak mobile navigation

Do not rely only on source code to determine whether a UI looks good.

---

# 38. BROWSER TESTING

When browser automation or inspection tools are available:

Use them.

A useful workflow is:

1. start the development/preview server
2. open the page
3. inspect the rendered result
4. interact with important controls
5. test different viewport sizes
6. check console errors
7. check network failures when relevant
8. fix problems
9. repeat

Do not claim that a UI was tested visually if it was never rendered/inspected.

---

# 39. LOAD & CONCURRENCY TESTING

Do not assume that a website needs load testing merely because it exists.

A small website should generally handle modest concurrent traffic without difficulty when built and hosted correctly.

When traffic/performance is a concern, measure it.

Possible tools:

- k6
- Lighthouse
- PageSpeed Insights
- Playwright
- hosting/provider analytics
- server/database metrics

For load testing, use realistic scenarios.

Examples:

- 10 concurrent users
- 20 concurrent users
- 50 concurrent users
- higher levels when justified

Measure:

- latency
- throughput
- error rate
- resource usage
- server response time

Do not aggressively load-test production without authorization.

Prefer a preview/staging environment.

---

# 40. DEPENDENCY DISCIPLINE

Before installing a package, ask:

- Do we already have this capability?
- Can the browser solve it?
- Can the framework solve it?
- Is the dependency maintained?
- Is it secure?
- What does it add to bundle size?
- Does it create architectural complexity?
- Will another developer understand why it exists?

Use dependencies when they provide real value.

Do not avoid dependencies dogmatically.

---

# 41. PACKAGE / FRAMEWORK CURRENCY

Do not blindly use outdated patterns.

When working with a framework/library:

- inspect the installed version
- follow the version already used by the project
- use current official patterns when known
- avoid mixing old and new APIs unnecessarily
- do not upgrade major versions casually

If a current framework recommendation materially changes architecture, explain the tradeoff before performing a large migration.

---

# 42. NO UNNECESSARY REWRITES

Do not rewrite:

- the whole application
- the whole styling system
- the entire component library
- backend architecture
- routing
- state management

just because a different approach might be cleaner.

Make the smallest change that properly solves the problem.

---

# 43. SCOPE CONTROL

When asked to implement a feature:

1. implement the requested feature
2. fix directly related issues
3. avoid unrelated refactors
4. mention unrelated problems separately

Do not turn:

"Fix this button"

into:

"I rewrote the entire design system."

---

# 44. BEFORE FINISHING ANY TASK

Perform this sequence:

### Pass 1 — Functionality

Does it actually work?

### Pass 2 — Design

Does it look intentional?

### Pass 3 — Responsive

Does it work across viewport sizes?

### Pass 4 — Accessibility

Can different users operate it?

### Pass 5 — Performance

Did we add unnecessary work?

### Pass 6 — Code quality

Is the implementation understandable?

### Pass 7 — AI-slop review

Does any part look obviously generated, generic, repetitive, or over-engineered?

### Pass 8 — Simplification

Can anything be removed without reducing quality?

Only then consider the task finished.

---

# 45. AI-SLOP CODE REVIEW

Look specifically for code patterns that often appear in AI-generated code:

- unnecessary helper functions
- excessive abstractions
- duplicated constants
- duplicated logic
- unnecessary state
- unnecessary effects
- excessive comments explaining obvious code
- giant configuration objects
- generic utility layers
- deeply nested conditionals
- overuse of memoization
- excessive type complexity
- dependencies used for trivial tasks
- inconsistent naming
- dead code
- "future-proofing" that nobody requested

Prefer code that is obvious.

---

# 46. AI-SLOP UI REVIEW

Look specifically for:

- generic layouts
- repeated cards
- excessive rounded containers
- random gradients
- excessive icons
- meaningless decoration
- generic copy
- identical section patterns
- excessive whitespace
- excessive animation
- weak hierarchy
- too many CTAs
- too many badges
- too many visual effects

Ask:

> If I removed the branding, would this look like 500 other AI-generated websites?

If yes, improve the design.

---

# 47. DO NOT CONFUSE "MODERN" WITH "GOOD"

Modern design is not:

- gradients
- rounded corners
- glass
- animations
- giant typography
- dark mode
- floating cards

Those are visual techniques.

Good design means:

- clear hierarchy
- appropriate visual language
- strong usability
- intentional composition
- consistency
- accessibility
- performance
- appropriate interaction

Use modern techniques when they fit.

Do not use them as a checklist.

---

# 48. CONTENT QUALITY

Do not invent fake content just to fill a layout.

If content is missing:

- use clearly marked placeholder content when appropriate
- ask for content when it materially affects the design
- avoid fake testimonials, fake statistics, fake customers, or fake claims in production

Design should work with realistic content lengths.

Test long and short content where relevant.

---

# 49. INTERNATIONALIZATION

When a project supports multiple languages:

- avoid hardcoded layout assumptions
- expect text expansion
- preserve semantic structure
- use proper locale handling
- format dates/numbers/currency appropriately
- test longer translations
- avoid concatenating sentences in ways that break translation

Do not treat language switching as simply replacing strings.

---

# 50. PROJECT-SPECIFIC INSTRUCTIONS

This file contains universal standards.

Project-specific requirements should live in the project's own `CLAUDE.md` or equivalent project documentation.

Examples of project-specific information:

- brand colors
- fonts
- tone of voice
- framework
- folder structure
- API conventions
- deployment platform
- database
- authentication
- design references
- client restrictions

Do not pollute this universal standard with one client's branding.

---

# 51. WHEN REQUIREMENTS CONFLICT

Prioritize:

1. security
2. correctness
3. accessibility
4. user experience
5. performance
6. maintainability
7. visual polish
8. developer convenience

If a requested design harms usability, accessibility, security, or performance, explain the tradeoff and propose a better implementation.

---

# 52. FINAL PRINCIPLE

Do not try to impress the developer with complexity.

Do not try to impress the user with decoration.

Build something that makes sense.

The best frontend is:

**intentional, appropriate, fast, accessible, maintainable, and visually convincing.**

Use the right tool for the job.

Design for the actual user.

Write code another developer can understand.

And before finishing:

**make it work → make it good → make it clean → make it fast → remove what isn't necessary.**
