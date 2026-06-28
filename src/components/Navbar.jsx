import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import styles from './Navbar.module.css';

const Navbar = ({ page, setPage, user }) => {
  const links = [
    { label: 'Home', key: 'home' },
    { label: 'About Us', key: 'about' },
    { label: 'Features', key: 'features' },
    { label: 'Order', key: 'order' },
    { label: 'Contact Us', key: 'contact' },
  ];

  const handleLogout = async () => {
    await signOut(auth);
    setPage('home');
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo} onClick={() => setPage('home')}>
        <div className={styles.logoIcon}>S</div>
        SmartChair
      </div>
      <div className={styles.links}>
        {links.map(l => (
          <a key={l.key} className={page === l.key ? styles.active : ''} onClick={() => setPage(l.key)}>{l.label}</a>
        ))}
      </div>
      <div className={styles.authArea}>
        {user ? (
          <div className={styles.userArea}>
            <span className={styles.userEmail}>👤 {user.email}</span>
            <button className={styles.logoutBtn} onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <button className="btn-primary" onClick={() => setPage('login')}>Get Started</button>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
