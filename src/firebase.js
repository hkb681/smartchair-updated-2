import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDGXMvBndHnByzCM4JCj5T7uXAE8TGUI_8",
  authDomain: "smartchair-app.firebaseapp.com",
  projectId: "smartchair-app",
  storageBucket: "smartchair-app.firebasestorage.app",
  messagingSenderId: "237177907444",
  appId: "1:237177907444:web:be1406409a2fb3dc7956a1",
  measurementId: "G-2NP6890X9R"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;