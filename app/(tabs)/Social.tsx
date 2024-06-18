import React, { useState } from 'react';
import { Link } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Text, useWindowDimensions, Image, TextInput, Button, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useAuth } from '../../context/AuthContext';


const Social = ({ }) => {
    const {logout} = useAuth();

    const handleLogout = async () => {

        await logout();
    }
    return ( 
        <View>
            <Text>Social</Text>
            <Button title = "sign out"  onPress = {handleLogout}></Button>
        </View>
    );
};

export default Social;


const styles = StyleSheet.create({
   
});
