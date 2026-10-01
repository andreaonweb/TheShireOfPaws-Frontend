import Button from '../../common/Button/button';
import StatusBadge from './StatusBadge';
import { REQUEST_ACTIONS, getRequestActions } from './requestActions';
import styles from './RequestDetailsModal.module.css';

const DetailRow = ({ label, children }) => (
  <div className={styles.detailRow}>
    <strong>{label}:</strong>
    {children}
  </div>
);

const RequestDetailsModal = ({ request, onClose, onAction }) => (
  <div className={styles.backdrop} onClick={onClose}>
    <article className={styles.modal} onClick={(e) => e.stopPropagation()}>
      <header className={styles.header}>
        <h3>Adoption Request Details</h3>
        <button className={styles.closeButton} onClick={onClose} aria-label="Close modal">
          ✕
        </button>
      </header>

      <div className={styles.body}>
        <DetailRow label="Name">
          <span>
            {request.requesterFirstName} {request.requesterLastName}
          </span>
        </DetailRow>
        <DetailRow label="Email">
          <span>{request.requesterEmail}</span>
        </DetailRow>
        <DetailRow label="Dog">
          <span>{request.dogName}</span>
        </DetailRow>
        <DetailRow label="Housing Type">
          <span>{request.housingType}</span>
        </DetailRow>
        <DetailRow label="Household Size">
          <span>{request.householdSize} people</span>
        </DetailRow>
        <DetailRow label="Motivation">
          <p>{request.motivation}</p>
        </DetailRow>
        <DetailRow label="Daytime Location">
          <p>{request.daytimeLocation || 'Not provided'}</p>
        </DetailRow>
        <DetailRow label="Status">
          <StatusBadge status={request.status} />
        </DetailRow>
      </div>

      <footer className={styles.footer}>
        {getRequestActions(request.status).map((action) => (
          <Button
            key={action}
            variant={action === 'approve' ? 'primary' : 'secondary'}
            size="small"
            onClick={() => onAction(action, request.id)}
          >
            {REQUEST_ACTIONS[action].label}
          </Button>
        ))}
      </footer>
    </article>
  </div>
);

export default RequestDetailsModal;
