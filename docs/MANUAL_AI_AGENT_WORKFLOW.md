# Manual AI Agent Workflow

This project starts with a human-in-the-loop AI workflow. No paid API is required at the beginning.

## Workflow

```txt
Product URL + image URL
→ Source record in Supabase
→ AI extraction prompt
→ Structured JSON
→ Validation prompt
→ Normalization prompt
→ SQL insert
→ Supabase products table
→ Website display
```

## Agents as prompts

- Source Ingestion Agent
- Product Extraction Agent
- Validation Agent
- Normalization Agent
- SQL Mapping Agent
- SEO Content Agent
- Embedding Document Agent

## Rule

Do not insert AI output directly into `products` without checking it first.

Use:

```txt
raw extraction
→ validation
→ normalization
→ final insert
```
