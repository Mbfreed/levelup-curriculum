# Supabase RLS Configuration

This guide provides the correct Row Level Security policies for the Level Up platform.

## Important: RLS Setup Steps

### Step 1: Enable RLS on All Tables

Go to Supabase Dashboard → Database → Tables, and for each table:
1. Click on the table
2. Go to "RLS (Row Level Security)" tab
3. Click "Enable RLS"

Repeat for: `users`, `courses`, `enrollments`, `progress`, `completions`, `token_claims`, `submissions`

### Step 2: Create Service Role Key Policy (For Signup)

When a user signs up, they need permission to insert their own user record. Run this SQL in Supabase SQL Editor:

```sql
-- Allow users to insert their own user record during signup
CREATE POLICY "Users can insert their own profile" ON users
  FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- Allow users to read their own profile
CREATE POLICY "Users can read own profile" ON users
  FOR SELECT
  USING (auth.uid() = id);

-- Allow users to update their own profile
CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE
  USING (auth.uid() = id);
```

### Step 3: Public Read Policies (Courses)

Courses should be readable by everyone:

```sql
-- Courses are publicly readable
CREATE POLICY "Courses are publicly readable" ON courses
  FOR SELECT
  TO authenticated, anon
  USING (true);
```

### Step 4: Enrollments Policies

Users can only see and manage their own enrollments:

```sql
-- Users can read their own enrollments
CREATE POLICY "Users can read own enrollments" ON enrollments
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own enrollments
CREATE POLICY "Users can insert own enrollments" ON enrollments
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own enrollments
CREATE POLICY "Users can update own enrollments" ON enrollments
  FOR UPDATE
  USING (auth.uid() = user_id);
```

### Step 5: Progress Policies

Users can only see and manage their own progress:

```sql
-- Users can read their own progress
CREATE POLICY "Users can read own progress" ON progress
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own progress
CREATE POLICY "Users can insert own progress" ON progress
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own progress
CREATE POLICY "Users can update own progress" ON progress
  FOR UPDATE
  USING (auth.uid() = user_id);
```

### Step 6: Completions Policies

Users can only see and manage their own completions:

```sql
-- Users can read their own completions
CREATE POLICY "Users can read own completions" ON completions
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own completions
CREATE POLICY "Users can insert own completions" ON completions
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

### Step 7: Token Claims Policies

Users can only see and manage their own token claims:

```sql
-- Users can read their own token claims
CREATE POLICY "Users can read own token claims" ON token_claims
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own token claims
CREATE POLICY "Users can insert own token claims" ON token_claims
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

### Step 8: Submissions Policies

Users can only see and manage their own submissions:

```sql
-- Users can read their own submissions
CREATE POLICY "Users can read own submissions" ON submissions
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own submissions
CREATE POLICY "Users can insert own submissions" ON submissions
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own submissions
CREATE POLICY "Users can update own submissions" ON submissions
  FOR UPDATE
  USING (auth.uid() = user_id);
```

## How to Apply These Policies

### Option 1: Manual in Supabase Dashboard

1. Go to Supabase Dashboard
2. Click "SQL Editor"
3. Click "New Query"
4. Copy and paste each SQL block above
5. Click "Run" for each one

### Option 2: Create Migration File

Create `supabase/migrations/rls_policies.sql`:

```sql
-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE completions ENABLE ROW LEVEL SECURITY;
ALTER TABLE token_claims ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can insert their own profile" ON users
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can read own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Courses policies (public read)
CREATE POLICY "Courses are publicly readable" ON courses
  FOR SELECT USING (true);

-- Enrollments policies
CREATE POLICY "Users can read own enrollments" ON enrollments
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own enrollments" ON enrollments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own enrollments" ON enrollments
  FOR UPDATE USING (auth.uid() = user_id);

-- Progress policies
CREATE POLICY "Users can read own progress" ON progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress" ON progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress" ON progress
  FOR UPDATE USING (auth.uid() = user_id);

-- Completions policies
CREATE POLICY "Users can read own completions" ON completions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own completions" ON completions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Token claims policies
CREATE POLICY "Users can read own token claims" ON token_claims
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own token claims" ON token_claims
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Submissions policies
CREATE POLICY "Users can read own submissions" ON submissions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own submissions" ON submissions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own submissions" ON submissions
  FOR UPDATE USING (auth.uid() = user_id);
```

Then run:
```bash
supabase db push
```

## Verification Checklist

After setting up RLS, verify:

- [ ] All tables have RLS enabled
- [ ] Each table has SELECT policy
- [ ] User tables have INSERT/UPDATE for user's own data
- [ ] Public tables (courses) allow anonymous read
- [ ] Test signup creates user without error
- [ ] Test login retrieves user data
- [ ] Test enrollment inserts new enrollments
- [ ] Test progress tracking updates progress

## Common RLS Issues & Solutions

### Issue: "new row violates row-level security policy"
**Cause**: No INSERT policy or incorrect policy condition  
**Solution**: Ensure `WITH CHECK (auth.uid() = user_id)` matches the user_id column

### Issue: "You do not have permission to read this data"
**Cause**: No SELECT policy  
**Solution**: Add SELECT policy with `USING (auth.uid() = user_id)` or `USING (true)` for public

### Issue: "Policy doesn't exist"
**Cause**: RLS not enabled on table or policy name typo  
**Solution**: Verify RLS is enabled, check policy names in dashboard

### Issue: Signup works but user can't see own data
**Cause**: SELECT policy too restrictive  
**Solution**: Ensure SELECT policy uses `auth.uid() = id` for users table

## Understanding RLS in Supabase

- **RLS = Row Level Security**: Controls which rows a user can access
- **`auth.uid()`**: Returns the current authenticated user's ID (from JWT)
- **`FOR SELECT`**: Policy controls reading data
- **`FOR INSERT`**: Policy controls inserting new rows
- **`FOR UPDATE`**: Policy controls updating rows
- **`FOR DELETE`**: Policy controls deleting rows
- **`USING`**: Condition for SELECT, UPDATE, DELETE (row filter)
- **`WITH CHECK`**: Condition for INSERT, UPDATE (what can be inserted/updated)

## Key Points

1. **Always use `auth.uid()`** to reference current user
2. **Always use `user_id`** in your tables to reference user
3. **Test each policy** before moving to production
4. **Public tables** (courses) use `USING (true)` or no condition
5. **Private tables** (progress, tokens) use `USING (auth.uid() = user_id)`
6. **Signup** needs `FOR INSERT WITH CHECK (auth.uid() = id)`

## Testing RLS

In your app, you can test RLS by:

1. Signing up as User A
2. Trying to query User B's data (should fail)
3. Updating own data (should work)
4. Reading public courses (should work for anyone)

If any of these fail unexpectedly, check your RLS policies.
