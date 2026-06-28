import Footer from '../components/Footer';
import styles from './About.module.css';
const About = ({ setPage }) => (
  <>
    <div className="page-hero"><h1>About Us</h1><p>We're on a mission to redefine mobility and independence for people worldwide through cutting-edge technology.</p></div>
    <section className="section">
      <div className={styles.missionWrap}>
        <h2 className="section-title">Our Mission</h2>
        <p className={styles.missionText}>At SmartChair, we believe everyone deserves the freedom to move independently and confidently. Our AI-powered wheelchair combines the latest in machine learning, sensor technology, and ergonomic design to create a product that truly empowers its users.</p>
      </div>
      <div className={styles.statsGrid}>
        {[{num:'10,000+',label:'Happy Users'},{num:'50+',label:'Countries Served'},{num:'99.8%',label:'Uptime Reliability'}].map(s=>(
          <div key={s.label} className={styles.statCard}><p className={styles.statNum}>{s.num}</p><p className={styles.statLabel}>{s.label}</p></div>
        ))}
      </div>
      <div className={styles.storyGrid}>
        <div><h3 className={styles.subHeading}>Our Story</h3><p className={styles.bodyText}>Founded in 2020 by a team of engineers and accessibility advocates, SmartChair was born from a simple observation: existing wheelchair technology hadn't fundamentally changed in decades. We set out to change that.</p></div>
        <div><h3 className={styles.subHeading}>Our Values</h3><ul className={styles.valuesList}>{['Accessibility First','Innovation Without Compromise','User-Centered Design','Safety Above All'].map(v=><li key={v}><span className={styles.checkMark}>✓</span> {v}</li>)}</ul></div>
      </div>
    </section>
    <div className="cta-band"><h2>Join the SmartChair Family</h2><p>Be part of the movement transforming mobility for millions around the world.</p><button className="btn-white" onClick={()=>setPage('order')}>Order Now</button></div>
    <Footer setPage={setPage}/>
  </>
);
export default About;
