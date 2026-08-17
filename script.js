/* ==========================================================================
   PULSE MOBILE REPAIR & TECH LABS - INTERACTIVE LOGIC & ROUTER
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  // --- 1. SINGLE-PAGE SPA HASH ROUTER ---
  const views = document.querySelectorAll('.page-view');
  const navLinks = document.querySelectorAll('[data-page]');
  const mainHeader = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobileToggle');
  const mainNav = document.getElementById('mainNav');

  function navigateTo(pageId) {
    let targetId = pageId.replace('#', '') || 'home';
    const targetSection = document.getElementById(`page-${targetId}`);

    if (!targetSection) {
      targetId = 'home';
    }

    views.forEach(view => {
      view.classList.remove('active');
    });

    const activeView = document.getElementById(`page-${targetId}`);
    if (activeView) {
      activeView.classList.add('active');
    }

    navLinks.forEach(link => {
      const pageAttr = link.getAttribute('data-page');
      if (pageAttr === targetId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Close mobile nav menu if open
    if (mainNav) {
      mainNav.classList.remove('active');
    }

    // Scroll to top of view
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Handle Hash Changes
  window.addEventListener('hashchange', () => {
    navigateTo(window.location.hash);
  });

  // Initial Load Navigation (Always run on page load, defaulting to 'home')
  navigateTo(window.location.hash || 'home');

  // Click Delegations for data-page links
  document.querySelectorAll('a[data-page]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetPage = link.getAttribute('data-page');
      if (window.location.hash !== `#${targetPage}`) {
        window.location.hash = targetPage;
      }
      // navigateTo is handled by the hashchange event listener above
    });
  });

  // Mobile Menu Toggle
  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', () => {
      mainNav.classList.toggle('active');
    });
  }

  // Header Scroll Shadow
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      mainHeader.classList.add('scrolled');
    } else {
      mainHeader.classList.remove('scrolled');
    }
  });


  // --- 2. LIVE REPAIR STATUS TRACKER LOGIC ---
  const trackerForm = document.getElementById('trackerForm');
  const trackerInput = document.getElementById('trackerTicketInput');
  const trackerResult = document.getElementById('trackerResult');
  const trackTicketCode = document.getElementById('trackTicketCode');
  const trackDevice = document.getElementById('trackDevice');
  const trackBadge = document.getElementById('trackBadge');

  const demoTickets = {
    'PULSE-8942': { device: 'iPhone 15 Pro', status: 'In Repair', step: 3, badgeClass: 'in-progress' },
    'PULSE-1024': { device: 'Galaxy S24 Ultra', status: 'Ready for Pickup', step: 5, badgeClass: 'ready' },
    'PULSE-7731': { device: 'Google Pixel 8', status: 'Diagnosed', step: 2, badgeClass: 'in-progress' }
  };

  if (trackerForm) {
    trackerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const code = trackerInput.value.trim().toUpperCase();
      if (!code) return;

      const ticketData = demoTickets[code] || {
        device: 'Smartphone Device',
        status: 'In Diagnostic Check',
        step: 2,
        badgeClass: 'in-progress'
      };

      trackTicketCode.textContent = code;
      trackDevice.textContent = ticketData.device;
      trackBadge.textContent = ticketData.status;

      // Update Pipeline Steps
      for (let i = 1; i <= 5; i++) {
        const stepEl = document.getElementById(`step-${i}`);
        if (!stepEl) continue;
        stepEl.classList.remove('completed', 'active');
        if (i < ticketData.step) {
          stepEl.classList.add('completed');
        } else if (i === ticketData.step) {
          stepEl.classList.add('active');
        }
      }

      trackerResult.classList.add('active');
    });
  }


  // --- 3. SERVICES CATALOG BRAND FILTER TABS ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const catalogItems = document.querySelectorAll('.catalog-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      catalogItems.forEach(item => {
        const itemBrand = item.getAttribute('data-brand');
        if (filter === 'all' || itemBrand === filter) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });


  // --- 4. INSTANT REPAIR COST ESTIMATOR LOGIC ---
  const brandCards = document.querySelectorAll('#estimatorBrandGrid .brand-option-card');
  const modelSelect = document.getElementById('estimatorModelSelect');
  const issueCheckboxes = document.querySelectorAll('.issues-checkbox-grid input[type="checkbox"]');
  const fulfillmentSelect = document.getElementById('estimatorFulfillment');

  const sumDevice = document.getElementById('sumDevice');
  const sumRepairs = document.getElementById('sumRepairs');
  const sumTime = document.getElementById('sumTime');
  const sumTotalCost = document.getElementById('sumTotalCost');
  const btnBookFromEstimator = document.getElementById('btnBookFromEstimator');

  const deviceModelsByBrand = {
    apple: ['iPhone 15 Pro Max', 'iPhone 15 Pro', 'iPhone 15 / 15 Plus', 'iPhone 14 Pro Max', 'iPhone 14 / 14 Pro', 'iPhone 13 / 13 Mini'],
    samsung: ['Galaxy S24 Ultra', 'Galaxy S24 / S24+', 'Galaxy S23 Ultra', 'Galaxy Z Fold 5', 'Galaxy Z Flip 5'],
    google: ['Google Pixel 8 Pro', 'Google Pixel 8', 'Google Pixel 7 Pro', 'Google Pixel 7a'],
    ipad: ['iPad Pro 12.9 inch', 'iPad Air 5th Gen', 'iPad Mini 6th Gen', 'iPad 10th Gen']
  };

  let selectedBrand = 'apple';

  function populateModels(brand) {
    if (!modelSelect) return;
    modelSelect.innerHTML = '';
    const models = deviceModelsByBrand[brand] || deviceModelsByBrand.apple;
    models.forEach(model => {
      const opt = document.createElement('option');
      opt.value = model;
      opt.textContent = model;
      modelSelect.appendChild(opt);
    });
  }

  function calculateQuote() {
    if (!modelSelect || !sumTotalCost) return;

    let subtotal = 0;
    let selectedIssueCount = 0;

    issueCheckboxes.forEach(cb => {
      if (cb.checked) {
        subtotal += parseFloat(cb.getAttribute('data-price') || 0);
        selectedIssueCount++;
      }
    });

    const selectedOpt = fulfillmentSelect && fulfillmentSelect.selectedIndex >= 0 ? fulfillmentSelect.options[fulfillmentSelect.selectedIndex] : null;
    const rawFee = selectedOpt ? selectedOpt.getAttribute('data-fee') : 0;
    const fulfillmentFee = parseFloat(rawFee) || 0;
    const grandTotal = subtotal + fulfillmentFee;

    const currentModel = modelSelect.value || 'Smartphone';

    sumDevice.textContent = currentModel;
    sumRepairs.textContent = `${selectedIssueCount} Service${selectedIssueCount === 1 ? '' : 's'}`;
    sumTime.textContent = selectedIssueCount > 2 ? '45-60 Mins' : '20-30 Mins';
    sumTotalCost.textContent = `$${grandTotal.toFixed(2)}`;
  }

  // Brand selection listeners
  brandCards.forEach(card => {
    card.addEventListener('click', () => {
      brandCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      selectedBrand = card.getAttribute('data-brand');
      populateModels(selectedBrand);
      calculateQuote();
    });
  });

  // Model & Checkbox listeners
  if (modelSelect) {
    modelSelect.addEventListener('change', calculateQuote);
  }
  issueCheckboxes.forEach(cb => {
    cb.addEventListener('change', calculateQuote);
  });
  if (fulfillmentSelect) {
    fulfillmentSelect.addEventListener('change', calculateQuote);
  }

  // Initialize estimator defaults
  populateModels('apple');
  calculateQuote();

  // Estimator to Booking Bridge Button
  if (btnBookFromEstimator) {
    btnBookFromEstimator.addEventListener('click', () => {
      const bookDeviceInput = document.getElementById('bookDeviceModel');
      const bookNotesInput = document.getElementById('bookNotes');

      if (bookDeviceInput && modelSelect) {
        bookDeviceInput.value = modelSelect.value;
      }
      if (bookNotesInput && sumTotalCost) {
        bookNotesInput.value = `Estimated Quote: ${sumTotalCost.textContent} (${sumRepairs.textContent}).`;
      }

      window.location.hash = 'contact';
    });
  }


  // --- 5. BOOKING FORM & MODAL SUBMISSION ---
  const bookingForm = document.getElementById('bookingForm');
  const bookingModal = document.getElementById('bookingModal');
  const btnModalClose = document.getElementById('btnModalClose');

  const modalTicketCode = document.getElementById('modalTicketCode');
  const modalCustName = document.getElementById('modalCustName');
  const modalCustDevice = document.getElementById('modalCustDevice');
  const modalCustSlot = document.getElementById('modalCustSlot');
  const modalCustType = document.getElementById('modalCustType');

  // Pre-set Date picker to tomorrow
  const bookDate = document.getElementById('bookDate');
  if (bookDate) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    bookDate.value = tomorrow.toISOString().split('T')[0];
  }

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('bookName').value;
      const device = document.getElementById('bookDeviceModel').value;
      const date = document.getElementById('bookDate').value;
      const time = document.getElementById('bookTime').value;
      const serviceType = document.getElementById('bookServiceType').value;

      // Generate Ticket Code
      const ticketNum = 'PULSE-' + Math.floor(10000 + Math.random() * 90000);

      modalTicketCode.textContent = ticketNum;
      modalCustName.textContent = name;
      modalCustDevice.textContent = device;
      modalCustSlot.textContent = `${date} @ ${time}`;
      modalCustType.textContent = serviceType;

      bookingModal.classList.add('active');
    });
  }

  if (btnModalClose && bookingModal) {
    btnModalClose.addEventListener('click', () => {
      bookingModal.classList.remove('active');
      if (bookingForm) bookingForm.reset();
      window.location.hash = 'home';
    });
  }


  // --- 6. FAQ ACCORDIONS ---
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(btn => {
    btn.addEventListener('click', () => {
      const faqItem = btn.parentElement;
      const isOpen = faqItem.classList.contains('active');

      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
        const ans = item.querySelector('.faq-answer');
        if (ans) ans.style.maxHeight = null;
      });

      if (!isOpen) {
        faqItem.classList.add('active');
        const ans = faqItem.querySelector('.faq-answer');
        if (ans) ans.style.maxHeight = ans.scrollHeight + 'px';
      }
    });
  });

});
