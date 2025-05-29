import React, { useState, useMemo } from "react";
import { useFavorites } from "../hooks/useFavorites";
import { ImageCard } from "./ImageCard";
import type { UnsplashImage } from "../services/unsplashApi";

interface Props {
  images: UnsplashImage[];
  onSelect: (img: UnsplashImage) => void;
  onLoadMore: () => void;
  hasMore?: boolean;
}

type SortType = "date" | "popularity" | "title";
type DateFilter = "all" | "7days" | "30days";

export const ImageGrid: React.FC<Props> = ({
  images,
  onSelect,
  onLoadMore,
  hasMore = true,
}) => {
  const { toggleFavorite, isFavorite, favorites } = useFavorites();
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [sortBy, setSortBy] = useState<SortType>("date");
  const [dateFilter, setDateFilter] = useState<DateFilter>("all");
  const [minLikes, setMinLikes] = useState<number>(0);

  const displayedImages = showOnlyFavorites ? favorites : images;

  const sortedImages = useMemo(() => {
    const filterByDate = (img: UnsplashImage) => {
      if (dateFilter === "all") return true;
      const createdDate = new Date(img.created_at);
      const now = new Date();
      if (dateFilter === "7days") {
        const days7Ago = new Date(now);
        days7Ago.setDate(now.getDate() - 7);
        return createdDate >= days7Ago;
      }
      if (dateFilter === "30days") {
        const days30Ago = new Date(now);
        days30Ago.setDate(now.getDate() - 30);
        return createdDate >= days30Ago;
      }
      return true;
    };

    const filterByLikes = (img: UnsplashImage) => (img.likes ?? 0) >= minLikes;

    const filteredImages = displayedImages.filter(
      (img) => filterByDate(img) && filterByLikes(img)
    );

    return [...filteredImages].sort((a, b) => {
      if (sortBy === "date") {
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      }
      if (sortBy === "popularity") {
        return (b.likes ?? 0) - (a.likes ?? 0);
      }
      if (sortBy === "title") {
        return (a.description ?? a.alt_description ?? "").localeCompare(
          b.description ?? b.alt_description ?? ""
        );
      }
      return 0;
    });
  }, [displayedImages, sortBy, dateFilter, minLikes]);

  return (
    <div className="max-w-7xl mx-auto px-4">
      {}
      <div className="filter-bar">
        <button
          className={`tab-btn${!showOnlyFavorites ? " active" : ""}`}
          onClick={() => setShowOnlyFavorites(false)}
          aria-pressed={!showOnlyFavorites}
        >
          📷 Усі
        </button>
        <button
          className={`tab-btn${showOnlyFavorites ? " active" : ""}`}
          onClick={() => setShowOnlyFavorites(true)}
          aria-pressed={showOnlyFavorites}
        >
          ⭐ Улюблені
        </button>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortType)}
        >
          <option value="date">За датою</option>
          <option value="popularity">За популярністю</option>
          <option value="title">За назвою</option>
        </select>

        <select
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value as DateFilter)}
        >
          <option value="all">Всі дати</option>
          <option value="7days">Останні 7 днів</option>
          <option value="30days">Останні 30 днів</option>
        </select>

        <input
          type="number"
          min={0}
          value={minLikes}
          onChange={(e) => setMinLikes(Number(e.target.value))}
          placeholder="Мінімум лайків"
        />
      </div>

      {}
      <div className="text-right text-xs text-gray-500 mb-2">
        {sortedImages.length > 0 && (
          <>
            Знайдено фото: <b>{sortedImages.length}</b>
          </>
        )}
      </div>

      {}
      {sortedImages.length === 0 ? (
        <div className="text-center text-gray-500 py-20 text-lg">
          {showOnlyFavorites ? (
            <>
              У тебе ще немає{" "}
              <span className="text-yellow-500 font-semibold">улюблених</span>{" "}
              фото 😢
              <br />
              Натисни <span className="text-red-500 text-xl">❤️</span> щоб
              зберегти!
            </>
          ) : (
            "Фото не знайдено."
          )}
        </div>
      ) : sortedImages.length === 1 ? (
        <div className="flex justify-center animate-fade-in">
          <ImageCard
            key={sortedImages[0].id}
            image={sortedImages[0]}
            onClick={() => onSelect(sortedImages[0])}
            isFavorite={isFavorite(sortedImages[0].id)}
            onToggleFavorite={() => toggleFavorite(sortedImages[0])}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 animate-fade-in">
          {sortedImages.map((img: UnsplashImage) => (
            <ImageCard
              key={img.id}
              image={img}
              onClick={() => onSelect(img)}
              isFavorite={isFavorite(img.id)}
              onToggleFavorite={() => toggleFavorite(img)}
            />
          ))}
        </div>
      )}

      {}
      {!showOnlyFavorites && images.length > 0 && hasMore && (
        <div className="flex justify-center mt-8">
          <button
            onClick={onLoadMore}
            className="px-6 py-3 text-white font-semibold bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};
