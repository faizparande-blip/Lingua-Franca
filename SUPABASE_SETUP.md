# Lingua Franca - Supabase Backend Setup Guide

This guide walks you through setting up, configuring, and verifying the production-ready Supabase backend for the Lingua Franca application.

---

## Architecture Overview

The backend integration connects the existing React + Vite frontend to Supabase (PostgreSQL) using the official `@supabase/supabase-js` SDK.

The system manages three core tables:
1. **`enquiries`**: Lead capture from the "Book a Free Demo" modal & form.
2. **`contact_messages`**: General queries submitted through the "Contact Us" form.
3. **`testimonials`**: Dynamic student & parent review showcase with Row Level Security (RLS) ensuring only verified reviews (`is_verified = true`) are visible to the public.

---

## Step 1: Create a Supabase Project

1. Navigate to [Supabase](https://supabase.com) and sign in or create an account.
2. Click **"New Project"**.
3. Select your organization and enter:
   - **Name**: `lingua-franca` (or your preferred name)
   - **Database Password**: Choose a strong password and save it securely.
   - **Region**: Select the region closest to your primary audience (e.g., `South Asia (Mumbai) - ap-south-1` for Indian curriculum students).
   - **Pricing Plan**: Free tier or Pro depending on production needs.
4. Click **"Create new project"** and wait 1–2 minutes for the database cluster to finish provisioning.

---

## Step 2: Retrieve Your API Credentials

1. In the Supabase dashboard, select your project.
2. In the left sidebar, click the **Settings** (gear icon) -> **API** (or **Project Settings** -> **Data API**).
3. Under **Project URL**, copy the base Project URL (e.g. `https://<your-project-ref>.supabase.co`).
   > [!NOTE]
   > Use the base project URL. Do not append `/rest/v1` or trailing slashes, as the Supabase JavaScript client automatically manages API endpoints.
4. Under **Project API keys**, find the key labeled **`anon` / `public`**.
   > [!IMPORTANT]
   > Copy ONLY the **`anon` `public`** key.
   > **NEVER** expose the `service_role` secret key in frontend code or in `.env` committed to version control. The `anon` key is strictly protected by PostgreSQL Row Level Security (RLS) policies.

---

## Step 3: Configure Local Environment Variables

1. In your project root, create a file named `.env` (it is already added to `.gitignore` to prevent credential leaks).
2. Copy the template from `.env.example`:
   ```bash
   cp .env.example .env
   ```
3. Populate `.env` with your actual Supabase credentials:
   ```env
   VITE_SUPABASE_URL=https://your-project-ref.supabase.co
   VITE_SUPABASE_ANON_KEY=your-actual-anon-public-key-here
   VITE_APP_NAME=Lingua Franca
   VITE_WHATSAPP_NUMBER=919167217749
   ```
4. Save the file.

---

## Step 4: Execute Database Schema & RLS in Supabase SQL Editor

1. Open the [Supabase Dashboard](https://supabase.com/dashboard).
2. Click on the **SQL Editor** tab (the terminal/script icon in the left navigation).
3. Click **"New query"**.
4. Open the file [`supabase/schema.sql`](supabase/schema.sql) in this repository, copy its entire contents, and paste it into the SQL Editor.
5. Click **"Run"** (or press `Ctrl+Enter` / `Cmd+Enter`).
6. You will see `Success. No rows returned`.

### What the SQL script configures:
- **`enquiries` table**:
  - Columns: `id` (UUID default `gen_random_uuid()`), `full_name`, `email`, `phone`, `grade_level`, `preferred_course`, `session_preference`, `notes`, `status`, `created_at`.
  - Constraint: `CHECK (status IN ('pending', 'contacted', 'enrolled'))`.
  - RLS Policies: Anonymous users can `INSERT`; only authenticated staff can `SELECT`, `UPDATE`, or `DELETE`.
  - Indexes: `idx_enquiries_created_at`, `idx_enquiries_status`.

- **`contact_messages` table**:
  - Columns: `id` (UUID), `full_name`, `email`, `phone` (nullable), `subject`, `message`, `created_at`.
  - RLS Policies: Anonymous users can `INSERT`; only authenticated staff can `SELECT`, `UPDATE`, or `DELETE`.
  - Index: `idx_contact_messages_created_at`.

- **`testimonials` table**:
  - Columns: `id` (UUID), `name`, `course`, `rating` (default 5), `text`, `avatar`, `is_verified` (default false), `created_at`.
  - Constraint: `CHECK (rating >= 1 AND rating <= 5)`.
  - RLS Policies: Public (`anon`) can `SELECT` only where `is_verified = true`. Anonymous writes are blocked; only authenticated users can insert/update/delete.
  - Index: `idx_testimonials_verified_created` on `(is_verified, created_at DESC)`.

---

## Step 5: Run the Project Locally

1. Install dependencies (if not already done):
   ```bash
   npm install
   ```
2. Start the Vite development server:
   ```bash
   npm run dev
   ```
3. Open your browser to the URL displayed in the terminal (usually `http://localhost:5173`).

---

## Step 6: Verify That All Three Tables Are Working

### A. Test "Book a Free Demo" Form (`enquiries` table)
1. Go to `/contact` or click "Book a Free Demo" on any course card in `/courses`.
2. Fill in:
   - Full Name: `Aarav Mehta`
   - Email: `aarav.mehta@example.com`
   - Phone: `9820012345`
   - Grade: `IGCSE (Grade 9-10)`
   - Course: `IGCSE First Language English (FLE 0500)`
   - Session Preference: `Online`
   - Notes: `Targeting Grade A* in May/June examination.`
3. Click **"Confirm Free Demo Request"**.
4. You should see the green confirmation card.
5. In Supabase Dashboard -> **Table Editor** -> **`enquiries`**, verify that a new row has appeared with status `'pending'`.

### B. Test "Contact Us" Form (`contact_messages` table)
1. Navigate to `/contact` and scroll down to "Send Us a Direct Message".
2. Fill in:
   - Full Name: `Sunita Sharma`
   - Email: `sunita.parent@example.com`
   - Contact Number: `9876543210`
   - Subject: `Inquiry regarding A Level Literature batch timing`
   - Message: `Hello, could you please provide details about the weekend online batch schedule?`
3. Click **"Send Message"**.
4. You should see the confirmation card.
5. In Supabase Dashboard -> **Table Editor** -> **`contact_messages`**, verify that the message row has appeared with all fields mapped correctly.

### C. Test Testimonials System (`testimonials` table)
1. Open `/testimonials`.
2. If no reviews are verified yet, the page gracefully displays the empty state message without crashing.
3. Add a verified testimonial (see Step 7 below).
4. Refresh `/testimonials` and verify that the review appears dynamically with verified badge, stars, name, course, and initial avatar.

---

## Step 7: How to Add Verified Testimonials Manually in Supabase Dashboard

To display student and parent testimonials on the public site:

1. Open your Supabase Dashboard.
2. In the left navigation, click **Table Editor** -> select **`testimonials`**.
3. Click **"Insert row"** (or **"Insert"** -> **"Insert row"**).
4. Enter the details:
   - `name`: `Priya Sharma`
   - `course`: `IGCSE First Language English`
   - `rating`: `5`
   - `text`: `Ms. Ayeshabi's structured lessons and constant feedback transformed my essay writing. I achieved an A* in my board exams!`
   - `avatar`: `P` (or leave blank; the UI automatically derives initials)
   - `is_verified`: Toggle to **`TRUE`** (checked)
5. Click **"Save"**.
6. Visit the `/testimonials` page on the website. The testimonial will now immediately render dynamically.

> [!NOTE]
> If you set `is_verified` to `FALSE`, the review will **not** appear on the website, as enforced both by PostgreSQL RLS policy and the service layer.

---

## Service Layer Summary

- [`src/lib/supabase.js`](src/lib/supabase.js): Centralized Supabase client with environment validation and safe fallbacks.
- [`src/services/enquiryService.js`](src/services/enquiryService.js): `createEnquiry(data)` with field mapping, regex validation, duplicate submission protection, and Supabase insertion.
- [`src/services/contactService.js`](src/services/contactService.js): `createContactMessage(data)` with nullable phone support, validation, duplicate prevention, and Supabase insertion.
- [`src/services/testimonialService.js`](src/services/testimonialService.js): `getTestimonials()` filtering `is_verified = true` ordered newest-first.
