# Modern Website Setup Guide

## Your New Website Features

✨ **Modern, Sleek Design** - Neutral color palette with sophisticated typography  
✨ **Full Headshot Display** - Your professional photo shows completely  
✨ **Clean Footer** - Just LinkedIn and email, no contact form  
✨ **Article Feed** - Automatic LinkedIn article integration  

---

## Quick Deployment to GitHub Pages

### Step 1: Create GitHub Repository

1. Go to https://github.com and sign in (or create a free account)
2. Click the **"+"** icon → **"New repository"**
3. Name it: `stephenthiessen.github.io` (use your GitHub username)
4. Make it **Public**
5. Click **"Create repository"**

### Step 2: Upload Files

Upload these 4 files to your repository:
- `index.html`
- `styles.css`
- `script.js`
- `profile.jpg` (your headshot)

**How to upload:**
1. In your repository, click **"uploading an existing file"**
2. Drag all 4 files or click to select them
3. Add commit message: "Initial website"
4. Click **"Commit changes"**

### Step 3: Enable GitHub Pages

1. In your repository, click **"Settings"** (top menu)
2. Click **"Pages"** in the left sidebar
3. Under **"Source"**, select:
   - Branch: **main**
   - Folder: **/ (root)**
4. Click **"Save"**

### Step 4: Wait & Access

Your site will be live in 5-10 minutes at:
```
https://stephenthiessen.github.io
```
(Replace with your actual GitHub username)

---

## LinkedIn Article Integration

### How It Works

The website automatically attempts to pull your LinkedIn articles using RSS2JSON. 

**Current Setup:**
- Username configured: `stephenthiessen`
- Tries to fetch your 6 most recent posts
- Falls back to example articles if automatic fetch fails

### If Automatic Feed Doesn't Work

LinkedIn's RSS feeds are inconsistent. If articles don't load automatically:

**Option 1: Manual Update (Simplest)**

Edit `script.js` and update the `fallbackArticles` array (around line 75):

```javascript
const fallbackArticles = [
    {
        date: 'Jan 15, 2026',
        title: 'Your Actual Article Title',
        description: 'Brief description of your article (150-180 characters)',
        url: 'https://www.linkedin.com/pulse/your-article-url'
    },
    // Add more articles here
];
```

**Option 2: Use a JSON File**

1. Create a `articles.json` file:
```json
{
  "articles": [
    {
      "date": "Jan 15, 2026",
      "title": "Your Article Title",
      "description": "Article description",
      "url": "https://linkedin.com/pulse/..."
    }
  ]
}
```

2. Modify the fetch code in `script.js` to read from this file instead

**Option 3: Zapier/IFTTT Automation**

Set up automation to update a Google Sheet when you post, then fetch from that sheet.

---

## Customization Options

### Change Colors

The site uses a sophisticated neutral palette. To customize, edit `styles.css`:

```css
:root {
    --color-primary: #2c2c2c;    /* Main dark text */
    --color-secondary: #4a4a4a;  /* Body text */
    --color-tertiary: #6b6b6b;   /* Muted text */
    --color-accent: #8b8b8b;     /* Accents */
    --color-light: #f5f5f5;      /* Light background */
    --color-white: #ffffff;      /* White */
}
```

**Alternative Color Palettes:**

Warm Neutrals:
```css
--color-primary: #3d3935;
--color-accent: #8a7968;
```

Cool Greys:
```css
--color-primary: #2d3748;
--color-accent: #718096;
```

Modern Dark:
```css
--color-primary: #1a202c;
--color-accent: #4a5568;
```

### Update LinkedIn URL

Already configured to: `https://www.linkedin.com/in/stephenthiessen/`

To change, edit `index.html` (line ~122):
```html
<a href="https://www.linkedin.com/in/YOUR_USERNAME/" ...>
```

### Update Email

Already configured to: `stephen.thiessen@gmail.com`

To change, edit `index.html` (line ~129):
```html
<a href="mailto:your.email@example.com" ...>
```

### Adding New Articles Manually

When you publish a new article:

1. Open `script.js`
2. Find the `fallbackArticles` array
3. Add your new article at the top:
```javascript
{
    date: 'Jan 28, 2026',
    title: 'Your New Article',
    description: 'Description here',
    url: 'https://www.linkedin.com/pulse/your-article'
}
```
4. Commit to GitHub

---

## Using a Custom Domain (Optional)

Want `stephenthiessen.com` instead?

### Purchase Domain
From GoDaddy, Namecheap, Google Domains, etc.

### Configure GitHub Pages
1. Go to Settings → Pages in your repository
2. Enter your custom domain
3. Check "Enforce HTTPS"
4. Save

### Update DNS Records
In your domain registrar, add these A records:
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

Wait 24-48 hours for DNS to propagate.

---

## Testing Locally (Optional)

### Method 1: Double-Click
Just double-click `index.html` to open in your browser

### Method 2: Local Server
```bash
# Python 3
python -m http.server 8000

# Then visit: http://localhost:8000
```

---

## Maintenance

### Updating Your Bio
1. Edit `index.html`
2. Find the About section (around line 42)
3. Update your text
4. Commit changes to GitHub

### Adding Articles
1. Post to LinkedIn
2. Either wait for automatic fetch, or manually add to fallback array
3. Commit changes

### Updating Photo
1. Replace `profile.jpg` in your repository
2. Keep the same filename
3. Recommended: Square format, 800x800px minimum

---

## Troubleshooting

### Site Not Showing
- Wait 10 minutes after first deployment
- Check Settings → Pages is enabled
- Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)

### Photo Not Loading
- Verify file is named exactly `profile.jpg`
- Check it's in the repository root folder
- Try clearing browser cache

### Articles Not Loading
- Check browser console for errors (F12)
- If RSS2JSON fails, use manual fallback method
- Verify LinkedIn username is correct in script

### Updates Not Appearing
- Wait 2-3 minutes after committing
- Hard refresh browser (Ctrl+Shift+R)
- Check GitHub Actions tab for build status

---

## Design Philosophy

This website uses:
- **Minimalist aesthetic** - Clean, uncluttered design
- **Neutral palette** - Professional greys and blacks
- **Generous whitespace** - Easy to read and scan
- **Subtle animations** - Modern without being distracting
- **Mobile-first** - Looks great on all devices

---

## Professional Tips

**Content:**
- Keep your bio updated every 6 months
- Post to LinkedIn regularly (1-2x per week)
- Each article title should be clear and compelling
- Keep descriptions under 180 characters

**SEO:**
- Your name is in the page title
- Consider adding a meta description
- LinkedIn links provide social proof
- Regular content updates improve ranking

**Performance:**
- Site loads fast (no heavy frameworks)
- Images are optimized
- Clean, minimal code
- Hosted on GitHub's fast servers

---

## Support

**Common Resources:**
- GitHub Pages Docs: https://docs.github.com/pages
- Custom Domain Setup: https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site

**Need Help?**
- Check browser console for errors (F12)
- Review this guide's troubleshooting section
- Test locally before deploying

Your professional website is ready to showcase your work!
