/**
 * مقهى دكة الحجاز - DAKAT AL HIJAZ COFFEE
 * Interactive Client-Side Engine (Demo Grade 10/10)
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollEffects();
  initLiveWorkingHours();
  initViewsStage();
  initMenuFilters();
  initReservationModal();
  initApplePayDemo();
  initLightbox();
  initMobileDrawer();
  initScrollSpy();
});

/* --------------------------------------------------------------------------
   1. Scroll Effects & Header Shrink
   -------------------------------------------------------------------------- */
function initScrollEffects() {
  const header = document.getElementById('siteHeader');
  const progressBar = document.getElementById('scrollProgress');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    // Header background blur on scroll
    if (header) {
      header.classList.toggle('scrolled', scrollY > 40);
    }

    // Top reading progress indicator
    if (progressBar && docHeight > 0) {
      const progressPercent = (scrollY / docHeight);
      progressBar.style.transform = `scaleX(${progressPercent})`;
    }
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   2. Live Working Hours Calculator (Saudi Time AST UTC+3)
   -------------------------------------------------------------------------- */
function initLiveWorkingHours() {
  const liveStatusText = document.getElementById('liveStatusText');
  const heroStatusText = document.getElementById('heroStatusText');
  const heroStatusPill = document.getElementById('heroStatusPill');
  const liveHeadline = document.getElementById('liveHeadline');
  const liveSubline = document.getElementById('liveSubline');
  const liveDot = document.getElementById('liveDot');
  const footerStatusText = document.getElementById('footerStatusText');
  const rowJeddah = document.getElementById('rowJeddah');
  const rowNamas = document.getElementById('rowNamas');

  function calculateStatus() {
    // Current time converted to Saudi Arabia timezone (UTC+3)
    const now = new Date();
    const saudiTimeStr = now.toLocaleString('en-US', { timeZone: 'Asia/Riyadh' });
    const saudiDate = new Date(saudiTimeStr);

    const hours = saudiDate.getHours();
    const minutes = saudiDate.getMinutes();
    const totalMinutes = (hours * 60) + minutes;

    // فرع جدة يعمل يومياً من 9 صباحاً حتى 12 منتصف الليل.
    const isOpen = totalMinutes >= 540;
    const nextEvent = isOpen
      ? 'يغلق فرع جدة عند الساعة 12:00 منتصف الليل'
      : 'يفتح فرع جدة اليوم الساعة 9:00 صباحاً';

    if (rowJeddah) rowJeddah.style.background = 'rgba(212, 163, 89, 0.12)';
    if (rowNamas) rowNamas.style.background = 'rgba(255, 255, 255, 0.025)';

    const statusTitle = isOpen ? 'مفتوح الآن نرحب بزيارتكم' : 'المقهى مغلق حالياً';
    const statusSub = isOpen ? `نسعد باستقبالكم في فرع جدة · ${nextEvent}` : nextEvent;

    if (liveStatusText) {
      liveStatusText.textContent = `${statusTitle} · ${nextEvent}`;
    }

    if (heroStatusText) {
      heroStatusText.textContent = `${statusTitle} ☕`;
    }

    if (heroStatusPill) {
      const dot = heroStatusPill.querySelector('.status-dot');
      if (dot) {
        dot.style.background = isOpen ? '#2ecc71' : '#e67e22';
        dot.style.boxShadow = isOpen ? '0 0 8px #2ecc71' : '0 0 8px #e67e22';
      }
    }

    if (liveHeadline) liveHeadline.textContent = statusTitle;
    if (liveSubline) liveSubline.textContent = statusSub;

    if (liveDot) {
      liveDot.classList.toggle('closed', !isOpen);
    }

    if (footerStatusText) {
      footerStatusText.textContent = isOpen ? 'فرع جدة مفتوح الآن — نرحب بكم' : nextEvent;
    }
  }

  calculateStatus();
  // Refresh status every minute
  setInterval(calculateStatus, 60000);
}

/* --------------------------------------------------------------------------
   3. Views & Ambience Showcase Interactive Stage
   -------------------------------------------------------------------------- */
function initViewsStage() {
  const viewCards = document.querySelectorAll('.view-card');
  const stageMainImage = document.getElementById('stageMainImage');
  const stageTitle = document.getElementById('stageTitle');
  const stageDesc = document.getElementById('stageDesc');
  const stageBadge = document.getElementById('stageBadge');
  const stageZoomBtn = document.getElementById('stageZoomBtn');
  const stageBookSeatBtn = document.getElementById('stageBookSeatBtn');
  const reservationModal = document.getElementById('reservationModal');
  const seatingPref = document.getElementById('seatingPref');

  let currentImgUrl = 'assets/images/seating-heritage-view.jpg';
  let currentCaption = 'إطلالة الرواشين على زقاق سوق العلوي';

  viewCards.forEach(card => {
    card.addEventListener('click', () => {
      viewCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      const imgUrl = card.getAttribute('data-img');
      const title = card.getAttribute('data-title');
      const desc = card.getAttribute('data-desc');
      const badge = card.getAttribute('data-badge');

      currentImgUrl = imgUrl;
      currentCaption = title;

      if (stageMainImage) {
        stageMainImage.style.opacity = '0';
        stageMainImage.style.transform = 'scale(0.98)';
        setTimeout(() => {
          stageMainImage.src = imgUrl;
          stageMainImage.alt = title;
          stageMainImage.style.opacity = '1';
          stageMainImage.style.transform = 'scale(1)';
        }, 180);
      }

      if (stageTitle) stageTitle.textContent = title;
      if (stageDesc) stageDesc.textContent = desc;
      if (stageBadge) stageBadge.textContent = badge;
    });
  });

  if (stageZoomBtn) {
    stageZoomBtn.addEventListener('click', () => {
      const lightbox = document.getElementById('lightboxModal');
      const lightboxImg = document.getElementById('lightboxImg');
      const lightboxCaption = document.getElementById('lightboxCaption');
      if (lightbox && lightboxImg) {
        lightboxImg.src = currentImgUrl;
        if (lightboxCaption) lightboxCaption.textContent = currentCaption;
        lightbox.classList.add('open');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      }
    });
  }

  if (stageBookSeatBtn) {
    stageBookSeatBtn.addEventListener('click', () => {
      if (reservationModal) {
        if (seatingPref) {
          seatingPref.value = 'جلسة بجوار نافذة الرواشين (المطلة على الزقاق)';
        }
        reservationModal.classList.add('open');
        reservationModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      }
    });
  }
}

/* --------------------------------------------------------------------------
   4. Interactive Filterable Digital Menu
   -------------------------------------------------------------------------- */
function initMenuFilters() {
  const filterTabs = document.querySelectorAll('.filter-tab');
  const menuCards = document.querySelectorAll('.menu-card');

  function applyCategoryFilter(targetCategory) {
    menuCards.forEach(card => {
      const cardCategoryStr = card.getAttribute('data-category') || '';
      const cardCategories = cardCategoryStr.split(' ');
      
      if (targetCategory === 'all' || cardCategories.includes(targetCategory)) {
        card.style.display = 'flex';
        card.style.animation = 'fadeIn 0.35s ease';
      } else {
        card.style.display = 'none';
      }
    });
  }

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetCategory = tab.getAttribute('data-category');

      // Update active tab button
      filterTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      applyCategoryFilter(targetCategory);
    });
  });

  // Apply default active tab on load (Our Real Products first!)
  const activeTab = document.querySelector('.filter-tab.active');
  if (activeTab) {
    applyCategoryFilter(activeTab.getAttribute('data-category'));
  }
}

