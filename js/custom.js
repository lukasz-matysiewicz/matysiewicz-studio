/* ------------------------------------------------------ General ------------------------------------------------------ */
gsap.registerPlugin(ScrollTrigger);
let locomotiveScroll;
let nextNamespace = '';

initPageTransitions();

function initScript() {
    
  function isTouchScreenDevice() {
      return 'ontouchstart' in window || navigator.maxTouchPoints;      
  };

  if(isTouchScreenDevice()){
      //TouchScreen
      initializeBasedOnNamespace();
      initMenuButton();
      customStyles();
  } else {
      //nonTouchScreen
      initializeBasedOnNamespace();
      initMenuButton();
      initMagneticEffect();
      initStickyCursor();
  }
}

function initializeBasedOnNamespace() {
  // Find the Barba container in the DOM

  const barbaContainer = document.querySelector('[data-barba="container"]');
  
  // Check if the Barba container exists
  if (barbaContainer) {
    const namespace = barbaContainer.getAttribute('data-barba-namespace');

    switch (namespace) {
      case 'home':
        initLoaderHome();
        //initScrollLetters();
        initFooter();
        //initLazyLoadAndPlayVideoInview();
        break;
      case 'about-me':
        initLoaderAbout();
        initFooter();
        break;
      case 'contact':
        initLoaderContact();
        break;
      case 'recent-work':
        initLoaderRecentWork();
        initLazyLoadAndPlayVideoInview();
        initFooter();
        break;
      case "wordpress-plugins":
        initLoaderPlugins(), 
        initFooter();
        break;
    }
  } else {
    console.warn('Barba container not found');
  }
}




/* ------------------------------------------------------ End of General ------------------------------------------------------ */



/**
* Scrolltrigger Scroll Letters Home
*/
/* ------------------------------------------------------ Home - Letters ------------------------------------------------------ */

function initScrollLetters() {
    // Scrolling Letters Both Direction
    // https://codepen.io/GreenSock/pen/rNjvgjo
    // Fixed example with resizing
    // https://codepen.io/GreenSock/pen/QWqoKBv?editors=0010
  
    let direction = 1; // 1 = forward, -1 = backward scroll
  
    const roll1 = roll(".lukasz", {duration: 10}),
          scroll = ScrollTrigger.create({
            //trigger: document.querySelector('[data-scroll-container]'),
            onUpdate(self) {
              if (self.direction !== direction) {
                direction *= -1;
                gsap.to([roll1], {timeScale: direction, overwrite: true});
              }
            }
          });
  
    // helper function that clones the targets, places them next to the original, then animates the xPercent in a loop to make it appear to roll across the screen in a seamless loop.
    function roll(targets, vars, reverse) {
      vars = vars || {};
      vars.ease || (vars.ease = "none");
      const tl = gsap.timeline({
              repeat: -1,
              onReverseComplete() { 
                this.totalTime(this.rawTime() + this.duration() * 10); // otherwise when the playhead gets back to the beginning, it'd stop. So push the playhead forward 10 iterations (it could be any number)
              }
            }), 
            elements = gsap.utils.toArray(targets),
            clones = elements.map(el => {
              let clone = el.cloneNode(true);
              clone.style.opacity = "1";
              gsap.set(clone, { transform: 'translate3d(0px, 0px, 0px)', overwrite: true });
              el.parentNode.appendChild(clone);
              return clone;
            }),
            positionClones = () => elements.forEach((el, i) => 
            gsap.set(clones[i], {
              overwrite: false, 
              top: el.offsetTop, 
              left: el.offsetLeft + (reverse ? -el.offsetWidth : el.offsetWidth)
            }));
      positionClones();
      elements.forEach((el, i) => tl.to([el, clones[i]], {xPercent: reverse ? 100 : -100, ...vars}, 0));
      window.addEventListener("resize", () => {
        let time = tl.totalTime(); // record the current time
        tl.totalTime(0); // rewind and clear out the timeline
        positionClones(); // reposition
        tl.totalTime(time); // jump back to the proper time
      });
      return tl;
    }
  
  }

