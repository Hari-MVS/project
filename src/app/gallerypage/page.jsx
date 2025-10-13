"use client";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import autoAnimate from "@formkit/auto-animate";

export default function GalleryPage() {
  const [images, setImages] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [imageLoaded, setImageLoaded] = useState(false);

  const galleryRef = useRef(null);
  const modalRef = useRef(null);
  const perPage = 12;

  // AutoAnimate
  useEffect(() => {
    if (galleryRef.current) autoAnimate(galleryRef.current);
  }, []);

  // Fetch images once
  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/gallery-images");
        const { images: fetchedImages } = await res.json();

        const valid = fetchedImages
          .filter((i) => i.size > 0 && i.url && !i.url.endsWith("/"))
          .map((i) => {
            const name = i.pathname.split("/").pop()?.split(".")[0] || "";
            const title = name
              .split(/[_-]/)
              .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
              .join(" ");
            return {
              ...i,
              title,
              id: i.url,
              thumbnail: i.url + "?w=400&q=80",
            };
          });

        setImages(valid);
      } catch (err) {
        console.error("Error loading gallery:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  // Pagination
  const totalPages = Math.ceil(images.length / perPage);
  const paginatedImages = useMemo(() => {
    const start = (page - 1) * perPage;
    return images.slice(start, start + perPage);
  }, [images, page]);

  // Modal navigation
  const openModal = useCallback((index) => {
    setSelected(index);
    setImageLoaded(false);
  }, []);

  const closeModal = useCallback(() => {
    setSelected(null);
    setImageLoaded(false);
  }, []);

  const nextImage = useCallback(() => {
    if (selected === null) return;
    setSelected((prev) => (prev + 1) % paginatedImages.length);
    setImageLoaded(false);
  }, [selected, paginatedImages.length]);

  const prevImage = useCallback(() => {
    if (selected === null) return;
    setSelected((prev) =>
      prev === 0 ? paginatedImages.length - 1 : prev - 1
    );
    setImageLoaded(false);
  }, [selected, paginatedImages.length]);

  // Keyboard navigation (prevent double trigger)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selected === null) return;
      if (["ArrowRight", "ArrowLeft", "Escape"].includes(e.key)) {
        e.preventDefault(); // prevent double scroll
      }
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selected, nextImage, prevImage, closeModal]);

  // Preload adjacent images
  useEffect(() => {
    if (selected === null) return;
    const nextIndex = (selected + 1) % paginatedImages.length;
    const prevIndex = selected === 0 ? paginatedImages.length - 1 : selected - 1;
    [paginatedImages[nextIndex]?.url, paginatedImages[prevIndex]?.url].forEach(
      (url) => {
        if (!url) return;
        const img = new Image();
        img.src = url;
      }
    );
  }, [selected, paginatedImages]);

  // Pagination controls
  const nextPage = () => {
    if (page < totalPages) {
      setPage((p) => p + 1);
      setSelected(null);
    }
  };
  const prevPage = () => {
    if (page > 1) {
      setPage((p) => p - 1);
      setSelected(null);
    }
  };

  // Loading skeleton
  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: perPage }).map((_, i) => (
        <div
          key={i}
          className="relative overflow-hidden rounded-2xl bg-white/5 animate-pulse h-48 md:h-56"
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight text-center">
        OUR WORK GALLERY
      </h1>

      <div className="backdrop-blur-xl bg-white/10 border border-white/10  shadow-lg p-6 w-full max-w-8xl">
        <div ref={galleryRef}>
          {loading ? (
            <LoadingSkeleton />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {paginatedImages.map((img, i) => (
                <div
                  key={img.id}
                  onClick={() => openModal(i)}
                  className="relative group overflow-hidden  cursor-pointer transition-transform duration-300 hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(255,255,255,0.1)] bg-white/10 backdrop-blur-md"
                >
                  <img
                    src={img.thumbnail || img.url}
                    alt={img.title || `Image ${i}`}
                    loading="lazy"
                    className="w-full h-70 md:h-56 object-cover  transition-transform duration-500 group-hover:scale-105"
                  />
                  {img.title && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center text-white text-sm font-medium p-4">
                      {img.title}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        {!loading && (
          <div className="flex justify-center items-center gap-4 mt-6 text-white">
            <button
              onClick={prevPage}
              disabled={page === 1}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl backdrop-blur-md transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
            >
              ← Prev
            </button>
            <span className="text-sm opacity-80 min-w-[100px] text-center">
              Page {page} of {totalPages || 1}
            </span>
            <button
              onClick={nextPage}
              disabled={page === totalPages}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl backdrop-blur-md transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
            >
              Next →
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {selected !== null && (
        <div
          ref={modalRef}
          onClick={closeModal}
          className="fixed inset-0 bg-black/90 backdrop-blur-lg flex flex-col items-center justify-center z-50 px-4 py-6 animate-in fade-in duration-300"
        >
          <div className="relative max-w-4xl w-full flex justify-center">
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center text-white text-lg gap-3">
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Loading...
              </div>
            )}
            <img
              src={paginatedImages[selected]?.url}
              onLoad={() => setImageLoaded(true)}
              className={` max-h-[70vh] w-auto max-w-full object-contain transition-all duration-500 ease-out ${
                imageLoaded ? "opacity-100 scale-100 blur-0" : "opacity-0 scale-95 blur-sm"
              }`}
            />
          </div>

          {/* Controls */}
          <div className="flex justify-between items-center mt-6 w-full max-w-4xl px-4 gap-4">
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="px-8 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-xl transition-all duration-200 hover:scale-110 active:scale-95 flex items-center gap-2"
            >
              ← Prev
            </button>
            <button
              onClick={closeModal}
              className="px-8 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-xl transition-all duration-200 hover:scale-110 active:scale-95 flex items-center gap-2"
            >
              ✕ Close
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="px-8 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-xl transition-all duration-200 hover:scale-110 active:scale-95 flex items-center gap-2"
            >
              Next →
            </button>
          </div>

          <div className="mt-4 text-white/80 text-sm bg-black/30 backdrop-blur-md rounded-full px-4 py-2">
            {selected + 1} of {paginatedImages.length}
          </div>
        </div>
      )}
    </div>
  );
}
