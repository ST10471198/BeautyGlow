// JavaScript/contact.js
document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons and panels
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding panel
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
            
            // Update URL hash for bookmarking
            window.location.hash = tabId;
        });
    });
    
    // Check URL hash on page load
    if (window.location.hash) {
        const tabId = window.location.hash.substring(1);
        const correspondingBtn = document.querySelector(`[data-tab="${tabId}"]`);
        if (correspondingBtn) {
            correspondingBtn.click();
        }
    }
    
    // Form validation and submission
    const contactForm = document.getElementById('contactForm');
    const successModal = document.getElementById('successModal');
    const closeModal = document.querySelector('.close');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    
    // Form elements
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const messageTypeInput = document.getElementById('messageType');
    const messageInput = document.getElementById('message');
    const charCount = document.getElementById('charCount');
    
    // Form validation
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset error messages
        clearErrors();
        
        // Validate form
        if (validateForm()) {
            // Submit form via AJAX
            submitForm();
        }
    });
    
    // Real-time validation
    nameInput.addEventListener('blur', validateName);
    emailInput.addEventListener('blur', validateEmail);
    phoneInput.addEventListener('blur', validatePhone);
    messageTypeInput.addEventListener('change', validateMessageType);
    messageInput.addEventListener('input', updateCharCount);
    messageInput.addEventListener('blur', validateMessage);
    
    // Modal functionality
    closeModal.addEventListener('click', closeSuccessModal);
    modalCloseBtn.addEventListener('click', closeSuccessModal);
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === successModal) {
            closeSuccessModal();
        }
    });
    
    // Close modal with escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && successModal.style.display === 'flex') {
            closeSuccessModal();
        }
    });
    
    // Validation functions
    function validateName() {
        const name = nameInput.value.trim();
        const nameError = document.getElementById('nameError');
        
        if (name === '') {
            showError(nameInput, nameError, 'Name is required');
            return false;
        } else if (name.length < 2) {
            showError(nameInput, nameError, 'Name must be at least 2 characters');
            return false;
        } else if (!/^[a-zA-Z\s]+$/.test(name)) {
            showError(nameInput, nameError, 'Name can only contain letters and spaces');
            return false;
        } else {
            showSuccess(nameInput);
            return true;
        }
    }
    
    function validateEmail() {
        const email = emailInput.value.trim();
        const emailError = document.getElementById('emailError');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (email === '') {
            showError(emailInput, emailError, 'Email is required');
            return false;
        } else if (!emailRegex.test(email)) {
            showError(emailInput, emailError, 'Please enter a valid email address');
            return false;
        } else {
            showSuccess(emailInput);
            return true;
        }
    }
    
    function validatePhone() {
        const phone = phoneInput.value.trim();
        const phoneError = document.getElementById('phoneError');
        
        // Phone is optional, but if provided, validate it
        if (phone !== '' && !/^[\d\s\-\+\(\)]{10,}$/.test(phone)) {
            showError(phoneInput, phoneError, 'Please enter a valid phone number');
            return false;
        } else {
            showSuccess(phoneInput);
            return true;
        }
    }
    
    function validateMessageType() {
        const messageType = messageTypeInput.value;
        const messageTypeError = document.getElementById('messageTypeError');
        
        if (messageType === '' || messageType === null) {
            showError(messageTypeInput, messageTypeError, 'Please select a message type');
            return false;
        } else {
            showSuccess(messageTypeInput);
            return true;
        }
    }
    
    function validateMessage() {
        const message = messageInput.value.trim();
        const messageError = document.getElementById('messageError');
        
        if (message === '') {
            showError(messageInput, messageError, 'Message is required');
            return false;
        } else if (message.length < 10) {
            showError(messageInput, messageError, 'Message must be at least 10 characters');
            return false;
        } else {
            showSuccess(messageInput);
            return true;
        }
    }
    
    function updateCharCount() {
        const message = messageInput.value;
        charCount.textContent = message.length;
        
        // Change color when approaching limit
        if (message.length > 900) {
            charCount.style.color = '#ff6b6b';
        } else if (message.length > 800) {
            charCount.style.color = '#ffa94d';
        } else {
            charCount.style.color = '#666';
        }
    }
    
    function validateForm() {
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPhoneValid = validatePhone();
        const isMessageTypeValid = validateMessageType();
        const isMessageValid = validateMessage();
        
        return isNameValid && isEmailValid && isPhoneValid && isMessageTypeValid && isMessageValid;
    }
    
    function showError(input, errorElement, message) {
        input.style.borderColor = '#ff6b6b';
        errorElement.textContent = message;
        errorElement.style.color = '#ff6b6b';
    }
    
    function showSuccess(input) {
        input.style.borderColor = '#51cf66';
    }
    
    function clearErrors() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(error => {
            error.textContent = '';
        });
        
        const inputs = document.querySelectorAll('.form-control');
        inputs.forEach(input => {
            input.style.borderColor = '#ddd';
        });
    }
    
    function submitForm() {
        // Show loading state
        const submitBtn = contactForm.querySelector('.btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        // Collect form data
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            messageType: formData.get('messageType'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };
        
        // Simulate AJAX submission to email
        // In a real implementation, this would connect to a backend service
        setTimeout(() => {
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            
            // Show success modal
            successModal.style.display = 'flex';
            
            // Reset form
            contactForm.reset();
            clearErrors();
            updateCharCount();
            
            // In a real implementation, you would send the data to your server
            // which would then send the email
            console.log('Form data to be emailed:', data);
            
            // Track form submission
            console.log('Contact form submitted successfully');
        }, 2000);
    }
    
    function closeSuccessModal() {
        successModal.style.display = 'none';
    }
    
    // Add animation to form elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe form elements
    const formElements = document.querySelectorAll('.form-group, .btn');
    formElements.forEach(el => {
        el.style.animation = 'fadeInUp 0.6s ease forwards';
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });
    
    // Observe info items
    const infoItems = document.querySelectorAll('.info-item');
    infoItems.forEach(el => {
        el.style.animation = 'fadeInUp 0.6s ease forwards';
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });
    
    // Initialize character count
    updateCharCount();
});