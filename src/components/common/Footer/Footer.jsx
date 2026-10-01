import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import LoginModal from '../../admin/LoginModal/LoginModal';
import instagramIcon from '../../../assets/Icons/instagram.png';
import tiktokIcon from '../../../assets/Icons/tik-tok.png';
import styles from './Footer.module.css';

const SOCIAL_LINKS = [
  { href: 'https://instagram.com', name: 'Instagram', icon: instagramIcon },
  { href: 'https://tiktok.com', name: 'TikTok', icon: tiktokIcon },
];

const DASHBOARD_PATH = '/admin/dashboard';

const Footer = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.section}>
            <h3 className={styles.title}>Contact Us</h3>
            <address className={styles.address}>
              <p className={styles.contactItem}>
                <span className={styles.label}>Phone:</span>
                <a href="tel:+441234567890" className={styles.link}>
                  +44 1234 567890
                </a>
              </p>
              <p className={styles.contactItem}>
                <span className={styles.label}>Address:</span>
                123 Shire Lane, Hobbiton, UK
              </p>
            </address>
          </div>

          <div className={styles.section}>
            <p className={styles.tagline}>© 2025 The Shire Of Paws. Every paw matters.</p>
          </div>

          <div className={styles.section}>
            <div className={styles.socialLinks}>
              {SOCIAL_LINKS.map(({ href, name, icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label={`Follow us on ${name}`}
                >
                  <img src={icon} alt={name} />
                </a>
              ))}
            </div>

            <div className={styles.adminButtons}>
              {isAuthenticated ? (
                <button className={styles.adminLink} onClick={() => navigate(DASHBOARD_PATH)}>
                  Dashboard
                </button>
              ) : (
                <button
                  className={styles.adminLink}
                  onClick={() => setIsLoginModalOpen(true)}
                  aria-label="Admin login"
                >
                  Admin
                </button>
              )}
            </div>
          </div>
        </div>
      </footer>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={() => navigate(DASHBOARD_PATH)}
      />
    </>
  );
};

export default Footer;
