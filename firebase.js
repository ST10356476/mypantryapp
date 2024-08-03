import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA-kjJJvMJAO4Rs5nIlUFqPQoXygDfigVg",
    authDomain: "pantry-management-2dc42.firebaseapp.com",
    projectId: "pantry-management-2dc42",
    storageBucket: "pantry-management-2dc42.appspot.com",
    messagingSenderId: "950220092736",
    appId: "1:950220092736:web:000544e6178c748b76f6a5",
};

// Initialize Firebase only if not already initialized
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null; // Ensure this runs only on the client-side

export { auth, db, analytics };
