import './Gallery.css';

function Gallery(){
    return (
    <section className="gallery-section">
    <h2>Our Community in Action</h2>
    <div className="gallery-container">
      <div className="gallery-track">
        <div className="gallery-slide">
          <img src="assets\pictures\Gallery_Images\IMG_1125.webp" alt="In action"></img>
        </div>
        <div className="gallery-slide">
          <img src="assets\pictures\Gallery_Images\20240914_091440.webp" alt="In action"></img>
        </div>
        <div className="gallery-slide">
          <img src="assets\pictures\Gallery_Images\IMG_6385.jpg" alt="In action"></img>
        </div>
        <div className="gallery-slide">
          <img src="assets\pictures\Gallery_Images\WhatsApp_Image_2025-02-19_at_19.42.49_0e9932d1.webp" alt="In Action"></img>
        </div>
        <div className="gallery-slide">
          <img src="assets\pictures\Gallery_Images\IMG_1515.webp" alt="In Action"></img>
        </div>
        {/* Add more slides as needed */}
      </div>
    </div>
    
    <div className="gallery-controls">
      <button class="gallery-btn prev-btn">&lt;</button>
      <div className="gallery-dots"></div>
      <button className="gallery-btn next-btn">&gt;</button>
    </div>
  </section>
  )
    
}

export default Gallery;