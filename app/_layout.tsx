import { View, Text } from 'react-native';
import React from 'react';
import { Stack, Tabs } from 'expo-router';
import * as Font from 'expo-font';
import { useState } from 'react';
import AppLoading from 'expo-app-loading';
import { ThemeProvider } from './../context/ThemeContext.js';

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
const StackLayout = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (fontsLoaded) {
    return (
      <ThemeProvider>
        <Stack>
          
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="EditProfile" options={{ headerShown: false }} />
          <Stack.Screen name="Settings" options={{ headerShown: false }} />
          <Stack.Screen name="Logout" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    );
  } else {
    return (
      <AppLoading
        startAsync={getFonts}
        onFinish={() => setFontsLoaded(true)}
        onError={(err) => console.log(err)}
      />
    )
  }
}

export default StackLayout;