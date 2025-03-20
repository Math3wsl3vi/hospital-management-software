(()=>{var e={};e.id=406,e.ids=[406],e.modules={10846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},19121:e=>{"use strict";e.exports=require("next/dist/server/app-render/action-async-storage.external.js")},3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},29294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},63033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},33873:e=>{"use strict";e.exports=require("path")},79551:e=>{"use strict";e.exports=require("url")},25693:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>n.a,__next_app__:()=>m,pages:()=>c,routeModule:()=>p,tree:()=>l});var a=r(70260),s=r(28203),o=r(25155),n=r.n(o),i=r(67292),d={};for(let e in i)0>["default","tree","pages","GlobalError","__next_app__","routeModule"].indexOf(e)&&(d[e]=()=>i[e]);r.d(t,d);let l=["",{children:["(home-auth)",{children:["(root)",{children:["(home)",{children:["ward",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,64254)),"/home/levi/Desktop/codingStuff/nextProjects/hospital-management-system/hms/app/(home-auth)/(root)/(home)/ward/page.tsx"]}]},{}]},{}]},{}]},{layout:[()=>Promise.resolve().then(r.bind(r,43251)),"/home/levi/Desktop/codingStuff/nextProjects/hospital-management-system/hms/app/(home-auth)/layout.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,19937,23)),"next/dist/client/components/not-found-error"],forbidden:[()=>Promise.resolve().then(r.t.bind(r,69116,23)),"next/dist/client/components/forbidden-error"],unauthorized:[()=>Promise.resolve().then(r.t.bind(r,41485,23)),"next/dist/client/components/unauthorized-error"],metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,46055))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(r.bind(r,19611)),"/home/levi/Desktop/codingStuff/nextProjects/hospital-management-system/hms/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,19937,23)),"next/dist/client/components/not-found-error"],forbidden:[()=>Promise.resolve().then(r.t.bind(r,69116,23)),"next/dist/client/components/forbidden-error"],unauthorized:[()=>Promise.resolve().then(r.t.bind(r,41485,23)),"next/dist/client/components/unauthorized-error"],metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,46055))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],c=["/home/levi/Desktop/codingStuff/nextProjects/hospital-management-system/hms/app/(home-auth)/(root)/(home)/ward/page.tsx"],m={require:r,loadChunk:()=>Promise.resolve()},p=new a.AppPageRouteModule({definition:{kind:s.RouteKind.APP_PAGE,page:"/(home-auth)/(root)/(home)/ward/page",pathname:"/ward",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:l}})},80174:(e,t,r)=>{Promise.resolve().then(r.bind(r,64254))},19926:(e,t,r)=>{Promise.resolve().then(r.bind(r,96306))},96306:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>i});var a=r(45512),s=r(58009),o=r(13393);let n=[{id:"B001",ward:"General Ward",status:"Occupied",patient:"John Doe"},{id:"B002",ward:"General Ward",status:"Available"},{id:"B003",ward:"ICU",status:"Occupied",patient:"Jane Smith"},{id:"B004",ward:"ICU",status:"Available"},{id:"B005",ward:"Pediatrics",status:"Occupied",patient:"Baby Alex"},{id:"B006",ward:"Psych",status:"Occupied",patient:"Alfredo Pasta"},{id:"B007",ward:"Pediatrics",status:"Occupied",patient:"Levi Mathews"},{id:"B008",ward:"Martenitiy",status:"Occupied",patient:"Donald Duck"}],i=()=>{let[e]=(0,s.useState)(n);return(0,a.jsxs)("div",{className:"w-full mx-auto p-6 dark:bg-gray-900 rounded-lg ",children:[(0,a.jsx)("h1",{className:"text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100",children:"Ward Bed Management"}),(0,a.jsxs)(o.XI,{children:[(0,a.jsx)(o.r6,{children:"Current bed availability and patient allocation."}),(0,a.jsx)(o.A0,{children:(0,a.jsxs)(o.Hj,{children:[(0,a.jsx)(o.nd,{className:"w-[100px]",children:"Bed Number"}),(0,a.jsx)(o.nd,{children:"Ward Name"}),(0,a.jsx)(o.nd,{children:"Status"}),(0,a.jsx)(o.nd,{children:"Patient Name"})]})}),(0,a.jsx)(o.BF,{children:e.map(e=>(0,a.jsxs)(o.Hj,{children:[(0,a.jsx)(o.nA,{className:"font-medium",children:e.id}),(0,a.jsx)(o.nA,{children:e.ward}),(0,a.jsx)(o.nA,{className:"Occupied"===e.status?"text-red-500":"text-green-500",children:e.status}),(0,a.jsx)(o.nA,{children:e.patient||"N/A"})]},e.id))})]})]})}},13393:(e,t,r)=>{"use strict";r.d(t,{A0:()=>i,BF:()=>d,Gg:()=>l,Hj:()=>c,XI:()=>n,nA:()=>p,nd:()=>m,r6:()=>u});var a=r(45512),s=r(58009),o=r(59462);let n=s.forwardRef(({className:e,...t},r)=>(0,a.jsx)("div",{className:"relative w-full overflow-auto",children:(0,a.jsx)("table",{ref:r,className:(0,o.cn)("w-full caption-bottom text-sm",e),...t})}));n.displayName="Table";let i=s.forwardRef(({className:e,...t},r)=>(0,a.jsx)("thead",{ref:r,className:(0,o.cn)("[&_tr]:border-b",e),...t}));i.displayName="TableHeader";let d=s.forwardRef(({className:e,...t},r)=>(0,a.jsx)("tbody",{ref:r,className:(0,o.cn)("[&_tr:last-child]:border-0",e),...t}));d.displayName="TableBody";let l=s.forwardRef(({className:e,...t},r)=>(0,a.jsx)("tfoot",{ref:r,className:(0,o.cn)("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",e),...t}));l.displayName="TableFooter";let c=s.forwardRef(({className:e,...t},r)=>(0,a.jsx)("tr",{ref:r,className:(0,o.cn)("border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",e),...t}));c.displayName="TableRow";let m=s.forwardRef(({className:e,...t},r)=>(0,a.jsx)("th",{ref:r,className:(0,o.cn)("h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",e),...t}));m.displayName="TableHead";let p=s.forwardRef(({className:e,...t},r)=>(0,a.jsx)("td",{ref:r,className:(0,o.cn)("p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",e),...t}));p.displayName="TableCell";let u=s.forwardRef(({className:e,...t},r)=>(0,a.jsx)("caption",{ref:r,className:(0,o.cn)("mt-4 text-sm text-muted-foreground",e),...t}));u.displayName="TableCaption"},64254:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>a});let a=(0,r(46760).registerClientReference)(function(){throw Error("Attempted to call the default export of \"/home/levi/Desktop/codingStuff/nextProjects/hospital-management-system/hms/app/(home-auth)/(root)/(home)/ward/page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"/home/levi/Desktop/codingStuff/nextProjects/hospital-management-system/hms/app/(home-auth)/(root)/(home)/ward/page.tsx","default")}};var t=require("../../../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),a=t.X(0,[638,532,270,281,914],()=>r(25693));module.exports=a})();