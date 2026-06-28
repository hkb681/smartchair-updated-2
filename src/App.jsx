import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Features from './pages/Features';
import Order from './pages/Order';
import Contact from './pages/Contact';
import Login from './pages/Login';
import './index.css';

function App() {
  const [page, setPage] = useState('home');
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setAuthLoading(false);
    });
    return () => unsub();
  }, []);

  if (authLoading) return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100vh',fontFamily:'var(--font-head)',color:'var(--blue)',fontSize:'1.2rem'}}>
      Loading...
    </div>
  );

  const renderPage = () => {
    switch (page) {
      case 'home':     return <Home     setPage={setPage} user={user}/>;
      case 'about':    return <About    setPage={setPage}/>;
      case 'features': return <Features setPage={setPage}/>;
      case 'order':    return <Order    setPage={setPage} user={user}/>;
      case 'contact':  return <Contact  setPage={setPage}/>;
      case 'login':    return <Login    setPage={setPage}/>;
      default:         return <Home     setPage={setPage} user={user}/>;
    }
  };

  return (
    <div>
      {page !== 'login' && <Navbar page={page} setPage={setPage} user={user}/>}
      {renderPage()}
    </div>
  );
}
export default App;
