-- ============================================================================
-- PHASE 1: CORE PRODUCT DATABASE
-- ============================================================================
-- Purpose: Stable foundation tables for the ProductIntel V1 product catalog.
--          Smartphones and foldable smartphones only.
--
-- Status:  DRAFT — Review before applying to Supabase SQL Editor.
--
-- SAFETY:  All CREATE statements use IF NOT EXISTS. No DROP TABLE anywhere.
--          Existing tables are never modified, only new ones are created.
--          The existing "products" table is preserved as-is.
--
-- ROLLBACK:
--   To undo this entire migration:
--     DROP TABLE IF EXISTS product_market_prices CASCADE;
--     DROP TABLE IF EXISTS product_media CASCADE;
--     DROP TABLE IF EXISTS product_specs CASCADE;
--     DROP TABLE IF EXISTS products CASCADE;
--     DROP TABLE IF EXISTS categories CASCADE;
--     DROP TABLE IF EXISTS brands CASCADE;
--   Each table section below also has its own per-table rollback note.
--
-- How to apply:
--   1. Open Supabase Dashboard → SQL Editor
--   2. Run this entire file
--   3. Verify: SELECT table_name FROM information_schema.tables
--      WHERE table_schema = 'public' AND table_name IN
--      ('brands','categories','products','product_specs','product_media',
--       'product_market_prices');
--
-- ============================================================================

-- ============================================================================
-- TABLE: brands
-- ============================================================================
-- Purpose: Normalized brand registry. Every product belongs to exactly one
--          brand. This avoids repeating brand names as raw strings and enables
--          brand-based filtering, brand pages, and logo management.
-- ============================================================================
CREATE TABLE IF NOT EXISTS brands (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT NOT NULL,
  slug       TEXT NOT NULL,
  logo_url   TEXT,
  country    TEXT,       -- Brand's country of origin (e.g., 'USA', 'South Korea', 'China')
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  CONSTRAINT uq_brands_name UNIQUE (name),
  CONSTRAINT uq_brands_slug UNIQUE (slug)
);

COMMENT ON TABLE brands IS
  'Normalized brand registry. Each row is one brand (Apple, Samsung, Google, OnePlus, etc.).';
COMMENT ON COLUMN brands.name IS
  'Display name (e.g., "Apple", "Samsung").';
COMMENT ON COLUMN brands.slug IS
  'URL-safe identifier (e.g., "apple", "samsung"). Used for brand pages and filtering.';
COMMENT ON COLUMN brands.logo_url IS
  'URL to the brand logo image. Nullable — can be populated later.';
COMMENT ON COLUMN brands.country IS
  'Brand headquarters country (e.g., "USA", "South Korea"). For regional filtering.';

CREATE INDEX IF NOT EXISTS idx_brands_slug ON brands (slug);

-- ROLLBACK: DROP TABLE IF EXISTS brands CASCADE;


-- ============================================================================
-- TABLE: categories
-- ============================================================================
-- Purpose: Product category tree. V1 is flat (smartphones, foldable) with
--          parent_id reserved for future hierarchy (e.g., phones → smartphones
--          → flagship, phones → foldable → book-style).
-- ============================================================================
CREATE TABLE IF NOT EXISTS categories (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug        TEXT NOT NULL,
  name        TEXT NOT NULL,
  description TEXT,
  parent_id   UUID,          -- Reserved for future subcategories. Must reference
                             -- categories.id when used. NULL = top-level.
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW(),

  CONSTRAINT uq_categories_slug UNIQUE (slug),
  CONSTRAINT fk_categories_parent
    FOREIGN KEY (parent_id) REFERENCES categories (id)
    ON DELETE SET NULL
);

COMMENT ON TABLE categories IS
  'Product categories. V1: "smartphones" and "foldable" only.';
COMMENT ON COLUMN categories.slug IS
  'URL-safe identifier (e.g., "smartphones", "foldable").';
COMMENT ON COLUMN categories.name IS
  'Display name (e.g., "Smartphones", "Foldable Smartphones").';
COMMENT ON COLUMN categories.description IS
  'Optional category description for SEO and category pages.';
COMMENT ON COLUMN categories.parent_id IS
  'Self-referencing FK for future hierarchy. NULL = top-level category.';

CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories (slug);
CREATE INDEX IF NOT EXISTS idx_categories_parent ON categories (parent_id);

