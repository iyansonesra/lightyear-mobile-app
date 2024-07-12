import { View, Text, ActivityIndicator } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { Slot, useSegments, useRouter } from "expo-router";
import * as Font from 'expo-font';
import { AuthContextProvider, useAuth } from '../context/AuthContext.js'
import ThemeContext from '../context/ThemeContext.js';
import { ThemeProvider } from '../context/ThemeContext.js';
import LoadingOverlay from '../components/LoadingOverlay';


const getFonts = () => Font.loadAsync({
  'Montserrat-Bold': require('./../assets/fonts/Montserrat-Bold.ttf'),
  'Montserrat-Thin': require('./../assets/fonts/Montserrat-Thin.ttf'),
  'Montserrat-ExtraBold': require('./../assets/fonts/Montserrat-ExtraBold.ttf'),
  'Montserrat-SemiBoldItalic': require('./../assets/fonts/Montserrat-SemiBoldItalic.ttf'),
  'Montserrat-SemiBold': require('./../assets/fonts/Montserrat-SemiBold.ttf'),
  'Montserrat-Light': require('./../assets/fonts/Montserrat-Light.ttf'),
  'Montserrat-Regular': require('./../assets/fonts/Montserrat-Regular.ttf'),
  'Montserrat-Italic': require('./../assets/fonts/Montserrat-Italic.ttf'),

});

const MainLayout = () => {
  const { isAuthenticated, isLoading, emailVerified, user } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    if (isLoading) return;

    const inApp = segments[0] === '(tabs)';
    const inAuth = segments[0] === '(auth)';
    const inEmailVerification = segments[0] === 'EmailVerification';

    const navigate = async (route) => {
      setIsNavigating(true);
      await router.replace(route);
      setTimeout(() => setIsNavigating(false), 500); // Delay to ensure the overlay is visible
    };

    if (isAuthenticated && user) {
      if (!emailVerified && !inEmailVerification) {
        navigate('/EmailVerification');
      } else if (emailVerified && !inApp) {
        navigate('/(tabs)');
      }
    } else if (!isAuthenticated && !inAuth && !inEmailVerification) {
      navigate('/SignUp');
    }
  }, [isAuthenticated, emailVerified, user, isLoading, segments]);

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <View style={{ flex: 1 }}>
      <Slot />
      {isNavigating && <LoadingOverlay />}
    </View>
  );
};

export default function RootLayout() {
  return (
    <AuthContextProvider>
      <ThemeProvider>
        <MainLayout />
      </ThemeProvider>
    </AuthContextProvider>
  );
}