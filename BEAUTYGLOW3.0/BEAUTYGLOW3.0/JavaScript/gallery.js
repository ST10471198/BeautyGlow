// JS/gallery.js
const lightboxTitle = document.getElementById('lightbox-title');

document.addEventListener('DOMContentLoaded', function() {
    // Lightbox functionality
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDesc = document.getElementById('lightbox-desc');
    const lightboxClose = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const viewBtns = document.querySelectorAll('.view-btn');
    const zoomBtn = document.querySelector('.zoom-btn');

    let currentImageIndex = 0;
    const images = Array.from(galleryItems);

    // Filter functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.querySelector('.search-btn');
    const sortSelect = document.getElementById('sortSelect');
    const galleryGrid = document.getElementById('galleryGrid');

    // Comparison slider
    const comparisonSlider = document.getElementById('comparisonSlider');
    const afterImage = document.querySelector('.after');

    // Open lightbox
    function openLightbox(index) {
        const item = images[index];
        const img = item.querySelector('img');
        const title = item.querySelector('.image-overlay p').textContent;
        
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightboxTitle.textContent = title;
        lightboxDesc.textContent = `Premium skincare solution designed to ${title.toLowerCase()}. Formulated with natural ingredients for visible results.`;
        
        currentImageIndex = index;
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    // Close lightbox
    function closeLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Navigate to next image
    function nextImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        openLightbox(currentImageIndex);
    }

    // Navigate to previous image
    function prevImage() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        openLightbox(currentImageIndex);
    }

    // Filter gallery items
    function filterGallery() {
        const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
        const searchTerm = searchInput.value.toLowerCase();
        
        galleryItems.forEach(item => {
            const category = item.dataset.category;
            const name = item.dataset.name.toLowerCase();
            const matchesFilter = activeFilter === 'all' || category === activeFilter;
            const matchesSearch = name.includes(searchTerm);
            
            if (matchesFilter && matchesSearch) {
                item.style.display = 'block';
                item.style.animation = 'fadeIn 0.5s ease forwards';
            } else {
                item.style.display = 'none';
            }
        });

        // Show no results message if needed
        const visibleItems = document.querySelectorAll('.gallery-item[style="display: block"]');
        let noResultsMsg = document.querySelector('.no-results');
        
        if (visibleItems.length === 0) {
            if (!noResultsMsg) {
                noResultsMsg = document.createElement('div');
                noResultsMsg.className = 'no-results';
                noResultsMsg.textContent = 'No products found matching your criteria.';
                galleryGrid.appendChild(noResultsMsg);
            }
        } else if (noResultsMsg) {
            noResultsMsg.remove();
        }
    }

    // Sort gallery items
    function sortGallery() {
        const sortValue = sortSelect.value;
        const itemsArray = Array.from(galleryItems);
        const container = galleryGrid;
        
        itemsArray.sort((a, b) => {
            switch(sortValue) {
                case 'name':
                    return a.dataset.name.localeCompare(b.dataset.name);
                case 'category':
                    return a.dataset.category.localeCompare(b.dataset.category);
                default:
                    return 0;
            }
        });
        
        // Reappend sorted items
        itemsArray.forEach(item => container.appendChild(item));
    }

    // Initialize comparison slider
    function initComparisonSlider() {
        if (comparisonSlider && afterImage) {
            comparisonSlider.addEventListener('input', function() {
                afterImage.style.width = this.value + '%';
            });
        }
    }

    // Event listeners for lightbox
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => openLightbox(index));
    });

    viewBtns.forEach((btn, index) => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            openLightbox(index);
        });
    });

    if (zoomBtn) {
        zoomBtn.addEventListener('click', () => {
            const resultImg = document.querySelector('.result-image img');
            lightboxImg.src = resultImg.src;
            lightboxImg.alt = resultImg.alt;
            lightboxTitle.textContent = 'Customer Results';
            lightboxDesc.textContent = 'Visible transformation after one week of using Beauty Glow products.';
            lightbox.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    }

    lightboxClose.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', prevImage);
    nextBtn.addEventListener('click', nextImage);

    // Close lightbox with escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'ArrowRight') nextImage();
    });

    // Event listeners for filtering and sorting
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            filterGallery();
        });
    });

    searchInput.addEventListener('input', filterGallery);
    searchBtn.addEventListener('click', filterGallery);
    sortSelect.addEventListener('change', sortGallery);

    // Initialize all functionality
    initComparisonSlider();
    
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
    
    // Observe gallery items for animation
    galleryItems.forEach(item => {
        item.style.animationPlayState = 'paused';
        observer.observe(item);
    });
});