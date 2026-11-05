export function repairSections(base, p, photos) {
  const booking = "https://online-booking.workiz.com/?ac=0245991a37759fe4fbdd2ca3a2aea52c72938a4e0fd630eba2b4b062a5e4f580";
  const esc = s => s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll('"', "&quot;");
  const line = (i, j = 0) => p[i].split("\n")[j];
  const paras = (...texts) => texts.map(t => `<p>${esc(t)}</p>`).join("");
  const link = (label, url) => `<a href="${esc(url)}">${esc(label)}</a>`;
  const repairUrl = suffix => `https://www.santachimneys.com/services/chimney-repair/${suffix}`;
  return base.filter(s => !s.includes('id="sweeping-service-areas"')).map(s => {
    if (s.includes('id="home"')) {
      return s.replaceAll("Chimney Sweeping in Austin, TX", "Chimney Repair in Austin, TX")
        .replaceAll("Book Chimney Sweeping", "Book Chimney Repair")
        .replace(/<div class="sc-ads-hero__copy">[\s\S]*?<\/div>/, `<div class="sc-ads-hero__copy">${paras(p[0])}</div>`)
        .replace(/<div class="sc-hero-slideshow"[^>]*>[\s\S]*?<\/div>/, `<div class="sc-hero-slideshow" data-sc-hero-slideshow="" aria-hidden="true">${[
          "01-chimney-crown-repair.png",
          "02-chimney-flashing-repair.png",
          "03-firebox-fireplace-repair.png",
          "04-chimney-cap-repair-replacement.png",
          "05-chimney-masonry-repair.png"
        ].map((file, i) => `<img class="sc-hero-slideshow__slide${i === 0 ? " is-active" : ""}" ${i === 0 ? "src" : "data-src"}="https://www.santachimneys.com/wp-content/uploads/2026/10/${file}" width="1448" height="1086" alt="" ${i === 0 ? 'loading="eager"' : 'fetchpriority="low"'} decoding="async">`).join("")}</div>`);
    }
    if (s.includes('id="cleaning-problems"')) {
      const names = ["Chimney Leaks", "Crown Damage", "Flashing Problems", "Masonry Damage", "Liner / Flue", "Cap / Chase Cover"];
      const descriptions = ["Water getting in?", "Cracks or damage?", "Leaking roofline?", "Brick or mortar?", "Internal damage?", "Missing or damaged?"];
      const icons = ["chimney_leak_repair_icon.png", "chimney_crown_repair_icon.png", "chimney_flashing_repair_icon.png", "chimney_masonry_repair_icon.png", "chimney_liner_installation_icon.png", "chimney_cap_repair_icon.png"];
      s = s.replace("Signs Your Chimney May Need Cleaning", "What Does Your Chimney Need?")
        .replace(/<p>You don't need[\s\S]*?<\/p>/, paras("You don't need to know exactly what's wrong. Choose the problem closest to what you're seeing."));
      let i = 0;
      s = s.replace(/<div><h3>[\s\S]*?<\/div>/g, () => { const j = i++; return `<div><h3>${names[j]}</h3>${paras(descriptions[j])}<span class="sc-repair-text-link">View Repair <span aria-hidden="true">→</span></span></div>`; });
      i = 0;
      s = s.replace(/(<a class="sc-repair-problem"[^>]*>\s*)<img[^>]*>/g, (_, opening) => `${opening}<img src="https://www.santachimneys.com/wp-content/uploads/2026/10/${icons[i++]}" width="1254" height="1254" alt="" loading="lazy" decoding="async">`);
      return s.replaceAll("#our-work", "#sweeping-scope").replace("mascot-10-waving-brush.webp", "mascot-07-repair-tools.webp");
    }
    if (s.includes('id="our-work"')) {
      const stories = [[line(4, 1), 6, "Schedule Chimney Leak Repair"], [line(10, 1), 12, "Ask About Chimney Masonry Repair"], [line(16, 1), 18, "Book Chimney Liner Repair"]];
      return `<section class="sc-repair-section sc-repair-work" id="our-work" aria-labelledby="repair-work-title"><div class="sc-repair-container"><header class="sc-repair-heading"><h2 id="repair-work-title">Chimney Repair Work &amp; Customer Experiences</h2>${paras(line(4))}</header><div class="sc-repair-projects">${stories.map(([title, start, cta], i) => `<article class="sc-repair-project"><div class="sc-repair-project__head"><h3>${photos[i].title}</h3></div>${photos[i].figure}<div class="sc-work-story"><h3>${esc(title)}</h3><dl>${p.slice(start, start + 3).map(text => { const split = text.indexOf(":"); return `<div><dt>${esc(text.slice(0, split))}</dt><dd>${esc(text.slice(split + 1).trim())}</dd></div>`; }).join("")}</dl><p class="sc-work-story__customer">${esc(p[start + 3].split(" | ")[0])}<span>Customer account, summarized</span></p></div><a class="sc-repair-button sc-repair-project__cta" href="${cta.startsWith("Ask") ? "tel:+15129370590" : booking}">${cta} <span aria-hidden="true">→</span></a></article>`).join("")}</div><p class="sc-work-stories__source">${link("Read the Original Customer Accounts", "https://santa-chimney-sweep.localo.site/reviews")}</p></div></section>`;
    }
    if (s.includes('id="scs-reviews"')) return s.replace(/<article class="scs-google-reviews__card"[\s\S]*?<\/article>/g, card => ["Betty", "N. Kuyer", "A. Gleizer"].some(name => card.includes(`>${name}</p>`)) ? card : "");
    if (s.includes('id="scs-service-stats"')) return s.replace(/<p class="scs-stats-pro__description">[\s\S]*?<\/p>/, `<p class="scs-stats-pro__description">${esc(p[33])}</p>`);
    if (s.includes('id="sweeping-process"')) {
      s = s.replace("What Happens During Chimney Sweeping?", "What Happens During Chimney Repair?")
        .replace(/<p class="scs-lp__lead">[\s\S]*?<\/p>/, `<p class="scs-lp__lead">${esc(line(34))}</p>`);
      const steps = [["Review the Reported Damage", [line(34, 1), line(35)]], ["Evaluate the Affected Components", [line(35, 1), p[36], line(37)]], ["Explain and Approve the Repair", [line(37, 1), p[38], line(39)]], ["Complete and Review the Work", [line(39, 1), p[40], p[41]]]];
      let i = 0;
      s = s.replace(/<h4>[\s\S]*?<\/div><span class="scs-lp-timeline__node"/g, () => { const [title, body] = steps[i++]; return `<h4>${title}</h4>${paras(...body)}</div><span class="scs-lp-timeline__node"`; });
      s = s.replace("What to Confirm Before Your Chimney Sweeping Appointment", "What to Confirm Before Your Chimney Repair")
        .replace(/<p>Before booking with Santa Chimney Sweep[\s\S]*?<\/p>/, paras("Review the affected component, recommended work, materials, access, and estimate before approving the repair."));
      const checks = ["Damaged chimney components", "Repair or replacement scope", "Materials and repair area", "Access and work-area protection", "Inspection or diagnostic charges", "Approval for additional work"];
      i = 0;
      return s.replace(/(<li data-scs-reveal="up"[^>]*>)[\s\S]*?<\/li>/g, (_, open) => `${open}${checks[i++]}</li>`);
    }
    if (s.includes('id="sweeping-scope"')) {
      const cards = [["Chimney Leak Repair", [line(42, 1), p[43]], "chimney-leak-repair/"], ["Chimney Crown Repair", [line(44, 1), p[45]], "chimney-leak-repair/crown-repair/"], ["Chimney Flashing Repair", [line(46, 1), p[47]], "chimney-leak-repair/flashing-repair/"], ["Chimney Masonry Repair", [line(48, 1), p[49]], "chimney-masonry-repair/"], ["Chimney Liners & Flue Repair", [line(50, 1), p[51]], "chimney-liners-and-flue-repair/"], ["Rebuilding and Restoration", [line(52, 1), p[53]], null]];
      return `<section class="scs-lp scs-lp-section scs-lp--white scs-sweep" id="sweeping-scope" aria-labelledby="repair-options-title"><div class="scs-lp__container"><header class="scs-sweep__subhead"><h2 id="repair-options-title">Which Chimney Repair Fits the Damage?</h2>${paras(line(42))}</header><div class="scs-sweep__related">${cards.map(([title, body, path]) => `<article class="scs-lp__card"><h3>${esc(title)}</h3>${paras(...body)}${path ? link(`Explore ${title}`, repairUrl(path)) : ""}</article>`).join("")}</div></div></section>`;
    }
    if (s.includes('id="sweeping-standard"')) {
      s = s.replace("Know What You’re Booking With Santa Chimney Sweep", "Understand the Damage Before Approving a Repair")
        .replace(/<p class="scs-lp__lead">[\s\S]*?<\/p>/, `<p class="scs-lp__lead">${esc(line(54))}</p>`);
      const cards = [["Match the Repair to the Damage", [line(54, 1), line(55)]], ["Explain the Recommended Work", [line(55, 1), line(56)]], ["Approve Additional Work Separately", [line(56, 1), p[57]]]];
      let i = 0;
      return s.replace(/<article class="scs-lp__card">[\s\S]*?<\/article>/g, () => { const [title, body] = cards[i++]; return `<article class="scs-lp__card"><h3>${title}</h3>${paras(...body)}</article>`; });
    }
    if (s.includes('id="book-chimney-sweeping"')) return s.replaceAll("Book Chimney Sweeping", "Book Chimney Repair").replaceAll("book-chimney-sweeping", "book-chimney-repair").replace(/<p>Tell us[\s\S]*?<\/p><p>[\s\S]*?<\/p>/, paras(p[58], p[59]));
    if (s.includes('id="sweeping-faq"')) {
      s = s.replace("Questions Homeowners Ask About Chimney Sweeping", "Questions Homeowners Ask About Chimney Repair");
      const faq = [["Do I need chimney repair or an inspection?", [p[62], p[63]], "Explore Chimney Inspections", "/services/chimney-inspections/"], ["Can you help if I do not know where the leak starts?", [line(64, 1), p[65]], "Explore Chimney Leak Repair", repairUrl("chimney-leak-repair/")], ["Does a damaged chimney always need rebuilding?", [line(66, 1), p[67], line(68)]], ["Can I use the fireplace if I suspect damage?", [line(68, 1), p[69]], "Read CSIA Chimney Fire Safety Guidance", "https://www.csia.org/after-chimney-fire"], ["What should I provide when booking a repair?", [line(70, 1), p[71]], "Schedule Chimney Repair", booking]];
      return s.replace(/<details[\s\S]*<\/details>/, faq.map(([title, body, label, url], i) => `<details class="scs-sp-faq__item" name="repair-faq"${i === 0 ? " open" : ""}><summary><h3>${title}</h3></summary><div class="scs-sp-faq__answer">${paras(...body)}${label ? `<p>${link(label, url)}</p>` : ""}${i === 4 ? `<p>${link("Call (512) 937-0590", "tel:+15129370590")}</p>` : ""}</div></details>`).join("\n"));
    }
    return s;
  });
}
