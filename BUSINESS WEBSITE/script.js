/* ==========================================================================
   AURA KITCHENS - INTERACTIVE SCRIPT
   Routing, Before/After Slider, Cost Estimator, Form Validation & Modals
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initRouter();
  initMobileMenu();
  initBeforeAfterSlider();
  initCostCalculator();
  initFaqAccordion();
  initForms();
  initVirtualTourModal();
});

/* --------------------------------------------------------------------------
   1. MULTI-PAGE SPA ROUTER
   -------------------------------------------------------------------------- */
function initRouter() {
  const navLinks = document.querySelectorAll('[data-page]');
  const pageViews = document.querySelectorAll('.page-view');

  function navigateTo(pageId) {
    if (!pageId) pageId = 'home';
    
    // Normalize pageId (strip # if present)
    const cleanId = pageId.replace('#', '');
    const targetPage = document.getElementById(`page-${cleanId}`);

    if (!targetPage) return;

    // Hide all pages
    pageViews.forEach(page => {
      page.classList.remove('active');
    });

    // Show target page
    targetPage.classList.add('active');

    // Update active nav links
    navLinks.forEach(link => {
      const linkPage = link.getAttribute('data-page');
      if (linkPage === cleanId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Close mobile menu if open
    const mainNav = document.getElementById('mainNav');
    if (mainNav) mainNav.classList.remove('active');

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Handle click on routing links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const pageId = link.getAttribute('data-page');
      if (pageId) {
        e.preventDefault();
        window.location.hash = pageId;
        navigateTo(pageId);
      }
    });
  });

  // Handle Hash Changes & Initial Load
  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.substring(1);
    navigateTo(hash || 'home');
  });

  // Trigger initial route
  const initialHash = window.location.hash.substring(1);
  navigateTo(initialHash || 'home');
}

/* --------------------------------------------------------------------------
   2. MOBILE MENU TOGGLE
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const mobileToggle = document.getElementById('mobileToggle');
  const mainNav = document.getElementById('mainNav');

  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', () => {
      mainNav.classList.toggle('active');
    });
  }
}

/* --------------------------------------------------------------------------
   3. BEFORE & AFTER IMAGE SLIDER
   -------------------------------------------------------------------------- */
function initBeforeAfterSlider() {
  const slider = document.getElementById('baSlider');
  const beforeImg = document.getElementById('baBefore');
  const handle = document.getElementById('baHandle');

  if (!slider || !beforeImg || !handle) return;

  let isDragging = false;

  function setSliderPosition(x) {
    const rect = slider.getBoundingClientRect();
    let offsetX = x - rect.left;
    
    // Clamp values between 0 and rect.width
    if (offsetX < 0) offsetX = 0;
    if (offsetX > rect.width) offsetX = rect.width;

    const percentage = (offsetX / rect.width) * 100;

    beforeImg.style.width = `${percentage}%`;
    handle.style.left = `${percentage}%`;
  }

  // Mouse Events
  handle.addEventListener('mousedown', (e) => {
    isDragging = true;
    e.preventDefault();
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    setSliderPosition(e.clientX);
  });

  // Touch Events for Mobile
  handle.addEventListener('touchstart', (e) => {
    isDragging = true;
  });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });

  window.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    setSliderPosition(e.touches[0].clientX);
  });
}

/* --------------------------------------------------------------------------
   4. INSTANT KITCHEN REMODEL COST CALCULATOR
   -------------------------------------------------------------------------- */
