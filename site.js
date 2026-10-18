(function () {
  var DATA = null;

  // light / dark toggle — follows the device setting until the visitor picks one
  var root = document.documentElement;
  function currentTheme() {
    var t = root.getAttribute("data-theme");
    if (t === "light" || t === "dark") return t;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  }
  document.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var next = currentTheme() === "light" ? "dark" : "light";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
    });
  });

  function esc(s) { return String(s == null ? "" : s); }
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function waLink(key) {
    var c = DATA.contact, msgs = DATA.whatsappMessages;
    var msg = (msgs[key] || msgs.general).split("{name}").join(c.artistName);
    return "https://wa.me/" + String(c.whatsapp).replace(/[^0-9]/g, "") + "?text=" + encodeURIComponent(msg);
  }
  function setText(sel, value) {
    document.querySelectorAll(sel).forEach(function (n) { n.textContent = value; });
  }

  function render() {
    var d = DATA;

    var heroImg = document.querySelector("[data-hero-image]");
    if (heroImg) {
      if (d.hero.image) {
        heroImg.innerHTML = "";
        var hi = document.createElement("img");
        hi.src = d.hero.image; hi.alt = d.hero.imageAlt || "";
        heroImg.appendChild(hi);
      }
    }

    document.title = d.brand.name.charAt(0) + d.brand.name.slice(1).toLowerCase() + " — Henna & Mehndi Artist";
    setText("[data-c='brand.name']", d.brand.name);
    setText("[data-c='brand.sub']", d.brand.sub);
    setText("[data-c='brand.tagline']", d.brand.tagline);

    setText("[data-c='hero.eyebrow']", d.hero.eyebrow);
    setText("[data-c='hero.title']", d.hero.title);
    setText("[data-c='hero.body']", d.hero.body);
    setText("[data-c='hero.primaryCta']", d.hero.primaryCta);
    setText("[data-c='hero.secondaryCta']", d.hero.secondaryCta);
    setText("[data-c='hero.note']", d.hero.note);
    setText("[data-c='hero.imageAlt']", d.hero.imageAlt);

    var badges = document.querySelector("[data-list='badges']");
    badges.innerHTML = "";
    d.badges.forEach(function (b) {
      var box = el("div");
      box.appendChild(el("h3", null, b.title));
      box.appendChild(el("p", null, b.body));
      badges.appendChild(box);
    });

    setText("[data-c='services.eyebrow']", d.services.eyebrow);
    setText("[data-c='services.title']", d.services.title);
    setText("[data-c='services.body']", d.services.body);
    var note = d.services.note;
    var noteBox = document.querySelector("[data-price-note]");
    if (noteBox) {
      if (note && note.title) {
        setText("[data-c='services.note.kicker']", note.kicker || "");
        setText("[data-c='services.note.title']", note.title);
        setText("[data-c='services.note.body']", note.body || "");
      } else {
        noteBox.hidden = true;
      }
    }
    var svc = document.querySelector("[data-list='services']");
    svc.innerHTML = "";
    d.services.items.forEach(function (s) {
      var c = el("div", "card");
      c.appendChild(el("h3", null, s.title));
      c.appendChild(el("p", null, s.body));
      c.appendChild(el("p", "price", s.price));
      var a = el("a", "link-underline", s.cta);
      a.href = waLink(s.wa); a.target = "_blank"; a.rel = "noopener";
      c.appendChild(a);
      svc.appendChild(c);
    });

    setText("[data-c='gallery.eyebrow']", d.gallery.eyebrow);
    setText("[data-c='gallery.title']", d.gallery.title);
    setText("[data-c='gallery.note']", d.gallery.note);
    var filters = document.querySelector("[data-list='filters']");
    var grid = document.querySelector("[data-list='gallery']");
    function paint(tag) {
      grid.innerHTML = "";
      d.gallery.items.filter(function (g) { return tag === "ALL" || g.tag === tag; }).forEach(function (g) {
        var box = el("div", "ph");
        if (g.image) {
          var img = document.createElement("img");
          img.src = g.image; img.alt = g.label; img.loading = "lazy";
          box.appendChild(img);
        } else {
          box.appendChild(el("span", null, g.label));
        }
        grid.appendChild(box);
      });
    }
    filters.innerHTML = "";
    d.gallery.filters.forEach(function (f, i) {
      var b = el("button", "chip", f);
      b.type = "button";
      b.setAttribute("aria-pressed", i === 0 ? "true" : "false");
      b.addEventListener("click", function () {
        filters.querySelectorAll(".chip").forEach(function (x) { x.setAttribute("aria-pressed", "false"); });
        b.setAttribute("aria-pressed", "true");
        paint(f);
      });
      filters.appendChild(b);
    });
    paint("ALL");

    setText("[data-c='trends.eyebrow']", d.trends.eyebrow);
    setText("[data-c='trends.title']", d.trends.title);
    var tr = document.querySelector("[data-list='trends']");
    tr.innerHTML = "";
    d.trends.items.forEach(function (t) {
      var box = el("div", "trend");
      box.appendChild(el("h3", null, t.title));
      box.appendChild(el("p", null, t.body));
      tr.appendChild(box);
    });

    setText("[data-c='coverage.eyebrow']", d.coverage.eyebrow);
    setText("[data-c='coverage.title']", d.coverage.title);
    setText("[data-c='coverage.body']", d.coverage.body);
    var areas = document.querySelector("[data-list='areas']");
    areas.innerHTML = "";
    d.coverage.areas.forEach(function (a) { areas.appendChild(el("span", "area", a)); });

    setText("[data-c='booking.title']", d.booking.title);
    setText("[data-c='booking.cta']", d.booking.cta);
    var steps = document.querySelector("[data-list='steps']");
    steps.innerHTML = "";
    d.booking.steps.forEach(function (s, i) {
      var row = el("div", "step");
      row.appendChild(el("i", null, String(i + 1)));
      row.appendChild(el("p", null, s));
      steps.appendChild(row);
    });

    setText("[data-c='safety.eyebrow']", d.safety.eyebrow);
    setText("[data-c='safety.title']", d.safety.title);
    setText("[data-c='safety.body']", d.safety.body);
    setText("[data-c='safety.warnTitle']", d.safety.warnTitle);
    setText("[data-c='safety.warnBody']", d.safety.warnBody);
    var pts = document.querySelector("[data-list='points']");
    pts.innerHTML = "";
    d.safety.points.forEach(function (p) {
      var row = el("div", "point");
      row.appendChild(el("i"));
      var para = el("p");
      var strong = el("strong", null, p.lead + " ");
      para.appendChild(strong);
      para.appendChild(document.createTextNode(p.body));
      row.appendChild(para);
      pts.appendChild(row);
    });
    var warns = document.querySelector("[data-list='warnings']");
    warns.innerHTML = "";
    d.safety.warnings.forEach(function (w) {
      var box = el("div", "warn");
      box.appendChild(el("h4", null, w.title));
      box.appendChild(el("p", null, w.body));
      warns.appendChild(box);
    });

    setText("[data-c='testimonials.eyebrow']", d.testimonials.eyebrow);
    var qs = document.querySelector("[data-list='testimonials']");
    qs.innerHTML = "";
    d.testimonials.items.forEach(function (t) {
      var b = document.createElement("blockquote");
      b.appendChild(el("p", null, "\u201C" + t.quote + "\u201D"));
      b.appendChild(el("cite", null, t.cite));
      qs.appendChild(b);
    });

    setText("[data-c='faq.eyebrow']", d.faq.eyebrow);
    setText("[data-c='faq.title']", d.faq.title);
    var faq = document.querySelector("[data-list='faq']");
    faq.innerHTML = "";
    d.faq.items.forEach(function (f) {
      var det = document.createElement("details");
      var sum = document.createElement("summary");
      sum.textContent = f.q;
      det.appendChild(sum);
      det.appendChild(el("p", null, f.a));
      faq.appendChild(det);
    });

    setText("[data-c='cta.title']", d.cta.title);
    setText("[data-c='cta.body']", d.cta.body);
    setText("[data-c='cta.button']", d.cta.button);
    setText("[data-c='contact.phoneDisplay']", d.contact.phoneDisplay);
    setText("[data-c='footer.legal']", d.footer.legal);
    setText("[data-c='footer.credits']", d.footer.credits || "");

    document.querySelectorAll("[data-wa]").forEach(function (a) { a.href = waLink(a.getAttribute("data-wa")); });
    document.querySelectorAll("[data-href='instagram']").forEach(function (a) { a.href = d.contact.instagram; });
    document.querySelectorAll("[data-href='tel']").forEach(function (a) {
      a.href = "tel:+" + String(d.contact.whatsapp).replace(/[^0-9]/g, "");
    });
  }

  fetch("content.json")
    .then(function (r) { return r.json(); })
    .then(function (json) { DATA = json; render(); })
    .catch(function (e) {
      console.error("Could not load content.json — serve the folder over http (see README).", e);
      document.body.setAttribute("data-content-failed", "true");
    });
})();