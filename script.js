gsap.registerPlugin(ScrollTrigger);

/* Headings Reveal On Scroll */
let splitText, splitHeading;

function runSplit() {
  // Initialize SplitType for hover links
  splitText = new SplitType("[hover-link]", {
    types: "words, chars"
  });

}
runSplit();

  // Select headings with the attribute
  const headings = document.querySelectorAll('[scroll-reveal]');

  headings.forEach((heading) => {
      // Initialize SplitType.js with lines only
      const splitText = new SplitType(heading, { types: "lines", lineClass: "line" });

      // Wrap each .line in its own .line-wrap div
      const lines = heading.querySelectorAll('.line');
      lines.forEach((line) => {
          const lineWrap = document.createElement('div');
          lineWrap.classList.add('line-wrap');
          line.parentNode.insertBefore(lineWrap, line);
          lineWrap.appendChild(line); 
      });

      gsap.fromTo(
          lines,
          { yPercent: 100, },
          {
              yPercent: 0,
              duration: 1.5,
              ease: "power2.out",
              stagger: 0.2,
              scrollTrigger: {
                  trigger: heading,
                  start: "top 80%",
              },
          }
      );
  });


/* Home Hero Image/Video Expanding */
if (window.innerWidth > 991) {   
gsap.to(".home-hero-image-wrap", {
  scrollTrigger: {
    trigger: ".home-hero-image-wrap",
    start: "top center",
    end: "bottom center",
    scrub: true,
  },
  width: "100%",
  onComplete: () => ScrollTrigger.refresh()
});
}
  
/* Menu Services */
if (window.innerWidth > 991) {
let dropdownMenu;

    // Initialize GSAP animation
    dropdownMenu = gsap.timeline({ paused: true, defaults: { invalidateOnRefresh: true } })
        .to(".nav-dropdown-wrapper", { height: "30em", duration: 0.5, ease: "power2.out" })
        .fromTo(".nav-link-dropdown", { y: "1.5em", opacity: "0%" }, { y: "0em", opacity: "100%", ease: "power2.out", stagger: { amount: 0.2 }, duration: 0.5 }, "<");

    // Ensure event listeners are added after #nav-services exists
    setTimeout(() => {
        $(document).on('mouseenter', '#nav-services', function() {
            console.log("Hover detected on #nav-services!");
            $('.nav-dropdown').addClass('active');
            dropdownMenu.play();
            ScrollTrigger.refresh();
        });

        $(document).on('mouseleave', '.nav-dropdown-wrapper', function() {
            console.log("Mouse left dropdown");
            dropdownMenu.reverse().eventCallback("onReverseComplete", function() {
                $('.nav-dropdown').removeClass('active');
            });
            ScrollTrigger.refresh();
        });

    }, 1000);
}

/* Services */

// JavaScript with GSAP
// const servicesItems = document.querySelectorAll('.services-item');
// const imageWrap = document.querySelector('.home-services-image-wrap');

// servicesItems.forEach((item, index) => {
//   item.addEventListener('mouseenter', () => {
//     const translateY = index * 50; // Calculate the percentage based on index
//     gsap.to(imageWrap, {
//       y: `${translateY}%`,
//       duration: 0.5,
//       ease: "power3.out",
//     });
//   });
// });



/* Home Hero fill text on Scroll */
const homeAboutText = new SplitType('.home-about-top-p', { types: 'words' });

gsap.fromTo(
  ".home-about-top-p .word",
  { opacity: 0.4 },
  { 
    opacity: 1,
    stagger: 0.5,
    scrollTrigger: {
      trigger: ".home-about-top-p",
      start: "top 60%",
      end: "bottom 40%",
      scrub: true,
    }
  }
);

/* Image Masks Reveal */
let imgMasks = document.querySelectorAll(".img-mask");

gsap.set(imgMasks, { display: "block" });

imgMasks.forEach((mask) => {
  gsap.to(mask, {
    y: "100%",
    duration: 1.2,
    ease: "power3.inOut",
    scrollTrigger: {
      trigger: mask,
      start: "top center",
      toggleActions: "play none none none",
    },
  });
  onComplete: () => ScrollTrigger.refresh()
});

/* ABOUT PAGE */

/* Hero About H1 */
let homeAboutIntro = gsap.timeline({
  onComplete: () => ScrollTrigger.refresh()
});

homeAboutIntro.fromTo (".about-hero-img-wrap", { y: "5em", opacity: 0, }, { y: "0em", opacity: 1, ease: "power2.out", duration: 0.5 });

/* Hero About Image Expand */
if (window.innerWidth > 991) {
gsap.set(".about-hero-img-wrap", {width: "26em"});
gsap.set(".about-hero-content",{ opacity: 0 });

gsap.to(".about-hero-img-wrap", {
  width: "100%",
  scrollTrigger: {
    trigger: ".about-hero-img-wrap",
    start: "top center",
    end: "bottom 25%",
    scrub: true,
    onComplete: () => {
      gsap.to(".about-hero-content",{ opacity: 1, ease: "power2.out", duration: 0.5 });
    }
  }
});
}
/* About fill text on Scroll */
const aboutText = new SplitType('.about-vision-tagline', { types: 'words' });

gsap.fromTo(
  ".about-vision-tagline .word",
  { opacity: 0.4 },
  { 
    opacity: 1,
    stagger: 0.5,
    scrollTrigger: {
      trigger: ".about-vision-tagline",
      start: "top center",
      end: "35% center",
      scrub: true,
    }
  }
);


/* Team circles moving */
// Select the container and all the images inside it
const container = document.querySelector(".about-vision-left");
const teamImages = container.querySelectorAll(".about-team-img");

// Get the container's dimensions
const containerBounds = container.getBoundingClientRect();

// Function to create floating effect within container bounds
function floatAround(element) {
  const elementBounds = element.getBoundingClientRect();

  const maxX = containerBounds.width - elementBounds.width;
  const maxY = containerBounds.height - elementBounds.height;

  gsap.to(element, {
    x: gsap.utils.random(0, maxX, true), // Restrict x movement within container bounds
    y: gsap.utils.random(0, maxY, true), // Restrict y movement within container bounds
    duration: gsap.utils.random(3, 6),   // Random duration for smooth movement
    ease: "power1.inOut",                // Smooth easing for floating effect
    onComplete: () => floatAround(element) // Loop the animation
  });
}

// Apply floating effect to each image
teamImages.forEach(image => floatAround(image));
