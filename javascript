document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".nav");
  const hamb = document.querySelector(".hamburger");
  const mob = document.querySelector(".mob-nav");

  if (hamb && mob) {
    hamb.addEventListener("click", () => {
      mob.classList.toggle("open");
      hamb.setAttribute("aria-expanded", mob.classList.contains("open"));
    });
  }

  window.addEventListener("scroll", () => {
    if (nav) nav.classList.toggle("scrolled", window.scrollY > 20);
  });

  const io = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("in");
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll(".reveal").forEach(el => io.observe(el));

  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const name = document.getElementById("name");
      const email = document.getElementById("email");
      const message = document.getElementById("message");
      if (!name.value.trim() || !email.value.trim() || !message.value.trim()) return;
      const success = document.getElementById("formSuccess");
      if (success) success.style.display = "block";
      form.reset();
    });
  }

  const timer = document.querySelector(".pomo-time");
  const start = document.querySelector(".pomo-start");
  const reset = document.querySelector(".pomo-reset");

  let secs = 25 * 60;
  let run = false;
  let t;

  function fmt(s) {
    const m = String(Math.floor(s / 60)).padStart(2, "0");
    const ss = String(s % 60).padStart(2, "0");
    return `${m}:${ss}`;
  }

  if (timer) timer.textContent = fmt(secs);

  if (start) {
    start.addEventListener("click", () => {
      run = !run;
      start.textContent = run ? "Pause" : "Start";

      if (run) {
        t = setInterval(() => {
          if (secs > 0) {
            secs--;
            if (timer) timer.textContent = fmt(secs);
          } else {
            clearInterval(t);
            run = false;
            start.textContent = "Start";
          }
        }, 1000);
      } else {
        clearInterval(t);
      }
    });
  }

  if (reset) {
    reset.addEventListener("click", () => {
      clearInterval(t);
      run = false;
      secs = 25 * 60;
      if (timer) timer.textContent = fmt(secs);
      if (start) start.textContent = "Start";
    });
  }

  const canvas = document.getElementById("bg-canvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let w, h, p;

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      p = Array.from({ length: 70 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.8 + 0.2,
        v: Math.random() * 0.22 + 0.06
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      p.forEach(o => {
        o.y += o.v;
        if (o.y > h + 10) o.y = -10;
        ctx.fillStyle = "rgba(240,180,41,.22)";
        ctx.beginPath();
        ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
        ctx.fill();
      });
      requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener("resize", resize);
    draw();
  }
});
