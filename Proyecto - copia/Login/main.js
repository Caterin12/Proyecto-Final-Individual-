document.addEventListener('DOMContentLoaded', () => {
  const loadingScreen = document.getElementById('loadingScreen');
  const loadingProgress = document.getElementById('loadingProgress');
  const loginContainer = document.getElementById('loginContainer');
  const section1 = document.getElementById('section1');
  const section2 = document.getElementById('section2');
  const nextBtn = document.getElementById('nextBtn');
  const backBtn = document.getElementById('backBtn');
  const loginBtn = document.getElementById('loginBtn');
  const loginForm = document.getElementById('loginForm');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  
  // Show loading animation
  let progress = 0;
  const loadingInterval = setInterval(() => {
    progress += Math.random() * 10;
    if (progress > 100) {
      progress = 100;
      clearInterval(loadingInterval);
      
      // Hide loading screen and show login container
      setTimeout(() => {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.visibility = 'hidden';
        
        setTimeout(() => {
          loginContainer.style.opacity = '1';
          loginContainer.style.visibility = 'visible';
          loginContainer.style.transform = 'translateY(0)';
          
          // Show the first section
          setTimeout(() => {
            section1.classList.add('active');
            usernameInput.focus();
          }, 500);
        }, 300);
      }, 500);
    }
    loadingProgress.style.width = `${progress}%`;
  }, 200);
  
  // Animate input borders when focused
  const inputs = document.querySelectorAll('.futuristic-input');
  inputs.forEach(input => {
    input.addEventListener('focus', () => {
      input.parentElement.querySelector('.input-border').style.width = '100%';
    });
    
    input.addEventListener('blur', () => {
      if (!input.value) {
        input.parentElement.querySelector('.input-border').style.width = '0';
      }
    });
  });
  
  // Handle next button click
  nextBtn.addEventListener('click', () => {
    if (!usernameInput.value.trim()) {
      shakeElement(usernameInput);
      return;
    }
    
    section1.classList.remove('active');
    section1.style.transform = 'translateX(-50px)';
    
    setTimeout(() => {
      section2.classList.add('active');
      passwordInput.focus();
    }, 400);
  });
  
  // Handle back button click
  backBtn.addEventListener('click', () => {
    section2.classList.remove('active');
    section2.style.transform = 'translateX(50px)';
    
    setTimeout(() => {
      section1.style.transform = 'translateX(0)';
      section1.classList.add('active');
      usernameInput.focus();
    }, 400);
  });
  
  // Handle login form submission
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (!passwordInput.value.trim()) {
      shakeElement(passwordInput);
      return;
    }
    
    // Add login animation effect
    loginBtn.innerHTML = 'VERIFICANDO...';
    loginBtn.disabled = true;
    
    // Simulate login process
    setTimeout(function() {
      loginContainer.style.transform = 'scale(0.95)';
      loginContainer.style.opacity = '0';
      
      setTimeout(function() {
        // Show success message
        alert('¡Inicio de sesión exitoso!');
        
        // Try different redirection methods
        try {
          // Method 1: Direct assignment
          window.location.href = '/index.html';
          
          // If that doesn't work, try after a short delay
          setTimeout(function() {
            // Method 2: Replace
            window.location.replace('/index.html');
            
            // Method 3: Absolute path (if you know it)
            // Uncomment and modify this if needed
            // window.location.href = '/index.html';
          }, 100);
        } catch (error) {
          console.error('Error redirecting:', error);
          alert('Error al redirigir. Por favor, haz clic en este enlace para ir a la página principal.');
          
          // Create a fallback link
          const link = document.createElement('a');
          link.href = '/index.html';
          link.textContent = 'Ir a la página principal';
          link.style.display = 'block';
          link.style.margin = '20px auto';
          link.style.textAlign = 'center';
          link.style.padding = '10px';
          link.style.backgroundColor = '#7A8B99';
          link.style.color = 'white';
          link.style.borderRadius = '4px';
          link.style.textDecoration = 'none';
          
          // Add to the page
          document.body.appendChild(link);
        }
      }, 1000);
    }, 1500);
  });
  
  // Function to shake element when validation fails
  function shakeElement(element) {
    element.classList.add('shake');
    element.style.borderColor = 'var(--accent-color)';
    
    setTimeout(() => {
      element.classList.remove('shake');
      element.style.borderColor = '';
    }, 600);
  }
  
  // Add CSS for shake animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
      20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    
    .shake {
      animation: shake 0.6s cubic-bezier(.36,.07,.19,.97) both;
    }
  `;
  document.head.appendChild(style);
});
