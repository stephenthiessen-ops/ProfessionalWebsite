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
            title: 'Building Operating Systems That Scale',
            description: 'How to create frameworks and processes that grow with your organization. Key principles for designing systems that maintain clarity as complexity increases.',
            url: 'https://www.linkedin.com/in/stephenthiessen/'
        },
        {
            date: 'Recent',
            title: 'From Strategy to Execution: Bridging the Gap',
            description: 'Practical approaches to turning strategic vision into tangible outcomes. How to align teams and maintain momentum through implementation.',
            url: 'https://www.linkedin.com/in/stephenthiessen/'
        },
        {
            date: 'Recent',
            title: 'AI Integration in Modern Operations',
            description: 'How organizations can responsibly integrate AI into their operations—not just as a feature, but as a tool for better decision-making and execution at scale.',
            url: 'https://www.linkedin.com/in/stephenthiessen/'
        },
        {
            date: 'Recent',
            title: 'The Force Multiplier Effect',
            description: 'What it means to be a force multiplier for leadership teams and how to anticipate problems before they surface.',
            url: 'https://www.linkedin.com/in/stephenthiessen/'
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
