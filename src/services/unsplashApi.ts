const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
const BASE_URL = "https://api.unsplash.com";

export interface UnsplashImage {
  id: string;
  alt_description: string | null;
  description: string | null;
  created_at: string;
  likes: number;
  urls: {
    small: string;
    regular: string;
    full: string;
  };
  user: {
    name: string;
    portfolio_url: string;
  };
}

export async function searchImages(
  query: string,
  page: number = 1,
  perPage: number = 12
): Promise<UnsplashImage[]> {
  if (!query) return [];
  const url = `${BASE_URL}/search/photos?query=${encodeURIComponent(
    query
  )}&page=${page}&per_page=${perPage}&client_id=${ACCESS_KEY}`;
  const response = await fetch(url);
  if (!response.ok)
    throw new Error(`Failed to fetch images: ${response.statusText}`);
  const data = await response.json();
  return data.results as UnsplashImage[];
}
