import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyD_RxX7fziOBjz-odWZSQ1p2JI9oimd-NY",
  authDomain: "social-media-app-71e69.firebaseapp.com",
  projectId: "social-media-app-71e69",
  storageBucket: "social-media-app-71e69.appspot.com",
  messagingSenderId: "792664700221",
  appId: "1:792664700221:web:ade63f8167b3de847b8154"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
