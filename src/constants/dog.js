export const GENDER_LABELS = {
  MALE: 'Male',
  FEMALE: 'Female',
  UNKNOWN: 'Unknown',
};

export const SIZE_LABELS = {
  SMALL: 'Small',
  MEDIUM: 'Medium',
  LARGE: 'Large',
  EXTRA_LARGE: 'Extra Large',
};

export const STATUS_LABELS = {
  AVAILABLE: 'Available',
  IN_PROCESS: 'In Process',
  ADOPTED: 'Adopted',
};

export const TRAIT_LABELS = {
  ACTIVE: 'Active',
  CALM: 'Calm',
  AFFECTIONATE: 'Affectionate',
  GOOD_WITH_KIDS: 'Good with kids',
  GOOD_WITH_DOGS: 'Good with other dogs',
  HOUSE_TRAINED: 'House-trained',
};

export const HOUSING_LABELS = {
  HOUSE: 'House',
  APARTMENT: 'Apartment',
  OTHER: 'Other',
};

export const AGE_RANGE_LABELS = {
  puppy: 'Puppy (0-1 years)',
  young: 'Young (2-3 years)',
  adult: 'Adult (4-7 years)',
  senior: 'Senior (8+ years)',
};

export const EMPTY_FILTERS = { gender: '', size: '', ageRange: '' };

export const PLACEHOLDER_IMG = '/placeholder-dog.svg';

export const toOptions = (labels) =>
  Object.entries(labels).map(([value, label]) => ({ value, label }));

export const getAgeRange = (age) => {
  if (age <= 1) return 'puppy';
  if (age <= 3) return 'young';
  if (age <= 7) return 'adult';
  return 'senior';
};

export const getDogPhotos = (dog) => [dog.photoUrl, ...(dog.extraPhotoUrls ?? [])].filter(Boolean);
