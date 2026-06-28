import Icon from './Icon';
import styles from './FeatureCard.module.css';
const FeatureCard = ({ iconPath, title, desc }) => (
  <div className={styles.card}>
    <div className={styles.icon}><Icon d={iconPath} style={{width:24,height:24,stroke:'var(--blue)'}}/></div>
    <h3 className={styles.title}>{title}</h3>
    <p className={styles.desc}>{desc}</p>
  </div>
);
export default FeatureCard;
