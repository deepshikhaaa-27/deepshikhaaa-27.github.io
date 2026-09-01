# Deepshikha — Portfolio

A single-file, no-build portfolio site (`index.html` has everything — HTML, CSS, and JS).
Free to host, no server needed.

## 1. Before you publish — fill in the placeholders

Open `index.html` and search for these and replace with your real details:

- `+91 XXXXXX` — phone number
- `deepshikha@example.com` — email (appears twice: Contact list + the mailto form)
- `linkedin.com/in/deepshikha` — your real LinkedIn URL
- `Add dates` (x2, in the Experience section) — employment dates for Deloitte and Alithya
- `Add institution & years` (x2, in Education) — your college/university names and years

## 2. Host it for free on GitHub Pages (recommended)

1. Create a free GitHub account at https://github.com if you don't have one.
2. Create a new **public** repository — name it exactly `<your-github-username>.github.io`
   (e.g. if your username is `deepshikha-dev`, name the repo `deepshikha-dev.github.io`).
   This special name gives you a clean root URL.
3. Upload `index.html` (and `README.md` if you like) to that repo — you can drag-and-drop
   files directly on the GitHub website via "Add file → Upload files", no git command line needed.
4. Commit the upload.
5. Go to the repo's **Settings → Pages**. Under "Build and deployment", set Source to
   **Deploy from a branch**, branch `main`, folder `/ (root)`. Save.
6. Wait 1–2 minutes, then your site is live at:
   `https://<your-github-username>.github.io`
7. Share that link with recruiters — it just works, no login required to view it.

### If you'd rather use the command line
```bash
git init
git add index.html
git commit -m "Portfolio site"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-username>.github.io.git
git push -u origin main
```
Then enable Pages in Settings as in step 5 above.

## 3. Alternative free hosts (if you don't want the github.io URL)

- **Netlify** (https://netlify.com) — drag-and-drop the `index.html` file onto their dashboard,
  get an instant `*.netlify.app` URL, can add a custom domain free.
- **Vercel** (https://vercel.com) — similar drag-and-drop deploy, `*.vercel.app` URL.

Both let you connect a GitHub repo for auto-redeploy on every push, same as GitHub Pages.

## 4. Making the contact form actually send email (optional)

Right now "Send message" opens the visitor's email client with your message pre-filled — this
works with zero setup. If you'd rather receive submissions directly without the visitor needing
an email client open:

1. Sign up free at https://formspree.io and create a form — you'll get a form endpoint URL.
2. In `index.html`, replace the `<form id="contactForm" onsubmit="return handleContactSubmit(event)">`
   tag with `<form id="contactForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">`
   and delete the `handleContactSubmit` JS function — Formspree handles the rest.

## 5. Custom domain (optional)

Once live on GitHub Pages, you can point a purchased domain (e.g. `deepshikha.dev`) at it for
free — GitHub's docs: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site