/* --------------------------------------------------------------------------
   4. Table Reservation Modal & WhatsApp Message Generator
   -------------------------------------------------------------------------- */
function initReservationModal() {
  const modal = document.getElementById('reservationModal');
  const openBtns = [
    document.getElementById('openReservationBtn'),
    document.getElementById('heroBookBtn'),
    document.getElementById('mobileReserveBtn'),
    document.getElementById('mobileBarReserveBtn'),
    document.getElementById('finalBookBtn'),
    document.getElementById('footerBookBtn')
  ];
  const closeBtn = document.getElementById('modalCloseBtn');
  const form = document.getElementById('reservationForm');
  const dateInput = document.getElementById('reserveDate');
  const timeInput = document.getElementById('reserveTime');

  // Pre-fill today's date & sensible default time
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.value = today;
    dateInput.min = today;
  }
  if (timeInput) {
    timeInput.value = '19:30'; // 7:30 PM default
  }

  function openModal() {
    if (modal) {
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal() {
    if (modal) {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  openBtns.forEach(btn => {
    if (btn) btn.addEventListener('click', openModal);
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  // Close on outside click
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  // Close on ESC key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
      closeModal();
    }
  });

  // Handle Form Submission -> WhatsApp
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('guestName')?.value || 'ضيف كريم';
      const phone = document.getElementById('guestPhone')?.value || '';
      const count = document.getElementById('guestCount')?.value || 'شخصين';
      const seating = document.getElementById('seatingPref')?.value || 'جلسة خارجية';
      const date = document.getElementById('reserveDate')?.value || '';
      const time = document.getElementById('reserveTime')?.value || '';
      const notes = document.getElementById('specialNotes')?.value || 'لا يوجد';

      const message = 
`السلام عليكم ورحمة الله وبركاته ☕
أود تأكيد حجز طاولة في مقهى دكّة الحجاز:

👤 الاسم: ${name}
📱 رقم الجوال: ${phone}
👥 عدد الضيوف: ${count}
🪑 تفضيل الجلسة: ${seating}
📅 تاريخ الزيارة: ${date}
⏰ الوقت التقريبي: ${time}
📝 ملاحظات خاصة: ${notes}

يسعدنا اللقاء بكم في سوق العلوي بجدة التاريخية 🤍`;

      const whatsappUrl = `https://wa.me/966560742104?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      closeModal();
    });
  }
}

/* --------------------------------------------------------------------------
   5. Lightbox Modal Gallery
   -------------------------------------------------------------------------- */
function initLightbox() {
  const lightbox = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const galleryItems = document.querySelectorAll('[data-lightbox]');

  function openLightbox(url, caption) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = url;
    if (lightboxCaption) lightboxCaption.textContent = caption || '';
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const url = item.getAttribute('data-lightbox');
      const caption = item.getAttribute('data-caption');
      openLightbox(url, caption);
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox && lightbox.classList.contains('open')) {
      closeLightbox();
    }
  });
}

/* --------------------------------------------------------------------------
   6. Mobile Drawer Navigation
   -------------------------------------------------------------------------- */
function initMobileDrawer() {
  const toggle = document.getElementById('mobileToggle');
  const drawer = document.getElementById('mobileDrawer');
  const closeBtn = document.getElementById('drawerClose');
  const navLinks = drawer ? drawer.querySelectorAll('.mobile-nav-link') : [];

  function openDrawer() {
    if (drawer) {
      drawer.classList.add('open');
      if (toggle) toggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeDrawer() {
    if (drawer) {
      drawer.classList.remove('open');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  }

  if (toggle) toggle.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

  navLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/* --------------------------------------------------------------------------
   7. Smooth Scroll Spy (Active Navigation Highlighting)
   -------------------------------------------------------------------------- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id], main[id]');
  const desktopNavLinks = document.querySelectorAll('.desktop-nav .nav-link');

  if (!sections.length || !desktopNavLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        desktopNavLinks.forEach(link => {
          const href = link.getAttribute('href');
          link.classList.toggle('active', href === `#${id}`);
        });
      }
    });
  }, {
    rootMargin: '-30% 0px -60% 0px'
  });

  sections.forEach(sec => observer.observe(sec));
}

