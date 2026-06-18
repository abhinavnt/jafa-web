-- Create Products Table (Handles both Dates/Nuts and Gifts)
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  price NUMERIC,
  original_price NUMERIC,
  image TEXT NOT NULL,
  hover_image TEXT,
  is_new BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'In Stock',
  type TEXT NOT NULL, -- 'dates_nuts' or 'gifts'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create Events Table (Portfolio items)
CREATE TABLE events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  image TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Set up Row Level Security (RLS)
-- Enable RLS on tables
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Create policies so ANYONE can READ the data
CREATE POLICY "Public profiles are viewable by everyone." 
  ON products FOR SELECT 
  USING ( true );

CREATE POLICY "Public events are viewable by everyone." 
  ON events FOR SELECT 
  USING ( true );

-- Create policies so ONLY AUTHENTICATED ADMINS can INSERT, UPDATE, DELETE
CREATE POLICY "Enable insert for authenticated users only"
  ON products FOR INSERT
  TO authenticated WITH CHECK (true);

CREATE POLICY "Enable update for authenticated users only"
  ON products FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Enable delete for authenticated users only"
  ON products FOR DELETE
  TO authenticated USING (true);

CREATE POLICY "Enable insert for authenticated users only"
  ON events FOR INSERT
  TO authenticated WITH CHECK (true);

CREATE POLICY "Enable update for authenticated users only"
  ON events FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Enable delete for authenticated users only"
  ON events FOR DELETE
  TO authenticated USING (true);

-- Create Offers Table (For Home Page Banner)
CREATE TABLE offers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  text TEXT NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  is_active BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE offers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public offers are viewable by everyone." 
  ON offers FOR SELECT 
  USING ( true );

CREATE POLICY "Enable insert for authenticated users only"
  ON offers FOR INSERT
  TO authenticated WITH CHECK (true);

CREATE POLICY "Enable update for authenticated users only"
  ON offers FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Enable delete for authenticated users only"
  ON offers FOR DELETE
  TO authenticated USING (true);
