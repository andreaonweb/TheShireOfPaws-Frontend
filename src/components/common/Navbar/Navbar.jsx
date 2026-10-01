import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/Icons/dogstadistic.png';
import styles from './Navbar.module.css';

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/dogs', label: 'Adopt a Dog' },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className={styles.navbar} aria-label="Main navigation">
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link to="/" aria-label="The Shire Of Paws - Home">
            <img src={logo} alt="The Shire Of Paws Logo" className={styles.logoImage} />
            <span className={styles.logoText}>
              The Shire
              <br />
              of Paws
            </span>
          </Link>
        </div>

        <ul className={styles.menu}>
          {LINKS.map(({ to, label }) => (
            <li key={to}>
              <Link to={to} className={styles.menuLink}>
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          className={styles.menuButton}
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
        >
          <span className={styles.menuIcon}></span>
          <span className={styles.menuIcon}></span>
          <span className={styles.menuIcon}></span>
        </button>
      </div>

      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          <ul className={styles.mobileMenuList}>
            {LINKS.map(({ to, label }) => (
              <li key={to}>
                <Link to={to} className={styles.mobileMenuLink} onClick={closeMenu}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