/* ------------------------------------------------------ Home Page ------------------------------------------------------ */

function initLoaderHome() {

  const tl = gsap.timeline();

  tl.fromTo(".me img", {
    y: '+=700',
    opacity: 0
  }, {
    y: 0,
    opacity: 1,
    duration: 1,
    ease: 'Power4.easeOut'
  });

  // Animation for Element with Class .lukasz
  tl.fromTo(".lukasz", {
    y: '+=100',
    opacity: 0
  }, {
    y: 0,
    opacity: 1,
    duration: 1,
    ease: 'Power4.easeOut',
    onComplete: initScrollLetters
  }); // Add a delay after the last .ddd element
  
  // Animation for Elements with Class .ddd
  gsap.utils.toArray(".ddd").forEach((ddd, index) => {
    // Adding a delay for each .ddd element based on its index
    tl.fromTo(ddd.children, {
      y: '+=100',
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      stagger: 0.2,
      duration: 1,
      ease: 'Power4.easeOut'
    }, `+=${0.5 * index}`); // Adjust the multiplier to control delay between .ddd elements
  });
  



  // Animation for Elements with Class .animateObject
  gsap.utils.toArray(".animateObject").forEach(animateObject => {
    gsap.fromTo(animateObject.children, {
      y: '+=100',
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'Power4.easeOut',
      scrollTrigger: {
        trigger: animateObject,
        start: "top 70%",
        end: "top 20%",
        toggleActions: "play none none none"
      }
    });
  });
  initLazyLoadAndPlayVideoInviewHome();
  function initLazyLoadAndPlayVideoInviewHome() {
    let videoDiv = document.querySelector('.playpauzehome');
    if (videoDiv) {
      let videoElem = videoDiv.querySelector('video');
  
      // ScrollTrigger to play/pause video based on scroll position
      ScrollTrigger.create({
        trigger: videoElem,
        start: '10% 100%',
        end: '100% 80%',
        // markers: true,
        onEnter: () => {
          if (videoElem.readyState >= 3) {
            videoElem.play().catch(e => console.error('Error playing video:', e));
          }
        },
        onLeave: () => videoElem.pause(),
        onEnterBack: () => {
          if (videoElem.readyState >= 3) {
            videoElem.play().catch(e => console.error('Error playing video:', e));
          }
        },
        onLeaveBack: () => videoElem.pause(),
      });
    }
  }
};

/* ------------------------------------------------------ Recent Work ------------------------------------------------------ */
function initLoaderRecentWork() { 
  // Animation for .recent-work Element
  gsap.fromTo(".recent-work", {
    scale: 2,
    opacity: 0
  }, {
    opacity: 1,
    duration: 0.5,
    scale: 1,
    ease: 'Power4.easeOut',
    scrollTrigger: {
      trigger: ".recent-work",
      //start: "bottom 70%",
      end: "bottom 50%",
      toggleActions: "play reverse play reverse",
      // markers: true
    }
  });
}

function initLazyLoadAndPlayVideoInview() {
  let allVideoDivs = gsap.utils.toArray('.playpauze');

  allVideoDivs.forEach(videoDiv => {
    let videoElem = videoDiv.querySelector('video');

    // Lazy load each video individually
    ScrollTrigger.create({
      trigger: videoElem,
      start: 'top bottom',
      //markers: true,
      onEnter: () => {
        // console.log('Loading video:', videoElem.getAttribute('data-src')); // Debug log
        if (!videoElem.src) {
          videoElem.src = videoElem.getAttribute('data-src');
          videoElem.preload = 'auto';
          videoElem.load();
          setTimeout(() => {
            videoElem.play();
          }, 100);
          //console.log('playing video:', videoElem.getAttribute('data-src')); // Debug log
        }
      },
    });

    // Additional ScrollTrigger to play/pause video based on scroll position
    
    ScrollTrigger.create({
      trigger: videoElem,
      start: '0% 60%', // element, screen height
      end: '100% 40%',
      //markers: true,
      onEnter: () => {
        if (videoElem.readyState >= 3) {
          videoElem.play().catch(e => console.error('Error playing video:', e));
        }
      },
      onLeave: () => videoElem.pause(),
      onEnterBack: () => {
        if (videoElem.readyState >= 3) {
          videoElem.play().catch(e => console.error('Error playing video:', e));
        }
      },
      onLeaveBack: () => videoElem.pause(),
    });    
  });
}


