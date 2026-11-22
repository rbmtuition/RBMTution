# RBM Tuition — Website Rebuild: Project Specification

> Status: Draft v1 (awaiting review)
> Owner: RBM Tuition
> Site: https://rbmtuition.com
> Prepared: November 2026

---

## 1. Overview

Rebuild rbmtuition.com as a modern, fast, SEO-first marketing website for a home
and online tuition service across Delhi NCR.

- **Frontend only** — Next.js (App Router), static-first, no custom backend.
- **Forms** — Web3Forms (serverless form endpoint), key supplied via environment variable.
- **Primary market** — Delhi NCR: Delhi, Noida, Greater Noida, Gurgaon,
  Ghaziabad, Faridabad.
- **Primary conversions** — phone call, WhatsApp chat, student enquiry form,
  tutor registration.

### Goals

1. Rank for high-intent local keywords ("home tutor in South Delhi",
   "maths tuition in Noida", "JEE tutor Gurgaon").
2. Communicate trust quickly (ISO 9001:2015, UDYAM, trademark, 23,000+ tutors).
3. Convert visitors into enquiries with a persistent, low-friction form.
4. Launch with complete technical SEO: metadata, JSON-LD, sitemap, redirects,
   Core Web Vitals.
5. Replace the current WordPress site without losing existing rankings.

### Success metrics (first 90 days)

| Metric | Target |
|---|---|
| Lighthouse (mobile) Performance / SEO / A11y / Best Practices | ≥ 95 / 100 / ≥ 95 / 100 |
| Indexed pages | 100% of sitemap URLs |
| Organic clicks (GSC) | +20% vs. same period previous site |
| Enquiry form conversion rate | ≥ 3% of sessions |
| LCP / INP / CLS | < 2.0s / < 200ms / < 0.05 |

---

## 2. Brand & design direction

**Style:** Premium navy + gold. Trustworthy, academic, modern. Not playful.

### Design tokens (proposed)

| Token | Value | Use |
|---|---|---|
| Navy 900 | `#0A1F44` | Primary text, header, footer |
| Navy 700 | `#12306B` | Gradients, hover states |
| Gold 500 | `#D4A017` | Primary CTA, accents, rules |
| Gold 100 | `#FBF3DE` | Highlight backgrounds |
| Cream | `#F8F5EE` | Section backgrounds |
| Ink | `#1F2937` | Body copy |
| Slate | `#6B7280` | Secondary copy |
| Success | `#15803D` | Form success states |

- **Typography:** Fraunces (display headings, serif) + Manrope (body/UI).
- **Layout:** 1200px container, 8pt spacing scale, 16–20px radii, soft shadows.
- **Motion:** subtle only — fade/slide-in on scroll, hover lifts. No heavy libraries.
- **Imagery:** real tutoring photos where possible, logo from the current site,
  consistent gold/navy overlays for stock imagery.
- **Logo:** reuse the existing RBM logo (`rbm_logo_dark`); request SVG/transparent
  PNG for retina and footer variants.

### Components inventory

- Header (sticky, transparent-to-solid, mobile drawer, call/WhatsApp CTAs)
- Announcement/trust bar (phone, certifications)
- Footer (NAP, service links, city links, legal, socials)
- Hero + inline enquiry form
- Trust badges row
- Course cards / Course detail sections
- Service cards / Service detail sections
- Location grid + city/area page templates
- Subject cards
- Process / "How it works" steps
- Testimonials carousel/grid
- FAQ accordion (with FAQPage schema)
- Blog cards + article layout
- Breadcrumbs (with BreadcrumbList schema)
- Sticky mobile CTA bar (Call / WhatsApp / Enquire)
- Enquiry form (reusable, compact + full variants)
- Tutor registration 3-step wizard
- Thank-you / success states (inline, no separate page)

---

## 3. Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js (latest, App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 + CSS custom properties |
| Fonts | `next/font` (Fraunces, Manrope) |
| Images | `next/image`, local assets, AVIF/WebP |
| Forms | Web3Forms via `NEXT_PUBLIC_WEB3FORMS_KEY` |
| Analytics | GA4 via `NEXT_PUBLIC_GA_ID` (optional), GSC verification |
| Hosting | Vercel (recommended) or static export on Hostinger |
| Content | Typed local data files in `src/data` (courses, services, locations, subjects, blog) |
| Blog | Local content data at launch; MDX-style structure ready for future CMS |
| Linting | ESLint (`next/core-web-vitals` + TS) |

