import React, { useRef, useState } from 'react';
import { Link } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Text, useWindowDimensions, Image, TextInput, Button, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, Animated, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set } from "firebase/database";
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext.js';

const database = getDatabase();


const Login = ({ }) => {
    const [hidePassword, setHidePassword] = useState(true);
    const windowWidth = useWindowDimensions().width;
    const windowHeight = useWindowDimensions().height;
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const router = useRouter();
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const {login} = useAuth();

    const handleLogin = async () => {
        if(!emailRef.current || !passwordRef.current) {
            Alert.alert('Please fill all fields');
            return;
        }

        const response = await login(emailRef.current, passwordRef.current);
        console.log('sing in response: ', response);
        if(!response.success) {
            Alert.alert("Sign In Failed", response.msg);
            return;
        }
        
    }

   

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
            <SafeAreaView style={{ flex: 1, width: "100%", alignItems: "center", marginTop: 100 }}>
                <KeyboardAvoidingView behavior="padding" style={{ flex: 1, width: "100%", alignItems: "center", }}>
                    <Image style={styles.logo} source={require('./../assets/lightyear-logo.png')} />
                    <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 45, color: 'white' }}>Login</Text>
                    <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 20, color: 'white' }}>Sign in to continue</Text>

                    <View style={styles.inputSection}>
                        <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 14, color: 'white' }}>Email</Text>
                        <TextInput style={styles.input} placeholder='Email' onChangeText={value=>emailRef.current=value} placeholderTextColor="#9CA3AF" />
                        <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 14, color: 'white' }}>Password</Text>
                        <TextInput style={styles.input} placeholder='Password' onChangeText={value=>passwordRef.current=value} placeholderTextColor="#9CA3AF" secureTextEntry={true} />

                        <TouchableOpacity onPress={handleLogin}>
                            <LinearGradient
                                style={styles.buttonLogin}
                                colors={["#004AAD", "#5271FF"]}
                                start={{ x: 1, y: 0 }}
                                end={{ x: 1, y: 1 }}
                            >

                                <Text style={styles.signInText}>Sign In</Text>

                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.googleLogin} >
                            <Image style={styles.googleLogo} source={require('./../assets/google.png')} />
                            <Text style={styles.googleSignInText}>Sign in with Google</Text>
                        </TouchableOpacity>
                    </View>


                    <View style={styles.bottomTextContainer}>
                        {/*ADD TEXT ON PRESS NAVIGATION*/}

                        <Text style={{ fontFamily: "Montserrat-Italic", color: "white", }}>Don't have an account? <Link to="/SignUp"><Text style={{ fontFamily: "Montserrat-Bold" }}>| Sign Up</Text></Link></Text>

                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </LinearGradient>

    );
};

export default Login;


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
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
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
        marginTop: 40,
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
