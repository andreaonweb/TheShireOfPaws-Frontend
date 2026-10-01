import AdminTable from './AdminTable';
import StatusBadge from './StatusBadge';
import tableStyles from './AdminTable.module.css';
import styles from './DogsTable.module.css';

const COLUMNS = ['Photo', 'Name', 'Story', 'Gender', 'Age', 'Size', 'Status', 'Requests', 'Actions'];

const DogRow = ({ dog, onEdit, onDelete }) => (
  <tr>
    <td>
      {dog.photoUrl ? (
        <img src={dog.photoUrl} alt={dog.name} className={styles.dogPhoto} />
      ) : (
        <div className={styles.noPhoto}>No photo</div>
      )}
    </td>
    <td className={styles.nameCell}>{dog.name}</td>
    <td className={styles.storyCell}>{dog.story ? `${dog.story.substring(0, 50)}...` : '-'}</td>
    <td>{dog.gender}</td>
    <td>{dog.age}</td>
    <td>{dog.size}</td>
    <td>
      <StatusBadge status={dog.status} />
    </td>
    <td>{dog.adoptionRequestsCount || 0}</td>
    <td>
      <div className={tableStyles.actions}>
        <button className={tableStyles.iconButton} title="Edit" onClick={() => onEdit(dog)}>
          ✏️
        </button>
        <button className={tableStyles.iconButton} title="Delete" onClick={() => onDelete(dog)}>
          🗑️
        </button>
      </div>
    </td>
  </tr>
);

const DogsTable = ({ dogs, onEdit, onDelete }) => (
  <AdminTable columns={COLUMNS} emptyMessage='No dogs found. Click "Add New Profile" to create one.'>
    {dogs.map((dog) => (
      <DogRow key={dog.id} dog={dog} onEdit={onEdit} onDelete={onDelete} />
    ))}
  </AdminTable>
);

export default DogsTable;
