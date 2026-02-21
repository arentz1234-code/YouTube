// ===== GolfCoast Pilot - Interactive Social Hub =====

// Configuration - Replace with your actual data
const CONFIG = {
    youtube: {
        channelId: 'golfcoastpilot',
        apiKey: '', // Add your YouTube API key here for live data
    },
    instagram: {
        username: 'golfcoastpilot',
        accessToken: '', // Add Instagram access token for live data
    }
};

// ===== Custom Cursor =====
const cursor = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX - 10 + 'px';
    cursor.style.top = e.clientY - 10 + 'px';
});

document.querySelectorAll('a, button, .video-card, .insta-post, .stat-card').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('active'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
});

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
        const sectionHeight = section.clientHeight;
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

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// ===== Intersection Observer for Stats Animation =====
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.counter');
            counters.forEach(counter => {
                const target = parseInt(counter.dataset.target);
                animateCounter(counter, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// ===== Fetch YouTube Data =====
async function fetchYouTubeData() {
    // Demo data - Replace with actual API call when you have an API key
    const demoData = {
        subscriberCount: 15400,
        viewCount: 2340000,
        videoCount: 127,
        videos: [
            {
                id: 'video1',
                title: 'Epic Gulf Coast Sunset Flight - 4K Cockpit View',
                thumbnail: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800&h=450&fit=crop',
                views: 245000,
                duration: '18:32',
                publishedAt: '2 weeks ago'
            },
            {
                id: 'video2',
                title: 'Learning to Fly: My First Solo Flight Experience',
                thumbnail: 'https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=800&h=450&fit=crop',
                views: 189000,
                duration: '24:15',
                publishedAt: '1 month ago'
            },
            {
                id: 'video3',
                title: 'Cessna 172 Complete Pre-Flight Checklist Tutorial',
                thumbnail: 'https://images.unsplash.com/photo-1559628376-f3fe5f782a2e?w=800&h=450&fit=crop',
                views: 156000,
                duration: '12:48',
                publishedAt: '3 weeks ago'
            },
            {
                id: 'video4',
                title: 'Flying Through Weather: IFR Training Day',
                thumbnail: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=450&fit=crop',
                views: 134000,
                duration: '21:07',
                publishedAt: '1 month ago'
            },
            {
                id: 'video5',
                title: 'Beach Landing! Exploring Remote Airstrips',
                thumbnail: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=800&h=450&fit=crop',
                views: 112000,
                duration: '15:33',
                publishedAt: '2 months ago'
            },
            {
                id: 'video6',
                title: 'Night Flying Over the City - Beautiful Lights',
                thumbnail: 'https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?w=800&h=450&fit=crop',
                views: 98000,
                duration: '19:22',
                publishedAt: '2 months ago'
            }
        ]
    };

    // If you have a YouTube API key, uncomment and use this code:
    /*
    if (CONFIG.youtube.apiKey) {
        try {
            // Fetch channel stats
            const channelResponse = await fetch(
                `https://www.googleapis.com/youtube/v3/channels?part=statistics&forUsername=${CONFIG.youtube.channelId}&key=${CONFIG.youtube.apiKey}`
            );
            const channelData = await channelResponse.json();

            // Fetch popular videos
            const videosResponse = await fetch(
                `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelData.items[0].id}&order=viewCount&maxResults=6&key=${CONFIG.youtube.apiKey}`
            );
            const videosData = await videosResponse.json();

            // Process and return data
            // ...
        } catch (error) {
            console.error('Error fetching YouTube data:', error);
        }
    }
    */

    return demoData;
}

// ===== Fetch Instagram Data =====
async function fetchInstagramData() {
    // Demo data - Replace with actual API call when you have access token
    const demoData = {
        followerCount: 8750,
        posts: [
            {
                id: 'post1',
                image: 'https://images.unsplash.com/photo-1559628376-f3fe5f782a2e?w=400&h=400&fit=crop',
                likes: 1243,
                comments: 89,
                link: 'https://instagram.com/golfcoastpilot'
            },
            {
                id: 'post2',
                image: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=400&h=400&fit=crop',
                likes: 2156,
                comments: 124,
                link: 'https://instagram.com/golfcoastpilot'
            },
            {
                id: 'post3',
                image: 'https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=400&h=400&fit=crop',
                likes: 987,
                comments: 56,
                link: 'https://instagram.com/golfcoastpilot'
            },
            {
                id: 'post4',
                image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&h=400&fit=crop',
                likes: 1534,
                comments: 78,
                link: 'https://instagram.com/golfcoastpilot'
            },
            {
                id: 'post5',
                image: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=400&h=400&fit=crop',
                likes: 876,
                comments: 45,
                link: 'https://instagram.com/golfcoastpilot'
            },
            {
                id: 'post6',
                image: 'https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?w=400&h=400&fit=crop',
                likes: 1102,
                comments: 67,
                link: 'https://instagram.com/golfcoastpilot'
            }
        ]
    };

    // If you have Instagram access token, use the Instagram Basic Display API
    /*
    if (CONFIG.instagram.accessToken) {
        try {
            const response = await fetch(
                `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&access_token=${CONFIG.instagram.accessToken}`
            );
            const data = await response.json();
            // Process and return data
        } catch (error) {
            console.error('Error fetching Instagram data:', error);
        }
    }
    */

    return demoData;
}

// ===== Render YouTube Videos =====
function renderVideos(videos) {
    const container = document.getElementById('videos-container');

    container.innerHTML = videos.slice(0, 6).map(video => `
        <div class="video-card" onclick="window.open('https://youtube.com/@golfcoastpilot', '_blank')">
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
                    <span><i class="fas fa-clock"></i> ${video.publishedAt}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// ===== Render Instagram Posts =====
function renderInstagramPosts(posts) {
    const container = document.getElementById('instagram-container');

    container.innerHTML = posts.map(post => `
        <a href="${post.link}" target="_blank" class="insta-post">
            <img src="${post.image}" alt="Instagram post" loading="lazy">
            <div class="insta-overlay">
                <span class="insta-stat"><i class="fas fa-heart"></i> ${formatNumber(post.likes)}</span>
                <span class="insta-stat"><i class="fas fa-comment"></i> ${formatNumber(post.comments)}</span>
            </div>
        </a>
    `).join('');
}

// ===== Update Stats Display =====
function updateStats(youtubeData, instagramData) {
    // Update YouTube subscribers
    const youtubeSubs = document.querySelector('#youtube-subs .counter');
    youtubeSubs.dataset.target = youtubeData.subscriberCount;

    // Update Instagram followers
    const instaFollowers = document.querySelector('#instagram-followers .counter');
    instaFollowers.dataset.target = instagramData.followerCount;

    // Update total views
    const totalViews = document.querySelector('#total-views .counter');
    totalViews.dataset.target = youtubeData.viewCount;

    // Update video count
    const videoCount = document.querySelector('#total-videos .counter');
    videoCount.dataset.target = youtubeData.videoCount;

    // Update badges
    document.getElementById('youtube-growth').textContent = '+2.3% this month';
    document.getElementById('instagram-engagement').textContent = '4.8% engagement';
}

// ===== Newsletter Form =====
const newsletterForm = document.getElementById('newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = e.target.querySelector('input[type="email"]').value;

        // Add your newsletter signup logic here
        console.log('Newsletter signup:', email);

        // Show success message
        const button = e.target.querySelector('button');
        const originalHTML = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i>';
        button.style.background = '#4ade80';

        setTimeout(() => {
            button.innerHTML = originalHTML;
            button.style.background = '';
            e.target.reset();
        }, 2000);
    });
}

// ===== Mobile Menu Toggle =====
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');

        // Toggle menu icon
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });
}

// ===== Parallax Effect on Hero =====
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');

    if (hero && heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});

// ===== Tilt Effect on Cards =====
function addTiltEffect(element) {
    element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });

    element.addEventListener('mouseleave', () => {
        element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
}

// Apply tilt effect to stat cards
document.querySelectorAll('.stat-card').forEach(addTiltEffect);

// ===== Typing Effect for Tagline =====
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// ===== Initialize =====
async function init() {
    try {
        // Fetch social media data
        const youtubeData = await fetchYouTubeData();
        const instagramData = await fetchInstagramData();

        // Update stats
        updateStats(youtubeData, instagramData);

        // Render content
        renderVideos(youtubeData.videos);
        renderInstagramPosts(instagramData.posts);

        // Add typing effect to tagline
        const tagline = document.querySelector('.tagline');
        if (tagline) {
            const originalText = tagline.textContent;
            setTimeout(() => {
                typeWriter(tagline, originalText);
            }, 500);
        }

    } catch (error) {
        console.error('Error initializing:', error);
    }
}

// Start the app
document.addEventListener('DOMContentLoaded', init);

// ===== Easter Egg - Konami Code =====
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            // Easter egg activated!
            document.body.style.animation = 'rainbow 2s linear infinite';

            const style = document.createElement('style');
            style.textContent = `
                @keyframes rainbow {
                    0% { filter: hue-rotate(0deg); }
                    100% { filter: hue-rotate(360deg); }
                }
            `;
            document.head.appendChild(style);

            setTimeout(() => {
                document.body.style.animation = '';
                style.remove();
            }, 5000);

            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

// ===== Console Easter Egg =====
console.log('%c GolfCoast Pilot ', 'background: linear-gradient(135deg, #00d4ff, #7c3aed); color: white; font-size: 24px; padding: 10px 20px; border-radius: 10px; font-weight: bold;');
console.log('%c Welcome to the sky! ', 'color: #00d4ff; font-size: 14px;');
