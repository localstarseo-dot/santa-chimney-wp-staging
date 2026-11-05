import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
// Relative links work both on localhost and below a GitHub Pages project path.
function previewLinks(html, output) {
  const builtRoutes = new Set(["/", "/chimney-construction/", "/services/chimney-sweeping/"]);
  const aliases = { "/chimney-sweeping/": "/services/chimney-sweeping/" };
  return html.replace(/\b(href|src)="(\/(?!\/)[^"]*)"/g, (_, attribute, original) => {
    const route = aliases[original] || original;
    if (route.startsWith("/assets/") || builtRoutes.has(route)) {
      const path = relative(dirname(output), route.slice(1)) || ".";
      return `${attribute}="${path}${route.endsWith("/") ? "/" : ""}"`;
    }
    const serviceRoutes = new Set(["/chimney-repair/", "/chimney-inspections/"]);
    return `${attribute}="https://www.santachimneys.com${serviceRoutes.has(route) ? "/services" : ""}${route}"`;
  }).replace(/[ \t]+$/gm, "").trimEnd() + "\n";
}
const navbarSource = resolve(root, "src/components/global-header.html");
const footerSource = resolve(root, "src/components/global-footer.html");
const footerCtaSource = resolve(root, "src/components/global-footer-cta.html");

const [navbar, footer, footerCta] = await Promise.all([
  readFile(navbarSource, "utf8"),
  readFile(footerSource, "utf8"),
  readFile(footerCtaSource, "utf8"),
]);

const sections = await Promise.all([
  "hero", "statistics", "services", "warning-signs", "santa-standard",
  "inspection", "service-areas", "faq", "final-cta"
].map(name => readFile(resolve(root, `src/pages/home/${name}.html`), "utf8")));
const schemaSource = await readFile(resolve(root, "src/pages/home/schema.html"), "utf8");
const schemaData = JSON.parse(schemaSource.match(/<script[^>]*>([\s\S]*?)<\/script>/i)[1]);
const plainText = value => value.replace(/<[^>]*>/g, " ").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();
const faqSchema = schemaData["@graph"].find(node => node["@type"] === "FAQPage");
faqSchema.mainEntity = [...sections[7].matchAll(/<details class="scs-lp-faq__item"[^>]*>([\s\S]*?)<\/details>/g)].map(([, faq]) => ({
  "@type": "Question",
  name: plainText(faq.match(/<h3>([\s\S]*?)<\/h3>/)[1]),
  acceptedAnswer: {
    "@type": "Answer",
    text: plainText(faq.match(/<div class="scs-lp-faq__answer">([\s\S]*?)<\/div>/)[1])
  }
}));
const schema = `<script type="application/ld+json">${JSON.stringify(schemaData).replace(/</g, "\\u003c")}</script>`;

const document = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex,nofollow">
  <title>Santa Chimney Sweep | WordPress Staging</title>
  <link rel="stylesheet" href="/assets/css/foundations.css">
  <link rel="stylesheet" href="/assets/css/site.css">
  <link rel="stylesheet" href="/assets/css/global-footer.css">
  <link rel="stylesheet" href="/assets/css/global-header.css">
  <link rel="stylesheet" href="/assets/css/home.css">
</head>
<body>
  ${navbar.trim()}
  <main id="main-content">
    ${sections.join("\n")}
  </main>
  ${footer.trim()}
  ${footerCta.trim()}
  ${schema.trim()}
  <script src="/assets/js/santa-standard.js" defer></script>
  <script src="/assets/js/animation-controller.js" defer></script>
  <script src="/assets/js/site.js" defer></script>
