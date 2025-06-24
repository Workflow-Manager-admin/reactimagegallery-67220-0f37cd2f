import React from "react";
import "./App.css";

/**
 * PUBLIC_INTERFACE
 * Responsive, minimal image grid for the gallery.
 * Shows thumbnails of images matching the selected filter.
 * Images are laid out in a modern responsive grid using CSS grid.
 * 
 * @param {{
 *   images: Array<{src: string, alt: string}>,
 *   onImageClick?: (img: {src: string, alt: string}) => void
 * }} props 
 */
function ImageGrid({ images, onImageClick }) {
  if (images.length === 0) {
    return (
      <div className="image-grid-empty">
        <span>No images found in this category.</span>
      </div>
    );
  }
  // Add click/keyboard-access support for modal
  const handleThumbClick = (img) => {
    if (typeof onImageClick === "function") {
      onImageClick(img);
    }
  };

  return (
    <div className="image-grid">
      {images.map((img, idx) => (
        <div
          className="image-thumb"
          key={idx}
          tabIndex={0}
          role={onImageClick ? "button" : undefined}
          onClick={() => handleThumbClick(img)}
          onKeyDown={e => {
            if (
              (e.key === "Enter" || e.key === " " || e.key === "Spacebar")
              && onImageClick
            ) {
              e.preventDefault();
              handleThumbClick(img);
            }
          }}
          aria-label={img.alt || "Image"}
        >
          <img
            src={img.src}
            alt={img.alt}
            loading="lazy"
            className="image-thumb-img"
            draggable="false"
          />
        </div>
      ))}
    </div>
  );
}

export default ImageGrid;
