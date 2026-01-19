/**
 * Main JavaScript - Funcionalidades Generales
 * SimuPAES - Simulador de Puntajes PAES
 */

(function() {
  'use strict';

  // ============================================================
  // Header Scroll Effect
  // ============================================================
  const header = document.getElementById('header');
  
  if (header) {
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > 50) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
      
      lastScroll = currentScroll;
    });
  }

  // ============================================================
  // Mobile Menu Toggle
  // ============================================================
  const menuToggle = document.getElementById('menu-toggle');
  const menuClose = document.getElementById('menu-close');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      mobileMenu.classList.add('is-active');
      mobileMenu.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  }
  
  if (menuClose && mobileMenu) {
    menuClose.addEventListener('click', () => {
      mobileMenu.classList.remove('is-active');
      mobileMenu.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    });
  }
  
  // Close menu on link click
  if (mobileMenu) {
    const mobileLinks = mobileMenu.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('is-active');
        document.body.style.overflow = '';
      });
    });
  }

  // ============================================================
  // FAQ Accordion
  // ============================================================
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    if (question) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('is-active');
        
        // Close all other items
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('is-active');
            otherItem.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
          }
        });
        
        // Toggle current item
        item.classList.toggle('is-active');
        question.setAttribute('aria-expanded', !isActive);
      });
    }
  });

  // ============================================================
  // Smooth Scroll for Anchor Links
  // ============================================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href === '#') return;
      
      const target = document.querySelector(href);
      
      if (target) {
        e.preventDefault();
        
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Update URL without jumping
        history.pushState(null, null, href);
      }
    });
  });

  // ============================================================
  // Form Validation Utilities
  // ============================================================
  window.FormValidator = {
    isValidEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    },
    
    isValidPassword(password) {
      return password.length >= 8;
    },
    
    showError(input, message) {
      input.classList.add('is-invalid');
      input.classList.remove('is-valid');
      
      const errorElement = document.getElementById(input.id + '-error');
      if (errorElement) {
        errorElement.textContent = message;
      }
    },
    
    showSuccess(input) {
      input.classList.remove('is-invalid');
      input.classList.add('is-valid');
      
      const errorElement = document.getElementById(input.id + '-error');
      if (errorElement) {
        errorElement.textContent = '';
      }
    },
    
    clearValidation(input) {
      input.classList.remove('is-invalid', 'is-valid');
      
      const errorElement = document.getElementById(input.id + '-error');
      if (errorElement) {
        errorElement.textContent = '';
      }
    }
  };

  // ============================================================
  // Notification/Toast System
  // ============================================================
  window.Notifications = {
    show(message, type = 'info', duration = 5000) {
      const container = document.getElementById('notifications') || this.createContainer();
      
      const notification = document.createElement('div');
      notification.className = `alert alert-${type} animate-slide-down`;
      notification.innerHTML = `
        <div class="alert-icon">
          <i class="fas fa-${this.getIcon(type)}"></i>
        </div>
        <div class="alert-content">
          <p class="mb-0">${message}</p>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
          <i class="fas fa-times"></i>
        </button>
      `;
      
      container.appendChild(notification);
      
      if (duration > 0) {
        setTimeout(() => {
          notification.remove();
        }, duration);
      }
      
      return notification;
    },
    
    createContainer() {
      const container = document.createElement('div');
      container.id = 'notifications';
      container.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        gap: 10px;
        max-width: 400px;
      `;
      document.body.appendChild(container);
      return container;
    },
    
    getIcon(type) {
      const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
      };
      return icons[type] || icons.info;
    }
  };

  // ============================================================
  // Local Storage Utilities
  // ============================================================
  window.Storage = {
    set(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch (e) {
        console.error('Error saving to localStorage:', e);
        return false;
      }
    },
    
    get(key, defaultValue = null) {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
      } catch (e) {
        console.error('Error reading from localStorage:', e);
        return defaultValue;
      }
    },
    
    remove(key) {
      try {
        localStorage.removeItem(key);
        return true;
      } catch (e) {
        console.error('Error removing from localStorage:', e);
        return false;
      }
    }
  };

  // ============================================================
  // Number Formatting Utilities
  // ============================================================
  window.Format = {
    number(num, decimals = 0) {
      return new Intl.NumberFormat('es-CL', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      }).format(num);
    },
    
    currency(num) {
      return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
        minimumFractionDigits: 0
      }).format(num);
    },
    
    percentage(num, decimals = 1) {
      return num.toFixed(decimals) + '%';
    }
  };

  // ============================================================
  // Animation on Scroll (Simple Implementation)
  // ============================================================
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('[data-animate]');
    
    elements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      if (rect.top < windowHeight * 0.85) {
        element.classList.add('is-visible');
      }
    });
  };
  
  window.addEventListener('scroll', animateOnScroll);
  window.addEventListener('load', animateOnScroll);

  // ============================================================
  // Debounce Utility
  // ============================================================
  window.debounce = function(func, wait = 300) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  // ============================================================
  // Initialize on DOM Ready
  // ============================================================
  document.addEventListener('DOMContentLoaded', () => {
    // Check for hash in URL and scroll to it
    if (window.location.hash) {
      const target = document.querySelector(window.location.hash);
      if (target) {
        setTimeout(() => {
          const headerHeight = header ? header.offsetHeight : 0;
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

})();
