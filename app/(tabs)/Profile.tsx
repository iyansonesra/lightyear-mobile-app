
import React, { useState, useContext, useEffect, useRef } from 'react';
import { Link } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Text, useWindowDimensions, Image, TextInput, Button, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import ThemeContext from '../../context/ThemeContext';
import Colors from '../../components/Colors';
import { collection, query, where, getDocs, doc } from "firebase/firestore";
import {db, usersRef} from "../../FirebaseConfig";
import { useAuth } from '../../context/AuthContext';
import { Animated } from 'react-native';




const Profile = ({ }) => {

    const [displayMode, setDisplayMode] = useState('system');
    const slideAnimation = useRef(new Animated.Value(0)).current;
    const {user} = useAuth();
    const [name, setName] = useState<string>('');
    const [LastName, setLastName] = useState<string>('');
    // const name = query(collection(db, "AUT0AwmWdIWXPn0e0c1U84OzZLN2"), where('userId', '==', user?.uid));

    useEffect(() => {
        if(user?.uid)
            getUsers();
    }, []);
    const getUsers = async () => {
    const name = query(usersRef, where('userId', '==', user?.uid));

    const querySnapshort = await getDocs(name);
    let data: { [x: string]: any; }[] = [];
    querySnapshort.forEach(doc => {
        data.push({...doc.data()});
    });

    setName(data[0].firstName);
    setLastName(data[0].lastName);

    }

    const {logout: logoutUser} = useAuth();

    const handleLogoutUser = async () => {

        await logout();
    }


    const { theme, toggleTheme } = useContext(ThemeContext);

    useEffect(() => {
        Animated.spring(slideAnimation, {
            toValue: displayMode === 'system' ? 0 : displayMode === 'light' ? 1 : 2,
            useNativeDriver: true,
            friction: 8,
            tension: 40
        }).start();
    }, [displayMode]);

    const ModeSelector = () => {
        const modes = ['System', 'Light', 'Dark'];

        const handleModeChange = (mode) => {
            const newMode = mode.toLowerCase();
            setDisplayMode(newMode);

            if (newMode !== 'system') {
                toggleTheme(newMode);
            } else {
                // Here you would typically check the system theme and set accordingly
                // For now, let's default to 'light' when 'System' is selected
                toggleTheme('light');
            }
        };

        const translateX = slideAnimation.interpolate({
            inputRange: [0, 1, 2],
            outputRange: [5, 115, 230]
        });

        return (
            <View style={styles.modeSelector}>
                <Animated.View
                    style={[
                        styles.selectedModeIndicator,
                        {
                            transform: [{ translateX }]
                        }
                    ]}
                />
                {modes.map((mode) => (
                    <TouchableOpacity
                        key={mode}
                        style={styles.modeOption}
                        onPress={() => handleModeChange(mode)}
                    >
                        <Text style={[
                            styles.modeOptionText,
                            {
                                color: displayMode === mode.toLowerCase() ?
                                    (theme === 'light' ? Colors.light.textColor : Colors.dark.textColor) :
                                    (theme === 'dark' ? Colors.light.textColor : Colors.light.textColor)
                            }
                        ]}>
                            {mode}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        );
    };


    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme == 'light' ? Colors.light.backgroundColor : Colors.dark.backgroundColor,
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

            display: "flex",
            alignItems: "flex-start",
            marginTop: 30,
            marginBottom: 30,
            justifyContent: "center",
            gap: 20
        },
        vertText: {
            flexDirection: "column",

        },
        settingsOptions: {

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
            backgroundColor: theme == 'light' ? Colors.light.iconBackground : Colors.dark.iconBackground,
            borderRadius: 50,
            alignItems: "center",
            justifyContent: "center",
            paddingLeft: 7,
        },
        divider: {
            height: .5,
            width: "90%",
            backgroundColor: theme == 'light' ? Colors.light.textColor : Colors.dark.textColor,
            opacity: .2,
            alignSelf: "center",
        },

        profText: {
            flexDirection: "row",
            alignItems: "center",
            height: "80%",
            width: "70%",
        },
        profileCircle: {
            height: 50,
            width: 50,
            backgroundColor: theme == 'light' ? Colors.light.iconBackground : Colors.dark.iconBackground,
            borderRadius: 50,

            alignItems: "center",
            justifyContent: "center",
        },
        modeSelector: {
            flexDirection: 'row',
            backgroundColor: theme === 'light' ? Colors.light.iconBackground : Colors.dark.iconBackground,
            borderRadius: 20,
            padding: 4,
            marginHorizontal: 20,
            marginBottom: 20,

        },
        modeOption: {
            flex: 1,
            paddingVertical: 8,
            alignItems: 'center',
        },
        modeOptionText: {
            fontFamily: 'Montserrat-SemiBold',
            color: theme === 'light' ? Colors.light.textColor : Colors.dark.textColor,
        },
        selectedModeIndicator: {
            position: 'absolute',
            top: 4,
            bottom: 4,
            width: '33%',
            backgroundColor: theme === 'light' ? Colors.light.backgroundColor : Colors.dark.backgroundColor,
            borderRadius: 16,
        },
        portfolioDetails: {
            height: 400,

        },
        pinSection: {
            height: 90
            ,

        }
    });

    const { logout } = useAuth();

    const handleLogout = async () => {

        await logout();
    }


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topProf}>
                <View style={styles.profileCircle}>
                    <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 25, color: theme == 'dark' ? Colors.light.textColor : Colors.dark.textColor, }}>S</Text>

                </View>
                <View style={styles.vertText}>
                    <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 25, color: theme == 'light' ? Colors.light.textColor : Colors.dark.textColor, marginLeft: "10%", }}>Iyan Sonesra</Text>

                    <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 13, color: 'grey', marginLeft: "10%", marginTop: 2 }}>iyansonesra@gmail.com</Text>

                </View>
                <Ionicons name="ellipsis-horizontal" size={20} color={theme == 'light' ? Colors.light.textColor : Colors.dark.textColor} />

            </View>

            <View style={styles.settingsOptions}>
                {/* <View style={styles.divider}></View> */}

                <View style={styles.pinSection}>
                    <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 20, color: theme == 'light' ? Colors.light.textColor : Colors.dark.textColor, marginLeft: "7%",  marginTop: 10, }}>Your Pin</Text>

                    <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 25, color: theme == 'light' ? Colors.light.textColor : Colors.dark.textColor, marginLeft: "7%", marginBottom: 0, marginTop: 10,  }}>0000-0001</Text>

                </View>
                <View style={styles.divider}></View>

                <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 20, color: theme == 'light' ? Colors.light.textColor : Colors.dark.textColor, marginLeft: "7%", marginBottom: 10, marginTop: 10, }}><Text style={{ fontSize: 15, alignSelf: "center", marginBottom: 10, }}></Text> Theme</Text>

                <ModeSelector />

                <View style={styles.divider}></View>



                <View style={styles.portfolioDetails}>
                    {/* <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 20, color: theme == 'light' ? Colors.light.textColor : Colors.dark.textColor, marginLeft: "7%", marginBottom: 10, marginTop: 10 }}>Financial Portfolio</Text> */}
                    <TouchableOpacity style={styles.optionsComp} onPress = {handleLogout}>
                    <View style={styles.profText}>
                        {/* <View style={styles.iconBackgroundLogOut}>
                            <Ionicons name="log-out-outline" size={35} color="black" />
                        </View> */}
                        <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 20, color: "#FF5555", marginLeft: "3%", marginTop: "1%" }}>Logout</Text>
                    </View>
                    <Ionicons name="log-out-outline" size={30} color="#FF5555" />
                                    </TouchableOpacity>
                </View>

                {/* <View style={styles.divider}></View> */}
            </View>
        </SafeAreaView>
    );
};

export default Profile;

