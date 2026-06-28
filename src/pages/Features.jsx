import Footer from '../components/Footer';
import FeatureCard from '../components/FeatureCard';
import Icon, { icons } from '../components/Icon';
import styles from './Features.module.css';

const core = [
  { icon: icons.mic,    title: 'Voice Command',         desc: 'Control your wheelchair effortlessly using simple voice commands.' },
  {icon: icons.shield, title: 'Obstacle Detection',    desc: 'Real-time obstacle detection system safeguards your journey.' },
  { icon: icons.nav2,   title: 'Autonomous Navigation', desc: 'Follow GPS efficiently based on AI to generate route to your destination.' },
  { icon: icons.bell,   title: 'Emergency Alerts',      desc: 'Instant emergency notifications sent to predefined contacts.' },
];
const adv = [
  { icon: icons.battery, title: 'Long Battery Life',      desc: 'Up to 20 miles on a single charge with smart power management.' },
  { icon: icons.phone,   title: 'Mobile App Control',       desc: 'Control and monitor your SmartChair from your smartphone.' },
  { icon: icons.map,     title: 'GPS Tracking',             desc: 'Real-time GPS tracking allows caregivers to monitor location.' },
  { icon: icons.users,   title: 'Multiple User Profiles',   desc: 'Store custom settings for different users.' },
  { icon: icons.clock,   title: 'Scheduled Maintenance',    desc: 'Automatic maintenance reminders and diagnostics.' },
  { icon: icons.cloud,   title: 'Weather Resistant',        desc: 'IPX4 water resistance rating for safe operation in rain.' },
];
const safety = [
  { icon: icons.shield, title: 'Anti-Tip Technology', desc: 'Sensors detect tipping risk and automatically adjust stability.' },
  { icon: icons.bell,   title: 'Fall Detection',      desc: 'Automatic fall detection with immediate alerts to contacts.' },
  { icon: icons.zap,    title: 'Automatic Braking',   desc: 'Smart braking engages automatically on obstacles or inclines.' },
];

const Features = ({ setPage }) => (
  <>
    <div className="page-hero"><h1>Features</h1><p>Discover the innovative features that make SmartChair the most advanced AI-powered wheelchair on the market</p></div>
    <section className="section">
      <h2 className="section-title">Core Features</h2>
      <p className="section-sub">Four integrated capabilities that work together — in order — from your first command to emergency response</p>
      <div className={styles.coreFlow}>
        {core.map((f, i) => (
          <div key={f.title} className={styles.coreStep}>
            <FeatureCard iconPath={f.icon} title={f.title} desc={f.desc} />
            {i < core.length - 1 && <span className={styles.stepArrow} aria-hidden="true">→</span>}
          </div>
        ))}
      </div>
    </section>
    <section className="section" style={{background:'var(--gray-light)'}}>
      <h2 className="section-title">Advanced Features</h2>
      <p className="section-sub">Premium capabilities that set SmartChair apart from traditional wheelchairs</p>
      <div className={styles.advGrid}>{adv.map(f=><FeatureCard key={f.title} iconPath={f.icon} title={f.title} desc={f.desc}/>)}</div>
    </section>
    <section className="section">
      <h2 className="section-title">Safety Features</h2>
      <p className="section-sub">Your safety is our top priority with multiple layers of protection</p>
      <div className={styles.safetyGrid}>
        {safety.map(f => (
          <div key={f.title} className={styles.safetyItem}>
            <div className={styles.safetyIcon}><Icon d={f.icon} style={{width:20,height:20,stroke:'var(--blue)'}}/></div>
            <div><h4 className={styles.safetyTitle}>{f.title}</h4><p className={styles.safetyDesc}>{f.desc}</p></div>
          </div>
        ))}
      </div>
    </section>
    <Footer setPage={setPage}/>
  </>
);
export default Features;
