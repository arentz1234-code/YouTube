// ===== Andrew Rentz - Aviation Content Creator =====

// YouTube API Configuration
const YOUTUBE_API_KEY = 'AIzaSyBGmol2j-ojhCDF01e9V6EUCn4eOQiMMwA';
const YOUTUBE_CHANNEL_ID = 'UCiJ7ASrsSfJbTAcF1VLV6nA';

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

// ===== Format relative time =====
function timeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    const intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60
    };

    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
        const interval = Math.floor(seconds / secondsInUnit);
        if (interval >= 1) {
            return `${interval} ${unit}${interval > 1 ? 's' : ''} ago`;
        }
    }
    return 'Just now';
}

// ===== Format duration from ISO 8601 =====
function formatDuration(isoDuration) {
    const match = isoDuration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    if (!match) return '0:00';

    const hours = parseInt(match[1]) || 0;
    const minutes = parseInt(match[2]) || 0;
    const seconds = parseInt(match[3]) || 0;

    if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// ===== Fetch YouTube Channel Stats =====
async function fetchYouTubeStats() {
    try {
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${YOUTUBE_CHANNEL_ID}&key=${YOUTUBE_API_KEY}`
        );
        const data = await response.json();

        if (data.items && data.items.length > 0) {
            return data.items[0].statistics;
        }
    } catch (error) {
        console.error('Error fetching YouTube stats:', error);
    }
    return null;
}

// ===== Fetch YouTube Popular Videos =====
async function fetchYouTubeVideos() {
    try {
        // First get video IDs from channel
        const searchResponse = await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${YOUTUBE_CHANNEL_ID}&maxResults=6&order=viewCount&type=video&key=${YOUTUBE_API_KEY}`
        );
        const searchData = await searchResponse.json();

        if (!searchData.items || searchData.items.length === 0) {
            return [];
        }

        // Get video IDs
        const videoIds = searchData.items.map(item => item.id.videoId).join(',');

        // Fetch video details (for view counts and duration)
        const videosResponse = await fetch(
            `https://www.googleapis.com/youtube/v3/videos?part=statistics,contentDetails,snippet&id=${videoIds}&key=${YOUTUBE_API_KEY}`
        );
        const videosData = await videosResponse.json();

        return videosData.items.map(video => ({
            id: video.id,
            title: video.snippet.title,
            thumbnail: video.snippet.thumbnails.high?.url || video.snippet.thumbnails.medium?.url,
            views: parseInt(video.statistics.viewCount),
            duration: formatDuration(video.contentDetails.duration),
            date: timeAgo(video.snippet.publishedAt),
            url: `https://www.youtube.com/watch?v=${video.id}`
        }));
    } catch (error) {
        console.error('Error fetching YouTube videos:', error);
    }
    return [];
}

// ===== Render Videos =====
function renderVideos(videos) {
    const container = document.getElementById('videos-container');
    if (!container) return;

    if (videos.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--gray-500);">Loading videos...</p>';
        return;
    }

    container.innerHTML = videos.map(video => `
        <article class="video-card" onclick="window.open('${video.url}', '_blank')">
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

    // Re-observe for animations
    document.querySelectorAll('.video-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
}

// ===== Instagram followers count (for hero stats) =====
const instagramFollowers = 8750;

// ===== Update Hero Stats =====
async function updateHeroStats() {
    const stats = await fetchYouTubeStats();

    const subsEl = document.getElementById('hero-subs');
    const followersEl = document.getElementById('hero-followers');
    const viewsEl = document.getElementById('hero-views');

    if (stats) {
        if (subsEl) animateCounter(subsEl, parseInt(stats.subscriberCount));
        if (viewsEl) animateCounter(viewsEl, parseInt(stats.viewCount));
    }

    // Instagram followers
    if (followersEl) animateCounter(followersEl, instagramFollowers);
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

// ===== Initialize =====
async function init() {
    // Fetch and display YouTube data
    const videos = await fetchYouTubeVideos();
    renderVideos(videos);

    // Update stats with animation
    await updateHeroStats();

    // Observe elements for animations
    document.querySelectorAll('.product-card, .insta-post').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
}

// Start the app
document.addEventListener('DOMContentLoaded', init);

// ===== Console Message =====
console.log('%c Andrew Rentz ', 'background: #1a56db; color: white; font-size: 18px; padding: 8px 16px; border-radius: 6px; font-weight: bold;');
console.log('%c Aviation Content Creator ', 'color: #6b7280; font-size: 12px;');
