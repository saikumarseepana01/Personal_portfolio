$(document).ready(function () {

  //sticky header
  $(window).scroll(function () {
    // Update the active section in the header
    updateActiveSection();
  });

  $(".navbar a").click(function (e) {
    e.preventDefault();

    var target = $(this).attr("href");

    if ($(target).hasClass("active-section")) {
      return;
    }

    if (target === "#home") {
      $("html, body").animate(
        {
          scrollTop: 0
        },
        500
      );
    } else {
      // Get header height dynamically for accurate offset
      const headerHeight = $(".header-area").outerHeight();
      var offset = $(target).offset().top - headerHeight; // Adjusted offset

      $("html, body").animate(
        {
          scrollTop: offset
        },
        500
      );
    }

    $(".navbar a").removeClass("active");
    $(this).addClass("active");
  });

  // --- Hamburger Menu Logic (New) ---
  const navToggle = document.querySelector('.nav-toggle');
  const primaryNav = document.querySelector('.main-nav');

  navToggle.addEventListener('click', () => {
      const isVisible = primaryNav.getAttribute('data-visible') === 'true';
      primaryNav.setAttribute('data-visible', !isVisible);
      navToggle.setAttribute('aria-expanded', !isVisible);
  });

  // Close menu when a nav link is clicked
  primaryNav.addEventListener('click', (e) => {
      if (e.target.closest('a')) { // Check if a link inside the nav was clicked
          primaryNav.setAttribute('data-visible', false);
          navToggle.setAttribute('aria-expanded', false);
      }
  });

  // --- Theme Switcher Logic ---
  const themeToggleButton = document.getElementById('theme-toggle-btn');
  const body = document.body;

  // Function to apply the theme
  const applyTheme = (theme) => {
    body.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  };

  // On initial load, apply the saved theme or default to dark
  const savedTheme = localStorage.getItem('theme') || 'dark';
  applyTheme(savedTheme);

  if (themeToggleButton) {
    themeToggleButton.addEventListener('click', () => {
      const newTheme = body.dataset.theme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
    });
  }



  //Initial content revealing js
  ScrollReveal({
    distance: "100px",
    duration: 2000,
    delay: 200
  });

  ScrollReveal().reveal(".header a, .profile-photo, .about-content, .education", {
    origin: "left"
  });
  ScrollReveal().reveal(".header ul, .profile-text, .about-skills, .internship", {
    origin: "right"
  });
  ScrollReveal().reveal(".project-title, .contact-title, .skills-title, .frameworks-title", {
    origin: "top"
  });

  ScrollReveal().reveal(".projects, .contact, .skills-content, .frameworks-content", {
    origin: "bottom"
  });
 
  // Animate progress bars on scroll
  const skillsSection = document.getElementById('MySkills');
  const progressBars = document.querySelectorAll('.progress-bar span');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        progressBars.forEach(bar => {
          const targetWidth = bar.getAttribute('data-width');
          bar.style.width = targetWidth;
        });
        observer.unobserve(skillsSection); // Stop observing after animation
      }
    });
  }, {
    threshold: 0.5 // Trigger when 50% of the section is visible
  });

  observer.observe(skillsSection);
});

function updateActiveSection() {
  var scrollPosition = $(window).scrollTop();

  const headerHeight = $(".header-area").outerHeight(); // Get header height dynamically

  if (scrollPosition === 0) {
    $(".header ul li a").removeClass("active");
    $(".header ul li a[href='#home']").addClass("active");
    return;
  }

  // Iterate through each section and update the active class in the header
  $("section").each(function () {
    var target = $(this).attr("id");
    var offset = $(this).offset().top;
    var height = $(this).outerHeight();

    if ( // Adjusted offset for fixed header
      scrollPosition >= offset - headerHeight &&
      scrollPosition < offset + height - headerHeight
    ) {
      $(".header ul li a").removeClass("active");
      $(".header ul li a[href='#" + target + "']").addClass("active");
    }
  });
}

const nameText = "Sai Kumar";
let index = 0;
const typingSpeed = 110; // milliseconds per letter

function typeName() {
  if (index < nameText.length) {
    document.getElementById("typing-name").innerHTML += nameText.charAt(index);
    index++;
    setTimeout(typeName, typingSpeed);
  }
}

window.addEventListener("load", function () {
  setTimeout(typeName, 1200); // 1.2-second delay before starting the typing effect
});
