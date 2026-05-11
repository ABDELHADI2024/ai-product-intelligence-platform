# Manual AI Agent Workflow

## AI Product Intelligence Platform

This document defines the first practical workflow for adding new products into the AI Product Intelligence Platform without using paid APIs, complex automation, local development, or external deployment tools.

The goal is to build a professional human-in-the-loop AI system using:

- Supabase
- GitHub
- ChatGPT / Claude as manual AI agents
- Structured JSON
- Validation checklists
- SQL copy-paste workflows

This is the recommended Phase 1 workflow before moving to OpenAI API, LangGraph, GitHub Actions, or full automation.

---

## 1. Core Principle

At this stage, AI agents are not code-based agents yet.

They are structured operational agents:

```txt
Prompt + JSON template + validation rules + Supabase SQL output
```

This gives the project a clear AI architecture while keeping the workflow simple, low-cost, and controlled.

The system should avoid this:

```txt
Source URL → AI → SQL direct → products table
```

The correct workflow is:

```txt
Source URL
↓
Extraction Agent
↓
Structured JSON
↓
Validation Agent
↓
Normalization Agent
↓
SQL Mapping Agent
↓
Supabase Insert
↓
Embedding Document Agent
↓
SEO Content Agent
```

---

## 2. Current Phase

Current phase:

```txt
Human-in-the-loop AI pipeline
```

This means the human controls the final insert into Supabase.

The AI helps with:

- extraction
- structure
- validation
- normalization
- content generation
- SQL generation
- comparison text
- SEO content
- embedding-ready text

The human reviews and approves before inserting data.

---

## 3. Why This Workflow Is Good

This workflow is useful because it is:

- low cost
- simple to start
- safer than full automation
- easy to debug
- good for data quality
- compatible with Supabase
- compatible with future automation
- professional enough for GitHub documentation

It also proves that the project is not just using AI randomly. It uses AI inside a controlled data production pipeline.

---

## 4. Main Manual Agents

The first version of the platform uses 7 manual AI agents.

```txt
1. Source Intake Agent
2. Product Extraction Agent
3. Data Validation Agent
4. Data Normalization Agent
5. Supabase SQL Agent
6. Embedding Document Agent
7. SEO Content Agent
```

Later, these agents can become real automated agents with LangGraph.

---

# Agent 1 — Source Intake Agent

## Purpose

Prepare the source input before extraction.

## Input

```txt
Product name:
Source URL:
Image URL:
Source name:
Category:
Notes:
```

## Example

```txt
Product name: Huawei Nova 15 Max
Source URL: https://www.gsmarena.com/huawei_nova_15_max-14656.php
Image URL: https://fdn2.gsmarena.com/vv/pics/huawei/huawei-nova-15-max-1.jpg
Source name: GSMArena
Category: smartphone
Notes: New product source for AI pipeline
```

## Supabase Target Table

```txt
source_records
```

## SQL Template

```sql
insert into public.source_records (
  source_name,
  source_url,
  image_url,
  product_hint,
  status
)
values (
  'gsmarena',
  'SOURCE_URL_HERE',
  'IMAGE_URL_HERE',
  'PRODUCT_NAME_HERE',
  'pending'
);
```

---

# Agent 2 — Product Extraction Agent

## Purpose

Extract product information into structured JSON.

The output must be JSON only, not SQL.

## Prompt Template

