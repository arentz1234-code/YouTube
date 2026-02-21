// ===== Andrew Rentz - Aviation Content Creator =====

// ===== Smooth Scroll Navigation =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            document.querySelector('.nav-links')?.classList.remove('active');
        }
    });
});

// ===== Active Nav Link on Scroll =====
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===== Navbar Background on Scroll =====
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'var(--white)';
        navbar.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'rgba(255,255,255,0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// ===== Mobile Menu Toggle =====
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileNavLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileNavLinks.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });
}

// ===== Number Formatting =====
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// ===== Animated Counter =====
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = formatNumber(Math.floor(start));
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = formatNumber(target);
        }
    }

    updateCounter();
}

// ===== Demo Data =====
const socialData = {
    youtube: {
        subscribers: 15400,
        views: 2340000,
        videos: [
            {
                title: 'Epic Gulf Coast Sunset Flight - 4K Cockpit View',
                thumbnail: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800&h=450&fit=crop',
                views: 245000,
                duration: '18:32',
                date: '2 weeks ago'
            },
            {
                title: 'Learning to Fly: My First Solo Flight Experience',
                thumbnail: 'https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=800&h=450&fit=crop',
                views: 189000,
                duration: '24:15',
                date: '1 month ago'
            },
            {
                title: 'Cessna 172 Complete Pre-Flight Checklist',
                thumbnail: 'https://images.unsplash.com/photo-1559628376-f3fe5f782a2e?w=800&h=450&fit=crop',
                views: 156000,
                duration: '12:48',
                date: '3 weeks ago'
            },
            {
                title: 'Flying Through Weather: IFR Training Day',
                thumbnail: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=450&fit=crop',
                views: 134000,
                duration: '21:07',
                date: '1 month ago'
            },
            {
                title: 'Beach Landing! Exploring Remote Airstrips',
                thumbnail: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=800&h=450&fit=crop',
                views: 112000,
                duration: '15:33',
                date: '2 months ago'
            },
            {
                title: 'Night Flying Over the City Lights',
                thumbnail: 'https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?w=800&h=450&fit=crop',
                views: 98000,
                duration: '19:22',
                date: '2 months ago'
            }
        ]
    },
    instagram: {
        followers: 8750,
        posts: [
            { image: 'https://images.unsplash.com/photo-1559628376-f3fe5f782a2e?w=400&h=400&fit=crop', likes: 1243, comments: 89 },
            { image: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=400&h=400&fit=crop', likes: 2156, comments: 124 },
            { image: 'https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=400&h=400&fit=crop', likes: 987, comments: 56 },
            { image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&h=400&fit=crop', likes: 1534, comments: 78 },
            { image: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=400&h=400&fit=crop', likes: 876, comments: 45 },
            { image: 'https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?w=400&h=400&fit=crop', likes: 1102, comments: 67 }
        ]
    }
};

// ===== Render Videos =====
function renderVideos() {
    const container = document.getElementById('videos-container');
    if (!container) return;

    container.innerHTML = socialData.youtube.videos.map(video => `
        <article class="video-card" onclick="window.open('https://youtube.com/@golfcoastpilot', '_blank')">
            <div class="video-thumb">
                <img src="${video.thumbnail}" alt="${video.title}" loading="lazy">
                <div class="video-overlay">
                    <div class="play-btn">
                        <i class="fas fa-play"></i>
                    </div>
                </div>
                <span class="video-duration">${video.duration}</span>
            </div>
            <div class="video-info">
                <h3 class="video-title">${video.title}</h3>
                <div class="video-meta">
                    <span><i class="fas fa-eye"></i> ${formatNumber(video.views)}</span>
                    <span><i class="fas fa-clock"></i> ${video.date}</span>
                </div>
            </div>
        </article>
    `).join('');
}

// ===== Render Instagram Posts =====
function renderInstagram() {
    const container = document.getElementById('instagram-container');
    if (!container) return;

    container.innerHTML = socialData.instagram.posts.map(post => `
        <a href="https://instagram.com/golfcoastpilot" target="_blank" class="insta-post">
            <img src="${post.image}" alt="Instagram post" loading="lazy">
            <div class="insta-overlay">
                <span class="insta-stat"><i class="fas fa-heart"></i> ${formatNumber(post.likes)}</span>
                <span class="insta-stat"><i class="fas fa-comment"></i> ${formatNumber(post.comments)}</span>
            </div>
        </a>
    `).join('');
}

// ===== Update Hero Stats =====
function updateHeroStats() {
    const subsEl = document.getElementById('hero-subs');
    const followersEl = document.getElementById('hero-followers');
    const viewsEl = document.getElementById('hero-views');

    if (subsEl) animateCounter(subsEl, socialData.youtube.subscribers);
    if (followersEl) animateCounter(followersEl, socialData.instagram.followers);
    if (viewsEl) animateCounter(viewsEl, socialData.youtube.views);
}

// ===== Contact Form =====
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const button = contactForm.querySelector('button[type="submit"]');
        const originalText = button.innerHTML;

        button.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        button.style.background = '#10b981';

        setTimeout(() => {
            button.innerHTML = originalText;
            button.style.background = '';
            contactForm.reset();
        }, 3000);
    });
}

// ===== Intersection Observer for Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for fade-in animation
document.querySelectorAll('.video-card, .product-card, .insta-post').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
});

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
    renderVideos();
    renderInstagram();

    // Delay stats animation until hero is visible
    setTimeout(updateHeroStats, 500);

    // Re-observe dynamically loaded elements
    document.querySelectorAll('.video-card, .product-card, .insta-post').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
});

// ===== Console Message =====
console.log('%c Andrew Rentz ', 'background: #1a56db; color: white; font-size: 18px; padding: 8px 16px; border-radius: 6px; font-weight: bold;');
console.log('%c Aviation Content Creator ', 'color: #6b7280; font-size: 12px;');
