gsap.registerPlugin(ScrollTrigger);

const dropdownMenu = gsap.timeline({ paused: true })
  .to(".nav-dropdown-wrapper", { height: "30em", duration: 0.5, ease: "power2.out" })
  .fromTo(".nav-item", { y: "1.5em", opacity: "0%" }, { y: "0em", opacity: "100%", ease: "power2.out", stagger: { amount: 0.2 }, duration: 0.5 }, "<");

$('#nav-services').on('mouseenter', function() {
  $('.nav-dropdown').addClass('active');
  
  dropdownMenu.play();
});

$('.nav-dropdown-wrapper').on('mouseleave', function() {
    dropdownMenu.reverse().eventCallback("onReverseComplete", function() {
    $('.nav-dropdown').removeClass('active');
  });
});
