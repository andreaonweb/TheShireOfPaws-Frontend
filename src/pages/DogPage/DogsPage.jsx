import { useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import dogService from '../../services/dogService';
import { EMPTY_FILTERS, getAgeRange } from '../../constants/dog';
import DogCard from '../../components/dogs/DogCard/DogCard';
import DogFilters from '../../components/dogs/DogFilters/DogFilters';
import Pagination from '../../components/common/Pagination/Pagination';
import styles from './DogsPage.module.css';

const DOGS_PER_PAGE = 8;

const fetchAvailableDogs = () => dogService.filterAllDogs({ status: 'AVAILABLE' });

const matchesFilters = (dog, { gender, size, ageRange }) =>
  (!gender || dog.gender === gender) &&
  (!size || dog.size === size) &&
  (!ageRange || getAgeRange(dog.age) === ageRange);

const DogsPage = () => {
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [searchParams, setSearchParams] = useSearchParams();
  const gridRef = useRef(null);
  const { data: dogs, loading, error } = useFetch(fetchAvailableDogs, {
    initialData: [],
    errorMessage: 'Failed to fetch dogs',
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setSearchParams({}, { replace: true });
  };

  const goToPage = (page) => {
    setSearchParams(page === 1 ? {} : { page: String(page) });
    gridRef.current?.scrollIntoView({ block: 'start' });
  };

  if (loading || error) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          {loading ? (
            <div className={styles.loading}>Loading dogs...</div>
          ) : (
            <div className={styles.error}>Error loading dogs: {error}</div>
          )}
        </div>
      </div>
    );
  }

  const filteredDogs = dogs.filter((dog) => matchesFilters(dog, filters));
  const totalPages = Math.max(1, Math.ceil(filteredDogs.length / DOGS_PER_PAGE));
  const requestedPage = parseInt(searchParams.get('page'), 10) || 1;
  const currentPage = Math.min(Math.max(requestedPage, 1), totalPages);
  const firstIndex = (currentPage - 1) * DOGS_PER_PAGE;
  const pageDogs = filteredDogs.slice(firstIndex, firstIndex + DOGS_PER_PAGE);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            Loveable
            <br />
            <span className={styles.titleAccent}>Dogs & Puppies</span>
          </h1>
        </div>

        <DogFilters filters={filters} onChange={handleFilterChange} />

        {filteredDogs.length > 0 && (
          <p className={styles.resultsInfo} aria-live="polite">
            Showing {firstIndex + 1}–{firstIndex + pageDogs.length} of {filteredDogs.length} dogs
          </p>
        )}

        <div className={styles.grid} ref={gridRef}>
          {pageDogs.length > 0 ? (
            pageDogs.map((dog, index) => <DogCard key={dog.id} dog={dog} index={firstIndex + index} />)
          ) : (
            <p className={styles.noResults}>No dogs found matching your filters. Try adjusting your search!</p>
          )}
        </div>

        <Pagination page={currentPage} totalPages={totalPages} onPageChange={goToPage} />
      </div>
    </div>
  );
};

export default DogsPage;