/* ------------------------------------------------------ About Page ------------------------------------------------------ */

function initLoaderAbout() { 

  // Create a new GSAP timeline
  const tl = gsap.timeline();

  // Animation for '.about-me-img img'
  tl.fromTo('.about-me-img img', {
    y: '+=700', 
    opacity: 0,
  }, { 
    y: 0, 
    opacity: 1, 
    duration: 1, 
    ease: 'Power4.easeOut',
    //onComplete: console.log("isloaded")
  });

  // Animation for ".about-me-text"
  gsap.utils.toArray(".about-me-text").forEach((aboutText) => {
    tl.fromTo(aboutText.children, {
      y: '+=100', 
      opacity: 0
    }, {
      y: 0, 
      opacity: 1, 
      stagger: 0.2, 
      duration: 1, 
      ease: 'Power4.easeOut'
    });
  });

  // Scroll-triggered animations
  gsap.utils.toArray(".bold-effect span").forEach((boldEffect) => {
    tl.to(boldEffect, {})
    ScrollTrigger.create ({
      start: "top+=100",
      toogleClass: "active",
      onEnter: () => boldEffect.classList.add("active"),
    })
  })

    // Animation for ".help-with"
    ScrollTrigger.create({
      trigger: ".help-with",
      start: "top 70%",
      end: "top 60%",
      animation: gsap.fromTo(".help-with", {
        //scale: 2,
        opacity: 0
      }, { 
        opacity: 1, 
        duration: 1, 
        //scale: 1,
        ease: 'Power4.easeOut'
      })
    });

    // Animation for ".help-with-anim" elements
    gsap.utils.toArray(".help-with-anim").forEach((helpWith) => {
      ScrollTrigger.create({
        trigger: helpWith,
        start: "top 70%",
        end: "top 60%",
        animation: gsap.fromTo(helpWith.children, {
          y: "+=700",
          opacity: 0
        }, { 
          y: "0",
          opacity: 1, 
          duration: 0.8, 
          ease: 'Power4.easeOut'
        })
      });
    });

};

/* ------------------------------------------------------ Basic Footer ------------------------------------------------------ */

function initFooter() { 
    const tl = gsap.timeline();

    // Corrected set method usage
    // tl.set('.me-footer img', { css: { zIndex: 2 } });

    tl.fromTo('.footer-contact', { 
        y: '+=700', 
        opacity: 0
    }, { 
        y: '0', 
        opacity: 1, 
        duration: 1, 
        ease: 'Power4.easeOut'
    });

    gsap.utils.toArray(".animate-footer").forEach((animateFooter) => {
        tl.fromTo(animateFooter, {
            y: '+=100', 
            opacity: 0
        }, { 
            y: 0, 
            opacity: 1, 
            duration: 0.5, 
            ease: 'Power4.easeOut'
        });
    });
//   gsap.utils.toArray(".animate-footer").forEach((animateFooter) => {
//     tl.fromTo(animateFooter, {
//       y: '+=100', 
//       opacity: 0
//     }, { 
//       y: 0, 
//       opacity: 1, 
//       duration: 0.5, 
//       ease: 'Power4.easeOut'
//     });
//     ScrollTrigger.create({
//       trigger: animateFooter,
//       start: "top 70%",
//       end: "top 20%",
//       toggleActions: "play none none none",
//       animation: tl
//     });
//   });
}
/* ------------------------------------------------------ Contact page ------------------------------------------------------ */
function initLoaderContact() { 

  const tl = gsap.timeline();

  tl.fromTo('.animate-contact', { 
      y: '+=700', 
      opacity: 0
    }, { 
      y: "0", 
      opacity: 1, 
      duration: 1, 
      ease: 'Power4.easeOut'
    });

  gsap.utils.toArray(".business-details").forEach((businessDetails) => {
    tl.fromTo(businessDetails, {
      y: '+=100', 
      opacity: 0
    }, { 
      y: 0, 
      opacity: 1, 
      duration: 0.5, 
      ease: 'Power4.easeOut'
    });
    // ScrollTrigger.create({
    //   trigger: businessDetails.children,
    //   start: "top 70%",
    //   end: "top 20%",
    //   toggleActions: "play none none none",
    //   animation: tl
    // });
  });  
}

