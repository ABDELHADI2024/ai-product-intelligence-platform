# AI Product Intelligence Starter Package

This package contains the first architecture and data-pipeline starter files for the AI Product Intelligence Platform.

## Included

```txt
docs/AI_OPERATING_MODEL.md
packages/data-pipeline/
```

## How to use

Copy these folders into the root of your GitHub repository:

```txt
ai-product-intelligence-platform/
  docs/
  packages/data-pipeline/
```

Then commit:

```bash
git add docs/AI_OPERATING_MODEL.md packages/data-pipeline
git commit -m "Add AI operating model and data pipeline foundation"
git push
```

## First Goal

Build the Product Ingestion Pipeline MVP before building complex agents.

Correct order:

```txt
Data pipeline → JSON schemas → staging tables → validation → normalization → Supabase insert → embeddings → agents
```
