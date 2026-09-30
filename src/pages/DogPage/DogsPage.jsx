import DogCard from '../../components/dogs/DogCard/DogCard';       
import DogFilters from '../../components/dogs/DogFilters/DogFilters'; 
import Pagination from '../../components/common/Pagination/Pagination';
import dogService from '../../services/dogService';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './DogsPage.module.css'; 

const DOGS_PER_PAGE = 8;

const DogsPage = () => {
  const [filters, setFilters] = useState({
    gender: '',
    size: '',
    ageRange: '',
    status: 'AVAILABLE'
  });


  const [allDogs, setAllDogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Current page lives in the URL (?page=2) so back and reload keep it
  const [searchParams, setSearchParams] = useSearchParams();
  const gridRef = useRef(null);

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        setLoading(true);
        setError(null);
        // All available dogs: the age filter only exists here, not in the backend
        setAllDogs(await dogService.filterAllDogs({ status: 'AVAILABLE' }));
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch dogs');
      } finally {
        setLoading(false);
      }
    };

    fetchDogs();
  }, []);

  const handleFilterChange = (newFilters) => {
    setFilters({
      ...newFilters,
      status: 'AVAILABLE'
    });
    // New filters start again from the first page
    setSearchParams({}, { replace: true });
  };

  const goToPage = (page) => {
    setSearchParams(page === 1 ? {} : { page: String(page) });
    gridRef.current?.scrollIntoView({ block: 'start' });
  };

  const getAgeRange = (age) => {
    if (age <= 1) return 'puppy';
    if (age >= 2 && age <= 3) return 'young';
    if (age >= 4 && age <= 7) return 'adult';
    if (age >= 8) return 'senior';
    return '';
  };

  const filteredDogs = allDogs.filter(dog => {

    if (filters.gender && dog.gender !== filters.gender) return false;
    

    if (filters.size && dog.size !== filters.size) return false;
    

    if (filters.ageRange && getAgeRange(dog.age) !== filters.ageRange) return false;
    
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filteredDogs.length / DOGS_PER_PAGE));
  const requestedPage = parseInt(searchParams.get('page'), 10) || 1;
  const currentPage = Math.min(Math.max(requestedPage, 1), totalPages);
  const firstIndex = (currentPage - 1) * DOGS_PER_PAGE;
  const pageDogs = filteredDogs.slice(firstIndex, firstIndex + DOGS_PER_PAGE);

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.loading}>Loading dogs...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.error}>Error loading dogs: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            Loveable<br />
            <span className={styles.titleAccent}>Dogs & Puppies</span>
          </h1>
        </div>

        <DogFilters onFilterChange={handleFilterChange} />

        {filteredDogs.length > 0 && (
          <p className={styles.resultsInfo} aria-live="polite">
            Showing {firstIndex + 1}–{firstIndex + pageDogs.length} of {filteredDogs.length} dogs
          </p>
        )}

        <div className={styles.grid} ref={gridRef}>
          {pageDogs.length > 0 ? (
            pageDogs.map((dog, index) => (
              // Global index so the card colours keep alternating across pages
              <DogCard key={dog.id} dog={dog} index={firstIndex + index} />
            ))
          ) : (
            <p className={styles.noResults}>
              No dogs found matching your filters. Try adjusting your search!
            </p>
          )}
        </div>

        <Pagination page={currentPage} totalPages={totalPages} onPageChange={goToPage} />
      </div>
    </div>
  );
};

export default DogsPage;