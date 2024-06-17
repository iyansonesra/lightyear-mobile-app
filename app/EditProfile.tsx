import React, { useState, useContext } from 'react';
import { Link } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Text, useWindowDimensions, Image, TextInput, Button, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import ThemeContext from '../context/ThemeContext';
import Colors from '../components/Colors';



const Settings = ({ }) => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    const handleToggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        toggleTheme(newTheme);
      };

      const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme == 'light' ? Colors.light.backgroundColor : Colors.dark.backgroundColor,
            // alignItems: 'center',
            // justifyContent: 'center',
        },
        innner: {
            flex: 1,
    
        },
        logo: {
            width: 150,
            height: 125,
            marginTop: "5%",
            marginBottom: "2.5%",
            borderRadius: 60,
    
        },
        topProf: {
            height: "30%",
            alignItems: "center",
        },
        vertText: {
            flexDirection: "column",
    
        },
        goBack: {
            height: "7%",
            marginLeft: "5%",
            flexDirection: "row",
            alignItems: "center",
        },

        input: {
            height: 70,
            width: "90%",
            marginTop: 6,
            marginBottom: 18,
            marginLeft: "5%",
            backgroundColor: theme == 'light' ? Colors.light.textInput : Colors.dark.textInput,
            borderRadius: 50,
            padding: 20,
            fontFamily: 'Montserrat-Regular',
            fontSize: 18,
    
        },
          divider: {
            height: .5,
            width: "90%",
            backgroundColor: theme == 'light' ? Colors.light.textColor : Colors.dark.textColor,
            alignSelf: "center",
        },
    
    });
    

    const keyboardVerticalOffset = Platform.OS === 'ios' ? 200 : 0
    return (
        <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={keyboardVerticalOffset} style={styles.container}>
            <SafeAreaView style={styles.innner} >
                <View style={styles.goBack}>
                    <Ionicons name="arrow-back-outline" size={30} color={theme == 'light' ? Colors.light.textColor : Colors.dark.textColor} />
                    <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 30, color: theme == 'light' ? Colors.light.textColor : Colors.dark.textColor, marginLeft: "5%", }}>Edit Profile</Text>
                </View>
                <View style={styles.topProf}>
                    <Image style={styles.logo} source={require('./../assets/prof-pic.jpg')} />
                    <Ionicons name="create-outline" size={30} color={theme == 'light' ? Colors.light.textColor : Colors.dark.textColor} />
                </View>
                <View style={styles.divider}></View>

                <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 17, color: theme == 'light' ? Colors.light.textColor : Colors.dark.textColor, marginLeft: "7%", marginBottom: "2%"}}>First Name</Text>
                <TextInput style={styles.input} placeholder='Iyan' placeholderTextColor="#9CA3AF"/>

                <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 17, color: theme == 'light' ? Colors.light.textColor : Colors.dark.textColor, marginLeft: "7%", marginBottom: "2%"}}>Last Name</Text>
                <TextInput style={styles.input} placeholder='Sonesra' placeholderTextColor="#9CA3AF" />

                <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 17, color: theme == 'light' ? Colors.light.textColor : Colors.dark.textColor, marginLeft: "7%", marginBottom: "2%"}}>Bio</Text>
                <TextInput style={styles.input} placeholder='ut 27' placeholderTextColor="#9CA3AF" />


            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};

export default Settings;



