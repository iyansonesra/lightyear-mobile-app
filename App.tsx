import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import { useState } from 'react';
import AppLoading from 'expo-app-loading';

import Login from './app/Login';
import SignUp from './app/SignUp';

const getFonts = () => Font.loadAsync({
  'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
  'Montserrat-Thin': require('./assets/fonts/Montserrat-Thin.ttf'),
  'Montserrat-ExtraBold': require('./assets/fonts/Montserrat-ExtraBold.ttf'),
  'Montserrat-SemiBoldItalic': require('./assets/fonts/Montserrat-SemiBoldItalic.ttf'),
  'Montserrat-SemiBold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
  'Montserrat-Light': require('./assets/fonts/Montserrat-Light.ttf'),
  'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.ttf'),
  'Montserrat-Italic': require('./assets/fonts/Montserrat-Italic.ttf'),

});


export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if(fontsLoaded) {
    return (
    <Login />
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

