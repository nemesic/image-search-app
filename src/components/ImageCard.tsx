import React from "react";
import type { UnsplashImage } from "../services/unsplashApi";

interface Props {
  image: UnsplashImage;
  onClick: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  className?: string;
}

export const ImageCard: React.FC<Props> = ({
  image,
  onClick,
  isFavorite,
  onToggleFavorite,
  className = "",
}) => (
  <div
    className={`card relative bg-gray-800 rounded-xl shadow-lg p-4 cursor-pointer transition-all duration-200 hover:scale-105 ${className}`}
    style={{ maxWidth: 340, width: "100%", margin: "0 auto" }}
  >
    <img
      src={image.urls.regular}
      alt={image.alt_description || "image"}
      onClick={onClick}
      className="w-full rounded-lg"
      style={{ maxHeight: 220, objectFit: "cover" }}
    />
    <h3 className="mt-2 text-base font-semibold text-gray-100">
      {image.alt_description || "Без назви"}
    </h3>
    <button
      onClick={(e) => {
        e.stopPropagation();
        onToggleFavorite();
      }}
      aria-label={isFavorite ? "Видалити з улюблених" : "Додати в улюблені"}
      aria-pressed={isFavorite}
      className={`absolute top-2 right-2 text-2xl transition-transform duration-200 ${
        isFavorite ? "scale-110 text-red-500" : "text-gray-300 hover:scale-110"
      }`}
    >
      {isFavorite ? "❤️" : "🤍"}
    </button>
  </div>
);
