# AI Product Intelligence Platform — AI Operating Model

## 1. Mission

This platform is an enterprise-grade AI-native product intelligence system for consumer technology.

It combines structured product data, semantic retrieval, embeddings, recommendation systems, RAG assistants, dynamic product comparisons, multilingual SEO automation, and multi-agent AI workflows.

The goal is not to build a simple product catalog. The goal is to build a scalable AI operating system for product discovery and product intelligence.

---

## 2. Core Positioning

**Positioning statement**

> A vertical AI product intelligence platform for consumer technology, combining structured specs, benchmarks, pricing, semantic search, recommendations, RAG, comparison intelligence, multilingual content, and agentic automation.

**Main product categories**

- Smartphones
- Tablets
- Smartwatches
- Earbuds
- AI devices
- Consumer technology accessories

**Main intelligence assets**

- Product specs
- Prices in multiple currencies
- Benchmarks
- Scores
- Product summaries
- Multilingual marketing content
- Comparison data
- Embedding-ready product documents
- Source metadata

---

## 3. Current Data Reality

The current dataset already contains a wide product intelligence schema with fields such as:

- Product identity: brand, model, slug, category, full name
- Availability: stock status, release year, release month
- Pricing: USD, EUR, MAD, SAR, AED, KWD, EGP, QAR, OMR, BHD, JOD, and more
- Display: size, type, resolution, refresh rate, brightness, protection
- Performance: chipset, GPU, CPU cores, RAM, storage, AnTuTu score
- Cameras: rear camera, main megapixels, aperture, front camera, zoom, video support
- Battery: capacity, charging watts, wireless charging, reverse charging
- Connectivity: network, SIM type, eSIM, Wi-Fi, Bluetooth, NFC, USB
- Build: material, IP rating, colors, dimensions, weight
- Software and AI: OS, UI version, AI features, desktop mode, stylus support
- Scores: gaming, battery, camera, display, value, global score, comparison score
- Content: SEO metadata, multilingual titles, summaries, buying guides, highlights, pros, cons, expert opinions, FAQ
- Readiness flags: embedding_ready, multilingual_ready, project_stage

This means the platform should treat the CSV/database as a serious product intelligence asset, not as a basic product list.

---

## 4. Operating Principle

The platform must separate three things:

1. **Raw source data** — what comes from external sources or manual import.
2. **Validated product intelligence** — cleaned, normalized, trusted product data.
3. **AI experiences** — search, recommendations, comparisons, RAG, SEO, and agents.

The system should never go directly from raw source to final production table without validation.

Bad workflow:

```txt
Source → AI → SQL direct → Production database
```

Professional workflow:

```txt
Source → Extraction → Structured JSON → Validation → Normalization → Human Review if needed → Supabase → Embeddings → AI Experiences
```

---

## 5. System Workflow

```txt
Product Source URL + Image URL
↓
Source Ingestion
↓
Extraction Agent
↓
Raw Product JSON
↓
Validation Agent
↓
Normalized Product JSON
↓
Supabase Writer
↓
Embedding Builder
↓
Search / RAG / Recommendation / Comparison / SEO
```

---

## 6. Human vs AI Responsibilities

### Human Responsibilities

The human operator is responsible for:

- Selecting reliable product sources
- Choosing which products to add
- Reviewing suspicious data
- Defining scoring logic
- Approving important content
- Controlling quality
- Managing sponsor/business strategy

### AI Responsibilities

AI agents are responsible for:

- Extracting product specs
- Structuring raw information into JSON
- Detecting missing or inconsistent values
- Normalizing units and field formats
- Generating multilingual content
- Creating embedding documents
- Assisting comparison and recommendation workflows
- Producing SEO drafts

The AI is not the full system. The architecture is the system.

---

## 7. First Agent Set

The first production version should use 8 core agents.

### 1. Source Ingestion Agent

**Purpose:** Register new product URLs and image URLs.

**Input:**

