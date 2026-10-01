import { Link } from 'react-router-dom';
import AdminAccess from '../../admin/AdminAccess/AdminAccess';
import { NAV_LINKS } from '../../../constants/navigation';
import logo from '../../../assets/Icons/dogstadistic.png';
import instagramIcon from '../../../assets/Icons/instagram.png';
import tiktokIcon from '../../../assets/Icons/tik-tok.png';
import styles from './Footer.module.css';

const SOCIAL_LINKS = [
  { href: 'https://instagram.com', name: 'Instagram', icon: instagramIcon },
  { href: 'https://tiktok.com', name: 'TikTok', icon: tiktokIcon },
];

const CURRENT_YEAR = new Date().getFullYear();

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.container}>
      <div className={styles.brand}>
        <Link to="/" className={styles.brandLink}>
          <img src={logo} alt="The Shire Of Paws logo" className={styles.brandLogo} />
          <span>The Shire of Paws</span>
        </Link>
        <p className={styles.tagline}>Every paw matters.</p>
      </div>

      <nav className={styles.column} aria-label="Footer navigation">
        <h3 className={styles.heading}>Explore</h3>
        <ul className={styles.list}>
          {NAV_LINKS.map(({ to, label }) => (
            <li key={to}>
              <Link to={to} className={styles.link}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.column}>
        <h3 className={styles.heading}>Contact</h3>
        <address className={styles.list}>
          <a href="tel:+441234567890" className={styles.link}>
            +44 1234 567890
          </a>
          <span>123 Shire Lane, Hobbiton, UK</span>
        </address>
      </div>

      <div className={styles.column}>
        <h3 className={styles.heading}>Follow us</h3>
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
      </div>
    </div>

    <div className={styles.bottomBar}>
      <p className={styles.copyright}>© {CURRENT_YEAR} The Shire Of Paws</p>
      <AdminAccess className={styles.adminLink} />
    </div>
  </footer>
);

export default Footer;
