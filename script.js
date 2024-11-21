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

/* Hover Cursor */

document.addEventListener("DOMContentLoaded", ()=>{
  
   
  let cursorItem = document.querySelector(".cursor")
  let cursorParagraph = cursorItem.querySelector("p")
  let targets = document.querySelectorAll("[data-cursor]")
  let xOffset = 6;
  let yOffset = 140;
  let cursorIsOnRight = false;
  let currentTarget = null;
  let lastText = '';
  
  // Position cursor relative to actual cursor position on page load
  gsap.set(cursorItem, {xPercent: xOffset, yPercent: yOffset});

  // Use GSAP quick.to for a more performative tween on the cursor
  let xTo = gsap.quickTo(cursorItem, "x", { ease: "power3"});
  let yTo = gsap.quickTo(cursorItem, "y", { ease: "power3"});

  // On mousemove, call the quickTo functions to the actual cursor position
  window.addEventListener("mousemove", e => {
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    let scrollY = window.scrollY;
    let cursorX = e.clientX;
    let cursorY = e.clientY + scrollY; // Adjust cursorY to account for scroll

    // Default offsets
    let xPercent = xOffset;
    let yPercent = yOffset;

    // Adjust X offset if in the rightmost 19% of the window
    if (cursorX > windowWidth * 0.81) {
      cursorIsOnRight = true;
      xPercent = -100;
    } else{
      cursorIsOnRight = false;
    }

    // Adjust Y offset if in the bottom 10% of the current viewport
    if (cursorY > scrollY + windowHeight * 0.9) {
      yPercent = -120; 
    }
    
    if (currentTarget) {
      let newText = currentTarget.getAttribute("data-cursor");
      if (currentTarget.hasAttribute("data-easteregg") && cursorIsOnRight) {
        newText = currentTarget.getAttribute("data-easteregg");
      }

      if (newText !== lastText) { // Only update if the text is different
        cursorParagraph.innerHTML = newText;
        lastText = newText;
      }
    }

    gsap.to(cursorItem, { xPercent: xPercent, yPercent: yPercent, duration: 0.9, ease: "power3" });
    xTo(cursorX);
    yTo(cursorY - scrollY); // Subtract scroll for viewport positioning
  });

  
  // Add a mouse enter listener for each link that has a data-cursor attribute
  targets.forEach(target => {
    target.addEventListener("mouseenter", () => {
      currentTarget = target; // Set the current target
      
      // If element has data-easteregg attribute, load different text
      let newText = target.hasAttribute("data-easteregg")
        ? target.getAttribute("data-easteregg")
        : target.getAttribute("data-cursor");

			// Update only if the text changes
      if (newText !== lastText) {
        cursorParagraph.innerHTML = newText;
        lastText = newText;
      }
    });
  });
  
 })