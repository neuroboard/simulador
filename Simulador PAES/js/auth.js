/**
 * Auth JavaScript - Login y Registro
 * SimuPAES - Simulador de Puntajes PAES
 */

(function() {
  'use strict';

  // ============================================================
  // Login Form
  // ============================================================
  const loginForm = document.getElementById('login-form');
  
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const email = document.getElementById('email');
      const password = document.getElementById('password');
      const errorAlert = document.getElementById('login-error');
      const errorMessage = document.getElementById('login-error-message');
      
      // Clear previous errors
      clearErrors();
      
      // Validate email
      if (!email.value || !isValidEmail(email.value)) {
        showFieldError(email, 'Ingresa un correo electrónico válido');
        return;
      }
      
      // Validate password
      if (!password.value || password.value.length < 8) {
        showFieldError(password, 'La contraseña debe tener al menos 8 caracteres');
        return;
      }
      
      // Simulate login (in production, this would be an API call)
      try {
        const submitBtn = loginForm.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="loader loader-sm"></span> Iniciando sesión...';
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Check credentials (demo: any valid email + password >= 8 chars works)
        // In production, this would validate against a backend
        
        // Store session (demo)
        if (window.Storage) {
          window.Storage.set('user', {
            email: email.value,
            name: email.value.split('@')[0],
            plan: 'free',
            loggedIn: true
          });
        }
        
        // Redirect to home or dashboard
        window.location.href = 'index.html';
        
      } catch (error) {
        // Show error
        if (errorAlert && errorMessage) {
          errorMessage.textContent = 'Error al iniciar sesión. Verifica tus credenciales.';
          errorAlert.style.display = 'flex';
        }
        
        // Reset button
        const submitBtn = loginForm.querySelector('button[type="submit"]');
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Iniciar Sesión';
      }
    });
    
    // Real-time validation
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    
    if (emailInput) {
      emailInput.addEventListener('blur', () => {
        if (emailInput.value && !isValidEmail(emailInput.value)) {
          showFieldError(emailInput, 'Correo electrónico inválido');
        } else {
          clearFieldError(emailInput);
        }
      });
    }
    
    if (passwordInput) {
      passwordInput.addEventListener('blur', () => {
        if (passwordInput.value && passwordInput.value.length < 8) {
          showFieldError(passwordInput, 'Mínimo 8 caracteres');
        } else {
          clearFieldError(passwordInput);
        }
      });
    }
  }

  // ============================================================
  // Register Form
  // ============================================================
  const registerForm = document.getElementById('register-form');
  
  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const nombre = document.getElementById('nombre');
      const apellido = document.getElementById('apellido');
      const email = document.getElementById('email');
      const password = document.getElementById('password');
      const passwordConfirm = document.getElementById('password-confirm');
      const terms = document.getElementById('terms');
      const errorAlert = document.getElementById('register-error');
      const errorMessage = document.getElementById('register-error-message');
      const successAlert = document.getElementById('register-success');
      
      // Clear previous errors
      clearErrors();
      
      // Validate name
      if (!nombre.value || nombre.value.length < 2) {
        showFieldError(nombre, 'Ingresa tu nombre');
        return;
      }
      
      // Validate apellido
      if (!apellido.value || apellido.value.length < 2) {
        showFieldError(apellido, 'Ingresa tu apellido');
        return;
      }
      
      // Validate email
      if (!email.value || !isValidEmail(email.value)) {
        showFieldError(email, 'Ingresa un correo electrónico válido');
        return;
      }
      
      // Validate password
      if (!password.value || password.value.length < 8) {
        showFieldError(password, 'La contraseña debe tener al menos 8 caracteres');
        return;
      }
      
      // Validate password confirmation
      if (password.value !== passwordConfirm.value) {
        showFieldError(passwordConfirm, 'Las contraseñas no coinciden');
        return;
      }
      
      // Validate terms
      if (!terms.checked) {
        if (window.Notifications) {
          window.Notifications.show('Debes aceptar los términos y condiciones', 'error');
        }
        return;
      }
      
      // Simulate registration
      try {
        const submitBtn = registerForm.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="loader loader-sm"></span> Creando cuenta...';
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Success
        if (successAlert) {
          successAlert.style.display = 'flex';
        }
        
        // Store user (demo)
        if (window.Storage) {
          window.Storage.set('user', {
            email: email.value,
            name: nombre.value,
            plan: 'free',
            loggedIn: true
          });
        }
        
        // Redirect after delay
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 2000);
        
      } catch (error) {
        // Show error
        if (errorAlert && errorMessage) {
          errorMessage.textContent = 'Error al crear la cuenta. Intenta de nuevo.';
          errorAlert.style.display = 'flex';
        }
        
        // Reset button
        const submitBtn = registerForm.querySelector('button[type="submit"]');
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-user-plus"></i> Crear Cuenta';
      }
    });
    
    // Real-time validation
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const passwordConfirmInput = document.getElementById('password-confirm');
    
    if (emailInput) {
      emailInput.addEventListener('blur', () => {
        if (emailInput.value && !isValidEmail(emailInput.value)) {
          showFieldError(emailInput, 'Correo electrónico inválido');
        } else {
          clearFieldError(emailInput);
        }
      });
    }
    
    if (passwordInput) {
      passwordInput.addEventListener('blur', () => {
        if (passwordInput.value && passwordInput.value.length < 8) {
          showFieldError(passwordInput, 'Mínimo 8 caracteres');
        } else {
          clearFieldError(passwordInput);
        }
      });
      
      passwordInput.addEventListener('input', () => {
        updatePasswordStrength(passwordInput.value);
      });
    }
    
    if (passwordConfirmInput) {
      passwordConfirmInput.addEventListener('blur', () => {
        const password = document.getElementById('password');
        if (passwordConfirmInput.value && passwordConfirmInput.value !== password.value) {
          showFieldError(passwordConfirmInput, 'Las contraseñas no coinciden');
        } else {
          clearFieldError(passwordConfirmInput);
        }
      });
    }
  }

  // ============================================================
  // Helper Functions
  // ============================================================
  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
  
  function showFieldError(input, message) {
    input.classList.add('is-invalid');
    input.classList.remove('is-valid');
    
    const errorEl = document.getElementById(input.id + '-error');
    if (errorEl) {
      errorEl.textContent = message;
    }
  }
  
  function clearFieldError(input) {
    input.classList.remove('is-invalid');
    
    const errorEl = document.getElementById(input.id + '-error');
    if (errorEl) {
      errorEl.textContent = '';
    }
  }
  
  function clearErrors() {
    document.querySelectorAll('.is-invalid').forEach(el => {
      el.classList.remove('is-invalid');
    });
    
    document.querySelectorAll('.form-error').forEach(el => {
      el.textContent = '';
    });
    
    const loginError = document.getElementById('login-error');
    if (loginError) loginError.style.display = 'none';
    
    const registerError = document.getElementById('register-error');
    if (registerError) registerError.style.display = 'none';
  }
  
  function updatePasswordStrength(password) {
    // Simple strength indicator (could be enhanced)
    let strength = 0;
    
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    
    // Could show a visual strength indicator here
    return strength;
  }

  // ============================================================
  // Social Login (Demo)
  // ============================================================
  document.querySelectorAll('.auth-social-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const provider = btn.textContent.trim();
      if (window.Notifications) {
        window.Notifications.show(`Inicio de sesión con ${provider} próximamente disponible.`, 'info');
      }
    });
  });

})();
