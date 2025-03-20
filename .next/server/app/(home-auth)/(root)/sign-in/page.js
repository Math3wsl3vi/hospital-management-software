(()=>{var e={};e.id=268,e.ids=[268],e.modules={10846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},19121:e=>{"use strict";e.exports=require("next/dist/server/app-render/action-async-storage.external.js")},3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},29294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},63033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},33873:e=>{"use strict";e.exports=require("path")},79551:e=>{"use strict";e.exports=require("url")},37501:(e,t,s)=>{"use strict";s.r(t),s.d(t,{GlobalError:()=>i.a,__next_app__:()=>u,pages:()=>d,routeModule:()=>p,tree:()=>c});var r=s(70260),o=s(28203),n=s(25155),i=s.n(n),a=s(67292),l={};for(let e in a)0>["default","tree","pages","GlobalError","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>a[e]);s.d(t,l);let c=["",{children:["(home-auth)",{children:["(root)",{children:["sign-in",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(s.bind(s,3800)),"/home/levi/Desktop/codingStuff/nextProjects/hospital-management-system/hms/app/(home-auth)/(root)/sign-in/page.tsx"]}]},{}]},{}]},{layout:[()=>Promise.resolve().then(s.bind(s,43251)),"/home/levi/Desktop/codingStuff/nextProjects/hospital-management-system/hms/app/(home-auth)/layout.tsx"],"not-found":[()=>Promise.resolve().then(s.t.bind(s,19937,23)),"next/dist/client/components/not-found-error"],forbidden:[()=>Promise.resolve().then(s.t.bind(s,69116,23)),"next/dist/client/components/forbidden-error"],unauthorized:[()=>Promise.resolve().then(s.t.bind(s,41485,23)),"next/dist/client/components/unauthorized-error"],metadata:{icon:[async e=>(await Promise.resolve().then(s.bind(s,46055))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(s.bind(s,19611)),"/home/levi/Desktop/codingStuff/nextProjects/hospital-management-system/hms/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(s.t.bind(s,19937,23)),"next/dist/client/components/not-found-error"],forbidden:[()=>Promise.resolve().then(s.t.bind(s,69116,23)),"next/dist/client/components/forbidden-error"],unauthorized:[()=>Promise.resolve().then(s.t.bind(s,41485,23)),"next/dist/client/components/unauthorized-error"],metadata:{icon:[async e=>(await Promise.resolve().then(s.bind(s,46055))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],d=["/home/levi/Desktop/codingStuff/nextProjects/hospital-management-system/hms/app/(home-auth)/(root)/sign-in/page.tsx"],u={require:s,loadChunk:()=>Promise.resolve()},p=new r.AppPageRouteModule({definition:{kind:o.RouteKind.APP_PAGE,page:"/(home-auth)/(root)/sign-in/page",pathname:"/sign-in",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},14538:(e,t,s)=>{Promise.resolve().then(s.bind(s,3800))},77586:(e,t,s)=>{Promise.resolve().then(s.bind(s,38116))},38116:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>d});var r=s(45512),o=s(87021),n=s(25409),i=s(70801),a=s(60621),l=s(79334),c=s(58009);let d=()=>{let[e,t]=(0,c.useState)(""),[s,d]=(0,c.useState)(""),[u,p]=(0,c.useState)(""),[m,h]=(0,c.useState)(null),x=(0,l.useRouter)(),{toast:f}=(0,i.dj)();return(0,c.useEffect)(()=>{},[]),(0,r.jsx)("div",{className:"flex items-center justify-center mt-[20vh]",children:(0,r.jsxs)("div",{className:"border w-1/3 p-5 rounded-md",children:[(0,r.jsx)("h1",{className:"text-center font-semibold text-lg",children:"Welcome to HMS"}),(0,r.jsx)("h1",{className:"text-center text-green-1 uppercase",children:"Login to continue"}),(0,r.jsxs)("div",{className:"flex flex-col gap-5",children:[(0,r.jsxs)("div",{className:"flex flex-col gap-3",children:[(0,r.jsx)("label",{htmlFor:"username",children:"Username"}),(0,r.jsx)(n.p,{id:"username",className:"focus-visible:ring-0 focus-visible:ring-offset-0",value:e,type:"text",onChange:e=>t(e.target.value)})]}),(0,r.jsxs)("div",{className:"flex flex-col gap-3",children:[(0,r.jsx)("label",{htmlFor:"password",children:"Password"}),(0,r.jsx)(n.p,{id:"password",type:"password",className:"focus-visible:ring-0 focus-visible:ring-offset-0",value:s,onChange:e=>d(e.target.value)})]}),(0,r.jsxs)("div",{className:"w-full flex flex-col items-center justify-center mt-5",children:[(0,r.jsx)(o.$,{className:"w-1/2 bg-green-1",onClick:()=>{let t=Object.values(a.s5).find(t=>t.username===e&&t.password===s);if(t){switch(localStorage.setItem("user",JSON.stringify(t)),h(t),console.log(m),t.role){case"doctor":x.push("/UserAccounts/Doctor");break;case"nurse":x.push("/UserAccounts/Nurse");break;case"pharmacy":x.push("/UserAccounts/Pharmacy");break;case"lab":x.push("/UserAccounts/Lab");break;case"admin":x.push("/UserAccounts/Admin");break;case"reception":x.push("/UserAccounts/Reception")}f({description:`Welcome ${t.role}`})}else p("Invalid username or password")},children:"Continue"}),u&&(0,r.jsx)("p",{className:"text-sm mt-3",children:u})]}),(0,r.jsx)(o.$,{onClick:()=>{localStorage.removeItem("user"),h(null),f({description:"User Logged Out Successfully"}),setTimeout(()=>{x.replace("/sign-in")},500)},className:"bg-white text-red-500 shadow-none hover:bg-white",children:"Log out"})]})]})})}},3800:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>r});let r=(0,s(46760).registerClientReference)(function(){throw Error("Attempted to call the default export of \"/home/levi/Desktop/codingStuff/nextProjects/hospital-management-system/hms/app/(home-auth)/(root)/sign-in/page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"/home/levi/Desktop/codingStuff/nextProjects/hospital-management-system/hms/app/(home-auth)/(root)/sign-in/page.tsx","default")}};var t=require("../../../../webpack-runtime.js");t.C(e);var s=e=>t(t.s=e),r=t.X(0,[638,532,270,281,914,905],()=>s(37501));module.exports=r})();