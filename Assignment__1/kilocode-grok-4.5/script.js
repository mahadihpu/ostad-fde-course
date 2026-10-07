document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("siteHeader");
  const menuBtn = document.getElementById("menuBtn");
  const primaryNav = document.getElementById("primaryNav");
  const toTop = document.getElementById("toTop");
  const yearEl = document.getElementById("year");

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  const onScroll = () => {
    const y = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle("scrolled", y > 12);
    if (toTop) toTop.classList.toggle("show", y > 480);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (menuBtn && primaryNav) {
    menuBtn.addEventListener("click", () => {
      const open = primaryNav.classList.toggle("open");
      menuBtn.classList.toggle("open", open);
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
      menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });

    primaryNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        primaryNav.classList.remove("open");
        menuBtn.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.setAttribute("aria-label", "Open menu");
      });
    });
  }

  if (toTop) {
    toTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".primary-nav a");

  const setActiveNav = () => {
    const y = window.scrollY || window.pageYOffset;
    sections.forEach((section) => {
      const top = section.offsetTop - 140;
      const bottom = top + section.offsetHeight;
      const id = section.getAttribute("id");
      const link = document.querySelector(`.primary-nav a[href="#${id}"]`);
      if (!link) return;
      if (y >= top && y < bottom) link.classList.add("active");
      else link.classList.remove("active");
    });
  };
  window.addEventListener("scroll", setActiveNav, { passive: true });
  setActiveNav();

  const scenarios = {
    enrich: {
      lead: "Northwind Analytics Inc.",
      crm: "Salesforce",
      logs: [
        { level: "info", text: "Inbound webhook accepted · /v1/leads/ingest" },
        { level: "info", text: "Domain resolved: northwindanalytics.com" },
        { level: "info", text: "AI enrichment agent scoring firmographics…" },
        { level: "ok", text: "ICP match 96% · Series B · 220 employees" },
        { level: "ok", text: "Fields mapped to Salesforce Lead SF-44821" },
        { level: "ok", text: "AE notified on Slack · pipeline complete (168ms)" },
      ],
    },
    route: {
      lead: "Cascade Logistics Group",
      crm: "HubSpot",
      logs: [
        { level: "info", text: "Form submit HS-9021 received from marketing site" },
        { level: "info", text: "Territory rules + rep capacity graph loading…" },
        { level: "ok", text: "Region: APAC · Owner: Priya N. (capacity OK)" },
        { level: "info", text: "Generating AI pre-call brief from CRM history" },
        { level: "ok", text: "Deal stage updated · calendar hold created (201ms)" },
      ],
    },
    sync: {
      lead: "Harbor Retail Systems",
      crm: "Zoho CRM",
      logs: [
        { level: "info", text: "CDC event from product Postgres · customer#HRS-771" },
        { level: "warn", text: "Concurrent edit conflict on billing_email" },
        { level: "info", text: "Field-level merge policy applied (source of truth: billing)" },
        { level: "ok", text: "Zoho CRM + warehouse reconciled · 0 lost fields" },
        { level: "ok", text: "Telemetry flushed to OpenTelemetry · healthy" },
      ],
    },
  };

  const leadInput = document.getElementById("leadInput");
  const crmSelect = document.getElementById("crmSelect");
  const logView = document.getElementById("logView");
  const runPipeline = document.getElementById("runPipeline");
  const tabs = document.querySelectorAll(".tab");
  let activeScenario = "enrich";
  let logTimerIds = [];

  const clearLogTimers = () => {
    logTimerIds.forEach((id) => clearTimeout(id));
    logTimerIds = [];
  };

  const writeLogs = (entries) => {
    if (!logView) return;
    clearLogTimers();
    logView.innerHTML = "";
    const stamp = new Date().toTimeString().slice(0, 8);

    entries.forEach((entry, index) => {
      const id = setTimeout(() => {
        const row = document.createElement("div");
        row.className = `log-line ${entry.level}`;
        row.innerHTML = `<span class="ts">[${stamp}.${String(index * 37).padStart(3, "0")}]</span>${entry.text}`;
        logView.appendChild(row);
        logView.scrollTop = logView.scrollHeight;
      }, index * 200);
      logTimerIds.push(id);
    });
  };

  const applyScenario = (key) => {
    activeScenario = key;
    const data = scenarios[key];
    if (!data) return;
    if (leadInput) leadInput.value = data.lead;
    if (crmSelect) {
      const opt = [...crmSelect.options].find((o) => o.value === data.crm);
      if (opt) crmSelect.value = data.crm;
    }
    writeLogs(data.logs);
  };

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");
      applyScenario(tab.dataset.scenario || "enrich");
    });
  });

  if (runPipeline) {
    runPipeline.addEventListener("click", () => {
      const lead = leadInput ? leadInput.value.trim() || "Custom Account" : "Custom Account";
      const crm = crmSelect ? crmSelect.value : "Salesforce";
      writeLogs([
        { level: "info", text: `Custom run started for [${lead}]` },
        { level: "info", text: `Target CRM: ${crm}` },
        { level: "info", text: "Validating payload schema & auth scopes…" },
        { level: "ok", text: `Authenticated against ${crm} API` },
        { level: "ok", text: "Automation finished · 0 errors · 154ms" },
      ]);
    });
  }

  applyScenario(activeScenario);

  const teamRange = document.getElementById("teamRange");
  const hoursRange = document.getElementById("hoursRange");
  const rateRange = document.getElementById("rateRange");
  const teamLabel = document.getElementById("teamLabel");
  const hoursLabel = document.getElementById("hoursLabel");
  const rateLabel = document.getElementById("rateLabel");
  const savingsOut = document.getElementById("savingsOut");
  const hoursOut = document.getElementById("hoursOut");
  const autoOut = document.getElementById("autoOut");
  const AUTO_RATE = 0.75;

  const calcRoi = () => {
    if (!teamRange || !hoursRange || !rateRange) return;
    const team = Number(teamRange.value);
    const hours = Number(hoursRange.value);
    const rate = Number(rateRange.value);

    if (teamLabel) teamLabel.textContent = String(team);
    if (hoursLabel) hoursLabel.textContent = `${hours} hrs`;
    if (rateLabel) rateLabel.textContent = `$${rate}/hr`;

    const annualHours = Math.round(team * hours * AUTO_RATE * 50);
    const annualSavings = Math.round(annualHours * rate);

    if (hoursOut) hoursOut.textContent = `${annualHours.toLocaleString()} hrs/yr`;
    if (savingsOut) savingsOut.textContent = `$${annualSavings.toLocaleString()}`;
    if (autoOut) autoOut.textContent = "75%";
  };

  [teamRange, hoursRange, rateRange].forEach((el) => {
    if (el) el.addEventListener("input", calcRoi);
  });
  calcRoi();

  const contactForm = document.getElementById("contactForm");
  const formMsg = document.getElementById("formMsg");
  const submitBtn = document.getElementById("submitBtn");

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const name = document.getElementById("name");
      const email = document.getElementById("email");
      const crm = document.getElementById("crm");
      const details = document.getElementById("details");

      const valid =
        name &&
        email &&
        crm &&
        details &&
        name.value.trim() &&
        email.value.trim() &&
        crm.value &&
        details.value.trim() &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());

      if (!valid) {
        if (formMsg) {
          formMsg.hidden = false;
          formMsg.className = "form-msg error";
          formMsg.textContent = "Please complete all required fields with a valid work email.";
        }
        return;
      }

      const original = submitBtn ? submitBtn.innerHTML : "";
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending…';
      }

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = original;
        }
        if (formMsg) {
          formMsg.hidden = false;
          formMsg.className = "form-msg success";
          formMsg.innerHTML =
            "<strong>Request received.</strong> MD MAHADI HASAN will review your CRM needs and respond within 12 hours.";
        }
        contactForm.reset();
      }, 850);
    });
  }

  const revealTargets = document.querySelectorAll(
    ".card, .process-track li, .stack-card, .profile, .playground, .roi-box, .contact-aside, .contact-form"
  );

  if ("IntersectionObserver" in window) {
    revealTargets.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(18px)";
      el.style.transition = "opacity 0.55s var(--ease), transform 0.55s var(--ease)";
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealTargets.forEach((el) => io.observe(el));
  }
});
