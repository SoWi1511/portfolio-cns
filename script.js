/* ============================================================
   PORTFOLIO - INTERACTIVE JAVASCRIPT
   Smooth scrolling, scroll animations, nav state, counter
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ==================== NAVIGATION ====================

  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const navToggle = document.getElementById('navToggle');
  const navLinksContainer = document.getElementById('navLinks');

  // Navbar scroll effect
  const handleNavScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleNavScroll);

  // Mobile menu toggle
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinksContainer.classList.toggle('open');
  });

  // Close mobile menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinksContainer.classList.remove('open');
    });
  });

  // Active nav link on scroll
  const sections = document.querySelectorAll('section[id]');

  const updateActiveLink = () => {
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', updateActiveLink);

  // ==================== SMOOTH SCROLL ====================

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // ==================== SCROLL REVEAL ANIMATIONS ====================

  // Add reveal class to elements
  const revealElements = [
    '.about-grid',
    '.about-image-wrapper',
    '.about-content',
    '.tech-category',
    '.project-card',
    '.assignment-card',
    '.summary-card',
    '.contact-info',
    '.contact-form',
    '.section-description'
  ];

  revealElements.forEach(selector => {
    document.querySelectorAll(selector).forEach((el, index) => {
      el.classList.add('reveal');
      if (index < 6) {
        el.classList.add(`reveal-delay-${Math.min(index + 1, 4)}`);
      }
    });
  });

  // Intersection Observer for reveal animations
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.1
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
  });



  // ==================== TYPING EFFECT ====================

  const typingElement = document.querySelector('.typing-text');
  if (typingElement) {
    const originalText = typingElement.textContent;
    typingElement.textContent = '';
    typingElement.style.borderRight = '2px solid var(--accent-primary)';

    let charIndex = 0;

    const typeChar = () => {
      if (charIndex < originalText.length) {
        typingElement.textContent += originalText.charAt(charIndex);
        charIndex++;
        setTimeout(typeChar, 40 + Math.random() * 30);
      } else {
        // Remove cursor after typing completes
        setTimeout(() => {
          typingElement.style.borderRight = 'none';
        }, 1500);
      }
    };

    // Start typing after hero animation
    setTimeout(typeChar, 800);
  }

  // ==================== CONTACT FORM ====================

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('formName').value;
      const email = document.getElementById('formEmail').value;
      const message = document.getElementById('formMessage').value;

      // Hộp loading gửi thư giả lập
      const submitBtn = document.getElementById('formSubmit');
      const originalHTML = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Đang gửi tin nhắn...</span>';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalHTML;
        contactForm.reset();

        // Kích hoạt thông báo toast success
        showToast(
          "Gửi tin nhắn thành công!", 
          "Cảm ơn bạn, tôi đã nhận được thông tin và sẽ phản hồi qua email của bạn sớm nhất."
        );
      }, 1200);

      console.log('Form submitted:', { name, email, message });
    });
  }

  function showToast(title, desc) {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <div class="toast-icon">✓</div>
      <div class="toast-content">
        <div class="toast-title">${title}</div>
        <div class="toast-desc">${desc}</div>
      </div>
      <button class="toast-close">&times;</button>
      <div class="toast-progress"></div>
    `;

    container.appendChild(toast);

    // Trích xuất chiều cao để kích hoạt CSS transition
    toast.offsetHeight;

    toast.classList.add('show');

    // Tự đóng sau 4 giây
    const autoClose = setTimeout(() => {
      closeToast(toast);
    }, 4000);

    // Nút đóng thủ công
    toast.querySelector('.toast-close').addEventListener('click', () => {
      clearTimeout(autoClose);
      closeToast(toast);
    });
  }

  function closeToast(toast) {
    toast.classList.remove('show');
    toast.addEventListener('transitionend', () => {
      toast.remove();
    });
  }

  // ==================== PARALLAX GLOW EFFECT ====================

  const heroSection = document.querySelector('.hero-section');
  if (heroSection) {
    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      const glow1 = document.querySelector('.hero-glow--1');
      const glow2 = document.querySelector('.hero-glow--2');

      if (glow1) {
        glow1.style.transform = `translate(${(x - 0.5) * 30}px, ${(y - 0.5) * 30}px)`;
      }
      if (glow2) {
        glow2.style.transform = `translate(${(x - 0.5) * -20}px, ${(y - 0.5) * -20}px)`;
      }
    });
  }



  // ==================== KEYBOARD NAVIGATION ====================

  document.addEventListener('keydown', (e) => {
    // Press 'Escape' to close mobile menu
    if (e.key === 'Escape') {
      navToggle.classList.remove('active');
      navLinksContainer.classList.remove('open');
    }
  });

  // ==================== INITIALIZATION COMPLETE ====================
  console.log('🚀 Portfolio initialized successfully!');
});
