(function () {
  "use strict";

  var grid = null;
  var searchInput = null;
  var noResults = null;
  var dialog = null;
  var panelBody = null;
  var lastFocusedCard = null;

  function t(key) {
    return (window.YDSite && window.YDSite.t) ? window.YDSite.t(key) : "";
  }

  function track(name, detail) {
    if (window.YDSite && window.YDSite.trackEvent) window.YDSite.trackEvent(name, detail);
  }

  function stateLabel(state) {
    return t("state.name." + state.code) || state.name;
  }

  function renderCards() {
    if (!grid) return;
    grid.innerHTML = "";
    (window.STATE_LICENSES || []).forEach(function (state) {
      var card = document.createElement("button");
      card.type = "button";
      card.className = "state-card";
      card.setAttribute("data-code", state.code);
      card.setAttribute("aria-haspopup", "dialog");
      card.innerHTML =
        '<span class="state-card__abbr" aria-hidden="true">' + escapeHtml(state.code) + "</span>" +
        '<span class="state-card__name">' + escapeHtml(stateLabel(state)) + "</span>" +
        '<span class="badge ' + (state.verified ? "badge--ok" : "badge--pending") + '">' +
          escapeHtml(t(state.verified ? "lic.status.verified" : "lic.status.pending")) +
        "</span>";
      grid.appendChild(card);
    });
  }

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function filterCards(query) {
    if (!grid) return;
    var q = (query || "").trim().toLowerCase();
    var visible = 0;
    grid.querySelectorAll(".state-card").forEach(function (card) {
      var code = (card.getAttribute("data-code") || "").toLowerCase();
      var name = (card.querySelector(".state-card__name") || {}).textContent || "";
      var match = !q || code.indexOf(q) !== -1 || name.toLowerCase().indexOf(q) !== -1;
      card.hidden = !match;
      if (match) visible += 1;
    });
    if (noResults) noResults.hidden = visible !== 0;
  }

  function recordFacts(record) {
    var loaLabel = record.linesOfAuthority && record.linesOfAuthority.length > 1
      ? t("lic.panel.loaPlural")
      : t("lic.panel.loa");
    var loaValue = tintLines(record.linesOfAuthority);
    var rows = [
      [t("lic.panel.licenseNumber"), record.licenseNumber],
      [t("lic.panel.class"), record.licenseClass],
      [t("lic.panel.producerType"), record.producerType],
      [loaLabel, loaValue],
      [t("lic.panel.status"), record.status],
      [t("lic.panel.firstActive"), record.firstActiveDate],
      [t("lic.panel.expiration"), record.expirationDate]
    ];
    var html = '<dl class="license-facts">';
    rows.forEach(function (row) {
      if (row[1] === undefined || row[1] === null || row[1] === "") return;
      html += '<div class="license-facts__row"><dt>' + escapeHtml(row[0]) + "</dt><dd>" + escapeHtml(row[1]) + "</dd></div>";
    });
    html += "</dl>";
    return html;
  }

  function tintLines(lines) {
    if (!lines || !lines.length) return "";
    return lines.map(function (line) {
      if (line === "Life") return t("state.life") || line;
      return line;
    }).join(", ");
  }

  function openState(code) {
    var state = (window.STATE_LICENSES || []).find(function (s) { return s.code === code; });
    if (!state || !dialog) return;
    var agent = (window.AGENT_PROFILE || {});
    var html = "";

    html += '<h3 id="state-dialog-title">' + escapeHtml(stateLabel(state)) + " — " + escapeHtml(t("lic.panel.title")) + "</h3>";

    html += '<dl class="license-facts license-facts--agent">';
    html += '<div class="license-facts__row"><dt>' + escapeHtml(t("lic.panel.agent")) + "</dt><dd>" + escapeHtml(agent.name || "") + "</dd></div>";
    html += '<div class="license-facts__row"><dt>' + escapeHtml(t("lic.panel.npn")) + "</dt><dd>" + escapeHtml(agent.npn || "") + "</dd></div>";
    html += '<div class="license-facts__row"><dt>' + escapeHtml(t("lic.panel.offlineState")) + "</dt><dd>" + escapeHtml(stateLabel(state)) + "</dd></div>";
    html += "</dl>";

    if (state.verified && state.records && state.records.length) {
      state.records.forEach(function (record) {
        html += '<div class="license-record">' + recordFacts(record) + "</div>";
      });
    } else {
      html += '<p class="notice">' + escapeHtml(t("lic.panel.pendingText")) + "</p>";
    }

    html += '<div class="dialog-actions">';
    html += '<a class="btn btn--solid" href="' + escapeHtml(state.verificationUrl) + '" target="_blank" rel="noopener" data-track="state_verify">' +
      escapeHtml(t("lic.panel.verify")) + "</a>";
    html += '<button type="button" class="btn dialog-close">' + escapeHtml(t("lic.panel.close")) + "</button>";
    html += "</div>";

    if (state.verified) {
      html += '<p class="dialog-note">' + escapeHtml(t("lic.panel.offlineNote")) + "</p>";
    } else {
      html += '<p class="dialog-note">' + escapeHtml(t("lic.panel.offlineNotePending")) + "</p>";
    }

    panelBody.setAttribute("data-open-state", code);
    panelBody.innerHTML = html;
    lastFocusedCard = document.activeElement;
    if (typeof dialog.showModal === "function") {
      dialog.showModal();
    } else {
      dialog.setAttribute("open", "");
    }
    track("state_select", { state: code, verified: !!state.verified });
  }

  function closeDialog() {
    if (!dialog) return;
    if (typeof dialog.close === "function") {
      dialog.close();
    } else {
      dialog.removeAttribute("open");
    }
    if (lastFocusedCard && lastFocusedCard.focus) lastFocusedCard.focus();
  }

  function bindEvents() {
    if (grid) {
      grid.addEventListener("click", function (event) {
        var card = event.target.closest(".state-card");
        if (card) openState(card.getAttribute("data-code"));
      });
    }
    if (searchInput) {
      searchInput.addEventListener("input", function () {
        filterCards(searchInput.value);
      });
    }
    if (dialog) {
      dialog.addEventListener("click", function (event) {
        if (event.target === dialog) closeDialog();
        if (event.target.closest(".dialog-close")) closeDialog();
      });
      var back = dialog.querySelector("[data-dialog-back]");
      if (back) {
        back.addEventListener("click", closeDialog);
      }
    }
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && dialog && dialog.open) closeDialog();
    });
  }

  function refreshText() {
    renderCards();
    if (searchInput) filterCards(searchInput.value);
    else filterCards("");
    if (dialog && dialog.open && panelBody && panelBody.getAttribute("data-open-state")) {
      openState(panelBody.getAttribute("data-open-state"));
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    grid = document.getElementById("state-grid");
    searchInput = document.getElementById("state-search");
    noResults = document.getElementById("state-no-results");
    dialog = document.getElementById("state-dialog");
    panelBody = document.getElementById("state-dialog-body");
    bindEvents();
    refreshText();
    document.addEventListener("yd:langchange", refreshText);
  });
})();
