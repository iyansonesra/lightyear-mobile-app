import React, { useState, useContext } from 'react';
import { Link } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Text, useWindowDimensions, Image, TextInput, Button, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import ThemeContext from '../context/ThemeContext';
import Colors from '../components/Colors';
import { router } from 'expo-router';


const Settings = ({ }) => {


    const { theme, toggleTheme } = useContext(ThemeContext);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme == 'light' ? Colors.light.backgroundColor : Colors.dark.backgroundColor,
        },
        logo: {
            width: 150,
            height: "100%",
            marginTop: "5%",
            marginLeft: "7%",
            borderRadius: 60,

        },
        topProf: {
            flexDirection: "row",
            height: "20%",
        },
        vertText: {
            flexDirection: "column",

        },
        settingsOptions: {
            marginTop: "10%",
            // backgroundColor: 'green',
            height: "80%",
            gap: 10,
        },
        optionsComp: {
            height: "15%",

            marginLeft: "7%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "87%",

            // justifyContent: "flex-start",
        },
        iconBackground: {
            height: "100%",
            width: "27%",
            backgroundColor: theme == 'light' ? Colors.light.iconBackground : Colors.dark.iconBackground,
            borderRadius: 50,
            alignItems: "center",
            justifyContent: "center",

        },
        iconBackgroundLogOut: {
            height: "100%",
            width: "27%",
            backgroundColor: "#C0CCFF",
            borderRadius: 50,
            alignItems: "center",
            justifyContent: "center",
            paddingLeft: 7,
        },
        divider: {
            height: .2,
            width: "90%",
            backgroundColor: theme == 'light' ? Colors.light.textColor : Colors.dark.textColor,
            marginTop: "3%",
            alignSelf: "center",
        },

        profText: {
            flexDirection: "row",
            alignItems: "center",
            height: "80%",
            width: "70%",
        },
        goBack: {
            height: "7%",
            marginLeft: "5%",
            flexDirection: "row",
            alignItems: "center",
        },
        horizontalView: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',

        }
    });

    const handleToggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        toggleTheme(newTheme);
    };


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.goBack}>
                <Pressable onPress ={() => router.back()}>
                    <Ionicons name="arrow-back-outline" size={30} color={theme == 'light' ? Colors.light.textColor : Colors.dark.textColor} />
                </Pressable>
                <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 30, color: theme == 'light' ? Colors.light.textColor : Colors.dark.textColor, marginLeft: "5%", }}>Settings</Text>
            </View>
            <View style={styles.divider}></View>
            <View style={styles.horizontalView}>
                <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 19, color: theme == 'light' ? Colors.light.textColor : Colors.dark.textColor, marginLeft: "5%", marginTop: '2%' }}>Appearance</Text>

                <TouchableOpacity
                    onPress={handleToggleTheme}
                    style={{
                        marginTop: 10,
                        paddingVertical: 7,
                        paddingHorizontal: 10,
                        borderRadius: 50,
                        backgroundColor: theme === 'light' ? '#fff' : '#000',
                        borderColor: theme === 'dark' ? '#fff' : '#000',

                        marginRight: '8%'
                    }}>
                    <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 19, color: theme == 'light' ? Colors.light.textColor : Colors.dark.textColor, }}>
                        {theme === 'dark' ? 'Dark' : 'Light'}
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.divider}></View>


        </SafeAreaView>
    );
};

export default Settings;



