# Creating the review_requests Table

The `review_requests` table is needed to store peer review requests from users. Follow these steps to create it:

## Option 1: Using Supabase CLI (Recommended)

```bash
# Navigate to project root
cd /home/freed/Practice/level-up

# Apply the migration
supabase db push
```

## Option 2: Using Supabase Dashboard (Manual)

1. Go to your Supabase project dashboard
2. Click on **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy the entire contents of `supabase/migrations/20251019_create_review_requests_table.sql`
5. Paste into the SQL editor
6. Click **Run**

## Option 3: Using psql (Direct Database Connection)

```bash
# Connect to your Supabase database
psql postgresql://postgres:[PASSWORD]@[PROJECT_REF].supabase.co:5432/postgres

# Then paste and run the SQL from the migration file
```

## What Gets Created

The migration creates:

1. **review_requests table** with columns:

   - `id` - UUID primary key
   - `user_id` - Who requested the review
   - `course_id` - Which course
   - `lesson_id` - Which lesson
   - `url` - Live demo URL (optional)
   - `github_url` - GitHub repo URL (optional)
   - `question` - What they need help with
   - `status` - 'open', 'closed', or 'resolved'
   - `created_at` - Timestamp
   - `updated_at` - Timestamp

2. **Indexes** for fast queries on:

   - lesson_id
   - user_id
   - course_id
   - status

3. **RLS Policies**:
   - Users can view review requests for lessons they're enrolled in
   - Users can create requests for themselves
   - Users can update/delete their own requests

## Verification

After applying the migration, verify it worked:

```bash
# In Supabase dashboard, go to Table Editor
# You should see "review_requests" in the table list
```

Then try submitting a review request in the app again!