No database, no auth, no custom API routes required in v1.

---

## 4. Information architecture

Navigation: **Home · Courses · Services · Locations · Subjects · Blog · Contact**
(locations/subjects a mega-menu on desktop; simplified accordion on mobile)
Right side: **Call +91 92203 88165** · **Book Free Demo**

### URL map

| Page | URL |
|---|---|
| Home | `/` |
| About | `/about` |
| Courses index | `/courses` |
| Course detail | `/courses/[slug]` |
| Services index | `/services` |
| Service detail | `/services/[slug]` |
| Locations index | `/locations` |
| City | `/locations/[city]` |
| Area | `/locations/[city]/[area]` |
| Subjects index | `/subjects` |
| Subject detail | `/subjects/[slug]` |
| Blog index | `/blog` |
| Blog post | `/blog/[slug]` |
| Contact | `/contact` |
| Tutor registration | `/tutor-registration` |
| Payment (external CTA) | current payment URL (new tab) |
| Privacy policy | `/privacy-policy` |
| Terms | `/terms` |
| Sitemap | `/sitemap.xml` |
| Robots | `/robots.txt` |

### Courses (12 pages)

`class-1-5`, `class-6-8`, `class-9-10`, `class-11-12-science`,
`class-11-12-commerce`, `class-11-12-humanities`, `jee`, `neet`, `cuet`,
`foundation`, `board-exam-preparation`, `crash-course`

Each course page: H1 ("Class 9–10 Home Tuition in Delhi NCR"), intro, syllabus/
boards covered, subjects, teaching approach, tutor matching, pricing factors,
mode (home/online), FAQs, related subjects, location links, enquiry CTA.

### Services (8 pages)

| Slug | Purpose | Primary keyword |
|---|---|---|
| `home-tuition` | One-to-one tutoring at home | Home Tuition |
| `online-tuition` | Live online classes | Online Tuition |
| `group-classes` | Small batch classes | Group Tuition |
| `one-to-one-tuition` | Personalized learning | One-to-One Tuition |
| `exam-preparation` | JEE, NEET, Boards, CUET prep | Exam Preparation |
| `doubt-solving` | Dedicated doubt sessions | Doubt Solving Classes |
| `test-series` | Mock tests & assessments | Test Series |
| `homework-assistance` | Homework and assignment support | Homework Help |

### Subjects (12 pages)

`mathematics`, `science`, `english`, `hindi`, `physics`, `chemistry`, `biology`,
`accountancy`, `economics`, `business-studies`, `computer-science`, `social-science`

### Locations

**Cities (6):** Delhi, Noida, Greater Noida, Gurgaon, Ghaziabad, Faridabad.

**Areas (58):**

- **Delhi (11):** South Delhi, North Delhi, East Delhi, West Delhi, Central Delhi,
  Dwarka, Rohini, Laxmi Nagar, Janakpuri, Pitampura, Vasant Kunj
- **Noida (5):** Sector 15, Sector 18, Sector 62, Sector 75, Sector 137
- **Greater Noida (1):** Greater Noida (city page only)
- **Gurgaon (9):** DLF Phase 1, DLF Phase 2, DLF Phase 3, DLF Phase 4, Sector 14,
  Sector 46, Sector 56, Sector 57, Golf Course Road
- **Ghaziabad (5):** Indirapuram, Vaishali, Raj Nagar, Kaushambi, Crossing Republik
- **Faridabad (5):** Sector 15, Sector 16, Sector 21C, Sector 37, NIT Faridabad

URL pattern: `/locations/delhi/south-delhi` (nested, hierarchical, breadcrumbed).
H1 keyword format: "Home Tuition in South Delhi".

**Programmatic content guardrail:** every area page gets unique local copy —
intro (150+ words), popular schools nearby (real, verifiable), subjects in demand,
2–3 area-specific FAQs, tutor availability note. No copy-paste doorway pages.

