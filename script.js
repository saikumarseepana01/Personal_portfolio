$(document).ready(function () {

  //sticky header
  $(window).scroll(function () {
    if ($(this).scrollTop() > 1) {
      $(".header-area").addClass("sticky");
    } else {
      $(".header-area").removeClass("sticky");
    }

    // Update the active section in the header
    updateActiveSection();
  });

  $(".header ul li a").click(function (e) {
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
      var offset = $(target).offset().top - 40;

      $("html, body").animate(
        {
          scrollTop: offset
        },
        500
      );
    }

    $(".header ul li a").removeClass("active");
    $(this).addClass("active");
  });

  // Toggle mobile menu
  $(".menu_icon").click(function () {
    $(".header ul").toggleClass("active");
    // Optional: change icon to 'X'
    var icon = $(this).find("i");
    icon.toggleClass("fa-bars fa-times");
  });


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

  // Checking if scroll position is at the top of the page
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

    if (
      scrollPosition >= offset - 40 &&
      scrollPosition < offset + height - 40
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
