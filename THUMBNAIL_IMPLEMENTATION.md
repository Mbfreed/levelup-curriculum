# 🖼️ Thumbnail Implementation Guide

## What Was Added:

### 1. **course.json Updates** ✅

- Added `thumbnail` field to all 3 courses
- Using Unsplash URLs as placeholders (change as needed)
- Format: `"thumbnail": "https://url-to-image"`

### 2. **Supabase Schema Update** (Run This)

Go to Supabase SQL Editor and run:

```sql
ALTER TABLE courses
ADD COLUMN IF NOT EXISTS thumbnail TEXT;
```

### 3. **Update Edge Function** (sync-courses)

In your Supabase Edge Function, update the upsert to include:

```typescript
const { error } = await supabase.from("courses").upsert(
  {
    id: courseJSON.id,
    title: courseJSON.title,
    description: courseJSON.description,
    level: courseJSON.level,
    tags: courseJSON.tags || [],
    thumbnail: courseJSON.thumbnail, // ADD THIS LINE
    modules: courseJSON.modules,
    git_path: `${COURSES_DIR}/${folder}`,
    last_synced_at: new Date().toISOString(),
  },
  { onConflict: "id" }
);
```

### 4. **Update Frontend** (CourseCatalog.jsx)

Replace the imagePlaceholder with actual thumbnail:

```jsx
<div className={styles.courseImage}>
  {course.thumbnail ? (
    <img
      src={course.thumbnail}
      alt={course.title}
      className={styles.courseImageImg}
      onError={(e) => {
        e.target.style.display = "none";
        e.target.nextElementSibling.style.display = "flex";
      }}
    />
  ) : null}
  <div
    className={styles.imagePlaceholder}
    style={{ display: course.thumbnail ? "none" : "flex" }}
  >
    <BookOpen size={48} />
  </div>
  {/* Rest of badge code */}
</div>
```

### 5. **Add CSS** (CourseCatalog.module.css)

```css
.courseImageImg {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px 8px 0 0;
}

.imagePlaceholder {
  width: 100%;
  height: 200px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  border-radius: 8px 8px 0 0;
}
```

---

## 📝 Steps to Complete:

1. ✅ **course.json files** - DONE
2. ⏳ **Supabase SQL** - Run the SQL query above
3. ⏳ **Edge Function** - Add thumbnail to upsert
4. ⏳ **Frontend JSX** - Update CourseCatalog
5. ⏳ **CSS** - Add image styles
6. ⏳ **Test & Sync** - Push, trigger sync, verify

---

## 🖼️ Thumbnail Sources:

**Option 1: Unsplash (Free, High Quality)**

- Web Dev: `https://images.unsplash.com/photo-1633356122544-f134324ef6db`
- React: `https://images.unsplash.com/photo-1633356122544-f134324ef6db`
- JavaScript: `https://images.unsplash.com/photo-1633356122544-f134324ef6db`

**Option 2: Supabase Storage**

- Upload images to Supabase bucket
- Reference with Supabase public URL

**Option 3: Community Submissions**

- Allow contributors to provide thumbnail URLs in their course.json

---

## ✅ Test It:

1. Push changes to main
2. Run sync-courses edge function
3. Check Supabase courses table - should have thumbnail URLs
4. Refresh CourseCatalog - should see images instead of placeholders

Done! 🎉