/* --------------------------------------------------------------------------
   8. Apple Pay Interactive Demo Experience
   -------------------------------------------------------------------------- */
function initApplePayDemo() {
  const triggerBtn = document.getElementById('triggerApplePayBtn');
  const triggerAltBtn = document.getElementById('triggerApplePayAltBtn');
  const modal = document.getElementById('applePayModal');
  const closeBtn = document.getElementById('applePayCloseBtn');
  const confirmBtn = document.getElementById('confirmApplePayBtn');
  const resetBtn = document.getElementById('resetApplePayBtn');
  const initialView = document.getElementById('applePayInitialView');
  const successView = document.getElementById('applePaySuccessView');

  function openApplePaySheet() {
    if (!modal) return;
    if (initialView) initialView.style.display = 'block';
    if (successView) successView.style.display = 'none';
    if (confirmBtn) {
      confirmBtn.innerHTML = '<span class="face-id-icon">🪪</span><span>تأكيد الدفع التجريبي (Touch ID / Face ID)</span>';
      confirmBtn.disabled = false;
    }
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeApplePaySheet() {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (triggerBtn) triggerBtn.addEventListener('click', openApplePaySheet);
  if (triggerAltBtn) triggerAltBtn.addEventListener('click', openApplePaySheet);
  if (closeBtn) closeBtn.addEventListener('click', closeApplePaySheet);
  if (resetBtn) resetBtn.addEventListener('click', closeApplePaySheet);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeApplePaySheet();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
      closeApplePaySheet();
    }
  });

  if (confirmBtn) {
    confirmBtn.addEventListener('click', () => {
      confirmBtn.disabled = true;
      confirmBtn.innerHTML = '<span class="pulse-indicator"></span><span>جاري التحقق عبر Face ID...</span>';

      setTimeout(() => {
        if (initialView) initialView.style.display = 'none';
        if (successView) successView.style.display = 'block';
      }, 850);
    });
  }
}