-- Seed V1 categories (safe: no-op if already present)
INSERT INTO categories (slug, name, description)
VALUES
  ('smartphones', 'Smartphones', 'Premium and mid-range smartphones'),
  ('foldable', 'Foldable Smartphones', 'Foldable and flip-style smartphones')
ON CONFLICT (slug) DO NOTHING;

-- ROLLBACK: DROP TABLE IF EXISTS categories CASCADE;
-- NOTE: If you seeded categories and need to revert, run:
--   DELETE FROM categories WHERE slug IN ('smartphones', 'foldable');


-- ============================================================================
-- TABLE: products
-- ============================================================================
-- Purpose: Core product facts. One row per product. This is the single source
--          of truth for product identity, scores, editorial content, and
--          affiliate links. Everything else is a child table.
--
-- V1 scope: Only smartphones and foldable smartphones.
--
-- Columns that live here (product facts):
--   - Identity: id, slug, full_name, brand_id, category_id
--   - Description: description, release_date
--   - Benchmark scores: overall_score, camera_score, battery_score, gaming_score,
--     display_score, value_score
--   - Editorial content: pros, cons
--   - Sales: affiliate_url
--
-- What does NOT live here (separate tables):
--   - Specs (chipset, RAM, storage, etc.)  → product_specs
--   - Images                                 → product_media
--   - Prices per market                      → product_market_prices
--   - AI-generated insights                  → Phase 3
--   - Translations                           → Phase 2
--   - RAG documents                          → Phase 4
-- ============================================================================
CREATE TABLE IF NOT EXISTS products (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug        TEXT NOT NULL,
  full_name   TEXT NOT NULL,    -- Display name: "iPhone 17 Pro Max"
  brand_id    UUID NOT NULL,
  category_id UUID NOT NULL,
  description TEXT,
  release_date DATE,

  -- Benchmark scores (0–100 normalized, nullable because not all products
  -- may be scored initially)
  overall_score NUMERIC(5,2),
  camera_score  NUMERIC(5,2),
  battery_score NUMERIC(5,2),
  gaming_score  NUMERIC(5,2),
  display_score NUMERIC(5,2),
  value_score   NUMERIC(5,2),

  -- Editorial content (not AI-generated — curated pros and cons)
  pros JSONB DEFAULT '[]'::jsonb,
  cons JSONB DEFAULT '[]'::jsonb,

  -- Sales link
  affiliate_url TEXT,

  -- Row state
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  CONSTRAINT uq_products_slug UNIQUE (slug),
  CONSTRAINT fk_products_brand
    FOREIGN KEY (brand_id) REFERENCES brands (id)
    ON DELETE RESTRICT,       -- Prevent deleting a brand that has products
  CONSTRAINT fk_products_category
    FOREIGN KEY (category_id) REFERENCES categories (id)
    ON DELETE RESTRICT        -- Prevent deleting a category that has products
);

COMMENT ON TABLE products IS
  'Core product facts — one row per smartphone or foldable. Single source of truth for identity, scores, editorial content, and affiliate links.';
COMMENT ON COLUMN products.slug IS
  'URL-safe unique identifier (e.g., "iphone-17-pro-max"). Used for product pages and lookups.';
COMMENT ON COLUMN products.full_name IS
  'Full display name (e.g., "iPhone 17 Pro Max", "Samsung Galaxy S25 Ultra"). English only. Translations in product_translations (Phase 2).';
COMMENT ON COLUMN products.brand_id IS
  'FK to brands table. Every product has exactly one brand.';
COMMENT ON COLUMN products.category_id IS
  'FK to categories table. V1: smartphones or foldable.';
COMMENT ON COLUMN products.description IS
  'English product description. Short paragraph covering key highlights.';
COMMENT ON COLUMN products.release_date IS
  'Official launch/availability date.';
COMMENT ON COLUMN products.overall_score IS
  'Weighted composite score (0–100). Higher is better.';
COMMENT ON COLUMN products.camera_score IS
  'Camera benchmark score (0–100). Based on sensor quality, computational photography, video capabilities.';
COMMENT ON COLUMN products.battery_score IS
  'Battery benchmark score (0–100). Based on capacity, efficiency, charging speed.';
COMMENT ON COLUMN products.gaming_score IS
  'Gaming/performance benchmark score (0–100). Based on chipset, GPU, thermal management.';
