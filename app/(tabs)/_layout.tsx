import { View, Text } from 'react-native';
import React from 'react';
import { Stack, Tabs } from 'expo-router';
import * as Font from 'expo-font';
import { useState } from 'react';
import AppLoading from 'expo-app-loading';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';


const getFonts = () => Font.loadAsync({
  'Montserrat-Bold': require('./../../assets/fonts/Montserrat-Bold.ttf'),
  'Montserrat-Thin': require('./../../assets/fonts/Montserrat-Thin.ttf'),
  'Montserrat-ExtraBold': require('./../../assets/fonts/Montserrat-ExtraBold.ttf'),
  'Montserrat-SemiBoldItalic': require('./../../assets/fonts/Montserrat-SemiBoldItalic.ttf'),
  'Montserrat-SemiBold': require('./../../assets/fonts/Montserrat-SemiBold.ttf'),
  'Montserrat-Light': require('./../../assets/fonts/Montserrat-Light.ttf'),
  'Montserrat-Regular': require('./../../assets/fonts/Montserrat-Regular.ttf'),
  'Montserrat-Italic': require('./../../assets/fonts/Montserrat-Italic.ttf'),

});


const TabLayout = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (fontsLoaded) {
    return (
      <Tabs>
         <Tabs.Screen name="Social" options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => <Ionicons size={28} name='heart-outline' color={focused ? '#5271FF' : 'black'}/>,
          tabBarShowLabel: false,
          tabBarStyle: {
            height: 90,
            borderWidth: 0,
            borderRadius: 50,
            backgroundColor: 'white',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5, // For Android
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
        <Tabs.Screen name="Stats" options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => <Ionicons size={28} name='stats-chart-outline' color={focused ? '#5271FF' : 'black'}/>,
          tabBarShowLabel: false,
          tabBarStyle: {
            height: 90,
            borderWidth: 0,
            borderRadius: 50,
            backgroundColor: 'white',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5, // For Android
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
          tabBarIcon: ({ color, focused }) => <Ionicons size={28} name='person-outline' color={focused ? '#5271FF' : 'black'}/>,
          tabBarShowLabel: false,
          tabBarStyle: {
            height: 90,
            borderWidth: 0,
            borderRadius: 50,
            backgroundColor: 'white',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5, // For Android
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
      </Tabs>
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

export default TabLayout;