```json
{
  "source_url": "https://www.gsmarena.com/example-product.php",
  "image_url": "https://example.com/product.jpg",
  "source_name": "GSMArena"
}
```

**Output:** source record with status `pending_extraction`.

---

### 2. Product Extraction Agent

**Purpose:** Convert source data into structured product JSON.

**Output:** raw extracted JSON.

This agent should not write directly to production tables.

---

### 3. Data Validation Agent

**Purpose:** Detect missing, suspicious, invalid, or duplicate data.

Checks:

- Missing brand/model/category
- Invalid price values
- Bad image URL
- Unrealistic battery capacity
- Invalid RAM/storage values
- Duplicate slug
- Unsupported category

---

### 4. Data Normalization Agent

**Purpose:** Convert product values into platform standards.

Examples:

- `12 Go` → `12GB`
- `5000 mah` → `5000mAh`
- `6.8 inches` → `6.8` numeric inch field
- `AMOLED Display` → `AMOLED`

---

### 5. Supabase Writer Agent

**Purpose:** Insert or update cleaned records in Supabase.

Writes to:

- `products`
- `product_specs`
- `product_prices`
- `product_scores`
- `product_media`
- `product_content`
- `product_embeddings`

---

### 6. Embedding Agent

**Purpose:** Create embedding-ready product documents and store vectors in `pgvector`.

Embedding document types:

- `product_summary`
- `spec_profile`
- `recommendation_profile`
- `comparison_profile`
- `seo_profile`

---

### 7. Recommendation Agent

**Purpose:** Recommend products based on user intent, constraints, scores, specs, and budget.

Example queries:

- Best phone under €500
- Best phone for gaming
- Best earbuds for calls
- Best tablet for students

---

### 8. SEO Content Agent

**Purpose:** Generate SEO content and multilingual product intelligence.

Outputs:

- Meta title
- Meta description
- Buying guide
- FAQ
- Pros/cons
- Expert opinion
- Comparison article
- Multilingual summaries

---

## 8. Website Intelligent Operations

The website should include these intelligent operations.

### Semantic Product Search

User query:

```txt
best camera phone under 600 euros
```

System interpretation:

```json
{
  "category": "smartphone",
  "budget_max": 600,
  "currency": "EUR",
  "priority": ["camera", "value"]
}
```

---

### AI Recommendation System

The recommendation engine should combine:

- Product scores
- Structured specs
- Price range
- User intent
- Semantic embeddings
- Availability
- Use-case rules

---

### Dynamic Comparison Engine

Comparison output should include:

- Spec winner
- Camera winner
- Battery winner
- Gaming winner
- Display winner
- Value winner
- Final recommendation by persona

---

### RAG Product Assistant

The assistant should answer using:

- SQL retrieval from Supabase
- Vector search from `pgvector`
- Structured specs
- Benchmarks
- Scores
- Prices
- Product content

The assistant should return answer provenance where possible.

---

### SEO Automation Engine

The SEO engine should generate:

- Product pages
- Comparison pages
- Buying guides
- Category landing pages
- Multilingual FAQ pages

Examples:

- Best phones under €500 in 2026
- Xiaomi 17T Pro vs OnePlus Nord CE6
- Best battery phones for students
- Best earbuds for calls

---

## 9. Database Strategy

Use a layered database model.

```txt
source_records
↓
raw_product_extractions
↓
validated_product_records
↓
products + normalized domain tables
↓
product_embeddings
```

### Recommended Tables

#### `source_records`

Stores source URLs, image URLs, and ingestion status.

#### `raw_product_extractions`

Stores untrusted AI extraction output.

#### `validated_product_records`

Stores validation status, clean JSON, errors, and confidence score.

#### `products`

Stores canonical product identity.

#### `product_specs`

Stores technical specifications.

#### `product_prices`

Stores multi-currency prices.

#### `product_scores`

Stores product intelligence scores.

#### `product_media`

Stores image and video metadata.

#### `product_content`

Stores multilingual SEO and marketing content.

#### `product_embeddings`

Stores embedding text and vector data.

#### `agent_runs`

