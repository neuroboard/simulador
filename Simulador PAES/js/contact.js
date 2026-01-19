/**
 * Contact JavaScript - Formulario de Contacto
 * SimuPAES - Simulador de Puntajes PAES
 */

(function() {
  'use strict';

  // ============================================================
  // Contact Form
  // ============================================================
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const nombre = document.getElementById('nombre');
      const apellido = document.getElementById('apellido');
      const email = document.getElementById('email');
      const asunto = document.getElementById('asunto');
      const mensaje = document.getElementById('mensaje');
      const privacidad = document.getElementById('acepto-privacidad');
      
      const successAlert = document.getElementById('contact-success');
      const errorAlert = document.getElementById('contact-error');
      
      // Hide previous alerts
      if (successAlert) successAlert.style.display = 'none';
      if (errorAlert) errorAlert.style.display = 'none';
      
      // Validate fields
      if (!nombre.value || nombre.value.length < 2) {
        showError('Por favor ingresa tu nombre');
        nombre.focus();
        return;
      }
      
      if (!apellido.value || apellido.value.length < 2) {
        showError('Por favor ingresa tu apellido');
        apellido.focus();
        return;
      }
      
      if (!email.value || !isValidEmail(email.value)) {
        showError('Por favor ingresa un correo electrónico válido');
        email.focus();
        return;
      }
      
      if (!asunto.value) {
        showError('Por favor selecciona un asunto');
        asunto.focus();
        return;
      }
      
      if (!mensaje.value || mensaje.value.length < 10) {
        showError('El mensaje debe tener al menos 10 caracteres');
        mensaje.focus();
        return;
      }
      
      if (!privacidad.checked) {
        showError('Debes aceptar la política de privacidad');
        return;
      }
      
      // Simulate form submission
      try {
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="loader loader-sm"></span> Enviando...';
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Success
        if (successAlert) {
          successAlert.style.display = 'flex';
          successAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        
        // Reset form
        contactForm.reset();
        
        // Reset button after delay
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Mensaje';
        }, 1000);
        
      } catch (error) {
        // Show error
        if (errorAlert) {
          errorAlert.style.display = 'flex';
        }
        
        // Reset button
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Mensaje';
      }
    });
  }

  // ============================================================
  // Helper Functions
  // ============================================================
  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
  
  function showError(message) {
    if (window.Notifications) {
      window.Notifications.show(message, 'error');
    } else {
      alert(message);
    }
  }

})();
