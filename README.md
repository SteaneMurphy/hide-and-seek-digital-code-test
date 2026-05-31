# 📚 BookHaven - Online Book Shop Code Test

<div align="center">

**Build a beautiful e-commerce experience for book lovers.**

[Requirements](#-requirements) • [Tech Choices](#-tech-choices) • [Evaluation](#-evaluation) • [Getting Started](#-getting-started)

</div>

---

<a name="developer-decisions"></a>

## 👋🏼 Developer Decisions

### Framework & Libraries

- **Next.js 15 (App Router)** over TanStack + Vite. The brief leans on server-side data fetching from Postgres, and the App Router's React Server Components fit that directly without a separate data-loading layer. Built-in `next/image` optimisation, file-based routing, and the loading/error route conventions were all relevant to the requirements.
- **TypeScript (strict)** throughout. The shared `Book` type lives in `src/shared/books.ts` so the DB layer, the store, and the UI all reference the same shape.
- **CSS Modules** over Tailwind. Design tokens (colour, spacing, type scale, radius) live as custom properties in `src/app/globals.css`; every component CSS module consumes them via `var(--…)`. This keeps the markup readable, the design system centralised, and avoids the utility-soup readability hit on a small app.
- **PostgreSQL + Docker** (the brief's preferred path). Schema lives in `docker-compose.yml`'s init script; the repository in `src/server/repositories/books-repository.ts` returns typed rows.
- **Zustand** for cart state. Minimal API, no Provider, persist middleware out of the box. Picked over Redux for the boilerplate-to-functionality ratio at this scale, and over Context for the perf characteristics (selector subscriptions).
- **Jest + React Testing Library** via `next/jest` for the test setup.

### State Management

- One Zustand store (`useCartStore`) holds the cart; everything else is server-fetched or local UI state.
- **Selector subscriptions throughout** — `useCartStore((s) => s.items)` rather than `const { items } = useCartStore()`. This means a component only re-renders when its specific slice changes; the header badge doesn't re-render when an unrelated UI change happens, the cart page doesn't re-render when the badge count changes elsewhere.
- **`persist` middleware** handles localStorage round-tripping for free.
- **`useCartHydrated` hook** sits next to the store and returns `true` only after persist's rehydration completes. Components gate hydration-dependent UI (the badge, the cart contents) on this so the server-rendered HTML matches the first client render — avoids the React hydration-mismatch warning, and avoids the badge flashing in after first paint.

### Architecture

- `src/app/` — routes only.
- `src/components/<feature>/` — one folder per component, `.tsx` colocated with `.module.css`.
- `src/server/` — anything that must run server-side (DB client, repositories). Runtime tier is visible in the import path so it's obvious at a glance what a file is safe to import where.
- `src/shared/` — types and utilities safe to import from both server and client.
- `src/store/` — Zustand store + the hydration hook (colocated because the hook only exists due to the store's persist middleware).
- `src/constants/` — copy, routes, and cart limits. Centralising strings as the brief asks; also gives one place to change "Add to Cart" → "Add to Bag" if someone wanted to.
- **Error and loading states** are wired via the App Router conventions: `src/app/error.tsx` is the error boundary, `src/app/loading.tsx` is the suspense fallback for the home route's DB fetch.

### Testing Strategy

12 tests across 4 suites. Started higher and **culled the smoke tests** that passed regardless of real behaviour (a `renders heading` test against a mocked-out grid doesn't prove the grid works) in favour of tests that exercise behaviour.

What's covered:

- **Cart store** — one integration test walking the full lifecycle: add → dedupe → MAX_QUANTITY cap → increment-at-cap → decrement → decrement-at-1-removes → remove → clear. Integration over a flock of one-assertion units because the actions interact and the lifecycle is more revealing than any single transition.
- **Money math** — total across multiple items, plus per-row subtotal at quantity > 1 (separate assertion because a bug in `price × qty` at qty 1 would be invisible against `price × 1`).
- **UI → store wiring** — add-to-cart click, remove click, increment click. The decrement wire follows the same pattern, covered by the store test's remove-at-1 transition.
- **Hydration safety** — the cart page renders the empty state while the store is still rehydrating, even if items exist. This defends the non-obvious `useCartHydrated` gate; without the test, a regression that drops the gate would flash an empty cart on every refresh.
- **Accessibility** — book cover image alt text. Highest-value a11y assertion since screen readers depend on it for the grid.
- **Conditional UI** — header badge present/absent based on item count, badge sums quantities correctly.

What's deliberately not covered:

- "Renders the heading" / "renders the brand" smoke — would pass with the app completely broken.
- Continue-shopping link `href` — implementation detail, behaviour was about navigating home not about the URL.

### Challenges & Learnings

- **SSR/persist hydration.** First pass at Zustand persist flashed a populated cart on initial render that then briefly emptied when the persist middleware loaded. The `useCartHydrated` hook fixes this by returning `false` on server and first client render, flipping `true` only after `onFinishHydration` fires. Once I had the gate, I added a test specifically for "shows empty state while hydrating even if items exist" so future-me can't accidentally remove it.
- **SKU vs ISBN.** The brief asks for "SKU" on the homepage card, but the seed data only has ISBN. Chose to **display ISBN** (the customer-meaningful book identifier) and keep an internal SKU column (UUID) in the database as the stable cart/order reference. Real-world cart systems separate these — ISBN is what users search by, SKU is what survives edition changes. Flagged here because it's the most likely thing a reviewer might query.
- **Non-uniform book covers.** The seed covers have different aspect ratios and baked-in white margins. `object-fit: cover` clipped titles on outliers; `contain` exposed the inconsistent margins. Final solution: `contain` against a flush white image-area background, narrowed wrapper to 3:4 to minimise letterbox on squarer covers, padding on the `<img>` itself for breathing room. `next/image` with `fill` is absolutely positioned, so padding on the wrapper does nothing — had to put it on the image element.
- **Cart UX nuance.** First pass had the `−` button disabled at quantity 1 to "prevent accidental deletion." Corrected: standard cart UX is decrement-to-zero removes the row, and disabling breaks the user's mental model. Lesson: defer to established e-commerce patterns when in doubt.

### Working with AI (Claude)

The entire project was built using Claude as a pair-programming partner. The workflow:

- **Direction first, plan second.** I set the architecture and ground rules up front. Claude then proposed a plan against those constraints, which I reviewed and adjusted before any code was written.
- **One thing at a time.** Each feature or fix shipped as its own commit and PR, tested and checked as it landed — not batched into a mono-PR. Made it easy to course-correct mid-task.
- **Questions over assumptions.** Whenever Claude introduced unfamiliar syntax, library behaviour, or logic, I asked until I understood it. Better than merging code I couldn't defend in review.
- **Design decisions stayed with me.** All product, UX, and high-level architecture choices were mine. Claude surfaced options and trade-offs; I picked the direction. The cart decrement-to-remove correction noted in Challenges is a representative example — Claude initially proposed disable-at-1; I overrode based on standard cart UX.

### Feedback on the brief

**What was clear:**

- Concrete requirements list, well-organised by section.
- The "Bonus Points" list is good — gives direction without being prescriptive.
- The naming conventions section is helpful (the explicit `BookCard not Card` / `ShoppingCartPage not CartPage` examples remove ambiguity).
- The "What We're Evaluating" checklist is useful as a self-review tool.

**What could be improved:**

- **"SKU"** as a required homepage field is ambiguous when paired with seed data that only has ISBN. Stating "use whichever identifier you think is appropriate, justify in Developer Decisions" would invite the thinking the test seems to be probing for.
- **"Total Tests - 11"** as a hard number nudges candidates either toward padding with smoke tests or toward skipping critical coverage. "11+ meaningful tests across these critical paths" would be clearer about the intent.
- **`src/lib/books.ts`** is referenced as the seed source, but the actual seed location varies by chosen stack — and "lib" doesn't make sense in a structure where DB code goes under `server/`. Worth genericising the path reference.

---

## ▶️ Running Locally

Requires Node 20+ and Docker.

### 1. Create `.env` in the project root

```bash
POSTGRES_DB=bookhaven
POSTGRES_USER=bookhaven
POSTGRES_PASSWORD=bookhaven
POSTGRES_PORT=5432
DATABASE_URL=postgresql://bookhaven:bookhaven@localhost:5432/bookhaven
```

### 2. Pick one of the two run modes

#### Option A — app on host, Postgres in Docker (recommended for development)

```bash
docker compose up -d db    # start Postgres in the background
npm install
npm run db:seed            # seed the books table (run once)
npm run dev                # app at http://localhost:3000
```

#### Option B — everything in Docker

```bash
docker compose up          # db + seed + app all come up
                           # app at http://localhost:3000
```

### Other commands

```bash
npm test                   # Jest suite (4 suites, 12 tests)
npm run build              # production build
npm run lint               # ESLint
npm run format             # Prettier write
```

### Tearing down

```bash
docker compose down        # stop containers
docker compose down -v     # stop and wipe the Postgres volume (fresh seed next time)
```

## 🎯 The Mission

Create an online book shop that's a joy to use! We're looking for:

- **Clean UI** - Books displayed consistently across all pages
- **Responsive Design** - Looks amazing on mobile, tablet, and desktop
- **Smooth Shopping** - Add to cart, remove from cart, happy days
- **Consistent Architecture** - Code that's a pleasure to read and maintain
- **Tested Quality** - Confidence that everything works as expected

## 🎨 Important!

```bash
There are no Figma Design Files

# It is up to decide how you would like to show the books consistently
# In line with the outlined requirements for example on use the 10 books provided
# Please keep it simple, there is not need to do more than what we have asked for :)

```

---

## ✨ Requirements

### 🛒 Core Functionality

#### Shopping Experience

- **Homepage** - Beautiful grid of books with cover image, title, author, SKU & prices. Only use the book data provided in src/lib/books.ts
- **Cart Page** - View all selected books, see totals, remove items, route needs to be /cart
- **Add to Cart** - Click a button, book appears in cart ✨
- **Remove from Cart** - Changed your mind? No problem, remove it
- **Cart Persistence** - Cart survives page refreshes (bonus points!)

#### UI & UX Must-Haves

- **Consistent Book Display** - Every book card looks uniform and polished
- **Light Theme** - The page background colour is white
- **Responsive Pages** - Test on mobile! We will too 📱
- **Loading States** - Show something beautiful while data loads
- **Error States** - Graceful handling when things go wrong
- **Smooth Transitions** - Micro-interactions that feel premium

### 🏗️ Technical Requirements

#### Component Structure

- **Scalable Architecture** - Build for growth, not just MVP
- **Reusable Components** - DRY principles throughout
- **Clear Separation** - Layout, features, and UI components have their place
- **Smart Hooks** - Custom hooks for reusable logic
- **Type Safety** - Proper TypeScript types everywhere

#### Naming Conventions

- **Variables & Functions** - Use descriptive, full names (e.g., `shoppingCart` not `cart`, `getUserData` not `getUser`)
- **Components** - Clear, descriptive names (e.g., `BookCard` not `Card`, `ShoppingCartPage` not `CartPage`)
- **Constants** - UPPER_SNAKE_CASE for constants (e.g., `MAX_QUANTITY`, `API_BASE_URL`)
- **Files & Folders** - kebab-case for files (e.g., `book-card.tsx`, `shopping-cart.ts`)

#### State Management

- **Cart State** - Cart must read from centralized state, it's your choice on how
- **State Updates** - Predictable and debuggable state changes
- **Performance** - Only re-render what needs to update

#### Testing

- **Jest** - Test components using Jest
- **Coverage** - Test critical paths (cart operations, components)
- **Meaningful Tests** - Test behavior, not implementation details
- **Total Tests** - 11

#### Constants

- **Centralized Configuration** - Use `constants` folder to centralise strings
- **Easy Updates** - Change things in one place

---

## 🔧 Tech Choices

### Choose Your Database (Bonus Points) 🗄️

**We highly recommend implementing database integration instead of hardcoded data. Candidates who do this will receive preferred consideration!**

**Option A: PostgreSQL + Docker** ⭐ (PREFERRED)

```bash
# Create docker-compose.yml
docker-compose up -d
# Connect to database and create table
# Seed with book data from books.ts
```

- Industry-standard relational database
- Production-grade approach
- Shows full-stack understanding
- Containerization skills (Docker)
- **We give preference to candidates who choose this option**

**Option B: Supabase** ☁️

```bash
npm install @supabase/supabase-js
# Create Supabase project
# Run SQL to create books table
# Insert book data
```

- PostgreSQL under the hood (still a real database!)
- Hosted solution, no Docker needed
- Built-in authentication
- Real-time subscriptions
- Great for quick deployment

**Why Database Integration Matters:**

Real-world applications don't hardcode data. We want to see:

- Server-side data fetching from a real database
- Proper data modeling (schemas, types, constraints)
- Production-ready architecture
- Full-stack skills beyond static data

### Choose Your Framework

**Option A: Next.js** 🚀

```bash
npm install next
# Set up Next.js App Router
# Create app/ directory structure
# Configure next.config.js
```

- App Router or Pages Router (your choice!)
- Built-in routing and optimization
- Great for SEO and performance

**Option B: TanStack Router + Vite** ⚡

```bash
npm install @tanstack/router vite @tanstack/react-query
# Set up Vite config
# Configure TanStack Router
# Create route tree
```

- Type-safe routing without the framework
- Lightweight and flexible
- Perfect for SPA purists

**Pro tip:** Pick one approach and commit to it. We're looking for consistency and good decision-making!

---

### Pick Your Styling

**Option A: Tailwind CSS** 🎨

```bash
npm install tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

- Utility-first approach
- Rapid development
- Consistent design system

**Option B: CSS Modules** 🎭

- Scoped styling per component
- Traditional CSS with superpowers
- Full control over styles

### State Management - Your Call! 🎯

- We care about **results**, not prescriptions. Use whatever state management solution you prefer:

**The only requirement:** Cart must read from and update centralized state minimal to no prop drilling.

## 📋 What We're Evaluating

### 🎨 Frontend Excellence

- [ ] Visual consistency across all pages
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] Smooth loading and error states
- [ ] Polished UI with attention to detail
- [ ] Accessibility considerations

### 🏗️ Code Architecture

- [ ] Scalable component structure
- [ ] Clear file organization and naming
- [ ] Reusable components and hooks
- [ ] Proper separation of concerns
- [ ] Type-safe TypeScript implementation

### 🛒 Shopping Cart Implementation

- [ ] Cart reads from centralized state
- [ ] Add to cart works flawlessly
- [ ] Remove from cart works flawlessly
- [ ] Cart persists across navigation
- [ ] State updates are predictable

### 🧪 Testing Quality

- [ ] Jest tests for critical functionality
- [ ] Tests cover cart operations
- [ ] Tests cover key components
- [ ] Tests are meaningful and maintainable
- [ ] Why you choose what tests to include

### 💻 Developer Experience

- [ ] Did you use an LLM & how?
- [ ] Show your commit history
- [ ] Clean, readable code
- [ ] Clear comments where needed
- [ ] Easy to understand the flow
- [ ] Constants are well-organized
- [ ] Project builds and runs without issues

---

## 🚀 Getting Started

### Step 1: Set Up Your Data

Use the book types and data from `src/lib/books.ts` to set up the database schema:

### Step 2: Choose Your Framework

**For Next.js:**

```bash
npm install next
# Create app/ directory with layout.tsx and page.tsx
# Update package.json scripts: "dev": "next dev"
```

**For TanStack Router + Vite:**

```bash
npm install -D vite @vitejs/plugin-react
npm install @tanstack/router @tanstack/react-query
# Create vite.config.ts
# Create main.tsx entry point
# Update package.json scripts: "dev": "vite"
```

```typescript
import { books, type Book } from "@/lib/books";
```

### Step 3: Build Your Pages

1. **Homepage** (`/`)
   - Display all books in a responsive grid
   - Each book shows: cover, title, author, price
   - "Add to Cart" button on each book
   - Link to cart page

2. **Cart Page** (`/cart`)
   - List all books in cart
   - Show quantity, price per item, total
   - "Remove" button for each item
   - Cart total (all items)
   - Link back to homepage

### Step 4: Add Tests

```bash
npm install -D jest @testing-library/react @testing-library/jest-dom
npx jest --init
```

### Step 5: Document Your Decisions & Request Feedback

After completing your implementation, add a high-level overview of your decisions to the **[Developer Decisions](#-developer-decisions)** section at the top of this README. Explain:

- **Framework & Libraries** - Why you chose your tech stack
- **State Management** - Your approach to cart state and why
- **Architecture** - How you organized components and logic
- **Testing Strategy** - What you tested and why
- **Challenges & Learnings** - Any obstacles and how you solved them

**Also include any feedback or questions** you have about this code test

- what was clear?
- What could be improved?
- We value your leadership!

This helps us understand your thought process and improves our understand of your perspective.

---

## 🎨 Design Guidelines

### Typography

- **Headings:** Bold, clear hierarchy
- **Content Sections:** Clear difference between content types. Example: The Author doesn't look the same as the Title
- **CTAs:** Stand out with high contrast

### Spacing

- **Consistent margins/padding** - Ideally use global variables for this
- **Breathing room** - Don't cram elements together
- **Grid gaps** - Consistent spacing between cards

---

## 💡 Bonus Points

Want to stand out? Here's some extra credit:

- 🌟 **Book Search/Filter** - Find books by title or author
- 🌟 **Quantity Controls** - Increase/decrease item quantities
- 🌟 **Empty States** - Beautiful "your cart is empty" page
- 🌟 **Accessibility** - ARIA labels, keyboard navigation
- 🌟 **Performance** - Image optimization, lazy loading
- 🌟 **Error Boundaries** - Graceful error handling

---

## 🤔 Questions We'll Ask Ourselves

When reviewing your submission, we'll be thinking:

- **Does this look like a production-ready app?**
- **Is the code easy to understand and modify?**
- **Are the technical decisions thoughtful?**
- **Does the cart work flawlessly?**
- **Is the testing aligned to requirements**
- **Did they pay attention to the details?**
- **Is this something they're proud of?**

---

## 🎯 Final Tips

1. **Pick a stack and stick to it** - Consistency > mixing everything
2. **Think like a user** - Is this delightful to use?
3. **Code for humans** - We read code more than we write it
4. **Have fun!** - This is a chance to show your best work

---

**Good luck! Show us what you can build! 🚀**

_We're excited to see your creation_

</div>

Integrations & Add JSON into database
