import { View, Text, ActivityIndicator } from 'react-native';
import React, { useEffect } from 'react';
import { Slot, useSegments, useRouter } from "expo-router";
import { AuthContextProvider, useAuth } from '../context/AuthContext'

const MainLayout = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {

    if(typeof isAuthenticated == 'undefined') return;
    const inApp = segments[0] == '(tabs)';

    if(isAuthenticated && !inApp) {
      router.replace('Social');
      //redirect user to home
    } else if(!isAuthenticated) {
      router.replace('Login');
    }
      //redirect to sign in
  }, [isAuthenticated])

  return <Slot />
}

export default function RootLayout() {
  return (
    <AuthContextProvider>
      <MainLayout />
    </AuthContextProvider>



  )
}