import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import dogService from '../../services/dogService';
import { TRAIT_LABELS } from '../../constants/dog';
import Button from '../../components/common/Button/button';
import AdoptionForm from '../../components/adoption/AdoptionForm/AdoptionForm';
import DogGallery from '../../components/dogs/DogGallery/DogGallery';
import styles from './DogDetailPage.module.css';

const DogDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showAdoptionForm, setShowAdoptionForm] = useState(false);
  const formRef = useRef(null);

  const fetchDog = useCallback(() => dogService.getDogById(id), [id]);
  const { data: dog, loading, error } = useFetch(fetchDog, { errorMessage: 'Failed to load dog details' });

  useEffect(() => {
    if (showAdoptionForm) formRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [showAdoptionForm]);

  const goToDogs = () => navigate('/dogs');

  const handleFormSuccess = () => {
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 2000);
  };

  if (loading || error || !dog) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          {loading ? (
            <div className={styles.loading}>Loading...</div>
          ) : (
            <>
              <div className={styles.error}>{error || 'Dog not found'}</div>
              <Button onClick={goToDogs}>Back to Dogs</Button>
            </>
          )}
        </div>
      </div>
    );
  }

  const facts = [
    { label: 'Age', value: `${dog.age} ${dog.age === 1 ? 'Year' : 'Years'}` },
    { label: 'Gender', value: dog.gender },
    { label: 'Size', value: dog.size },
  ];

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <button onClick={goToDogs} className={styles.backButton}>
          ← Back to Dogs
        </button>

        <div className={styles.mainCard}>
          <DogGallery dog={dog} />

          <div className={styles.storyBox}>
            <h2 className={styles.storyTitle}>About {dog.name}</h2>
            <p className={styles.storyText}>{dog.story || 'No story available.'}</p>

            {dog.traits?.length > 0 && (
              <ul className={styles.traits} aria-label="Personality">
                {dog.traits.map((trait) => (
                  <li key={trait} className={styles.trait}>
                    {TRAIT_LABELS[trait] || trait}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className={styles.details}>
            {facts.map(({ label, value }) => (
              <div key={label} className={styles.detailItem}>
                <span className={styles.detailLabel}>{label}</span>
                <span className={styles.detailValue}>{value}</span>
              </div>
            ))}
          </div>
        </div>

        {dog.status === 'AVAILABLE' && (
          <div className={styles.adoptButtonWrapper}>
            <Button size="large" onClick={() => setShowAdoptionForm(true)}>
              I Want to Adopt {dog.name}
            </Button>
          </div>
        )}

        {showAdoptionForm && (
          <div ref={formRef} className={styles.formSection}>
            <h2 className={styles.formTitle}>Adoption Application for {dog.name}</h2>
            <AdoptionForm dogId={dog.id} dogName={dog.name} onSuccess={handleFormSuccess} />
          </div>
        )}
      </div>
    </div>
  );
};

export default DogDetailPage;
