// Interactive scripts for MD MAHADI HASAN - FDE Landing Page

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Navigation
  const navToggle = document.getElementById('navToggle');
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-links a');

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navbar.classList.toggle('mobile-menu-active');
      const icon = navToggle.querySelector('i');
      if (icon) {
        if (navbar.classList.contains('mobile-menu-active')) {
          icon.className = 'fa-solid fa-xmark';
        } else {
          icon.className = 'fa-solid fa-bars';
        }
      }
    });
  }

  // Close mobile nav on click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navbar.classList.contains('mobile-menu-active')) {
        navbar.classList.remove('mobile-menu-active');
        const icon = navToggle.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars';
      }
    });
  });

  // 2. Active Navigation link on scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const targetNav = document.querySelector(`.nav-links a[href*="${sectionId}"]`);
      if (targetNav) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          targetNav.classList.add('active');
        } else {
          targetNav.classList.remove('active');
        }
      }
    });
  });

  // 3. Interactive CRM Pipeline Simulation
  const pipelinePresets = {
    enrichment: {
      leadName: "FinTech Enterprise Corp",
      crmTarget: "Salesforce Enterprise",
      action: "Autonomous AI Enrichment & Scoring",
      logs: [
        { level: "info", text: "Webhook received from web inbound endpoint: /v1/lead/ingest" },
        { level: "info", text: "FDE Pipeline initialized: Extracting domain [fintechenterprise.com]" },
        { level: "info", text: "Querying AI enrichment engine (Gemini Function Calling API)..." },
        { level: "success", text: "Company validated: 450+ employees, Series B, $42M ARR" },
        { level: "success", text: "AI Match Score: 94/100 (Tier 1 Strategic ICP)" },
        { level: "info", text: "Pushing bidirectional sync to Salesforce Lead #SF-99241" },
        { level: "success", text: "Assigned to Enterprise AE team + Slack notification dispatched [240ms]" }
      ]
    },
    routing: {
      leadName: "HyperScale Logistics Ltd",
      crmTarget: "HubSpot Enterprise",
      action: "Multi-Region Lead Routing & Account Matching",
      logs: [
        { level: "info", text: "Inbound webhook triggered from HubSpot form submit #HS-8812" },
        { level: "info", text: "Resolving parent account hierarchy via Graph database" },
        { level: "info", text: "AI Agent checking rep capacity, timezone & territory rules..." },
        { level: "success", text: "Territory: EMEA-North | Available Senior Rep: Sarah Jensen" },
        { level: "success", text: "Auto-generating tailored AI pre-call briefing doc..." },
        { level: "success", text: "Calendar invite and deal record updated seamlessly in HubSpot [185ms]" }
      ]
    },
    sync: {
      leadName: "Global Retail Systems",
      crmTarget: "Zoho CRM & PostgreSQL Data Warehouse",
      action: "Zero-Data-Loss Two-Way Sync & Conflict Resolution",
      logs: [
        { level: "info", text: "Change Data Capture (CDC) event detected in custom Postgres DB" },
        { level: "info", text: "Comparing vector timestamps across 4,200 modified records..." },
        { level: "warn", text: "Conflict identified on Customer #GRS-104 (concurrent edits)" },
        { level: "info", text: "FDE automated heuristic applied: Last-Writer + Field-level merge" },
        { level: "success", text: "Zoho CRM updated with validated customer state" },
        { level: "success", text: "Telemetry metrics streamed to Grafana dashboard. Zero loss verified." }
      ]
    }
  };

  const demoTabBtns = document.querySelectorAll('.demo-tab-btn');
  const demoLeadInput = document.getElementById('demoLeadInput');
  const demoCrmSelect = document.getElementById('demoCrmSelect');
  const demoRunBtn = document.getElementById('demoRunBtn');
  const demoLogDisplay = document.getElementById('demoLogDisplay');

  let currentPresetKey = 'enrichment';

  function renderLogs(logs) {
    if (!demoLogDisplay) return;
    demoLogDisplay.innerHTML = '';
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];

    logs.forEach((log, index) => {
      setTimeout(() => {
        const entry = document.createElement('div');
        entry.className = 'log-entry';
        
        let levelClass = 'log-info';
        if (log.level === 'success') levelClass = 'log-success';
        if (log.level === 'warn') levelClass = 'log-warn';

        entry.innerHTML = `<span class="log-ts">[${timeStr}.${index * 45}]</span> <span class="${levelClass}">● ${log.text}</span>`;
        demoLogDisplay.appendChild(entry);
        demoLogDisplay.scrollTop = demoLogDisplay.scrollHeight;
      }, index * 220);
    });
  }

  function applyPreset(key) {
    currentPresetKey = key;
    const preset = pipelinePresets[key];
    if (!preset) return;

    if (demoLeadInput) demoLeadInput.value = preset.leadName;
    if (demoCrmSelect) demoCrmSelect.value = preset.crmTarget;

    renderLogs(preset.logs);
  }

  demoTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      demoTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const presetKey = btn.getAttribute('data-tab');
      applyPreset(presetKey);
    });
  });

  if (demoRunBtn) {
    demoRunBtn.addEventListener('click', () => {
      const customName = demoLeadInput ? demoLeadInput.value : "Dynamic Lead";
      const customCrm = demoCrmSelect ? demoCrmSelect.value : "Salesforce";
      
      const customLogs = [
        { level: "info", text: `Triggering custom simulation for [${customName}]` },
        { level: "info", text: `Target CRM destination: ${customCrm}` },
        { level: "info", text: "Running AI Agent validation and field schema sanitation..." },
        { level: "success", text: `Payload authenticated against ${customCrm} v58.0 API specifications` },
        { level: "success", text: "Zero errors detected. Workflow completed in 142ms." }
      ];
      renderLogs(customLogs);
    });
  }

  // Initialize demo logs
  if (demoLogDisplay) {
    applyPreset('enrichment');
  }

  // 4. Interactive ROI Calculator
  const teamSizeSlider = document.getElementById('teamSizeSlider');
  const teamSizeVal = document.getElementById('teamSizeVal');
  const manualHoursSlider = document.getElementById('manualHoursSlider');
  const manualHoursVal = document.getElementById('manualHoursVal');
  const hourlyRateSlider = document.getElementById('hourlyRateSlider');
  const hourlyRateVal = document.getElementById('hourlyRateVal');

  const annualSavingsResult = document.getElementById('annualSavingsResult');
  const hoursSavedResult = document.getElementById('hoursSavedResult');
  const efficiencyGainResult = document.getElementById('efficiencyGainResult');

  function calculateROI() {
    if (!teamSizeSlider || !manualHoursSlider || !hourlyRateSlider) return;

    const teamSize = parseInt(teamSizeSlider.value, 10);
    const hoursPerWeek = parseFloat(manualHoursSlider.value);
    const hourlyRate = parseInt(hourlyRateSlider.value, 10);

    // Update labels
    if (teamSizeVal) teamSizeVal.textContent = teamSize;
    if (manualHoursVal) manualHoursVal.textContent = `${hoursPerWeek} hrs`;
    if (hourlyRateVal) hourlyRateVal.textContent = `$${hourlyRate}/hr`;

    // Calculations:
    // With AI-driven CRM automation by an FDE, typically ~75% of manual CRM data entry/triage is eliminated.
    const weeklyHoursSaved = teamSize * hoursPerWeek * 0.75;
    const annualHoursSaved = Math.round(weeklyHoursSaved * 50); // 50 work weeks
    const annualDollarSavings = Math.round(annualHoursSaved * hourlyRate);

    // Update displays
    if (annualSavingsResult) {
      annualSavingsResult.textContent = `$${annualDollarSavings.toLocaleString()}`;
    }
    if (hoursSavedResult) {
      hoursSavedResult.textContent = `${annualHoursSaved.toLocaleString()} hrs/yr`;
    }
    if (efficiencyGainResult) {
      efficiencyGainResult.textContent = "75% Automatable";
    }
  }

  if (teamSizeSlider && manualHoursSlider && hourlyRateSlider) {
    teamSizeSlider.addEventListener('input', calculateROI);
    manualHoursSlider.addEventListener('input', calculateROI);
    hourlyRateSlider.addEventListener('input', calculateROI);
    calculateROI();
  }

  // 5. Contact Consultation Form Submission Simulation
  const contactForm = document.getElementById('discoveryForm');
  const formFeedback = document.getElementById('formFeedback');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Submitting Request...`;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        if (formFeedback) {
          formFeedback.className = 'form-feedback success';
          formFeedback.innerHTML = `<strong>Inquiry Received!</strong> MD MAHADI HASAN will review your CRM architecture needs and reply within 12 hours.`;
          contactForm.reset();
        }
      }, 900);
    });
  }

  // 6. Dynamic Year in Footer
  const yearSpan = document.getElementById('currentYear');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
