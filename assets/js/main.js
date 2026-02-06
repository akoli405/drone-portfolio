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

document.addEventListener("scroll", function () {
  const navbar = document.querySelector(".hero-navbar");

  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
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
document.getElementById("videoModal").addEventListener("hidden.bs.modal", () => {
  const video = document.getElementById("modalVideo");
  video.pause();
  video.currentTime = 0;
});
