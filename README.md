# افهم عضلاتك (Omar Fitness) — Static Site

A 16-page Arabic (RTL) fitness/bodybuilding education site: home, exercise library, workout programs, calculators, nutrition reference, blog (3 posts), FAQ, about, contact, and legal pages (privacy, terms, cookies, disclaimer). Pure HTML/CSS/JS — no build step, no external dependencies, no images, so it's already very lightweight.

## Audit summary (performed before this release)

| Check | Result |
|---|---|
| Every page linked correctly | ✅ Pass — all 16 pages cross-linked via a shared nav and footer |
| Nav menu works on all pages | ✅ Pass — identical `.site-nav` markup on every page, responsive via `@media` at 880px/640px |
| Footer links work | ✅ Pass — same footer block, verified on all pages |
| 404s | ✅ None — every `href` resolves to a real file in the project |
| Missing CSS/JS files | ✅ None — all CSS/JS is inline in each page, nothing external to go missing |
| Images loading | ✅ N/A — the site currently has **no `<img>` tags/images**; nothing to break, but see note below |
| Relative paths for GitHub Pages | ✅ Pass — all internal links are relative (`about.html`, not `/about.html`) |
| sitemap.xml | ⚠️ Was missing → **created**, all 16 pages included |
| robots.txt | ⚠️ Was missing → **created**, points to sitemap |
| Broken links | ✅ None found (verified programmatically) |
| Mobile responsiveness | ✅ Pass — nav wraps/stacks below 880px and 640px breakpoints; no JS errors |
| Loading speed | ✅ Good — largest page is ~33KB, no images or external requests, nothing to optimize further |
| GitHub Pages ready | ✅ Pass, after fixes below |
| Google AdSense ready | ⚠️ Was missing → **AdSense script + `ads.txt` template added** (needs your real Publisher ID) |

### Issues found and fixed
1. **Contact form did nothing.** `contact.html` had `onsubmit="return false;"` with no backend — a real visitor's message would silently vanish. It's now wired to a configurable form endpoint (Formspree-style `action`) with a fallback message if you haven't set it up yet. **Action required:** see step 4 below.
2. **Placeholder email.** `contact@example.com` was hardcoded as the visible contact email — replaced with a clearly-flagged placeholder (`info@yourdomain.com`) that you need to swap for your real address.
3. **No `sitemap.xml` / `robots.txt`.** Both created and cross-referenced.
4. **No AdSense script / `ads.txt`.** Both added as placeholders (`ca-pub-XXXXXXXXXXXXXXXX`) — safe no-ops until you insert your real Publisher ID.

### Notes (not bugs, just worth knowing)
- The site has no images anywhere, so there's nothing to check for broken `src` attributes — if you plan to add photos/icons later, keep them in an `assets/images/` folder and use relative paths (`assets/images/file.jpg`) so GitHub Pages resolves them correctly.
- The nav has no hamburger/burger menu; on small screens the links wrap onto new lines instead. This works and looks fine with the current 9 links, but if you add more nav items later, consider a collapsible menu.

---

## Deploying to GitHub Pages

1. **Create/confirm the repo.** All canonical URLs and the sitemap assume the site lives at:
   `https://omar0130y-netizen.github.io/Omar-Fitness/`
   If your username or repo name differs, update the `<link rel="canonical">` tag in every HTML file and the URLs in `sitemap.xml`.

2. **Push the files to the repo root** (or to `/docs` if you prefer — just match your Pages source setting):
   ```bash
   git init
   git add .
   git commit -m "Initial site with SEO/AdSense fixes"
   git branch -M main
   git remote add origin https://github.com/omar0130y-netizen/Omar-Fitness.git
   git push -u origin main
   ```

3. **Enable GitHub Pages.**
   In the repo: **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: `main` / root**. Save, then wait 1–2 minutes for the first deploy. Your site will be live at the canonical URL above.

4. **Wire up the contact form.** Open `contact.html`, find:
   ```html
   <form class="contact-form" id="contactForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
   Sign up at [formspree.io](https://formspree.io) (or any static-form service — Web3Forms, Getform, etc.) and replace `YOUR_FORM_ID` with your real endpoint. Until you do this, the form shows a friendly "not configured yet" message instead of silently failing. Also update the visible email address in the same file (`info@yourdomain.com`).

5. **Submit your sitemap to Google Search Console.**
   Verify ownership of `https://omar0130y-netizen.github.io/Omar-Fitness/`, then submit `sitemap.xml` under **Sitemaps**.

---

## Setting up Google AdSense

1. Apply at [google.com/adsense](https://www.google.com/adsense) with your live GitHub Pages URL. Your site needs to be publicly live (step 3 above) before you apply.
2. Once approved, Google gives you a Publisher ID like `ca-pub-1234567890123456`.
3. **Replace the placeholder in every HTML file.** Each page currently has this in `<head>`:
   ```html
   <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossorigin="anonymous"></script>
   ```
   Do a find-and-replace of `ca-pub-XXXXXXXXXXXXXXXX` → your real ID across all 16 files.
4. **Update `ads.txt`** at the site root the same way — replace `pub-XXXXXXXXXXXXXXXX` with your real ID. This file must be reachable at `https://omar0130y-netizen.github.io/Omar-Fitness/ads.txt`.
5. Add actual `<ins class="adsbygoogle">` ad units wherever you want ads to appear (AdSense's dashboard gives you the exact snippet per ad unit).
6. Your `privacy.html` and `cookies.html` already reference Google's ad policies — review them once ads are live to make sure the disclosures match what you actually serve.

---

## Local preview

No build tools needed. Either open `index.html` directly in a browser, or serve it locally to test relative paths exactly as GitHub Pages will:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000/index.html
```

## File structure

```
index.html                  Home
exercises.html               Exercise library
workouts.html                 Workout programs
calculators.html               BMI / calorie / body-fat / 1RM calculators
nutrition.html                Nutrition reference
blog.html                    Blog index
blog-beginner-guide.html      Post
blog-abs-mistakes.html        Post
blog-sleep-recovery.html      Post
faq.html                     FAQ
about.html                   About
contact.html                 Contact (form + info)
privacy.html / terms.html / cookies.html / disclaimer.html   Legal
sitemap.xml                  All 16 pages for search engines
robots.txt                   Crawler rules + sitemap pointer
ads.txt                      AdSense authorization (needs your Publisher ID)
```
