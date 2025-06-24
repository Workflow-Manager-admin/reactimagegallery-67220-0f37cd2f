import React, { useState } from 'react';
import './App.css';
import images from './images';
import ImageGrid from './ImageGrid';

// PUBLIC_INTERFACE
/**
 * Main application component for the image gallery.
 * Includes category filter, image grid, and (future) lightbox overlay.
 */
function App() {
  // Filter state holds the currently selected category
  const [filter, setFilter] = useState('all');

  // Category definitions used in the filter bar
  const categories = [
    { key: 'all', label: 'All' },
    { key: 'nature', label: 'Nature' },
    { key: 'city', label: 'City' },
    { key: 'abstract', label: 'Abstract' },
  ];

  // Return only images belonging to the selected category
  const filteredImages =
    filter === 'all' ? images : images.filter(img => img.category === filter);

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
          {/* Filter Bar */}
          <div className="filter-bar" style={{
            display: "flex",
            gap: "8px",
            marginBottom: "32px",
            justifyContent: "center",
          }}>
            {categories.map(cat => (
              <button
                key={cat.key}
                type="button"
                className={`btn filter-btn${filter === cat.key ? " selected" : ""}`}
                onClick={() => setFilter(cat.key)}
                aria-pressed={filter === cat.key}
                style={{
                  fontWeight: filter === cat.key ? 600 : 500,
                  background: filter === cat.key ? "var(--base-light)" : "rgba(26,26,26,0.8)",
                  color: filter === cat.key ? "#fff" : "var(--text-secondary)",
                  boxShadow: filter === cat.key ? "0 2px 12px rgba(0,255,255,0.07)" : "none",
                  border: filter === cat.key ? "1.5px solid var(--base-light)" : "1.5px solid var(--border-color)",
                  outline: filter === cat.key ? "1.5px solid var(--base-light)" : "none",
                  transition: "all 0.16s cubic-bezier(.5,2,.5,1)"
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
          {/* Image Grid */}
          <ImageGrid images={filteredImages} />
        </div>
      </main>
    </div>
  );
}

export default App;