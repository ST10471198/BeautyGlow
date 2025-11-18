// JS/about.js
document.addEventListener('DOMContentLoaded', function() {
    // Team Member Modal
    const teamModal = document.getElementById('teamModal');
    const closeModal = document.querySelector('.close');
    const teamMembers = document.querySelectorAll('.team-member');
    const viewProfileBtns = document.querySelectorAll('.view-profile-btn');

    // Team member data with enhanced descriptions
    const teamData = {
        founder: {
            name: "The Founder of Beauty Glow",
            role: "Skincare Visionary Leader",
            bio: "Our founder started Beauty Glow with a passion for natural skincare and a vision to create products that truly make a difference. With years of experience in the beauty industry and a commitment to quality ingredients, they lead our company with innovation and dedication to developing effective skincare solutions that deliver visible results."
        },
        cosmetologist: {
            name: "Our Cosmetologist",
            role: "Beauty & Skincare Expert",
            bio: "Our certified cosmetologist brings extensive knowledge of beauty treatments and skincare formulations to the Beauty Glow team. They ensure our products are not only effective but also provide a luxurious experience for our customers, combining scientific research with beauty expertise to create skincare that truly works."
        },
        dermatologist: {
            name: "Our Dermatologist",
            role: "Skin Health Specialist",
            bio: "Our board-certified dermatologist oversees product development to ensure all Beauty Glow formulations are safe, effective, and backed by scientific research. They specialize in treating various skin conditions and developing targeted solutions that address specific skincare concerns while maintaining skin health and integrity."
        },
        manager: {
            name: "The Manager",
            role: "Skincare Operations Leader",
            bio: "Our operations manager ensures smooth day-to-day functioning of Beauty Glow, coordinating our team to deliver exceptional skincare products and customer service. With expertise in business management and a passion for the beauty industry, they help maintain the high standards that define the Beauty Glow brand experience."
        }
    };

    // Open modal when team member is clicked
    teamMembers.forEach(member => {
        member.addEventListener('click', function(e) {
            if (!e.target.classList.contains('view-profile-btn')) {
                openTeamModal(this.getAttribute('data-member'));
            }
        });
    });

    // Open modal when view profile button is clicked
    viewProfileBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const member = this.closest('.team-member');
            openTeamModal(member.getAttribute('data-member'));
        });
    });

    // Open team modal
    function openTeamModal(memberId) {
        const memberData = teamData[memberId];
        const modalImage = document.getElementById('modalImage');
        const modalName = document.getElementById('modalName');
        const modalRole = document.getElementById('modalRole');
        const modalBio = document.getElementById('modalBio');

        // Set modal content
        const memberImg = document.querySelector(`[data-member="${memberId}"] img`);
        modalImage.src = memberImg.src;
        modalImage.alt = memberImg.alt;
        modalName.textContent = memberData.name;
        modalRole.textContent = memberData.role;
        modalBio.innerHTML = `<p>${memberData.bio}</p>`;

        // Show modal
        teamModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Track modal view (in real scenario, this would be analytics)
        console.log(`Team member profile viewed: ${memberData.name}`);
    }

    // Close modal
    function closeTeamModal() {
        teamModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Event listeners for modal
    closeModal.addEventListener('click', closeTeamModal);
    window.addEventListener('click', function(e) {
        if (e.target === teamModal) {
            closeTeamModal();
        }
    });

    // Animated counter for statistics
    function animateCounter() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const step = target / (duration / 16); // 60fps
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    stat.textContent = target;
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current);
                }
            }, 16);
        });
    }

    // Intersection Observer for animations
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (entry.target.classList.contains('stats-section')) {
                        animateCounter();
                    }
                    entry.target.style.animationPlayState = 'running';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe elements for animation
        const animatedElements = document.querySelectorAll('.timeline-item, .value-card, .team-member, .stats-section');
        animatedElements.forEach(el => {
            el.style.animationPlayState = 'paused';
            observer.observe(el);
        });
    }

    // Timeline hover effects
    function initTimelineInteractions() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        timelineItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.02)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        });
    }

    // Initialize all functionality
    initScrollAnimations();
    initTimelineInteractions();
    
    // Add keyboard support for modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && teamModal.style.display === 'flex') {
            closeTeamModal();
        }
    });
    
    // Add loading state for images
    const imagesToLoad = document.querySelectorAll('img');
    imagesToLoad.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        if (img.complete) {
            img.style.opacity = '1';
        } else {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease';
        }
    });
});