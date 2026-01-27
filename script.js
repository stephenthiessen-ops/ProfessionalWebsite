// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Add active state to navigation on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Contact Form Handling
document.getElementById('contact-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitBtn = this.querySelector('.submit-btn');
    const statusDiv = document.getElementById('form-status');
    const formData = new FormData(this);
    
    // Disable submit button
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    statusDiv.style.display = 'none';
    
    // Using Formspree (you'll need to sign up for a free account)
    // Alternative: Use EmailJS, Netlify Forms, or your own backend
    const formspreeEndpoint = 'https://formspree.io/f/YOUR_FORM_ID'; // Replace with your Formspree ID
    
    try {
        const response = await fetch(formspreeEndpoint, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            statusDiv.className = 'form-status success';
            statusDiv.textContent = 'Thank you for your message! I\'ll get back to you soon.';
            statusDiv.style.display = 'block';
            this.reset();
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        statusDiv.className = 'form-status error';
        statusDiv.textContent = 'Oops! There was a problem sending your message. Please try emailing me directly.';
        statusDiv.style.display = 'block';
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
    }
});

// LinkedIn RSS Feed Integration
async function loadLinkedInPosts() {
    const blogGrid = document.getElementById('blog-grid');
    
    // LinkedIn RSS feed URL (replace YOUR_PROFILE with your LinkedIn username)
    // Note: LinkedIn's RSS feeds are limited. You may need to use a service like RSS2JSON
    const linkedInUsername = 'stephen-thiessen'; // Replace with your actual username
    const rssUrl = `https://www.linkedin.com/in/${linkedInUsername}/recent-activity/`;
    
    // Using RSS2JSON API (free tier available)
    const rss2jsonUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;
    
    try {
        const response = await fetch(rss2jsonUrl);
        const data = await response.json();
        
        if (data.status === 'ok' && data.items && data.items.length > 0) {
            blogGrid.innerHTML = '';
            
            // Display up to 6 most recent posts
            data.items.slice(0, 6).forEach(item => {
                const date = new Date(item.pubDate);
                const formattedDate = date.toLocaleDateString('en-US', { 
                    month: 'long', 
                    year: 'numeric' 
                });
                
                const article = document.createElement('article');
                article.className = 'blog-card';
                article.innerHTML = `
                    <div class="blog-date">${formattedDate}</div>
                    <h3>${item.title}</h3>
                    <p>${item.description ? item.description.substring(0, 150) + '...' : 'Read more on LinkedIn'}</p>
                    <a href="${item.link}" class="read-more" target="_blank">Read on LinkedIn →</a>
                `;
                blogGrid.appendChild(article);
            });
        } else {
            // Fallback if RSS feed fails - show manual posts
            showFallbackPosts();
        }
    } catch (error) {
        console.error('Error loading LinkedIn posts:', error);
        showFallbackPosts();
    }
}

// Fallback posts if LinkedIn RSS fails
function showFallbackPosts() {
    const blogGrid = document.getElementById('blog-grid');
    blogGrid.innerHTML = `
        <article class="blog-card">
            <div class="blog-date">Recent</div>
            <h3>Building Operating Systems That Scale</h3>
            <p>
                How to create frameworks and processes that grow with your organization. 
                Key principles for designing systems that maintain clarity as complexity increases.
            </p>
            <a href="https://www.linkedin.com/in/stephen-thiessen" class="read-more" target="_blank">Read on LinkedIn →</a>
        </article>
        <article class="blog-card">
            <div class="blog-date">Recent</div>
            <h3>From Strategy to Execution: Bridging the Gap</h3>
            <p>
                Practical approaches to turning strategic vision into tangible outcomes. 
                How to align teams and maintain momentum through implementation.
            </p>
            <a href="https://www.linkedin.com/in/stephen-thiessen" class="read-more" target="_blank">Read on LinkedIn →</a>
        </article>
        <article class="blog-card">
            <div class="blog-date">Recent</div>
            <h3>AI Integration in Modern Operations</h3>
            <p>
                How organizations can responsibly integrate AI into their operations—not just as a feature, 
                but as a tool for better decision-making and execution at scale.
            </p>
            <a href="https://www.linkedin.com/in/stephen-thiessen" class="read-more" target="_blank">Read on LinkedIn →</a>
        </article>
    `;
}

// Load blog posts when page loads
document.addEventListener('DOMContentLoaded', () => {
    loadLinkedInPosts();
    
    // Optional: Add animation to blog cards
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe blog cards as they're created
    setTimeout(() => {
        const blogCards = document.querySelectorAll('.blog-card');
        blogCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
            observer.observe(card);
        });
    }, 100);
});
