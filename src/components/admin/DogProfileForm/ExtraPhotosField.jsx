import FieldError from './FieldError';
import FilePicker from './FilePicker';
import { MAX_EXTRA_PHOTOS } from './dogForm';
import formStyles from './DogProfileForm.module.css';
import styles from './PhotoFields.module.css';

const ExtraPhotosField = ({ photos, disabled, error, onAdd, onRemove }) => (
  <div className={formStyles.field}>
    <span className={formStyles.label}>
      Extra Photos <span className={formStyles.optional}>(up to {MAX_EXTRA_PHOTOS})</span>
    </span>

    {photos.length > 0 && (
      <ul className={styles.extraPhotos}>
        {photos.map((photo, index) => (
          <li key={photo.preview} className={styles.extraPhoto}>
            <img src={photo.preview} alt={`Extra photo ${index + 1}`} className={styles.extraPhotoImage} />
            <button
              type="button"
              className={styles.removePhoto}
              onClick={() => onRemove(index)}
              disabled={disabled}
              aria-label={`Remove extra photo ${index + 1}`}
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    )}

    {photos.length < MAX_EXTRA_PHOTOS && (
      <FilePicker id="extraPhoto" label="Add another photo" onSelect={onAdd} />
    )}

    <FieldError error={error} />
  </div>
);

export default ExtraPhotosField;
