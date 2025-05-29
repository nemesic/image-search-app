import { useState, useEffect } from "react";
import type { UnsplashImage } from "../services/unsplashApi";

const FAVORITES_KEY = "favorites";

export function useFavorites() {
  const [favorites, setFavorites] = useState<UnsplashImage[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(FAVORITES_KEY);
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  const saveToStorage = (items: UnsplashImage[]) => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(items));
  };

  const toggleFavorite = (image: UnsplashImage) => {
    setFavorites((prev) => {
      const exists = prev.find((img) => img.id === image.id);
      let updated: UnsplashImage[];
      if (exists) {
        updated = prev.filter((img) => img.id !== image.id);
      } else {
        updated = [...prev, image];
      }
      saveToStorage(updated);
      return updated;
    });
  };

  const isFavorite = (id: string) => {
    return favorites.some((img) => img.id === id);
  };

  return {
    favorites,
    toggleFavorite,
    isFavorite,
  };
}
