import { useState } from 'react';
import adoptionRequestService from '../../../services/adoptionRequestService';
import { getErrorMessage } from '../../../services/api';
import { HOUSING_LABELS } from '../../../constants/dog';
import Button from '../../common/Button/button';
import FormField from './FormField';
import validateAdoptionForm, { MIN_MOTIVATION_LENGTH } from './validateAdoptionForm';
import styles from './AdoptionForm.module.css';

const INITIAL_VALUES = {
  requesterFirstName: '',
  requesterLastName: '',
  requesterEmail: '',
  housingType: '',
  householdSize: '',
  motivation: '',
  daytimeLocation: '',
};

const AdoptionForm = ({ dogId, dogName, onSuccess }) => {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const fieldProps = (name) => ({
    name,
    value: values[name],
    onChange: handleChange,
    error: errors[name],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateAdoptionForm(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      await adoptionRequestService.createRequest({
        ...values,
        householdSize: parseInt(values.householdSize, 10),
        dogId,
      });
      onSuccess?.();
    } catch (error) {
      setErrors({ submit: getErrorMessage(error, 'Failed to submit adoption request') });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <p className={styles.intro}>
        Fill out this form to apply for adopting <strong>{dogName}</strong>. We'll review your
        application and get back to you soon!
      </p>

      <div className={styles.row}>
        <FormField label="First Name" placeholder="Your first name" required {...fieldProps('requesterFirstName')} />
        <FormField label="Last Name" placeholder="Your last name" required {...fieldProps('requesterLastName')} />
      </div>

      <FormField
        label="Email"
        type="email"
        placeholder="your.email@example.com"
        required
        {...fieldProps('requesterEmail')}
      />

      <fieldset className={styles.field}>
        <legend className={styles.label}>
          Housing Type <span className={styles.required}>*</span>
        </legend>
        <div className={styles.radioGroup}>
          {Object.entries(HOUSING_LABELS).map(([value, label]) => (
            <label key={value} className={styles.radioLabel}>
              <input
                type="radio"
                name="housingType"
                value={value}
                checked={values.housingType === value}
                onChange={handleChange}
              />
              <span>{label}</span>
            </label>
          ))}
        </div>
        {errors.housingType && <span className={styles.errorMessage}>{errors.housingType}</span>}
      </fieldset>

      <FormField
        label="Household Size"
        type="number"
        placeholder="Number of people in your household"
        min="1"
        max="20"
        required
        {...fieldProps('householdSize')}
      />

      <FormField
        label="Why do you want to adopt this dog?"
        placeholder={`Tell us about yourself and why you'd be a great fit for this dog (minimum ${MIN_MOTIVATION_LENGTH} characters)`}
        textarea
        rows="5"
        required
        hint={`${values.motivation.length} / ${MIN_MOTIVATION_LENGTH} characters minimum`}
        {...fieldProps('motivation')}
      />

      <FormField
        label="Where will the dog stay during the day?"
        placeholder="Tell us about the dog's daily routine and where they'll spend their time"
        textarea
        rows="3"
        {...fieldProps('daytimeLocation')}
      />

      {errors.submit && <div className={styles.submitError}>{errors.submit}</div>}

      <Button type="submit" size="large" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit Adoption Request'}
      </Button>
    </form>
  );
};

export default AdoptionForm;