COMMENT ON COLUMN products.display_score IS
  'Display benchmark score (0–100). Based on resolution, refresh rate, brightness, color accuracy.';
COMMENT ON COLUMN products.value_score IS
  'Value-for-money score (0–100). Based on price-to-performance ratio.';
COMMENT ON COLUMN products.pros IS
  'Array of curated strengths. JSONB array of strings. Example: ["Best-in-class performance", "Excellent display brightness"].';
COMMENT ON COLUMN products.cons IS
  'Array of curated weaknesses. JSONB array of strings. Example: ["Very expensive", "Charging could be faster"].';
COMMENT ON COLUMN products.affiliate_url IS
  'Default affiliate/purchase link (e.g., Amazon, manufacturer store).';
COMMENT ON COLUMN products.is_active IS
  'Soft delete / visibility flag. False = product is archived/hidden.';

-- Core lookup indexes
CREATE INDEX IF NOT EXISTS idx_products_slug ON products (slug);
CREATE INDEX IF NOT EXISTS idx_products_brand ON products (brand_id);
CREATE INDEX IF NOT EXISTS idx_products_category ON products (category_id);
CREATE INDEX IF NOT EXISTS idx_products_active ON products (is_active) WHERE is_active = true;

-- Score indexes for sorted queries (used by getTopProducts / getAllProducts)
CREATE INDEX IF NOT EXISTS idx_products_overall_score ON products (overall_score DESC);
CREATE INDEX IF NOT EXISTS idx_products_camera_score ON products (camera_score DESC);
CREATE INDEX IF NOT EXISTS idx_products_battery_score ON products (battery_score DESC);
CREATE INDEX IF NOT EXISTS idx_products_gaming_score ON products (gaming_score DESC);
CREATE INDEX IF NOT EXISTS idx_products_display_score ON products (display_score DESC);
CREATE INDEX IF NOT EXISTS idx_products_value_score ON products (value_score DESC);

-- GIN index for pros/cons array containment queries
-- Example: SELECT * FROM products WHERE pros @> '"Best-in-class performance"'::jsonb;
CREATE INDEX IF NOT EXISTS idx_products_pros ON products USING GIN (pros);
CREATE INDEX IF NOT EXISTS idx_products_cons ON products USING GIN (cons);

-- ROLLBACK: DROP TABLE IF EXISTS products CASCADE;


-- ============================================================================
-- TABLE: product_specs
-- ============================================================================
-- Purpose: Normalized product specifications as key-value pairs.
--          Each spec is one row: (product_id, spec_key, spec_value).
--          Queryable, indexable, joinable — unlike JSONB blobs.
--
-- Why key-value instead of columns per spec:
--   - Not all products have the same specs (foldables have inner/cover display)
--   - Adding a new spec type doesn't require ALTER TABLE
--   - Easy to compare across products (find all phones with 120Hz+ display)
--   - Spec groups enable UI sections (display, performance, camera, battery)
--
-- V1 spec_keys:
--   display:    screen_size, screen_type, resolution, refresh_rate
--   performance: chipset, gpu, ram, storage
--   camera:     rear_camera, front_camera
--   battery:    battery_capacity, battery_mah, fast_charge
--   network:    network
--   general:    os, weight, ai_features, condition, availability
-- ============================================================================
CREATE TABLE IF NOT EXISTS product_specs (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL,
  spec_key   TEXT NOT NULL,    -- Normalized: 'screen_size', 'chipset', 'ram', 'storage'
  spec_value TEXT NOT NULL,    -- Value: '6.9″', 'A19 Pro', '12GB', '256GB'
  spec_label TEXT NOT NULL,    -- Display label: 'Screen Size', 'Chipset', 'RAM', 'Storage'
  spec_group TEXT,             -- Group: 'display', 'performance', 'camera', 'battery', 'network', 'general'
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),

  CONSTRAINT fk_product_specs_product
    FOREIGN KEY (product_id) REFERENCES products (id)
    ON DELETE CASCADE,         -- Deleting a product removes its specs
  CONSTRAINT uq_product_specs_key
    UNIQUE (product_id, spec_key)  -- One value per spec key per product
);

COMMENT ON TABLE product_specs IS
  'Normalized product specifications as key-value pairs. Flexible, queryable, and indexable — unlike JSONB.';
COMMENT ON COLUMN product_specs.spec_key IS
  'Normalized machine key (e.g., "screen_size", "chipset", "ram", "storage"). Used for cross-product comparisons.';
