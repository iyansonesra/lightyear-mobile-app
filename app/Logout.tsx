import React, { useState } from 'react';
import { Link } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Text, useWindowDimensions, Image, TextInput, Button, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';



const Settings = ({ }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topProf}>
        
                <View style={styles.vertText}>
                    <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 40, color: 'black', marginTop: "12%", marginLeft: "15%", }}>Tom S.</Text>
                    <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 20, color: 'grey',  marginLeft: "15%", }}>Free Version</Text>
                </View>
            </View>

            <View style={styles.settingsOptions}>
                <TouchableOpacity style = {styles.optionsComp}>
                        <View style={styles.profText}>
                            <View style={styles.iconBackground}>
                                <Ionicons name="person-outline" size={35} color="black" />
                            </View>
                            <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 25, color: 'black', marginLeft: "5%", marginTop: "1%" }}>Edit Profile</Text>
                        </View>
                        <Ionicons name="chevron-forward-outline" size={35} color="black" />
                </TouchableOpacity>

                <View style={styles.divider}></View>

                <TouchableOpacity style={styles.optionsComp}>
                    <View style={styles.profText}>
                        <View style={styles.iconBackground}>
                            <Ionicons name="settings-outline" size={35} color="black" />
                        </View>
                        <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 25, color: 'black', marginLeft: "5%", marginTop: "1%" }}>Settings</Text>
                    </View>
                    <Ionicons name="chevron-forward-outline" size={35} color="black" />
                </TouchableOpacity>

                <View style={styles.divider}></View>

                <TouchableOpacity style={styles.optionsComp}>
                    <View style={styles.profText}>
                        <View style={styles.iconBackgroundLogOut}>
                            <Ionicons name="log-out-outline" size={35} color="black" />
                        </View>
                        <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 25, color: 'black', marginLeft: "5%", marginTop: "1%" }}>Logout</Text>
                    </View>
                    <Ionicons name="chevron-forward-outline" size={35} color="black" />
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    );
};

export default Settings;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
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
        backgroundColor: "#C0CCFF",
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
        height: .5,
        width: "90%",
        backgroundColor: "black",
        alignSelf: "center",
    },

    profText: {
        flexDirection: "row",
        alignItems: "center",
        height: "80%",
        width: "70%",
    }
});
