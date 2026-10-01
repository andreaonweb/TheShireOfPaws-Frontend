import { AGE_RANGE_LABELS, EMPTY_FILTERS, GENDER_LABELS, SIZE_LABELS } from '../../../constants/dog';
import styles from './DogFilters.module.css';

const FILTERS = [
  {
    key: 'gender',
    label: 'Gender',
    allLabel: 'All',
    options: { MALE: GENDER_LABELS.MALE, FEMALE: GENDER_LABELS.FEMALE },
  },
  { key: 'size', label: 'Size', allLabel: 'All', options: SIZE_LABELS },
  { key: 'ageRange', label: 'Age', allLabel: 'All Ages', options: AGE_RANGE_LABELS },
];

const DogFilters = ({ filters, onChange }) => (
  <div className={styles.filters}>
    <h2 className={styles.title}>Find Your Perfect Match</h2>

    <div className={styles.filterGroup}>
      {FILTERS.map(({ key, label, allLabel, options }) => (
        <div key={key} className={styles.filterItem}>
          <label htmlFor={key} className={styles.label}>
            {label}
          </label>
          <select
            id={key}
            value={filters[key]}
            onChange={(e) => onChange({ ...filters, [key]: e.target.value })}
            className={styles.select}
          >
            <option value="">{allLabel}</option>
            {Object.entries(options).map(([value, optionLabel]) => (
              <option key={value} value={value}>
                {optionLabel}
              </option>
            ))}
          </select>
        </div>
      ))}

      <button
        onClick={() => onChange(EMPTY_FILTERS)}
        className={styles.clearButton}
        aria-label="Clear all filters"
      >
        Clear Filters
      </button>
    </div>
  </div>
);

export default DogFilters;