```txt
You are the Product Extraction Agent for an AI Product Intelligence Platform.

Your task is to extract clean product data from the provided product source information.

Rules:
- Output valid JSON only.
- Do not output SQL.
- Do not invent unknown specs.
- If a value is unknown, use null.
- Keep units clear and consistent.
- Use English field names.
- Preserve the source URL and image URL.
- Focus on factual product intelligence data.

Input:
Product name: {{PRODUCT_NAME}}
Source URL: {{SOURCE_URL}}
Image URL: {{IMAGE_URL}}
Raw specs / copied source text:
{{RAW_PRODUCT_TEXT}}

Return JSON using this structure:

{
  "identity": {
    "brand": null,
    "model": null,
    "full_name": null,
    "slug": null,
    "product_type": "smartphone",
    "normalized_category": "smartphones",
    "condition": "new"
  },
  "source": {
    "source_name": "gsmarena",
    "source_url": null,
    "image_url": null
  },
  "release": {
    "release_year": null,
    "release_month": null,
    "availability": null,
    "stock_status": "unknown"
  },
  "pricing": {
    "currency": null,
    "price_usd": null,
    "price_eur": null,
    "price_mad": null,
    "price_sar": null,
    "price_aed": null
  },
  "display": {
    "screen_size": null,
    "screen_size_inch": null,
    "screen_type": null,
    "resolution": null,
    "refresh_rate": null,
    "refresh_rate_hz": null,
    "brightness_nits": null,
    "screen_protection": null
  },
  "performance": {
    "chipset": null,
    "gpu": null,
    "cpu_cores": null,
    "ram": null,
    "ram_gb": null,
    "storage": null,
    "storage_gb": null,
    "antutu_score": null
  },
  "camera": {
    "rear_camera": null,
    "main_camera_mp": null,
    "camera_aperture_main": null,
    "front_camera": null,
    "front_camera_mp": null,
    "camera_zoom_optical": null,
    "camera_video_4k": null
  },
  "battery": {
    "battery_capacity": null,
    "battery_mah": null,
    "fast_charge": null,
    "charging_w": null,
    "charging_technology": null,
    "fast_charge_minutes": null,
    "wireless_charging": null,
    "reverse_wireless_charging": null
  },
  "connectivity": {
    "network": null,
    "sim_type": null,
    "esim_support": null,
    "wifi": null,
    "bluetooth": null,
    "nfc": null,
    "usb_type": null
  },
  "design": {
    "material_back": null,
    "material_frame": null,
    "ip_rating": null,
    "colors_available": null,
    "color_main": null,
    "dimensions_mm": null,
    "weight_g": null,
    "waterproof": null
  },
  "software_features": {
    "os": null,
    "ui_version": null,
    "ai_features": null,
    "desktop_mode": null,
    "stylus_support": null,
    "audio": null,
    "fingerprint": null
  },
  "scores": {
    "gaming_score": null,
    "battery_score": null,
    "camera_score": null,
    "display_score": null,
    "value_score": null,
    "global_score": null,
    "compare_score": null
  },
  "pipeline": {
    "embedding_ready": false,
    "multilingual_ready": false,
    "project_stage": "raw_extraction",
    "confidence_score": null,
    "missing_fields": [],
    "validation_notes": []
  }
}
```

---

# Agent 3 — Data Validation Agent

## Purpose

Check if the extracted JSON is safe and clean enough to insert into Supabase.

## Prompt Template

```txt
You are the Data Validation Agent for an AI Product Intelligence Platform.

Your task is to review the extracted product JSON and detect problems before database insertion.

Rules:
- Do not rewrite everything unless needed.
- Check missing fields.
- Check wrong units.
- Check impossible values.
- Check duplicate or inconsistent fields.
- Check whether the slug is clean.
- Check whether values match the platform schema.
- Return a validation report and a corrected JSON if needed.

Input JSON:
{{PRODUCT_JSON}}

Return this structure:

{
  "validation_status": "approved | needs_review | rejected",
  "confidence_score": 0.0,
  "critical_errors": [],
  "warnings": [],
  "missing_fields": [],
  "normalization_needed": [],
  "corrected_json": {}
}
```

## Validation Checklist

```txt
Identity:
- brand exists
- model exists
- full_name exists
- slug is lowercase and hyphenated
- product_type is valid
- normalized_category is valid

Display:
- screen size is realistic
- refresh rate is numeric if available
- brightness has nits if available

Performance:
- RAM uses GB
- storage uses GB
- chipset name is not mixed with CPU text

Battery:
- capacity uses mAh
- charging uses W

Camera:
- megapixels use MP
- front and rear camera are separated

Content:
- no copied long text from source
- summaries are original

Pipeline:
- confidence score exists
- missing fields are listed
```

---

# Agent 4 — Data Normalization Agent

## Purpose

Convert messy values into standard platform values.

## Prompt Template

```txt
You are the Data Normalization Agent for an AI Product Intelligence Platform.

Normalize the following product JSON so it matches the platform schema.

Rules:
- Keep unknown values as null.
- Convert units consistently.
- Do not invent specs.
- Keep original meaning.
- Prepare values for Supabase insertion.

Normalization examples:
- 12 Go → 12GB
- 5000 mah → 5000mAh
- 120 hz → 120Hz
- 67 watt → 67W
- 6.8 inches → 6.8
- yes → true-like text value: "yes"
- no → "no"

Input JSON:
{{VALIDATED_JSON}}

Return normalized JSON only.
```

