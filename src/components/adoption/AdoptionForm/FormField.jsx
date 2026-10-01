import styles from './AdoptionForm.module.css';

const FormField = ({ label, name, error, required, textarea, hint, ...inputProps }) => {
  const Control = textarea ? 'textarea' : 'input';
  const baseClass = textarea ? styles.textarea : styles.input;

  return (
    <div className={styles.field}>
      <label htmlFor={name} className={styles.label}>
        {label} {required && <span className={styles.required}>*</span>}
      </label>
      <Control
        id={name}
        name={name}
        className={`${baseClass} ${error ? styles.inputError : ''}`}
        {...inputProps}
      />
      {hint && <span className={styles.charCount}>{hint}</span>}
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
};

export default FormField;
