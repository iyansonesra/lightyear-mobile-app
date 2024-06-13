import React, { useState } from 'react';
import { Link } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Text, useWindowDimensions, Image, TextInput, Button, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const SignUp = ({ }) => {
    const [hidePassword, setHidePassword] = useState(true);
    const windowWidth = useWindowDimensions().width;
    const windowHeight = useWindowDimensions().height;

    const Colors = {
        primary: '#030303',
        secondary: '#E5E7EB',
        tertiary: '#1F2937',
        darkLight: '#9CA3AF',
        brand: '#6D28D9',
        green: '#10B981',
        red: '#EF4444',
        white: '#E3DFDF'
    };


    return (
        <LinearGradient
            style={styles.container}
            colors={["#000000", "#103565", "#5687A2"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            <SafeAreaView style={{ flex: 1, width: "100%", height: "110%", alignItems: "center", marginTop: 60 }}>
                <KeyboardAvoidingView behavior="padding" style={{ flex: 1, width: "100%", alignItems: "center", }}>

                    <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 45, color: 'white' }}>Sign Up</Text>
                    <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 20, color: 'white' }}>Sign up to continue</Text>

                    <View style={styles.inputSection}>
                        <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 14, color: 'white' }}>Full Name</Text>
                        <TextInput style={styles.input} placeholder='Jane Doe' placeholderTextColor="#9CA3AF" />
                        <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 14, color: 'white' }}>Email</Text>
                        <TextInput style={styles.input} placeholder='janedoe@gmail.com' placeholderTextColor="#9CA3AF" />
                        <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 14, color: 'white' }}>Password</Text>
                        <TextInput style={styles.input} placeholder='* * * * * * * * * * * *' placeholderTextColor="#9CA3AF" secureTextEntry={true} />

                        <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 14, color: 'white' }}>Confirm Password</Text>
                        <TextInput style={styles.input} placeholder='* * * * * * * * * * * *' placeholderTextColor="#9CA3AF" secureTextEntry={true} />
                        <TouchableOpacity>
                            <LinearGradient
                                style={styles.buttonLogin}
                                colors={["#004AAD", "#5271FF"]}
                                start={{ x: 1, y: 0 }}
                                end={{ x: 1, y: 1 }}
                            >

                                <Text style={styles.signInText}>Sign Up</Text>

                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.googleLogin}>
                            <Image style={styles.googleLogo} source={require('./../assets/google.png')} />
                            <Text style={styles.googleSignInText}>Sign up with Google</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.bottomTextContainer}>
                        {/*ADD TEXT ON PRESS NAVIGATION*/}
                        <Text style={{ fontFamily: "Montserrat-Italic", color: "white", }}>Already have an account? <Link to="/Login"><Text style={{ fontFamily: "Montserrat-Bold" }}>| Login</Text></Link></Text>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </LinearGradient>

    );
};

export default SignUp;


const styles = StyleSheet.create({
    googleLogo: {
        width: "12%",
        height: "52%",
        position: 'absolute',
        left: 17,
    },
    googleLogin: {
        backgroundColor: 'white',
        borderRadius: 50,
        height: 70,
        justifyContent: 'center',
        marginBottom: 20,
    },
    buttonLogin: {
        borderRadius: 50,
        height: 70,
        justifyContent: 'center',
        alignContent: 'center',
        color: 'white',
        fontFamily: 'Montserrat-SemiBold',
        marginBottom: 15,
        shadowColor: '#ffffff',
        shadowOffset: { width: 10, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
    },
    signInText: {
        color: 'white',
        alignSelf: 'center',
        fontFamily: 'Montserrat-Regular',
        fontSize: 16,
    },
    googleSignInText: {
        color: 'black',
        alignSelf: 'center',
        fontFamily: 'Montserrat-Regular',
        fontSize: 16,
    },
    inputSection: {
        marginTop: 30,
        width: "80%",
        height: "40%",
    },
    input: {
        height: 60,
        width: "100%",
        marginTop: 6,
        marginBottom: 18,
        borderWidth: 0.5,
        borderColor: 'white',
        borderRadius: 10,
        padding: 10,
        color: 'white',
        fontFamily: 'Montserrat-Regular',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 100,
        height: "15%",
        marginBottom: 10,
    },
    bottomTextContainer: {
        position: 'absolute',
        bottom: 5,
        alignItems: 'center',
    },

});