---

# Agent 5 — Supabase SQL Agent

## Purpose

Map the final normalized JSON into your current `public.products` table.

## Prompt Template

```txt
You are the Supabase SQL Agent for an AI Product Intelligence Platform.

Your task is to convert the normalized product JSON into a safe SQL insert for the existing public.products table.

Rules:
- Output SQL only.
- Insert only fields that exist in the provided schema.
- Use null for unknown values.
- Escape single quotes correctly.
- Do not include explanations.
- Do not create tables.
- Do not update existing products unless asked.
- Set embedding_ready = false.
- Set multilingual_ready based on whether multilingual content exists.
- Set project_stage = 'manual_ai_pipeline'.

Products table schema fields:
brand, model, slug, product_type, type_model, normalized_category, full_name, condition,
release_year, release_month, stock_status, availability,
price_usd, price_eur, price_mad, price_sar, price_aed,
currency,
screen_size, screen_size_inch, screen_type, resolution, refresh_rate, refresh_rate_hz,
brightness_nits, screen_protection,
chipset, gpu, cpu_cores, ram, ram_gb, ram_expansion, storage, storage_gb, antutu_score,
rear_camera, main_camera_mp, camera_aperture_main, front_camera, front_camera_mp,
camera_zoom_optical, camera_video_4k,
battery_capacity, battery_mah, fast_charge, charging_w, charging_technology,
fast_charge_minutes, wireless_charging, reverse_wireless_charging,
network, sim_type, esim_support, wifi, bluetooth, nfc, usb_type,
material_back, material_frame, ip_rating, colors_available, color_main,
os, ui_version, audio, fingerprint, dimensions_mm, weight_g, waterproof,
ai_features, desktop_mode, stylus_support,
gaming_score, battery_score, camera_score, display_score, value_score, global_score, compare_score,
image_url, video_url,
meta_title, meta_description,
marketing_title_ar, marketing_title_en, marketing_title_fr,
marketing_subtitle_ar, marketing_subtitle_en, marketing_subtitle_fr,
content_summary_ar, content_summary_en, content_summary_fr,
buying_guide_ar, buying_guide_en, buying_guide_fr,
highlight_1_ar, highlight_1_en, highlight_1_fr,
highlight_2_ar, highlight_2_en, highlight_2_fr,
highlight_3_ar, highlight_3_en, highlight_3_fr,
pros_ar, pros_en, pros_fr,
cons_ar, cons_en, cons_fr,
expert_opinion_ar, expert_opinion_en, expert_opinion_fr,
faq_ar, faq_en, faq_fr,
embedding_ready, multilingual_ready, project_stage

Input normalized JSON:
{{NORMALIZED_JSON}}
```

---

# Agent 6 — Embedding Document Agent

## Purpose

Create a clean text document for future semantic search.

This document can be stored in `product_embeddings.content` before real vector generation.

## Prompt Template

```txt
You are the Embedding Document Agent for an AI Product Intelligence Platform.

Create an embedding-ready product document from the product JSON.

Rules:
- Write in English.
- Do not write marketing fluff.
- Focus on product identity, specs, use cases, strengths, weaknesses, and buyer intent.
- Keep it factual.
- Include useful phrases for semantic search.
- Do not copy source text.

Input JSON:
{{PRODUCT_JSON}}

Return only the embedding document text.
```

## Example Output

```txt
Huawei Nova 15 Max is a Huawei smartphone designed for users looking for a modern large-screen mobile device. It belongs to the smartphone category and can be evaluated for display quality, battery life, camera performance, daily performance, gaming suitability, software features, and price-to-value positioning. This product can be used in semantic search, AI recommendations, comparison workflows, and multilingual buying guides.
```

## Supabase Insert Template

```sql
insert into public.product_embeddings (
  product_id,
  embedding_type,
  content,
  embedding,
  model_used
)
values (
  'PRODUCT_ID_HERE',
  'product_summary',
  'EMBEDDING_DOCUMENT_HERE',
  null,
  'manual-agent'
);
```

---

# Agent 7 — SEO Content Agent

## Purpose

Generate original multilingual product content.

## Prompt Template

