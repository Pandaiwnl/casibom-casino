// ✅ src/firebase/config.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// 🔧 Firebase yapılandırması
const firebaseConfig = {
  apiKey: "AIzaSyAV8EVRuC3iFYNsKLzFLbrlCeIOFFXF7PE",
  authDomain: "casibom-casino.firebaseapp.com",
  projectId: "casibom-casino",
  storageBucket: "casibom-casino.appspot.com", // 🔥 düzeltildi
  messagingSenderId: "45689263661",
  appId: "1:45689263661:web:75cd79ab1b29a69b6b4aa4",
  measurementId: "G-K1Y5RJSNWE"
};

// 🚀 Firebase başlat
const app = initializeApp(firebaseConfig);

// 🔐 Authentication (kullanıcı girişi / kaydı)
export const auth = getAuth(app);

// 💾 Firestore (veritabanı)
export const db = getFirestore(app);

export default app;
