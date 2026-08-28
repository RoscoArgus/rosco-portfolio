import { useCallback, useEffect, useState } from 'react';
import './Gallery.css';
import imageData from '../../assets/gallery/images.json';
import { useModal } from '../../context/ModalContext';
import { FaTimes, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const imageModules = import.meta.glob('../../assets/gallery/*.{png,jpg,jpeg,gif,webp}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const resolvedByFilename: Record<string, string> = {};
for (const [path, url] of Object.entries(imageModules)) {
  const filename = path.split('/').pop() as string;
  resolvedByFilename[filename] = url;
}

interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

const images: GalleryImage[] = imageData.reduce<GalleryImage[]>((acc, { src: filename, alt, caption }) => {
  const resolved = resolvedByFilename[filename];

  if (!resolved) {
    if (import.meta.env.DEV) {
      console.warn(`Gallery: "${filename}" is listed in images.json but wasn't found in src/assets/gallery`);
    }
    return acc;
  }

  acc.push({ src: resolved, alt, caption });
  return acc;
}, []);

const Gallery = () => {
  const { isOpen, openModal, closeModal } = useModal();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const showImage = useCallback(
    (index: number) => {
      const { src, alt, caption } = images[index];
      setActiveIndex(index);
      openModal(
        <div className="image-modal-wrapper">
          <img className="image-modal" src={src} alt={alt} />
          {caption && (
            <div className="caption-overlay">
              <h2>{caption}</h2>
            </div>
          )}
          <button className="close-button" onClick={closeModal} aria-label="Close">
            <FaTimes className="icon" />
          </button>
          <button
            className="prev-button"
            onClick={() => showImage((index - 1 + images.length) % images.length)}
            aria-label="Previous image"
          >
            <FaArrowLeft className="icon" />
          </button>
          <button
            className="next-button"
            onClick={() => showImage((index + 1) % images.length)}
            aria-label="Next image"
          >
            <FaArrowRight className="icon" />
          </button>
        </div>
      );
    },
    [openModal, closeModal]
  );

  useEffect(() => {
    if (activeIndex === null || !isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        showImage((activeIndex + 1) % images.length);
      } else if (e.key === 'ArrowLeft') {
        showImage((activeIndex - 1 + images.length) % images.length);
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => document.removeEventListener('keydown', onKeyDown);
  }, [activeIndex, isOpen, showImage]);

  return (
    <section className="gallery">
      <h1>Gallery</h1>
      <div className="photo-gallery">
        {images.map(({ src, alt, caption }, index) => (
          <figure key={src} className="photo-item">
            <button
              type="button"
              className="photo-item-button"
              title={caption}
              aria-label={caption ? `View image: ${caption}` : `View image: ${alt}`}
              onClick={() => showImage(index)}
            >
              <img src={src} alt={alt} loading="lazy" />
            </button>
          </figure>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
