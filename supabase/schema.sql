-- ==============================================================================
-- Lingua Franca - Supabase Database Schema
-- Production-Ready Schema, Constraints, Indexes & Row Level Security (RLS)
-- ==============================================================================

-- Enable UUID extension (included in Postgres / Supabase by default)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==============================================================================
-- 1. TABLE: enquiries (Book a Free Demo submissions)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    grade_level TEXT NOT NULL,
    preferred_course TEXT NOT NULL,
    session_preference TEXT NOT NULL,
    notes TEXT,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT enquiries_status_check CHECK (status IN ('pending', 'contacted', 'enrolled'))
);

-- Indexes for enquiries query performance
CREATE INDEX IF NOT EXISTS idx_enquiries_created_at ON public.enquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON public.enquiries (status);

-- Enable Row Level Security
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if reapplying
DROP POLICY IF EXISTS "Allow anonymous to insert enquiries" ON public.enquiries;
DROP POLICY IF EXISTS "Allow authenticated users to read enquiries" ON public.enquiries;
DROP POLICY IF EXISTS "Allow authenticated users to update enquiries" ON public.enquiries;
DROP POLICY IF EXISTS "Allow authenticated users to delete enquiries" ON public.enquiries;

-- RLS Policy: Allow anyone (anon and authenticated) to INSERT an enquiry
CREATE POLICY "Allow anonymous to insert enquiries"
    ON public.enquiries
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- RLS Policy: Only authenticated staff/admin can SELECT enquiries
CREATE POLICY "Allow authenticated users to read enquiries"
    ON public.enquiries
    FOR SELECT
    TO authenticated
    USING (true);

-- RLS Policy: Only authenticated staff/admin can UPDATE enquiries
CREATE POLICY "Allow authenticated users to update enquiries"
    ON public.enquiries
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- RLS Policy: Only authenticated staff/admin can DELETE enquiries
CREATE POLICY "Allow authenticated users to delete enquiries"
    ON public.enquiries
    FOR DELETE
    TO authenticated
    USING (true);


-- ==============================================================================
-- 2. TABLE: contact_messages (Contact Us submissions)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for contact message timestamps
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON public.contact_messages (created_at DESC);

-- Enable Row Level Security
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if reapplying
DROP POLICY IF EXISTS "Allow anonymous to insert contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Allow authenticated users to read contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Allow authenticated users to update contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Allow authenticated users to delete contact messages" ON public.contact_messages;

-- RLS Policy: Allow anyone (anon and authenticated) to INSERT contact messages
CREATE POLICY "Allow anonymous to insert contact messages"
    ON public.contact_messages
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- RLS Policy: Only authenticated staff/admin can SELECT contact messages
CREATE POLICY "Allow authenticated users to read contact messages"
    ON public.contact_messages
    FOR SELECT
    TO authenticated
    USING (true);

-- RLS Policy: Only authenticated staff/admin can UPDATE contact messages
CREATE POLICY "Allow authenticated users to update contact messages"
    ON public.contact_messages
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- RLS Policy: Only authenticated staff/admin can DELETE contact messages
CREATE POLICY "Allow authenticated users to delete contact messages"
    ON public.contact_messages
    FOR DELETE
    TO authenticated
    USING (true);


-- ==============================================================================
-- 3. TABLE: testimonials (Verified Student & Parent Reviews)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    course TEXT NOT NULL,
    rating INTEGER NOT NULL DEFAULT 5,
    text TEXT NOT NULL,
    avatar TEXT,
    is_verified BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT testimonials_rating_check CHECK (rating >= 1 AND rating <= 5)
);

-- Index for fetching verified testimonials efficiently
CREATE INDEX IF NOT EXISTS idx_testimonials_verified_created ON public.testimonials (is_verified, created_at DESC);

-- Enable Row Level Security
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if reapplying
DROP POLICY IF EXISTS "Allow public to read verified testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Allow authenticated users to manage testimonials" ON public.testimonials;

-- RLS Policy: Allow public (anon + authenticated) to SELECT verified testimonials only
CREATE POLICY "Allow public to read verified testimonials"
    ON public.testimonials
    FOR SELECT
    TO anon, authenticated
    USING (is_verified = true);

-- RLS Policy: Only authenticated users can INSERT, UPDATE, or DELETE testimonials
CREATE POLICY "Allow authenticated users to manage testimonials"
    ON public.testimonials
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- ==============================================================================
-- Optional Initial Seed Data (Verified reviews for testing/launch)
-- Uncomment and run if you want initial reviews populated:
-- ==============================================================================
/*
INSERT INTO public.testimonials (name, course, rating, text, avatar, is_verified) VALUES
('Priya S.', 'IGCSE First Language English', 5, 'Ms. Ayeshabi''s teaching transformed my approach to English. Her structured lessons and personalised feedback helped me achieve an A* grade.', 'P', true),
('Aryan M.', 'A Levels English Literature', 5, 'The critical analysis skills I developed at Lingua Franca were invaluable for my A Level examinations. Highly professional and dedicated tutor.', 'A', true),
('Zara K.', 'IGCSE English as a Second Language', 5, 'From struggling with comprehension to confidently writing essays — Lingua Franca made that journey possible through patient and expert guidance.', 'Z', true);
*/
