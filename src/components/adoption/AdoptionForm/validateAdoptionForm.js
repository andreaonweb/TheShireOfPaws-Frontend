const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const MIN_MOTIVATION_LENGTH = 50;

const validateAdoptionForm = (values) => {
  const errors = {};

  if (!values.requesterFirstName.trim()) errors.requesterFirstName = 'First name is required';
  if (!values.requesterLastName.trim()) errors.requesterLastName = 'Last name is required';

  if (!values.requesterEmail.trim()) {
    errors.requesterEmail = 'Email is required';
  } else if (!EMAIL_REGEX.test(values.requesterEmail)) {
    errors.requesterEmail = 'Please enter a valid email';
  }

  if (!values.housingType) errors.housingType = 'Please select your housing type';

  if (!values.householdSize) {
    errors.householdSize = 'Household size is required';
  } else if (values.householdSize < 1 || values.householdSize > 20) {
    errors.householdSize = 'Please enter a valid household size (1-20)';
  }

  if (!values.motivation.trim()) {
    errors.motivation = 'Please tell us why you want to adopt';
  } else if (values.motivation.trim().length < MIN_MOTIVATION_LENGTH) {
    errors.motivation = `Please provide at least ${MIN_MOTIVATION_LENGTH} characters`;
  }

  return errors;
};

export default validateAdoptionForm;
