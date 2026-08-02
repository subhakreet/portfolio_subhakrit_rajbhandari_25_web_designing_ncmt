(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var prefersFinePointer = window.matchMedia("(pointer: fine)").matches;
  var doc = document;
  var body = doc.body;

  /* ---------------------------------------------------------
   * Loading screen
   * --------------------------------------------------------- */
  (function initLoader() {
    var loader = doc.getElementById("loader");
    var done = false;

    function finish() {
      if (done) return;
      done = true;
      body.classList.remove("is-loading");
      if (loader) loader.classList.add("is-done");
    }

    window.addEventListener("load", finish);
    setTimeout(finish, 2200);
  })();

  /* ---------------------------------------------------------
   * Navbar scroll state + scroll progress + back to top
   * --------------------------------------------------------- */
  (function initScroll() {
    var nav = doc.getElementById("nav");
    var progress = doc.getElementById("scrollProgress");
    var backTop = doc.getElementById("backTop");

    function onScroll() {
      var y = window.scrollY || window.pageYOffset;
      if (nav) nav.classList.toggle("is-scrolled", y > 24);

      if (progress) {
        var max = doc.documentElement.scrollHeight - window.innerHeight;
        var pct = max > 0 ? (y / max) * 100 : 0;
        progress.style.width = pct.toFixed(2) + "%";
      }

      if (backTop) backTop.classList.toggle("is-visible", y > 640);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    if (backTop) {
      backTop.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
      });
    }
  })();

  /* ---------------------------------------------------------
   * Mobile menu
   * --------------------------------------------------------- */
  (function initMobileMenu() {
    var burger = doc.getElementById("navBurger");
    var mobile = doc.getElementById("navMobile");
    var openIcon = doc.getElementById("burgerOpen");
    var closeIcon = doc.getElementById("burgerClose");

    function setOpen(open) {
      if (!mobile) return;
      mobile.classList.toggle("is-open", open);
      if (openIcon) openIcon.style.display = open ? "none" : "";
      if (closeIcon) closeIcon.style.display = open ? "" : "none";
      if (burger) burger.setAttribute("aria-expanded", String(open));
    }

    if (burger) {
      burger.addEventListener("click", function () {
        setOpen(!mobile.classList.contains("is-open"));
      });
    }

    if (mobile) {
      mobile.addEventListener("click", function (e) {
        if (e.target.closest("a")) setOpen(false);
      });
    }

    window.addEventListener("resize", function () {
      if (window.innerWidth >= 768) setOpen(false);
    });
  })();

  /* ---------------------------------------------------------
   * Scroll-spy active nav link
   * --------------------------------------------------------- */
  (function initScrollSpy() {
    var links = doc.querySelectorAll("#navLinks .nav__link");
    var sections = Array.prototype.map.call(links, function (link) {
      var id = link.getAttribute("href");
      return doc.querySelector(id);
    }).filter(Boolean);

    if (!("IntersectionObserver" in window) || sections.length === 0) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var id = "#" + entry.target.id;
            links.forEach(function (link) {
              link.classList.toggle("is-active", link.getAttribute("href") === id);
            });
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    sections.forEach(function (s) {
      observer.observe(s);
    });
  })();

  /* ---------------------------------------------------------
   * Reveal on scroll
   * --------------------------------------------------------- */
  (function initReveal() {
    var items = doc.querySelectorAll("[data-reveal]");

    items.forEach(function (el) {
      var delay = parseInt(el.getAttribute("data-rd") || "0", 10);
      el.style.setProperty("--rd", delay + "ms");
    });

    if (!("IntersectionObserver" in window) || prefersReducedMotion) {
      items.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    items.forEach(function (el) {
      observer.observe(el);
    });
  })();

  /* ---------------------------------------------------------
   * Animated counters
   * --------------------------------------------------------- */
  (function initCounters() {
    var els = doc.querySelectorAll(".count[data-count]");

    els.forEach(function (el) {
      var target = parseFloat(el.getAttribute("data-count")) || 0;

      function setValue(v) {
        el.textContent = String(Math.round(v));
      }

      if (!("IntersectionObserver" in window) || prefersReducedMotion) {
        setValue(target);
        return;
      }

      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            observer.unobserve(el);

            var start = null;
            var duration = 1400;

            function step(ts) {
              if (start === null) start = ts;
              var p = Math.min((ts - start) / duration, 1);
              var eased = 1 - Math.pow(1 - p, 3);
              setValue(target * eased);
              if (p < 1) requestAnimationFrame(step);
            }

            requestAnimationFrame(step);
          });
        },
        { threshold: 0.5 }
      );

      observer.observe(el);
    });
  })();

  /* ---------------------------------------------------------
   * Skill bars
   * --------------------------------------------------------- */
  (function initSkillBars() {
    var fills = doc.querySelectorAll(".skill__fill[data-level]");

    if (!("IntersectionObserver" in window)) {
      fills.forEach(function (el) {
        el.style.width = el.getAttribute("data-level") + "%";
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.style.width = entry.target.getAttribute("data-level") + "%";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5, rootMargin: "0px 0px -40px 0px" }
    );

    fills.forEach(function (el) {
      observer.observe(el);
    });
  })();

  /* ---------------------------------------------------------
   * Particle field
   * --------------------------------------------------------- */
  (function initParticles() {
    var canvas = doc.getElementById("particles");
    if (!canvas || !canvas.getContext) return;

    var ctx = canvas.getContext("2d");
    var particles = [];
    var running = true;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      var w = window.innerWidth;
      var h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      spawn(w, h);
    }

    function spawn(w, h) {
      var count = Math.min(48, Math.floor((w * h) / 24000));
      particles = [];
      for (var i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.22,
          vy: (Math.random() - 0.5) * 0.22,
          r: Math.random() * 1.5 + 0.5,
          a: Math.random() * 0.45 + 0.12,
        });
      }
    }

    function step() {
      if (!running) return;
      var w = window.innerWidth;
      var h = window.innerHeight;

      ctx.clearRect(0, 0, w, h);

      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(56, 189, 248, " + p.a.toFixed(3) + ")";
        ctx.fill();
      }

      for (var j = 0; j < particles.length; j++) {
        for (var k = j + 1; k < particles.length; k++) {
          var a = particles[j];
          var b = particles[k];
          var dx = a.x - b.x;
          var dy = a.y - b.y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            var alpha = (1 - dist / 120) * 0.08;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = "rgba(125, 211, 252, " + alpha.toFixed(3) + ")";
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(step);
    }

    if (prefersReducedMotion) return;

    resize();
    window.addEventListener("resize", resize, { passive: true });

    doc.addEventListener("visibilitychange", function () {
      running = !doc.hidden;
      if (running) requestAnimationFrame(step);
    });

    requestAnimationFrame(step);
  })();

  /* ---------------------------------------------------------
   * Custom cursor (fine-pointer devices only)
   * --------------------------------------------------------- */
  (function initCursor() {
    if (!prefersFinePointer || prefersReducedMotion) return;

    var dot = doc.getElementById("cursorDot");
    var ring = doc.getElementById("cursorRing");
    if (!dot || !ring) return;

    doc.documentElement.classList.add("has-cursor");

    var mouseX = -100;
    var mouseY = -100;
    var ringX = -100;
    var ringY = -100;
    var visible = false;

    function move(x, y) {
      mouseX = x;
      mouseY = y;
      if (!visible) {
        visible = true;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }
      dot.style.transform = "translate(" + x + "px, " + y + "px) translate(-50%, -50%)";
    }

    function loop() {
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;
      ring.style.transform = "translate(" + ringX + "px, " + ringY + "px) translate(-50%, -50%)";
      requestAnimationFrame(loop);
    }

    window.addEventListener("mousemove", function (e) {
      move(e.clientX, e.clientY);
    });

    document.addEventListener(
      "mouseover",
      function (e) {
        var t = e.target;
        var interactive =
          t.closest && t.closest("a, button, input, textarea, select, [role='button']");
        ring.classList.toggle("is-active", Boolean(interactive));
      },
      { passive: true }
    );

    document.addEventListener("mouseleave", function () {
      visible = false;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    });

    requestAnimationFrame(loop);
  })();

  /* ---------------------------------------------------------
   * Contact form
   * --------------------------------------------------------- */
  (function initContactForm() {
    var form = doc.getElementById("contactForm");
    if (!form) return;

    var success = doc.getElementById("formSuccess");
    var btn = doc.getElementById("sendBtn");
    var btnLabel = btn ? btn.querySelector(".btn-label") : null;
    var sendIcon = btn ? btn.querySelector(".send") : null;
    var state = "idle";

    var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function validate() {
      var fields = form.querySelectorAll("[required]");
      for (var i = 0; i < fields.length; i++) {
        var field = fields[i];
        var valid =
          field.value.trim().length > 0 &&
          (field.type !== "email" || emailRe.test(field.value.trim()));
        if (!valid) {
          field.style.borderColor = "rgba(248, 113, 113, 0.6)";
          field.focus();
          return false;
        }
        field.style.borderColor = "";
      }
      return true;
    }

    form.addEventListener("input", function (e) {
      if (e.target && e.target.style) e.target.style.borderColor = "";
    });

    function setSending(sending) {
      if (!btn) return;
      btn.disabled = sending;
      if (sending) {
        btn.innerHTML =
          '<svg class="spinner"><use href="#i-loader-2"></use></svg>' +
          '<span class="btn-label">Sending...</span>';
      } else {
        btn.innerHTML =
          '<svg class="send"><use href="#i-send"></use></svg>' +
          '<span class="btn-label">Send Message</span>';
      }
      btnLabel = btn.querySelector(".btn-label");
      sendIcon = btn.querySelector(".send");
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (state !== "idle") return;
      if (!validate()) return;

      state = "sending";
      setSending(true);

      setTimeout(function () {
        state = "sent";
        setSending(false);
        form.style.display = "none";
        if (success) success.classList.add("is-visible");
        form.reset();

        setTimeout(function () {
          state = "idle";
          form.style.display = "";
          if (success) success.classList.remove("is-visible");
        }, 4200);
      }, 1400);
    });
  })();

  /* ---------------------------------------------------------
   * Footer year
   * --------------------------------------------------------- */
  (function setYear() {
    var el = doc.getElementById("year");
    if (el) el.textContent = String(new Date().getFullYear());
  })();
})();
