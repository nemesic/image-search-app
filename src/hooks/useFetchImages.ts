import { useEffect, useState } from "react";
import { searchImages, UnsplashImage } from "../services/unsplashApi";

export function useFetchImages(query: string) {
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState<UnsplashImage | null>(
    null
  );

  useEffect(() => {
    if (!query) {
      setImages([]);
      setPage(1);
      setError("");
      return;
    }
    setImages([]);
    setPage(1);
    fetchMore(1);
    // eslint-disable-next-line
  }, [query]);

  const fetchMore = async (customPage?: number) => {
    setLoading(true);
    setError("");
    try {
      const nextPage = customPage ?? page;
      const newImages = await searchImages(query, nextPage);
      setImages((prev) =>
        nextPage === 1 ? newImages : [...prev, ...newImages]
      );
      setPage(nextPage + 1);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to fetch images.");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    images,
    loading,
    error,
    fetchMore: () => fetchMore(),
    selectedImage,
    setSelectedImage,
  };
}
