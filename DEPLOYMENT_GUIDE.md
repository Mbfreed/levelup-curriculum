# Deployment Guide

Complete instructions for deploying the Level Up platform to production.

## Environment Setup

### 1. Supabase Production Project

If you haven't already, create a separate production Supabase project:

1. Go to [supabase.com](https://supabase.com)
2. Create new project for production
3. Copy URL and Anon Key
4. Run migrations in production database (from Supabase dashboard):
   ```sql
   -- Run all schema files from supabase/migrations/
   -- Or use: supabase db push --linked
   ```
5. Deploy Edge Function to production:
   ```bash
   supabase functions deploy sync-courses --project-ref [PROJECT_REF]
   ```

### 2. Environment Variables

Create production `.env.production.local` file:

```env
VITE_SUPABASE_URL=https://[project-id].supabase.co
VITE_SUPABASE_ANON_KEY=[your-production-anon-key]
```

Commit `.env.example` only (for reference):

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 3. GitHub Repository

Ensure your GitHub repo is clean:

```bash
# Set remote to your public repo
git remote set-url origin https://github.com/your-username/levelup-curriculum

# Push all commits
git push origin main
```

## Deployment Option 1: Vercel (Recommended)

### Setup

1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Framework: Select "Vite"
4. Build command: `npm run build` (should auto-detect)
5. Output directory: `dist`

### Environment Variables

In Vercel dashboard:
1. Go to Settings → Environment Variables
2. Add:
   - Key: `VITE_SUPABASE_URL`
   - Value: Your production Supabase URL
   - Key: `VITE_SUPABASE_ANON_KEY`
   - Value: Your production Supabase Anon Key
3. Apply to: Production, Preview, Development

### Deploy

```bash
# First deployment
vercel deploy --prod

# Or push to main branch and Vercel auto-deploys
git push origin main
```

### Verify

- App should be live at `your-app.vercel.app`
- Test signup flow
- Check browser console for errors
- Verify Supabase connection in Network tab

## Deployment Option 2: GitHub Pages (Static Only)

**Note:** GitHub Pages doesn't support server-side features, use Vercel for full functionality.

```bash
# Update vite.config.js
# Set: base: '/levelup-curriculum/' (if using repo name)

# Build
npm run build

# Deploy to gh-pages branch
npx gh-pages -d dist
```

## Deployment Option 3: Self-Hosted (Docker)

### Create Dockerfile

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_ANON_KEY
ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL
ENV VITE_SUPABASE_ANON_KEY=$VITE_SUPABASE_ANON_KEY
RUN npm run build

FROM node:18-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
```

### Build and Run

```bash
docker build \
  --build-arg VITE_SUPABASE_URL=https://[project-id].supabase.co \
  --build-arg VITE_SUPABASE_ANON_KEY=[anon-key] \
  -t levelup-platform .

docker run -p 3000:3000 levelup-platform
```

## Custom Domain

### With Vercel

1. Go to Vercel project settings
2. Domains → Add custom domain
3. Add DNS records:
   - CNAME: your-domain.com → cname.vercel-dns.com
   - TXT: (for verification)
4. Click verify and wait for SSL certificate

### With Self-Hosted

1. Point domain DNS to your server IP
2. Use Nginx with Let's Encrypt SSL:

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com;
    
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Database Backups

### Automated Backups (Supabase)

Supabase automatically backs up your database daily. Access in dashboard:
- Settings → Backups
- Download backups as needed

### Manual Backup

```bash
# Export PostgreSQL dump
pg_dump postgresql://[user]:[password]@db.[project-id].supabase.co:5432/postgres > backup.sql

# Restore from dump
psql postgresql://[user]:[password]@db.[project-id].supabase.co:5432/postgres < backup.sql
```

## Monitoring

### Error Tracking

Set up error tracking (optional but recommended):

1. **Sentry** (Free tier available):
   ```bash
   npm install @sentry/react @sentry/tracing
   ```
   
   ```javascript
   // src/main.jsx
   import * as Sentry from "@sentry/react";
   
   Sentry.init({
     dsn: "YOUR_SENTRY_DSN",
     environment: import.meta.env.MODE,
     tracesSampleRate: 1.0,
   });
   ```

2. **Vercel Analytics** (Automatic if using Vercel)

### Performance Monitoring

- Vercel provides Core Web Vitals
- Use Lighthouse for quarterly audits
- Monitor Supabase query performance in dashboard

### Uptime Monitoring

- Use UptimeRobot for ping monitoring
- Set alerts for downtime

## CI/CD Pipeline

### GitHub Actions (Auto-Deploy on Push)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Install Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        env:
          VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
          VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}
        run: npm run build
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

### Set GitHub Secrets

1. Go to GitHub repo Settings → Secrets and variables → Actions
2. Add:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VERCEL_TOKEN` (from Vercel account)
   - `VERCEL_ORG_ID` (from Vercel)
   - `VERCEL_PROJECT_ID` (from Vercel)

## Course Sync in Production

### Manual Trigger (Current)

Trigger Edge Function manually:

```bash
curl -X POST https://[project-id].supabase.co/functions/v1/sync-courses \
  -H "Authorization: Bearer [ANON_KEY]" \
  -H "Content-Type: application/json"
```

### Automated (Future)

Set up GitHub Actions to trigger sync on PR merge:

```yaml
name: Sync Courses to Supabase

on:
  pull_request:
    types: [closed]

jobs:
  sync:
    if: github.event.pull_request.merged == true
    runs-on: ubuntu-latest
    steps:
      - name: Trigger sync-courses Edge Function
        run: |
          curl -X POST ${{ secrets.SUPABASE_URL }}/functions/v1/sync-courses \
            -H "Authorization: Bearer ${{ secrets.SUPABASE_ANON_KEY }}" \
            -H "Content-Type: application/json"
```

## Pre-Launch Checklist

- [ ] All environment variables set in production
- [ ] Supabase project created and configured
- [ ] Edge Function deployed to production
- [ ] Initial course sync completed
- [ ] SSL certificate installed
- [ ] Custom domain configured
- [ ] HTTPS enforced
- [ ] Database backups enabled
- [ ] Error tracking configured
- [ ] Uptime monitoring set up
- [ ] Test user signup/login
- [ ] Test course enrollment
- [ ] Test lesson completion
- [ ] Test token claiming
- [ ] Test profile editing
- [ ] Documentation updated with production URLs

## Post-Deployment

### Monitoring First Week

- Check Vercel dashboard daily for errors
- Monitor Supabase query performance
- Review user feedback and issues
- Be ready to rollback if critical issues found

### Rollback Procedure

```bash
# If issues found, redeploy previous commit
git revert HEAD
git push origin main
# Vercel will auto-deploy
```

## Security Considerations

1. **API Keys**: Never commit API keys, use environment variables
2. **CORS**: Supabase CORS configured for your domain
3. **RLS Policies**: Verify all tables have proper Row Level Security
4. **Rate Limiting**: Edge Functions have rate limits (check Supabase pricing)
5. **User Data**: Ensure GDPR compliance if serving EU users

## Performance Optimization

1. **Frontend**:
   ```bash
   npm run build
   # Check bundle size
   npm install -g serve
   serve -s dist
   ```

2. **Database Queries**:
   - Add indexes for frequently queried columns
   - Use pagination for large result sets

3. **CDN**: Vercel automatically uses CDN for static assets

## Scaling Plan

If user base grows:

1. **Database**: Upgrade Supabase plan
2. **Frontend**: Vercel scales automatically
3. **Edge Functions**: May need separate pricing tier
4. **Storage**: Plan for lesson content and assets
5. **Cache**: Consider Redis for frequently accessed data

## Support and Debugging

### Common Issues

**Issue: Deployments failing**
- Check build logs in deployment service
- Verify environment variables are set
- Test build locally: `npm run build`

**Issue: API requests failing**
- Check CORS settings in Supabase
- Verify authentication token
- Check RLS policies

**Issue: Slow performance**
- Check database query performance
- Review Vercel analytics
- Optimize bundle size

## Disaster Recovery

If data loss occurs:

1. Restore from Supabase daily backups
2. Re-sync courses from GitHub
3. Notify users of any data loss
4. Review what went wrong

## Maintenance

### Regular Tasks

- **Weekly**: Check error logs, monitor performance
- **Monthly**: Review user feedback, database optimization
- **Quarterly**: Security audit, dependency updates
- **Annually**: Plan scaling, review costs

### Update Dependencies

```bash
npm outdated  # Check for updates
npm update    # Update to compatible versions
npm audit     # Check for vulnerabilities
npm audit fix # Fix vulnerabilities

git add package.json package-lock.json
git commit -m "Update dependencies"
git push origin main
```

## Cost Estimation

### Monthly Costs (Approximate)

- **Vercel**: $20-100 (Pro plan) or free (Hobby)
- **Supabase**: $25-100+ depending on usage
- **Domain**: $10-15
- **SSL Certificate**: Free (Let's Encrypt)
- **Total**: ~$55-215/month

Monitor costs in provider dashboards and optimize as needed.

## Success!

Your Level Up platform is now live! 🚀

Share your deployment link:
- GitHub repository
- Social media
- Community forums
- Contributor guidelines

Welcome your first learners!
