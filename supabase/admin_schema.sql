-- ==============================================================================
-- Lingua Franca - Admin Authentication & RLS Authorization Migration
-- ==============================================================================

-- 1. Create the admin_users allowlist table
CREATE TABLE IF NOT EXISTS public.admin_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS on admin_users
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- 2. Security Definer helper function to verify admin status
-- Checks trusted app_metadata (server-managed) OR admin_users allowlist
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT COALESCE(
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
    OR (auth.jwt() -> 'app_metadata' ->> 'is_admin') = 'true'
    OR EXISTS (
      SELECT 1 FROM public.admin_users WHERE LOWER(email) = LOWER(auth.jwt() ->> 'email')
    ),
    false
  );
$$;

-- Allow authenticated users to check if their own email is in admin_users
DROP POLICY IF EXISTS "Allow authenticated to view admin list" ON public.admin_users;
CREATE POLICY "Allow authenticated to view admin list"
    ON public.admin_users
    FOR SELECT
    TO authenticated
    USING (
      LOWER(email) = LOWER(auth.jwt() ->> 'email')
      OR public.is_admin()
    );

-- ==============================================================================
-- 3. Update RLS Policies on `enquiries`
-- ==============================================================================
DROP POLICY IF EXISTS "Allow anonymous to insert enquiries" ON public.enquiries;
DROP POLICY IF EXISTS "Allow authenticated users to read enquiries" ON public.enquiries;
DROP POLICY IF EXISTS "Allow authenticated users to update enquiries" ON public.enquiries;
DROP POLICY IF EXISTS "Allow authenticated users to delete enquiries" ON public.enquiries;
DROP POLICY IF EXISTS "Allow admins to read enquiries" ON public.enquiries;
DROP POLICY IF EXISTS "Allow admins to update enquiries" ON public.enquiries;
DROP POLICY IF EXISTS "Allow admins to delete enquiries" ON public.enquiries;

-- Public can insert new enquiries
CREATE POLICY "Allow anonymous to insert enquiries"
    ON public.enquiries
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- Authenticated admins can view all enquiries
CREATE POLICY "Allow admins to read enquiries"
    ON public.enquiries
    FOR SELECT
    TO authenticated
    USING (public.is_admin());

-- Authenticated admins can update enquiry status
CREATE POLICY "Allow admins to update enquiries"
    ON public.enquiries
    FOR UPDATE
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- Authenticated admins can delete enquiries
CREATE POLICY "Allow admins to delete enquiries"
    ON public.enquiries
    FOR DELETE
    TO authenticated
    USING (public.is_admin());

-- ==============================================================================
-- 4. Update RLS Policies on `contact_messages`
-- ==============================================================================
DROP POLICY IF EXISTS "Allow anonymous to insert contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Allow authenticated users to read contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Allow authenticated users to update contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Allow authenticated users to delete contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Allow admins to read contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Allow admins to update contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Allow admins to delete contact messages" ON public.contact_messages;

-- Public can insert contact messages
CREATE POLICY "Allow anonymous to insert contact messages"
    ON public.contact_messages
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- Authenticated admins can read contact messages
CREATE POLICY "Allow admins to read contact messages"
    ON public.contact_messages
    FOR SELECT
    TO authenticated
    USING (public.is_admin());

-- Authenticated admins can update contact messages
CREATE POLICY "Allow admins to update contact messages"
    ON public.contact_messages
    FOR UPDATE
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- Authenticated admins can delete contact messages
CREATE POLICY "Allow admins to delete contact messages"
    ON public.contact_messages
    FOR DELETE
    TO authenticated
    USING (public.is_admin());

-- ==============================================================================
-- 5. Update RLS Policies on `testimonials`
-- ==============================================================================
DROP POLICY IF EXISTS "Allow public to read verified testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Allow authenticated users to manage testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Allow admins to manage all testimonials" ON public.testimonials;

-- Public can SELECT verified testimonials only
CREATE POLICY "Allow public to read verified testimonials"
    ON public.testimonials
    FOR SELECT
    TO anon, authenticated
    USING (is_verified = true OR public.is_admin());

-- Authenticated admins can insert, update, or delete testimonials
CREATE POLICY "Allow admins to manage all testimonials"
    ON public.testimonials
    FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- ==============================================================================
-- 6. Helper: How to authorize an Academy Owner
-- ==============================================================================
/*
-- Option A: Add the owner's email to public.admin_users (Easiest & persistent)
INSERT INTO public.admin_users (email)
VALUES ('admin@linguafranca.com')
ON CONFLICT (email) DO NOTHING;

-- Option B: Set app_metadata role in auth.users
UPDATE auth.users
SET raw_app_meta_data = raw_app_meta_data || '{"role": "admin"}'::jsonb
WHERE email = 'admin@linguafranca.com';
*/
