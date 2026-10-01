import styles from './StatusBadge.module.css';

const STATUS_CLASSES = {
  AVAILABLE: styles.available,
  IN_PROCESS: styles.inProcess,
  ADOPTED: styles.adopted,
  APPROVED: styles.approved,
  DENIED: styles.denied,
};

const formatStatus = (status) => (status === 'IN_PROCESS' ? 'In process' : status.toLowerCase());

const StatusBadge = ({ status }) => (
  <span className={`${styles.badge} ${STATUS_CLASSES[status] ?? ''}`}>{formatStatus(status)}</span>
);

export default StatusBadge;
