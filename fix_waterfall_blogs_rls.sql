-- ============================================================================
-- Supabase Row Level Security (RLS) Configuration for waterfall_blogs
-- ============================================================================
-- Run this script in the Supabase SQL Editor (Dashboard -> SQL Editor -> New query)

-- 1. Ensure RLS is active on public.waterfall_blogs
ALTER TABLE public.waterfall_blogs ENABLE ROW LEVEL SECURITY;

-- 2. Drop any previous conflicting policy
DROP POLICY IF EXISTS "Allow public read access on waterfall_blogs" ON public.waterfall_blogs;

-- 3. Create permissive SELECT policy allowing both anonymous and authenticated visitors to read blogs
CREATE POLICY "Allow public read access on waterfall_blogs"
ON public.waterfall_blogs
FOR SELECT
TO public
USING (true);

-- 4. Ensure public grant permissions are in place for the PostgREST API
GRANT SELECT ON public.waterfall_blogs TO anon, authenticated;
