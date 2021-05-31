import{r as e,o as t,c as s,a as r,b as o,d as n,e as a,I as i,_ as u}from"./vendor.c9613fcf.js";const l={};let c;l.render=function(r,o){const n=e("router-view");return t(),s(n)};const m={},d=function(e,t){if(!t)return e();if(void 0===c){const e=document.createElement("link").relList;c=e&&e.supports&&e.supports("modulepreload")?"modulepreload":"preload"}return Promise.all(t.map((e=>{if(e in m)return;m[e]=!0;const t=e.endsWith(".css"),s=t?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${e}"]${s}`))return;const r=document.createElement("link");return r.rel=t?"stylesheet":c,t||(r.as="script",r.crossOrigin=""),r.href=e,document.head.appendChild(r),t?new Promise(((e,t)=>{r.addEventListener("load",e),r.addEventListener("error",t)})):void 0}))).then((()=>e()))},p="token",h=r({strict:!1,modules:{http:{namespaced:!0,state:()=>({requests:[]}),mutations:{add(e,t){e.requests.push(t)},remove(e,t){let s=e.requests.findIndex((e=>e.key===t));-1!==s&&e.requests.splice(s,1)},clear(e){e.requests.forEach((e=>{e.cancel("cancel")})),e.requests.length=0}},getters:{getByKey:e=>t=>e.requests.find((e=>e.key===t))}},userStore:{namespaced:!0,state:()=>({token:sessionStorage.getItem("token")}),mutations:{setToken:(e,t)=>{e.token=t,sessionStorage.setItem("token",t)},removeToken:e=>{e.token=null,sessionStorage.removeItem("token")}},actions:{reset:({commit:e})=>{e("removeToken")}},getters:{getToken:e=>e.token}}}}),k=o({history:n(),routes:[{path:"/",name:"default",component:()=>d((()=>import("./Default.76ba63c8.js")),["/assets/Default.76ba63c8.js","/assets/vendor.c9613fcf.js"]),meta:{requireAuth:!0}},{path:"/test",name:"test",component:()=>d((()=>import("./Index.daa815a0.js")),["/assets/Index.daa815a0.js","/assets/vendor.c9613fcf.js"]),meta:{requireAuth:!0}},{path:"/login",name:"login",component:()=>d((()=>import("./Login.a0692d93.js")),["/assets/Login.a0692d93.js","/assets/Login.b4a11e0e.css","/assets/vendor.c9613fcf.js"]),meta:{requireAuth:!1}}],scrollBehavior:(e,t,s)=>s||{top:0}});k.beforeEach(((e,t,s)=>{if(h.commit("http/clear"),e.matched.some((e=>e.meta.requireAuth))){h.getters["userStore/getToken"]?s():s({path:"/login",query:{redirect:e.fullPath}})}else s()}));const f={mounted:(e,t)=>{e.addEventListener("click",(()=>{e.disabled||(e.disabled=!0,setTimeout((()=>{e.disabled=!1}),t.value||1e3))}))}};a(l).use(k).use(h).use(i,{size:"mini",locale:u}).directive("intervalClick",f).mount("#app");export{p as T,h as s};
