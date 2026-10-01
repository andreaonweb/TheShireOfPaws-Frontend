import { Children } from 'react';
import styles from './AdminTable.module.css';

const AdminTable = ({ columns, emptyMessage, children }) => (
  <div className={styles.tableWrapper}>
    <table className={styles.table}>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Children.count(children) > 0 ? (
          children
        ) : (
          <tr>
            <td colSpan={columns.length} className={styles.emptyMessage}>
              {emptyMessage}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

export default AdminTable;
