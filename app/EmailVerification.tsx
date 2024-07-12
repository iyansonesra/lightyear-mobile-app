import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../context/AuthContext';
import { sendEmailVerification } from 'firebase/auth';
import { useRouter, Link } from 'expo-router';

export default function EmailVerification() {
    const { user, emailVerified, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (emailVerified) {
            // Navigate to tabs if email is verified
            router.replace('/(tabs)');
        }
    }, [emailVerified]);

    const resendVerificationEmail = async () => {
        try {
            await sendEmailVerification(user);
            Alert.alert('Verification email sent', 'Please check your inbox');
        } catch (error) {
            Alert.alert('Error', 'Failed to send verification email');
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            router.replace('/Login');
        } catch (error) {
            Alert.alert('Error', 'Failed to log out');
        }
    };

    return (
        <LinearGradient
            style={styles.container}
            colors={["#000000", "#103565", "#5687A2"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            <View style={styles.content}>
                <Text style={styles.title}>Verify Your Email</Text>
                <Text style={styles.description}>
                    We've sent a verification email to your address. Please check your inbox and click the verification link.
                </Text>
                <TouchableOpacity style={styles.resendButton} onPress={resendVerificationEmail}>
                    <Text style={styles.resendButtonText}>Resend Verification Email</Text>
                </TouchableOpacity>

                <View style={styles.linkContainer}>
                    <Text style={styles.loginText}>Want to use a different account? </Text>
                    <TouchableOpacity onPress={handleLogout}>
                        <Text style={styles.linkText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 24,
        color: 'white',
        marginBottom: 20,
    },
    description: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
        marginBottom: 30,
    },
    resendButton: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 25,
    },
    resendButtonText: {
        fontFamily: 'Montserrat-SemiBold',
        color: '#103565',
        fontSize: 16,
    },
    loginText: {
        fontFamily: "Montserrat-Italic",
        color: "white"
    },

    linkContainer: {
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'center',
    },
   
    linkText: {
        fontFamily: "Montserrat-Bold",
        color: "white",
        textDecorationLine: 'underline',
    },
});