/* ------------------------------------------------------ Contact page ------------------------------------------------------ */
function initLoaderContact() { 

}

/* ------------------------------------------------------ Magnetic Buttons ------------------------------------------------------ */
/**
* Magnetic Buttons
*/
// Found via: https://codepen.io/tdesero/pen/RmoxQg

const initMagneticEffect = () => {
  const buttons = document.querySelectorAll('.button-container .circle-button');
  const formButton = document.querySelector('.wpforms-submit-container .circle-button');
  const menuLinks = document.querySelectorAll('#primary-menu li a');
  const infoLinks = document.querySelectorAll('.site-info a'); // Select info links
  const buttonStrength = 30; // Strength for the circle button
  const formButtonStrength = 50; // Higher strength for the form button
  const linkStrength = 60; // Higher strength for the link
  const menuLinkStrength = 40; // Adjusted strength for the menu links
  const infoLinkStrength = 25; // Adjusted strength for the info links

  const applyMagneticEffect = (elements, elementStrength, childStrength = elementStrength) => {
    if (window.innerWidth > 540) {
      // Convert single elements to an array if necessary
      if (!NodeList.prototype.isPrototypeOf(elements)) {
        elements = [elements];
      }
      elements.forEach((element) => {
        const child = element.querySelector('a') || element;

        element.addEventListener('mousemove', (event) => {
          moveMagnet(event, element, elementStrength);
          if (child !== element) { // Check if a child element exists to apply a different strength
            moveMagnet(event, child, childStrength);
          }
        });

        element.addEventListener('mouseleave', () => {
          resetMagnet(element);
          if (child !== element) {
            resetMagnet(child);
          }
        });
      });
    }
  };

  const moveMagnet = (event, element, strength) => {
    const rect = element.getBoundingClientRect();
    const x = (event.clientX - (rect.left + rect.width / 2)) * strength / rect.width;
    const y = (event.clientY - (rect.top + rect.height / 2)) * strength / rect.height;

    gsap.to(element, 1.5, {
      x: x,
      y: y,
      ease: Power4.easeOut
    });
  };

  const resetMagnet = (element) => {
    gsap.to(element, 1.5, {
      x: 0,
      y: 0,
      ease: Elastic.easeOut
    });
  };

  // Apply magnetic effect to buttons, menu links, and info links
  applyMagneticEffect(buttons, buttonStrength, linkStrength);
  if (formButton) applyMagneticEffect(formButton, formButtonStrength); // Apply only if formButton exists
  applyMagneticEffect(menuLinks, menuLinkStrength);
  applyMagneticEffect(infoLinks, infoLinkStrength);
};

/* ------------------------------------------------------ Show Hamburger ------------------------------------------------------ */

