// JS/news.js
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const newsContainer = document.getElementById('newsContainer');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.querySelector('.search-btn');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const shareModal = document.getElementById('shareModal');
    const closeModal = document.querySelector('.close');
    const newsletterForm = document.getElementById('newsletterForm');
    const newsletterMessage = document.getElementById('newsletterMessage');

    // Sample additional articles data
    const additionalArticles = [
    {
        title: "Summer Skincare Routine Tips for Healthy Skin",
        date: "2025-07-15",
        category: "tips",
        readTime: "5 min read",
        content: "Discover how to adapt your skincare routine for the summer months to protect your skin from sun damage while maintaining optimal hydration and preventing breakouts.",
        image: "Images/placeholder-summer.jpg",
        alt: "Summer skincare routine with Beauty Glow products"
    },
    {
        title: "Our Commitment to Sustainable Skincare Packaging",
        date: "2025-06-20",
        category: "updates",
        readTime: "4 min read",
        content: "Learn about our new eco-friendly packaging initiatives and how we're reducing our environmental footprint while delivering premium skincare solutions.",
        image: "Images/placeholder-packaging.jpg",
        alt: "Beauty Glow sustainable skincare packaging"
    },
    {
        title: "The Science Behind Our Skincare Formulations",
        date: "2025-05-10",
        category: "tips",
        readTime: "6 min read",
        content: "A deep dive into the scientific research and clinical testing that goes into every Beauty Glow product to ensure effectiveness and safety.",
        image: "Images/placeholder-science.jpg",
        alt: "Scientific research behind Beauty Glow formulations"
    },
    {
        title: "Winter Skincare Essentials for Radiant Skin",
        date: "2025-04-05",
        category: "tips",
        readTime: "4 min read",
        content: "Keep your skin glowing through the colder months with our essential winter skincare tips and product recommendations for maintaining hydration.",
        image: "Images/placeholder-winter.jpg",
        alt: "Winter skincare essentials from Beauty Glow"
    }
];

