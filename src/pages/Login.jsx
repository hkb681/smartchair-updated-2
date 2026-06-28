import { useState } from 'react';

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth';

import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

import { auth, db } from '../firebase';

import Icon, { icons } from '../components/Icon';

import styles from './Login.module.css';


const GoogleIcon = () => (<svg width="16" height="16" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>);

const authErrors = {
  'auth/user-not-found': 'No account found with this email.',
  'auth/wrong-password': 'Incorrect password.',
  'auth/invalid-email': 'Invalid email address.',
  'auth/invalid-credential': 'Invalid email or password.',
  'auth/email-already-in-use': 'An account with this email already exists.',
  'auth/weak-password': 'Password is too weak.',
  'auth/popup-closed-by-user': 'Sign-in was cancelled.',
};

const saveUserProfile = async (uid, profile) => {
  await setDoc(doc(db, 'users', uid), {
    uid,
    ...profile,
    createdAt: serverTimestamp(),
  });
};

const Login = ({ setPage }) => {
  const [tab,setTab]=useState('login');
  const [loginEmail,setLoginEmail]=useState('');const [loginPassword,setLoginPassword]=useState('');const [loginError,setLoginError]=useState('');const [loginLoading,setLoginLoading]=useState(false);
  const [regFirst,setRegFirst]=useState('');const [regLast,setRegLast]=useState('');const [regEmail,setRegEmail]=useState('');const [regPassword,setRegPassword]=useState('');const [regError,setRegError]=useState('');const [regLoading,setRegLoading]=useState(false);const [regSuccess,setRegSuccess]=useState(false);

  const handleLogin = async () => {
    setLoginError('');
    if (!loginEmail || !loginPassword) { setLoginError('Please fill in all fields.'); return; }
    setLoginLoading(true);
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      setPage('home');
    } catch (err) {
      setLoginError(authErrors[err.code] || 'Login failed. Please try again.');
    }
    setLoginLoading(false);
  };

  const handleGoogleAuth = async (setError, setLoading) => {
    setError('');
    setLoading?.(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const { user } = result;
      try {
        await saveUserProfile(user.uid, {
          firstName: user.displayName?.split(' ')[0] || '',
          lastName: user.displayName?.split(' ').slice(1).join(' ') || '',
          email: user.email || '',
        });
      } catch (profileErr) {
        console.warn('Could not save user profile:', profileErr);
      }
      setPage('home');
    } catch (err) {
      setError(authErrors[err.code] || 'Google sign-in failed. Please try again.');
    }
    setLoading?.(false);
  };

  const handleRegister = async () => {
    setRegError('');
    if (!regFirst || !regLast || !regEmail || !regPassword) { setRegError('Please fill in all fields.'); return; }
    if (regPassword.length < 6) { setRegError('Password must be at least 6 characters.'); return; }
    setRegLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, regEmail, regPassword);
      try {
        await saveUserProfile(cred.user.uid, {
          firstName: regFirst,
          lastName: regLast,
          email: regEmail,
        });
      } catch (profileErr) {
        console.warn('Could not save user profile:', profileErr);
      }
      setRegSuccess(true);
      setTimeout(() => setPage('home'), 1500);
    } catch (err) {
      setRegError(authErrors[err.code] || 'Registration failed. Please try again.');
    }
    setRegLoading(false);
  };

  return (
    <div className={styles.page}>
      <div className={styles.left}>
        <div className={styles.brand}><div className={styles.brandIcon}>S</div><span>SmartChair</span></div>
        <h2>Welcome to the Future of Mobility</h2>
        <p>Join our community and experience the next generation of smart wheelchair technology</p>
      </div>
      <div className={styles.right}>
        <div className={styles.card}>
          <div className={styles.tabToggle}>
            <button className={`${styles.tab} ${tab==='login'?styles.activeTab:''}`} onClick={()=>setTab('login')}>Login</button>
            <button className={`${styles.tab} ${tab==='register'?styles.activeTab:''}`} onClick={()=>setTab('register')}>Register</button>
          </div>
          {tab==='login'?(
            <>
              <h3 className={styles.cardTitle}>Welcome Back</h3>
              <p className={styles.cardSub}>Enter your credentials to access your account</p>
              <div className="form-group"><label>Email Address</label><div className={styles.inputWrap}><Icon d={icons.mail} style={{position:'absolute',left:12,top:'50%',transform:'translateY(-50%)',width:16,height:16,stroke:'#94A3B8'}}/><input className="form-control" style={{paddingLeft:38}} type="email" placeholder="your.email@example.com" value={loginEmail} onChange={e=>setLoginEmail(e.target.value)}/></div></div>
              <div className="form-group"><label>Password</label><div className={styles.inputWrap}><Icon d={icons.lock} style={{position:'absolute',left:12,top:'50%',transform:'translateY(-50%)',width:16,height:16,stroke:'#94A3B8'}}/><input className="form-control" style={{paddingLeft:38}} type="password" placeholder="••••••••" value={loginPassword} onChange={e=>setLoginPassword(e.target.value)} onKeyDown={e=>e.key==='Enter'&&handleLogin()}/></div></div>
              <div className={styles.forgotRow}><label className={styles.rememberLabel}><input type="checkbox" style={{accentColor:'var(--blue)'}}/> Remember me</label><button className={styles.forgotLink}>Forgot password?</button></div>
              {loginError&&<p className={styles.errorMsg}>⚠️ {loginError}</p>}
              <button className="btn-primary" style={{width:'100%',padding:'13px',marginBottom:16}} onClick={handleLogin} disabled={loginLoading}>{loginLoading?'Logging in...':'Login'}</button>
              <div className={styles.orDivider}><span>Or continue with</span></div>
              <div className={styles.socialRow} style={{justifyContent:'center'}}>
                <button className={styles.socialBtn} onClick={() => handleGoogleAuth(setLoginError, setLoginLoading)} style={{maxWidth:200}}>
                  <GoogleIcon /> Google
                </button>
              </div>
              <button className={styles.backLink} onClick={()=>setPage('home')}><Icon d={icons.arrowLeft} style={{width:14,height:14,stroke:'var(--blue)'}}/> Back to Home</button>
            </>
          ):(
            <>
              <h3 className={styles.cardTitle}>Create Account</h3>
              <p className={styles.cardSub}>Join SmartChair and experience the future</p>
              {regSuccess?(
                <div className={styles.successBox}><div style={{fontSize:'2rem',marginBottom:8}}>🎉</div><h4>Account Created!</h4><p>Redirecting...</p></div>
              ):(
                <>
                  <div className="form-2col"><div className="form-group"><label>First Name</label><input className="form-control" placeholder="John" value={regFirst} onChange={e=>setRegFirst(e.target.value)}/></div><div className="form-group"><label>Last Name</label><input className="form-control" placeholder="Doe" value={regLast} onChange={e=>setRegLast(e.target.value)}/></div></div>
                  <div className="form-group"><label>Email Address</label><div className={styles.inputWrap}><Icon d={icons.mail} style={{position:'absolute',left:12,top:'50%',transform:'translateY(-50%)',width:16,height:16,stroke:'#94A3B8'}}/><input className="form-control" style={{paddingLeft:38}} type="email" placeholder="your.email@example.com" value={regEmail} onChange={e=>setRegEmail(e.target.value)}/></div></div>
                  <div className="form-group"><label>Password</label><div className={styles.inputWrap}><Icon d={icons.lock} style={{position:'absolute',left:12,top:'50%',transform:'translateY(-50%)',width:16,height:16,stroke:'#94A3B8'}}/><input className="form-control" style={{paddingLeft:38}} type="password" placeholder="Min. 6 characters" value={regPassword} onChange={e=>setRegPassword(e.target.value)} onKeyDown={e=>e.key==='Enter'&&handleRegister()}/></div></div>
                  {regError&&<p className={styles.errorMsg}>⚠️ {regError}</p>}
                  <button className="btn-primary" style={{width:'100%',padding:'13px',marginBottom:16}} onClick={handleRegister} disabled={regLoading}>{regLoading?'Creating Account...':'Create Account'}</button>
                  <div className={styles.orDivider}><span>Or continue with</span></div>
                  <div className={styles.socialRow} style={{justifyContent:'center',marginBottom:16}}>
                    <button className={styles.socialBtn} onClick={() => handleGoogleAuth(setRegError, setRegLoading)} style={{maxWidth:200}}>
                      <GoogleIcon /> Google
                    </button>
                  </div>
                  <button className={styles.backLink} onClick={()=>setPage('home')}><Icon d={icons.arrowLeft} style={{width:14,height:14,stroke:'var(--blue)'}}/> Back to Home</button>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default Login;
