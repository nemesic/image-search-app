import React, { useEffect, useRef } from "react";
import { UnsplashImage } from "../services/unsplashApi";

interface Props {
  image: UnsplashImage;
  onClose: () => void;
  isFavoriteModal?: boolean;
}

export const ImageModal: React.FC<Props> = ({
  image,
  onClose,
  isFavoriteModal,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    modalRef.current?.focus();
  }, []);

  const modalContentClass =
    "modal-content" + (isFavoriteModal ? " single-image" : "");

  return (
    <div
      className="modal-overlay"
      aria-modal="true"
      role="dialog"
      tabIndex={-1}
      ref={modalRef}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        animation: "fadeIn 0.2s",
      }}
    >
      <div
        className={modalContentClass}
        style={{
          background: "var(--modal-bg, #fff)",
          color: "var(--modal-color, #222)",
          borderRadius: "12px",
          padding: isFavoriteModal ? "2.5rem 2rem" : "2rem",
          maxWidth: isFavoriteModal ? "500px" : "90vw",
          maxHeight: "90vh",
          overflow: "auto",
          position: "relative",
          boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
          animation: "scaleIn 0.2s",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="modal-close-btn"
          aria-label="Закрити модальне вікно"
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            fontSize: "2rem",
            background: "none",
            border: "none",
            color: "white",
            cursor: "pointer",
            zIndex: 10,
          }}
        >
          &times;
        </button>
        <img
          src={image.urls.regular}
          alt={image.alt_description || "image"}
          className="w-full rounded"
          style={{
            maxHeight: isFavoriteModal ? "320px" : "50vh",
            objectFit: isFavoriteModal ? "cover" : "contain",
            marginBottom: "1rem",
            aspectRatio: "4/3",
            borderRadius: "16px",
          }}
        />
        <h2 className="mt-2 font-bold" style={{ fontSize: "1.3em" }}>
          {image.alt_description || "No title"}
        </h2>
        {image.description && (
          <p className="text-sm text-gray-500" style={{ margin: "0.5em 0" }}>
            {image.description}
          </p>
        )}
        <p className="text-xs mt-2">
          By:{" "}
          {image.user.portfolio_url ? (
            <a
              href={image.user.portfolio_url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#646cff" }}
            >
              {image.user.name}
            </a>
          ) : (
            image.user.name
          )}
        </p>
      </div>
      <style>
        {`
        @keyframes fadeIn {
          from { opacity: 0 }
          to { opacity: 1 }
        }
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0 }
          to { transform: scale(1); opacity: 1 }
        }
        .dark .modal-content {
          --modal-bg: #181818;
          --modal-color: #f3f3f3;
        }
        .modal-content.single-image {
          max-width: 500px !important;
          min-width: 320px;
          padding: 2.5rem 2rem !important;
        }
        .modal-content.single-image img {
          max-height: 320px !important;
          aspect-ratio: 4/3;
          object-fit: cover;
          border-radius: 16px;
        }
        @media (max-width: 700px) {
          .modal-content.single-image {
            max-width: 95vw !important;
            min-width: unset;
            padding: 1rem 0.2rem !important;
          }
          .modal-content.single-image img {
            max-height: 180px !important;
          }
        }
        `}
      </style>
    </div>
  );
};
