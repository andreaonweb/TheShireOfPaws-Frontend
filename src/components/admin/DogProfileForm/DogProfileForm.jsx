import { useState } from 'react';
import Button from '../../common/Button/button';
import dogService from '../../../services/dogService';
import fileService from '../../../services/fileService';
import { getErrorMessage } from '../../../services/api';
import { GENDER_LABELS, SIZE_LABELS, STATUS_LABELS, TRAIT_LABELS, toOptions } from '../../../constants/dog';
import ChoiceGroup from './ChoiceGroup';
import ExtraPhotosField from './ExtraPhotosField';
import FieldError from './FieldError';
import MainPhotoField from './MainPhotoField';
import { newPhoto, savedPhoto, toDogRequest, toFormValues, validateDogForm, validateImage } from './dogForm';
import styles from './DogProfileForm.module.css';

const GENDER_OPTIONS = toOptions(GENDER_LABELS);
const SIZE_OPTIONS = toOptions(SIZE_LABELS);
const STATUS_OPTIONS = toOptions(STATUS_LABELS);
const TRAIT_OPTIONS = toOptions(TRAIT_LABELS);

const resolvePhotoUrl = (photo) => (photo.file ? fileService.uploadFile(photo.file) : photo.url);

const DogProfileForm = ({ dog = null, onSuccess, onCancel }) => {
  const isEditMode = Boolean(dog);

  const [values, setValues] = useState(() => toFormValues(dog));
  const [mainPhoto, setMainPhoto] = useState(() => (dog?.photoUrl ? savedPhoto(dog.photoUrl) : null));
  const [extraPhotos, setExtraPhotos] = useState(() => (dog?.extraPhotoUrls ?? []).map(savedPhoto));
  const [errors, setErrors] = useState({});
  const [submitState, setSubmitState] = useState(null);
  const busy = submitState !== null;

  const setValue = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleInputChange = (e) => setValue(e.target.name, e.target.value);

  const selectImage = (errorKey, onValid) => (file) => {
    const error = validateImage(file);
    setErrors((prev) => ({ ...prev, [errorKey]: error ?? '' }));
    if (!error) onValid(newPhoto(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateDogForm(values, { photoRequired: !isEditMode && !mainPhoto });
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    try {
      setSubmitState('uploading');
      const photoUrl = mainPhoto ? await resolvePhotoUrl(mainPhoto) : null;
      const extraPhotoUrls = [];
      for (const photo of extraPhotos) extraPhotoUrls.push(await resolvePhotoUrl(photo));

      setSubmitState('saving');
      const request = toDogRequest(values, photoUrl, extraPhotoUrls);
      await (isEditMode ? dogService.updateDog(dog.id, request) : dogService.createDog(request));
      onSuccess?.();
    } catch (error) {
      setErrors({ submit: getErrorMessage(error, 'Failed to save dog profile. Please try again.') });
    } finally {
      setSubmitState(null);
    }
  };

  const inputClass = (name) => `${styles.input} ${errors[name] ? styles.inputError : ''}`;
  const choiceProps = (name) => ({ name, value: values[name], onChange: setValue, error: errors[name] });

  return (
    <form onSubmit={handleSubmit} className={styles.form} noValidate>
      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="name" className={styles.label}>
            Name <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={values.name}
            onChange={handleInputChange}
            className={inputClass('name')}
            placeholder="e.g., Buddy"
          />
          <FieldError error={errors.name} />
        </div>

        <div className={styles.field}>
          <label htmlFor="age" className={styles.label}>
            Age <span className={styles.required}>*</span>
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={values.age}
            onChange={handleInputChange}
            className={inputClass('age')}
            placeholder="Age in years"
            min="0"
            max="30"
          />
          <FieldError error={errors.age} />
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="story" className={styles.label}>
          Story
        </label>
        <textarea
          id="story"
          name="story"
          value={values.story}
          onChange={handleInputChange}
          className={styles.textarea}
          placeholder="Tell us about this dog's background and personality..."
          rows="5"
        />
      </div>

      <div className={styles.row}>
        <ChoiceGroup {...choiceProps('gender')} legend="Gender" options={GENDER_OPTIONS} required />
        <ChoiceGroup {...choiceProps('size')} legend="Size" options={SIZE_OPTIONS} required />
      </div>

      <ChoiceGroup {...choiceProps('status')} legend="Status" options={STATUS_OPTIONS} required />
      <ChoiceGroup {...choiceProps('traits')} legend="Personality" options={TRAIT_OPTIONS} multiple />

      <MainPhotoField
        photo={mainPhoto}
        required={!isEditMode}
        uploading={submitState === 'uploading'}
        error={errors.photo}
        onSelect={selectImage('photo', setMainPhoto)}
      />

      <ExtraPhotosField
        photos={extraPhotos}
        disabled={busy}
        error={errors.extraPhotos}
        onAdd={selectImage('extraPhotos', (photo) => setExtraPhotos((prev) => [...prev, photo]))}
        onRemove={(index) => setExtraPhotos((prev) => prev.filter((_, i) => i !== index))}
      />

      {errors.submit && <div className={styles.submitError}>{errors.submit}</div>}

      <div className={styles.buttons}>
        {onCancel && (
          <Button variant="secondary" onClick={onCancel} disabled={busy}>
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={busy}>
          {busy ? 'Saving...' : isEditMode ? 'Update Profile' : 'Create Profile'}
        </Button>
      </div>
    </form>
  );
};

export default DogProfileForm;