COMMENT ON COLUMN product_specs.spec_value IS
  'Raw spec value (e.g., "6.9″", "A19 Pro", "12GB"). As displayed to users.';
COMMENT ON COLUMN product_specs.spec_label IS
  'Human-readable label (e.g., "Screen Size", "Chipset", "RAM"). Displayed in spec tables and chips.';
COMMENT ON COLUMN product_specs.spec_group IS
  'Grouping category: "display", "performance", "camera", "battery", "network", "general". Used for UI section headers.';
COMMENT ON COLUMN product_specs.sort_order IS
  'Display order within a spec group. Lower numbers appear first.';

CREATE INDEX IF NOT EXISTS idx_product_specs_product ON product_specs (product_id);
CREATE INDEX IF NOT EXISTS idx_product_specs_key ON product_specs (spec_key);
CREATE INDEX IF NOT EXISTS idx_product_specs_group ON product_specs (spec_group);

-- Composite index for efficient "find all products with a given spec value"
-- Example: SELECT p.* FROM products p JOIN product_specs ps ON p.id = ps.product_id
--          WHERE ps.spec_key = 'chipset' AND ps.spec_value ILIKE '%Snapdragon 8 Gen 4%';
CREATE INDEX IF NOT EXISTS idx_product_specs_key_value ON product_specs (spec_key, spec_value);

-- ROLLBACK: DROP TABLE IF EXISTS product_specs CASCADE;


-- ============================================================================
-- TABLE: product_media
-- ============================================================================
-- Purpose: All images and media assets for each product. One row per asset.
--          Separating media from the products table allows multiple images,
--          different types (main, gallery, render), and proper ordering.
-- ============================================================================
CREATE TABLE IF NOT EXISTS product_media (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL,
  url        TEXT NOT NULL,
  media_type TEXT NOT NULL DEFAULT 'gallery',
  alt_text   TEXT,
  width      INTEGER,
  height     INTEGER,
  file_size  INTEGER,          -- In bytes
  sort_order INTEGER DEFAULT 0,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),

  CONSTRAINT fk_product_media_product
    FOREIGN KEY (product_id) REFERENCES products (id)
    ON DELETE CASCADE,

  CONSTRAINT chk_product_media_type
    CHECK (media_type IN ('main', 'gallery', 'render', 'video'))
);

COMMENT ON TABLE product_media IS
  'Product media assets — images, renders, and videos. One row per asset.';
COMMENT ON COLUMN product_media.url IS
  'Absolute URL or path to the media asset.';
COMMENT ON COLUMN product_media.media_type IS
  'Type of media: "main" (primary hero image), "gallery" (additional photos), "render" (CGI/product visualization), "video".';
COMMENT ON COLUMN product_media.alt_text IS
  'Alt text for accessibility and SEO.';
COMMENT ON COLUMN product_media.sort_order IS
  'Display order. Lower numbers appear first.';
COMMENT ON COLUMN product_media.is_primary IS
  'Exactly one media row per product should be primary (used as the main thumbnail/hero image).';

CREATE INDEX IF NOT EXISTS idx_product_media_product ON product_media (product_id);
CREATE INDEX IF NOT EXISTS idx_product_media_type ON product_media (media_type);
CREATE INDEX IF NOT EXISTS idx_product_media_primary ON product_media (product_id, is_primary)
  WHERE is_primary = true;

-- Enforce at most one primary image per product
-- (partial unique index: only one row can have is_primary = true per product)
CREATE UNIQUE INDEX IF NOT EXISTS uq_product_media_primary
  ON product_media (product_id) WHERE is_primary = true;

-- ROLLBACK: DROP TABLE IF EXISTS product_media CASCADE;


