# Mobile UX & Quick-Navigation Optimization

Enhance the mobile experience for the AWS re:Invent Watch Party landing page by preserving all content and section depth while introducing mobile-first touch ergonomics, smooth touch-target hitboxes, and an ergonomic floating "Back to Top" navigation button.

### User Review & Critical Decisions

> [!IMPORTANT]
> The user confirmed the mobile UX approach: keep all existing event sections and depth intact, while incorporating mobile touch enhancements and a floating Back to Top button for swift one-handed navigation.

- **Confirmed Decision 1**: **Keep All Content with Mobile UX Touch Enhancements** — Maintain all event tracks, speakers, venue, official socials, FAQs, and registration details without truncating or hiding critical content.
- **Confirmed Decision 2**: **Floating Back to Top Button** — Introduce an unobtrusive, thumb-friendly floating return button (with scroll-depth detection) positioned within the natural reach zone on mobile screens.

---

### 1. Overview & Core Concept

- **What It Does**: Provides mobile visitors (375px–430px smartphone viewports up to tablets and desktops) with effortless thumb scrolling and navigation. A responsive floating action button emerges after the user scrolls past the hero section, allowing 1-tap instant return to the top navigation and primary CTAs. Interactive touch targets (social cards, agenda tabs, FAQ accordions, buttons) adhere to a 44px minimum touch hitbox to prevent accidental taps.
- **Target Audience / Persona**: Attendees, university tech students (UNILORIN and KWASU chapters), builders, and cloud enthusiasts browsing the event portal on iOS Safari, Android Chrome, and in-app web views (Instagram, LinkedIn, X, TikTok).
- **Key Value**: Delivers a light, "calm", friction-free browsing experience on mobile devices without sacrificing any rich conference information.

---

### 2. User Experience & Visual Design

- **Key User Flows**:
  1. *Mobile Entry*: User lands on the page on a smartphone; header and hero fit the viewport with responsive font sizing (`clamp`) and touch-friendly CTA buttons (`min-h-[44px]`).
  2. *Deep Scroll & Engagement*: User reads through About, Tracks, Agenda, Featured Speakers, Venue, and Official Event Socials.
  3. *Quick Return Affordance*: Once scrolled past 400px, a sleek floating button smoothly fades in at the bottom-right corner (`bottom-6 right-5`).
  4. *One-Tap Return*: Tapping the button smoothly glides the viewport back to the top (`window.scrollTo({ top: 0, behavior: 'smooth' })`), restoring access to the main menu and primary RSVP button.
  5. *Safe Spacing & 15% Sticky Cap Compliance*: The floating button and top header stay strictly under 15% of viewport height, keeping 85%+ of the screen clear for content reading.

- **Visual Identity & Theme**:
  - *Color & Glass Effect*: Dark slate translucent background (`bg-slate-900/90 backdrop-blur-md`), hairline purple border (`border border-purple-500/30`), glowing purple hover/active shadow (`shadow-lg shadow-purple-500/20`), and high-contrast icon (`text-purple-300`).
  - *Geometry & Radius*: Ergonomic circular shape (`w-11 h-11 rounded-full`), centered arrow-up SVG glyph, compliant with $\ge 44\text{px}$ touch hitbox.
  - *Motion*: Smooth CSS opacity and transform transition (`transition-all duration-300 transform`) with `active:scale-95` tactile feedback.

---

### 3. Key Product Decisions & Trade-Offs

- **Decision 1: Floating Back to Top Button vs. Full Fixed Bottom Bar**
  - *Chosen Approach*: Lightweight floating button that only appears when needed (scrolled past hero).
  - *Why*: A fixed 4-tab bottom bar takes up valuable vertical real estate on small phones and risks conflicting with browser chrome (Safari address bar). A floating button respects the 15% sticky cap and gives attendees maximum reading room.
  - *Alternatives Considered*: Sticky bottom RSVP bar (rejected to avoid screen crowding since sticky top header already carries quick RSVP access).

- **Decision 2: Retaining Full Content vs. Collapsible Mobile Drawers**
  - *Chosen Approach*: Retain full section flow with native mobile spacing, touch-padding adjustments, and responsive cards.
  - *Why*: Conference attendees on mobile want to quickly scan the agenda and official event social links without having to tap into multiple collapsed accordions or sub-menus.

---

### 4. Technical Architecture & Data Strategy *(Technical Reference)*

```
┌─────────────────────────────────────────────────────────────┐
│                       Mobile Viewport                       │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ Sticky Top Header (Brand + Menu Toggle + RSVP Button) │  │
│  └───────────────────────────────────────────────────────┘  │
│                             │                               │
│                             ▼                               │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ Content Sections (Hero -> Tracks -> Agenda ->         │  │
│  │ Speakers -> Venue -> Socials -> FAQs -> Footer)       │  │
│  └───────────────────────────────────────────────────────┘  │
│                             │                               │
│               Scroll Event Listener (Passive)               │
│                             ▼                               │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ Scroll Depth > 400px ?                                │  │
│  │   YES -> Show Back to Top Button (Fade-in + Scale 1)  │  │
│  │   NO  -> Hide Back to Top Button (Fade-out + Scale 0) │  │
│  └───────────────────────────────────────────────────────┘  │
│                             │                               │
│                User Taps "Back to Top"                      │
│                             ▼                               │
│           Smooth Window Scroll (y: 0, smooth)               │
└─────────────────────────────────────────────────────────────┘
```

- **Interactive Component & State Mapping**:
  - `backToTopBtn` element in `index.html` with initial classes `opacity-0 pointer-events-none translate-y-3`.
  - Passive scroll event handler monitoring `window.scrollY > 400`.
  - Click listener triggering smooth animated scroll to top with `focus-visible` accessibility indicator.
  - Mobile touch padding review across card containers ensuring all clickable elements have `min-h-[44px]` or adequate tap spacing.
