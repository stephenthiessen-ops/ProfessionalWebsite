# Setup Guide for Your Professional Website

## Quick Start Checklist

✅ Upload your professional photo  
✅ Set up contact form service  
✅ Configure LinkedIn blog integration  
✅ Deploy to GitHub Pages  

---

## 1. Adding Your Professional Photo

### Option A: Use a Photo File
1. Choose a professional headshot (square format works best)
2. Name the file `profile.jpg` (or `profile.png`)
3. Upload it to your GitHub repository in the same folder as `index.html`
4. The site will automatically display it

### Option B: Use a Different Filename
If you want to use a different filename:
1. Open `index.html`
2. Find line with `<img src="profile.jpg"`
3. Change `profile.jpg` to your filename (e.g., `headshot.png`)

**Photo Tips:**
- Square aspect ratio (1:1) works best
- Minimum 500x500 pixels recommended
- Professional business attire
- Clean background
- Good lighting

---

## 2. Setting Up the Contact Form

The contact form needs a backend service to send emails. Here are your options:

### Option A: Formspree (Recommended - Easiest)

**Setup:**
1. Go to https://formspree.io
2. Sign up for a free account (50 submissions/month free)
3. Create a new form
4. Copy your form endpoint URL (looks like: `https://formspree.io/f/xwkgjpqr`)
5. Open `script.js`
6. Find this line: `const formspreeEndpoint = 'https://formspree.io/f/YOUR_FORM_ID';`
7. Replace `YOUR_FORM_ID` with your actual form ID

**That's it!** Your form will now send emails to stephen.thiessen@gmail.com

### Option B: EmailJS

**Setup:**
1. Go to https://www.emailjs.com
2. Sign up for free account
3. Follow their setup wizard
4. Replace the form code in `script.js` with EmailJS code (they provide examples)

### Option C: Netlify Forms

**If deploying to Netlify instead of GitHub Pages:**
1. Simply add `netlify` attribute to your form tag in `index.html`
2. Forms automatically work - no other setup needed!

---

## 3. LinkedIn Blog Integration

### Understanding the Setup

The blog section attempts to automatically pull your LinkedIn posts. However, LinkedIn has restrictions on RSS feeds, so here's what you need to know:

### Current Setup
The code uses RSS2JSON service to fetch LinkedIn posts. This works for some profiles but not all.

### Method 1: Try the Automatic Feed (Already Configured)
1. The code already has your username: `stephen-thiessen`
2. When you deploy, the site will attempt to load your posts automatically
3. If it works, great! If not, proceed to Method 2.

### Method 2: Manual Blog Posts (Fallback)
If automatic loading doesn't work, you can manually add posts:

1. Open `script.js`
2. Find the `showFallbackPosts()` function (around line 95)
3. Add your actual LinkedIn post URLs and content
4. Example:
```javascript
<article class="blog-card">
    <div class="blog-date">January 2026</div>
    <h3>Your Article Title Here</h3>
    <p>Brief description of your article (150 characters or less)</p>
    <a href="YOUR_LINKEDIN_POST_URL" class="read-more" target="_blank">Read on LinkedIn →</a>
</article>
```

### Method 3: Use a Custom RSS Solution
For the most reliable automatic updates:
1. Use a service like Zapier or IFTTT
2. Set up automation: "When I post to LinkedIn → Add to Google Sheets"
3. Modify the JavaScript to read from a public Google Sheets CSV
4. (I can help you set this up if you want this approach)

---

## 4. Deploy to GitHub Pages

### Step-by-Step Deployment

1. **Create GitHub Repository**
   - Go to https://github.com and sign in (or create account)
   - Click "New repository"
   - Name: `sthiessen.github.io` (replace `sthiessen` with your username)
   - Set to Public
   - Click "Create repository"

2. **Upload Your Files**
   - Click "uploading an existing file"
   - Upload these files:
     - `index.html`
     - `styles.css`
     - `script.js`
     - `profile.jpg` (your photo)
   - Commit changes

