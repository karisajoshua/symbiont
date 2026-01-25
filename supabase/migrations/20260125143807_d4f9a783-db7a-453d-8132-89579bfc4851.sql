-- 1. Create the table for Agent Reports
CREATE TABLE public.agent_reports (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  platform text NOT NULL,
  content text NOT NULL,
  sentiment text,
  county text,
  risk_level text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- 2. Enable Row Level Security
ALTER TABLE public.agent_reports ENABLE ROW LEVEL SECURITY;

-- 3. Create policies for public read access (dashboard viewing)
CREATE POLICY "Anyone can view agent reports"
ON public.agent_reports FOR SELECT
USING (true);

-- 4. Create policy for inserting via service role (edge functions)
CREATE POLICY "Service role can insert reports"
ON public.agent_reports FOR INSERT
WITH CHECK (true);

-- 5. Enable Realtime so the Map updates instantly
ALTER PUBLICATION supabase_realtime ADD TABLE public.agent_reports;