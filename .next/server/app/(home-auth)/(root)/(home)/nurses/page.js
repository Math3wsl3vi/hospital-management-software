(()=>{var e={};e.id=662,e.ids=[662],e.modules={10846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},19121:e=>{"use strict";e.exports=require("next/dist/server/app-render/action-async-storage.external.js")},3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},29294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},63033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},33873:e=>{"use strict";e.exports=require("path")},79551:e=>{"use strict";e.exports=require("url")},79581:(e,t,a)=>{"use strict";a.r(t),a.d(t,{GlobalError:()=>o.a,__next_app__:()=>p,pages:()=>c,routeModule:()=>u,tree:()=>d});var r=a(70260),s=a(28203),n=a(25155),o=a.n(n),l=a(67292),i={};for(let e in l)0>["default","tree","pages","GlobalError","__next_app__","routeModule"].indexOf(e)&&(i[e]=()=>l[e]);a.d(t,i);let d=["",{children:["(home-auth)",{children:["(root)",{children:["(home)",{children:["nurses",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(a.bind(a,50278)),"/home/levi/Desktop/codingStuff/nextProjects/hospital-management-system/hms/app/(home-auth)/(root)/(home)/nurses/page.tsx"]}]},{}]},{}]},{}]},{layout:[()=>Promise.resolve().then(a.bind(a,43251)),"/home/levi/Desktop/codingStuff/nextProjects/hospital-management-system/hms/app/(home-auth)/layout.tsx"],"not-found":[()=>Promise.resolve().then(a.t.bind(a,19937,23)),"next/dist/client/components/not-found-error"],forbidden:[()=>Promise.resolve().then(a.t.bind(a,69116,23)),"next/dist/client/components/forbidden-error"],unauthorized:[()=>Promise.resolve().then(a.t.bind(a,41485,23)),"next/dist/client/components/unauthorized-error"],metadata:{icon:[async e=>(await Promise.resolve().then(a.bind(a,46055))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(a.bind(a,19611)),"/home/levi/Desktop/codingStuff/nextProjects/hospital-management-system/hms/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(a.t.bind(a,19937,23)),"next/dist/client/components/not-found-error"],forbidden:[()=>Promise.resolve().then(a.t.bind(a,69116,23)),"next/dist/client/components/forbidden-error"],unauthorized:[()=>Promise.resolve().then(a.t.bind(a,41485,23)),"next/dist/client/components/unauthorized-error"],metadata:{icon:[async e=>(await Promise.resolve().then(a.bind(a,46055))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],c=["/home/levi/Desktop/codingStuff/nextProjects/hospital-management-system/hms/app/(home-auth)/(root)/(home)/nurses/page.tsx"],p={require:a,loadChunk:()=>Promise.resolve()},u=new r.AppPageRouteModule({definition:{kind:s.RouteKind.APP_PAGE,page:"/(home-auth)/(root)/(home)/nurses/page",pathname:"/nurses",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},12270:(e,t,a)=>{Promise.resolve().then(a.bind(a,50278))},52022:(e,t,a)=>{Promise.resolve().then(a.bind(a,66722))},66722:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>u});var r=a(45512),s=a(58009),n=a(71965),o=a(25409),l=a(87021),i=a(70801),d=a(69595),c=a(13393),p=a(60621);let u=()=>{let[e,t]=(0,s.useState)({name:"",specialization:"",phone:"",email:"",dob:"",homeAddress:"",nationalId:"",licenseNumber:"",gender:"",experience:"",hospitalId:"",emergencyContact:"",workingHours:"",status:"",profileImage:"",department:"",nationality:"",languages:"",bio:"",insuranceAccepted:""}),[a,u]=(0,s.useState)(!1),{toast:m}=(0,i.dj)(),[h,f]=(0,s.useState)(!1),[x,g]=(0,s.useState)(1),j=Math.ceil(p.Q0.length/10),b=p.Q0.slice((x-1)*10,10*x),v=e=>{let{name:a,value:r}=e.target;t(e=>({...e,[a]:r}))},y=async t=>{t.preventDefault(),f(!0);try{console.log("Submitting form data:",e);let t=await fetch("/api/doctors",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}),a=await t.json();t.ok?(m({description:"Patient data saved successfully."}),console.log("Patient data saved successfully:",a)):(m({description:"Failed to save patient data."}),console.error("Failed to save patient data:",a))}catch(e){m({description:"Error submitting form."}),console.error("Error submitting form:",e)}finally{f(!1)}},[N,w]=(0,s.useState)(null);return(0,s.useEffect)(()=>{let e=localStorage.getItem("user");e&&w(JSON.parse(e))},[]),(0,r.jsxs)("div",{children:[(0,r.jsx)("h1",{className:"text-xl font-semibold mb-3",children:"Nurses"}),(0,r.jsxs)("div",{children:[(0,r.jsxs)("div",{className:"grid grid-cols-2 mb-5",children:[(0,r.jsx)("div",{className:"border p-2 text-center active:bg-green-1 active:text-white cursor-pointer hover:text-white hover:bg-green-1",children:(0,r.jsx)("h1",{children:"Nurses List"})}),N?.role==="admin"&&(0,r.jsx)("div",{onClick:()=>u(!0),className:"border p-2 text-center active:bg-green-1 active:text-white cursor-pointer hover:text-white hover:bg-green-1",children:(0,r.jsx)("h1",{children:"Register a Nurse"})})]}),(0,r.jsx)("div",{children:(0,r.jsxs)(c.XI,{children:[(0,r.jsx)(c.A0,{children:(0,r.jsxs)(c.Hj,{children:[(0,r.jsx)(c.nd,{children:"Name"}),(0,r.jsx)(c.nd,{children:"phone"}),(0,r.jsx)(c.nd,{children:"Gender"}),(0,r.jsx)(c.nd,{children:"Status"})]})}),(0,r.jsx)(c.BF,{children:b.map((e,t)=>(0,r.jsxs)(c.Hj,{className:"capitalize",children:[(0,r.jsx)(c.nA,{children:e.name}),(0,r.jsx)(c.nA,{children:e.phone}),(0,r.jsx)(c.nA,{children:e.sex}),(0,r.jsx)(c.nA,{children:e.status})]},t))})]})}),(0,r.jsxs)("div",{className:"flex justify-between mt-5",children:[(0,r.jsx)("div",{children:(0,r.jsx)(l.$,{className:"bg-green-1",onClick:()=>{x>1&&g(e=>e-1)},disabled:1===x,children:"Previous"})}),(0,r.jsx)("div",{children:(0,r.jsxs)("p",{children:["Page ",x," of ",j]})}),(0,r.jsx)("div",{children:(0,r.jsx)(l.$,{className:"bg-green-1",onClick:()=>{x<j&&g(e=>e+1)},disabled:x===j,children:"Next"})})]})]}),(0,r.jsx)(n.lG,{open:a,onOpenChange:u,children:(0,r.jsx)(n.Cf,{className:"w-[800px]",children:(0,r.jsxs)("form",{onSubmit:y,children:[(0,r.jsx)("h1",{className:"text-xl font-semibold mb-3 text-center",children:"Register a Nurse"}),(0,r.jsxs)("div",{className:"flex flex-row justify-between gap-10",children:[(0,r.jsxs)("div",{className:"flex flex-col gap-4 mb-5",children:[(0,r.jsx)(o.p,{placeholder:"Full Name",name:"name",onChange:v}),(0,r.jsx)(o.p,{placeholder:"Phone Number",name:"phone",onChange:v}),(0,r.jsx)(o.p,{placeholder:"Specialization",name:"specialization",onChange:v}),(0,r.jsx)(o.p,{placeholder:"License Number",name:"licenseNumber",onChange:v}),(0,r.jsx)(o.p,{placeholder:"Gender",name:"gender",onChange:v}),(0,r.jsx)(o.p,{placeholder:"Experience (years)",name:"experience",onChange:v})]}),(0,r.jsxs)("div",{className:"flex flex-col gap-4 mb-5",children:[(0,r.jsx)(o.p,{placeholder:"National ID",name:"nationalId",onChange:v}),(0,r.jsx)(o.p,{placeholder:"Email Address",name:"email",onChange:v}),(0,r.jsx)(o.p,{placeholder:"Address",name:"homeAddress",onChange:v}),(0,r.jsx)(o.p,{placeholder:"Date of Birth",name:"dob",type:"date",onChange:v}),(0,r.jsx)(o.p,{placeholder:"Emergency Contact",name:"emergencyContact",onChange:v}),(0,r.jsx)(o.p,{placeholder:"Working Hours",name:"workingHours",onChange:v})]})]}),(0,r.jsxs)("div",{className:"flex flex-row justify-between gap-10 mt-5",children:[(0,r.jsxs)("div",{className:"flex flex-col gap-4",children:[(0,r.jsx)(o.p,{placeholder:"Status",name:"status",onChange:v}),(0,r.jsx)(o.p,{placeholder:"Profile Image URL",name:"profileImage",onChange:v}),(0,r.jsx)(o.p,{placeholder:"Department",name:"department",onChange:v}),(0,r.jsx)(o.p,{placeholder:"Nationality",name:"nationality",onChange:v})]}),(0,r.jsxs)("div",{className:"flex flex-col gap-4",children:[(0,r.jsx)(o.p,{placeholder:"Languages Spoken",name:"languages",onChange:v}),(0,r.jsx)(o.p,{placeholder:"Biography",name:"bio",onChange:v}),(0,r.jsx)(o.p,{placeholder:"Insurance Accepted",name:"insuranceAccepted",onChange:v})]})]}),(0,r.jsx)("div",{className:"w-full mt-5 flex items-center",children:(0,r.jsx)(l.$,{className:"w-full bg-green-1",children:h&&(0,r.jsx)(d.A,{})||"Save Doctor"})})]})})})]})}},69595:(e,t,a)=>{"use strict";a.d(t,{A:()=>n});var r=a(45512),s=a(45103);a(58009);let n=()=>(0,r.jsxs)("div",{className:"flex items-center gap-4",children:[(0,r.jsx)(s.default,{src:"/images/loader.svg",alt:"loader",width:24,height:24,className:"animate-spin"}),"Loading..."]})},71965:(e,t,a)=>{"use strict";a.d(t,{Cf:()=>m,HM:()=>p,L3:()=>f,c7:()=>h,lG:()=>i,rr:()=>x,zM:()=>d});var r=a(45512),s=a(58009),n=a(27553),o=a(51255),l=a(59462);let i=n.bL,d=n.l9,c=n.ZL,p=n.bm,u=s.forwardRef(({className:e,...t},a)=>(0,r.jsx)(n.hJ,{ref:a,className:(0,l.cn)("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",e),...t}));u.displayName=n.hJ.displayName;let m=s.forwardRef(({className:e,children:t,...a},s)=>(0,r.jsxs)(c,{children:[(0,r.jsx)(u,{}),(0,r.jsxs)(n.UC,{ref:s,className:(0,l.cn)("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",e),...a,children:[t,(0,r.jsxs)(n.bm,{className:"absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",children:[(0,r.jsx)(o.A,{className:"h-4 w-4"}),(0,r.jsx)("span",{className:"sr-only",children:"Close"})]})]})]}));m.displayName=n.UC.displayName;let h=({className:e,...t})=>(0,r.jsx)("div",{className:(0,l.cn)("flex flex-col space-y-1.5 text-center sm:text-left",e),...t});h.displayName="DialogHeader";let f=s.forwardRef(({className:e,...t},a)=>(0,r.jsx)(n.hE,{ref:a,className:(0,l.cn)("text-lg font-semibold leading-none tracking-tight",e),...t}));f.displayName=n.hE.displayName;let x=s.forwardRef(({className:e,...t},a)=>(0,r.jsx)(n.VY,{ref:a,className:(0,l.cn)("text-sm text-muted-foreground",e),...t}));x.displayName=n.VY.displayName},13393:(e,t,a)=>{"use strict";a.d(t,{A0:()=>l,BF:()=>i,Gg:()=>d,Hj:()=>c,XI:()=>o,nA:()=>u,nd:()=>p,r6:()=>m});var r=a(45512),s=a(58009),n=a(59462);let o=s.forwardRef(({className:e,...t},a)=>(0,r.jsx)("div",{className:"relative w-full overflow-auto",children:(0,r.jsx)("table",{ref:a,className:(0,n.cn)("w-full caption-bottom text-sm",e),...t})}));o.displayName="Table";let l=s.forwardRef(({className:e,...t},a)=>(0,r.jsx)("thead",{ref:a,className:(0,n.cn)("[&_tr]:border-b",e),...t}));l.displayName="TableHeader";let i=s.forwardRef(({className:e,...t},a)=>(0,r.jsx)("tbody",{ref:a,className:(0,n.cn)("[&_tr:last-child]:border-0",e),...t}));i.displayName="TableBody";let d=s.forwardRef(({className:e,...t},a)=>(0,r.jsx)("tfoot",{ref:a,className:(0,n.cn)("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",e),...t}));d.displayName="TableFooter";let c=s.forwardRef(({className:e,...t},a)=>(0,r.jsx)("tr",{ref:a,className:(0,n.cn)("border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",e),...t}));c.displayName="TableRow";let p=s.forwardRef(({className:e,...t},a)=>(0,r.jsx)("th",{ref:a,className:(0,n.cn)("h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",e),...t}));p.displayName="TableHead";let u=s.forwardRef(({className:e,...t},a)=>(0,r.jsx)("td",{ref:a,className:(0,n.cn)("p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",e),...t}));u.displayName="TableCell";let m=s.forwardRef(({className:e,...t},a)=>(0,r.jsx)("caption",{ref:a,className:(0,n.cn)("mt-4 text-sm text-muted-foreground",e),...t}));m.displayName="TableCaption"},50278:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>r});let r=(0,a(46760).registerClientReference)(function(){throw Error("Attempted to call the default export of \"/home/levi/Desktop/codingStuff/nextProjects/hospital-management-system/hms/app/(home-auth)/(root)/(home)/nurses/page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"/home/levi/Desktop/codingStuff/nextProjects/hospital-management-system/hms/app/(home-auth)/(root)/(home)/nurses/page.tsx","default")},27553:(e,t,a)=>{"use strict";a.d(t,{UC:()=>et,VY:()=>er,ZL:()=>Q,bL:()=>Y,bm:()=>es,hE:()=>ea,hJ:()=>ee,l9:()=>K});var r=a(58009),s=a(31412),n=a(29952),o=a(6004),l=a(30096),i=a(13024),d=a(41675),c=a(82534),p=a(80707),u=a(98060),m=a(30830),h=a(19632),f=a(67783),x=a(72421),g=a(12705),j=a(45512),b="Dialog",[v,y]=(0,o.A)(b),[N,w]=v(b),C=e=>{let{__scopeDialog:t,children:a,open:s,defaultOpen:n,onOpenChange:o,modal:d=!0}=e,c=r.useRef(null),p=r.useRef(null),[u=!1,m]=(0,i.i)({prop:s,defaultProp:n,onChange:o});return(0,j.jsx)(N,{scope:t,triggerRef:c,contentRef:p,contentId:(0,l.B)(),titleId:(0,l.B)(),descriptionId:(0,l.B)(),open:u,onOpenChange:m,onOpenToggle:r.useCallback(()=>m(e=>!e),[m]),modal:d,children:a})};C.displayName=b;var P="DialogTrigger",D=r.forwardRef((e,t)=>{let{__scopeDialog:a,...r}=e,o=w(P,a),l=(0,n.s)(t,o.triggerRef);return(0,j.jsx)(m.sG.button,{type:"button","aria-haspopup":"dialog","aria-expanded":o.open,"aria-controls":o.contentId,"data-state":J(o.open),...r,ref:l,onClick:(0,s.m)(e.onClick,o.onOpenToggle)})});D.displayName=P;var R="DialogPortal",[k,A]=v(R,{forceMount:void 0}),I=e=>{let{__scopeDialog:t,forceMount:a,children:s,container:n}=e,o=w(R,t);return(0,j.jsx)(k,{scope:t,forceMount:a,children:r.Children.map(s,e=>(0,j.jsx)(u.C,{present:a||o.open,children:(0,j.jsx)(p.Z,{asChild:!0,container:n,children:e})}))})};I.displayName=R;var _="DialogOverlay",E=r.forwardRef((e,t)=>{let a=A(_,e.__scopeDialog),{forceMount:r=a.forceMount,...s}=e,n=w(_,e.__scopeDialog);return n.modal?(0,j.jsx)(u.C,{present:r||n.open,children:(0,j.jsx)(S,{...s,ref:t})}):null});E.displayName=_;var S=r.forwardRef((e,t)=>{let{__scopeDialog:a,...r}=e,s=w(_,a);return(0,j.jsx)(f.A,{as:g.DX,allowPinchZoom:!0,shards:[s.contentRef],children:(0,j.jsx)(m.sG.div,{"data-state":J(s.open),...r,ref:t,style:{pointerEvents:"auto",...r.style}})})}),O="DialogContent",F=r.forwardRef((e,t)=>{let a=A(O,e.__scopeDialog),{forceMount:r=a.forceMount,...s}=e,n=w(O,e.__scopeDialog);return(0,j.jsx)(u.C,{present:r||n.open,children:n.modal?(0,j.jsx)(G,{...s,ref:t}):(0,j.jsx)(T,{...s,ref:t})})});F.displayName=O;var G=r.forwardRef((e,t)=>{let a=w(O,e.__scopeDialog),o=r.useRef(null),l=(0,n.s)(t,a.contentRef,o);return r.useEffect(()=>{let e=o.current;if(e)return(0,x.Eq)(e)},[]),(0,j.jsx)(q,{...e,ref:l,trapFocus:a.open,disableOutsidePointerEvents:!0,onCloseAutoFocus:(0,s.m)(e.onCloseAutoFocus,e=>{e.preventDefault(),a.triggerRef.current?.focus()}),onPointerDownOutside:(0,s.m)(e.onPointerDownOutside,e=>{let t=e.detail.originalEvent,a=0===t.button&&!0===t.ctrlKey;(2===t.button||a)&&e.preventDefault()}),onFocusOutside:(0,s.m)(e.onFocusOutside,e=>e.preventDefault())})}),T=r.forwardRef((e,t)=>{let a=w(O,e.__scopeDialog),s=r.useRef(!1),n=r.useRef(!1);return(0,j.jsx)(q,{...e,ref:t,trapFocus:!1,disableOutsidePointerEvents:!1,onCloseAutoFocus:t=>{e.onCloseAutoFocus?.(t),t.defaultPrevented||(s.current||a.triggerRef.current?.focus(),t.preventDefault()),s.current=!1,n.current=!1},onInteractOutside:t=>{e.onInteractOutside?.(t),t.defaultPrevented||(s.current=!0,"pointerdown"!==t.detail.originalEvent.type||(n.current=!0));let r=t.target;a.triggerRef.current?.contains(r)&&t.preventDefault(),"focusin"===t.detail.originalEvent.type&&n.current&&t.preventDefault()}})}),q=r.forwardRef((e,t)=>{let{__scopeDialog:a,trapFocus:s,onOpenAutoFocus:o,onCloseAutoFocus:l,...i}=e,p=w(O,a),u=r.useRef(null),m=(0,n.s)(t,u);return(0,h.Oh)(),(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)(c.n,{asChild:!0,loop:!0,trapped:s,onMountAutoFocus:o,onUnmountAutoFocus:l,children:(0,j.jsx)(d.qW,{role:"dialog",id:p.contentId,"aria-describedby":p.descriptionId,"aria-labelledby":p.titleId,"data-state":J(p.open),...i,ref:m,onDismiss:()=>p.onOpenChange(!1)})}),(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)(X,{titleId:p.titleId}),(0,j.jsx)(Z,{contentRef:u,descriptionId:p.descriptionId})]})]})}),z="DialogTitle",H=r.forwardRef((e,t)=>{let{__scopeDialog:a,...r}=e,s=w(z,a);return(0,j.jsx)(m.sG.h2,{id:s.titleId,...r,ref:t})});H.displayName=z;var M="DialogDescription",B=r.forwardRef((e,t)=>{let{__scopeDialog:a,...r}=e,s=w(M,a);return(0,j.jsx)(m.sG.p,{id:s.descriptionId,...r,ref:t})});B.displayName=M;var L="DialogClose",$=r.forwardRef((e,t)=>{let{__scopeDialog:a,...r}=e,n=w(L,a);return(0,j.jsx)(m.sG.button,{type:"button",...r,ref:t,onClick:(0,s.m)(e.onClick,()=>n.onOpenChange(!1))})});function J(e){return e?"open":"closed"}$.displayName=L;var U="DialogTitleWarning",[W,V]=(0,o.q)(U,{contentName:O,titleName:z,docsSlug:"dialog"}),X=({titleId:e})=>{let t=V(U),a=`\`${t.contentName}\` requires a \`${t.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${t.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${t.docsSlug}`;return r.useEffect(()=>{e&&!document.getElementById(e)&&console.error(a)},[a,e]),null},Z=({contentRef:e,descriptionId:t})=>{let a=V("DialogDescriptionWarning"),s=`Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${a.contentName}}.`;return r.useEffect(()=>{let a=e.current?.getAttribute("aria-describedby");t&&a&&!document.getElementById(t)&&console.warn(s)},[s,e,t]),null},Y=C,K=D,Q=I,ee=E,et=F,ea=H,er=B,es=$}};var t=require("../../../../../webpack-runtime.js");t.C(e);var a=e=>t(t.s=e),r=t.X(0,[638,532,270,281,914,905],()=>a(79581));module.exports=r})();