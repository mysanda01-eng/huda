# Deployment Guide for Huda Birthday Site

## Vercel Deployment (Recommended - Auto-Deploy)

### Quick Setup:
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "Add New..." → "Project"
4. Import your GitHub repository (mysanda01-eng/huda-birthday or similar)
5. Vercel will automatically detect the configuration from `vercel.json`
6. Click "Deploy"

### What's Pre-Configured:
- ✅ Build command: `npm run build`
- ✅ Output directory: `dist`
- ✅ Framework: Vite (React)
- ✅ Base path: `/` (set via environment variable `VITE_BASE_PATH`)
- ✅ Rewrites: All routes point to `index.html` for SPA routing
- ✅ Headers: Proper CORS and caching for video/audio files

### Auto-Deployment:
Once connected to Vercel:
- Every push to `main` branch automatically triggers a new deployment
- Previous deployments are kept as previews
- Roll back to any previous deployment with one click

### Troubleshooting:
- **Build fails?** Check that `npm install` and `npm run build` work locally first
- **Images/videos not loading?** They should be in `/public` folder (already configured)
- **Routes not working?** The rewrites config handles SPA routing automatically

---

## GitHub Pages Deployment (Alternative)

The `.github/workflows/deploy.yml` file is configured for GitHub Pages deployment if you prefer that instead. It will deploy to: `https://yourusername.github.io/huda-birthday/`

To switch back to GitHub Pages:
1. Update `vite.config.js` to set `base: '/huda-birthday/'` or use `VITE_BASE_PATH=/huda-birthday/`
2. The GitHub Actions workflow will automatically deploy on push to `main`

---

## Notes:
- The site is fully optimized for Vercel with pre-built configurations
- All assets (videos, images, audio) are served efficiently
- The app is a single-page application (SPA) with client-side routing
- No additional configuration needed for Vercel - it should just work!

Generated: February 21, 2026
