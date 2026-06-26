# Portfolio_PES — Project Memory

> Read this file at the start of any new session to get fully caught up.
> Last updated: 2026-06-26

---

## 1. What This Is

A **PES (Professional Engineers & Society) E-Portfolio** for **Joshua Jeremiah Jebaretnam (Student ID: 0353225)**, studying Bachelor of Mechanical Engineering (Hons) at Taylor's University, Intake: March 2023.

This is an academic portfolio requirement. It needs to be deployed as a public website so it can be shared via URL.

---

## 2. Repository & Deployment

- **Local path:** `/Users/joshuajeremiahjebaretnam/Visual Code Studio Projects/Portfolio_PES/`
- **GitHub repo:** `https://github.com/joshuajebapromo/Portfolio_PES_Repo`
- **Remote added:** yes (`origin` → above URL)
- **Deployment target:** GitHub Pages (not yet enabled — see Pending Steps)
- **Branch:** `main`
- **Git status at pause:** uncommitted changes exist (all work from this session is NOT yet committed or pushed)

To deploy when ready:
1. `git add index.html css/styles.css js/main.js MEMORY.md`
2. `git commit -m "..."`
3. `git push origin main`
4. On GitHub → repo Settings → Pages → Source: Deploy from branch → `main` / `/ (root)` → Save
5. Live at: `https://joshuajebapromo.github.io/Portfolio_PES_Repo/`

---

## 3. File Structure

```
Portfolio_PES/
├── index.html          ← entire portfolio (556 lines, ~75KB — large due to base64 photo)
├── css/
│   └── styles.css      ← all styling (~200 lines)
├── js/
│   └── main.js         ← all interactivity (33 lines, 3 functions)
├── assets/             ← EMPTY — intended for supporting documents/images
├── .gitignore          ← ignores .DS_Store and Thumbs.db
├── README.md           ← placeholder only ("Professional Engineering & Society Assignment")
└── MEMORY.md           ← this file
```

---

## 4. Architecture Overview

### Single-Page Application (SPA)
The portfolio is a **single HTML file** that simulates navigation between sections using JavaScript. Only one `<section>` is visible at a time (`display: none` / `display: block` + `.active` class). The nav bar and footer are always present in the DOM.

### Layout System
`body` is `display: flex; flex-direction: column; min-height: 100vh`. This makes the body fill the full screen, with the nav at the top, the active section growing to fill the middle, and the footer at the bottom.

**Nav height** is a CSS variable: `--nav-h: 55px`. Everything that needs to be "viewport minus nav" uses `calc(100vh - var(--nav-h))`.

### Three Types of Section Behaviour

| Class | Sections | Behaviour |
|---|---|---|
| `page-section` (default) | SWOT, PO Attainment, Appendix, PO Evaluation | Normal scroll, content can be any height |
| `page-section fit-section` | About Me, Program Outcome | Locked to exactly `100vh - nav`. Content is compacted to fit without scroll. |
| `page-section paged-section` | Home, Mission Statement, Self Assessment | 2-slide layout. Fills `100vh - nav`. Arrow button transitions between slide 1 and slide 2. |

### Paged Section (2-Slide) Mechanism
```
<section class="paged-section">          ← height: 100vh-nav, overflow:hidden
  <div class="slide-track" id="X-track"> ← CSS transform drives slide position
    <div class="slide">...</div>          ← Slide 1 (first view)
    <div class="slide">...</div>          ← Slide 2 (revealed by arrow)
  </div>
</section>
```
- `goSlide('X-track', 1)` → `translateY(-100%)` (shows slide 2)
- `goSlide('X-track', 0)` → `translateY(0)` (shows slide 1)
- Navigating via nav bar resets ALL slide tracks to position 0
- Arrow button `⌄` bounces downward, `⌃` bounces upward (CSS keyframe animation)
- Arrow fills red on hover

---

## 5. Section-by-Section Breakdown

### Home (`#home`) — `paged-section`
- **Slide 1:** Full-viewport dark hero banner with title "Professional Engineers & Society" + Joshua's name/ID. Red radial glow accent.
- **Slide 2:** White background, centered "Welcome" heading + 2 paragraphs of intro text.

### About Me (`#about`) — `fit-section`
- **Layout:** 2-column grid — left (contact, objective, education, skills, memberships) + right (profile photo).
- **Photo:** Embedded as a `data:image/jpeg;base64` JPEG (~74KB of the 75KB total file size). This is why `index.html` is large.
- **Contact details currently use placeholder values** — need real email/phone (see Pending).
- Compacted with section-specific CSS overrides (`#about.fit-section ...`).

