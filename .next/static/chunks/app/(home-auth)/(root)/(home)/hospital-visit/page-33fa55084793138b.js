(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7540],{5884:(e,t,a)=>{Promise.resolve().then(a.bind(a,5694))},5694:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>f});var s=a(5155),r=a(4085),n=a(6046),i=a(2115),l=a(7837),o=a(2336),d=a(8636),c=a(7058),u=a(241),m=a(9462);let f=()=>{let[e,t]=(0,i.useState)(""),[a,f]=(0,i.useState)(!1),[p,x]=(0,i.useState)([]),[h,g]=(0,i.useState)(null),{selectedUser:b,setSelectedUser:N}=(0,d.k)(),[v,j]=(0,i.useState)([]),y=(0,n.useRouter)(),{toast:w}=(0,u.dj)();(0,i.useEffect)(()=>{(async()=>{try{let e=(await (0,c.GG)((0,c.rJ)(m.db,"patients"))).docs.map(e=>({id:e.id,nationalId:e.data().nationalId||"",firstName:e.data().firstName||"",lastName:e.data().lastName||"",dateOfBirth:e.data().dateOfBirth||"",gender:e.data().gender||"",bloodGroup:e.data().bloodGroup||"",phoneNumber:e.data().phoneNumber||"",name:"".concat(e.data().firstName," ").concat(e.data().lastName)||"",phone:e.data().phoneNumber||"",sex:e.data().gender||"",dob:e.data().dateOfBirth||"",email:e.data().email||"",insuranceProvider:e.data().insuranceProvider||"",insurancePolicyNumber:e.data().insurancePolicyNumber||""}));j(e)}catch(e){console.error("Error fetching patients:",e),w({description:"Error fetching patients"})}})()},[w]);let S=e=>{t("".concat(e.firstName," ").concat(e.lastName)),N({...e,id:Number(e.nationalId),name:"".concat(e.firstName," ").concat(e.lastName),phone:e.phoneNumber,sex:e.gender,dob:e.dateOfBirth,email:e.email,insuranceProvider:e.insuranceProvider,insurancePolicyNumber:e.insurancePolicyNumber}),x([])};return(0,s.jsx)("div",{className:"h-screen w-full font-poppins flex justify-center p-2 overflow-scroll",children:(0,s.jsxs)("div",{className:"w-full md:w-1/2",children:[(0,s.jsx)("h1",{className:"text-3xl text-center",children:"Welcome to the Hospital"}),(0,s.jsxs)("p",{className:"text-center text-gray-400 mt-3",children:["Enter the ","patient's"," Service Id/Name"]}),(0,s.jsxs)("div",{className:"mt-10 flex justify-center items-center gap-10 flex-col",children:[(0,s.jsx)(o.p,{placeholder:"Enter Id Number",value:e,onChange:e=>{let a=e.target.value.trim().toLowerCase();if(t(a),!a){x([]);return}x(v.filter(e=>"".concat(e.firstName," ").concat(e.lastName).toLowerCase().includes(a)||e.nationalId.includes(a)))},className:"font-poppins text-3xl focus-visible:ring-0 focus-visible:ring-offset-0 p-2 capitalize"}),p.length>0&&(0,s.jsx)("div",{className:"w-full md:w-3/4 bg-white border rounded-md overflow-y-auto",children:p.map(e=>(0,s.jsxs)("div",{onClick:()=>S(e),className:"p-2 cursor-pointer flex flex-row gap-2 items-center justify-between",children:[(0,s.jsx)("p",{children:e.firstName}),(0,s.jsx)("p",{children:e.nationalId})]},e.id))}),(0,s.jsxs)("div",{className:"w-full flex flex-col gap-5 items-center",children:[(0,s.jsx)("h1",{children:"New Patient Registration"}),(0,s.jsx)("div",{className:"w-full flex items-center justify-center",children:(0,s.jsx)(r.$,{onClick:()=>y.push("patient-registration"),className:"bg-green-1 w-1/2",children:"Register"})})]}),(0,s.jsx)("h1",{className:"text-lg font-semibold hidden",children:"Select Payment Method"}),(0,s.jsxs)("div",{className:"flex-row gap-2 hidden",children:[(0,s.jsx)("button",{className:"p-3 border rounded-md w-full ".concat("Insurance"===h?"bg-green-1 text-white":"bg-gray-100"),onClick:()=>g("Insurance"),children:"Insurance"}),(0,s.jsx)("button",{className:"p-3 border rounded-md w-full ".concat("M-Pesa"===h?"bg-green-1  text-white":"bg-gray-100"),onClick:()=>g("M-Pesa"),children:"M-Pesa"}),(0,s.jsx)("button",{className:"p-3 border rounded-md w-full ".concat("Card"===h?"bg-green-1 text-white":"bg-gray-100"),onClick:()=>g("Card"),children:"Card Payment"})]}),(0,s.jsx)(r.$,{onClick:()=>{if(!b){alert("Please select a patient before continuing.");return}f(!0)},className:"w-1/2 bg-green-1",children:"Continue"})]}),(0,s.jsx)(l.lG,{open:a,onOpenChange:f,children:(0,s.jsxs)(l.Cf,{className:"font-poppins",children:[(0,s.jsxs)("h1",{className:"font-poppins text-center mb-5 text-lg",children:["Welcome to Lanet Regional Hospital"," ",(0,s.jsx)("span",{className:"font-semibold capitalize",children:null==b?void 0:b.name})]}),(0,s.jsxs)("div",{className:"flex flex-col gap-5",children:[(0,s.jsxs)("div",{className:"gap-2 flex flex-col",children:[(0,s.jsx)("label",{children:"Email"}),(0,s.jsx)("div",{className:"border p-2 rounded-md",children:null==b?void 0:b.email})]}),(0,s.jsxs)("div",{className:"gap-2 flex flex-col",children:[(0,s.jsx)("label",{children:"National Id Number"}),(0,s.jsx)("div",{className:"border p-2 rounded-md",children:null==b?void 0:b.id})]}),(0,s.jsxs)("div",{className:"flex flex-row gap-3 w-full",children:[(0,s.jsxs)("div",{className:"gap-2 flex flex-col w-1/2",children:[(0,s.jsx)("label",{children:"Sex"}),(0,s.jsx)("div",{className:"border p-2 rounded-md",children:null==b?void 0:b.sex})]}),(0,s.jsxs)("div",{className:"gap-2 flex flex-col w-1/2",children:[(0,s.jsx)("label",{children:"Date of Birth"}),(0,s.jsx)("div",{className:"border p-2 rounded-md",children:null==b?void 0:b.dob})]})]})]}),(0,s.jsx)("div",{className:"w-full flex items-center justify-center",children:(0,s.jsx)(r.$,{onClick:()=>y.push("/triage?user=".concat(encodeURIComponent(JSON.stringify(b)),"&payment=").concat(encodeURIComponent(h))),className:"bg-green-1",children:"Continue to Triage"})})]})})]})})}},4085:(e,t,a)=>{"use strict";a.d(t,{$:()=>d});var s=a(5155),r=a(2115),n=a(2317),i=a(1027),l=a(9602);let o=(0,i.F)("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",{variants:{variant:{default:"bg-primary text-primary-foreground shadow hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",outline:"border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-9 px-4 py-2",sm:"h-8 rounded-md px-3 text-xs",lg:"h-10 rounded-md px-8",icon:"h-9 w-9"}},defaultVariants:{variant:"default",size:"default"}}),d=r.forwardRef((e,t)=>{let{className:a,variant:r,size:i,asChild:d=!1,...c}=e,u=d?n.DX:"button";return(0,s.jsx)(u,{className:(0,l.cn)(o({variant:r,size:i,className:a})),ref:t,...c})});d.displayName="Button"},7837:(e,t,a)=>{"use strict";a.d(t,{Cf:()=>f,HM:()=>u,L3:()=>x,c7:()=>p,lG:()=>o,rr:()=>h,zM:()=>d});var s=a(5155),r=a(2115),n=a(6217),i=a(689),l=a(9602);let o=n.bL,d=n.l9,c=n.ZL,u=n.bm,m=r.forwardRef((e,t)=>{let{className:a,...r}=e;return(0,s.jsx)(n.hJ,{ref:t,className:(0,l.cn)("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",a),...r})});m.displayName=n.hJ.displayName;let f=r.forwardRef((e,t)=>{let{className:a,children:r,...o}=e;return(0,s.jsxs)(c,{children:[(0,s.jsx)(m,{}),(0,s.jsxs)(n.UC,{ref:t,className:(0,l.cn)("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",a),...o,children:[r,(0,s.jsxs)(n.bm,{className:"absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",children:[(0,s.jsx)(i.A,{className:"h-4 w-4"}),(0,s.jsx)("span",{className:"sr-only",children:"Close"})]})]})]})});f.displayName=n.UC.displayName;let p=e=>{let{className:t,...a}=e;return(0,s.jsx)("div",{className:(0,l.cn)("flex flex-col space-y-1.5 text-center sm:text-left",t),...a})};p.displayName="DialogHeader";let x=r.forwardRef((e,t)=>{let{className:a,...r}=e;return(0,s.jsx)(n.hE,{ref:t,className:(0,l.cn)("text-lg font-semibold leading-none tracking-tight",a),...r})});x.displayName=n.hE.displayName;let h=r.forwardRef((e,t)=>{let{className:a,...r}=e;return(0,s.jsx)(n.VY,{ref:t,className:(0,l.cn)("text-sm text-muted-foreground",a),...r})});h.displayName=n.VY.displayName},2336:(e,t,a)=>{"use strict";a.d(t,{p:()=>i});var s=a(5155),r=a(2115),n=a(9602);let i=r.forwardRef((e,t)=>{let{className:a,type:r,...i}=e;return(0,s.jsx)("input",{type:r,className:(0,n.cn)("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",a),ref:t,...i})});i.displayName="Input"},9462:(e,t,a)=>{"use strict";a.d(t,{db:()=>l});var s=a(9904),r=a(7058);let n={apiKey:"AIzaSyDIZQy5i3zC0WavjxkAMHKmku0aCMrKoe4",authDomain:"hospital-management-53831.firebaseapp.com",projectId:"hospital-management-53831",storageBucket:"hospital-management-53831.firebasestorage.app",messagingSenderId:"705193792980",appId:"1:705193792980:web:019035ff9af8a7139ab241",measurementId:a(2818).env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID},i=(0,s.Wp)(n),l=(0,r.aU)(i)},241:(e,t,a)=>{"use strict";a.d(t,{dj:()=>m});var s=a(2115);let r=0,n=new Map,i=e=>{if(n.has(e))return;let t=setTimeout(()=>{n.delete(e),c({type:"REMOVE_TOAST",toastId:e})},1e6);n.set(e,t)},l=(e,t)=>{switch(t.type){case"ADD_TOAST":return{...e,toasts:[t.toast,...e.toasts].slice(0,1)};case"UPDATE_TOAST":return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case"DISMISS_TOAST":{let{toastId:a}=t;return a?i(a):e.toasts.forEach(e=>{i(e.id)}),{...e,toasts:e.toasts.map(e=>e.id===a||void 0===a?{...e,open:!1}:e)}}case"REMOVE_TOAST":if(void 0===t.toastId)return{...e,toasts:[]};return{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)}}},o=[],d={toasts:[]};function c(e){d=l(d,e),o.forEach(e=>{e(d)})}function u(e){let{...t}=e,a=(r=(r+1)%Number.MAX_SAFE_INTEGER).toString(),s=()=>c({type:"DISMISS_TOAST",toastId:a});return c({type:"ADD_TOAST",toast:{...t,id:a,open:!0,onOpenChange:e=>{e||s()}}}),{id:a,dismiss:s,update:e=>c({type:"UPDATE_TOAST",toast:{...e,id:a}})}}function m(){let[e,t]=s.useState(d);return s.useEffect(()=>(o.push(t),()=>{let e=o.indexOf(t);e>-1&&o.splice(e,1)}),[e]),{...e,toast:u,dismiss:e=>c({type:"DISMISS_TOAST",toastId:e})}}},9602:(e,t,a)=>{"use strict";a.d(t,{cn:()=>n});var s=a(3463),r=a(9795);function n(){for(var e=arguments.length,t=Array(e),a=0;a<e;a++)t[a]=arguments[a];return(0,r.QP)((0,s.$)(t))}},8636:(e,t,a)=>{"use strict";a.d(t,{k:()=>n});var s=a(9827),r=a(709);let n=(0,s.v)()((0,r.Zr)(e=>({selectedUser:null,setSelectedUser:t=>e({selectedUser:t})}),{name:"user-storage"}))}},e=>{var t=t=>e(e.s=t);e.O(0,[2992,1181,4927,3307,6978,6670,8441,1517,7358],()=>t(5884)),_N_E=e.O()}]);