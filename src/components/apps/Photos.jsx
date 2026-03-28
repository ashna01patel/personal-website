import { useState } from 'react'
import './Photos.css'

const ARTWORK = [
  { src: '/artwork/7B80A1A8-AB1F-4F8E-8671-12164A18E2D4_Original.jpeg', caption: 'Jellyfish', meta: 'Charcoal on Paper · 24×30' },
  { src: '/artwork/FullSizeRender.jpeg', caption: 'Vintage Porsche', meta: 'Charcoal on Unprimed Canvas · 60×48' },
  { src: '/artwork/FullSizeRender(1).jpeg', caption: 'Just a guy and his dog', meta: 'Acrylic and Acrylic Polymer · 8×8' },
  { src: '/artwork/IMG_1545.jpeg', caption: 'Horses', meta: 'Oil on Canvas · 48×60' },
  { src: '/artwork/IMG_1508.jpeg', caption: 'Horse #1', meta: 'Oil on Canvas' },
  { src: '/artwork/IMG_1521.jpeg', caption: 'Horse #2', meta: 'Oil on Canvas' },
  { src: '/artwork/IMG_1522.jpeg', caption: 'Horse #1 and #2', meta: 'Oil on Canvas' },
  { src: '/artwork/IMG_3314.jpeg', caption: 'Mini Porsche', meta: 'Acrylic and Acrylic Polymer · 8×8' },
  { src: '/artwork/IMG_3733.jpeg', caption: 'Flowers', meta: 'Charcoal on Unprimed Canvas · 24×72' },
  { src: '/artwork/IMG_6192.jpeg', caption: 'Run Bike Swim', meta: 'Acrylic and Acrylic Polymer · 8×24' },
  { src: '/artwork/IMG_6610.jpeg', caption: 'Lady Cow (Sacred in Hinduism)', meta: 'Oil on Canvas · 20×60' },
]

export default function Photos() {
  const [lightbox, setLightbox] = useState(null)

  function prev() {
    setLightbox(i => (i - 1 + ARTWORK.length) % ARTWORK.length)
  }

  function next() {
    setLightbox(i => (i + 1) % ARTWORK.length)
  }

  function handleKeyDown(e) {
    if (e.key === 'ArrowLeft') prev()
    if (e.key === 'ArrowRight') next()
    if (e.key === 'Escape') setLightbox(null)
  }

  return (
    <div className="photos-app">
      <div className="photos-sidebar">
        <div className="photos-sidebar-section">
          <div className="photos-sidebar-item active-sub">
            <span>🎨</span> Artwork
          </div>
        </div>
      </div>
      <div className="photos-main">
        <div className="photos-toolbar">
          <span className="photos-toolbar-title">Artwork</span>
          <span className="photos-count">{ARTWORK.length} items</span>
        </div>

        <div className="photos-grid">
          {ARTWORK.map((art, i) => (
            <div
              key={i}
              className="photos-thumb"
              onClick={() => setLightbox(i)}
            >
              <img src={art.src} alt={`Artwork ${i + 1}`} draggable={false} />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="lightbox" onClick={() => setLightbox(null)} onKeyDown={handleKeyDown} tabIndex={0}>
          <button className="lightbox-close" onClick={() => setLightbox(null)}>✕</button>
          <button className="lightbox-nav lightbox-prev" onClick={e => { e.stopPropagation(); prev() }}>‹</button>
          <img
            src={ARTWORK[lightbox].src}
            alt={`Artwork ${lightbox + 1}`}
            className="lightbox-img"
            onClick={e => e.stopPropagation()}
            draggable={false}
          />
          <button className="lightbox-nav lightbox-next" onClick={e => { e.stopPropagation(); next() }}>›</button>
          <div className="lightbox-counter">
            <div className="lightbox-caption">{ARTWORK[lightbox].caption}</div>
            <div className="lightbox-meta">{ARTWORK[lightbox].meta}</div>
          </div>
        </div>
      )}
    </div>
  )
}
