import React, { useEffect, useRef } from "react";

/**
 * PUBLIC_INTERFACE
 * A fullscreen modal/lightbox for displaying an image (with caption/info) above a dimmed background.
 * Accessibility: trap focus, aria-modal, close on Esc, close button, and outside click.
 *
 * @param {{
 *   open: boolean,
 *   image: { src: string, alt: string } | null,
 *   onClose: () => void
 * }} props
 */
function ImageLightbox({ open, image, onClose }) {
  const modalRef = useRef(null);
  const closeBtnRef = useRef(null);
  const previouslyFocusedElement = useRef(null);

  // On mount/open, trap focus, restore focus after close
  useEffect(() => {
    if (!open) return;

    // Save what was focused before opening modal
    previouslyFocusedElement.current = document.activeElement;

    // Focus the close button as the first item
    if (closeBtnRef.current) {
      closeBtnRef.current.focus();
    }

    // Trap focus inside the modal
    function handleTab(e) {
      if (!modalRef.current) return;
      const focusables = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.key === "Tab") {
        if (e.shiftKey) {
          // Shift+Tab
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          // Tab forward
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    }

    // Escape to close
    function handleKey(e) {
      if (e.key === "Escape") {
        onClose();
      } else {
        handleTab(e);
      }
    }

    document.addEventListener("keydown", handleKey);

    // Prevent background scrolling
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = overflow;
      // Restore focus to prior element
      if (previouslyFocusedElement.current && typeof previouslyFocusedElement.current.focus === "function") {
        previouslyFocusedElement.current.focus();
      }
    };
    // eslint-disable-next-line
  }, [open, onClose]);

  if (!open || !image) return null;

  // Prevent event bubbling from image/caption area to backdrop
  const stop = (e) => e.stopPropagation();

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-title"
      aria-describedby="lightbox-desc"
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
      ref={modalRef}
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
          alignItems: "stretch",
          position: "relative"
        }}
      >
        <button
          ref={closeBtnRef}
          className="lightbox-close-btn"
          aria-label="Close lightbox"
          aria-keyshortcuts="Esc"
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
          id="lightbox-desc"
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
          <span id="lightbox-title" style={{display:'none'}}>{image.alt}</span>
          {image.alt}
        </div>
      </div>
    </div>
  );
}

export default ImageLightbox;
