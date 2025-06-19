// app/_layout.tsx
import { useEffect } from 'react';
import { View } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import { SplashScreen } from 'expo-router';
import { app } from '@/src/firebase/firebaseConfig';
import { AuthProvider } from '@/src/context/AuthContext';
import { AppProvider } from '@/src/context/AppContext';
import { ArtistStoreProvider } from '@/src/components/artist/ArtistStore';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-Medium': Inter_500Medium,
    'Inter-SemiBold': Inter_600SemiBold,
    'Inter-Bold': Inter_700Bold,
  });

  useEffect(() => {
    const initializeApp = async () => {
      try {
        if (fontsLoaded) {
          if (app) {
            console.log('Firebase initialized successfully');
          }
          await SplashScreen.hideAsync();
        }
      } catch (e) {
        console.warn('Error initializing app:', e);
      }
    };

    initializeApp();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AuthProvider>
      <AppProvider>
        <ArtistStoreProvider>
          <View style={{ flex: 1 }}>
            <StatusBar style="dark" />
            <Stack
              screenOptions={{
                headerShown: false,
              }}
            />
          </View>
        </ArtistStoreProvider>
      </AppProvider>
    </AuthProvider>
  );

  useEffect(() => {
    if (ready) {
      SplashScreen.hideAsync();
    }
  }, [ready]);

  if (!fontsLoaded || !ready) {
    return null;
  }

  return (
    <AuthProvider>
      <AppProvider>
        <ArtistStoreProvider>
          <StatusBar style="auto" />
          <Stack>
            <Stack.Screen name="(client)" options={{ headerShown: false }} />
            <Stack.Screen name="(admin)" options={{ headerShown: false }} />
            <Stack.Screen name="(artist)" options={{ headerShown: false }} />
            <Stack.Screen name="auth" options={{ headerShown: false }} />
          </Stack>
        </ArtistStoreProvider>
      </AppProvider>
    </AuthProvider>
  );
}
