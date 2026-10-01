import useFetch from '../../../hooks/useFetch';
import dogService from '../../../services/dogService';
import styles from './Stats.module.css';

const STAT_ITEMS = [
  { key: 'rescued', label: 'Rescued Dogs' },
  { key: 'adopted', label: 'Adopted Dogs' },
  { key: 'available', label: 'Dogs Available' },
];

const EMPTY_STATS = { rescued: 0, adopted: 0, available: 0 };

const Stats = () => {
  const { data: stats, loading } = useFetch(dogService.getStats, { initialData: EMPTY_STATS });

  return (
    <section className={styles.stats}>
      <div className={styles.container}>
        {loading ? (
          <div className={styles.loading}>Loading stats...</div>
        ) : (
          <div className={styles.grid}>
            {STAT_ITEMS.map(({ key, label }) => (
              <div key={key} className={styles.statCard}>
                <div className={styles.number}>{stats[key]}</div>
                <div className={styles.label}>{label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Stats;
