import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import Footer from '../components/Footer';
import Icon, { icons } from '../components/Icon';
import styles from './Contact.module.css';
const Contact = ({ setPage }) => {
  const [name,setName]=useState('');const [email,setEmail]=useState('');const [message,setMessage]=useState('');const [sent,setSent]=useState(false);const [loading,setLoading]=useState(false);
  const handleSend = async () => {
    if(!name||!email||!message){alert('Please fill all fields.');return;}
    setLoading(true);
    try{await addDoc(collection(db,'messages'),{name,email,message,status:'unread',createdAt:serverTimestamp()});setSent(true);}
    catch(e){alert('Failed to send. Try again.');}
    setLoading(false);
  };
  return (
    <>
      <div className="page-hero"><h1>Contact Us</h1><p>Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p></div>
      <section className="section">
        <div className={styles.layout}>
          <div>
            <h2 className={styles.getInTouch}>Get in Touch</h2>
            <p className={styles.subText}>Whether you're interested in our smart wheelchair technology, need support, or want to learn more, we're here to help.</p>
            {[{icon:icons.mail,title:'Email',lines:['info@smartchair.pk','support@smartchair.pk']},{icon:icons.phoneCall,title:'Phone',lines:['+92322-8666298','Mon-Fri, 9AM - 6PM PKT']},{icon:icons.pin,title:'Address',lines:['4 L VALENCIA TOWN','Lahore, Pakistan']}].map(item=>(
              <div key={item.title} className={styles.infoItem}>
                <div className={styles.infoIcon}><Icon d={item.icon} style={{width:20,height:20,stroke:'var(--blue)'}}/></div>
                <div><h4 className={styles.infoTitle}>{item.title}</h4>{item.lines.map(l=><p key={l} className={styles.infoLine}>{l}</p>)}</div>
              </div>
            ))}
            <div className={styles.mapBox}><Icon d={icons.pin} style={{width:40,height:40,stroke:'var(--blue)',display:'block',margin:'0 auto 10px'}}/><p style={{fontWeight:600,marginBottom:4}}>4 L VALENCIA TOWN</p><p style={{color:'var(--gray)',fontSize:'0.85rem'}}>LAHORE, Pakistan</p></div>
          </div>
          <div className={styles.formCard}>
            <h3 className={styles.formTitle}>Send us a Message</h3>
            {sent?(
              <div className={styles.successMsg}><div style={{fontSize:'2.5rem',marginBottom:12}}>✅</div><h4>Message Sent!</h4><p>We'll get back to you within 24 hours.</p></div>
            ):(
              <>
                <div className="form-group"><label>Name</label><input className="form-control" placeholder="Your name" value={name} onChange={e=>setName(e.target.value)}/></div>
                <div className="form-group"><label>Email</label><input className="form-control" type="email" placeholder="your.email@example.com" value={email} onChange={e=>setEmail(e.target.value)}/></div>
                <div className="form-group"><label>Message</label><textarea className="form-control" placeholder="How can we help you?" value={message} onChange={e=>setMessage(e.target.value)}/></div>
                <button className="btn-primary" style={{width:'100%',padding:'12px',display:'flex',alignItems:'center',justifyContent:'center',gap:8}} onClick={handleSend} disabled={loading}>
                  <Icon d={icons.send} style={{width:16,height:16,stroke:'white'}}/>{loading?'Sending...':'Send Message'}
                </button>
              </>
            )}
          </div>
        </div>
        <div style={{marginTop:60}}>
          <h2 className="section-title">Office Hours</h2>
          <div className={styles.officeGrid}>
            {[{label:'Weekdays',sub:'Monday - Friday',hours:'9AM - 6PM'},{label:'Saturday',sub:'Weekend Support',hours:'10AM - 4PM'},{label:'Sunday',sub:'Emergency Only',hours:'On Call'}].map(o=>(
              <div key={o.label} className={styles.officeCard}><h4 className={styles.officeLabel}>{o.label}</h4><p className={styles.officeSub}>{o.sub}</p><p className={styles.officeHours}>{o.hours}</p></div>
            ))}
          </div>
        </div>
      </section>
      <Footer setPage={setPage}/>
    </>
  );
};
export default Contact;
