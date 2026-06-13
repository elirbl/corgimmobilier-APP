const API_BASE_URL = import.meta.env.VITE_API_URL ?? '';

export function resolveAssetUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  if (/^https?:\/\//i.test(url)) return url;
  return `${API_BASE_URL}${url}`;
}
