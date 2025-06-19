import { registerRootComponent } from 'expo';
import { useEffect } from 'react';
import RootLayout from './app/_layout';
import { app, auth } from './src/firebase/firebaseConfig';

// Ensure Firebase is initialized
if (!app || !auth) {
  console.error('Firebase initialization failed');
}

registerRootComponent(RootLayout);