### Mission Statement (`#mission`) — `paged-section`
- **Slide 1:** S.A.T. cards (3-column grid — Specific, Attainable, Timely).
- **Slide 2:** M.R. cards (Measurable, Realistic) + Personal Mission Statement quote block.

### Personal S.W.O.T. Analysis (`#swot`) — default
- 4-column grid: Strengths 💪, Weakness ⚠️, Opportunities 🚀, Threats (4th card).
- Normal scroll section, no restrictions.

### Program Outcome (`#outcome`) — `fit-section`
- 2×2 card grid: Cognitive Skills (PO1,2,4,12), Technical Skills (PO3,5), Soft Skills (PO9,10), Professional Skills (PO6,7,8,11).
- Each card has a **"Learn More" toggle button** that smoothly expands a detail panel (`max-height` transition). Button label flips to "Close ▴" when open, back to "Learn More" when closed.
- Section fits in one viewport (toggles closed).

### PO Attainment (`#attainment`) — default
- 2×2 card grid matching the 4 PO groupings above.
- Same toggle/detail panel pattern as Program Outcome.
- Normal scroll section.

### Appendix (`#appendix`) — default
- 4-column grid of 12 cards (PO1–PO12), each with an emoji, PO label, and short description.
- **Cards are display-only — no links to actual documents yet** (see Pending).
- Normal scroll section.

### Self Assessment Evaluation (`#selfassess`) — `paged-section`
- **Slide 1:** Student info bar (Name, Student Number, Programme, Intake) + horizontally-scrollable PLO WCGPA table with all 8 semesters (Mar 23 – Feb 26) and PLO1–PLO12 scores.
- **Slide 2:** SVG radar chart showing PLO WCGPA values (plotted against 0–4 scale, 12 axes). Labels show "PLO1 (TGC1)" etc.
- **Real data** from Joshua's official transcript — WCGPA row: PLO1=2.67, PLO2=2.57, PLO3=3.96, PLO4=2.92, PLO5=3.31, PLO6=3.95, PLO7=2.67, PLO8=3.64, PLO9=4.00, PLO10=2.95, PLO11=3.86, PLO12=3.10.

### Programme Outcome Evaluation (`#poevaluation`) — default
- 12 eval items (PO1–PO12), each with a heading, category tag (Cognitive/Technical/Soft/Professional), and a paragraph of reflective text.
- Long scroll section — this is intentional, it's a detailed writeup.

---

## 6. CSS Architecture

**Design tokens** (CSS variables in `:root`):
```css
--red: #C0392B        /* primary brand colour */
--red-dark: #922B21   /* button hover */
--red-light: #E74C3C  /* accent / footer highlights */
--black: #111
--gray-dark: #2C2C2C  /* dark card backgrounds */
--gray-mid: #666      /* body text, labels */
--gray-light: #F5F5F5 /* card/section backgrounds */
--border: #E0E0E0
--white: #fff
--nav-h: 55px         /* used in all height calculations */
```

**Key layout classes:**
- `.content-wrap` — `max-width: 1200px`, centered, `padding: 48px 32px`
- `.sec-heading` — centred section title + red underline divider
- `.detail-panel` — animated expand/collapse via `max-height` + `opacity` transition
- `.fit-section .content-wrap` — overrides to `padding: 20px 32px`, `display: flex; flex-direction: column`

**Responsive breakpoints:**
- `≤1100px`: SWOT drops to 2-col, Appendix to 3-col
- `≤900px`: SAT drops to 2-col, About Me photo column drops, Appendix to 2-col
- `≤600px`: most grids go 1-col, nav font shrinks further

**Dead CSS to clean up later:**
- `.dropdown-menu` rules — dropdown HTML was never added to the nav

---

## 7. JavaScript (js/main.js)

Three functions:

```js
switchPage(id)
// Shows the section with the given ID, hides all others.
// Updates nav link active state.
// Resets all .slide-track elements to translateY(0).

goSlide(trackId, index)
// Moves the slide-track to show slide at `index` (0 or 1).
// Uses translateY(-index * 100%).

toggleDetail(id)
// Toggles .open class on a detail panel (smooth max-height animation).
// Finds the triggering button/anchor and flips its label:
//   closed → "Learn More" / "Learn More ›"
//   open   → "Close ▴"
```

---

## 8. Known Issues & Bugs

### Minor / Cosmetic
1. **Footer visibility on paged/fit sections**: `body` can still be scrolled on paged and fit sections (the section is the right height, but the footer sits below it in the DOM). Scrolling down past a paged/fit section reveals the footer. This is low-priority but slightly odd — consider `body { overflow: hidden }` only when a paged/fit section is active, or move the footer inside non-paged sections only.

