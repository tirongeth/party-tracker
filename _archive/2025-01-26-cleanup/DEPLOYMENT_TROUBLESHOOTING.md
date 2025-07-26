# BoozeLens Deployment Troubleshooting Guide

## Common Deployment Issues and Solutions

### 1. Assets Not Loading (404 Errors)

**Problem**: JavaScript and CSS files return 404 errors when deployed to GitHub Pages.

**Cause**: Vite builds with absolute paths by default (`/assets/...`), but GitHub Pages serves from a subdirectory.

**Solution**: Already fixed in `vite.config.js` by setting `base: './'` to use relative paths.

### 2. Firebase Configuration Errors

**Problem**: App shows "Firebase configuration error" or fails to connect to the database.

**Cause**: Environment variables are not properly set in GitHub Secrets.

**Required GitHub Secrets**:
1. Go to Settings → Secrets and variables → Actions
2. Add these repository secrets:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_DATABASE_URL`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`
   - `VITE_FIREBASE_MEASUREMENT_ID`

**Local Development**: Copy `.env.example` to `.env` and fill in your Firebase configuration.

### 3. Auto-Compact Error Messages

**Problem**: Console shows errors about "auto-compact" operations.

**Cause**: Firebase Realtime Database automatic compaction conflicts with certain operations.

**Solution**: Already fixed by adding proper error handling to Firebase operations. The app now gracefully handles these errors and falls back to localStorage.

### 4. Build and Deployment Process

**Correct Deployment Steps**:
1. Make changes to your code
2. Test locally with `npm run dev`
3. Build locally with `npm run build` to verify no build errors
4. Commit and push to main branch
5. GitHub Actions will automatically build and deploy

**Manual Deployment** (if needed):
```bash
npm run build
npm run deploy
```

### 5. Verifying Deployment

**Check these after deployment**:
1. Visit https://boozelens.ch
2. Open browser console (F12) and check for errors
3. Verify all sections load properly
4. Test authentication flow
5. Check that Firebase connection works

### 6. Common Build Errors

**"Module not found" errors**:
- Run `npm install` to ensure all dependencies are installed
- Check import paths are correct (case-sensitive on Linux/GitHub Actions)

**Environment variable errors**:
- Ensure all `VITE_` prefixed variables are defined
- Check GitHub Secrets are properly set
- Variables must start with `VITE_` to be exposed to the client

### 7. GitHub Pages Configuration

**Ensure these settings**:
- Source: Deploy from a branch
- Branch: gh-pages
- Folder: / (root)
- Custom domain: boozelens.ch (with CNAME file)

### 8. Debugging Production Issues

1. **Check GitHub Actions logs**:
   - Go to Actions tab
   - Click on the latest workflow run
   - Check build logs for errors

2. **Browser Console**:
   - Look for 404 errors (asset loading issues)
   - Check for Firebase errors (configuration issues)
   - Look for JavaScript errors (code issues)

3. **Network Tab**:
   - Verify all resources load with 200 status
   - Check response headers for caching issues
   - Look for failed API calls

### 9. Emergency Fixes

If the site is completely broken:
1. Revert to last known good commit: `git revert HEAD`
2. Push to trigger new deployment
3. Debug the issue locally before pushing fixes

### 10. Performance Optimization

- Enable caching headers in GitHub Pages
- Minimize bundle size with tree shaking
- Use lazy loading for non-critical features
- Compress images and assets

## Contact

For additional help, check the GitHub Actions logs or open an issue in the repository.