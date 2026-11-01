# AWS re:Invent 2026 Kwara State — Site Refinement & Builder Pass Enhancement

### Overview of Changes Completed
1. **Removed Non-Essential Sections as Requested**:
   - Removed the **Live Architecture Stack ("What We're Building On The Console")** section (`#lab-preview`).
   - Removed the temporary **Schedule & Agenda** section (`#schedule`).
   - Cleaned up top desktop navigation and mobile navigation links accordingly.
   - Removed unused JavaScript helper functions (`filterSchedule`, `selectLabService`, `labServicesData`).

2. **Upgraded the Builder Pass Generator (`#badge-generator`)**:
   - **Photo Upload Capability**: Added a dedicated file uploader supporting headshots/avatars (PNG, JPG, WebP) with instant live card preview, a 40px active thumbnail indicator, and a one-click remove option.
   - **Elevated Conference Lanyard Badge Design**:
     - Realistic die-cut lanyard slot cutout representation at the top of the badge card.
     - Attendee photo frame with an iridescent multi-stop metallic gradient ring (`from-amber-400 via-purple-500 to-sky-400`).
     - Default builder silhouette avatar fallback when no custom photo is provided.
     - Dual chapter logo lockup for UNILORIN × KWASU.
     - Dynamic attendee name, campus affiliation, and builder track badges.
     - Date & venue bar: `Saturday, 5th December, 2026 · Ilorin Innovation Hub · 9:00 AM WAT`.
   - **Removed Technicality & Preferential Wording**:
     - Removed all mentions of `'af-south-1'` from both the visual card and the exported canvas image.
     - Removed all `'VIP'` and `'VERIFIED VIP'` badges and labels; replaced with `"OFFICIAL BUILDER PASS"`, `"REGISTERED ATTENDEE"`, and `"100% FREE PASS"` so attendees are not expecting preferential VIP treatment.
   - **High-Resolution PNG Canvas Export**:
     - Canvas rendering (`downloadBuilderBadge()`) renders user photo with rounded rectangular clipping, geometric background grid, ambient radial glow, official typography, and barcode scanlines.
