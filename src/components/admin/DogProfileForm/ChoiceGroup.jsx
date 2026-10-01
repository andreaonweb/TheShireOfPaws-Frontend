import FieldError from './FieldError';
import styles from './DogProfileForm.module.css';

const ChoiceGroup = ({ legend, name, options, value, onChange, multiple = false, required, error }) => {
  const isChecked = (optionValue) => (multiple ? value.includes(optionValue) : value === optionValue);

  const handleChange = (optionValue, checked) => {
    if (!multiple) return onChange(name, optionValue);
    onChange(name, checked ? [...value, optionValue] : value.filter((v) => v !== optionValue));
  };

  return (
    <fieldset className={styles.fieldset}>
      <legend className={styles.label}>
        {legend} {required && <span className={styles.required}>*</span>}
      </legend>
      <div className={styles.radioGroup}>
        {options.map((option) => (
          <label key={option.value} className={styles.radioLabel}>
            <input
              type={multiple ? 'checkbox' : 'radio'}
              name={name}
              value={option.value}
              checked={isChecked(option.value)}
              onChange={(e) => handleChange(option.value, e.target.checked)}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
      <FieldError error={error} />
    </fieldset>
  );
};

export default ChoiceGroup;