```txt
You are the SEO Content Agent for an AI Product Intelligence Platform.

Generate original SEO and product intelligence content for the provided product.

Rules:
- Do not copy source text.
- Write useful content for real buyers.
- Produce English, French, and Arabic when possible.
- Keep claims factual and based on available specs.
- If specs are missing, avoid strong claims.
- Make the content suitable for a consumer tech comparison website.

Input JSON:
{{PRODUCT_JSON}}

Return this JSON:

{
  "meta_title": null,
  "meta_description": null,
  "marketing_title_en": null,
  "marketing_title_fr": null,
  "marketing_title_ar": null,
  "marketing_subtitle_en": null,
  "marketing_subtitle_fr": null,
  "marketing_subtitle_ar": null,
  "content_summary_en": null,
  "content_summary_fr": null,
  "content_summary_ar": null,
  "buying_guide_en": null,
  "buying_guide_fr": null,
  "buying_guide_ar": null,
  "highlight_1_en": null,
  "highlight_1_fr": null,
  "highlight_1_ar": null,
  "highlight_2_en": null,
  "highlight_2_fr": null,
  "highlight_2_ar": null,
  "highlight_3_en": null,
  "highlight_3_fr": null,
  "highlight_3_ar": null,
  "pros_en": null,
  "pros_fr": null,
  "pros_ar": null,
  "cons_en": null,
  "cons_fr": null,
  "cons_ar": null,
  "expert_opinion_en": null,
  "expert_opinion_fr": null,
  "expert_opinion_ar": null,
  "faq_en": null,
  "faq_fr": null,
  "faq_ar": null
}
```

---

## 5. Manual Product Insertion Workflow

Use this process for each new product.

```txt
Step 1: Add product URL and image URL into source_records
Step 2: Copy product specs/text from source manually
Step 3: Run Product Extraction Agent prompt
Step 4: Run Data Validation Agent prompt
Step 5: Run Data Normalization Agent prompt
Step 6: Run SEO Content Agent prompt
Step 7: Run Supabase SQL Agent prompt
Step 8: Review the SQL carefully
Step 9: Paste SQL into Supabase SQL Editor
Step 10: Insert embedding document into product_embeddings
Step 11: Log manual run in agent_runs
```

---

## 6. Quality Rules

Never insert a product if:

```txt
- brand is missing
- model is missing
- slug is missing
- category is unclear
- image URL is broken
- source URL is missing
- SQL contains a field not present in products table
- AI invented important specs
- content is copied directly from a source
```

Always keep:

```txt
- source URL
- image URL
- product name
- validation status
- missing fields
- project stage
```

---

## 7. Recommended Product Status Values

For `source_records.status`:

```txt
pending
raw_extracted
needs_review
validated
inserted_to_products
embedding_document_created
completed_manual_pipeline
failed
```

For `products.project_stage`:

```txt
manual_ai_pipeline
mock_pipeline_insert
needs_content
needs_embedding
ready_for_search
ready_for_seo
production_ready
```

---

## 8. Manual Agent Run Log

After finishing a product, insert a log into `agent_runs`.

```sql
insert into public.agent_runs (
  agent_name,
  source_record_id,
  product_id,
  input_json,
  output_json,
  status,
  model_used,
  finished_at
)
values (
  'manual_ai_product_pipeline',
  'SOURCE_RECORD_ID_HERE',
  'PRODUCT_ID_HERE',
  '{"workflow": "manual product extraction and insertion"}'::jsonb,
  '{"result": "product inserted and embedding document prepared"}'::jsonb,
  'success',
  'manual-chatgpt-claude',
  now()
);
```

---

## 9. Future Upgrade Path

When the manual workflow becomes stable, it can be upgraded gradually.

```txt
Phase 1: Manual AI agents
Phase 2: CSV + SQL helper scripts
Phase 3: GitHub Actions pipeline
Phase 4: OpenAI API extraction and embeddings
Phase 5: LangGraph multi-agent orchestration
Phase 6: Fully automated product intelligence pipeline
```

The manual workflow is not wasted work. It defines the exact behavior that future software agents should follow.

---

## 10. Platform Positioning

This workflow supports the platform vision:

```txt
AI-native consumer tech product intelligence
semantic search
recommendation systems
RAG assistants
dynamic comparison engines
SEO automation
multilingual product intelligence
multi-agent architecture
```

The first version is human-in-the-loop.

The final version becomes automated.

