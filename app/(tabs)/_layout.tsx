// 

import { View, Text } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { Stack, Tabs } from 'expo-router';
import * as Font from 'expo-font';
import { useFonts } from 'expo-font';
import { useState, useCallback } from 'react';
import AppLoading from 'expo-app-loading';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import ThemeContext from '../../context/ThemeContext';
import Colors from '../../components/Colors';
import * as SplashScreen from 'expo-splash-screen';



const TabLayout = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [appIsReady, setAppIsReady] = useState(false);

  const [fontsLoaded, fontError] = useFonts({
    'Montserrat-Bold': require('./../../assets/fonts/Montserrat-Bold.ttf'),
    'Montserrat-Thin': require('./../../assets/fonts/Montserrat-Thin.ttf'),
    'Montserrat-ExtraBold': require('./../../assets/fonts/Montserrat-ExtraBold.ttf'),
    'Montserrat-SemiBoldItalic': require('./../../assets/fonts/Montserrat-SemiBoldItalic.ttf'),
    'Montserrat-SemiBold': require('./../../assets/fonts/Montserrat-SemiBold.ttf'),
    'Montserrat-Light': require('./../../assets/fonts/Montserrat-Light.ttf'),
    'Montserrat-Regular': require('./../../assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Italic': require('./../../assets/fonts/Montserrat-Italic.ttf'),
  });

  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();
        // Any other initialization tasks can go here
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady && (fontsLoaded || fontError)) {
      // This tells the splash screen to hide immediately
      await SplashScreen.hideAsync();
    }
  }, [appIsReady, fontsLoaded, fontError]);

  if (!appIsReady || (!fontsLoaded && !fontError)) {
    return null;
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme === 'light' ? Colors.light.backgroundColor : Colors.dark.backgroundColor }}>
        <Tabs initialRouteName='Social'>
    
          <Tabs.Screen name="Social" options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => <Ionicons size={28} name='heart-outline' color={focused ? '#5271FF' : theme == 'light' ? 'black' : 'white'} />,
            tabBarShowLabel: false,
            tabBarStyle: {
              height: 90,
              borderWidth: 0,
              borderRadius: 50,
              backgroundColor: theme == 'light' ? Colors.light.backgroundColor : Colors.dark.backgroundColor,
              shadowColor: theme == 'light' ? Colors.light.textColor : Colors.dark.textColor,
              borderTopColor: "transparent",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 5,
              // elevation: 5, // For Android
            },
            tabBarLabelStyle: {
              fontFamily: 'Montserrat-Regular',
              color: 'black',
              fontSize: 12,
              fontWeight: "bold",
              marginBottom: 0,
            },
            tabBarIconStyle: {
              marginTop: 15,
            },
          }} />
          <Tabs.Screen name="index" options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => <Ionicons size={28} name='stats-chart-outline' color={focused ? '#5271FF' : theme == 'light' ? 'black' : 'white'} />,
            tabBarShowLabel: false,
            tabBarStyle: {
              height: 90,
              borderWidth: 0,
              borderRadius: 50,
              backgroundColor: theme == 'light' ? Colors.light.backgroundColor : Colors.dark.backgroundColor,
              shadowColor: theme == 'light' ? Colors.light.textColor : Colors.dark.textColor,
              borderTopColor: "transparent",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 5,
              // elevation: 5, // For Android
            },
            tabBarLabelStyle: {
              fontFamily: 'Montserrat-Regular',
              color: 'black',
              fontSize: 12,
              fontWeight: "bold",
              marginBottom: 0,
            },
            tabBarIconStyle: {
              marginTop: 15,
            },
          }} />
          <Tabs.Screen name="Profile" options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => <Ionicons size={28} name='person-outline' color={focused ? '#5271FF' : theme == 'light' ? 'black' : 'white'} />,
            tabBarShowLabel: false,
            tabBarStyle: {
              height: 90,
              borderWidth: 0,
              borderRadius: 50,
              backgroundColor: theme == 'light' ? Colors.light.backgroundColor : Colors.dark.backgroundColor,
              shadowColor: theme == 'light' ? Colors.light.textColor : Colors.dark.textColor,
              borderTopColor: "transparent",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 5,
              // elevation: 5, // For Android
            },
            tabBarLabelStyle: {

            },
            tabBarIconStyle: {
              marginTop: 15,
            },
          }} />

        </Tabs>
    </View>
  );

}



export default TabLayout;