import FieldError from './FieldError';
import FilePicker from './FilePicker';
import formStyles from './DogProfileForm.module.css';
import styles from './PhotoFields.module.css';

const MainPhotoField = ({ photo, required, uploading, error, onSelect }) => (
  <div className={formStyles.field}>
    <span className={formStyles.label}>
      Upload Photo {required && <span className={formStyles.required}>*</span>}
    </span>

    <FilePicker
      id="photo"
      label={uploading ? 'Uploading...' : 'Click to select an image'}
      onSelect={onSelect}
    />

    {photo && (
      <div className={styles.preview}>
        <img src={photo.preview} alt="Preview" className={styles.previewImage} />
      </div>
    )}

    <FieldError error={error} />
  </div>
);

export default MainPhotoField;
