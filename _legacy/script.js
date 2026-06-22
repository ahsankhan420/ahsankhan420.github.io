/* Ehsan Ullah portfolio interactions
   - Floating neon particles around the profile image
   - Mobile navigation toggle
   Respects prefers-reduced-motion for the particle animation. */

document.addEventListener("DOMContentLoaded", function () {
  /* ---------- Mobile navigation toggle ---------- */
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      const isOpen = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Close menu when a link is clicked (mobile UX)
    navLinks.querySelectorAll(".nav-link").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Floating particles ---------- */
  const profileWrapper = document.querySelector(".profile-wrapper");
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (!profileWrapper || prefersReducedMotion) return;

  const particleCount = 30;
  // Single shared stylesheet for all generated keyframes (avoids the original
  // fragile cssRules[0].name lookup and dozens of injected <style> tags).
  const styleSheet = document.createElement("style");
  document.head.appendChild(styleSheet);
  const sheet = styleSheet.sheet;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");

    const size = Math.random() * 8 + 2;
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const duration = Math.random() * 10 + 5;
    const delay = Math.random() * 5;
    const opacity = Math.random() * 0.5 + 0.1;
    const dx = Math.random() * 40 - 20;
    const dy = Math.random() * 40 - 20;
    const animName = "particle-float-" + i;

    // Insert a uniquely named keyframe rule for this particle
    sheet.insertRule(
      "@keyframes " +
        animName +
        " { 0% { transform: translate(0,0); }" +
        " 50% { transform: translate(" + dx + "px, " + dy + "px); }" +
        " 100% { transform: translate(0,0); } }",
      sheet.cssRules.length
    );

    particle.style.width = size + "px";
    particle.style.height = size + "px";
    particle.style.left = posX + "%";
    particle.style.top = posY + "%";
    particle.style.opacity = opacity;
    particle.style.backgroundColor =
      "hsl(" + Math.floor(Math.random() * 360) + ", 100%, 70%)";
    particle.style.animation =
      animName + " " + duration + "s " + delay + "s infinite ease-in-out";

    profileWrapper.appendChild(particle);
  }
});