### Blog (structure + 5 starter posts)

1. "Home Tuition in Delhi NCR: Complete Parent's Guide (2026)"
2. "How Much Does a Home Tutor Cost in Delhi, Noida & Gurgaon?"
3. "CBSE vs ICSE vs IB: Which Board Suits Your Child?"
4. "JEE vs NEET: How to Choose the Right Path After Class 10"
5. "7 Signs Your Child Needs a Personal Tutor"

---

## 5. Page specifications

### 5.1 Home

1. Sticky trust/announcement bar — phone, "ISO 9001:2015 certified"
2. Header + primary nav
3. Hero — H1 "Find the Best Home Tutor in Delhi NCR",
   subcopy (Nursery–XII, all boards, home & online), CTAs
   (Book Free Demo, Call), compact enquiry form, trust stats
   (23,000+ tutors, 10+ years, 4.8/5, 6 cities)
4. Trust badges — ISO 9001:2015 (QMS260199), UDYAM (UDYAM-HR-10-0078219),
   Trademark (TM 7457673)
5. Popular courses — 6 cards → course pages
6. Services grid — 8 cards → service pages
7. Why RBM — verified tutors, personalized plan, flexible timing, progress
   reports, transparent fees
8. How it works — 4 steps (enquire → free demo → tutor match → progress)
9. Subjects grid
10. Locations — city cards + top area links
11. Testimonials — 3–6 cards
12. Tutor CTA band — "Are you a teacher?" → tutor registration
13. Blog preview — latest 3
14. FAQ (6–8, FAQPage schema)
15. Final CTA + footer

### 5.2 About

Story, mission, certifications (with certificate numbers), tutor network,
quality process, coverage, team note, CTA. Organization/AboutPage schema.

### 5.3 Courses / Services / Subjects detail

Hero (H1, intro, quick facts), body sections, related links, FAQs, enquiry CTA,
breadcrumbs. Course + Service schema where appropriate.

### 5.4 Locations

- **Index:** city cards with area links, coverage map description, enquiry CTA.
- **City:** H1 "Home Tuition in [City]", areas served, in-demand subjects,
  boards, tutor stats, city FAQs, links to area pages.
- **Area:** H1 "Home Tuition in [Area]", unique intro, nearby schools,
  popular subjects/classes, how tutor matching works locally, area FAQs,
  links to sibling areas + courses, enquiry form.

### 5.5 Contact

NAP (phone, tutor phone, email, address: A-116, First Floor, Tower A, Urbtech
Trade Center, Sector 132, Noida, UP 201304), split layout with full enquiry
form, map embed (lazy), opening hours, socials, FAQ.

### 5.6 Tutor registration (3 steps)

- **Step 1 — Personal:** full name, phone, email, city, area, highest
  qualification, experience (years), mode preference.
- **Step 2 — Teaching:** classes (multi-select Nursery–XII), subjects
  (multi-select), boards, languages, expected fee range, availability.
- **Step 3 — Review & submit:** summary, resume link or upload, consent,
  submit. Success state: "Application received — team reviews within 24–48h."

Progress indicator, per-step validation, back/next, state persisted in-session,
honeypot spam protection, Web3Forms submission with distinct subject line.

---

## 6. Forms (Web3Forms)

- Endpoint: `https://api.web3forms.com/submit`
- Access key: `NEXT_PUBLIC_WEB3FORMS_KEY` in `.env.local` (never committed).
- Shared hidden fields: `access_key`, `botcheck`, `subject`, `from_name`,
  `replyto`.
- **Student enquiry** fields: parent/student name*, phone*, email, class*,
  board, subject(s), city*, area, mode (home/online), message, consent*.
- **Tutor registration** fields: all wizard data, submitted as one payload with
  `subject: "New Tutor Application — [Name] — [City]"`.
- **Contact form** fields: name*, email*, phone, message*.
- UX: inline validation, loading state, success/error banners, no redirect.
- Spam: honeypot field + Web3Forms built-in captcha option to be enabled in
  dashboard.
