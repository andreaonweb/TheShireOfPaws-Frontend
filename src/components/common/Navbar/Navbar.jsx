import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { NAV_LINKS } from '../../../constants/navigation';
import useScrolled from '../../../hooks/useScrolled';
import logo from '../../../assets/Icons/dogstadistic.png';
import styles from './Navbar.module.css';

const COMPACT_AFTER_PX = 40;

const linkClass = (baseClass) => ({ isActive }) =>
  isActive ? `${baseClass} ${styles.active}` : baseClass;

const Navbar = () => {
  const { pathname } = useLocation();
  const isCompact = useScrolled(COMPACT_AFTER_PX);
  // Storing the path the menu was opened on closes it automatically after navigation
  const [openOnPath, setOpenOnPath] = useState(null);
  const isMenuOpen = openOnPath === pathname;
  const closeMenu = () => setOpenOnPath(null);

  useEffect(() => {
    if (!isMenuOpen) return undefined;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setOpenOnPath(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  return (
    <nav className={`${styles.navbar} ${isCompact ? styles.compact : ''}`} aria-label="Main navigation">
      <div className={styles.container}>
        <Link to="/" className={styles.logo} aria-label="The Shire Of Paws - Home">
          <img src={logo} alt="The Shire Of Paws logo" className={styles.logoImage} />
          <span className={styles.logoText}>
            The Shire
            <br />
            of Paws
          </span>
        </Link>

        <ul className={styles.menu}>
          {NAV_LINKS.map(({ to, label }) => (
            <li key={to}>
              <NavLink to={to} end className={linkClass(styles.menuLink)}>
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <button
          className={styles.menuButton}
          onClick={() => setOpenOnPath(isMenuOpen ? null : pathname)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          <span className={styles.menuIcon}></span>
          <span className={styles.menuIcon}></span>
          <span className={styles.menuIcon}></span>
        </button>
      </div>

      {isMenuOpen && (
        <div id="mobile-menu" className={styles.mobileMenu}>
          <ul className={styles.mobileMenuList}>
            {NAV_LINKS.map(({ to, label }) => (
              <li key={to}>
                <NavLink to={to} end className={linkClass(styles.mobileMenuLink)} onClick={closeMenu}>
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
