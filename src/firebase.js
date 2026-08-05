import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Replace this with your actual Firebase config
// You can get this from the Firebase Console -> Project Settings -> General -> Your apps
const firebaseConfig = {
  // ⚠️ IMPORTANT: You MUST get the API Key and App ID from your Firebase Console!
  apiKey: "689e9970953e0436bce430f224314a2b3a89bc3f",
  authDomain: "italianpizzakawkab.firebaseapp.com",
  projectId: "italianpizzakawkab",
  storageBucket: "italianpizzakawkab.appspot.com",
  messagingSenderId: "431695001757",
  appId: "1:431695001757:web:415283f9c5903919a617aa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);