// Update the createArticleElement function to use proper alt text
function createArticleElement(articleData) {
    const article = document.createElement('article');
    article.className = 'news-article';
    article.dataset.category = articleData.category;
    article.dataset.date = articleData.date;

    article.innerHTML = `
        <div class="article-header">
            <h2>${articleData.title}</h2>
            <div class="article-meta">
                <span class="date">${formatDate(articleData.date)}</span>
                <span class="category">${getCategoryName(articleData.category)}</span>
                <span class="read-time">${articleData.readTime}</span>
            </div>
        </div>
        
        <div class="article-content">
            <div class="text-content">
                <p>${articleData.content}</p>
                <div class="article-actions">
                    <button class="read-more-btn">Read More</button>
                    <button class="share-btn">Share</button>
                </div>
            </div>
            <div class="image-content">
                <img src="${articleData.image}" alt="${articleData.alt}" class="product-image">
                <p class="image-caption">${articleData.title}</p>
            </div>
        </div>

        <div class="article-expanded">
            <div class="expanded-content">
                <h3>Additional Skincare Information</h3>
                <p>This is expanded content for ${articleData.title}. In a real application, this would contain detailed information about the skincare topic with expert insights and recommendations.</p>
                <p>More details, scientific research, and additional skincare insights would be included here to provide comprehensive information to our readers seeking the best for their skin health.</p>
                <button class="collapse-btn">Show Less</button>
            </div>
        </div>
    `;

    return article;
}

    let currentArticles = Array.from(document.querySelectorAll('.news-article'));
    let currentFilter = 'all';
    let currentSearch = '';
    let loadedArticles = 2; // Start with 2 articles already in HTML

    // Expand/Collapse Articles
    function initArticleExpansion() {
        const readMoreBtns = document.querySelectorAll('.read-more-btn');
        const collapseBtns = document.querySelectorAll('.collapse-btn');

        readMoreBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const article = this.closest('.news-article');
                const expandedContent = article.querySelector('.article-expanded');
                
                expandedContent.classList.toggle('active');
                this.textContent = expandedContent.classList.contains('active') ? 'Show Less' : 'Read More';
            });
        });

        collapseBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const expandedContent = this.closest('.article-expanded');
                const readMoreBtn = expandedContent.closest('.news-article').querySelector('.read-more-btn');
                
                expandedContent.classList.remove('active');
                readMoreBtn.textContent = 'Read More';
            });
        });
    }

    // Share functionality
    function initShareButtons() {
        const shareBtns = document.querySelectorAll('.share-btn');
        const shareOptions = document.querySelectorAll('.share-option');

        shareBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const article = this.closest('.news-article');
                const title = article.querySelector('h2, h3').textContent;
                openShareModal(title);
            });
        });

        shareOptions.forEach(option => {
            option.addEventListener('click', function() {
                const platform = this.classList[1];
                shareArticle(platform);
            });
        });
    }

    function openShareModal(title) {
        shareModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        shareModal.dataset.shareTitle = title;
    }

    function closeShareModal() {
        shareModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    function shareArticle(platform) {
        const title = shareModal.dataset.shareTitle;
        const url = window.location.href;
        
        let shareUrl = '';
        switch(platform) {
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                break;
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
                break;
            case 'linkedin':
                shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
                break;
            case 'copy':
                navigator.clipboard.writeText(url).then(() => {
                    alert('Link copied to clipboard!');
                });
                closeShareModal();
                return;
        }
        
        window.open(shareUrl, '_blank');
        closeShareModal();
    }

    // Filter and Search functionality
    function filterArticles() {
        const searchTerm = searchInput.value.toLowerCase();
        
        currentArticles.forEach(article => {
            const category = article.dataset.category;
            const title = article.querySelector('h2, h3').textContent.toLowerCase();
            const content = article.querySelector('.text-content p').textContent.toLowerCase();
            
            const matchesFilter = currentFilter === 'all' || category === currentFilter;
            const matchesSearch = searchTerm === '' || title.includes(searchTerm) || content.includes(searchTerm);
            
            if (matchesFilter && matchesSearch) {
                article.style.display = 'block';
                article.style.animation = 'fadeInUp 0.5s ease forwards';
            } else {
                article.style.display = 'none';
            }
        });

        // Show no results message if needed
        const visibleArticles = document.querySelectorAll('.news-article[style="display: block"]');
        let noResultsMsg = document.querySelector('.no-results');
        
        if (visibleArticles.length === 0) {
            if (!noResultsMsg) {
                noResultsMsg = document.createElement('div');
                noResultsMsg.className = 'no-results';
                noResultsMsg.textContent = 'No articles found matching your criteria.';
                newsContainer.appendChild(noResultsMsg);
            }
        } else if (noResultsMsg) {
            noResultsMsg.remove();
        }
    }

    // Load more articles
    function loadMoreArticles() {
        loadMoreBtn.disabled = true;
        loadMoreBtn.textContent = 'Loading...';

        // Simulate API call delay
        setTimeout(() => {
            const articlesToLoad = additionalArticles.slice(loadedArticles, loadedArticles + 2);
            
            if (articlesToLoad.length === 0) {
                loadMoreBtn.style.display = 'none';
                return;
            }

            articlesToLoad.forEach(articleData => {
                const articleElement = createArticleElement(articleData);
                newsContainer.appendChild(articleElement);
                currentArticles.push(articleElement);
            });

            loadedArticles += articlesToLoad.length;
            
            if (loadedArticles >= additionalArticles.length + 2) {
                loadMoreBtn.style.display = 'none';
            } else {
                loadMoreBtn.disabled = false;
                loadMoreBtn.textContent = 'Load More Articles';
            }

            // Reinitialize event listeners for new articles
            initArticleExpansion();
            initShareButtons();
            filterArticles();
        }, 1000);
    }

    function createArticleElement(articleData) {
        const article = document.createElement('article');
        article.className = 'news-article';
        article.dataset.category = articleData.category;
        article.dataset.date = articleData.date;

        article.innerHTML = `
            <div class="article-header">
                <h3>${articleData.title}</h3>
                <div class="article-meta">
                    <span class="date">${formatDate(articleData.date)}</span>
                    <span class="category">${getCategoryName(articleData.category)}</span>
                    <span class="read-time">${articleData.readTime}</span>
                </div>
            </div>
            
            <div class="article-content">
                <div class="text-content">
                    <p>${articleData.content}</p>
                    <div class="article-actions">
                        <button class="read-more-btn">Read More</button>
                        <button class="share-btn">Share</button>
                    </div>
                </div>
                <div class="image-content">
                    <img src="${articleData.image}" alt="${articleData.title}" class="product-image">
                    <p class="image-caption">${articleData.title}</p>
                </div>
            </div>

            <div class="article-expanded">
                <div class="expanded-content">
                    <h4>Additional Information</h4>
                    <p>This is expanded content for ${articleData.title}. In a real application, this would contain detailed information about the topic.</p>
                    <p>More details, specifications, and additional insights would be included here to provide comprehensive information to our readers.</p>
                    <button class="collapse-btn">Show Less</button>
                </div>
            </div>
        `;

        return article;
    }

    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }

    function getCategoryName(category) {
        const categories = {
            'launch': 'Product Launch',
            'tips': 'Skincare Tips',
            'updates': 'Company Updates'
        };
        return categories[category] || 'News';
    }

    // Newsletter subscription
    function initNewsletter() {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('newsletterEmail').value.trim();
            
            if (validateEmail(email)) {
                submitNewsletter(email);
            } else {
                showNewsletterMessage('Please enter a valid email address.', 'error');
            }
        });
    }

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function submitNewsletter(email) {
        const submitBtn = newsletterForm.querySelector('button');
        const originalText = submitBtn.textContent;
        
        submitBtn.disabled = true;
        submitBtn.textContent = 'Subscribing...';

        // Simulate API call
        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
            
            showNewsletterMessage(`Thank you for subscribing with ${email}! You'll receive our next newsletter.`, 'success');
            newsletterForm.reset();
        }, 1500);
    }

    function showNewsletterMessage(message, type) {
        newsletterMessage.textContent = message;
        newsletterMessage.className = 'newsletter-message ' + type;
        
        setTimeout(() => {
            newsletterMessage.textContent = '';
            newsletterMessage.className = 'newsletter-message';
        }, 5000);
    }

    // Event listeners
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.dataset.filter;
            filterArticles();
        });
    });

    searchInput.addEventListener('input', filterArticles);
    searchBtn.addEventListener('click', filterArticles);
    loadMoreBtn.addEventListener('click', loadMoreArticles);
    closeModal.addEventListener('click', closeShareModal);

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === shareModal) {
            closeShareModal();
        }
    });

    // Close modal with escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && shareModal.style.display === 'flex') {
            closeShareModal();
        }
    });

    // Initialize all functionality
    initArticleExpansion();
    initShareButtons();
    initNewsletter();
    
    // Add intersection observer for animations
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
    
    // Observe articles for animation
    currentArticles.forEach(article => {
        article.style.animationPlayState = 'paused';
        observer.observe(article);
    });
});