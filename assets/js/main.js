(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var prefersFinePointer = window.matchMedia("(pointer: fine)").matches;
  var doc = document;

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
    var sections = [];

    Array.prototype.forEach.call(links, function (link) {
      var id = link.getAttribute("href");
      if (id && id.charAt(0) === "#") {
        var section = doc.querySelector(id);
        if (section) sections.push(section);
      }
    });

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
  function initReveal() {
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
  }

  /* ---------------------------------------------------------
   * Animated counters
   * --------------------------------------------------------- */
  function initCounters() {
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
  }

  /* ---------------------------------------------------------
   * Skill bars
   * --------------------------------------------------------- */
  function initSkillBars() {
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
  }

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

  /* ---------------------------------------------------------
   * Data-driven content (loads page sections from /data/*.json)
   * --------------------------------------------------------- */
  (function initData() {
    var esc = function (s) {
      return String(s)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
    };

    function renderProfile(data) {
      if (data.name) {
        if (doc.title) doc.title = data.name;
        var nameEl = doc.querySelector(".hero__name");
        if (nameEl) {
          var parts = data.name.trim().split(/\s+/);
          var last = parts.pop() || "";
          nameEl.innerHTML =
            esc(parts.join(" ")) +
            (last ? ' <span class="text-gradient">' + esc(last) + "</span>" : "");
        }
      }

      var titleEl = doc.querySelector(".hero__title");
      var introEl = doc.querySelector(".hero__intro");
      if (titleEl && data.role) titleEl.textContent = data.role;
      if (introEl && data.intro) introEl.textContent = data.intro;

      var statsEl = doc.querySelector(".hero__stats");
      if (statsEl && data.stats && data.stats.length) {
        statsEl.innerHTML = data.stats
          .map(function (stat) {
            return (
              '<div class="stat">' +
              '<dd class="stat__value"><span class="count" data-count="' +
              stat.value +
              '">0</span>' +
              esc(stat.suffix || "") +
              "</dd>" +
              '<dt class="stat__label">' +
              esc(stat.label) +
              "</dt>" +
              "</div>"
            );
          })
          .join("");
      }

      renderChannels(data);
    }

    function renderChannels(data) {
      var wrap = doc.querySelector(".channels");
      if (!wrap) return;

      var defs = [
        { key: "email", label: "Email", icon: "i-mail", external: false },
        { key: "linkedin", label: "LinkedIn", icon: "i-linkedin", external: true },
        { key: "github", label: "GitHub", icon: "i-github", external: true },
        { key: "discord", label: "Discord", icon: "i-discord", external: true }
      ];

      wrap.innerHTML = defs
        .map(function (def, i) {
          var url = def.key === "email" ? "mailto:" + (data[def.key] || "") : data[def.key];
          if (!url) return "";
          var external = def.external ? ' target="_blank" rel="noopener noreferrer"' : "";
          return (
            '<a class="channel card-surface" data-reveal data-rd="' +
            i * 60 +
            '" href="' +
            esc(url) +
            '"' +
            external +
            ' aria-label="' +
            def.label +
            '">' +
            '<span class="channel__icon"><svg><use href="#' +
            def.icon +
            '"></use></svg></span>' +
            '<div class="channel__body"><p class="channel__label">' +
            def.label +
            "</p></div>" +
            "</a>"
          );
        })
        .join("");
    }

    function renderSkills(data) {
      var wrap = doc.querySelector(".expertise__grid");
      if (!wrap || !data.expertise) return;

      wrap.innerHTML = data.expertise
        .map(function (card, i) {
          var rd = (i % 4) * 90;
          return (
            '<article class="expertise-card card-surface" data-reveal' +
            (rd ? ' data-rd="' + rd + '"' : "") +
            ">" +
            '<span class="glow-dot"></span>' +
            '<span class="expertise-card__icon"><svg><use href="#i-' +
            card.icon +
            '"></use></svg></span>' +
            "<h3>" +
            esc(card.title) +
            "</h3>" +
            "<p>" +
            esc(card.description) +
            "</p>" +
            "</article>"
          );
        })
        .join("");
    }

    function renderExperience(data) {
      var wrap = doc.querySelector(".experience__items");
      if (!wrap || !data.roles || !data.roles.length) return;

      var role = data.roles[0];
      var highlights = (role.highlights || [])
        .map(function (h) {
          return '<li><svg><use href="#i-check-circle-2"></use></svg><span>' + esc(h) + "</span></li>";
        })
        .join("");
      var responsibilities = (data.responsibilities || [])
        .map(function (r) {
          return '<span class="resp-tag">' + esc(r) + "</span>";
        })
        .join("");

      wrap.innerHTML =
        '<article class="exp-item">' +
        '<span class="exp-item__marker"><svg><use href="#i-briefcase"></use></svg></span>' +
        '<div class="exp-card card-surface" data-reveal>' +
        '<div class="exp-card__head">' +
        "<h3>" +
        esc(role.title) +
        "</h3>" +
        '<span class="tag-pill tag-pill--accent">' +
        esc(role.type) +
        "</span>" +
        '<span class="tag-pill tag-pill--mono exp-card__period">' +
        esc(role.period) +
        "</span>" +
        "</div>" +
        '<p class="exp-card__org">' +
        esc(role.organization) +
        "</p>" +
        '<p class="exp-card__summary">' +
        esc(role.summary) +
        "</p>" +
        '<div class="exp-card__body">' +
        '<ul class="exp-list">' +
        highlights +
        "</ul>" +
        '<div class="exp-card__resp">' +
        '<h3 class="exp-card__resp-title">Core Responsibilities</h3>' +
        '<div class="resp-tags">' +
        responsibilities +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</article>";
    }

    function renderEducation(data) {
      var wrap = doc.querySelector(".edu-timeline");
      if (!wrap || !data.stages) return;

      wrap.innerHTML = data.stages
        .map(function (stage) {
          return (
            '<div class="edu-stage">' +
            '<span class="edu-stage__marker"><svg><use href="#i-' +
            stage.icon +
            '"></use></svg></span>' +
            '<div class="edu-stage__body">' +
            '<span class="badge-level">' +
            esc(stage.level) +
            "</span>" +
            "<h3>" +
            esc(stage.institution) +
            "</h3>" +
            '<p class="edu-stage__field">' +
            esc(stage.field) +
            "</p>" +
            "</div>" +
            "</div>"
          );
        })
        .join("");
    }

    function renderCertifications(data) {
      var wrap = doc.querySelector("#certifications .certs__grid");
      if (!wrap || !data.certifications) return;

      wrap.innerHTML = data.certifications
        .map(function (cert, i) {
          var rd = (i % 2) * 90;
          return (
            '<article class="cert-card card-surface" data-reveal' +
            (rd ? ' data-rd="' + rd + '"' : "") +
            ">" +
            '<div class="cert-card__head">' +
            '<span class="cert-card__icon"><svg><use href="#i-' +
            cert.icon +
            '"></use></svg></span>' +
            "<div>" +
            '<h3 class="cert-card__title">' +
            esc(cert.title) +
            '<svg><use href="#i-badge-check"></use></svg></h3>' +
            '<p class="cert-card__org">' +
            esc(cert.org) +
            "</p>" +
            "</div>" +
            "</div>" +
            '<div class="cert-card__foot">' +
            '<a href="' +
            esc(cert.link) +
            '" target="_blank" rel="noopener noreferrer" class="btn-accent">View Certificate<svg><use href="#i-arrow-up-right"></use></svg></a>' +
            "</div>" +
            "</article>"
          );
        })
        .join("");
    }

    function renderAchievements(data) {
      var wrap = doc.querySelector("#achievements .certs__grid");
      if (!wrap || !data.achievements) return;

      wrap.innerHTML = data.achievements
        .map(function (item) {
          return (
            '<article class="cert-card card-surface" data-reveal>' +
            '<div class="cert-card__head">' +
            '<span class="cert-card__icon"><svg><use href="#i-' +
            item.icon +
            '"></use></svg></span>' +
            "<div>" +
            '<h3 class="cert-card__title">' +
            esc(item.title) +
            '<svg><use href="#i-badge-check"></use></svg></h3>' +
            '<p class="cert-card__org">' +
            esc(item.org) +
            "</p>" +
            "</div>" +
            "</div>" +
            '<p class="text">' +
            esc(item.description) +
            "</p>" +
            '<div class="cert-card__foot">' +
            '<a href="' +
            esc(item.link.href) +
            '" target="_blank" rel="noopener noreferrer" class="btn-accent">' +
            esc(item.link.label) +
            '<svg><use href="#i-arrow-up-right"></use></svg></a>' +
            "</div>" +
            "</article>"
          );
        })
        .join("");
    }

    var tasks = [
      { url: "data/profile.json", render: renderProfile },
      { url: "data/skills.json", render: renderSkills },
      { url: "data/experience.json", render: renderExperience },
      { url: "data/education.json", render: renderEducation },
      { url: "data/certifications.json", render: renderCertifications },
      { url: "data/achievements.json", render: renderAchievements }
    ];

    var total = tasks.length;
    var finished = 0;

    function reinit() {
      finished++;
      if (finished === total) {
        initReveal();
        initCounters();
        initSkillBars();
      }
    }

    tasks.forEach(function (task) {
      fetch(task.url)
        .then(function (res) {
          if (!res.ok) throw new Error(task.url + " -> " + res.status);
          return res.json();
        })
        .then(function (data) {
          task.render(data);
        })
        .catch(function (err) {
          console.warn("[data] " + task.url + ": " + err.message);
        })
        .then(reinit);
    });
  })();

  initReveal();
  initCounters();
  initSkillBars();
})();
