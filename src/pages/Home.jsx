import Footer from '../components/Footer';
import FeatureCard from '../components/FeatureCard';
import Icon, { icons } from '../components/Icon';
import styles from './Home.module.css';

const Home = ({ setPage }) => {
  const howItems = [
    { icon: icons.mic,    title: 'Voice Commands',        desc: 'Control your wheelchair through voice commands with multi-lingual support for ease.' },
    { icon: icons.shield, title: 'Obstacle Detection',    desc: 'Automatically detects obstacles in real-time and navigates around them safely.' },
    { icon: icons.nav2,   title: 'Autonomous Navigation', desc: 'Follow GPS efficiently based on AI to generate route to your destination.' },
    { icon: icons.bell,   title: 'Emergency Alerts',      desc: 'Sends alert to caregivers during emergencies for immediate assistance.' },
  ];
  return (
    <>
      <section className={styles.hero}>
        <div className={`${styles.heroText} fade-up`}>
          <h1>Empowering Mobility,<br/>Enhancing Independence</h1>
          <p>AI-powered smart wheelchair providing intuitive navigation, obstacle detection, and more.</p>
          <button className="btn-white" onClick={() => setPage('features')}>Learn More</button>
        </div>
        <div className={styles.heroImg}>
          <svg viewBox="0 0 200 160" fill="none" width="160" height="160">
            <circle cx="75" cy="35" r="14" fill="white" opacity="0.9"/>
            <path d="M75 52 Q68 68 62 80 L90 80 Q88 68 75 52Z" fill="white" opacity="0.9"/>
            <ellipse cx="75" cy="100" rx="24" ry="14" fill="none" stroke="white" strokeWidth="4" opacity="0.9"/>
            <circle cx="55" cy="100" r="10" fill="none" stroke="white" strokeWidth="3" opacity="0.9"/>
            <circle cx="95" cy="100" r="10" fill="none" stroke="white" strokeWidth="3" opacity="0.9"/>
            <circle cx="145" cy="32" r="12" fill="white" opacity="0.7"/>
            <path d="M145 46 L145 88" stroke="white" strokeWidth="4" opacity="0.7"/>
            <path d="M128 62 L162 62" stroke="white" strokeWidth="4" opacity="0.7"/>
            <path d="M145 88 L133 110 M145 88 L157 110" stroke="white" strokeWidth="4" opacity="0.7"/>
          </svg>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Features</h2>
        <p className="section-sub">Our smart wheelchair combines cutting-edge technology with user-centric design to provide unparalleled mobility and independence.</p>
        <div className={styles.featGrid}>
          <FeatureCard iconPath={icons.mic}    title="Voice Command"         desc="Control your wheelchair effortlessly using simple voice commands for hands-free operation."/>
          <FeatureCard iconPath={icons.shield} title="Obstacle Detection"    desc="Real-time obstacle detection system safeguards your journey through any environment."/>
          <FeatureCard iconPath={icons.nav2}   title="Autonomous Navigation" desc="Follow GPS efficiently based on AI to generate route to your destination."/>
          <FeatureCard iconPath={icons.bell}   title="Emergency Alerts"      desc="Instant emergency notifications sent to predefined contacts in case of critical situations."/>
        </div>
      </section>

      <section className="section" style={{background:'var(--gray-light)'}}>
        <h2 className="section-title">How It Works</h2>
        <p className="section-sub">SmartChair seamlessly mobilizes with our intelligent wheelchair system designed for your convenience and safety.</p>
        <div className={styles.howGrid}>
          {howItems.map(item => (
            <div key={item.title} className={styles.howItem}>
              <div className={styles.howIcon}><Icon d={item.icon} style={{width:22,height:22,stroke:'var(--blue)'}}/></div>
              <div><h4 className={styles.howTitle}>{item.title}</h4><p className={styles.howDesc}>{item.desc}</p></div>
            </div>
          ))}
        </div>
      </section>

      <div className="cta-band">
        <h2>Ready to Transform Your Mobility?</h2>
        <p>Join thousands of users who have discovered a new level of independence with SmartChair.</p>
        <button className="btn-white" onClick={() => setPage('order')}>Order Now — Rs. 3,50,000</button>
      </div>
      <Footer setPage={setPage}/>
    </>
  );
};
export default Home;
