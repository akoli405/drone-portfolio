document.addEventListener("DOMContentLoaded", function () {

  console.log("JS Loaded Successfully");

  
const heroVideo = document.querySelector('.hero-video');

window.addEventListener('scroll', () => {
  if (!heroVideo || window.innerWidth < 768) return;

  const scrollY = window.scrollY;

  // limit effect so it doesn't go crazy
  if (scrollY < window.innerHeight) {
    heroVideo.style.transform = `translateY(${scrollY * 0.25}px)`;
  }
});



// project card auto play
document.querySelectorAll('.project-card video').forEach(video => {
  video.addEventListener('mouseenter', () => {
    video.play();
  });

  video.addEventListener('mouseleave', () => {
    video.pause();
    video.currentTime = 0;
  });
});


// project card animation
const reveals = document.querySelectorAll('.reveal');

reveals.forEach((el, index) => {
  el.style.setProperty('--delay', `${index * 0.30}s`);
});

function revealOnScroll() {
  const windowHeight = window.innerHeight;
  const revealPoint = 100;

  reveals.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;

    if (elementTop < windowHeight - revealPoint) {
      el.classList.add('active');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

// document.addEventListener("scroll", function () {
//   const navbar = document.querySelector(".hero-navbar");

//   if (window.scrollY > 50) {
//     navbar.classList.add("scrolled");
//   } else {
//     navbar.classList.remove("scrolled");
//   }
// });

const navbar = document.querySelector('.hero-navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});


document.querySelectorAll(".project-card").forEach(card => {
  card.addEventListener("click", () => {
    const videoSrc = card.getAttribute("data-video");
    const title = card.getAttribute("data-title");

    const modalVideo = document.getElementById("modalVideo");
    const videoTitle = document.getElementById("videoTitle");

    modalVideo.querySelector("source").src = videoSrc;
    modalVideo.load();

    videoTitle.textContent = title;

    const modal = new bootstrap.Modal(document.getElementById("videoModal"));
    modal.show();
  });
});

/* Stop video when modal closes */
// document.getElementById("videoModal").addEventListener("hidden.bs.modal", () => {
//   const video = document.getElementById("modalVideo");
//   video.pause();
//   video.currentTime = 0;
// });

const videoModal = document.getElementById("videoModal");

if (videoModal) {
  videoModal.addEventListener("hidden.bs.modal", () => {
    const video = document.getElementById("modalVideo");
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  });
}


const premiumWrapper = document.querySelector('.premium-video-wrapper');

if (premiumWrapper) {
  premiumWrapper.addEventListener('mousemove', (e) => {
    const rect = premiumWrapper.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = (y / rect.height - 0.5) * 10;
    const rotateY = (x / rect.width - 0.5) * -10;

    premiumWrapper.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  premiumWrapper.addEventListener('mouseleave', () => {
    premiumWrapper.style.transform = 'rotateX(0deg) rotateY(0deg)';
  });
}


// Theme
// const toggleBtn = document.getElementById("themeToggle");

// if (toggleBtn) {
//   toggleBtn.addEventListener("click", function () {
//     document.body.classList.toggle("light-theme");
//     console.log("Theme toggled");
//   });
// }

  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;
  const overlay = document.querySelector('.theme-transition-overlay');

  if (!overlay) {
    console.log("Overlay not found");
    return;
  }

  if (localStorage.getItem('theme') === 'light') {
    body.classList.add('light-theme');
  }

  themeToggle.addEventListener('click', () => {

    overlay.classList.add('active');
    body.classList.add('transitioning');

    setTimeout(() => {
      body.classList.toggle('light-theme');

      localStorage.setItem(
        'theme',
        body.classList.contains('light-theme') ? 'light' : 'dark'
      );
    }, 400);

    setTimeout(() => {
      overlay.classList.remove('active');
      body.classList.remove('transitioning');
    }, 1000);

  });


  const canvas = document.getElementById("particle-canvas");
const ctx = canvas.getContext("2d");

let particles = [];
const particleCount = 40;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function createParticles() {
  particles = [];
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 0.5,
      speedX: (Math.random() - 0.5) * 0.2,
      speedY: (Math.random() - 0.5) * 0.2
    });
  }
}
createParticles();

function getParticleColor() {
  if (document.body.classList.contains("light-theme")) {
    return "rgba(255, 200, 0, 0.15)";
  } else {
    return "rgba(0, 255, 255, 0.15)";
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    p.x += p.speedX;
    p.y += p.speedY;

    if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
    if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = getParticleColor();
    ctx.fill();
  });

  requestAnimationFrame(animateParticles);
}

animateParticles();



gsap.registerPlugin(ScrollTrigger);

const heroTimeline = gsap.timeline();

heroTimeline
  .from(".hero-title", {
    y: 60,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
  })
  .from(".sec-subtitle", {
    y: 40,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out"
  }, "-=0.6")
  .from(".sec-btn", {
    y: 20,
    opacity: 0,
    duration: 0.6,
    ease: "power3.out"
  }, "-=0.5");

  gsap.utils.toArray(".sec-title").forEach(title => {

  gsap.from(title, {
    yPercent: 100,
    opacity: 0,
    duration: 1.2,
    ease: "power4.out",
    scrollTrigger: {
      trigger: title,
      start: "top 85%",
      toggleActions: "play none none none"
    }
  });

});
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

ScrollSmoother.create({
  wrapper: "#smooth-wrapper",
  content: "#smooth-content",
  smooth: 1.2,
  effects: true
});



});


