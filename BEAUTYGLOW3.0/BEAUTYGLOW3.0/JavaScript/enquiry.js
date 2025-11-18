document.addEventListener('DOMContentLoaded', function() {
    // Form elements
    const enquiryForm = document.getElementById('enquiryForm');
    const enquiryTypeSelect = document.getElementById('enquiryType');
    const dynamicFieldsContainer = document.getElementById('dynamicFields');
    const successModal = document.getElementById('successModal');
    const closeModal = document.querySelector('.close');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const responseDetails = document.getElementById('responseDetails');
    
    // Enquiry type configurations
    const enquiryConfigs = {
        product: {
            title: "Product Information & Pricing",
            fields: [
                {
                    type: "select",
                    id: "productInterest",
                    label: "Product Category",
                    required: true,
                    options: [
                        { value: "", text: "Please select a category" },
                        { value: "cleansers", text: "Cleansers & Exfoliators" },
                        { value: "serums", text: "Serums & Treatments" },
                        { value: "moisturizers", text: "Moisturizers & Creams" },
                        { value: "masks", text: "Face Masks" },
                        { value: "sunscreen", text: "Sunscreen & Protection" },
                        { value: "full-range", text: "Full Product Range" }
                    ]
                },
                {
                    type: "select",
                    id: "budgetRange",
                    label: "Approximate Budget Range",
                    required: false,
                    options: [
                        { value: "", text: "Select budget range (optional)" },
                        { value: "under-500", text: "Under R500" },
                        { value: "500-1000", text: "R500 - R1000" },
                        { value: "1000-2000", text: "R1000 - R2000" },
                        { value: "over-2000", text: "Over R2000" }
                    ]
                }
            ],
            responses: {
                cleansers: {
                    title: "Cleanser & Exfoliator Information",
                    content: `<p>Our cleansers range from R250 to R600, with options for all skin types. Our gentle exfoliators start at R350. A skincare specialist will contact you to recommend the best options for your skin type.</p>
                             <p><strong>Availability:</strong> All products are in stock with next-day delivery available in Johannesburg.</p>`
                },
                serums: {
                    title: "Serum & Treatment Information",
                    content: `<p>Our specialized serums range from R450 to R1200, targeting specific skin concerns like hydration, anti-aging, and brightening. Custom treatment plans start at R800.</p>
                             <p><strong>Availability:</strong> Most serums are in stock. Custom formulations may take 3-5 business days.</p>`
                },
                moisturizers: {
                    title: "Moisturizer & Cream Information",
                    content: `<p>Our moisturizers range from R300 to R850, formulated for different skin types and concerns. Our premium creams start at R600.</p>
                             <p><strong>Availability:</strong> All standard moisturizers are in stock. Special formulations may require 2-3 business days.</p>`
                },
                masks: {
                    title: "Face Mask Information",
                    content: `<p>Our therapeutic face masks range from R200 to R550 per treatment. We also offer mask sets starting at R650.</p>
                             <p><strong>Availability:</strong> All masks are currently in stock with same-day pickup available at our Rosebank location.</p>`
                },
                sunscreen: {
                    title: "Sunscreen & Protection Information",
                    content: `<p>Our daily protection sunscreens range from R280 to R650. We offer both mineral and chemical formulations suitable for all skin types.</p>
                             <p><strong>Availability:</strong> All sun protection products are in stock with free delivery on orders over R500.</p>`
                },
                "full-range": {
                    title: "Complete Product Range Information",
                    content: `<p>Our full skincare range offers solutions for every skin concern with prices ranging from R200 to R1500 per product.</p>
                             <p><strong>Special Offer:</strong> First-time customers receive 15% off their initial purchase. A skincare specialist will contact you to create a personalized regimen.</p>`
                }
            }
        },
        service: {
            title: "Skincare Consultation Service",
            fields: [
                {
                    type: "select",
                    id: "serviceType",
                    label: "Type of Service",
                    required: true,
                    options: [
                        { value: "", text: "Please select a service" },
                        { value: "basic-consult", text: "Basic Skincare Consultation (30 mins)" },
                        { value: "advanced-consult", text: "Advanced Skin Analysis (60 mins)" },
                        { value: "treatment-plan", text: "Custom Treatment Plan Development" },
                        { value: "follow-up", text: "Follow-up Consultation" }
                    ]
                },
                {
                    type: "select",
                    id: "preferredTime",
                    label: "Preferred Consultation Time",
                    required: false,
                    options: [
                        { value: "", text: "Select preferred time (optional)" },
                        { value: "morning", text: "Morning (9am - 12pm)" },
                        { value: "afternoon", text: "Afternoon (1pm - 5pm)" },
                        { value: "evening", text: "Evening (6pm - 8pm, Tue & Thu only)" }
                    ]
                }
            ],
            responses: {
                "basic-consult": {
                    title: "Basic Skincare Consultation",
                    content: `<p><strong>Cost:</strong> R250 (redeemable against product purchase)</p>
                             <p><strong>Duration:</strong> 30 minutes</p>
                             <p><strong>Availability:</strong> Next available slot: Within 2 business days</p>
                             <p>Our basic consultation includes skin analysis, product recommendations, and a mini facial treatment.</p>`
                },
                "advanced-consult": {
                    title: "Advanced Skin Analysis",
                    content: `<p><strong>Cost:</strong> R500 (includes personalized product samples)</p>
                             <p><strong>Duration:</strong> 60 minutes</p>
                             <p><strong>Availability:</strong> Next available slot: Within 3 business days</p>
                             <p>Our advanced analysis uses digital skin imaging to provide detailed insights and a comprehensive treatment plan.</p>`
                },
                "treatment-plan": {
                    title: "Custom Treatment Plan Development",
                    content: `<p><strong>Cost:</strong> R750 (includes first month's products)</p>
                             <p><strong>Duration:</strong> 90 minutes initial consultation + follow-up</p>
                             <p><strong>Availability:</strong> Next available slot: Within 5 business days</p>
                             <p>We'll develop a 3-month personalized skincare regimen with ongoing support and adjustments.</p>`
                },
                "follow-up": {
                    title: "Follow-up Consultation",
                    content: `<p><strong>Cost:</strong> R150 for existing clients</p>
                             <p><strong>Duration:</strong> 20-30 minutes</p>
                             <p><strong>Availability:</strong> Next available slot: Within 1 business day</p>
                             <p>Review progress, adjust your regimen, and address any new concerns.</p>`
                }
            }
        },
        volunteer: {
            title: "Volunteer Opportunities",
            fields: [
                {
                    type: "select",
                    id: "volunteerRole",
                    label: "Area of Interest",
                    required: true,
                    options: [
                        { value: "", text: "Please select an area" },
                        { value: "community-outreach", text: "Community Skincare Education" },
                        { value: "event-support", text: "Event & Workshop Support" },
                        { value: "social-media", text: "Social Media & Content Creation" },
                        { value: "admin-support", text: "Administrative Support" }
                    ]
                },
                {
                    type: "select",
                    id: "timeCommitment",
                    label: "Available Time Commitment",
                    required: false,
                    options: [
                        { value: "", text: "Select time commitment (optional)" },
                        { value: "occasional", text: "Occasional (special events only)" },
                        { value: "weekly", text: "Weekly (2-4 hours per week)" },
                        { value: "monthly", text: "Monthly (4-8 hours per month)" }
                    ]
                }
            ],
            responses: {
                "community-outreach": {
                    title: "Community Skincare Education Volunteer",
                    content: `<p>Thank you for your interest in our community outreach program! We're currently seeking volunteers to help with our monthly skincare education workshops.</p>
                             <p><strong>Next Steps:</strong> Our volunteer coordinator will contact you within 3 business days to discuss upcoming opportunities and schedule an orientation session.</p>
                             <p><strong>Requirements:</strong> No prior skincare knowledge needed - we provide full training!</p>`
                },
                "event-support": {
                    title: "Event & Workshop Support Volunteer",
                    content: `<p>We appreciate your interest in supporting our events! Our next major workshop is scheduled for 3 weeks from now.</p>
                             <p><strong>Next Steps:</strong> Our events team will contact you within 2 business days with details about upcoming opportunities and roles.</p>
                             <p><strong>Benefits:</strong> Volunteers receive product samples and discounts on Beauty Glow products.</p>`
                },
                "social-media": {
                    title: "Social Media & Content Creation Volunteer",
                    content: `<p>We're excited about your interest in helping with our social media presence! We're looking for volunteers to help create content about skincare education.</p>
                             <p><strong>Next Steps:</strong> Our marketing coordinator will contact you within 3 business days to discuss your skills and our current needs.</p>
                             <p><strong>Flexibility:</strong> This role can be primarily remote with flexible hours.</p>`
                },
                "admin-support": {
                    title: "Administrative Support Volunteer",
                    content: `<p>Thank you for offering to help with administrative tasks! We have ongoing needs for assistance with client communications and program coordination.</p>
                             <p><strong>Next Steps:</strong> Our office manager will contact you within 2 business days to discuss scheduling and training.</p>
                             <p><strong>Location:</strong> This role is based at our Rosebank office with flexible scheduling options.</p>`
                }
            }
        },
        sponsor: {
            title: "Sponsorship/Partnership",
            fields: [
                {
                    type: "select",
                    id: "sponsorshipType",
                    label: "Type of Sponsorship",
                    required: true,
                    options: [
                        { value: "", text: "Please select sponsorship type" },
                        { value: "event", text: "Event Sponsorship" },
                        { value: "product", text: "Product Donation" },
                        { value: "financial", text: "Financial Support" },
                        { value: "in-kind", text: "In-Kind Services" }
                    ]
                },
                {
                    type: "select",
                    id: "sponsorshipLevel",
                    label: "Interest Level",
                    required: false,
                    options: [
                        { value: "", text: "Select interest level (optional)" },
                        { value: "exploring", text: "Just Exploring Options" },
                        { value: "serious", text: "Seriously Considering" },
                        { value: "ready", text: "Ready to Commit" }
                    ]
                }
            ],
            responses: {
                event: {
                    title: "Event Sponsorship Opportunities",
                    content: `<p>We appreciate your interest in event sponsorship! We have several upcoming events that would benefit from partner support.</p>
                             <p><strong>Current Opportunities:</strong> 
                             <ul>
                                 <li>Annual Skincare Education Day (2 months away)</li>
                                 <li>Community Workshop Series (ongoing)</li>
                                 <li>Youth Skincare Awareness Program (starting next quarter)</li>
                             </ul>
                             </p>
                             <p><strong>Next Steps:</strong> Our partnerships manager will contact you within 2 business days with detailed sponsorship packages.</p>`
                },
                product: {
                    title: "Product Donation Partnership",
                    content: `<p>Thank you for considering product donations! We distribute donated products through our community programs and to organizations supporting skincare access.</p>
                             <p><strong>Current Needs:</strong> We're particularly seeking donations of gentle cleansers, moisturizers, and sunscreen for our youth programs.</p>
                             <p><strong>Next Steps:</strong> Our community outreach coordinator will contact you within 3 business days to discuss specific needs and logistics.</p>`
                },
                financial: {
                    title: "Financial Support Partnership",
                    content: `<p>We appreciate your interest in providing financial support! Your contribution would help fund our community education programs and product access initiatives.</p>
                             <p><strong>Funding Impact:</strong> 
                             <ul>
                                 <li>R1000 sponsors one community workshop</li>
                                 <li>R5000 provides skincare products for 50 youth</li>
                                 <li>R10000 funds a month of our mobile skincare clinic</li>
                             </ul>
                             </p>
                             <p><strong>Next Steps:</strong> Our development director will contact you within 2 business days to discuss giving options and recognition.</p>`
                },
                "in-kind": {
                    title: "In-Kind Services Partnership",
                    content: `<p>Thank you for offering in-kind services! We value partnerships that extend beyond financial support.</p>
                             <p><strong>Current Needs:</strong> We're particularly seeking support with professional photography, graphic design, legal services, and venue space.</p>
                             <p><strong>Next Steps:</strong> Our operations manager will contact you within 3 business days to discuss how your services could support our mission.</p>`
                }
            }
        },
        other: {
            title: "Other Enquiry",
            fields: [],
            responses: {
                default: {
                    title: "General Enquiry Received",
                    content: `<p>Thank you for your enquiry! We've received your message and a member of our team will review it and respond within 24 hours.</p>
                             <p>If your enquiry is urgent, please call us directly at +27 66 231 0108 during business hours (9am-5pm, Monday-Friday).</p>`
                }
            }
        }
    };
    
    // Event Listeners
    enquiryTypeSelect.addEventListener('change', handleEnquiryTypeChange);
    enquiryForm.addEventListener('submit', handleFormSubmit);
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
    
    // Functions
    function handleEnquiryTypeChange() {
        const selectedType = enquiryTypeSelect.value;
        clearDynamicFields();
        
        if (selectedType && enquiryConfigs[selectedType]) {
            renderDynamicFields(selectedType);
        }
    }
    
    function clearDynamicFields() {
        dynamicFieldsContainer.innerHTML = '';
    }
    
    function renderDynamicFields(enquiryType) {
        const config = enquiryConfigs[enquiryType];
        
        if (config.fields.length === 0) return;
        
        const fieldContainer = document.createElement('div');
        fieldContainer.className = 'dynamic-field';
        
        const title = document.createElement('h3');
        title.textContent = config.title;
        fieldContainer.appendChild(title);
        
        config.fields.forEach(fieldConfig => {
            const fieldGroup = document.createElement('div');
            fieldGroup.className = 'form-group';
            
            const label = document.createElement('label');
            label.textContent = fieldConfig.label;
            if (fieldConfig.required) {
                label.innerHTML += ' *';
            }
            label.setAttribute('for', fieldConfig.id);
            fieldGroup.appendChild(label);
            
            let fieldElement;
            
            if (fieldConfig.type === 'select') {
                fieldElement = document.createElement('select');
                fieldElement.id = fieldConfig.id;
                fieldElement.className = 'form-control';
                if (fieldConfig.required) {
                    fieldElement.required = true;
                }
                
                fieldConfig.options.forEach(option => {
                    const optionElement = document.createElement('option');
                    optionElement.value = option.value;
                    optionElement.textContent = option.text;
                    fieldElement.appendChild(optionElement);
                });
            }
            
            fieldGroup.appendChild(fieldElement);
            
            const errorSpan = document.createElement('span');
            errorSpan.className = 'error-message';
            errorSpan.id = `${fieldConfig.id}Error`;
            fieldGroup.appendChild(errorSpan);
            
            fieldContainer.appendChild(fieldGroup);
        });
        
        dynamicFieldsContainer.appendChild(fieldContainer);
    }
    
    function handleFormSubmit(e) {
        e.preventDefault();
        
        // Reset error messages
        clearErrors();
        
        // Validate form
        if (validateForm()) {
            // Process form submission
            processFormSubmission();
        }
    }
    
    function validateForm() {
        let isValid = true;
        
        // Validate name
        const nameInput = document.getElementById('name');
        if (!nameInput.value.trim()) {
            showError(nameInput, 'nameError', 'Name is required');
            isValid = false;
        } else if (nameInput.value.trim().length < 2) {
            showError(nameInput, 'nameError', 'Name must be at least 2 characters');
            isValid = false;
        } else {
            showSuccess(nameInput);
        }
        
        // Validate email
        const emailInput = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput.value.trim()) {
            showError(emailInput, 'emailError', 'Email is required');
            isValid = false;
        } else if (!emailRegex.test(emailInput.value.trim())) {
            showError(emailInput, 'emailError', 'Please enter a valid email address');
            isValid = false;
        } else {
            showSuccess(emailInput);
        }
        
        // Validate phone (if provided)
        const phoneInput = document.getElementById('phone');
        if (phoneInput.value.trim() && !isValidPhone(phoneInput.value.trim())) {
            showError(phoneInput, 'phoneError', 'Please enter a valid phone number');
            isValid = false;
        } else if (phoneInput.value.trim()) {
            showSuccess(phoneInput);
        }
        
        // Validate enquiry type
        const enquiryType = document.getElementById('enquiryType');
        if (!enquiryType.value) {
            showError(enquiryType, 'enquiryTypeError', 'Please select an enquiry type');
            isValid = false;
        } else {
            showSuccess(enquiryType);
        }
        
        // Validate dynamic fields if any
        const enquiryTypeValue = enquiryType.value;
        if (enquiryTypeValue && enquiryConfigs[enquiryTypeValue]) {
            const config = enquiryConfigs[enquiryTypeValue];
            
            config.fields.forEach(fieldConfig => {
                if (fieldConfig.required) {
                    const field = document.getElementById(fieldConfig.id);
                    if (field && !field.value) {
                        showError(field, `${fieldConfig.id}Error`, `${fieldConfig.label} is required`);
                        isValid = false;
                    } else if (field && field.value) {
                        showSuccess(field);
                    }
                }
            });
        }
        
        return isValid;
    }
    
    function isValidPhone(phone) {
        // Basic phone validation - can be enhanced based on requirements
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
        return phoneRegex.test(phone);
    }
    
    function showError(input, errorElementId, message) {
        input.style.borderColor = '#ff6b6b';
        const errorElement = document.getElementById(errorElementId);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.color = '#ff6b6b';
        }
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
    
    function processFormSubmission() {
        // Show loading state
        const submitBtn = enquiryForm.querySelector('.btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Processing Your Enquiry...';
        submitBtn.disabled = true;
        
        // Simulate API call/processing
        setTimeout(() => {
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Generate and show response
            generateResponse();
            
            // Reset form
            enquiryForm.reset();
            clearDynamicFields();
            clearErrors();
            
            // Track form submission (in a real scenario, this would be analytics)
            console.log('Enquiry form submitted successfully');
        }, 1500);
    }
    
    function generateResponse() {
        const enquiryType = document.getElementById('enquiryType').value;
        let responseContent = '';
        
        if (enquiryType && enquiryConfigs[enquiryType]) {
            const config = enquiryConfigs[enquiryType];
            
            // Check if there's a specific response based on the selected option
            let specificResponseKey = 'default';
            
            if (config.fields.length > 0) {
                const firstField = config.fields[0];
                const fieldValue = document.getElementById(firstField.id)?.value;
                if (fieldValue && config.responses[fieldValue]) {
                    specificResponseKey = fieldValue;
                }
            }
            
            const response = config.responses[specificResponseKey] || config.responses.default;
            
            responseContent = `
                <h3>${response.title}</h3>
                ${response.content}
                <p><strong>Confirmation:</strong> We've sent a copy of this information to your email address.</p>
            `;
        } else {
            // Generic response for other enquiries
            responseContent = `
                <h3>Enquiry Received</h3>
                <p>Thank you for your enquiry! We've received your message and a member of our team will review it and respond within 24 hours.</p>
                <p>If your enquiry is urgent, please call us directly at +27 66 231 0108 during business hours (9am-5pm, Monday-Friday).</p>
            `;
        }
        
        responseDetails.innerHTML = responseContent;
        successModal.style.display = 'flex';
    }
    
    function closeSuccessModal() {
        successModal.style.display = 'none';
    }
    
    // Add scroll animations
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
    const formElements = document.querySelectorAll('.form-group, .btn, .info-card');
    formElements.forEach(el => {
        el.style.animation = 'fadeInUp 0.6s ease forwards';
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });
    
    // Observe response info section
    const responseInfoSection = document.querySelector('.response-info');
    if (responseInfoSection) {
        responseInfoSection.style.animationPlayState = 'paused';
        observer.observe(responseInfoSection);
    }
});