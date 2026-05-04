# 📚 BookHaven - Online Book Shop Code Test

<div align="center">

**Build a beautiful e-commerce experience for book lovers.**

[Requirements](#-requirements) • [Tech Choices](#-tech-choices) • [Evaluation](#-evaluation) • [Getting Started](#-getting-started)

</div>

---

<a name="developer-decisions"></a>

## 👋🏼 Developer Decisions

```bash
# Please add a high level overview of your decisions here after you have completed the project
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