function initCostCalculator() {
  const calculator = document.getElementById('home-calculator');
  if (!calculator) return;

  const sizeInputs = document.querySelectorAll('input[name="kitchenSize"]');
  const finishSelect = document.getElementById('finishGrade');
  const optIsland = document.getElementById('optIsland');
  const optSmart = document.getElementById('optSmart');
  const optPantry = document.getElementById('optPantry');
  const optAppliances = document.getElementById('optAppliances');

  const calcPriceDisplay = document.getElementById('calcPriceDisplay');
  const bCabinetry = document.getElementById('bCabinetry');
  const bSlabs = document.getElementById('bSlabs');
  const bLabor = document.getElementById('bLabor');

  const radioCards = document.querySelectorAll('.radio-card');

  function calculateCost() {
    // Base cost by footprint size
    let selectedSize = 'small';
    sizeInputs.forEach(input => {
      if (input.checked) selectedSize = input.value;
    });

    let baseCost = 28000;
    if (selectedSize === 'medium') baseCost = 42000;
    if (selectedSize === 'large') baseCost = 65000;

    // Finish grade multiplier
    const finishGrade = finishSelect.value;
    let multiplier = 1.0;
    if (finishGrade === 'premier') multiplier = 1.35;
    if (finishGrade === 'ultra') multiplier = 1.75;

    let subtotal = baseCost * multiplier;

    // Add-on features
    let addonCost = 0;
    if (optIsland && optIsland.checked) addonCost += 7500;
    if (optSmart && optSmart.checked) addonCost += 4500;
    if (optPantry && optPantry.checked) addonCost += 6000;
    if (optAppliances && optAppliances.checked) addonCost += 14000;

    const totalEstimate = Math.round(subtotal + addonCost);
    const minRange = Math.round(totalEstimate * 0.9);
    const maxRange = Math.round(totalEstimate * 1.15);

    // Breakdown estimates
    const cabinetryVal = Math.round(totalEstimate * 0.45);
    const slabsVal = Math.round(totalEstimate * 0.30);
    const laborVal = Math.round(totalEstimate * 0.25);

    // Update DOM
    if (calcPriceDisplay) {
      calcPriceDisplay.textContent = `$${minRange.toLocaleString()} – $${maxRange.toLocaleString()}`;
    }
    if (bCabinetry) bCabinetry.textContent = `$${cabinetryVal.toLocaleString()}`;
    if (bSlabs) bSlabs.textContent = `$${slabsVal.toLocaleString()}`;
    if (bLabor) bLabor.textContent = `$${laborVal.toLocaleString()}`;
  }

  // Update active state on radio cards
  sizeInputs.forEach(input => {
    input.addEventListener('change', () => {
      radioCards.forEach(card => card.classList.remove('active'));
      input.closest('.radio-card').classList.add('active');
      calculateCost();
    });
  });

  if (finishSelect) finishSelect.addEventListener('change', calculateCost);
  [optIsland, optSmart, optPantry, optAppliances].forEach(item => {
    if (item) item.addEventListener('change', calculateCost);
  });

  // Initial calculation
  calculateCost();
}

/* --------------------------------------------------------------------------
   5. FAQ ACCORDION
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all accordion items
        faqItems.forEach(el => el.classList.remove('active'));
        
        // Toggle current item if not active
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });
}

/* --------------------------------------------------------------------------
   6. FORMS & CONSULTATION BOOKING
   -------------------------------------------------------------------------- */
function initForms() {
  const consultationForm = document.getElementById('consultationForm');
  const newsletterForm = document.getElementById('newsletterForm');

  if (consultationForm) {
    consultationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('fullName').value;
      const email = document.getElementById('emailAddress').value;

      showToast(`Thank you ${name}! Your consultation request has been submitted.`);
      
      showModal(`
        <div style="text-align: center;">
          <div style="font-size: 3rem; margin-bottom: 10px;">✨</div>
          <h2 style="margin-bottom: 12px; color: var(--primary-copper);">Consultation Request Received</h2>
          <p style="color: var(--text-muted); margin-bottom: 20px;">We have sent a confirmation email to <strong>${email}</strong>. One of our lead architects will contact you within 24 hours to finalize your appointment date.</p>
          <button class="btn btn-primary" onclick="closeModal()">Great, Thank You</button>
        </div>
      `);

      consultationForm.reset();
    });
  }

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Thank you for subscribing to Aura Kitchens Design Trends!');
      newsletterForm.reset();
    });
  }
}

/* --------------------------------------------------------------------------
   7. MODAL & TOAST NOTIFICATION HELPERS
   -------------------------------------------------------------------------- */
function initVirtualTourModal() {
  const tourBtn = document.getElementById('virtualTourBtn');
  if (tourBtn) {
    tourBtn.addEventListener('click', () => {
      showModal(`
        <div style="text-align: center;">
          <h2 style="margin-bottom: 14px;">3D Virtual Showroom Tour</h2>
          <p style="color: var(--text-muted); margin-bottom: 20px;">Explore our 4,500 sq.ft Flagship Studio interactively in photorealistic 3D environment.</p>
          <div style="border-radius: 12px; overflow: hidden; height: 260px; margin-bottom: 20px; border: 1px solid var(--glass-border);">
            <img src="assets/hero.png" style="width:100%; height:100%; object-fit:cover;" alt="Showroom 3D">
          </div>
          <button class="btn btn-primary" onclick="closeModal()">Close Tour</button>
        </div>
      `);
    });
  }

  const modalClose = document.getElementById('modalClose');
  const globalModal = document.getElementById('globalModal');
  if (modalClose && globalModal) {
    modalClose.addEventListener('click', closeModal);
    globalModal.addEventListener('click', (e) => {
      if (e.target === globalModal) closeModal();
    });
  }
}

function showModal(htmlContent) {
  const modalBody = document.getElementById('modalBody');
  const globalModal = document.getElementById('globalModal');
  if (modalBody && globalModal) {
    modalBody.innerHTML = htmlContent;
    globalModal.classList.add('active');
  }
}

function closeModal() {
  const globalModal = document.getElementById('globalModal');
  if (globalModal) {
    globalModal.classList.remove('active');
  }
}

function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>❖</span> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}
