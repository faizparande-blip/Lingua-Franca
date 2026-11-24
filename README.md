# Lingua Franca – The English Tutorials

A luxury, high-performance web platform built for **Lingua Franca – The English Tutorials**, founded by **Ms. Ayeshabi Saheb** (18+ years of teaching excellence).

## Brand Identity & Palette
- **Main Background**: `#080808`
- **Secondary Background**: `#101010`
- **Card Background**: `#191919`
- **Primary Gold**: `#D6A84F`
- **Light Gold**: `#EAC477`
- **Ivory White**: `#F5E9D0`
- **Secondary Text**: `#C5BDAF`
- **Golden Border**: `rgba(214, 168, 79, 0.35)`

---

## Technology Stack
- **Framework**: React 19 + Vite 6
- **Routing**: React Router DOM v7
- **Styling**: Tailwind CSS v3 with custom typography and animations
- **Icons**: Lucide React
- **Typography**: Google Fonts (*Playfair Display* for serif headings, *Inter* for body)

---

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Local Development Server
```bash
npm run dev
```

### 3. Production Build
```bash
npm run build
```

---

## Project Architecture & Directory Layout

```
src/
├── assets/             # Logos, brand SVGs, icons
├── components/
│   ├── common/         # Navbar, Footer, Button, Loader, BackToTop, ScrollToTop
│   ├── home/           # Hero, Stats, CoursesPreview, ServicesPreview
│   ├── courses/        # CourseCard
│   ├── forms/          # DemoForm, ContactForm (with validation & mock service calls)
│   └── layout/         # MainLayout (header, footer, scroll management)
├── data/               # Static datasets (courses, services, testimonials, navigation)
├── hooks/              # useScrollToTop
├── pages/              # Home, About, Courses, Services, Testimonials, Contact, NotFound
├── services/           # Backend-ready service layer (isolated mock functions)
│   ├── enquiryService.js
│   ├── courseService.js
│   ├── testimonialService.js
│   └── contactService.js
├── styles/             # globals.css (Tailwind directives, custom variables)
└── utils/              # Form validators, WhatsApp link generators
```

---

## Future Supabase Backend Integration Guide

The frontend has been built with an isolated, backend-ready service layer so your backend partner can connect Supabase without rewriting components.

### Step 1: Environment Variables
Create a `.env.local` file (modeled after `.env.example`):
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
VITE_APP_NAME=Lingua Franca
VITE_WHATSAPP_NUMBER=919167217749
```

### Step 2: Supabase Client Library
Install the client:
```bash
npm install @supabase/supabase-js
```

Create `src/lib/supabase.js`:
```javascript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### Step 3: Replace Mock Implementations in `src/services/`
Simply swap out the mock functions inside:
1. `src/services/enquiryService.js`:
   ```javascript
   import { supabase } from '../lib/supabase';
   
   export async function createEnquiry(data) {
     const { data: result, error } = await supabase.from('enquiries').insert([data]).select();
     if (error) throw error;
     return { success: true, data: result[0] };
   }
   ```
2. `src/services/contactService.js`:
   ```javascript
   import { supabase } from '../lib/supabase';
   
   export async function createContactMessage(data) {
     const { data: result, error } = await supabase.from('contact_messages').insert([data]).select();
     if (error) throw error;
     return { success: true, data: result[0] };
   }
   ```
3. `src/services/testimonialService.js`:
   Query your verified reviews from Supabase table `testimonials`.

---

## Contact & Academy Info
- **Lead Educator**: Ms. Ayeshabi Saheb
- **Phone**: +91 91672 17749 / +91 98334 68057
- **Address**: B/16, 2nd Floor, Anu Apartment, Milan Subway Road, Santacruz West, Mumbai - 400054, Maharashtra, India.