Stores logs for every AI/pipeline operation.

---

## 10. Supabase Ingestion Policy

A product should only be inserted into final production tables when:

- Required identity fields exist: brand, model, category, slug
- Source URL is stored
- Image URL is validated or manually approved
- Critical specs are normalized
- Duplicate check passes
- Validation confidence is above threshold

Recommended validation statuses:

```txt
pending_extraction
extracted
validation_failed
needs_human_review
validated
inserted
embedding_created
published
```

---

## 11. Differentiation

The platform is different from generic e-commerce search tools because it is vertical and intelligence-rich.

### Generic AI shopping tool

- Works across many categories
- Often shallow product understanding
- Focuses mainly on conversion
- May not deeply understand specs or benchmarks

### This platform

- Focused on consumer technology
- Deep structured specs
- Benchmarks and scores
- Dynamic comparisons
- Multilingual product intelligence
- Semantic retrieval
- RAG assistant
- SEO automation
- Agentic data operations

---

## 12. Sponsor Value Proposition

Sponsors care about:

- Qualified traffic
- Product visibility
- Comparison visibility
- Purchase intent
- Market intelligence
- SEO reach
- Lead generation

Sponsor pitch:

> Our platform helps high-intent consumer tech buyers discover, compare, and understand products through AI-powered search, recommendations, dynamic comparisons, and multilingual buying guides. Sponsors can reach users exactly when they are researching and deciding what to buy.

Sponsor opportunities:

- Sponsored product placements
- Sponsored comparison visibility
- Featured buying guides
- Launch campaign pages
- AI recommendation visibility
- Retailer/affiliate integrations
- Market intelligence reports

---

## 13. Legal and Data Safety Notes

For external sources:

- Store the source URL for traceability
- Extract factual information carefully
- Do not copy long descriptions or reviews directly
- Generate original descriptions and summaries
- Do not hotlink images at scale unless permitted
- Prefer official manufacturer images, affiliate feeds, licensed image providers, or your own CDN
- Use rate limits and respect source terms

---

## 14. First MVP

The first MVP should be **Product Ingestion Pipeline MVP**.

Input:

```txt
Product URL + Image URL
```

Output:

```txt
Validated product JSON
Supabase-ready normalized record
Embedding-ready product document
SEO product summary draft
```

MVP modules:

```txt
packages/data-pipeline/src/ingest_source.py
packages/data-pipeline/src/extract_product.py
packages/data-pipeline/src/validate_product.py
packages/data-pipeline/src/normalize_product.py
packages/data-pipeline/src/build_embedding_document.py
packages/data-pipeline/src/insert_supabase.py
```

---

## 15. Roadmap

### Phase 1 — Foundation

- Define operating model
- Create staging tables
- Create JSON schemas
- Create data pipeline scripts
- Validate current CSV structure

### Phase 2 — Product Ingestion MVP

- Add source records
- Extract product JSON
- Validate and normalize data
- Insert into Supabase
- Generate embedding document

### Phase 3 — Search MVP

- Create embeddings
- Store in `pgvector`
- Build FastAPI `/search`
- Add hybrid search
- Add basic reranking

### Phase 4 — Recommendation MVP

- Use intent detection
- Combine scores, specs, and embeddings
- Return ranked product recommendations

### Phase 5 — Comparison Engine

- Build dynamic product comparison API
- Generate persona-based verdicts

### Phase 6 — RAG Assistant

- Add SQL + vector retrieval
- Add answer provenance
- Add assistant workflows

### Phase 7 — SEO Automation

- Generate category pages
- Generate comparison pages
- Generate multilingual buying guides

### Phase 8 — Multi-Agent Orchestration

- Convert scripts into LangGraph nodes
- Add supervisor agent
- Add agent monitoring and replay

---

## 16. Architecture Rule

Start simple, then upgrade.

Do not begin with complex multi-agent orchestration.

Correct path:

```txt
Scripts → Pipeline → Validated workflow → Agents → LangGraph orchestration → Production system
```
