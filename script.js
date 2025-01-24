gsap.registerPlugin(ScrollTrigger);

/* Homepage Hero Load */
let homeHeroIntro = gsap.timeline({
  onComplete: () => ScrollTrigger.refresh()
});


homeHeroIntro.fromTo (".nooanca-logo", { y: "2em" }, { y: "0em", ease: "power2.out", duration: 0.75 });
homeHeroIntro.fromTo (".nav-link", { y: "2em" }, { y: "0em", ease: "power2.out", stagger: { amount: 0.5 }, duration: 1 }, "<0.1");
homeHeroIntro.fromTo (".eyebrow", { y: "2em" }, { y: "0em", ease: "power2.out", duration: 0.75 }, "<0.4");
homeHeroIntro.fromTo (".home-hero-h1", { y: "2.5em" }, { y: "0em", ease: "power2.out", duration: 0.75 }, "<0.4");
homeHeroIntro.fromTo (".home-hero-p", { y: "6em" }, { y: "0em", ease: "power2.out", duration: 0.75 }, "<0.4");
homeHeroIntro.fromTo (".home-hero-image-wrap", { scale: 0.75, opacity: 0, y: "6em" }, { scale: 1, opacity: 1, y: "0em", ease: "power2.out", duration: 1 }, "<0.2");

/* Home Hero Image/Video Expanding */
gsap.to(".home-hero-image-wrap", {
  scrollTrigger: {
    trigger: ".home-hero-image-wrap",
    start: "top center",
    end: "bottom center",
    scrub: true,
  },
  width: "100%",
  height: "100vh",
  onComplete: () => ScrollTrigger.refresh()
});

/* Menu Services Hover */
$(document).ready(function() {

  const dropdownMenu = gsap.timeline({ paused: true, defaults: { invalidateOnRefresh: true } })
    .to(".nav-dropdown-wrapper", { height: "30em", duration: 0.5, ease: "power2.out" })
    .fromTo(".nav-link-dropdown", { y: "1.5em", opacity: "0%" }, { y: "0em", opacity: "100%", ease: "power2.out", stagger: { amount: 0.2 }, duration: 0.5 }, "<");

  $('#nav-services').on('mouseenter', function() {
      $('.nav-dropdown').addClass('active');
      dropdownMenu.play();
      ScrollTrigger.refresh();
  });

  $('.nav-dropdown-wrapper').on('mouseleave', function() {
      dropdownMenu.reverse().eventCallback("onReverseComplete", function() {
          $('.nav-dropdown').removeClass('active');
      });
      ScrollTrigger.refresh();
  });
});


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
});

/* ABOUT PAGE */

/* Hero About H1 */
let homeAboutIntro = gsap.timeline({
  onComplete: () => ScrollTrigger.refresh()
});

homeAboutIntro.fromTo (".hero-about-h1", { y: "2.5em" }, { y: "0em", ease: "power2.out", duration: 0.75, delay: 0.5, });
homeAboutIntro.fromTo (".about-hero-img-wrap", { y: "5em", opacity: 0, }, { y: "0em", opacity: 1, ease: "power2.out", duration: 0.5 });

/* Hero About Image Expand */
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
