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


/* Home Hero fill text on Scroll */
const homeAboutText = new SplitType('.home-about-top-p', { types: 'words' });

gsap.fromTo(
  ".home-about-top-p .word",
  { opacity: 0.5 },
  { 
    opacity: 1,
    stagger: 0.5,
    scrollTrigger: {
      trigger: ".home-about-top-p",
      start: "top 75%",
      end: "bottom 75%",
      scrub: true,
    }
  }
);

 /* Home Services Hover */

 console.log("yooo")
