-- Create review_requests table
CREATE TABLE IF NOT EXISTS public.review_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id TEXT NOT NULL,
  lesson_id TEXT NOT NULL,
  url TEXT,
  github_url TEXT,
  question TEXT,
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'closed', 'resolved')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_review_requests_lesson_id ON public.review_requests(lesson_id);
CREATE INDEX idx_review_requests_user_id ON public.review_requests(user_id);
CREATE INDEX idx_review_requests_course_id ON public.review_requests(course_id);
CREATE INDEX idx_review_requests_status ON public.review_requests(status);

-- Enable RLS
ALTER TABLE public.review_requests ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view review requests for lessons they're enrolled in or created
CREATE POLICY review_requests_select ON public.review_requests
  FOR SELECT USING (
    auth.uid() = user_id OR
    EXISTS (
      SELECT 1 FROM public.enrollments
      WHERE enrollments.user_id = auth.uid()
      AND enrollments.course_id = review_requests.course_id
    )
  );

-- Policy: Users can insert their own review requests
CREATE POLICY review_requests_insert ON public.review_requests
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own review requests
CREATE POLICY review_requests_update ON public.review_requests
  FOR UPDATE USING (auth.uid() = user_id);

-- Policy: Users can delete their own review requests
CREATE POLICY review_requests_delete ON public.review_requests
  FOR DELETE USING (auth.uid() = user_id);