function initMenuButton() {
  // ScrollTrigger setup
  ScrollTrigger.create({
    start: "top+=20",
    end: "top+=10",
    onEnter: () => animMenuButton(true),  // Show button
    onLeaveBack: () => animMenuButton(false),  // Hide button
    toggleActions: "play none none reverse",
    // markers: true
  });
}
// Function to show the menu button
function animMenuButton(show) {
  if (show) {
    // Show the button
    gsap.fromTo(".menu-toggle", {
      opacity: 0,
      //scale: 2.5,
      x: "+=100",
      y: "+=50",
      rotation: 90
    }, {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      rotation: 0,
      duration: 0.5,
      ease: 'Power4.easeOut',
      onStart: () => document.querySelector(".menu-toggle").classList.add("active")
    });
  } else {
    // Hide the button
    gsap.to(".menu-toggle", {
      opacity: 0,
      //scale: 0.6,
      x: "+=100",
      y: "+=50",
      rotation: 90,
      duration: 0.5,
      ease: 'Power4.easeOut',
      onComplete: () => document.querySelector(".menu-toggle").classList.remove("active")
    });
  }
  
}


/* ------------------------------------------------------ Page Transitions ------------------------------------------------------ */

// Function to update the global namespace
function updateNamespace(namespace) {
  currentNamespace = namespace;
}

// Function to initialize the namespace on first load or refresh
function initCurrentNamespace() {
  const barbaContainer = document.querySelector('[data-barba="container"]');
  if (barbaContainer) {
    updateNamespace(barbaContainer.getAttribute('data-barba-namespace'));
  }
}
function initHomeWord(data) {
  updateNamespace();
  const words = ['Hola', 'Bonjour', 'Hello', 'Guten Tag', 'Cześć'];
  const loadingWords = document.querySelector('.loading-words');
  if (loadingWords) {
    // Clear existing words safely
    while (loadingWords.firstChild) {
      loadingWords.removeChild(loadingWords.firstChild);
    }

    // Add new words for the home page
    words.forEach((word, index) => {
      const h2 = document.createElement('h2');
      h2.textContent = word;

      // Add .active class to the third h2 element
      if (index === 2) {
        h2.classList.add('active');
      }

      loadingWords.appendChild(h2);
    });
  }
}

function initNextWord(data) {
    let parser = new DOMParser();
    let dom = parser.parseFromString(data.next.html, 'text/html');
    
    nextNamespace = dom.querySelector('[data-barba="container"]').getAttribute('data-barba-namespace');
    updateNamespace(nextNamespace);

    // Define namespace to display text mapping
    const namespaceToText = {
        'home': 'Home',
        'about-me': 'About Me',
        'contact': 'Contact',
        'recent-work': 'Portfolio',
        'wordpress-plugins': 'WordPress Plugins',
        'case-studies': 'Case Studies',
        'archive': 'Archive',
        'search': 'Search Results',
        'error-404': '404 Error'
    };

    // Get display text with fallback
    let displayText = namespaceToText[nextNamespace] || 'Page';

    // Update loading words
    const loadingWords = document.querySelector('.loading-words');
    if (loadingWords) {
        const h2Elements = loadingWords.querySelectorAll('h2');
        h2Elements.forEach((h2, index) => {
            if (index === 0 || index === h2Elements.length - 1) {
                h2.textContent = '';
            } else {
                h2.textContent = displayText;
            }
        });
    }
}

function delay(n) {
	n = n || 2000;
	return new Promise((done) => {
		setTimeout(() => {
			done();
		}, n);
	});
}

// // Function to dynamically load WPForms script if not already loaded
// function loadWPFormsScript(callback) {
//   var scriptUrl = '/wp-content/plugins/wpforms/assets/js/wpforms.min.js';
//   if (document.querySelector(`script[src="${scriptUrl}"]`)) {
//     callback(); // Script already loaded, proceed to callback
//   } else {
//     var script = document.createElement('script');
//     script.type = 'text/javascript';
//     script.src = scriptUrl;
//     script.onload = callback;
//     document.head.appendChild(script);
//   }
// }