</body>
</html>
`;

await writeFile(resolve(root, "index.html"), previewLinks(document, "index.html"));

const constructionSections = await Promise.all([
  "src/pages/chimney-construction/hero.html",
  "src/pages/chimney-construction/project-fit.html",
  "src/pages/home/statistics.html",
  "src/components/google-reviews.html",
  "src/pages/chimney-construction/faq.html"
].map(path => readFile(resolve(root, path), "utf8")));
const serviceHeroTemplate = await readFile(resolve(root, "src/components/service-hero.html"), "utf8");
function adoptServiceHero(original) {
  const title = original.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)[1];
  const eyebrow = original.match(/<span class="scs-sp-hero__eyebrow">([\s\S]*?)<\/span>/)[1];
  const description = original.match(/<(p|div) class="scs-sp-hero__description">([\s\S]*?)<\/\1>/)[2];
  const bookingLabel = original.match(/<span>(Discuss Your Chimney Project|Book Chimney Sweeping)<\/span>/)[1];
  return serviceHeroTemplate
    .replace('<p class="sc-ads-hero__eyebrow">', `<nav class="sc-service-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">›</span><a href="https://www.santachimneys.com/services/">Services</a><span aria-hidden="true">›</span><span aria-current="page">${plainText(title).replace(/ in Austin, TX$/, "")}</span></nav><p class="sc-ads-hero__eyebrow">`)
    .replace(/<h1([^>]*)>[\s\S]*?<\/h1>/, (_, attrs) => `<h1${attrs}>${title}</h1>`)
    .replace(/<p class="sc-ads-hero__eyebrow">[\s\S]*?<\/p>/, () => `<p class="sc-ads-hero__eyebrow">${eyebrow}</p>`)
    .replace(/<p class="sc-ads-hero__copy">[\s\S]*?<\/p>/, () => `<div class="sc-ads-hero__copy">${description}</div>`)
    .replace('Book Service Online', bookingLabel)
    .replace('aria-label="Book chimney cleaning service online"', `aria-label="${bookingLabel}"`);
}
constructionSections[0] = adoptServiceHero(constructionSections[0]);
const constructionDocument = document
  .replace("Santa Chimney Sweep | WordPress Staging", "Chimney Construction in Austin, TX | Santa Chimney Sweep")
  .replace('/assets/css/home.css', '/assets/css/service-page.css')
  .replace('</head>', '<link rel="stylesheet" href="/assets/css/google-reviews.css">\n</head>')
  .replace('</head>', '<link rel="stylesheet" href="/assets/css/service-hero.css">\n</head>')
  .replace(/<main id="main-content">[\s\S]*?<\/main>/, () => `<main id="main-content">${constructionSections.join("\n")}</main>`)
  .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, "")
  .replace('/assets/js/santa-standard.js', '/assets/js/google-reviews.js')
  .replace('</body>', '<script src="/assets/js/service-hero.js" defer></script>\n</body>');
await mkdir(resolve(root, "chimney-construction"), { recursive: true });
await writeFile(resolve(root, "chimney-construction/index.html"), previewLinks(constructionDocument, "chimney-construction/index.html"));

const sweepingSections = await Promise.all([
  "hero", "signs", "process", "trust", "service-areas", "faq"
].map(name => readFile(resolve(root, `src/pages/chimney-sweeping/${name}.html`), "utf8")));
sweepingSections[0] = adoptServiceHero(sweepingSections[0])
  .replace(/<nav class="sc-service-breadcrumb"[\s\S]*?<\/nav>/, "")
  .replace(/<p class="sc-ads-hero__eyebrow">[\s\S]*?<\/p>/, "");
let sweepingReviews = await readFile(resolve(root, "src/components/google-reviews.html"), "utf8");
const reviewCards = [...sweepingReviews.matchAll(/<li class="scs-review10__card">[\s\S]*?<\/li>/g)].map(match => match[0]);
if (reviewCards.length) {
  const ordered = reviewCards.map((html, index) => ({ html, index, cleaning: /cleaned|cleaning|swept/i.test(html) }))
    .sort((a, b) => Number(b.cleaning) - Number(a.cleaning) || a.index - b.index);
  let cardIndex = 0;
  sweepingReviews = sweepingReviews.replace(/<li class="scs-review10__card">[\s\S]*?<\/li>/g, () => ordered[cardIndex++].html);
}
sweepingReviews = sweepingReviews.replace("Google Reviews From Austin-Area Customers", "What Austin-Area Customers Say");
sweepingSections.splice(4, 0, sweepingReviews);
const ourWork = await readFile(resolve(root, "src/pages/chimney-sweeping/our-work.html"), "utf8");
sweepingSections.splice(2, 0, ourWork);
sweepingSections[1] = sweepingSections[1].replaceAll('#sweeping-process', '#our-work');
const sweepingStatistics = (await readFile(resolve(root, "src/pages/home/statistics.html"), "utf8"))
  .replace('class="scs-lp scs-lp--dark"', 'class="scs-lp scs-lp--white scs-stats-centered"')
  .replace(/<header class="scs-stats-pro__intro"[^>]*>[\s\S]*?<\/header>/, '<header class="scs-stats-pro__intro"><span class="scs-stats-pro__eyebrow">Why Santa Chimney Sweep</span><h2 class="scs-stats-pro__title" id="scs-service-stats-title">Chimney Care Experience in Numbers</h2><p class="scs-stats-pro__description">A summary of the inspection, sweeping, repair, and industry experience supporting Santa Chimney Sweep’s service.</p></header>');
sweepingSections.splice(3, 0, sweepingStatistics);
const mascotBase = "https://www.santachimneys.com/wp-content/uploads/2026/08/";
const mascotImage = file => `<img class="scs-section-mascot" src="${mascotBase}${file}" width="1024" height="1024" alt="" aria-hidden="true" loading="lazy" decoding="async">`;
const mascotPlacements = [
  ["cleaning-problems", "mascot-10-waving-brush.webp"],
  ["sweeping-process", "mascot-04-inspection-clipboard.webp"],
  ["sweeping-standard", "mascot-02-arms-crossed.png"],
  ["scs-reviews", "mascot-01-thumbs-up.png"]
];
for (const [id, file] of mascotPlacements) {
  const index = sweepingSections.findIndex(section => section.includes(`id="${id}"`));
  if (index < 0) continue;
  if (id === "sweeping-process") {
    sweepingSections[index] = sweepingSections[index].replace(
      /(<div class="scs-lp__section-head[^>]*>)([\s\S]*?)(<\/div>)/,
      (_, opening, content, closing) => `<div class="scs-mascot-feature">${opening}${content}${closing}${mascotImage(file)}</div>`
    );
  } else {
    sweepingSections[index] = sweepingSections[index].replace(
      /(<header[^>]*>[\s\S]*?<\/header>)/,
      header => `<div class="scs-mascot-feature">${header}${mascotImage(file)}</div>`
    );
  }
}
const areaIndex = sweepingSections.findIndex(section => section.includes('id="sweeping-service-areas"'));
if (areaIndex >= 0) {
  sweepingSections[areaIndex] = sweepingSections[areaIndex].replace(
    /(<span class="scs-lp__eyebrow">[\s\S]*?)(<nav aria-label="Chimney sweeping service areas">)/,
    (_, copy, nav) => `<div class="scs-mascot-feature"><div>${copy}</div>${mascotImage("mascot-09-service-area-map.webp")}</div>${nav}`
  );
}
const sweepingBooking = await readFile(resolve(root, "src/pages/chimney-sweeping/booking.html"), "utf8");
const reviewsIndex = sweepingSections.findIndex(section => section.includes('id="scs-reviews"'));
sweepingSections.splice(reviewsIndex, 0, sweepingBooking);
const [customerReviews] = sweepingSections.splice(
  sweepingSections.findIndex(section => section.includes('id="scs-reviews"')), 1
);
sweepingSections.splice(
  sweepingSections.findIndex(section => section.includes('id="our-work"')) + 1,
  0, customerReviews
);
sweepingSections.splice(1, 0, await readFile(resolve(root, "src/pages/chimney-sweeping/why-choose-us.html"), "utf8"));
const sweepingDocument = constructionDocument
  .replace('</head>', '<link rel="stylesheet" href="/assets/css/why-choose-us.css">\n</head>')
  .replace('</head>', '<link rel="stylesheet" href="/assets/css/booking.css">\n</head>')
  .replace('</head>', '<link rel="stylesheet" href="/assets/css/section-mascots.css">\n</head>')
  .replace('</head>', '<link rel="stylesheet" href="/assets/css/sweeping-process.css">\n</head>')
  .replace('</body>', '<script src="/assets/js/sweeping-process.js" defer></script>\n</body>')
  .replace('</head>', '<link rel="stylesheet" href="/assets/css/our-work.css">\n</head>')
  .replace('</body>', '<script src="/assets/js/comparison.js" defer></script>\n</body>')
  .replace('</head>', '<link rel="stylesheet" href="/assets/css/cleaning-problems.css">\n</head>')
  .replace("Chimney Construction in Austin, TX | Santa Chimney Sweep", "Chimney Sweep Austin, TX | Santa Chimney Sweep")
  .replace('</head>', '<meta name="description" content="Need chimney cleaning in Austin? Santa Chimney Sweep removes soot and creosote buildup. Book online or call (512) 937-0590.">\n<link rel="stylesheet" href="/assets/css/chimney-sweeping.css">\n</head>')
  .replace(/<main id="main-content">[\s\S]*?<\/main>/, () => `<main id="main-content">${sweepingSections.filter(section => !section.includes('id="sweeping-service-areas"')).join("\n")}</main>`);
await mkdir(resolve(root, "services/chimney-sweeping"), { recursive: true });
await writeFile(resolve(root, "services/chimney-sweeping/index.html"), previewLinks(sweepingDocument, "services/chimney-sweeping/index.html"));
