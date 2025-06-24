import React from "react";
import "./App.css";

/**
 * PUBLIC_INTERFACE
 * Responsive, minimal image grid for the gallery.
 * Shows thumbnails of images matching the selected filter.
 * Images are laid out in a modern responsive grid using CSS grid.
 * 
 * @param {{ images: Array<{src: string, alt: string}> }} props 
 */
function ImageGrid({ images }) {
  if (images.length === 0) {
    return (
      <div className="image-grid-empty">
        <span>No images found in this category.</span>
      </div>
    );
  }
  return (
    <div className="image-grid">
      {images.map((img, idx) => (
        <div className="image-thumb" key={idx} tabIndex={0}>
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
