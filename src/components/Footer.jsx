import styles from './Footer.module.css';
const Footer = ({ setPage }) => (
  <footer className={styles.footer}>
    <div className={styles.grid}>
      <div className={styles.col}>
        <h4>Contact Info</h4>
        <p>✉ info@smartchair.pk</p>
        <p>📞 +92(322)8666298</p>
        <p>📍 4L VALENCIA TOWN, LAHORE</p>
      </div>
      <div className={styles.col}>
        <h4>Quick Links</h4>
        <a onClick={() => setPage('home')}>Home</a>
        <a onClick={() => setPage('about')}>About Us</a>
        <a onClick={() => setPage('features')}>Features</a>
        <a onClick={() => setPage('contact')}>Contact</a>
      </div>
      <div className={styles.col}>
        <h4>Follow Us</h4>
        <div className={styles.socialRow}>
          {['f','X','in','IG'].map(s => <div key={s} className={styles.socialBtn}>{s}</div>)}
        </div>
      </div>
    </div>
    <div className={styles.bottom}>© 2026 SmartChair. All rights reserved.</div>
  </footer>
);
export default Footer;