3. **Enable GitHub Pages**
   - Go to Settings → Pages
   - Source: Deploy from branch
   - Branch: main, /(root)
   - Save

4. **Wait 5-10 minutes**
   - Your site will be live at: `https://sthiessen.github.io`

---

## 5. Customization Guide

### Update Your LinkedIn Profile URL
In `index.html`, find and update:
```html
<a href="https://www.linkedin.com/in/stephen-thiessen" ...>
```

### Change Color Scheme
In `styles.css`, modify the `:root` section:
```css
:root {
    --primary-color: #1e3a5f;      /* Navy blue - main color */
    --primary-dark: #0f2640;       /* Darker navy - hover states */
    --accent-color: #d4af37;       /* Gold - accents */
    --accent-light: #f0e5c4;       /* Light gold */
}
```

**Other Professional Color Schemes:**

Modern Tech:
```css
--primary-color: #0f172a;
--accent-color: #3b82f6;
```

Corporate Professional:
```css
--primary-color: #1e40af;
--accent-color: #10b981;
```

Creative Professional:
```css
--primary-color: #7c3aed;
--accent-color: #ec4899;
```

### Adding More Blog Posts Manually
In `index.html` or `script.js`, copy the blog card template:
```html
<article class="blog-card">
    <div class="blog-date">Month Year</div>
    <h3>Article Title</h3>
    <p>Brief description...</p>
    <a href="LINKEDIN_URL" class="read-more" target="_blank">Read on LinkedIn →</a>
</article>
```

---

## 6. Testing Your Site Locally (Optional)

### Simple Method: Open in Browser
Just double-click `index.html` to view locally

### Advanced Method: Local Server
```bash
# Using Python 3
python -m http.server 8000

# Then visit: http://localhost:8000
```

---

## 7. Using a Custom Domain (Optional)

Want to use `stephenthiessen.com` instead?

1. **Purchase domain** (GoDaddy, Namecheap, Google Domains, etc.)

2. **In GitHub:**
   - Settings → Pages → Custom domain
   - Enter your domain
   - Check "Enforce HTTPS"

3. **In your domain registrar:**
   - Add these A records:
   ```
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```

4. **Wait 24-48 hours** for DNS propagation

---

## 8. Maintenance & Updates

### Adding New Blog Posts
1. Option A: Let automatic feed do it (if working)
2. Option B: Edit `script.js` fallback section
3. Commit changes to GitHub
4. Site updates automatically

### Updating Your Bio
1. Edit `index.html`
2. Find the About section
3. Update text
4. Commit to GitHub

### Updating Contact Info
1. Edit `index.html`
2. Find Contact section
3. Update LinkedIn URL and email
4. Commit to GitHub

---

## Troubleshooting

### Photo Not Showing
- Check filename matches exactly (case-sensitive)
- Ensure photo is uploaded to repository root
- Try clearing browser cache

### Contact Form Not Working
- Verify Formspree endpoint is correct
- Check browser console for errors
- Test with a simple message first

### Blog Posts Not Loading
- Check browser console for errors
- Verify LinkedIn username is correct
- Use fallback method if automatic fails

### Site Not Updating
- Wait 5 minutes after pushing changes
- Clear browser cache (Ctrl+Shift+R)
- Check GitHub Actions for build status

---

## Professional Tips

**Content Strategy:**
- Post to LinkedIn regularly (1-2x per week)
- Keep articles focused on your expertise
- Update your bio every 6 months
- Add new expertise areas as you grow

**SEO Optimization:**
- Your name is already in the title tag
- Consider adding meta description
- Use LinkedIn posts to drive traffic
- Share your website URL in your LinkedIn profile

**Performance:**
- Optimize your profile photo (use JPG, keep under 200KB)
- The site loads fast by design
- No heavy frameworks or dependencies

---

## Need Help?

If you encounter issues:
1. Check the Troubleshooting section above
2. Review GitHub Pages documentation: https://docs.github.com/pages
3. Check browser console for error messages

Your website is now ready to showcase your professional brand!
