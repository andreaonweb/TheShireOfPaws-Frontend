export const MAX_EXTRA_PHOTOS = 2;
const MAX_PHOTO_SIZE = 10 * 1024 * 1024;

export const toFormValues = (dog) => ({
  name: dog?.name ?? '',
  story: dog?.story ?? '',
  gender: dog?.gender ?? '',
  age: dog?.age?.toString() ?? '',
  size: dog?.size ?? '',
  status: dog?.status ?? 'AVAILABLE',
  traits: dog?.traits ?? [],
});

export const savedPhoto = (url) => ({ url, preview: url });

export const newPhoto = (file) => ({ file, preview: URL.createObjectURL(file) });

export const validateImage = (file) => {
  if (!file.type.startsWith('image/')) return 'Please select a valid image file';
  if (file.size > MAX_PHOTO_SIZE) return 'Image size must be less than 10MB';
  return null;
};

export const validateDogForm = (values, { photoRequired }) => {
  const errors = {};
  const name = values.name.trim();
  const age = parseInt(values.age, 10);

  if (!name) errors.name = 'Name is required';
  else if (name.length < 2) errors.name = 'Name must be at least 2 characters';

  if (!values.gender) errors.gender = 'Gender is required';

  if (!values.age) errors.age = 'Age is required';
  else if (age < 0 || age > 30) errors.age = 'Age must be between 0 and 30';

  if (!values.size) errors.size = 'Size is required';
  if (!values.status) errors.status = 'Status is required';
  if (photoRequired) errors.photo = 'Please upload a photo';

  return errors;
};

export const toDogRequest = (values, photoUrl, extraPhotoUrls) => ({
  name: values.name.trim(),
  story: values.story.trim() || null,
  gender: values.gender,
  age: parseInt(values.age, 10),
  size: values.size,
  photoUrl: photoUrl || null,
  status: values.status,
  traits: values.traits,
  extraPhotoUrls,
});
