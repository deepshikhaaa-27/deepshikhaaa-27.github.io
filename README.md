# Deepshikha — Portfolio (multi-page)

Now split into separate pages that share the same header, particle background,
chatbot, and contact modal via `style.css` and `app.js`.

## Files to upload — ALL of these, together

- `index.html` (Home)
- `about.html`
- `experience.html`
- `projects.html`
- `skills.html`
- `certifications.html`
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
- `Add dates` (x2, in `experience.html`) — employment dates for Deloitte and Alithya
- `Add institution & years` (x2, in `education.html`)

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
