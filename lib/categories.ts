export const categoryLabels: Record<string, string> = {
  smartphones: "Smartphones",
  "foldable-smartphones": "Foldable Smartphones",
  laptops: "Laptops",
  tablets: "Tablets",
  smartwatches: "Smartwatches",
  earbuds: "Earbuds",
  "ai-devices": "AI Devices",
  "connected-electronics": "Connected Electronics",
}

export const v1Categories = new Set(["smartphones", "foldable-smartphones"])

export function isV1Category(category: string): boolean {
  return v1Categories.has(category)
}
