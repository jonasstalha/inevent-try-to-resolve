import { initializeApp, FirebaseApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, initializeAuth, Auth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// Declare global firebase instance
declare global {
  var firebase: FirebaseApp | undefined;
}

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: Platform.select({
    ios: 'AIzaSyBBXprDeuSsSV0JXOuB5jcvJ8FiD21saKU',
    android: 'AIzaSyC7Mr5CAQPoqAIMLh-IefxsVugqyI8PYXA',
    default: 'AIzaSyBBXprDeuSsSV0JXOuB5jcvJ8FiD21saKU'
  }),
  authDomain: 'inevents-2fe56.firebaseapp.com',
  projectId: 'inevents-2fe56',
  storageBucket: 'inevents-2fe56.firebasestorage.app',
  messagingSenderId: '780609459655',
  appId: Platform.select({
    ios: '1:780609459655:ios:50c21d3293587c707f75e2',
    android: '1:780609459655:android:c4535e1323f166ef7f75e2',
    default: '1:780609459655:ios:50c21d3293587c707f75e2'
  })
};

// Initialize Firebase
const app = !global.firebase ? initializeApp(firebaseConfig) : global.firebase;

// Set the global firebase instance
if (!global.firebase) {
  global.firebase = app;
}

// Initialize Firebase Authentication
const auth = getAuth(app);

// Initialize Firestore
const db = getFirestore(app);

// Export initialized services
export { app, auth, db };
