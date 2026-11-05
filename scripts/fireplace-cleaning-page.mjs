export function fireplaceCleaningSections(base, p) {
  const esc = s => s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll('"', "&quot;");
  const line = (i, j = 0) => p[i].split("\n")[j];
  const paras = (...texts) => texts.map(t => `<p>${esc(t)}</p>`).join("");
  const link = (label, url) => `<a href="${esc(url)}">${esc(label)}</a>`;
  const booking = "https://online-booking.workiz.com/?ac=0245991a37759fe4fbdd2ca3a2aea52c72938a4e0fd630eba2b4b062a5e4f580";
  return base.filter(s => !s.includes('id="sweeping-service-areas"')).map(s => {
    if (s.includes('id="home"')) return s.replaceAll("Chimney Sweeping in Austin, TX", "Fireplace Cleaning in Austin, TX")
      .replaceAll("Book Chimney Sweeping", "Book Fireplace Cleaning")
      .replace(/<div class="sc-ads-hero__copy">[\s\S]*?<\/div>/, `<div class="sc-ads-hero__copy">${paras(p[0])}</div>`)
      .replace(/<img class="sc-hero-slideshow__slide"[^>]*>/g, "")
      .replace("03-soot-creosote-vacuum-cleaning.webp", "01-chimney-sweeping-fireplace.webp");
    if (s.includes('id="cleaning-problems"')) {
      s = s.replace("Signs Your Chimney May Need Cleaning", "Signs Your Fireplace May Need Cleaning")
        .replace(/<p>You don't need[\s\S]*?<\/p>/, paras(line(3)));
      const names = ["Ash Buildup", "Soot on Firebox Walls", "Dirty Glass or Doors", "Lingering Smoky Smell", "Dark Residue", "Overdue Cleaning"];
      let i = 0;
      s = s.replace(/<div><h3>[\s\S]*?<\/div>/g, () => {const j = i++; return `<div><h3>${names[j]}</h3>${paras(line(3, j + 1))}<span class="sc-repair-text-link">View Fireplace Cleaning <span aria-hidden="true">→</span></span></div>`;});
      return s.replaceAll("#our-work", "#sweeping-process");
    }
    if (s.includes('id="our-work"')) {
      const stories = [[line(4, 1), 6, "Schedule Fireplace Cleaning"], [line(10, 1), 12, "Ask About Fireplace Cleaning"], [line(16, 1), 18, "Book Fireplace Cleaning"]];
      return `<section class="sc-repair-section sc-repair-work" id="our-work" aria-labelledby="fireplace-cleaning-work-title"><div class="sc-repair-container"><header class="sc-repair-heading"><h2 id="fireplace-cleaning-work-title">Fireplace Cleaning &amp; Customer Experiences</h2>${paras(line(4))}</header><div class="sc-repair-projects">${stories.map(([h,start,cta]) => `<article class="sc-repair-project"><div class="sc-work-story"><h3>${esc(h)}</h3><dl>${p.slice(start,start+3).map(t => {const i=t.indexOf(":");return `<div><dt>${esc(t.slice(0,i))}</dt><dd>${esc(t.slice(i+1).trim())}</dd></div>`;}).join("")}</dl><p class="sc-work-story__customer">${esc(p[start+3].split(" | ")[0])}<span>Customer account, summarized</span></p></div><a class="sc-repair-button sc-repair-project__cta" href="${cta.startsWith("Ask")?"tel:+15129370590":booking}">${cta} <span aria-hidden="true">→</span></a></article>`).join("")}</div><p class="sc-work-stories__source">${link("Read the Original Customer Accounts","https://santa-chimney-sweep.localo.site/reviews")}</p></div></section>`;
    }
    if (s.includes('id="scs-reviews"')) return s.replace(/<article class="scs-google-reviews__card"[\s\S]*?<\/article>/g, card => ["P. Newman","I. Glatthorn","J. Bontke"].some(n=>card.includes(`>${n}</p>`))?card:"");
    if (s.includes('id="scs-service-stats"')) return s.replace(/<p class="scs-stats-pro__description">[\s\S]*?<\/p>/,`<p class="scs-stats-pro__description">${esc(p[34])}</p>`);
    if (s.includes('id="sweeping-process"')) {
      s = s.replace("What Happens During Chimney Sweeping?","What Happens During Fireplace Cleaning?")
        .replace(/<p class="scs-lp__lead">[\s\S]*?<\/p>/,`<p class="scs-lp__lead">${esc(line(35))}</p>`);
      const steps = [["Review the Fireplace",[line(35,1),p[36],line(37)]],["Protect the Surrounding Area",[line(37,1),line(38)]],["Clean the Agreed Surfaces",[line(38,1),p[39],line(40)]],["Review the Cleaned Areas",[line(40,1),p[41],p[42]]]];
      let i=0;
      s=s.replace(/<h4>[\s\S]*?<\/div><span class="scs-lp-timeline__node"/g,()=>{const [h,body]=steps[i++];return `<h4>${h}</h4>${paras(...body)}</div><span class="scs-lp-timeline__node"`;});
      s=s.replace("What to Confirm Before Your Chimney Sweeping Appointment","What to Confirm Before Your Fireplace Cleaning")
        .replace(/<p>Before booking with Santa Chimney Sweep[\s\S]*?<\/p>/,paras("Confirm the fireplace type, surfaces and components included, work-area protection, and any separate services before cleaning begins."));
      const check=["Wood-burning or gas fireplace","Firebox surfaces included","Glass, doors, and other components","Work-area protection and cleanup","Whether chimney sweeping is included","Material limits and separate services"];
      i=0;return s.replace(/(<li data-scs-reveal="up"[^>]*>)[\s\S]*?<\/li>/g,(_,open)=>`${open}${check[i++]}</li>`);
    }
    if (s.includes('id="sweeping-scope"')) {
      const cards=[["Chimney Sweeping",[line(43,1),p[44]],"/services/chimney-sweeping/"],["Fireplace Repair",[line(45,1),p[46]],"/services/fireplace-repair/"],["Chimney Inspections",[line(47,1),p[48]],"/services/chimney-inspections/"],["Gas Fireplace Repair",[line(49,1),p[50]],"https://www.santachimneys.com/services/fireplace-repair/gas-fireplaces/"]];
      return `<section class="scs-lp scs-lp-section scs-lp--white scs-sweep" id="sweeping-scope" aria-labelledby="fireplace-cleaning-more-title"><div class="scs-lp__container"><header class="scs-sweep__subhead"><h2 id="fireplace-cleaning-more-title">When Does Your Fireplace Need More Than Cleaning?</h2>${paras(line(43))}</header><div class="scs-sweep__related">${cards.map(([h,body,url])=>`<article class="scs-lp__card"><h3>${h}</h3>${paras(...body)}${link(`Explore ${h}`,url)}</article>`).join("")}</div></div></section>`;
    }
    if (s.includes('id="sweeping-standard"')) {
      s=s.replace("Know What You’re Booking With Santa Chimney Sweep","Know What Your Fireplace Cleaning Covers")
        .replace(/<p class="scs-lp__lead">[\s\S]*?<\/p>/,`<p class="scs-lp__lead">${esc(line(52))}</p>`);
      const cards=[["Match the Cleaning to the Fireplace",[line(52,1),line(53)]],["Protect the Surrounding Home",[line(53,1),line(54)]],["Set Clear Expectations",[line(54,1),p[55]]]];
      let i=0;return s.replace(/<article class="scs-lp__card">[\s\S]*?<\/article>/g,()=>{const [h,body]=cards[i++];return `<article class="scs-lp__card"><h3>${h}</h3>${paras(...body)}</article>`;});
    }
    if (s.includes('id="book-chimney-sweeping"')) return s.replaceAll("Book Chimney Sweeping","Book Fireplace Cleaning").replaceAll("book-chimney-sweeping","book-fireplace-cleaning").replace(/<p>Tell us[\s\S]*?<\/p><p>[\s\S]*?<\/p>/,paras(p[56],p[57]));
    if (s.includes('id="sweeping-faq"')) {
      const faq=[["Is fireplace cleaning the same as chimney sweeping?",[p[60],p[61]],"Explore Chimney Sweeping","/services/chimney-sweeping/"],["Can gas logs, glass, and other components be cleaned?",[line(62,1),p[63],line(64)]],["Will cleaning remove smoky odors?",[line(64,1),p[65]],"Explore Chimney Inspections","/services/chimney-inspections/"],["What if damaged materials are found?",[line(66,1),p[67]],"Explore Fireplace Repair","/services/fireplace-repair/"],["What should I provide when booking?",[line(68,1),p[69]],"Schedule Fireplace Cleaning",booking]];
      return s.replace("Questions Homeowners Ask About Chimney Sweeping","Questions Homeowners Ask About Fireplace Cleaning").replace(/<details[\s\S]*<\/details>/,faq.map(([h,body,label,url],i)=>`<details class="scs-sp-faq__item" name="fireplace-cleaning-faq"${i===0?" open":""}><summary><h3>${h}</h3></summary><div class="scs-sp-faq__answer">${paras(...body)}${label?`<p>${link(label,url)}</p>`:""}${i===4?`<p>${link("Call (512) 937-0590","tel:+15129370590")}</p>`:""}</div></details>`).join("\n"));
    }
    return s;
  });
}