// // Function to initialize WPForms
// function initWPForms() {
//   loadWPFormsScript(function() {
//     if (typeof wpforms !== 'undefined' && typeof wpforms.init === 'function') {
//     wpforms.init(); // Initialize WPForms
//     } else {
//     console.error('WPForms script loaded, but initialization function not found.');
//     }
//   });
// }

function initWPFormsRemove() {
  if (currentNamespace === 'contact' && typeof turnstile.remove === 'function') {
    turnstile.remove();
  }
}
window.initWPFormsRender = function() {
  if (currentNamespace === 'contact' && typeof turnstile.render === 'function') {
    turnstile.render('.g-recaptcha', {
      sitekey: '0x4AAAAAAAQGmZFNE8lQMRx1',
      action: 'FormID-31',
      callback: function(token) {
        console.log(`Challenge Success: ${token}`);
      },
      // Include other necessary parameters
    });
  }
};
// Track initialized scripts across page transitions
// var initialized_scripts = [];

// barba.hooks.afterEnter((data) => {
//   var parser = new DOMParser();
//   var htmlDoc = parser.parseFromString(data.next.html.replace(/(<\/?)body( .+?)?>/gi, '$1notbody$2>'), 'text/html');
//   var bodyClasses = htmlDoc.querySelector('notbody').getAttribute('class');
//   document.body.setAttribute('class', bodyClasses);

//   var new_script_tags = htmlDoc.querySelectorAll('script');
//   var new_imports = [];
//   var new_evaluations = '';

//   new_script_tags.forEach(s => {
//       let src = s.getAttribute('src');
//       if (src && !initialized_scripts.includes(src)) {
//           new_imports.push(src);
//           initialized_scripts.push(src); // Add to initialized scripts
//       } else if (!src) {
//           new_evaluations += s.innerHTML;
//       }
//   });

//   loadScriptsSequentially(new_imports, () => {
//       eval(new_evaluations);
//   });
// });

// function loadScriptsSequentially(scripts, callback) {
//   let loadScript = (index) => {
//       if (index < scripts.length) {
//           let script = document.createElement('script');
//           script.src = scripts[index];
//           script.onload = () => loadScript(index + 1);
//           script.onerror = () => console.error('Script loading failed:', script.src);
//           document.head.appendChild(script);
//       } else {
//           if (typeof callback === 'function') {
//               callback();
//           }
//       }
//   };
//   loadScript(0);
// }





