let locomotiveScroll;gsap.registerPlugin(ScrollTrigger);let nextNamespace="";function initScript(){"ontouchstart"in window||navigator.maxTouchPoints?(initializeBasedOnNamespace(),initMenuButton(),customStyles()):(initializeBasedOnNamespace(),initMenuButton(),initMagneticEffect(),initStickyCursor())}function initializeBasedOnNamespace(){let e=document.querySelector('[data-barba="container"]');if(e)switch(e.getAttribute("data-barba-namespace")){case"home":initLoaderHome(),initFooter();break;case"about-me":initLoaderAbout(),initFooter();break;case"contact":initLoaderContact();break;case"recent-work":initLoaderRecentWork(),initLazyLoadAndPlayVideoInview(),initFooter()}else console.warn("Barba container not found")}function initScrollLetters(){let e=1,t=function(e,t,o){(t=t||{}).ease||(t.ease="none");let a=gsap.timeline({repeat:-1,onReverseComplete(){this.totalTime(this.rawTime()+10*this.duration())}}),r=gsap.utils.toArray(e),n=r.map(e=>{let t=e.cloneNode(!0);return t.style.opacity="1",gsap.set(t,{transform:"translate3d(0px, 0px, 0px)",overwrite:!0}),e.parentNode.appendChild(t),t}),i=()=>r.forEach((e,t)=>gsap.set(n[t],{overwrite:!1,top:e.offsetTop,left:e.offsetLeft+(o?-e.offsetWidth:e.offsetWidth)}));return i(),r.forEach((e,r)=>a.to([e,n[r]],{xPercent:o?100:-100,...t},0)),window.addEventListener("resize",()=>{let e=a.totalTime();a.totalTime(0),i(),a.totalTime(e)}),a}(".lukasz",{duration:10});ScrollTrigger.create({onUpdate(o){o.direction!==e&&(e*=-1,gsap.to([t],{timeScale:e,overwrite:!0}))}})}function initLoaderHome(){let e=gsap.timeline();e.fromTo(".me img",{y:"+=700",opacity:0},{y:0,opacity:1,duration:1,ease:"Power4.easeOut"}),e.fromTo(".lukasz",{y:"+=100",opacity:0},{y:0,opacity:1,duration:1,ease:"Power4.easeOut",onComplete:initScrollLetters}),gsap.utils.toArray(".ddd").forEach((t,o)=>{e.fromTo(t.children,{y:"+=100",opacity:0},{y:0,opacity:1,stagger:.2,duration:1,ease:"Power4.easeOut"},"+="+.5*o)}),gsap.utils.toArray(".animateObject").forEach(e=>{gsap.fromTo(e.children,{y:"+=100",opacity:0},{y:0,opacity:1,duration:.8,ease:"Power4.easeOut",scrollTrigger:{trigger:e,start:"top 70%",end:"top 20%",toggleActions:"play none none none"}})}),function(){let e=document.querySelector(".playpauzehome");if(e){let t=e.querySelector("video");ScrollTrigger.create({trigger:t,start:"10% 100%",end:"100% 80%",onEnter(){t.readyState>=3&&t.play().catch(e=>console.error("Error playing video:",e))},onLeave:()=>t.pause(),onEnterBack(){t.readyState>=3&&t.play().catch(e=>console.error("Error playing video:",e))},onLeaveBack:()=>t.pause()})}}()}function initLoaderRecentWork(){gsap.fromTo(".recent-work",{scale:2,opacity:0},{opacity:1,duration:.5,scale:1,ease:"Power4.easeOut",scrollTrigger:{trigger:".recent-work",end:"bottom 50%",toggleActions:"play reverse play reverse"}})}function initLazyLoadAndPlayVideoInview(){gsap.utils.toArray(".playpauze").forEach(e=>{let t=e.querySelector("video");ScrollTrigger.create({trigger:t,start:"top bottom",onEnter(){t.src||(t.src=t.getAttribute("data-src"),t.preload="auto",t.load(),setTimeout(()=>{t.play()},100))}}),ScrollTrigger.create({trigger:t,start:"0% 60%",end:"100% 40%",onEnter(){t.readyState>=3&&t.play().catch(e=>console.error("Error playing video:",e))},onLeave:()=>t.pause(),onEnterBack(){t.readyState>=3&&t.play().catch(e=>console.error("Error playing video:",e))},onLeaveBack:()=>t.pause()})})}function initLoaderAbout(){let e=gsap.timeline();e.fromTo(".about-me-img img",{y:"+=700",opacity:0},{y:0,opacity:1,duration:1,ease:"Power4.easeOut"}),gsap.utils.toArray(".about-me-text").forEach(t=>{e.fromTo(t.children,{y:"+=100",opacity:0},{y:0,opacity:1,stagger:.2,duration:1,ease:"Power4.easeOut"})}),gsap.utils.toArray(".bold-effect span").forEach(t=>{e.to(t,{}),ScrollTrigger.create({start:"top+=100",toogleClass:"active",onEnter:()=>t.classList.add("active")})}),ScrollTrigger.create({trigger:".help-with",start:"top 70%",end:"top 60%",animation:gsap.fromTo(".help-with",{opacity:0},{opacity:1,duration:1,ease:"Power4.easeOut"})}),gsap.utils.toArray(".help-with-anim").forEach(e=>{ScrollTrigger.create({trigger:e,start:"top 70%",end:"top 60%",animation:gsap.fromTo(e.children,{y:"+=700",opacity:0},{y:"0",opacity:1,duration:.8,ease:"Power4.easeOut"})})})}function initFooter(){let e=gsap.timeline();e.fromTo(".footer-contact",{y:"+=700",opacity:0},{y:"0",opacity:1,duration:1,ease:"Power4.easeOut"}),gsap.utils.toArray(".animate-footer").forEach(t=>{e.fromTo(t,{y:"+=100",opacity:0},{y:0,opacity:1,duration:.5,ease:"Power4.easeOut"})})}function initLoaderContact(){let e=gsap.timeline();e.fromTo(".animate-contact",{y:"+=700",opacity:0},{y:"0",opacity:1,duration:1,ease:"Power4.easeOut"}),gsap.utils.toArray(".business-details").forEach(t=>{e.fromTo(t,{y:"+=100",opacity:0},{y:0,opacity:1,duration:.5,ease:"Power4.easeOut"})})}initPageTransitions();const initMagneticEffect=()=>{let e=document.querySelectorAll(".button-container .circle-button"),t=document.querySelector(".wpforms-submit-container .circle-button"),o=document.querySelectorAll("#primary-menu li a"),a=document.querySelectorAll(".site-info a"),r=(e,t,o=t)=>{window.innerWidth>540&&(NodeList.prototype.isPrototypeOf(e)||(e=[e]),e.forEach(e=>{let a=e.querySelector("a")||e;e.addEventListener("mousemove",r=>{n(r,e,t),a!==e&&n(r,a,o)}),e.addEventListener("mouseleave",()=>{i(e),a!==e&&i(a)})}))},n=(e,t,o)=>{let a=t.getBoundingClientRect(),r=(e.clientX-(a.left+a.width/2))*o/a.width,n=(e.clientY-(a.top+a.height/2))*o/a.height;gsap.to(t,1.5,{x:r,y:n,ease:Power4.easeOut})},i=e=>{gsap.to(e,1.5,{x:0,y:0,ease:Elastic.easeOut})};r(e,30,60),t&&r(t,50),r(o,40),r(a,25)};function initMenuButton(){ScrollTrigger.create({start:"top+=20",end:"top+=10",onEnter:()=>animMenuButton(!0),onLeaveBack:()=>animMenuButton(!1),toggleActions:"play none none reverse"})}function animMenuButton(e){e?gsap.fromTo(".menu-toggle",{opacity:0,x:"+=100",y:"+=50",rotation:90},{opacity:1,scale:1,x:0,y:0,rotation:0,duration:.5,ease:"Power4.easeOut",onStart:()=>document.querySelector(".menu-toggle").classList.add("active")}):gsap.to(".menu-toggle",{opacity:0,x:"+=100",y:"+=50",rotation:90,duration:.5,ease:"Power4.easeOut",onComplete:()=>document.querySelector(".menu-toggle").classList.remove("active")})}function updateNamespace(e){currentNamespace=e}function initCurrentNamespace(){let e=document.querySelector('[data-barba="container"]');e&&updateNamespace(e.getAttribute("data-barba-namespace"))}function initHomeWord(e){updateNamespace();let t=document.querySelector(".loading-words");if(t){for(;t.firstChild;)t.removeChild(t.firstChild);["Hola","Bonjour","Hello","Guten Tag","Cześć"].forEach((e,o)=>{let a=document.createElement("h2");a.textContent=e,2===o&&a.classList.add("active"),t.appendChild(a)})}}function initNextWord(e){updateNamespace(nextNamespace=new DOMParser().parseFromString(e.next.html,"text/html").querySelector('[data-barba="container"]').getAttribute("data-barba-namespace"));let t={home:"Home","about-me":"About Me",contact:"Contact","recent-work":"Portfolio"}[nextNamespace]||"404",o=document.querySelector(".loading-words");if(o){let a=o.querySelectorAll("h2");a.forEach((e,o)=>{0===o||o===a.length-1?e.textContent="":e.textContent=t})}}function delay(e){return e=e||2e3,new Promise(t=>{setTimeout(()=>{t()},e)})}function initWPFormsRemove(){"contact"===currentNamespace&&"function"==typeof turnstile.remove&&turnstile.remove()}window.initWPFormsRender=function(){"contact"===currentNamespace&&"function"==typeof turnstile.render&&turnstile.render(".g-recaptcha",{sitekey:"0x4AAAAAAAQGmZFNE8lQMRx1",action:"FormID-31",callback:function(e){console.log(`Challenge Success: ${e}`)}})};const container=document.querySelector("[data-scroll-container]");function initSmoothScroll(e){locomotiveScroll&&locomotiveScroll.destroy(),locomotiveScroll=new LocomotiveScroll({el:e,smooth:!0})}function initPageTransitions(){barba.init({sync:!0,debug:!1,timeout:7e3,transitions:[{name:"default",async once(e){initNextWord(e),pageTransitionIn(),await delay(1300),initScript(),initSmoothScroll(),window.scrollTo(0,0)},async leave(e){pageTransitionOut(),await delay(100)},async enter(e){await delay(100),pageTransitionIn(),await delay(1300)},async beforeEnter(e){initNextWord(e),initWPFormsRemove()},async afterEnter(e){setTimeout(()=>{initScript()},100),setTimeout(()=>{initNavigation()},100),initSmoothScroll(),window.scrollTo(0,0),setTimeout(()=>{initWPFormsRender()},100)}},{name:"home",from:{},to:{namespace:["home"]},async once(e){window.scrollTo(0,0),initHomeWord(),pageTransitionIn(),await delay(1300),initScript(),initSmoothScroll()}},]})}function pageTransitionIn(){gsap.timeline().set("html",{cursor:"wait"}).to(".loading-screen",{duration:.5,top:"0%",ease:"Power4.easeIn"}).to(".loading-words h2",{duration:.8,y:"-100px",opacity:1,ease:"Power4.easeOut",stagger:.1,display:"block"},"-=0.25").to(".loading-screen",{duration:.8,top:"-100%",ease:"Power3.easeInOut"},"-=0.2").set("html",{cursor:"auto"}).set(".loading-screen",{top:"calc(100%)"})}function pageTransitionOut(){gsap.timeline().to("[data-scroll-container]",{duration:.8,y:"-100px",stagger:.1,ease:"Expo.easeOut",delay:.8,clearProps:"true"})}function initStickyCursor(){let e=document.querySelector(".cursor-follower"),t=0,o=0,a=0,r=0,n=()=>{t+=(a-t)/9,o+=(r-o)/9,gsap.set(e,{x:t-15,y:o-15}),requestAnimationFrame(n)};requestAnimationFrame(n),document.addEventListener("mousemove",e=>{a=e.clientX,r=e.clientY});let i=document.querySelectorAll("a"),c=()=>e.style.opacity="0",l=()=>e.style.opacity="1";i.forEach(e=>{e.addEventListener("mouseenter",c),e.addEventListener("mouseleave",l)})}function customStyles(){var e=document.createElement("style");e.type="text/css";var t="\n      html, body {\n        overflow: auto;\n      }\n      .cursor-follower {\n        display: none;\n      }\n  ";e.styleSheet?e.styleSheet.cssText=t:e.appendChild(document.createTextNode(t)),document.head.appendChild(e)}

