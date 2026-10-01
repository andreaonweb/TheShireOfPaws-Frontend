import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import useFetch from '../../hooks/useFetch';
import dogService from '../../services/dogService';
import adoptionRequestService from '../../services/adoptionRequestService';
import { getErrorMessage } from '../../services/api';
import Button from '../../components/common/Button/button';
import ConfirmModal from '../../components/common/ConfirmModal/ConfirmModal';
import DogProfileForm from '../../components/admin/DogProfileForm/DogProfileForm';
import DogsTable from '../../components/admin/Dashboard/DogsTable';
import RequestsTable from '../../components/admin/Dashboard/RequestsTable';
import RequestDetailsModal from '../../components/admin/Dashboard/RequestDetailsModal';
import { REQUEST_ACTIONS } from '../../components/admin/Dashboard/requestActions';
import styles from './AdminDashboardPage.module.css';

const fetchDogs = () => dogService.filterAllDogs();
const fetchRequests = () => adoptionRequestService.getAllRequests();

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [activeTab, setActiveTab] = useState('dogs');
  const [dogForm, setDogForm] = useState(null);
  const [viewingRequest, setViewingRequest] = useState(null);
  const [confirmation, setConfirmation] = useState(null);

  const dogs = useFetch(fetchDogs, { initialData: [], errorMessage: 'Failed to fetch dogs' });
  const requests = useFetch(fetchRequests, {
    initialData: [],
    errorMessage: 'Failed to fetch adoption requests',
  });

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const runConfirmed = async (action, failureMessage) => {
    try {
      await action();
    } catch (error) {
      alert(`${failureMessage}: ${getErrorMessage(error, error.message)}`);
    } finally {
      setConfirmation(null);
    }
  };

  const handleDeleteDog = (dog) =>
    setConfirmation({
      title: 'Delete Dog Profile',
      message: `Are you sure you want to delete ${dog.name}? This action cannot be undone.`,
      confirmText: 'Delete',
      variant: 'danger',
      onConfirm: () =>
        runConfirmed(async () => {
          await dogService.deleteDog(dog.id);
          dogs.refetch();
        }, 'Failed to delete dog'),
    });

  const handleRequestAction = (actionKey, requestId) => {
    const { status, confirm } = REQUEST_ACTIONS[actionKey];
    setConfirmation({
      ...confirm,
      onConfirm: () =>
        runConfirmed(async () => {
          await adoptionRequestService.updateRequestStatus(requestId, status);
          requests.refetch();
          if (viewingRequest?.id === requestId) {
            setViewingRequest(await adoptionRequestService.getRequestById(requestId));
          }
        }, 'Failed to update request'),
    });
  };

  const handleViewRequest = async (requestId) => {
    try {
      setViewingRequest(await adoptionRequestService.getRequestById(requestId));
    } catch {
      alert('Failed to load request details');
    }
  };

  const handleDogFormSuccess = () => {
    setDogForm(null);
    dogs.refetch();
  };

  if (dogs.loading || requests.loading) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.loading}>Loading...</div>
        </div>
      </div>
    );
  }

  const tabClass = (tab) => `${styles.tab} ${activeTab === tab ? styles.tabActive : ''}`;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Admin Dashboard</h1>
          <button onClick={handleLogout} className={styles.logoutButton}>
            Logout
          </button>
        </header>

        <nav className={styles.tabs}>
          <button className={tabClass('dogs')} onClick={() => setActiveTab('dogs')}>
            Dog Profiles ({dogs.data.length})
          </button>
          <button className={tabClass('requests')} onClick={() => setActiveTab('requests')}>
            Adoption Requests ({requests.data.length})
          </button>
        </nav>

        {activeTab === 'dogs' && (
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Dog Profiles</h2>
              <Button size="small" onClick={() => setDogForm({ dog: null })}>
                + Add New Profile
              </Button>
            </div>

            {dogs.error && <div className={styles.errorMessage}>Error loading dogs: {dogs.error}</div>}

            {dogForm ? (
              <article className={styles.formContainer}>
                <h3 className={styles.formTitle}>
                  {dogForm.dog ? `Edit ${dogForm.dog.name}` : 'Add New Dog Profile'}
                </h3>
                <DogProfileForm
                  key={dogForm.dog?.id ?? 'new'}
                  dog={dogForm.dog}
                  onSuccess={handleDogFormSuccess}
                  onCancel={() => setDogForm(null)}
                />
              </article>
            ) : (
              <DogsTable dogs={dogs.data} onEdit={(dog) => setDogForm({ dog })} onDelete={handleDeleteDog} />
            )}
          </section>
        )}

        {activeTab === 'requests' && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Adoption Requests</h2>
            {requests.error && (
              <div className={styles.errorMessage}>Error loading requests: {requests.error}</div>
            )}
            <RequestsTable requests={requests.data} onView={handleViewRequest} onAction={handleRequestAction} />
          </section>
        )}

        {viewingRequest && (
          <RequestDetailsModal
            request={viewingRequest}
            onClose={() => setViewingRequest(null)}
            onAction={handleRequestAction}
          />
        )}

        <ConfirmModal isOpen={Boolean(confirmation)} {...confirmation} onCancel={() => setConfirmation(null)} />
      </div>
    </div>
  );
};

export default AdminDashboardPage;
