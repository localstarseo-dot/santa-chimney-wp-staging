// Inspection content uses the approved service layout without claiming that
// cleaning comparison photos depict the inspection customer accounts.
export function inspectionSections(base, p) {
  const booking = "https://online-booking.workiz.com/?ac=0245991a37759fe4fbdd2ca3a2aea52c72938a4e0fd630eba2b4b062a5e4f580";
  const esc = s => s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll('"', "&quot;");
  const line = (i, j = 0) => p[i].split("\n")[j];
  const para = text => `<p>${esc(text)}</p>`;
  const paras = (...texts) => texts.map(para).join("");
  const link = (label, url) => `<a href="${esc(url)}">${esc(label)}</a>`;
  const asset = name => `https://www.santachimneys.com/wp-content/uploads/2026/10/${name}`;
  const sections = base.filter(s => !s.includes('id="sweeping-service-areas"')).map(s => {
    if (s.includes('id="home"')) {
      s = s.replaceAll("Chimney Sweeping in Austin, TX", "Chimney Inspections in Austin, TX")
        .replaceAll("Book Chimney Sweeping", "Book Chimney Inspection")
        .replace(/<div class="sc-ads-hero__copy">[\s\S]*?<\/div>/, `<div class="sc-ads-hero__copy">${para(p[0])}</div>`)
        .replace(/<div class="sc-hero-slideshow"[^>]*>[\s\S]*?<\/div>/, `<div class="sc-hero-slideshow" data-sc-hero-slideshow="" aria-hidden="true">${[
          ["01-fireplace-inspection.png", 510, 510],
          ["02-video-chimney-inspection.png", 508, 510],
          ["03-rooftop-chimney-inspection.png", 510, 510],
          ["04-flue-inspection.png", 766, 510],
          ["05-inspection-findings-report.png", 766, 510]
        ].map(([file, width, height], i) => `<img class="sc-hero-slideshow__slide${i === 0 ? " is-active" : ""}" ${i === 0 ? "src" : "data-src"}="${asset(file)}" width="${width}" height="${height}" alt="" ${i === 0 ? 'loading="eager"' : 'fetchpriority="low"'} decoding="async">`).join("")}</div>`);
    } else if (s.includes('id="cleaning-problems"')) {
      s = s.replace("Signs Your Chimney May Need Cleaning", "Signs Your Chimney May Need an Inspection")
        .replace(/<p>You don't need[\s\S]*?<\/p>/, para(line(3)));
      const names = ["Smoke in the Room", "Water Stains or Moisture", "Cracks or Loose Masonry", "Falling Debris", "Unusual Odors", "Unknown Chimney History"];
      let i = 0;
      s = s.replace(/<div><h3>[\s\S]*?<\/div>/g, () => {
        const index = i++;
        return `<div><h3>${names[index]}</h3>${para(line(3, index + 1))}<span class="sc-repair-text-link">View Inspections <span aria-hidden="true">→</span></span></div>`;
      });
      s = s.replaceAll("#our-work", "#sweeping-process").replace("mascot-10-waving-brush.webp", "mascot-06-inspection-tools.webp");
      const icons = [
        "chimney_inspection_magnifier_icon.png",
        "roof_chimney_inspection_icon.png",
        "video_chimney_inspection_icon.png",
        "chimney_flue_inspection_icon.png",
        "fireplace_inspection_magnifier_icon.png",
        "chimney_inspection_report_icon.png"
      ];
      i = 0;
      s = s.replace(/(<a class="sc-repair-problem"[^>]*>\s*)<img[^>]*>/g,
        (_, opening) => `${opening}<img src="${asset(icons[i++])}" width="1254" height="1254" alt="" loading="lazy" decoding="async">`);
    } else if (s.includes('id="our-work"')) {
      const stories = [[line(4, 1), 6, "Schedule Chimney Inspection", "03-rooftop-chimney-inspection.png", "Exterior chimney inspection"], [line(10, 1), 12, "Ask About Flue Inspections", "02-video-chimney-inspection.png", "Internal video chimney inspection"], [line(16, 1), 18, "Book Chimney Inspection", "01-fireplace-inspection.png", "Fireplace and firebox inspection"]];
      s = `<section class="sc-repair-section sc-repair-work" id="our-work" aria-labelledby="inspection-work-title"><div class="sc-repair-container"><header class="sc-repair-heading"><h2 id="inspection-work-title">Chimney Inspection Findings &amp; Customer Experiences</h2>${para(line(4))}</header><div class="sc-repair-projects">${stories.map(([title, start, cta, photo, description]) => `<article class="sc-repair-project"><img class="sc-inspection-work-photo" src="${asset(photo)}" width="510" height="510" alt="${description}" loading="lazy" decoding="async"><div class="sc-work-story"><h3>${esc(title)}</h3><dl>${p.slice(start, start + 3).map(text => { const split = text.indexOf(":"); return `<div><dt>${esc(text.slice(0, split))}</dt><dd>${esc(text.slice(split + 1).trim())}</dd></div>`; }).join("")}</dl><p class="sc-work-story__customer">${esc(p[start + 3].split(" | ")[0])}<span>Customer account, summarized</span></p></div><a class="sc-repair-button sc-repair-project__cta" href="${cta.startsWith("Ask") ? "tel:+15129370590" : booking}">${cta} <span aria-hidden="true">→</span></a></article>`).join("")}</div><p class="sc-work-stories__source">${link("Read the Original Customer Accounts", "https://santa-chimney-sweep.localo.site/reviews")}</p></div></section>`;
    } else if (s.includes('id="scs-reviews"')) {
      s = s.replace(/<article class="scs-google-reviews__card"[\s\S]*?<\/article>/g, card => ["Betty", "I. Glatthorn", "J. Bontke"].some(name => card.includes(`>${name}</p>`)) ? card : "");
    } else if (s.includes('id="scs-service-stats"')) {
      s = s.replace(/<p class="scs-stats-pro__description">[\s\S]*?<\/p>/, `<p class="scs-stats-pro__description">${esc(p[33])}</p>`);
    } else if (s.includes('id="sweeping-process"')) {
      s = s.replace("What Happens During Chimney Sweeping?", "What Happens During a Chimney Inspection?")
        .replace(/<p class="scs-lp__lead">[\s\S]*?<\/p>/, `<p class="scs-lp__lead">${esc(line(34))}</p>`);
      const steps = [
        ["Choose the Inspection Level", [line(34, 1), line(35)]],
        ["Level 1: Readily Accessible Areas", [line(35, 1), p[36], line(37)]],
        ["Level 2: Detailed Examination", [line(37, 1), p[38], p[39], line(40)]],
        ["Review Findings and Next Steps", [line(40, 1), p[41], p[42]]]
      ];
      let i = 0;
      s = s.replace(/<h4>[\s\S]*?<\/div><span class="scs-lp-timeline__node"/g, () => { const [title, body] = steps[i++]; return `<h4>${title}</h4>${paras(...body)}</div><span class="scs-lp-timeline__node"`; });
      s = s.replace("What to Confirm Before Your Chimney Sweeping Appointment", "What to Confirm Before Your Chimney Inspection")
        .replace(/<p>Before booking with Santa Chimney Sweep[\s\S]*?<\/p>/, para("Describe your chimney or fireplace, the concern you have noticed, and the reason for the inspection so the scope can be reviewed before the visit."));
      const check = ["Level 1 or Level 2 inspection", "Chimneys, flues, and appliances covered", "Access to relevant areas", "Internal video examination for Level 2", "How findings will be explained", "Cleaning or repairs quoted separately"];
      i = 0;
      s = s.replace(/(<li data-scs-reveal="up"[^>]*>)[\s\S]*?<\/li>/g, (_, open) => `${open}${check[i++]}</li>`);
    } else if (s.includes('id="sweeping-scope"')) {
      const cards = [
        ["Soot and Creosote Buildup", line(43, 1), "03-creosote-soot-before.png", "Explore Chimney Sweeping", "/services/chimney-sweeping/"],
        ["Water Entry and Leaks", line(44, 1), "05-before-liner-firebox-structural.png", "Explore Chimney Leak Repair", "https://www.santachimneys.com/services/chimney-repair/chimney-leak-repair/"],
        ["Damaged Masonry", line(45, 1), "05-before-liner-firebox-structural.png", "Explore Chimney Repair", "https://www.santachimneys.com/services/chimney-repair/"],
        ["Flue and Liner Defects", line(46, 1) + " " + p[47], "01-fireplace-inspection.webp", "Explore Chimney Liners & Flue Repair", "https://www.santachimneys.com/services/chimney-repair/chimney-liners-and-flue-repair/"]
      ];
      s = `<section class="scs-lp scs-lp-section scs-lp--white scs-sweep" id="sweeping-scope" aria-labelledby="inspection-next-title"><div class="scs-lp__container"><header class="scs-sweep__subhead"><h2 id="inspection-next-title">What Happens if the Inspection Finds a Problem?</h2>${para(line(43))}</header><div class="scs-sweep__related">${cards.map(([title, body, image, label, url]) => `<article class="scs-lp__card scs-sweep__photo-card"><div class="scs-sweep__card-photo"><img src="${asset(image)}" width="1200" height="900" alt="${esc(title)}" loading="lazy" decoding="async"></div><div class="scs-sweep__card-copy"><h3>${title}</h3>${para(body)}${link(label, url)}</div></article>`).join("")}</div></div></section>`;
    } else if (s.includes('id="sweeping-standard"')) {
      s = s.replace("Know What You’re Booking With Santa Chimney Sweep", "Understand Your Chimney Before Choosing the Next Service")
        .replace(/<p class="scs-lp__lead">[\s\S]*?<\/p>/, `<p class="scs-lp__lead">${esc(line(49))}</p>`);
      const cards = [["Understand the Findings", [line(49, 1), line(50)]], ["Choose the Appropriate Next Step", [line(50, 1), line(51)]], ["Approve Additional Work Separately", [line(51, 1), p[52]]]];
      let i = 0;
      s = s.replace(/<article class="scs-lp__card">[\s\S]*?<\/article>/g, () => { const [title, body] = cards[i++]; return `<article class="scs-lp__card"><h3>${title}</h3>${paras(...body)}</article>`; });
    } else if (s.includes('id="book-chimney-sweeping"')) {
      s = s.replaceAll("Book Chimney Sweeping", "Book Chimney Inspection").replaceAll("book-chimney-sweeping", "book-chimney-inspection")
        .replace(/<p>Tell us[\s\S]*?<\/p><p>[\s\S]*?<\/p>/, paras(p[53], p[54]));
    } else if (s.includes('id="sweeping-faq"')) {
      s = s.replace("Questions Homeowners Ask About Chimney Sweeping", "Questions Homeowners Ask About Chimney Inspections");
      const faq = [
        ["Do I need a Level 1 or Level 2 inspection?", [p[57], line(58)]],
        ["Does a Level 2 inspection include a video scan?", [line(58, 1), line(59)]],
        ["Can an inspection find every concealed problem?", [line(59, 1), line(60)]],
        ["What happens if the inspection finds a concern?", [line(60, 1), p[61]]],
        ["What information should I provide when booking?", [line(62, 1), p[63]]]
      ];
      s = s.replace(/<details[\s\S]*<\/details>/, faq.map(([title, body], i) => `<details class="scs-sp-faq__item" name="inspection-faq"${i === 0 ? " open" : ""}><summary><h3>${title}</h3></summary><div class="scs-sp-faq__answer">${paras(...body)}${i === 3 ? para("") + link("Explore Chimney Repair", "https://www.santachimneys.com/services/chimney-repair/") : ""}${i === 4 ? `<p>${link("Schedule Chimney Inspection", booking)}</p><p>${link("Call (512) 937-0590", "tel:+15129370590")}</p>` : ""}</div></details>`).join("\n"));
    }
    return s;
  });
  return sections;
}
