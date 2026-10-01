import AdminTable from './AdminTable';
import StatusBadge from './StatusBadge';
import { REQUEST_ACTIONS, getRequestActions } from './requestActions';
import styles from './AdminTable.module.css';

const COLUMNS = ['Name', 'Email', 'Dog', 'Status', 'Date', 'Form', 'Actions'];

const ACTION_CLASSES = {
  approve: styles.approve,
  deny: styles.deny,
  reset: styles.iconButton,
};

const RequestRow = ({ request, onView, onAction }) => (
  <tr>
    <td>
      {request.requesterFirstName} {request.requesterLastName}
    </td>
    <td>{request.requesterEmail}</td>
    <td>{request.dogName || '-'}</td>
    <td>
      <StatusBadge status={request.status} />
    </td>
    <td>{new Date(request.createdAt).toLocaleDateString()}</td>
    <td>
      <button className={styles.iconButton} title="View Form" onClick={() => onView(request.id)}>
        👁️
      </button>
    </td>
    <td>
      <div className={styles.actions}>
        {getRequestActions(request.status).map((action) => (
          <button
            key={action}
            className={ACTION_CLASSES[action]}
            title={REQUEST_ACTIONS[action].label}
            onClick={() => onAction(action, request.id)}
          >
            {REQUEST_ACTIONS[action].icon}
          </button>
        ))}
      </div>
    </td>
  </tr>
);

const RequestsTable = ({ requests, onView, onAction }) => (
  <AdminTable columns={COLUMNS} emptyMessage="No adoption requests yet.">
    {requests.map((request) => (
      <RequestRow key={request.id} request={request} onView={onView} onAction={onAction} />
    ))}
  </AdminTable>
);

export default RequestsTable;