const container = document.querySelector('[data-scroll-container]');
function initSmoothScroll(container) {
  if (locomotiveScroll) {
    locomotiveScroll.destroy(); // Destroy previous instance
  }
  locomotiveScroll = new LocomotiveScroll({
    el: container,
    smooth: true,
  });
}
function initPageTransitions() {
    barba.init({
      sync: true,
      debug: false,
      timeout: 7000,
      transitions: [
        {
          name: 'default',
          async once(data) {
            initNextWord(data);
            updateBodyClasses(data.next.html);
            pageTransitionIn();
            await delay(1300);
            initScript();
            initSmoothScroll();
            window.scrollTo(0, 0);
          },
          async leave(data) {
            const currentContainer = document.querySelector('[data-barba="container"]');
            if (currentContainer) {
              const classesToRemove = [
                'page',
                'single',
                'home',
                'contact',
                'error404'
              ];
              
              if (!data.next.namespace.includes('case-studies')) {
                classesToRemove.push('archive', 'blog');
              }
              
              document.body.classList.remove(...classesToRemove);
              
              if (!data.next.namespace.includes('case-studies')) {
                const elementsToReset = document.querySelectorAll('.post-thumbnail:not(.archive-posts *), .post-content:not(.archive-posts *)');
                elementsToReset.forEach(element => {
                  element.removeAttribute('style');
                });
              }
            }
            
            pageTransitionOut();
            // Reduced delay to make transition more instant
            await delay(50);
          },
          async enter(data) {
            const parser = new DOMParser();
            const newDOM = parser.parseFromString(data.next.html, 'text/html');
            const newBodyClasses = newDOM.body.getAttribute('class');
            
            if (data.next.namespace.includes('case-studies') && document.body.classList.contains('archive')) {
              const archiveClasses = Array.from(document.body.classList)
                .filter(cls => cls.includes('archive') || cls.includes('category'));
              document.body.className = newBodyClasses + ' ' + archiveClasses.join(' ');
            } else {
              document.body.className = newBodyClasses;
            }
            
            // Removed delay before pageTransitionIn
            pageTransitionIn();
            await delay(1300);
          },
          async beforeEnter(data) {
            updateNamespace(data.next.namespace);
            initNextWord(data);
            initWPFormsRemove();
            
            // Only clean specific styles based on transition type
            if (data.next.namespace.includes('case-studies')) {
              cleanupArchiveStyles();
            } else {
              cleanupPageStyles();
            }
          },
          async afterEnter(data) {
            setTimeout(() => {
              initScript();
            }, 100);
            
            setTimeout(() => {
              initNavigation();
            }, 100);
            
            initSmoothScroll();
            window.scrollTo(0, 0);
            
            setTimeout(() => {
              initWPFormsRender();
            }, 100);
          }
        },
        {
          name: 'home',
          from: {},
          to: {
            namespace: ['home']
          },
          async once(data) {
            window.scrollTo(0, 0);
            initHomeWord();
            updateBodyClasses(data.next.html);
            pageTransitionIn();
            await delay(1300);
            initScript();
            initSmoothScroll();
          }
        }
      ]
    });
  }
  
  // Helper function to update body classes
  function updateBodyClasses(newHTML) {
    const parser = new DOMParser();
    const dom = parser.parseFromString(newHTML, 'text/html');
    const newBodyClasses = dom.body.className;
    
    // Remove all existing classes from body
    document.body.className = '';
    
    // Add new classes
    document.body.className = newBodyClasses;
  }
  
  // Helper function to clean up page-specific styles
  function cleanupPageStyles() {
    const elementsWithStyles = document.querySelectorAll(`
      .post-thumbnail:not(.archive-posts *),
      .post-content:not(.archive-posts *),
      [class*="page-"],
      [class*="single-"]
    `);
  
    // Remove inline styles
    elementsWithStyles.forEach(element => {
      if (element.style.length > 0) {
        element.removeAttribute('style');
      }
    });
  
    // Remove any transition-related classes
    elementsWithStyles.forEach(element => {
      const classList = Array.from(element.classList);
      classList.forEach(className => {
        if (className.includes('gsap') || className.includes('transition')) {
          element.classList.remove(className);
        }
      });
    });
  }
  
  // Function for archive-specific cleanup
  function cleanupArchiveStyles() {
    const archiveElements = document.querySelectorAll('.archive-posts *, .page-header, .archive-title');
    archiveElements.forEach(element => {
      if (element.style.length > 0) {
        element.removeAttribute('style');
      }
      // Remove only transition-related classes
      const classList = Array.from(element.classList);
      classList.forEach(className => {
        if (className.includes('gsap') || className.includes('transition')) {
          element.classList.remove(className);
        }
      });
    });
  }
  
  // Helper function for delays
  function delay(n) {
    n = n || 2000;
    return new Promise((done) => {
      setTimeout(() => {
        done();
      }, n);
    });
  }
  
  // Animation - Page transition In
  function pageTransitionIn() {
    var tl = gsap.timeline();
  
    // Reset words state first
    tl.set(".loading-words h2", {
      y: "100px",
      opacity: 0,
      display: "none"
    })
    .set("html", { cursor: "wait" })
    // Instant background position
    .set(".loading-screen", { 
      top: "0%",
      onComplete: () => {
        document.body.style.display = 'none';
        document.body.offsetHeight;
        document.body.style.display = '';
      }
    })
    // Delay before starting word animations
    .add(() => {}, "+=0.5") // Pure delay
    // Animate words
    .to(".loading-words h2", { 
      duration: 0.8, 
      y: "-100px", 
      opacity: 1, 
      ease: "Power4.easeOut", 
      stagger: 0.1, 
      display: "block" 
    })
    .to(".loading-screen", { 
      duration: 0.8, 
      top: "-100%", 
      ease: "Power3.easeInOut" 
    }, "+=0.5")
    .set("html", { cursor: "auto" })
    .set(".loading-screen", { top: "calc(100%)" });
  }

