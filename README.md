# Deepshikha — Portfolio (multi-page)

Split into separate pages that share the same header, particle background,
chatbot, and contact modal via `style.css` and `app.js`.

**Note:** the standalone `projects.html` page from an earlier version is gone —
project write-ups now live nested inside `experience.html`, under the company
where each was delivered. If your live GitHub repo still has an old
`projects.html` file in it, delete it there (Code → click the file → trash-can
icon → commit) so the nav doesn't have a dead link.

## Files to upload — ALL of these, together

- `index.html` (Home)
- `about.html`
- `experience.html` (now includes project write-ups nested under each company)
- `skills.html` (now includes an "OIC — in depth" write-up)
- `certifications.html` (now includes completion dates)
- `education.html`
- `contact.html`
- `style.css`
- `app.js`

Every page links to `style.css` and `app.js` by filename, so they all need to sit
in the same folder (the root of your repo) — don't put them in a subfolder.

## 1. Before you publish — fill in the placeholders

Search across the `.html` files for:

- `+91 XXXXXX` — phone number (in `contact.html`)
- `deepshikha@example.com` — email (in `contact.html` and inside `app.js`'s mailto line)
- `linkedin.com/in/deepshikha` — your real LinkedIn URL (`contact.html`)
- `XXX` — certification completion dates (x3, in `certifications.html`) — replace
  each with the actual month/year you completed OIC Certification, Oracle HCM
  Essentials, and Oracle Agentic AI
- `Add institution & years` (x2, in `education.html`)

## 2. About page says "At Deloitte, I lead..." — worth checking

Deloitte's dates are now Oct 2022 – Oct 2025 and Alithya is Oct 2025 – Present,
so Alithya is your current role. The About page bio text still describes
Deloitte in the present tense ("At Deloitte, I lead the Reports and Extensions
Track..."), which may no longer be accurate. Open `about.html` and adjust that
paragraph to past tense, or to describe your current focus at Alithya, if needed.

## 3. The years-of-experience counter on the Home page

The "X+ Years" figure on the Home page ledger updates itself automatically —
it's calculated in `app.js` from a fixed start date of **3 Oct 2022**. You don't
need to edit this by hand; it recalculates every time the page loads, and will
tick over to the next whole year automatically once you pass each anniversary.
If your career start date ever changes, update the date in `app.js`:
```
var start = new Date(2022, 9, 3); /* year, month(0-indexed), day */
```

## 2. Host it for free on GitHub Pages

1. Repo name must be exactly `<your-github-username>.github.io`.
2. Upload all 10 files listed above via "Add file → Upload files" — select them
   all at once and drag them in together, then commit.
3. Settings → Pages → Source: "Deploy from a branch", branch `main`, folder `/ (root)`. Save.
4. Wait 1–2 minutes, visit `https://<your-github-username>.github.io`.

Every nav link (Home / About / Experience / Projects / Skills / Certifications /
Education / Contact) now loads its own page instead of scrolling — and the current
page's link is highlighted in gold in the header.

## 3. Making the contact form actually send email (optional)

Same as before — sign up free at https://formspree.io, then in `app.js` swap the
`cmSubmit()` function's mailto logic for a `fetch()` POST to your Formspree endpoint.