2. **About Me overflow on short screens**: If viewport height < ~700px, the `fit-section` clips content (hidden overflow). Content is not lost — it's just hidden below the fold with no scroll access. On most laptops (800px+) this is fine. May need a min-height fallback or scroll override for smaller screens.

3. **`rowspan="2"` on Self Assessment table header**: The `<th rowspan="2">` on the Semester column is technically unnecessary since the table only has one header row now (PLO name + TGC + description are all in one `<th>` using `.tgc-sub` and `.desc-sub` spans). It's harmless but can be cleaned up.

4. **Arrow character rendering**: The slide arrows use Unicode characters `&#x2304;` (⌄) and `&#x2303;` (⌃). These render correctly in Chromium/Safari but may look slightly different cross-browser. Consider using SVG arrows or a chevron icon (`›`, `‹`, `∨`, `∧`) as fallback.

5. **Dead CSS**: `.dropdown-menu` styles exist in `styles.css` with no corresponding HTML. Can be removed.

### Content / Data
6. **Placeholder contact info in About Me**: The following are placeholders and need to be replaced with real details:
   - Email: `joshua.jebaretnam@email.com`
   - Phone: `+60 12-345 6789`

7. **Appendix cards have no links**: The 12 appendix cards (PO1–PO12) are display-only. No actual documents, PDFs, or links have been attached. When actual evidence files are ready, they should go in `assets/` and be linked from these cards.

8. **PO Attainment "Learn More" panels**: The detail text in all 4 PO Attainment cards is generic placeholder text. This should be replaced with Joshua's specific evidence descriptions / links to actual documents.

---

## 9. Pending / Next Steps

Joshua mentioned these before pausing:

### Immediate
- [ ] **Replace placeholder contact info** (email + phone) in About Me section
- [ ] **Push to GitHub and enable GitHub Pages** (deployment — steps in Section 2 above)
- [ ] **Add real evidence documents** to `assets/` folder and link them from Appendix + PO Attainment cards
- [ ] **Review all content for accuracy** — much of the PO Evaluation section text is good but may need tweaking for specificity

### Content Changes (mentioned but not yet done)
- [ ] Joshua said there were "changes to be made for the html" when we first started — he paused before specifying what they were. Ask him when he returns.

### Nice-to-Have / Polish
- [ ] Fix footer visibility on paged/fit sections (see Known Issues #1)
- [ ] Add a mobile hamburger menu (currently nav overflows-x scrolls on mobile)
- [ ] Add real hyperlinks in Appendix cards once documents are ready
- [ ] Remove dead `.dropdown-menu` CSS
- [ ] Consider extracting the base64 photo to `assets/photo.jpg` to reduce `index.html` size from 75KB to ~1KB
- [ ] Add a `<meta description>` tag for social sharing / SEO when deployed

---

## 10. Session History Summary

Everything built in this conversation (in order):

1. **Codebase setup** — Copied `/Downloads/joshua-pes-portfolio_3.html` into project folder, split inline CSS → `css/styles.css` and inline JS → `js/main.js`, leaving clean `index.html` referencing external files.

2. **Responsive layout overhaul** — Fixed horizontal overflow (`overflow-x: hidden`), made nav scrollable on smaller screens, set `body` to flex column so sections fill viewport, fixed grid breakpoints.

3. **Self Assessment section rebuild** — Replaced placeholder tick-box table with real PLO WCGPA data from Joshua's transcript (8 semesters, Mar 23–Feb 26). Rebuilt radar chart SVG with correct WCGPA values. Added student info bar.

4. **Removed editability** — Stripped all `contenteditable="true"` attributes (0 remaining). Removed the "✏️ Click any text to edit" hint div, its CSS, and its JS.

5. **Toggle fix** — Made Program Outcome and PO Attainment detail panels animate open/closed individually via `max-height` CSS transition (smooth collapse). Button label flips "Learn More" ↔ "Close ▴".

6. **Card sizing** — Changed `po-grid` and `poa-grid` from 4-column to 2-column so cards are wider and more spacious.

7. **Fit sections** — About Me and Program Outcome (with toggles closed) locked to exactly one viewport height via `.fit-section` class + section-specific compact CSS overrides.

8. **Paged sections** — Home, Mission Statement, and Self Assessment converted to 2-slide paged layout with animated bouncing arrow between slides. `goSlide()` function added to JS. Nav switch resets all slides to position 0.