- File uploads (resume): optional; if enabled, Web3Forms attachment limits apply
  (max 5 files / 5MB each on paid plan — confirm plan before enabling).
- Deliverability: forms send to `info@rbmtuition.com`; confirm mailbox and add
  Web3Forms sender to allowlist.
- GA4 events: `generate_lead` (enquiry), `tutor_application`, `call_click`,
  `whatsapp_click`, `form_step_complete`.

---

## 7. SEO plan

### 7.1 Technical foundation

- App Router with statically generated pages (`generateStaticParams` for all
  courses/services/subjects/cities/areas/blog posts).
- Single `metadataBase`, per-page `title`/`description`/`canonical`,
  OpenGraph + Twitter cards, dynamic OG image for blog posts (optional).
- `sitemap.ts` — all routes, `lastModified`, priorities; `robots.ts` — allow
  all, disallow `/api/`, link sitemap.
- Semantic HTML, one H1 per page, logical H2/H3, descriptive alt text.
- `next/font` self-hosted fonts, `next/image` with dimensions (zero CLS),
  lazy-loaded map/video.
- No client-side rendering for primary content; forms only are client
  components.
- Trailing-slash policy, lowercase URLs, HTTPS, www → apex canonical decision.
- 404 page with search/links; no soft 404s.

### 7.2 Structured data (JSON-LD)

| Page | Schema |
|---|---|
| Global | `EducationalOrganization` / `LocalBusiness` (NAP, geo, hours, sameAs) + `WebSite` (SearchAction optional) |
| Home | Organization + FAQPage |
| About | AboutPage + Organization |
| Course detail | Course + BreadcrumbList |
| Service detail | Service + BreadcrumbList |
| Area/City | LocalBusiness (areaServed) + FAQPage + BreadcrumbList |
| Blog post | Article/BlogPosting + BreadcrumbList |
| Contact | ContactPage + LocalBusiness |
| Tutor registration | WebPage (no special schema) |

### 7.3 On-page conventions

- Title template: `%s | RBM Tuition` (≤ 60 chars), home title:
  "Home Tuition in Delhi NCR | Home Tutors Near You — RBM Tuition".
- Meta descriptions 140–160 chars with location + outcome + CTA.
- H1 includes primary keyword + location; body includes semantic variants
  (home tutor, private tutor, tuition teacher, personal tutor).
- Internal linking: every area page ↔ nearby areas, relevant courses, services,
  contact; every course ↔ subjects, city pages, blog.
- Breadcrumbs on all inner pages, visible + schema.
- Image file names and alts keyword-aware but natural.
- Keyword map: one primary keyword per URL; no cannibalization
  (e.g., home tuition vs one-to-one tuition vs online tuition).

### 7.4 Local SEO (off-site)

- Google Business Profile: verify/optimize for Noida HQ, add services, photos,
  posts, review requests.
- NAP consistency across site, GBP, Justdial, Sulekha, social profiles.
- Reviews: collect and display real testimonials; no invented review counts or
  aggregate ratings in schema unless backed by genuine review data.
- Location pages should reference real local landmarks/schools, not fake
  addresses.

### 7.5 Migration from WordPress (critical)

Map current URLs with 301 redirects to preserve rankings:

| Old | New |
|---|---|
| `/` | `/` |
| `/about-us/` | `/about` |
| `/services/` | `/services` |
| `/blog/` | `/blog` |
| `/tutor-registration/` | `/tutor-registration` |
| `/contact/` | `/contact` |
| `/privacy-policy/` | `/privacy-policy` |
| `/terms-conditions/` | `/terms` |
| `/library/` | `/blog` (or 410 if not relevant) |
| `/payment/` | external payment URL (or new `/payment` note page) |
| `/wp-content/*` assets in use | copy to new `/public` |
| Individual blog posts | per-post 301 map (requires old sitemap export) |

Also: export current sitemap + top landing pages from GSC before cutover; keep
old sitemap accessible briefly; submit new sitemap; monitor 404s for 30 days.

### 7.6 Content & keyword plan (sample)

