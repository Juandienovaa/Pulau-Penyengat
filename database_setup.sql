-- SUPABASE DATABASE SETUP FOR UMKM & AGENDA
-- Run this in your Supabase SQL Editor

-- 1. Create Enums
CREATE TYPE publication_status AS ENUM ('draft', 'published', 'archived');
CREATE TYPE umkm_category AS ENUM (
  'Kuliner', 'Oleh-Oleh', 'Kerajinan', 'Fashion Melayu', 
  'Kopi & Minuman', 'Produk Lokal', 'Seni & Budaya', 
  'Homestay', 'Experience'
);

-- 2. Create UMKM Table
CREATE TABLE umkm (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  category umkm_category NOT NULL,
  description text NOT NULL,
  story text,
  cover_image text,
  gallery text[] DEFAULT '{}',
  address text,
  lat double precision,
  lng double precision,
  opening_hours jsonb DEFAULT '[]'::jsonb,
  whatsapp text,
  instagram text,
  website text,
  halal_certified boolean DEFAULT false,
  verified_source text,
  products jsonb DEFAULT '[]'::jsonb,
  status publication_status DEFAULT 'draft' NOT NULL,
  featured boolean DEFAULT false NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 3. Create Agenda Table
CREATE TABLE agenda (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  category text NOT NULL,
  start_date timestamptz NOT NULL,
  end_date timestamptz NOT NULL,
  location text NOT NULL,
  organizer text NOT NULL,
  description text NOT NULL,
  subtitle text,
  cover_image text,
  gallery text[] DEFAULT '{}',
  ticket_price text,
  registration_link text,
  capacity integer DEFAULT 0,
  status publication_status DEFAULT 'draft' NOT NULL,
  featured boolean DEFAULT false NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 4. Set up Row Level Security (RLS)
ALTER TABLE umkm ENABLE ROW LEVEL SECURITY;
ALTER TABLE agenda ENABLE ROW LEVEL SECURITY;

-- Allow public read access to published records
CREATE POLICY "Public can view published UMKM" 
ON umkm FOR SELECT 
USING (status = 'published');

CREATE POLICY "Public can view published Agenda" 
ON agenda FOR SELECT 
USING (status = 'published');

-- Allow authenticated users (Admin) full access
CREATE POLICY "Admins can manage UMKM" 
ON umkm FOR ALL 
TO authenticated 
USING (true) WITH CHECK (true);

CREATE POLICY "Admins can manage Agenda" 
ON agenda FOR ALL 
TO authenticated 
USING (true) WITH CHECK (true);

-- 5. Storage Buckets (Optional: run if buckets aren't created yet)
INSERT INTO storage.buckets (id, name, public) VALUES ('public-images', 'public-images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read for images
CREATE POLICY "Public can view images" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'public-images');

-- Allow authenticated upload/delete
CREATE POLICY "Admins can upload images" 
ON storage.objects FOR INSERT 
TO authenticated 
WITH CHECK (bucket_id = 'public-images');

CREATE POLICY "Admins can update images" 
ON storage.objects FOR UPDATE 
TO authenticated 
USING (bucket_id = 'public-images');

CREATE POLICY "Admins can delete images" 
ON storage.objects FOR DELETE 
TO authenticated 
USING (bucket_id = 'public-images');
