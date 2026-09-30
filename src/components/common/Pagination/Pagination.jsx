import styles from './Pagination.module.css';

// Page numbers with "…" when there are many pages: 1 … 4 5 6 … 12
const getPageItems = (page, totalPages) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  const items = [1];
  const start = Math.max(2, page - 1);
  const end = Math.min(totalPages - 1, page + 1);
  if (start > 2) items.push('start-gap');
  for (let p = start; p <= end; p++) items.push(p);
  if (end < totalPages - 1) items.push('end-gap');
  items.push(totalPages);
  return items;
};

const Pagination = ({ page, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <nav className={styles.pagination} aria-label="Pagination">
      <button
        type="button"
        className={styles.arrow}
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        aria-label="Previous page"
      >
        ←
      </button>

      <ul className={styles.pages}>
        {getPageItems(page, totalPages).map((item) =>
          typeof item === 'number' ? (
            <li key={item}>
              <button
                type="button"
                className={`${styles.page} ${item === page ? styles.active : ''}`}
                onClick={() => onPageChange(item)}
                aria-label={`Page ${item}`}
                aria-current={item === page ? 'page' : undefined}
              >
                {item}
              </button>
            </li>
          ) : (
            <li key={item} className={styles.gap} aria-hidden="true">
              …
            </li>
          )
        )}
      </ul>

      <button
        type="button"
        className={styles.arrow}
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        aria-label="Next page"
      >
        →
      </button>
    </nav>
  );
};

export default Pagination;
