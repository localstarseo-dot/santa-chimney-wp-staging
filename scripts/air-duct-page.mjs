import { serviceGuideSections } from "./service-guide-page.mjs";
export function airDuctSections(base,p) {
  const line=(i,j=0)=>p[i].split("\n")[j];
  const booking="https://online-booking.workiz.com/?ac=0245991a37759fe4fbdd2ca3a2aea52c72938a4e0fd630eba2b4b062a5e4f580";
  const thumbtack="https://www.thumbtack.com/tx/austin/fireplace-repair/santa-chimney-sweep/service/479938930501533709";
  const epa="https://www.epa.gov/indoor-air-quality-iaq/should-you-have-air-ducts-your-home-cleaned";
  const google="https://www.google.com/maps/search/?api=1&query=Santa%20Chimney%20Sweep%20Austin%20TX";
  const result=serviceGuideSections(base,{
    slug:"air-duct-cleaning",name:"Air Duct Cleaning",cta:"Book Air Duct Cleaning",hero:p[0],hideHeroPhoto:true,
    signTitle:"When Might Your Air Ducts Need Attention?",signIntro:line(3),
    signs:["Visible Internal Debris","Particles From Supply Vents","Post-Renovation Dust","Return-Path Buildup","Odors During Operation","Signs of Pests"].map((h,i)=>[h,line(3,i+1)]),
    workTitle:"Supply Ducts, Return Pathways & Customer Experience",workIntro:line(4),workSource:thumbtack,
    workCards:[{title:line(4,1),body:[p[5],p[6],p[7]],cta:"Ask About Supply Duct Cleaning"},{title:line(8,1),body:[p[9],p[10],p[11]],cta:"Discuss Return Duct Cleaning"},{title:line(12,1),body:[p[14],p[15],p[16]],customer:"Joe B.",cta:"Book Residential Air Duct Cleaning"}],
    reviewMode:"custom",reviews:[{name:"Joe B.",source:p[21],quote:p[22],context:p[23],url:thumbtack},{name:"Roger W.",source:p[25],quote:p[26],context:p[27],url:"https://santa-chimney-sweep.localo.site/reviews"},{name:"I. Glatthorn",source:p[29],quote:p[30],context:p[31],url:google}],stats:p[33],
    processTitle:"What Happens During Air Duct Cleaning?",processIntro:line(34),
    steps:[["Review the Reported Buildup",[line(34,1),p[35],line(36)]],["Review the Accessible Duct System",[line(36,1),p[37],line(38)]],["Clean the Agreed Duct Areas",[line(38,1),p[39],line(40)]],["Review the Serviced Areas",[line(40,1),p[41],p[42]]]],
    scopeTitle:"What to Confirm Before Your Air Duct Cleaning",scopeIntro:"Confirm which HVAC systems, accessible duct pathways, registers, and components are covered before work begins.",
    checklist:["Number of HVAC systems","Supply duct sections included","Return pathways included","Registers and component cleaning","Duct materials and access limits","Cleanup and separate-service charges"],
    optionsTitle:"When Does Your System Need More Than Duct Cleaning?",optionsIntro:line(43),
    options:[["HVAC Performance Problems",[line(43,1),p[44],line(45)],"#book-air-duct-cleaning"],["Moisture or Suspected Contamination",[line(45,1),p[46],p[47]],epa],["Damaged Ductwork",[line(48,1),p[49],line(50)],"#book-air-duct-cleaning"],["Dryer Vent Cleaning",[line(50,1),p[51]],"https://www.santachimneys.com/services/dryer-vent-cleaning/"]],
    standardTitle:"Know What Your Air Duct Cleaning Covers",standardIntro:line(53),
    standard:[["Assess the Actual Condition",[line(53,1),p[54],line(55)]],["Define the Systems and Areas",[line(55,1),p[56],line(57)]],["Understand What Cleaning Can Address",[line(57,1),p[58],p[59]]]],
    bookingTitle:"Book Air Duct Cleaning Online",bookingCopy:[p[60],p[61]],
    faq:[["Do I need duct cleaning or an HVAC evaluation?",[p[64],line(65)]],["Which areas are included in air duct cleaning?",[line(65,1),p[66],line(67)]],["Will duct cleaning improve air quality or remove odors?",[line(67,1),p[68]],"Read EPA Air Duct Cleaning Recommendations",epa],["Can every duct material or contamination be cleaned?",[line(69,1),p[70],line(71)]],["What should I provide when booking?",[line(71,1),p[72]],"Schedule Air Duct Cleaning",booking]]
  });
  // Do not imply that HVAC repair is a service supplied through this booking.
  return result.map(s=>s.includes('id="sweeping-scope"')?s.replace(/<a href="#book-air-duct-cleaning">Explore (HVAC Performance Problems|Damaged Ductwork)<\/a>/g,""):s);
}
