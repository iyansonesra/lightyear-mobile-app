import { View, Text, ActivityIndicator } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { Slot, useSegments, useRouter } from "expo-router";
import * as Font from 'expo-font';
import { AuthContextProvider, useAuth } from '../context/AuthContext.js'
import ThemeContext from '../context/ThemeContext.js';
import { ThemeProvider } from '../context/ThemeContext.js';


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
  const { isAuthenticated, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    if (typeof isAuthenticated == 'undefined') return;
    const inApp = segments[0] == '(tabs)';

    if (isAuthenticated && !inApp) {
      router.push('(tabs)');
      //redirect user to home
    } else if (!isAuthenticated) {
      router.push('Login');
    }
    //redirect to sign in
  }, [isAuthenticated])

  return <Slot />;
}

export default function RootLayout() {
  return (
    <AuthContextProvider>
      <ThemeProvider>
        <MainLayout />
      </ThemeProvider>
    </AuthContextProvider>



  )
}