function pageTransitionOut() {
  var tl = gsap.timeline();

  tl.set("[data-scroll-container]", {
    opacity: 0
  })
  .to("[data-scroll-container]", {
    duration: 0.1,
    y: "-50px",
    ease: "Power1.easeOut",
    clearProps: "all",
    onComplete: () => {
      document.querySelectorAll('.post-thumbnail:not(.archive-posts *), .post-content:not(.archive-posts *)').forEach(element => {
        element.removeAttribute('style');
      });
    }
  });
}


/* ------------------------------------------------------ Sticky Cursor ------------------------------------------------------ */
//old 
// function initStickyCursor() {
//   // Create the cursor follower div
//   const cursorFollower = document.querySelector('.cursor-follower');

//   let posX = 0, posY = 0, mouseX = 0, mouseY = 0;

//   gsap.to({}, {
//     duration: 0.016,
//     repeat: -1,
//     onRepeat: () => {
//       posX += (mouseX - posX) / 9;
//       posY += (mouseY - posY) / 9;

//       gsap.set(cursorFollower, {
//         x: posX - 15, // Centering the follower
//         y: posY - 15
//       });
//     }
//   });
//   // gsap.set(cursorFollower, {
//   //   x: 50, // Fixed position for testing
//   //   y: 50
//   // });

//   document.addEventListener('mousemove', (e) => {
//     mouseX = e.clientX;
//     mouseY = e.clientY;
//   });
//   // Select all <a> elements
//   const links = document.querySelectorAll('a');

//   // Function to hide the cursor follower
//   const hideFollower = () => {
//     cursorFollower.style.opacity = '0';
//   };

//   // Function to show the cursor follower
//   const showFollower = () => {
//     cursorFollower.style.opacity = '1';
//   };

//   // Add event listeners to each link
//   links.forEach(link => {
//     link.addEventListener('mouseenter', hideFollower);
//     link.addEventListener('mouseleave', showFollower);
//   });
// }
function initStickyCursor() {
  const cursorFollower = document.querySelector('.cursor-follower');
  let posX = 0, posY = 0, mouseX = 0, mouseY = 0;

  const updateCursor = () => {
    posX += (mouseX - posX) / 9;
    posY += (mouseY - posY) / 9;

    gsap.set(cursorFollower, {
      x: posX - 15,
      y: posY - 15
    });

    requestAnimationFrame(updateCursor);
  };
  requestAnimationFrame(updateCursor);

  const throttleMouseMove = (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  };

  document.addEventListener('mousemove', throttleMouseMove);

  const links = document.querySelectorAll('a');
  const hideFollower = () => cursorFollower.style.opacity = '0';
  const showFollower = () => cursorFollower.style.opacity = '1';

  links.forEach(link => {
    link.addEventListener('mouseenter', hideFollower);
    link.addEventListener('mouseleave', showFollower);
  });
}

/* ------------------------------------------------------ Custom styles on touch devices ------------------------------------------------------ */

function customStyles() {
  // Create a new style element
  var style = document.createElement('style');
  style.type = 'text/css';

  // Define your custom CSS as a string
  var css = `
      html, body {
        overflow: auto;
      }
      .cursor-follower {
        display: none;
      }
  `;

  // Check if the browser supports style.sheet.insertRule
  // and apply styles accordingly
  if (style.styleSheet) {
      // This is required for IE8 and below.
      style.styleSheet.cssText = css;
  } else {
      // For other browsers
      style.appendChild(document.createTextNode(css));
  }

  // Append the style element to the head of the document
  document.head.appendChild(style);
}


