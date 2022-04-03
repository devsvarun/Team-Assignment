import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyBCFQaNT9eyCISYXuCvgr9H2GOYCLLcWYc",
  authDomain: "assignment-d209b.firebaseapp.com",
  projectId: "assignment-d209b",
  storageBucket: "assignment-d209b.appspot.com",
  messagingSenderId: "557913700380",
  appId: "1:557913700380:web:f954633ea2319161bf47d9",
  measurementId: "G-N2SMPRTM3N"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
