import styles from './DogProfileForm.module.css';

const FieldError = ({ error }) => (error ? <span className={styles.errorMessage}>{error}</span> : null);

export default FieldError;
