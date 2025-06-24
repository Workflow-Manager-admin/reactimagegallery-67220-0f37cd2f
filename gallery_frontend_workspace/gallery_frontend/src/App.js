import React from 'react';
import './App.css';
import images from './images';

// PUBLIC_INTERFACE
/**
 * Main application component for the image gallery.
 * Prepares the UI structure for category filter, image grid, and lightbox overlay.
 */
function App() {
  return (
    <div className="app">
      {/* Navbar */}
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol">*</span> KAVIA AI
            </div>
            <button className="btn">Gallery Template</button>
          </div>
        </div>
      </nav>

      <main>
        <div className="container" style={{ paddingTop: "120px" }}>
          {/* Placeholder for filter buttons (to be implemented) */}
          <div style={{ display: "flex", gap: "12px", marginBottom: "32px", justifyContent: "center" }}>
            {/* Example filter buttons - UI will be expanded in next steps */}
            <button className="btn">All</button>
            <button className="btn">Nature</button>
            <button className="btn">City</button>
            <button className="btn">Abstract</button>
          </div>
          {/* Image Grid (basic structure, no filtering) */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "20px",
              marginBottom: "64px",
              justifyItems: "center",
            }}
          >
            {images.map((img, idx) => (
              <div
                key={idx}
                style={{
                  position: "relative",
                  borderRadius: "12px",
                  overflow: "hidden",
                  background: "#222",
                  width: "100%",
                  maxWidth: "300px",
                  cursor: "pointer",
                  boxShadow: "0 2px 16px rgba(0,0,0,0.15)",
                  minHeight: "180px",
                }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  style={{
                    width: "100%",
                    display: "block",
                    objectFit: "cover",
                    minHeight: "180px",
                    aspectRatio: "4/3",
                  }}
                />
                {/* Placeholder for overlay on hover, lightbox, etc */}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;