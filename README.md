# Santa Chimney WordPress Staging

Local homepage assembled from JC's supplied sections, with reusable global navigation, footer, and floating CTA.

## GitHub Pages staging

Publish the committed static output from `main` at `/`. `.nojekyll` disables Jekyll processing. The build generates relative asset and built-page links so the preview works below the repository URL and on localhost. Links to pages not yet built lead to the production website.

The Chimney Sweeping service page is `services/chimney-sweeping/index.html`. Run the build before committing source changes. This repository is a static review preview; it does not deploy changes to WordPress.

Run `npm run build`, `npm run validate`, then `npm start`. Preview at http://localhost:3000.

The first service-page wireframe is at http://localhost:3000/chimney-construction/. Sources are in `src/pages/chimney-construction/`, shared review markup in `src/components/google-reviews.html`, and service styles in `assets/css/service-page.css`. It reuses the homepage statistics and global components. Homepage-specific schema is not included on this service page.

Edit `src/pages/home/` for homepage content, `src/components/` for global components, `assets/css/` for styles, and `assets/js/` for interactions. `index.html` is generated. The build uses only project-local files.

Section order: hero, statistics, services, warning signs, Santa Standard and service process, inspection guidance, service areas, FAQ, final CTA. The global footer and fixed action bar follow.

One schema graph is included. Its FAQ entries are generated from the visible FAQ content. The supplied source graph retains the business's production identifiers. Local staging is noindex/nofollow.

The inactive older mobile action bar is omitted in favor of the approved global action bar. The Santa Standard script owns its process animation; the shared controller owns reveals and counters.

Remote images, booking destinations, and map embed remain as supplied. Internal page destinations are reserved for subsequent page builds. This is a static local preview, not a WordPress implementation or a verified form, booking, analytics, or CRM delivery test. Supplied statistics and credential claims remain client-provided content.
