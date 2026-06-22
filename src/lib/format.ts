export const formatINR = (n: number | string) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(Number(n));

export const productImage = (images: any, fallback?: string) => {
  if (Array.isArray(images) && images.length > 0) return images[0] as string;
  return fallback ?? "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80";
};

export const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
