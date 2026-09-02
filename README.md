# Deepshikha — Portfolio (multi-page)

Split into separate pages that share the same header, particle background,
chatbot, and contact modal via `style.css` and `app.js`.

**Note:** the standalone `projects.html` page from an earlier version is gone —
project/work write-ups now live nested inside `experience.html`, under the
company where each was delivered. If your live GitHub repo still has an old
`projects.html` file in it, delete it there (Code → click the file → trash-can
icon → commit) so the nav doesn't have a dead link.

## Files to upload — ALL of these, together

- `index.html` (Home)
- `about.html` (redesigned: profile card, proficiency bars, SME goals, mini timeline)
- `experience.html` (Experience & Work — write-ups nested under each company)
- `skills.html` (includes an "OIC — in depth" write-up)
- `certifications.html` (includes completion dates)
- `education.html`
- `contact.html`
- `style.css`
- `app.js`

Every page links to `style.css` and `app.js` by filename, so they all need to sit
in the same folder (the root of your repo) — don't put them in a subfolder.

## 1. Placeholders to fill in before publishing

- `+91 XXXXXX` — phone number (in `contact.html`)
- `deepshikha@example.com` — email (in `contact.html` and inside `app.js`'s mailto line)
- `linkedin.com/in/deepshikha` — your real LinkedIn URL (`contact.html`)
- `XXX` — certification completion dates (x3, in `certifications.html`)
- `Add institution & years` (x2, in `education.html`, appears twice — once on
  Education page, once in the About page's Education card)
- `XX%` (x6, in `about.html`) — your real proficiency percentage per skill.
  Update it in **two** places for each: the `<span class="prof-pct">XX%</span>`
  text, and the matching `style="width:0%;"` on the bar right below it — set
  both to the same number (e.g. `85%`).
- `XXXX` (x4 cards × 3 fields, in `about.html`) — the "SME Goals" section.
  Replace with your real career goals (icon/label, title, one-line description).

## 2. About page's avatar & GitHub button

- The avatar is currently a plain "D" initial circle. To use a real photo:
  add an image file (e.g. `photo.jpg`) to the repo, then in `about.html` swap
  `<div class="avatar-circle">D</div>` for
  `<img src="photo.jpg" class="avatar-circle" style="object-fit:cover;">`.
- No GitHub button by default. To add one, insert this inside the
  `.profile-actions` block in `about.html`:
  `<a href="https://github.com/yourusername" class="btn btn-ghost" style="width:100%; text-align:center;">GitHub</a>`
- The LinkedIn/Email buttons on this page link to `contact.html` for now —
  once you've filled in your real LinkedIn URL there, you may prefer pointing
  these buttons directly at it instead.

## 3. Home page's resume button

The Home page closing section has a "View Resume" button linking to `resume.pdf`.
That file isn't included — export your resume as PDF, name it exactly
`resume.pdf`, and upload it to the same repo root as the other files. Until you
do, the button will show a 404 when clicked.

## 4. The years-of-experience badge

The "X+ years" badge on the Home page (under your title) updates itself
automatically — calculated in `app.js` from a fixed start date of **3 Oct
2022**. It recalculates every page load and will tick over on each
anniversary with no manual editing needed. If your career start date ever
changes, update it in `app.js`:
```
var start = new Date(2022, 9, 3); /* year, month(0-indexed), day */
```

## 5. Host it for free on GitHub Pages

1. Repo name must be exactly `<your-github-username>.github.io`.
2. Upload all files listed above via "Add file → Upload files" — select them
   all at once and drag them in together, then commit.
3. Settings → Pages → Source: "Deploy from a branch", branch `main`, folder `/ (root)`. Save.
4. Wait 1–2 minutes, visit `https://<your-github-username>.github.io`.

Every nav link (Home / About / Experience / Skills / Certifications /
Education / Contact) loads its own page — the current page's link is
highlighted in gold in the header.

## 6. Making the contact form actually send email (optional)

Sign up free at https://formspree.io, then in `app.js` swap the `cmSubmit()`
function's mailto logic for a `fetch()` POST to your Formspree endpoint.
