(function () {
  "use strict";

  var LANG_KEY = "yd-lang";
  var LANGS = ["en", "es", "ar"];
  var RTL_LANGS = { ar: "rtl" };

  function dict(lang) {
    return (window.I18N && window.I18N[lang]) || window.I18N.en;
  }

  function lookup(obj, key) {
    if (obj && Object.prototype.hasOwnProperty.call(obj, key)) return obj[key];
    return undefined;
  }

  function t(key, lang) {
    var value = lookup(dict(lang || currentLang), key);
    if (value === undefined) value = lookup(window.I18N.en, key);
    return value === undefined ? "" : value;
  }

  function detectInitialLang() {
    var saved = null;
    try {
      saved = window.localStorage.getItem(LANG_KEY);
    } catch (err) {
      saved = null;
    }
    if (saved && LANGS.indexOf(saved) !== -1) return saved;
    var nav = (navigator.language || "en").toLowerCase();
    if (nav.indexOf("ar") === 0) return "ar";
    if (nav.indexOf("es") === 0) return "es";
    return "en";
  }

  var currentLang = detectInitialLang();

  function trackEvent(name, detail) {
    try {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: name,
        lang: currentLang,
        page: document.body ? document.body.getAttribute("data-page") : null,
        detail: detail || null
      });
    } catch (err) {
    }
  }

  function setLang(lang, opts) {
    if (LANGS.indexOf(lang) === -1) lang = "en";
    currentLang = lang;
    try {
      window.localStorage.setItem(LANG_KEY, lang);
    } catch (err) {
    }
    applyLang();
    if (!opts || !opts.silent) {
      trackEvent("language_select", { to: lang });
    }
  }

  function applyLang() {
    var d = dict(currentLang);
    var fallback = window.I18N.en;

    document.documentElement.lang = currentLang;
    document.documentElement.dir = RTL_LANGS[currentLang] || "ltr";

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var value = lookup(d, el.getAttribute("data-i18n"));
      if (value === undefined) value = lookup(fallback, el.getAttribute("data-i18n"));
      if (typeof value === "string") el.textContent = value;
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      var value = lookup(d, el.getAttribute("data-i18n-placeholder"));
      if (value === undefined) value = lookup(fallback, el.getAttribute("data-i18n-placeholder"));
      if (typeof value === "string") el.setAttribute("placeholder", value);
    });

    document.querySelectorAll("[data-i18n-attr]").forEach(function (el) {
      var spec = el.getAttribute("data-i18n-attr").split(";").filter(Boolean);
      spec.forEach(function (pair) {
        var parts = pair.split(":");
        var attrName = parts[0].trim();
        var key = parts[1].trim();
        var value = lookup(d, key);
        if (value === undefined) value = lookup(fallback, key);
        if (typeof value === "string") el.setAttribute(attrName, value);
      });
    });

    var page = document.body ? document.body.getAttribute("data-page") : null;
    if (page) {
      var title = lookup(d, "meta." + page + ".title");
      if (typeof title === "string") document.title = title;
      var metaDescription = document.querySelector('meta[name="description"]');
      var desc = lookup(d, "meta." + page + ".desc");
      if (metaDescription && typeof desc === "string") {
        metaDescription.setAttribute("content", desc);
      }
    }

    document.querySelectorAll(".lang-switch [data-lang]").forEach(function (btn) {
      var active = btn.getAttribute("data-lang") === currentLang;
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });

    document.dispatchEvent(new CustomEvent("yd:langchange", { detail: { lang: currentLang } }));
  }

  function closeNav() {
    var links = document.querySelector(".nav__links");
    var toggle = document.querySelector(".nav__toggle");
    if (links) links.classList.remove("is-open");
    if (toggle) toggle.setAttribute("aria-expanded", "false");
  }

  function bindEvents() {
    document.querySelectorAll(".lang-switch [data-lang]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        setLang(btn.getAttribute("data-lang"));
      });
    });

    var toggle = document.querySelector(".nav__toggle");
    if (toggle) {
      toggle.addEventListener("click", function () {
        var links = document.querySelector(".nav__links");
        var open = links.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
    }

    document.querySelectorAll(".nav__links a").forEach(function (link) {
      link.addEventListener("click", closeNav);
    });

    document.addEventListener("click", function (event) {
      var tracked = event.target.closest("[data-track]");
      if (tracked) {
        trackEvent(tracked.getAttribute("data-track"), {
          href: tracked.getAttribute("href") || null,
          text: (tracked.textContent || "").trim().slice(0, 80)
        });
      }
    });

    var revealElements = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });
      revealElements.forEach(function (el) { observer.observe(el); });
    } else {
      revealElements.forEach(function (el) { el.classList.add("is-visible"); });
    }

    document.querySelectorAll("form[data-form]").forEach(function (form) {
      form.addEventListener("submit", function (event) {
        handleSubmit(event, form);
      });
    });
  }

  function setStatus(form, key, state) {
    var status = form.querySelector(".form-status");
    if (!status) return;
    var msg = t(key);
    if (msg) status.textContent = msg;
    status.setAttribute("data-state", state || "info");
  }

  function handleSubmit(event, form) {
    event.preventDefault();
    var lang = currentLang;
    var honeypot = form.querySelector(".hp-field input");
    if (honeypot && honeypot.value) {
      setStatus(form, "form.spamDetected", "error");
      trackEvent("form_spam", { form: form.getAttribute("data-form") });
      return;
    }

    var nameField = form.querySelector('[name="name"]');
    var emailField = form.querySelector('[name="email"]');
    var phoneField = form.querySelector('[name="phone"]');
    var consent = form.querySelector('[name="consent"]');

    if (!nameField || !nameField.value.trim() || !emailField || !emailField.value.trim() || !phoneField || !phoneField.value.trim()) {
      setStatus(form, "form.required", "error");
      return;
    }

    var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRe.test(emailField.value.trim())) {
      setStatus(form, "form.invalidEmail", "error");
      return;
    }

    if (consent && !consent.checked) {
      setStatus(form, "form.needConsent", "error");
      return;
    }

    var kind = form.getAttribute("data-form") || "contact";
    var fields = ["name", "email", "phone", "state", "message"];
    var lines = [];
    fields.forEach(function (fieldName) {
      var input = form.querySelector('[name="' + fieldName + '"]');
      if (input && input.value.trim()) {
        var label = t("form." + fieldName) || fieldName;
        lines.push(label + ": " + input.value.trim());
      }
    });

    var page = document.body ? document.body.getAttribute("data-page") : null;
    var subject = t("form." + (kind === "join" ? "submit" : "send")) + " — " + t("common.npn") + " · " + window.location.hostname;
    var body = lines.join("\n\n") + "\n\n---\n" + t("common.npn") + "\n" + t("contact.hours.text") + "\n" + (page || "");

    setStatus(form, "form.sending", "info");

    var mailtoUrl = "mailto:FamilyFirstLifeBusiness@gmail.com" +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(body);

    trackEvent("form_submit", { form: kind, lang: lang });

    try {
      window.location.href = mailtoUrl;
      setStatus(form, "form.mailtoNote", "ok");
    } catch (err) {
      setStatus(form, "form.error", "error");
    }
  }

  window.YDSite = {
    t: t,
    setLang: setLang,
    getLang: function () { return currentLang; },
    trackEvent: trackEvent,
    applyLang: applyLang
  };

  document.addEventListener("DOMContentLoaded", function () {
    var yearEl = document.getElementById("footer-year");
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());
    bindEvents();
    applyLang();
    trackEvent("page_view");
  });
})();
