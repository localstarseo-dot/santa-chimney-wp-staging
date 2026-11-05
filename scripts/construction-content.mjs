export function applyConstructionGuide(sections, p) {
  const booking = "https://online-booking.workiz.com/?ac=0245991a37759fe4fbdd2ca3a2aea52c72938a4e0fd630eba2b4b062a5e4f580";
  const esc = t => t.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll('"', "&quot;");
  const line = (i, j = 0) => p[i].split("\n")[j];
  const paras = (...texts) => texts.map(t => `<p>${esc(t)}</p>`).join("");
  const link = (label, url) => `<a href="${esc(url)}">${esc(label)}</a>`;
  const rebuilding = "https://www.santachimneys.com/services/chimney-repair/chimney-masonry-repair/chimney-rebuilding/";
  return sections.map(s => {
    if (s.includes('id="home"')) return s.replace(/<div class="sc-ads-hero__copy">[\s\S]*?<\/div>/, `<div class="sc-ads-hero__copy">${paras(p[0])}</div>`);
    if (s.includes('id="cleaning-problems"')) {
      s = s.replace("New construction, repair, and rebuilding are different projects. Choose the situation closest to what you are planning.", esc(line(3)));
      const names = ["New Fireplace", "New Home", "Major Remodel", "No Existing Chimney", "Brick or Masonry Design", "Different Appliance or Venting Route"];
      let i = 0;
      return s.replace(/<div><h3>[\s\S]*?<\/div>/g, () => { const j = i++; return `<div><h3>${names[j]}</h3>${paras(line(3, j + 1))}<span class="sc-repair-text-link">Review Project Planning <span aria-hidden="true">→</span></span></div>`; });
    }
    if (s.includes('id="our-work"')) {
      const stories = [[line(4, 1), 6, "Discuss Chimney Masonry Work"], [line(10, 1), 12, "Ask About Chimney Construction"], [line(16, 1), 18, "Discuss Chimney & Venting Requirements"]];
      return `<section class="sc-repair-section sc-repair-work" id="our-work" aria-labelledby="construction-work-title"><div class="sc-repair-container"><header class="sc-repair-heading"><h2 id="construction-work-title">Related Masonry, Rebuilding &amp; Venting Projects</h2>${paras(line(4))}</header><div class="sc-repair-projects">${stories.map(([title, start, cta]) => `<article class="sc-repair-project"><div class="sc-work-story"><h3>${esc(title)}</h3><dl>${p.slice(start, start + 3).map(t => {const i = t.indexOf(":");return `<div><dt>${esc(t.slice(0, i))}</dt><dd>${esc(t.slice(i + 1).trim())}</dd></div>`;}).join("")}</dl><p class="sc-work-story__customer">${esc(p[start + 3].split(" | ")[0])}<span>Customer account, summarized</span></p></div><a class="sc-repair-button sc-repair-project__cta" href="${cta.startsWith("Ask") ? "tel:+15129370590" : booking}">${esc(cta)} <span aria-hidden="true">→</span></a></article>`).join("")}</div><p class="sc-work-stories__source">${link("Read the Original Customer Accounts", "https://santa-chimney-sweep.localo.site/reviews")}</p></div></section>`;
    }
    if (s.includes('id="scs-reviews"')) return s.replace(/<article class="scs-google-reviews__card"[\s\S]*?<\/article>/g, card => ["N. Kuyer", "A. Gleizer", "Betty"].some(name => card.includes(`>${name}</p>`)) ? card : "");
    if (s.includes('id="scs-service-stats"')) return s.replace(/<p class="scs-stats-pro__description">[\s\S]*?<\/p>/, `<p class="scs-stats-pro__description">${esc(p[33])}</p>`);
    if (s.includes('id="sweeping-process"')) {
      s = s.replace(/<p class="scs-lp__lead">[\s\S]*?<\/p>/, `<p class="scs-lp__lead">${esc(line(34))}</p>`);
      const steps = [["Review the Project and Property", [line(34, 1), p[35], line(36)]], ["Review the Chimney Route and System", [line(36, 1), p[37], line(38)]], ["Define the Construction Scope", [line(38, 1), p[39], line(40)]], ["Confirm Responsibilities and Approvals", [line(40, 1), p[41], p[42]]]];
      let i = 0;
      return s.replace(/<h4>[\s\S]*?<\/div><span class="scs-lp-timeline__node"/g, () => {const [h,body] = steps[i++];return `<h4>${h}</h4>${paras(...body)}</div><span class="scs-lp-timeline__node"`;});
    }
    if (s.includes('id="sweeping-scope"')) {
      const cards = [["Chimney Repair", [line(43, 1)], "/services/chimney-repair/"], ["Chimney Rebuilding", [line(44, 1), p[45]], rebuilding], ["Fireplace Installation", [line(46, 1), p[47]], "https://www.santachimneys.com/services/fireplace-installation/"], ["Chimney Inspections", [line(48, 1), p[49]], "/services/chimney-inspections/"]];
      return `<section class="scs-lp scs-lp-section scs-lp--white scs-sweep" id="sweeping-scope" aria-labelledby="construction-alternatives-title"><div class="scs-lp__container"><header class="scs-sweep__subhead"><h2 id="construction-alternatives-title">When Does Another Service Fit Better?</h2>${paras(line(43))}</header><div class="scs-sweep__related">${cards.map(([h,body,url]) => `<article class="scs-lp__card"><h3>${h}</h3>${paras(...body)}${link(`Explore ${h}`, url)}</article>`).join("")}</div></div></section>`;
    }
    if (s.includes('id="sweeping-standard"')) {
      s = s.replace(/<p class="scs-lp__lead">[\s\S]*?<\/p>/, `<p class="scs-lp__lead">${esc(line(51))}</p>`);
      const cards = [["Review the Home and Chimney Requirements", [line(51, 1), line(52)]], ["Clarify the Construction Responsibilities", [line(52, 1), line(53)]], ["Review Changes Before Proceeding", [line(53, 1), p[54]]]];
      let i = 0;
      return s.replace(/<article class="scs-lp__card">[\s\S]*?<\/article>/g, () => {const [h,body] = cards[i++];return `<article class="scs-lp__card"><h3>${h}</h3>${paras(...body)}</article>`;});
    }
    if (s.includes('id="book-chimney-construction"')) return s.replace(/<p>Share your property[\s\S]*?<\/p><p>[\s\S]*?<\/p>/, paras(p[55], p[56]));
    if (s.includes('id="scs-sp-construction-faq"')) {
      const faq = [["Do I need new construction or rebuilding?", [p[59], p[60]], "Explore Chimney Rebuilding", rebuilding], ["Can a chimney be added to an existing home?", [line(61, 1), line(62)]], ["Is brick or masonry construction available?", [line(62, 1), line(63)]], ["Will the project need permits or inspections?", [line(63, 1), p[64]], "Check Austin Residential Building Permit Requirements", "https://www.austintexas.gov/services/apply-residential-building-permit"], ["What should I provide for a construction inquiry?", [line(65, 1), p[66]], "Discuss Chimney Construction", booking]];
      return s.replace(/<details[\s\S]*<\/details>/, faq.map(([h,body,label,url], i) => `<details class="scs-sp-faq__item" name="construction-faq"${i === 0 ? " open" : ""}><summary><h3>${h}</h3></summary><div class="scs-sp-faq__answer">${paras(...body)}${label ? `<p>${link(label, url)}</p>` : ""}${i === 4 ? `<p>${link("Call (512) 937-0590", "tel:+15129370590")}</p>` : ""}</div></details>`).join("\n"));
    }
    return s;
  });
}
