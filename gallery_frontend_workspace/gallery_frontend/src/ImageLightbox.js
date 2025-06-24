import React, { useEffect } from "react";

/**
 * PUBLIC_INTERFACE
 * A fullscreen modal/lightbox for displaying an image (with caption/info) above a dimmed background.
 *
 * @param {{
 *   open: boolean,
 *   image: { src: string, alt: string } | null,
 *   onClose: () => void
 * }} props
 */
function ImageLightbox({ open, image, onClose }) {
  // Trap Escape key to close modal
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open || !image) return null;

  // Prevent event bubbling from image/caption area to backdrop
  const stop = (e) => e.stopPropagation();

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="lightbox-overlay"
      tabIndex={-1}
      onClick={onClose}
      style={{
        position: "fixed",
        left: 0, top: 0, width: "100vw", height: "100vh",
        background: "rgba(20, 24, 35, 0.86)",
        backdropFilter: "blur(1.5px)",
        zIndex: 2000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "background 0.18s"
      }}
      data-testid="lightbox-backdrop"
    >
      <div
        className="lightbox-content"
        onClick={stop}
        style={{
          background: "rgba(34,36,48,0.7)",
          borderRadius: "18px",
          maxWidth: "95vw",
          maxHeight: "92vh",
          boxShadow: "0 8px 30px 0 rgba(0,0,0,0.12)",
          padding: 0,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch"
        }}
      >
        <button
          className="lightbox-close-btn"
          aria-label="Close"
          onClick={onClose}
          style={{
            position: "absolute",
            top: 18,
            right: 22,
            background: "rgba(0,0,0,0.36)",
            border: "none",
            borderRadius: "50%",
            width: 38,
            height: 38,
            color: "#fff",
            fontSize: "1.65rem",
            cursor: "pointer",
            zIndex: 25,
            lineHeight: 1
          }}
        >
          ×
        </button>
        <img
          src={image.src}
          alt={image.alt}
          className="lightbox-img"
          style={{
            maxHeight: "70vh",
            maxWidth: "84vw",
            objectFit: "contain",
            borderRadius: "14px",
            background: "#181b24 linear-gradient(135deg, #262838 60%, #292b3b 100%)",
            display: "block",
            margin: "36px auto 0",
            boxShadow: "0 0 0px 0 rgba(0,255,255,0.04)"
          }}
        />
        <div
          className="lightbox-caption"
          style={{
            color: "#fff",
            fontWeight: 400,
            fontSize: "1.12rem",
            lineHeight: 1.5,
            background: "rgba(22, 26, 32, 0.86)",
            padding: "22px 38px 18px 38px",
            textAlign: "center",
            borderBottomLeftRadius: "14px",
            borderBottomRightRadius: "14px"
          }}
        >
          {image.alt}
        </div>
      </div>
    </div>
  );
}

export default ImageLightbox;
