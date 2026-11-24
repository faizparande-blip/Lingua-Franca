# Lingua Franca — Admin Portal Setup & Security Guide

This document describes the complete architecture, setup instructions, and administrative procedures for the Lingua Franca Admin Dashboard.

---

## 1. Architecture & Security Overview

The Lingua Franca Admin Dashboard is built with defense-in-depth security:

1. **Authentication**: Powered by Supabase Auth (Email & Password).
2. **Server-Side Authorization**:
   - **PostgreSQL RLS Policies**: Enforced at the database layer. No unprivileged client can read or modify sensitive tables.
   - **Server-Managed Role Checking**: Evaluated via a PostgreSQL `SECURITY DEFINER` function (`public.is_admin()`).
   - **Strict Metadata Trust Boundary**: Only server-managed `app_metadata` (`role = 'admin'` or `is_admin = 'true'`) or the `public.admin_users` table is trusted. User-editable `user_metadata` is strictly ignored and rejected for authorization.
3. **Frontend Routing Protection**:
   - `<AdminProtectedRoute />` intercepts all `/admin/*` routes.
   - Unauthenticated sessions are redirected to `/admin/login`.
   - Authenticated sessions without admin authorization receive a 403 "Access Restricted" alert and cannot load dashboard components.

---

## 2. Database Schema & RLS Setup

Run the SQL script located at `supabase/admin_schema.sql` inside your **Supabase Dashboard > SQL Editor**:

```sql
-- 1. Create admin allowlist table
CREATE TABLE IF NOT EXISTS public.admin_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- 2. Create authoritative is_admin() function
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT (
    auth.role() = 'authenticated' AND (
      (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin' OR
      (auth.jwt() -> 'app_metadata' ->> 'is_admin') = 'true' OR
      EXISTS (
        SELECT 1 FROM public.admin_users
        WHERE LOWER(email) = LOWER(auth.jwt() ->> 'email')
      )
    )
  );
$$;

-- 3. RLS for admin_users
DROP POLICY IF EXISTS "Admins can view admin_users" ON public.admin_users;
CREATE POLICY "Admins can view admin_users"
    ON public.admin_users FOR SELECT
    TO authenticated
    USING (public.is_admin());

-- 4. RLS for enquiries
DROP POLICY IF EXISTS "Allow anon insert to enquiries" ON public.enquiries;
CREATE POLICY "Allow anon insert to enquiries"
    ON public.enquiries FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

DROP POLICY IF EXISTS "Admins have full access to enquiries" ON public.enquiries;
CREATE POLICY "Admins have full access to enquiries"
    ON public.enquiries FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- 5. RLS for contact_messages
DROP POLICY IF EXISTS "Allow anon insert to contact_messages" ON public.contact_messages;
CREATE POLICY "Allow anon insert to contact_messages"
    ON public.contact_messages FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

DROP POLICY IF EXISTS "Admins have full access to contact_messages" ON public.contact_messages;
CREATE POLICY "Admins have full access to contact_messages"
    ON public.contact_messages FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- 6. RLS for testimonials
DROP POLICY IF EXISTS "Allow public read verified testimonials" ON public.testimonials;
CREATE POLICY "Allow public read verified testimonials"
    ON public.testimonials FOR SELECT
    TO anon, authenticated
    USING (is_verified = true OR public.is_admin());

DROP POLICY IF EXISTS "Admins have full management of testimonials" ON public.testimonials;
CREATE POLICY "Admins have full management of testimonials"
    ON public.testimonials FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());
```

---

## 3. Creating & Authorizing an Admin User

### Step 1: Create the User in Supabase Auth

1. Go to your **Supabase Dashboard** > **Authentication** > **Users**.
2. Click **Add User** > **Create User**.
3. Enter the admin email (e.g. `admin@linguafranca.edu` or academy owner's email) and a strong password.
4. Check **Auto Confirm User** so no confirmation email is required.

### Step 2: Grant Administrator Privileges

You can authorize the user using either of two methods:

#### Method A: Add Email to `public.admin_users` (Recommended & Simple)
In the Supabase SQL Editor:
```sql
INSERT INTO public.admin_users (email)
VALUES ('admin@linguafranca.edu')
ON CONFLICT (email) DO NOTHING;
```

#### Method B: Set `app_metadata` on the Auth User
In the Supabase SQL Editor:
```sql
UPDATE auth.users
SET raw_app_meta_data = raw_app_meta_data || '{"role": "admin"}'::jsonb
WHERE email = 'admin@linguafranca.edu';
```

---

## 4. Admin Portal Features

| Route | Feature | Description |
|---|---|---|
| `/admin/login` | Secure Authentication | Login with email and password. Redirects authenticated admins to `/admin`. |
| `/admin` | Analytics & Overview | Real-time counts: Total Enquiries, Pending Action, Contacted, Enrolled, and Published Testimonials. |
| `/admin/enquiries` | Demo Leads Pipeline | View all leads with real-time status switcher (`pending` &rarr; `contacted` &rarr; `enrolled`). WhatsApp and email shortcuts. |
| `/admin/testimonials` | Testimonial Moderation | Add new reviews, edit existing reviews, delete reviews, and instantly toggle publication (`is_verified`) on the live website. |

---

## 5. Security Checklist

- [x] No `service_role` key exposed on the frontend (only standard `anon` publishable key used).
- [x] RLS enabled and strictly enforced on `enquiries`, `testimonials`, and `admin_users`.
- [x] Public anonymous users can only `INSERT` into `enquiries` (Demo Form) and `SELECT` verified testimonials.
- [x] Only authorized admins can `SELECT`, `UPDATE`, or `DELETE` enquiry records and testimonials.
- [x] Unauthenticated or non-admin users are prevented from accessing dashboard routes.