// let locomotiveScroll;
// gsap.registerPlugin(ScrollTrigger);
// let nextNamespace = "";
// function initScript() {
//     "ontouchstart" in window || navigator.maxTouchPoints ? (initializeBasedOnNamespace(), initMenuButton(), customStyles()) : (initializeBasedOnNamespace(), initMenuButton(), initMagneticEffect(), initStickyCursor());
// }
// function initializeBasedOnNamespace() {
//     const e = document.querySelector('[data-barba="container"]');
//     if (e) {
//         switch (e.getAttribute("data-barba-namespace")) {
//             case "home":
//                 initLoaderHome(), initFooter();
//                 break;
//             case "about-me":
//                 initLoaderAbout(), initFooter();
//                 break;
//             case "contact":
//                 initLoaderContact();
//                 break;
//             case "recent-work":
//                 initLoaderRecentWork(), initLazyLoadAndPlayVideoInview(), initFooter();
//         }
//     } else console.warn("Barba container not found");
// }
// function initScrollLetters() {
//     let e = 1;
//     const t = (function (e, t, o) {
//         (t = t || {}).ease || (t.ease = "none");
//         const a = gsap.timeline({
//                 repeat: -1,
//                 onReverseComplete() {
//                     this.totalTime(this.rawTime() + 10 * this.duration());
//                 },
//             }),
//             n = gsap.utils.toArray(e),
//             r = n.map((e) => {
//                 let t = e.cloneNode(!0);
//                 return (t.style.opacity = "1"), gsap.set(t, { transform: "translate3d(0px, 0px, 0px)", overwrite: !0 }), e.parentNode.appendChild(t), t;
//             }),
//             i = () => n.forEach((e, t) => gsap.set(r[t], { overwrite: !1, top: e.offsetTop, left: e.offsetLeft + (o ? -e.offsetWidth : e.offsetWidth) }));
//         return (
//             i(),
//             n.forEach((e, n) => a.to([e, r[n]], { xPercent: o ? 100 : -100, ...t }, 0)),
//             window.addEventListener("resize", () => {
//                 let e = a.totalTime();
//                 a.totalTime(0), i(), a.totalTime(e);
//             }),
//             a
//         );
//     })(".lukasz", { duration: 10 });
//     ScrollTrigger.create({
//         onUpdate(o) {
//             o.direction !== e && ((e *= -1), gsap.to([t], { timeScale: e, overwrite: !0 }));
//         },
//     });
// }
// function initLoaderHome() {
//     const e = gsap.timeline();
//     e.fromTo(".me img", { y: "+=700", opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "Power4.easeOut" }),
//         e.fromTo(".lukasz", { y: "+=100", opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "Power4.easeOut", onComplete: initScrollLetters }),
//         gsap.utils.toArray(".ddd").forEach((t, o) => {
//             e.fromTo(t.children, { y: "+=100", opacity: 0 }, { y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: "Power4.easeOut" }, "+=" + 0.5 * o);
//         }),
//         gsap.utils.toArray(".animateObject").forEach((e) => {
//             gsap.fromTo(e.children, { y: "+=100", opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "Power4.easeOut", scrollTrigger: { trigger: e, start: "top 70%", end: "top 20%", toggleActions: "play none none none" } });
//         }),
//         (function () {
//             let e = document.querySelector(".playpauzehome");
//             if (e) {
//                 let t = e.querySelector("video");
//                 ScrollTrigger.create({
//                     trigger: t,
//                     start: "10% 100%",
//                     end: "100% 80%",
//                     onEnter: () => {
//                         t.readyState >= 3 && t.play().catch((e) => console.error("Error playing video:", e));
//                     },
//                     onLeave: () => t.pause(),
//                     onEnterBack: () => {
//                         t.readyState >= 3 && t.play().catch((e) => console.error("Error playing video:", e));
//                     },
//                     onLeaveBack: () => t.pause(),
//                 });
//             }
//         })();
// }
// function initLoaderRecentWork() {
//     gsap.fromTo(".recent-work", { scale: 2, opacity: 0 }, { opacity: 1, duration: 0.5, scale: 1, ease: "Power4.easeOut", scrollTrigger: { trigger: ".recent-work", end: "bottom 50%", toggleActions: "play reverse play reverse" } });
// }
// function initLazyLoadAndPlayVideoInview() {
//     gsap.utils.toArray(".playpauze").forEach((e) => {
//         let t = e.querySelector("video");
//         ScrollTrigger.create({
//             trigger: t,
//             start: "top bottom",
//             onEnter: () => {
//                 t.src ||
//                     ((t.src = t.getAttribute("data-src")),
//                     (t.preload = "auto"),
//                     t.load(),
//                     setTimeout(() => {
//                         t.play();
//                     }, 100));
//             },
//         }),
//             ScrollTrigger.create({
//                 trigger: t,
//                 start: "0% 60%",
//                 end: "100% 40%",
//                 onEnter: () => {
//                     t.readyState >= 3 && t.play().catch((e) => console.error("Error playing video:", e));
//                 },
//                 onLeave: () => t.pause(),
//                 onEnterBack: () => {
//                     t.readyState >= 3 && t.play().catch((e) => console.error("Error playing video:", e));
//                 },
//                 onLeaveBack: () => t.pause(),
//             });
//     });
// }
// function initLoaderAbout() {
//     const e = gsap.timeline();
//     e.fromTo(".about-me-img img", { y: "+=700", opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "Power4.easeOut" }),
//         gsap.utils.toArray(".about-me-text").forEach((t) => {
//             e.fromTo(t.children, { y: "+=100", opacity: 0 }, { y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: "Power4.easeOut" });
//         }),
//         gsap.utils.toArray(".bold-effect span").forEach((t) => {
//             e.to(t, {}), ScrollTrigger.create({ start: "top+=100", toogleClass: "active", onEnter: () => t.classList.add("active") });
//         }),
//         ScrollTrigger.create({ trigger: ".help-with", start: "top 70%", end: "top 60%", animation: gsap.fromTo(".help-with", { opacity: 0 }, { opacity: 1, duration: 1, ease: "Power4.easeOut" }) }),
//         gsap.utils.toArray(".help-with-anim").forEach((e) => {
//             ScrollTrigger.create({ trigger: e, start: "top 70%", end: "top 60%", animation: gsap.fromTo(e.children, { y: "+=700", opacity: 0 }, { y: "0", opacity: 1, duration: 0.8, ease: "Power4.easeOut" }) });
//         });
// }
// function initFooter() {
//     const e = gsap.timeline();
//     e.fromTo(".footer-contact", { y: "+=700", opacity: 0 }, { y: "0", opacity: 1, duration: 1, ease: "Power4.easeOut" }),
//         gsap.utils.toArray(".animate-footer").forEach((t) => {
//             e.fromTo(t, { y: "+=100", opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "Power4.easeOut" });
//         });
// }
// function initLoaderContact() {
//     const e = gsap.timeline();
//     e.fromTo(".animate-contact", { y: "+=700", opacity: 0 }, { y: "0", opacity: 1, duration: 1, ease: "Power4.easeOut" }),
//         gsap.utils.toArray(".business-details").forEach((t) => {
//             e.fromTo(t, { y: "+=100", opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "Power4.easeOut" });
//         });
// }
// initPageTransitions();
// const initMagneticEffect = () => {
//     const e = document.querySelectorAll(".button-container .circle-button"),
//         t = document.querySelector(".wpforms-submit-container .circle-button"),
//         o = document.querySelectorAll("#primary-menu li a"),
//         a = document.querySelectorAll(".site-info a"),
//         n = (e, t, o = t) => {
//             window.innerWidth > 540 &&
//                 (NodeList.prototype.isPrototypeOf(e) || (e = [e]),
//                 e.forEach((e) => {
//                     const a = e.querySelector("a") || e;
//                     e.addEventListener("mousemove", (n) => {
//                         r(n, e, t), a !== e && r(n, a, o);
//                     }),
//                         e.addEventListener("mouseleave", () => {
//                             i(e), a !== e && i(a);
//                         });
//                 }));
//         },
//         r = (e, t, o) => {
//             const a = t.getBoundingClientRect(),
//                 n = ((e.clientX - (a.left + a.width / 2)) * o) / a.width,
//                 r = ((e.clientY - (a.top + a.height / 2)) * o) / a.height;
//             gsap.to(t, 1.5, { x: n, y: r, ease: Power4.easeOut });
//         },
//         i = (e) => {
//             gsap.to(e, 1.5, { x: 0, y: 0, ease: Elastic.easeOut });
//         };
//     n(e, 30, 60), t && n(t, 50), n(o, 40), n(a, 25);
// };
// function initMenuButton() {
//     ScrollTrigger.create({ start: "top+=20", end: "top+=10", onEnter: () => animMenuButton(!0), onLeaveBack: () => animMenuButton(!1), toggleActions: "play none none reverse" });
// }
// function animMenuButton(e) {
//     e
//         ? gsap.fromTo(
//               ".menu-toggle",
//               { opacity: 0, x: "+=100", y: "+=50", rotation: 90 },
//               { opacity: 1, scale: 1, x: 0, y: 0, rotation: 0, duration: 0.5, ease: "Power4.easeOut", onStart: () => document.querySelector(".menu-toggle").classList.add("active") }
//           )
//         : gsap.to(".menu-toggle", { opacity: 0, x: "+=100", y: "+=50", rotation: 90, duration: 0.5, ease: "Power4.easeOut", onComplete: () => document.querySelector(".menu-toggle").classList.remove("active") });
// }
// function updateNamespace(e) {
//     currentNamespace = e;
// }
// function initCurrentNamespace() {
//     const e = document.querySelector('[data-barba="container"]');
//     e && updateNamespace(e.getAttribute("data-barba-namespace"));
// }
// function initHomeWord(e) {
//     updateNamespace();
//     const t = ["Hola", "Bonjour", "Hello", "Guten Tag", "Cześć"],
//         o = document.querySelector(".loading-words");
//     if (o) {
//         for (; o.firstChild; ) o.removeChild(o.firstChild);
//         t.forEach((e, t) => {
//             const a = document.createElement("h2");
//             (a.textContent = e), 2 === t && a.classList.add("active"), o.appendChild(a);
//         });
//     }
// }
// function initNextWord(e) {
//     let t = new DOMParser().parseFromString(e.next.html, "text/html");
//     (nextNamespace = t.querySelector('[data-barba="container"]').getAttribute("data-barba-namespace")), updateNamespace(nextNamespace);
//     let o = { home: "Home", "about-me": "About Me", contact: "Contact", "recent-work": "Portfolio" }[nextNamespace] || "404";
//     const a = document.querySelector(".loading-words");
//     if (a) {
//         const e = a.querySelectorAll("h2");
//         e.forEach((t, a) => {
//             0 === a || a === e.length - 1 ? (t.textContent = "") : (t.textContent = o);
//         });
//     }
// }
// function delay(e) {
//     return (
//         (e = e || 2e3),
//         new Promise((t) => {
//             setTimeout(() => {
//                 t();
//             }, e);
//         })
//     );
// }
// function initWPFormsRemove() {
//     "contact" === currentNamespace && "function" == typeof turnstile.remove && turnstile.remove();
// }
// window.initWPFormsRender = function () {
//     "contact" === currentNamespace &&
//         "function" == typeof turnstile.render &&
//         turnstile.render(".g-recaptcha", {
//             sitekey: "0x4AAAAAAAQGmZFNE8lQMRx1",
//             action: "FormID-31",
//             callback: function (e) {
//                 console.log(`Challenge Success: ${e}`);
//             },
//         });
// };
// const container = document.querySelector("[data-scroll-container]");
// function initSmoothScroll(e) {
//     locomotiveScroll && locomotiveScroll.destroy(), (locomotiveScroll = new LocomotiveScroll({ el: e, smooth: !0 }));
// }
// function initPageTransitions() {
//     barba.init({
//         sync: !0,
//         debug: !1,
//         timeout: 7e3,
//         transitions: [
//             {
//                 name: "default",
//                 async once(e) {
//                     initNextWord(e), pageTransitionIn(), await delay(1300), initScript(), initSmoothScroll(), window.scrollTo(0, 0);
//                 },
//                 async leave(e) {
//                     pageTransitionOut(), await delay(100);
//                 },
//                 async enter(e) {
//                     await delay(100), pageTransitionIn(), await delay(1300);
//                 },
//                 async beforeEnter(e) {
//                     initNextWord(e), initWPFormsRemove();
//                 },
//                 async afterEnter(e) {
//                     setTimeout(() => {
//                         initScript();
//                     }, 100),
//                         setTimeout(() => {
//                             initNavigation();
//                         }, 100),
//                         initSmoothScroll(),
//                         window.scrollTo(0, 0),
//                         setTimeout(() => {
//                             initWPFormsRender();
//                         }, 100);
//                 },
//             },
//             {
//                 name: "home",
//                 from: {},
//                 to: { namespace: ["home"] },
//                 async once(e) {
//                     window.scrollTo(0, 0), initHomeWord(), pageTransitionIn(), await delay(1300), initScript(), initSmoothScroll();
//                 },
//             },
//         ],
//     });
// }
// function pageTransitionIn() {
//     gsap.timeline()
//         .set("html", { cursor: "wait" })
//         .to(".loading-screen", { duration: 0.5, top: "0%", ease: "Power4.easeIn" })
//         .to(".loading-words h2", { duration: 0.8, y: "-100px", opacity: 1, ease: "Power4.easeOut", stagger: 0.1, display: "block" }, "-=0.25")
//         .to(".loading-screen", { duration: 0.8, top: "-100%", ease: "Power3.easeInOut" }, "-=0.2")
//         .set("html", { cursor: "auto" })
//         .set(".loading-screen", { top: "calc(100%)" });
// }
// function pageTransitionOut() {
//     gsap.timeline().to("[data-scroll-container]", { duration: 0.8, y: "-100px", stagger: 0.1, ease: "Expo.easeOut", delay: 0.8, clearProps: "true" });
// }
// function initStickyCursor() {
//     const e = document.querySelector(".cursor-follower");
//     let t = 0,
//         o = 0,
//         a = 0,
//         n = 0;
//     const r = () => {
//         (t += (a - t) / 9), (o += (n - o) / 9), gsap.set(e, { x: t - 15, y: o - 15 }), requestAnimationFrame(r);
//     };
//     requestAnimationFrame(r);
//     document.addEventListener("mousemove", (e) => {
//         (a = e.clientX), (n = e.clientY);
//     });
//     const i = document.querySelectorAll("a"),
//         c = () => (e.style.opacity = "0"),
//         s = () => (e.style.opacity = "1");
//     i.forEach((e) => {
//         e.addEventListener("mouseenter", c), e.addEventListener("mouseleave", s);
//     });
// }
// function customStyles() {
//     var e = document.createElement("style");
//     e.type = "text/css";
//     var t = "\n      html, body {\n        overflow: auto;\n      }\n      .cursor-follower {\n        display: none;\n      }\n  ";
//     e.styleSheet ? (e.styleSheet.cssText = t) : e.appendChild(document.createTextNode(t)), document.head.appendChild(e);
// }
