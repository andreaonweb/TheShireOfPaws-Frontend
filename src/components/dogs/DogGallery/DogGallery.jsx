import { useState } from 'react';
import { PLACEHOLDER_IMG, getDogPhotos } from '../../../constants/dog';
import styles from './DogGallery.module.css';

const DogGallery = ({ dog }) => {
  const [activePhoto, setActivePhoto] = useState(0);
  const photos = getDogPhotos(dog);

  return (
    <div className={styles.gallery}>
      <img src={photos[activePhoto] || PLACEHOLDER_IMG} alt={dog.name} className={styles.image} />

      {photos.length > 1 && (
        <div className={styles.thumbnails}>
          {photos.map((url, index) => (
            <button
              key={url}
              type="button"
              className={`${styles.thumbnail} ${index === activePhoto ? styles.thumbnailActive : ''}`}
              onClick={() => setActivePhoto(index)}
              aria-label={`Show photo ${index + 1} of ${photos.length}`}
              aria-pressed={index === activePhoto}
            >
              <img src={url} alt={`${dog.name}, photo ${index + 1}`} />
            </button>
          ))}
        </div>
      )}

      {dog.status === 'AVAILABLE' && <span className={styles.badge}>Available for Adoption</span>}
    </div>
  );
};

export default DogGallery;
