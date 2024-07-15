import React, { useRef, useState } from 'react';
import { Link } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Text, useWindowDimensions, Image, TextInput, Button, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, FlatList, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set } from "firebase/database";
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'expo-router';

const database = getDatabase();

const db = getFirestore();


export default function SignUp() {
    const [hidePassword, setHidePassword] = useState(true);
    const windowWidth = useWindowDimensions().width;
    const windowHeight = useWindowDimensions().height;
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const router = useRouter();

    const emailRef = useRef("");
    const passwordRef = useRef("");
    const firstNameRef = useRef("");
    const lastNameRef = useRef("");
    const { register } = useAuth();


    const handleRegister = async () => {
        if (!emailRef.current || !passwordRef.current || !firstNameRef.current || !lastNameRef.current) {
            Alert.alert('sign up', 'please fill all the fields!');
            return;
        }

        let response = await register(emailRef.current, passwordRef.current, firstNameRef.current, lastNameRef.current);

        console.log('got result', response);
        if (!response.success) {
            Alert.alert('sign up did not work', response.msg)
        }
    }

    const handleLogin = () => {
        router.replace('/Login');
    };

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
        <View
            style={styles.container}
        >
             <Image  source={require('./../assets/new-background.jpg')}  style = {{position: "absolute", }}/>
            <SafeAreaView style={{ flex: 1, width: "100%", height: "110%", alignItems: "center", marginTop: 60 }}>
                <KeyboardAvoidingView behavior="padding" style={{ flex: 1, width: "100%", alignItems: "center", }}>

                    <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 45, color: 'black' }}>Sign Up</Text>

                    <View style={styles.inputSection}>
                        <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 14, color: 'black' }}>First Name</Text>
                        <TextInput style={styles.input} placeholder='Jane' onChangeText={value => firstNameRef.current = value} placeholderTextColor="#9CA3AF" />
                        <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 14, color: 'black' }}>Last Name</Text>
                        <TextInput style={styles.input} placeholder='Doe' onChangeText={value => lastNameRef.current = value} placeholderTextColor="#9CA3AF" />
                        <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 14, color: 'black' }}>Email</Text>
                        <TextInput style={styles.input} placeholder='Email' onChangeText={value => emailRef.current = value} placeholderTextColor="#9CA3AF" />
                        <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 14, color: 'black' }}>Password</Text>
                        <TextInput style={styles.input} placeholder='Password' onChangeText={value => passwordRef.current = value} placeholderTextColor="#9CA3AF" secureTextEntry={true} />

                        <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 14, color: 'black' }}>Confirm Password</Text>
                        <TextInput style={styles.input} placeholder='Password' value={password} onChangeText={(text) => setPassword(text)} placeholderTextColor="#9CA3AF" secureTextEntry={true} />
                        <TouchableOpacity onPress={handleRegister}>
                            <LinearGradient
                                style={styles.buttonLogin}
                                colors={["#fff", "#000"]}
                                start={{ x: 2, y: 0 }}
                                end={{ x: 0, y: 1 }}
                            >

                                <Text style={styles.signInText}>Sign Up</Text>

                            </LinearGradient>
                        </TouchableOpacity>

                        <View style={styles.bottomTextContainer}>
                            {/*ADD TEXT ON PRESS NAVIGATION*/}
                            <TouchableOpacity onPress={handleLogin}>
                                <Text style={{ fontFamily: "Montserrat-Italic", color: "black", }}>Already have an account? <Text style={{ fontFamily: "Montserrat-Bold" }}>| Login</Text></Text>
                            </TouchableOpacity>
                        </View>
                    </View>


                </KeyboardAvoidingView>
            </SafeAreaView>


        </View>

    );
}


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
        color: 'black',
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
        borderColor: 'black',
        borderRadius: 10,
        padding: 10,
        color: 'black',
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
        alignSelf: 'center',
        justifyContent: 'center',
    },

});