-- ============================================================================
-- TABLE: product_market_prices
-- ============================================================================
-- Purpose: Prices per currency and store with effective date range.
--          Separating pricing from products enables:
--            - Multiple currencies (USD, EUR, MAD, GBP, etc.)
--            - Price history/trends (effective_from → effective_to)
--            - Per-store pricing (Amazon, manufacturer store, carrier)
--            - Regional pricing without duplicating the product row
-- ============================================================================
CREATE TABLE IF NOT EXISTS product_market_prices (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id    UUID NOT NULL,
  currency      TEXT NOT NULL,       -- ISO 4217: 'USD', 'EUR', 'MAD', 'GBP', 'CAD'
  price         NUMERIC(10,2) NOT NULL,
  store         TEXT,                -- Retailer name (null = general market price)
  url           TEXT,                -- Purchase/affiliate URL for this store
  effective_from DATE NOT NULL DEFAULT CURRENT_DATE,
  effective_to  DATE,               -- null = currently active, no known end
  is_active     BOOLEAN DEFAULT true,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW(),

  CONSTRAINT fk_product_market_prices_product
    FOREIGN KEY (product_id) REFERENCES products (id)
    ON DELETE CASCADE,

  CONSTRAINT uq_product_market_price
    UNIQUE (product_id, currency, store, effective_from),

  CONSTRAINT chk_product_market_price_positive
    CHECK (price > 0),

  CONSTRAINT chk_product_market_dates
    CHECK (effective_to IS NULL OR effective_to >= effective_from)
);

COMMENT ON TABLE product_market_prices IS
  'Product prices per currency and store with effective date ranges. Enables multi-currency, price history, and regional pricing without duplicating product rows.';
COMMENT ON COLUMN product_market_prices.currency IS
  'ISO 4217 currency code (e.g., "USD", "EUR", "MAD", "GBP", "CAD").';
COMMENT ON COLUMN product_market_prices.price IS
  'Price in the specified currency. Always positive.';
COMMENT ON COLUMN product_market_prices.store IS
  'Retailer or marketplace name (e.g., "Amazon US", "Amazon DE", "Carrefour"). Null = general/street price.';
COMMENT ON COLUMN product_market_prices.url IS
  'Direct purchase link or affiliate URL for this price.';
COMMENT ON COLUMN product_market_prices.effective_from IS
  'Date this price became (or will become) effective.';
COMMENT ON COLUMN product_market_prices.effective_to IS
  'Date this price stopped being effective. Null = currently active.';
COMMENT ON COLUMN product_market_prices.is_active IS
  'Convenience flag. True = this is the current/relevant price row.';

CREATE INDEX IF NOT EXISTS idx_product_market_prices_product ON product_market_prices (product_id);
CREATE INDEX IF NOT EXISTS idx_product_market_prices_currency ON product_market_prices (currency);
CREATE INDEX IF NOT EXISTS idx_product_market_prices_active ON product_market_prices (is_active);

-- Composite index for looking up current prices: "Find me the active USD price for this product"
CREATE INDEX IF NOT EXISTS idx_product_market_prices_product_currency_active
  ON product_market_prices (product_id, currency, is_active)
  WHERE is_active = true;

-- ROLLBACK: DROP TABLE IF EXISTS product_market_prices CASCADE;


-- ============================================================================
-- TRIGGER: auto-update updated_at on row modification
-- ============================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all tables with an updated_at column
CREATE TRIGGER trg_brands_updated_at
  BEFORE UPDATE ON brands
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trg_categories_updated_at
  BEFORE UPDATE ON categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trg_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trg_product_market_prices_updated_at
  BEFORE UPDATE ON product_market_prices
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


-- ============================================================================
-- MIGRATION NOTE: Legacy "products" table coexistence
-- ============================================================================
-- The existing Supabase "products" table is NOT dropped or modified by this
-- migration. The Phase 1 tables (brands, categories, products, etc.) are new
-- and coexist alongside the legacy table.
--
-- Data migration from the legacy table to the new schema is a separate step
-- and will be performed only after:
--   1. This schema is verified against the data needs of the frontend
--   2. supabase.ts is updated to query the new tables
--   3. All 7 fallback products are inserted via seed script
-- ============================================================================


-- ============================================================================
-- VERIFICATION QUERIES (run after applying)
-- ============================================================================
-- 1. List all created tables:
--    SELECT table_name FROM information_schema.tables
--    WHERE table_schema = 'public' AND table_name IN
--    ('brands','categories','products','product_specs','product_media',
--     'product_market_prices');
--
-- 2. Check seeded categories:
--    SELECT slug, name FROM categories;
--
-- 3. Check all indexes were created:
--    SELECT indexname, tablename FROM pg_indexes
--    WHERE tablename IN ('brands','categories','products','product_specs',
--    'product_media','product_market_prices')
--    ORDER BY tablename, indexname;
--
-- 4. Check trigger count:
--    SELECT tgname, tgrelid::regclass FROM pg_trigger
--    WHERE tgname LIKE 'trg_%_updated_at';
-- ============================================================================
