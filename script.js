gsap.registerPlugin(ScrollTrigger);

/* Reusable Text Reveal Animation */
function textReveal(timeline, selector, fromProps, toProps, position) {
  // Set initial state
  if (fromProps) gsap.set(selector, fromProps);

  // Add animation to the timeline
  if (toProps) timeline.to(selector, toProps, position);
}

/* Homepage Hero Load */
const homeHeroTimeline = gsap.timeline();

// Apply animations to the timeline
textReveal(homeHeroTimeline, ".nooanca-logo", { y: "2em" }, { y: "0em", ease: "power2.out", duration: 0.75 });
textReveal(homeHeroTimeline, ".nav-link", { y: "2em" }, { y: "0em", ease: "power2.out", stagger: { amount: 0.5 }, duration: 1 }, "<0.1");
textReveal(homeHeroTimeline, ".eyebrow", { y: "2em" }, { y: "0em", ease: "power2.out", duration: 0.75 }, "<0.4");
textReveal(homeHeroTimeline, ".home-hero-h1", { y: "2.5em" }, { y: "0em", ease: "power2.out", duration: 0.75 }, "<0.4");
textReveal(homeHeroTimeline, ".home-hero-p", { y: "6em" }, { y: "0em", ease: "power2.out", duration: 0.75 }, "<0.4");
textReveal(".home-hero-image-wrap", { y: "2em" }, { y: "0em", ease: "power2.out", duration: 0.75 });



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

