# 🔧 GitHub Actions Setup Guide

This guide explains how to set up automatic course syncing with GitHub Actions.

## What This Does

Automatically syncs courses to Supabase whenever changes are merged to the `main` branch:

```
PR merged with course changes
        ↓
GitHub Action triggers
        ↓
Calls Supabase Edge Function
        ↓
Courses synced to database
        ↓
Users see updated courses immediately
```

## Setup Steps

### Step 1: Get Your Supabase Anon Key

1. Go to your **Supabase Dashboard**
2. Click **Settings** (bottom left)
3. Click **API**
4. Copy the **`anon` key** (public API key)
5. Keep this handy - you'll need it in the next step

### Step 2: Add GitHub Secret

1. Go to your GitHub repository
2. Click **Settings** (top right)
3. Click **Secrets and variables** → **Actions** (left sidebar)
4. Click **New repository secret**
5. Fill in:
   - **Name**: `SUPABASE_ANON_KEY`
   - **Secret**: Paste your Supabase anon key from Step 1
6. Click **Add secret**

### Step 3: Verify Workflow File

The workflow file (`.github/workflows/sync-courses.yml`) should already exist. It:

- Triggers when `src/courses/**` files change on `main` branch
- Calls the Supabase `sync-courses` Edge Function
- Reports success/failure

## Testing

### Test the Workflow:

1. Make a small change to any course file (e.g., typo fix)
2. Commit: `git commit -m "Test: Update course"`
3. Push: `git push origin main`
4. Go to your repo → **Actions** tab
5. You should see a running workflow called "Sync Courses to Supabase"
6. Wait for it to complete (should be green ✅)
7. Check your Supabase dashboard - courses should be updated

### Troubleshooting

**❌ Workflow shows red (failed):**

- Check that `SUPABASE_ANON_KEY` secret is set correctly
- Go to **Actions → Sync Courses → logs** to see error details
- Common issue: Wrong key or URL

**❌ Workflow doesn't trigger:**

- Make sure you changed files in `src/courses/`
- Workflow only triggers on `main` branch
- Check that the YAML file is in `.github/workflows/sync-courses.yml`

**❌ Courses didn't sync:**

- Check Supabase Edge Function logs for errors
- Verify `course.json` is valid JSON
- Make sure all file paths in `course.json` are correct

## Manual Sync (Backup)

If GitHub Actions isn't working, you can manually sync:

```bash
curl -X POST https://lonsuwvdmtoinrhbytzn.supabase.co/functions/v1/sync-courses \
  -H "Authorization: Bearer YOUR_SUPABASE_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{}'
```

Replace `YOUR_SUPABASE_ANON_KEY` with your actual key.

## What Gets Synced

Only files in `src/courses/` trigger the workflow:

- `course.json` updates
- Markdown lesson files (`.md`)
- Module folder structure changes

Other file changes (like React components) don't trigger the sync.

## Monitoring

To see workflow runs:

1. Go to your repo → **Actions** tab
2. Click **Sync Courses to Supabase**
3. See all past and current runs
4. Click any run to see logs

---

## ✅ You're All Set!

Once the secret is added and tested, courses will sync automatically whenever you merge changes to `main`.

No more manual button clicks needed! 🚀
