import React from "react";
import { ImageData } from "../types";

type ImageCardProps = {
  image: ImageData;
  onClick: () => void;
};

export const ImageCard: React.FC<ImageCardProps> = ({ image, onClick }) => {
  return (
    <div
      className="bg-white dark:bg-gray-800 rounded shadow cursor-pointer transition-transform hover:scale-105"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") onClick();
      }}
      aria-label={`View details for ${image.title}`}
    >
      <img
        src={image.thumbnail}
        alt={image.title}
        className="w-full h-48 object-cover rounded-t"
        loading="lazy"
      />
      <div className="actions">
        <button>❤️</button>
        <button>⭐</button>
      </div>
      <div className="p-2">
        <h3 className="font-semibold text-sm truncate">{image.title}</h3>
        <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
          {image.description}
        </p>
      </div>
    </div>
  );
};
