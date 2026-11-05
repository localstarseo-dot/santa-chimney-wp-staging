// Render service-specific content within the approved shared service layout.
export function serviceGuideSections(base, c) {
  const esc = s => s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll('"', "&quot;");
  const paras = texts => texts.map(t => `<p>${esc(t)}</p>`).join("");
  const link = (label, url) => `<a href="${esc(url)}">${esc(label)}</a>`;
  const booking = "https://online-booking.workiz.com/?ac=0245991a37759fe4fbdd2ca3a2aea52c72938a4e0fd630eba2b4b062a5e4f580";
  return base.filter(s => !s.includes('id="sweeping-service-areas"')).map(s => {
    if (s.includes('id="our-work"') && c.workCards) return `<section class="sc-repair-section sc-repair-work" id="our-work" aria-labelledby="${c.slug}-work-title"><div class="sc-repair-container"><header class="sc-repair-heading"><h2 id="${c.slug}-work-title">${esc(c.workTitle)}</h2>${paras([c.workIntro])}</header><div class="sc-repair-projects">${c.workCards.map(card => `<article class="sc-repair-project"><div class="sc-work-story"><h3>${esc(card.title)}</h3>${paras(card.body)}${card.customer ? `<p class="sc-work-story__customer">${esc(card.customer)}<span>Thumbtack customer review, summarized</span></p>` : ""}</div><a class="sc-repair-button sc-repair-project__cta" href="${card.cta.startsWith("Ask") ? "tel:+15129370590" : booking}">${esc(card.cta)} <span aria-hidden="true">→</span></a></article>`).join("")}</div><p class="sc-work-stories__source">${link("Read the Original Customer Review",c.workSource)}</p></div></section>`;
    if (s.includes('id="home"')) return s.replaceAll("Chimney Sweeping in Austin, TX", `${c.name} in Austin, TX`).replaceAll("Book Chimney Sweeping", c.cta)
      .replace(/<div class="sc-ads-hero__copy">[\s\S]*?<\/div>/, `<div class="sc-ads-hero__copy">${paras([c.hero])}</div>`)
      .replace(/<img class="sc-hero-slideshow__slide"[^>]*>/g, "")
      .replace("03-soot-creosote-vacuum-cleaning.webp", c.heroPhoto || "03-soot-creosote-vacuum-cleaning.webp")
      .replace(/<div class="sc-hero-slideshow"[^>]*>[\s\S]*?<\/div>/, slideshow => c.hideHeroPhoto ? "" : slideshow);
    if (s.includes('id="cleaning-problems"')) {
      s = s.replace("Signs Your Chimney May Need Cleaning", c.signTitle).replace(/<p>You don't need[\s\S]*?<\/p>/, paras([c.signIntro]));
      let i = 0;
      s = s.replace(/<div><h3>[\s\S]*?<\/div>/g, () => {const [h,p] = c.signs[i++];return `<div><h3>${esc(h)}</h3>${paras([p])}<span class="sc-repair-text-link">Review Project Options <span aria-hidden="true">→</span></span></div>`;});
      s = s.replaceAll("#our-work", "#sweeping-scope").replace("mascot-10-waving-brush.webp", "mascot-07-repair-tools.webp");
      return s.replace(/(<a class="sc-repair-problem"[^>]*>\s*)<img[^>]*>/g, '$1<img src="https://www.santachimneys.com/wp-content/uploads/2026/08/mascot-07-repair-tools.webp" width="1024" height="1024" alt="" loading="lazy" decoding="async">');
    }
    if (s.includes('id="our-work"')) return `<section class="sc-repair-section sc-repair-work" id="our-work" aria-labelledby="${c.slug}-work-title"><div class="sc-repair-container"><header class="sc-repair-heading"><h2 id="${c.slug}-work-title">${esc(c.workTitle)}</h2>${paras([c.workIntro])}</header><div class="sc-repair-projects">${c.stories.map(story => `<article class="sc-repair-project"><div class="sc-work-story"><h3>${esc(story.title)}</h3><dl>${story.details.map(t => {const i=t.indexOf(":");return `<div><dt>${esc(t.slice(0,i))}</dt><dd>${esc(t.slice(i+1).trim())}</dd></div>`;}).join("")}</dl><p class="sc-work-story__customer">${esc(story.customer)}<span>Customer account, summarized</span></p></div><a class="sc-repair-button sc-repair-project__cta" href="${story.cta.startsWith("Ask") ? "tel:+15129370590" : booking}">${esc(story.cta)} <span aria-hidden="true">→</span></a></article>`).join("")}</div><p class="sc-work-stories__source">${link("Read the Original Customer Accounts","https://santa-chimney-sweep.localo.site/reviews")}</p></div></section>`;
    if (s.includes('id="scs-reviews"')) {
      let reviewIndex = 0;
      return s.replace(/<article class="scs-google-reviews__card"[\s\S]*?<\/article>/g, card => {
      if (c.reviewMode === "custom") {
        const review = c.reviews[reviewIndex++];
        if (!review) return "";
        return `<article class="scs-google-reviews__card" role="listitem" aria-label="Customer review from ${esc(review.name)}"><header class="scs-google-reviews__card-header"><div class="scs-google-reviews__person"><span class="scs-google-reviews__avatar" aria-hidden="true">${esc(review.name[0])}</span><div><p class="scs-google-reviews__name">${esc(review.name)}</p><p class="scs-google-reviews__source">${esc(review.source)}</p></div></div></header><blockquote>${paras([review.quote.replace(/^"|"$/g, ""),review.context])}</blockquote><footer class="scs-google-reviews__card-footer">${link("Read Customer Review",review.url)}</footer></article>`;
      }
      if (c.reviewMode === "summaries") {
        const review = c.reviews[reviewIndex++];
        if (!review) return "";
        return `<article class="scs-google-reviews__card" role="listitem" aria-label="Customer account from ${esc(review.name)}"><header class="scs-google-reviews__card-header"><div class="scs-google-reviews__person"><span class="scs-google-reviews__avatar" aria-hidden="true">${esc(review.name[0])}</span><div><p class="scs-google-reviews__name">${esc(review.name)}</p><p class="scs-google-reviews__source">Customer account, summarized</p></div></div></header><blockquote>${paras([review.summary])}</blockquote><footer class="scs-google-reviews__card-footer">${link("Read Customer Reviews", "https://santa-chimney-sweep.localo.site/reviews")}</footer></article>`;
      }
      const review = c.reviews.find(r=>card.includes(`>${r.name}</p>`));
      if (!review) return "";
      return card.replace(/<blockquote>[\s\S]*?<\/blockquote>/, `<blockquote>${paras([review.quote.replace(/^"|"$/g,""),review.context])}</blockquote>`);
    });
    }
    if (s.includes('id="scs-service-stats"')) return s.replace(/<p class="scs-stats-pro__description">[\s\S]*?<\/p>/,`<p class="scs-stats-pro__description">${esc(c.stats)}</p>`);
    if (s.includes('id="sweeping-process"')) {
      s = s.replace("What Happens During Chimney Sweeping?", c.processTitle).replace(/<p class="scs-lp__lead">[\s\S]*?<\/p>/,`<p class="scs-lp__lead">${esc(c.processIntro)}</p>`);
      let i=0;
      s=s.replace(/<h4>[\s\S]*?<\/div><span class="scs-lp-timeline__node"/g,()=>{const [h,body]=c.steps[i++];return `<h4>${esc(h)}</h4>${paras(body)}</div><span class="scs-lp-timeline__node"`;});
      s=s.replace("What to Confirm Before Your Chimney Sweeping Appointment",c.scopeTitle).replace(/<p>Before booking with Santa Chimney Sweep[\s\S]*?<\/p>/,paras([c.scopeIntro])).replace("The exact scope should be confirmed before booking.","The proposed scope and responsibilities should be agreed before work begins.");
      i=0;return s.replace(/(<li data-scs-reveal="up"[^>]*>)[\s\S]*?<\/li>/g,(_,open)=>`${open}${esc(c.checklist[i++])}</li>`);
    }
    if (s.includes('id="sweeping-scope"')) return `<section class="scs-lp scs-lp-section scs-lp--white scs-sweep" id="sweeping-scope" aria-labelledby="${c.slug}-options-title"><div class="scs-lp__container"><header class="scs-sweep__subhead"><h2 id="${c.slug}-options-title">${esc(c.optionsTitle)}</h2>${paras([c.optionsIntro])}</header><div class="scs-sweep__related">${c.options.map(([h,body,url])=>`<article class="scs-lp__card"><h3>${esc(h)}</h3>${paras(body)}${url ? link(`Explore ${h}`,url) : ""}</article>`).join("")}</div></div></section>`;
    if (s.includes('id="sweeping-standard"')) {
      s=s.replace("Know What You’re Booking With Santa Chimney Sweep",c.standardTitle).replace(/<p class="scs-lp__lead">[\s\S]*?<\/p>/,`<p class="scs-lp__lead">${esc(c.standardIntro)}</p>`);
      let i=0;return s.replace(/<article class="scs-lp__card">[\s\S]*?<\/article>/g,()=>{const [h,body]=c.standard[i++];return `<article class="scs-lp__card"><h3>${esc(h)}</h3>${paras(body)}</article>`;});
    }
    if (s.includes('id="book-chimney-sweeping"')) return s.replaceAll("Book Chimney Sweeping",c.cta).replace(`${c.cta} Online`,c.bookingTitle).replaceAll("book-chimney-sweeping",`book-${c.slug}`).replace(/<p>Tell us[\s\S]*?<\/p><p>[\s\S]*?<\/p>/,paras(c.bookingCopy));
    if (s.includes('id="sweeping-faq"')) return s.replace("Questions Homeowners Ask About Chimney Sweeping",`Questions Homeowners Ask About ${c.name}`).replace(/<details[\s\S]*<\/details>/,c.faq.map(([h,body,label,url],i)=>`<details class="scs-sp-faq__item" name="${c.slug}-faq"${i===0?" open":""}><summary><h3>${esc(h)}</h3></summary><div class="scs-sp-faq__answer">${paras(body)}${label?`<p>${link(label,url)}</p>`:""}${i===c.faq.length-1?`<p>${link("Call (512) 937-0590","tel:+15129370590")}</p>`:""}</div></details>`).join("\n"));
    return s;
  });
}
