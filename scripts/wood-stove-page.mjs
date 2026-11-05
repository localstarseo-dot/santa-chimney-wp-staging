import { serviceGuideSections } from "./service-guide-page.mjs";
export function woodStoveSections(base,p) {
  const line=(i,j=0)=>p[i].split("\n")[j];
  const booking="https://online-booking.workiz.com/?ac=0245991a37759fe4fbdd2ca3a2aea52c72938a4e0fd630eba2b4b062a5e4f580";
  return serviceGuideSections(base,{
    slug:"wood-stove-services",name:"Wood Stove Services",cta:"Book Wood Stove Service",hero:p[0],hideHeroPhoto:true,
    signTitle:"Signs Your Wood Stove May Need Service",signIntro:line(3),
    signs:["Ash or Soot Buildup","Smoke Entering the Room","Changes in Burning","Persistent Odors","Damaged Stove Components","Deposits Near the Connection"].map((h,i)=>[h,line(3,i+1)]),
    workTitle:"Wood Stove Venting & Related Service Experiences",workIntro:line(4)+" Ben's account concerns a wood stove. Pauline's and Roger's accounts concern separate chimney and fireplace services.",
    stories:[[line(4,1),6,"Ask About Wood Stove Venting Repair"],[line(10,1),12,"Discuss Stove and Chimney Cleaning"],[line(16,1),18,"Schedule a Venting Evaluation"]].map(([title,start,cta])=>({title,details:p.slice(start,start+3),customer:p[start+3].split(" | ")[0],cta})),
    reviewMode:"summaries",reviews:[["Ben W.",26],["Ruti",29],["Rebecca A.",32]].map(([name,i])=>({name,summary:p[i]})),stats:p[34],
    processTitle:"What Happens During Wood Stove Service?",processIntro:line(35),
    steps:[["Review the Stove and Reported Concern",[line(35,1),p[36],line(37)]],["Review Accessible Connected Components",[line(37,1),p[38],line(39)]],["Complete the Approved Service",[line(39,1),p[40],p[41],line(42)]],["Review Results and Remaining Concerns",[line(42,1),p[43],p[44]]]],
    scopeTitle:"What to Confirm Before Your Wood Stove Service",scopeIntro:"Review the stove model, affected components, and requested work so the service scope identifies which stove, connecting-pipe, and chimney areas are included.",
    checklist:["Stove brand and model","Cleaning, inspection, repair, or installation request","Stove components and accessible areas","Connecting-pipe work included","Separate chimney sweeping or inspection","Replacement parts and additional-work approval"],
    optionsTitle:"Which Part of Your Wood Stove System Needs Attention?",optionsIntro:line(45),
    options:[["Chimney Sweeping",[line(45,1),p[46]],"/services/chimney-sweeping/"],["Chimney Inspections",[line(47,1),p[48]],"/services/chimney-inspections/"],["Chimney Liners & Flue Repair",[line(49,1),p[50]],"https://www.santachimneys.com/services/chimney-repair/chimney-liners-and-flue-repair/"],["Stove Component Repair",[line(51,1),line(52)],booking],["New or Replacement Wood Stove",[line(52,1),p[53]],booking]],
    standardTitle:"Understand the Stove, Pipe, and Chimney Scope",standardIntro:line(54),
    standard:[["Consider the Connected System",[line(54,1),p[55],line(56)]],["Match the Service to the Stove",[line(56,1),p[57],line(58)]],["Explain Recommendations Before Extra Work",[line(58,1),p[59]]]],
    bookingTitle:"Book Wood Stove Service Online",bookingCopy:[p[60],p[61]],
    faq:[["Is wood stove cleaning the same as chimney sweeping?",[p[64],p[65]],"Explore Chimney Sweeping","/services/chimney-sweeping/"],["Do you review wood stove repairs?",[line(66,1),p[67],line(68)]],["Should the chimney be inspected annually?",[line(68,1),p[69]],"Read CSIA Homeowner Guidance","https://www.csia.org/homeowner-resources"],["When should I stop using the stove?",[line(70,1),p[71]],"Read CSIA Chimney Fire Prevention Guidance","https://www.csia.org/latest-news/preventing-chimney-fires"],["What should I provide when booking?",[line(72,1),p[73]],"Schedule Wood Stove Service",booking]]
  });
}
