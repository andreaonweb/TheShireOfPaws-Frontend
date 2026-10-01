import styles from './PhotoFields.module.css';

const FilePicker = ({ id, label, onSelect }) => {
  const handleChange = (e) => {
    const file = e.target.files[0];
    e.target.value = '';
    if (file) onSelect(file);
  };

  return (
    <div className={styles.photoUpload}>
      <input type="file" id={id} accept="image/*" onChange={handleChange} className={styles.fileInput} />
      <label htmlFor={id} className={styles.fileLabel}>
        {label}
      </label>
    </div>
  );
};

export default FilePicker;
