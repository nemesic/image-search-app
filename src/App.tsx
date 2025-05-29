import React, { useState } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { useFetchImages } from "./hooks/useFetchImages";
import { useDebounce } from "./hooks/useDebounce";
import { useFavorites } from "./hooks/useFavorites";
import { SearchBar } from "./components/SearchBar";
import { ImageGrid } from "./components/ImageGrid";
import { ImageModal } from "./components/Modal";
import { Loader } from "./components/Loader";
import { ThemeToggle } from "./components/ThemeToggle";
import "./App.css";

function AppContent() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);
  const { images, loading, error, fetchMore, selectedImage, setSelectedImage } =
    useFetchImages(debouncedQuery);

  const { favorites } = useFavorites();

  const isFavoriteModal = Boolean(
    selectedImage && favorites.some((fav) => fav.id === selectedImage.id)
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <header className="flex justify-between items-center p-4 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold">Image Search</h1>
        <ThemeToggle />
      </header>
      <SearchBar value={query} onChange={setQuery} />
      {loading && <Loader />}
      {error && <p className="text-center text-red-500">{error}</p>}
      <ImageGrid
        images={images}
        onSelect={setSelectedImage}
        onLoadMore={fetchMore}
      />
      {selectedImage && (
        <ImageModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
          isFavoriteModal={isFavoriteModal}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
