import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { DASHBOARD_PATH } from '../../../constants/navigation';
import LoginModal from '../LoginModal/LoginModal';

const AdminAccess = ({ className }) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const goToDashboard = () => navigate(DASHBOARD_PATH);

  return (
    <>
      {isAuthenticated ? (
        <button className={className} onClick={goToDashboard}>
          Dashboard
        </button>
      ) : (
        <button className={className} onClick={() => setIsLoginOpen(true)} aria-label="Admin login">
          Admin
        </button>
      )}

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} onLoginSuccess={goToDashboard} />
    </>
  );
};

export default AdminAccess;
