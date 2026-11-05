import { serviceGuideSections } from "./service-guide-page.mjs";
export function fireplaceInstallationSections(base, p) {
  const line=(i,j=0)=>p[i].split("\n")[j];
  const booking="https://online-booking.workiz.com/?ac=0245991a37759fe4fbdd2ca3a2aea52c72938a4e0fd630eba2b4b062a5e4f580";
  const path=s=>`https://www.santachimneys.com/services/fireplace-installation/${s}`;
  return serviceGuideSections(base, {
    slug:"fireplace-installation",name:"Fireplace Installation",cta:"Discuss Your Fireplace Project",hero:p[0],heroPhoto:"01-fireplace-inspection.webp",
    signTitle:"Which Fireplace Project Are You Planning?",signIntro:line(3),
    signs:["New Fireplace","Replacement Fireplace","Fireplace Insert","System Upgrade","Renovation","Fuel or Venting Change"].map((h,i)=>[h,line(3,i+1)]),
    workTitle:"Related Fireplace Upgrades & Rebuilding Projects",workIntro:line(4),
    stories:[[line(4,1),6,"Discuss Gas Fireplace Upgrades"],[line(10,1),12,"Discuss Fireplace Replacement Options"],[line(16,1),18,"Ask About Fireplace Installation"]].map(([title,start,cta])=>({title,details:p.slice(start,start+3),customer:p[start+3].split(" | ")[0],cta})),
    reviews:[["N. Kuyer",26,27],["P. Newman",30,31],["J. Bontke",34,35]].map(([name,q,c])=>({name,quote:p[q],context:p[c]})),stats:p[37],
    processTitle:"What Happens When You Plan a Fireplace Installation?",processIntro:line(38),
    steps:[["Review Your Project Goal",[line(38,1),p[39],line(40)]],["Check Fit and Compatibility",[line(40,1),p[41],line(42)]],["Define the Installation Scope",[line(42,1),p[43],line(44)]],["Review the Completed Setup and Handover",[line(44,1),p[45],p[46]]]],
    scopeTitle:"What to Confirm Before Your Fireplace Installation",scopeIntro:"Review the selected appliance, compatibility, included installation work, and responsibilities before approving the project.",
    checklist:["Selected appliance and model","Opening dimensions and required clearances","Chimney or venting compatibility","Removal and installation scope","Gas, electrical, framing, and permit responsibilities","Operating checks and project handover"],
    optionsTitle:"Which Fireplace Service Fits Your Project?",optionsIntro:line(47),
    options:[["Fireplace Insert Installation",[line(47,1),p[48],p[49]],path("fireplace-inserts/")],["Fireplace Refacing",[line(50,1),p[51],p[52]],path("fireplace-refacing/")],["Fireplace Repair",[line(53,1),p[54]],"/services/fireplace-repair/"],["Chimney Liners & Flue Repair",[line(55,1),p[56]],"https://www.santachimneys.com/services/chimney-repair/chimney-liners-and-flue-repair/"],["Chimney Construction",[line(57,1),p[58]],"/services/chimney-construction/"]],
    standardTitle:"Understand Your Fireplace Installation Options",standardIntro:line(60),
    standard:[["Review Compatibility Before Purchase",[line(60,1),p[61],line(62)]],["Clarify Responsibilities",[line(62,1),p[63],line(64)]],["Approve Changes Before Proceeding",[line(64,1),p[65]]]],
    bookingTitle:"Request a Fireplace Installation Consultation",bookingCopy:[p[66],p[67]],
    faq:[["Can I install an insert in my existing fireplace?",[p[70],p[71]],"Explore Fireplace Insert Installation",path("fireplace-inserts/")],["Can I use the existing chimney with a replacement fireplace?",[line(72,1),p[73]],"Explore Chimney Inspections","/services/chimney-inspections/"],["Which fireplace installation projects do you review?",[line(74,1),p[75],line(76)]],["Are gas, electrical, chimney work, and permits included?",[line(76,1),p[77],p[78]],"Check Austin Residential Permit Requirements","https://www.austintexas.gov/services/apply-residential-building-permit"],["What should I provide for an installation inquiry?",[line(79,1),p[80]],"Discuss Fireplace Installation",booking]]
  });
}
