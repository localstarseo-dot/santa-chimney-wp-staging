import { repairSections } from "./repair-page.mjs";

export function fireplaceRepairSections(base, p) {
  const line = (i, j = 0) => p[i].split("\n")[j];
  const esc = s => s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll('"', "&quot;");
  const paras = (...texts) => texts.map(s => `<p>${esc(s)}</p>`).join("");
  const booking = "https://online-booking.workiz.com/?ac=0245991a37759fe4fbdd2ca3a2aea52c72938a4e0fd630eba2b4b062a5e4f580";
  const url = path => `https://www.santachimneys.com/services/fireplace-repair/${path}`;
  const q = p.slice(0, 24);
  q[33] = p[37]; q[34] = p[38]; q[35] = p[39] + "\n" + line(40, 1);
  q[36] = p[41]; q[37] = p[42]; q[38] = p[43]; q[39] = p[44];
  q[40] = p[45]; q[41] = p[46];
  q[54] = p[61]; q[55] = p[62]; q[56] = p[63]; q[57] = p[64];
  q[58] = p[65]; q[59] = p[66];
  // The shared repair renderer supplies the layout. Sections with a different
  // content structure are rendered explicitly below.
  for (let i = 42; i <= 53; i++) q[i] = "\n";
  for (let i = 62; i <= 71; i++) q[i] = "\n";
  const noPhotos = Array.from({length: 3}, () => ({title: "", figure: ""}));
  const safeBase = base.map(s => s.includes('id="sweeping-faq"') ? s.replace("Questions Homeowners Ask About Chimney Sweeping", "Questions Homeowners Ask About Fireplace Repair") : s);
  return repairSections(safeBase, q, noPhotos).map((s, index) => {
    const original = base.filter(s => !s.includes('id="sweeping-service-areas"'))[index];
    if (s.includes('id="home"')) return s.replaceAll("Chimney Repair in Austin, TX", "Fireplace Repair in Austin, TX").replaceAll("Book Chimney Repair", "Book Fireplace Repair")
      .replace(/<div class="sc-hero-slideshow"[^>]*>[\s\S]*?<\/div>/, '<div class="sc-hero-slideshow" aria-hidden="true"><img class="sc-hero-slideshow__slide is-active" src="https://www.santachimneys.com/wp-content/uploads/2026/10/03-firebox-fireplace-repair.png" width="1448" height="1086" alt="" loading="eager" decoding="async"></div>');
    if (s.includes('id="cleaning-problems"')) {
      const names = ["Firebox Cracks", "Damaged Refractory Panels", "Loose Materials", "Smoke in the Room", "Gas Fireplace Problems", "Moisture or Rust"];
      s = s.replace("What Does Your Chimney Need?", "Signs Your Fireplace May Need Repair");
      const intro = "You don't need to know exactly what's wrong. Choose the problem closest to what you're seeing.";
      s = s.replace(esc(intro), esc(line(3)));
      let i = 0;
      s = s.replace(/<div><h3>[\s\S]*?<\/div>/g, () => {const j = i++; return `<div><h3>${names[j]}</h3>${paras(line(3, j + 1))}<span class="sc-repair-text-link">View Fireplace Repairs <span aria-hidden="true">→</span></span></div>`;});
      // Use a neutral repair-tools illustration until service icons are supplied.
      return s.replace(/(<a class="sc-repair-problem"[^>]*>\s*)<img[^>]*>/g, '$1<img src="https://www.santachimneys.com/wp-content/uploads/2026/08/mascot-07-repair-tools.webp" width="1024" height="1024" alt="" loading="lazy" decoding="async">');
    }
    if (s.includes('id="our-work"')) return s.replace("Chimney Repair Work &amp; Customer Experiences", "Fireplace Repair Work &amp; Customer Experiences")
      .replaceAll('<div class="sc-repair-project__head"><h3></h3></div>', "")
      .replace("Schedule Chimney Leak Repair", "Discuss Fireplace Interior Repair")
      .replace("Ask About Chimney Masonry Repair", "Ask About Firebox Repair")
      .replace("Book Chimney Liner Repair", "Book Fireplace Repair");
    if (s.includes('id="scs-reviews"')) {
      const reviews = [["N. Kuyer", 26, 27], ["J. Bontke", 30, 31], ["P. Newman", 34, 35]];
      return original.replace(/<article class="scs-google-reviews__card"[\s\S]*?<\/article>/g, card => {
        const match = reviews.find(([name]) => card.includes(`>${name}</p>`));
        if (!match) return "";
        return card.replace(/<blockquote>[\s\S]*?<\/blockquote>/, `<blockquote>${paras(p[match[1]].replace(/^"|"$/g, ""), p[match[2]])}</blockquote>`);
      });
    }
    if (s.includes('id="sweeping-process"')) return s.replace("What Happens During Chimney Repair?", "What Happens During Fireplace Repair?")
      .replace("Review the Reported Damage", "Identify the Fireplace and Reported Problem")
      .replace("Evaluate the Affected Components", "Examine the Affected Materials")
      .replace("What to Confirm Before Your Chimney Repair", "What to Confirm Before Your Fireplace Repair")
      .replace("Review the affected component, recommended work, materials, access, and estimate before approving the repair.", "Review the fireplace type, compatible parts, diagnostic charges, and proposed work before approving the repair.")
      .replace("Damaged chimney components", "Fireplace type, brand, and model")
      .replace("Repair or replacement scope", "Firebox, panel, or component scope");
    if (s.includes('id="sweeping-scope"')) {
      const cards = [["Firebox Masonry Repair", [line(47, 1), p[48]], url("firebox-repair/")], ["Refractory Panel Replacement", [line(49, 1), p[50]], url("refractory-panels/")], ["Prefabricated Fireplace Repair", [line(51, 1), p[52]], url("prefabricated-fireplaces/")], ["Gas Fireplace Repair", [line(53, 1), p[54]], url("gas-fireplaces/")], ["Smoke and Venting Problems", [line(55, 1), p[56]], "/services/chimney-inspections/"], ["Cleaning or Replacement", [line(57, 1), p[58]], "https://www.santachimneys.com/services/fireplace-cleaning/"]];
      return `<section class="scs-lp scs-lp-section scs-lp--white scs-sweep" id="sweeping-scope" aria-labelledby="fireplace-options-title"><div class="scs-lp__container"><header class="scs-sweep__subhead"><h2 id="fireplace-options-title">Which Fireplace Service Fits the Problem?</h2>${paras(line(47))}</header><div class="scs-sweep__related">${cards.map(([h,body,target], i) => `<article class="scs-lp__card"><h3>${h}</h3>${paras(...body)}<a href="${target}">Explore ${i === 4 ? "Chimney Inspections" : i === 5 ? "Fireplace Cleaning" : h} →</a>${i === 5 ? '<p><a href="https://www.santachimneys.com/services/fireplace-installation/">Explore Fireplace Installation →</a></p>' : ""}</article>`).join("")}</div></div></section>`;
    }
    if (s.includes('id="sweeping-standard"')) return s.replace("Understand the Damage Before Approving a Repair", "Understand Your Fireplace Repair Options").replace("Match the Repair to the Damage", "Match the Repair to the Fireplace");
    if (s.includes('id="book-chimney-repair"')) return s.replaceAll("Book Chimney Repair", "Book Fireplace Repair").replaceAll("book-chimney-repair", "book-fireplace-repair");
    if (s.includes('id="sweeping-faq"')) {
      const faq = [["Do I need fireplace repair or an inspection?", [p[69], p[70]], "Explore Chimney Inspections", "/services/chimney-inspections/"], ["Can firebrick and refractory panels be repaired?", [line(71, 1), line(72)]], ["Do you repair gas fireplaces?", [line(72, 1), p[73]], "Explore Gas Fireplace Repair", url("gas-fireplaces/")], ["Can I use a damaged fireplace?", [line(74, 1), p[75]], "Read NFPA Heating Safety Guidance", "https://content.nfpa.org/-/media/project/storefront/catalog/files/safety-tip-sheets/heatingsafetytips.pdf?rev=28632068e8784f83bc0092317fa78672"], ["What should I provide when booking?", [line(76, 1), p[77]], "Schedule Fireplace Repair", booking]];
      return s.replace(/<details[\s\S]*<\/details>/, faq.map(([h,body,label,target], i) => `<details class="scs-sp-faq__item" name="fireplace-repair-faq"${i === 0 ? " open" : ""}><summary><h3>${h}</h3></summary><div class="scs-sp-faq__answer">${paras(...body)}${label ? `<p><a href="${target}">${label}</a></p>` : ""}${i === 4 ? '<p><a href="tel:+15129370590">Call (512) 937-0590</a></p>' : ""}</div></details>`).join("\n"));
    }
    return s;
  });
}
