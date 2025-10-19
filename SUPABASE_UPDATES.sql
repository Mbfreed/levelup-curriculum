-- Add thumbnail column to courses table if it doesn't exist
ALTER TABLE courses
ADD COLUMN IF NOT EXISTS thumbnail TEXT;

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_courses_thumbnail ON courses(id);