| Page | Primary keyword | Secondary |
|---|---|---|
| Home | home tuition Delhi NCR | home tutor near me, private tuition Delhi |
| `/courses/jee` | JEE home tuition Delhi NCR | JEE Main tutor, IIT JEE coaching at home |
| `/courses/neet` | NEET home tuition Delhi NCR | NEET biology tutor |
| `/services/home-tuition` | home tuition service | home tuition near me |
| `/services/online-tuition` | online tuition India | online home tutor |
| `/subjects/mathematics` | maths home tuition Delhi NCR | maths tutor near me |
| `/locations/delhi` | home tuition in Delhi | home tutor Delhi |
| `/locations/delhi/south-delhi` | home tuition in South Delhi | home tutor South Delhi |
| `/locations/noida/sector-62` | home tuition in Sector 62 Noida | tutor Sector 62 |
| `/blog/...` | long-tail informational | parent guides, exam comparisons |

---

## 8. Analytics & tracking

- GA4 via `NEXT_PUBLIC_GA_ID` (script loaded after consent/interaction where
  practical; at minimum `afterInteractive`).
- GSC verification via `NEXT_PUBLIC_GSC_VERIFICATION` meta tag.
- Events: `generate_lead`, `tutor_application`, `call_click`,
  `whatsapp_click`, `demo_cta_click`, `form_step_complete`, `blog_read` (75%).
- Track form source (page path + form name) in Web3Forms payload for lead
  attribution.

---

## 9. Accessibility & performance

- WCAG 2.1 AA: color contrast (navy/gold tested), keyboard nav for menus,
  accordion, wizard; focus states; aria labels; reduced-motion support.
- Forms: labeled inputs, error messaging tied with `aria-describedby`, no
  color-only errors.
- Performance budgets: JS < 150KB gzipped on first load; hero image < 200KB;
  fonts subset; no third-party scripts beyond GA4.
- Mobile-first: sticky Call/WhatsApp/Enquire bar; tap targets ≥ 44px.

---

## 10. Delivery plan

| Phase | Work | Output |
|---|---|---|
| 0 | Spec sign-off (this doc) | Approved scope |
| 1 | Scaffold, design tokens, header/footer, shared UI | Running shell |
| 2 | Data layer + home + all templates and routes | Full navigable site |
| 3 | Web3Forms enquiry + tutor wizard | Working conversions |
| 4 | SEO: metadata, schema, sitemap, redirects, analytics | SEO-complete build |
| 5 | QA: lint, build, Lighthouse, forms test, link check | Launch-ready |
| 6 | Deploy + cutover + GSC monitoring | Live |

Estimated build: 2–3 weeks of focused work, contingent on content/assets.

---

## 11. Open items (needed from owner)

1. **Web3Forms access key** (goes in `.env.local`).
2. **Logo files** — SVG or transparent high-res PNG; favicon.
3. **Real photos** — tutoring, students, tutors (or approval for stock).
4. **Domain/DNS access** for cutover; confirm apex vs www and hosting choice.
5. **Google Business Profile + GSC/GA4 access**, or ability to verify.
6. **WhatsApp number** for CTAs (same as +91 92203 88165?).
7. **Payment URL** currently used on the site.
8. **Old blog sitemap export** for redirect mapping.
9. **Testimonials** — permission to publish named reviews; real ratings only.
10. **Fee/pricing copy** — how transparent to be (ranges vs "contact us").
11. **Certificate numbers/logos** usage permission for ISO/UDYAM/TM.

---

## 12. Acceptance criteria

- All routes in §4 exist, statically generated, with unique titles,
  descriptions, canonical, and one H1.
- Enquiry, contact, and tutor wizard submissions arrive at
  `info@rbmtuition.com` with correct subjects and fields; success/error states
  verified.
- Sitemap includes every indexable URL; robots.txt correct; no accidental
  `noindex`.
- Structured data validated (Rich Results Test) for Organization, FAQPage,
  Course, Service, Article, BreadcrumbList.
- 301 redirect map live; zero 404s on top 100 old URLs.
- Lighthouse mobile ≥ 95 Performance/SEO, ≥ 95 Accessibility.
- No horizontal scroll at 320px; nav and wizard fully keyboard-operable.
- GA4 events fire on all primary CTAs and form submissions.
