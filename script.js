// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation state on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = 'var(--color-primary)';
        }
    });
});

// LinkedIn Articles Feed
async function loadLinkedInArticles() {
    const articlesGrid = document.getElementById('articles-grid');
    
    // LinkedIn username
    const username = 'stephenthiessen';
    
    // Try multiple methods to fetch articles
    try {
        // Method 1: Try RSS2JSON (may or may not work)
        await tryRSS2JSON(username, articlesGrid);
    } catch (error) {
        console.log('RSS2JSON failed, using fallback');
        showFallbackArticles(articlesGrid);
    }
}

async function tryRSS2JSON(username, container) {
    const rssUrl = `https://www.linkedin.com/in/${username}/recent-activity/`;
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;
    
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    if (data.status === 'ok' && data.items && data.items.length > 0) {
        container.innerHTML = '';
        
        data.items.slice(0, 6).forEach((item, index) => {
            const date = new Date(item.pubDate);
            const formattedDate = date.toLocaleDateString('en-US', { 
                month: 'short',
                day: 'numeric',
                year: 'numeric' 
            });
            
            const description = item.description 
                ? stripHtml(item.description).substring(0, 180) + '...'
                : 'Read the full article on LinkedIn';
            
            const article = createArticleCard(
                formattedDate,
                item.title,
                description,
                item.link,
                index
            );
            
            container.appendChild(article);
        });
    } else {
        throw new Error('No articles found');
    }
}

function showFallbackArticles(container) {
    container.innerHTML = '';
    
    const fallbackArticles = [
        {
            date: 'Recent',
            title: 'The AI-Enabled Operating Stack™',
            description: 'Are you embedding AI into execution systems — or layering it on top?',
            url: 'https://www.linkedin.com/feed/update/urn:li:activity:7423033688734556161/?originTrackingId=GjI9ulsb6lizU6EbP1D%2B9Q%3D%3D'
        },
        {
            date: 'Recent',
            title: 'Designing Decision Pathways: Who Decides What, At What Altitude, and Why It Speeds Everything Up',
            description: 'Organizations that scale well don’t just empower teams.They design how decisions flow.',
            url: 'https://www.linkedin.com/pulse/designing-decision-pathways-who-decides-what-altitude-stephen-4lmgf/?trackingId=oKaSm97Z8dfVUHZIIrp4pw%3D%3D'
        },
        {
            date: 'Recent',
            title: 'The Operating System of Adaptability',
            description: 'Tomorrow’s program and portfolio leaders will look less like coordinators and more like system architects.',
            url: 'https://www.linkedin.com/pulse/operating-system-adaptability-stephen-thiessen-mba-pmp-asam-pilde/'
        },
        {
            date: 'Recent',
            title: 'The Trust Layer — Building Psychological Safety in a Data-Driven Organization',
            description: 'Data can expose the truth — but only trust lets people talk about it.',
            url: 'https://www.linkedin.com/pulse/trust-layer-building-psychological-safety-data-driven-stephen-lcxqe/'
        },
         {
            date: 'Recent',
            title: 'The Metric Layer: Turning Data Into Organizational Intelligence',
            description: 'The metric layer transforms scattered data into organizational intelligence — enabling leaders to sense, decide, and adapt continuously.',
            url: 'https://www.linkedin.com/pulse/metric-layer-turning-data-organizational-intelligence-stephen-kegxe/?trackingId=ODdXnh3tQAeMPHFGjwwH3w%3D%3D'
        },
         {
            date: 'Recent',
            title: 'Organizational Agility — Scaling Without Chaos',
            description: 'Agility isn’t a methodology or a framework. It’s an organizational capability — the ability to sense change, adapt quickly, and still deliver consistently.',
            url: 'https://www.linkedin.com/pulse/organizational-agility-scaling-without-chaos-stephen-x9eie/'
        }
    ];
    
    fallbackArticles.forEach((article, index) => {
        const card = createArticleCard(
            article.date,
            article.title,
            article.description,
            article.url,
            index
        );
        container.appendChild(card);
    });
}

function createArticleCard(date, title, description, url, index) {
    const article = document.createElement('article');
    article.className = 'article-card';
    article.style.opacity = '0';
    article.style.transform = 'translateY(20px)';
    
    article.innerHTML = `
        <div class="article-date">${date}</div>
        <h3>${title}</h3>
        <p>${description}</p>
        <a href="${url}" class="article-link" target="_blank">
            Read on LinkedIn →
        </a>
    `;
    
    // Animate in
    setTimeout(() => {
        article.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        article.style.opacity = '1';
        article.style.transform = 'translateY(0)';
    }, index * 100);
    
    return article;
}

function stripHtml(html) {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadLinkedInArticles();
});
