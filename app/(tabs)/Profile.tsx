
import React, { useState, useContext, useEffect, useRef } from 'react';
import { Link } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Text, useWindowDimensions, Image, TextInput, Button, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import ThemeContext from '../../context/ThemeContext';
import Colors from '../../components/Colors';
import { collection, query, where, getDocs, doc, setDoc, getDoc } from "firebase/firestore";
import { db, usersRef } from "../../FirebaseConfig";
import { useAuth } from '../../context/AuthContext';
import { Animated } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL, getStorage, uploadBytesResumable, deleteObject } from "firebase/storage";
import { storage } from "../../FirebaseConfig";
import AnimatedPlaceholder from '../../components/AnimatedPlaceholder';
import * as ImageManipulator from 'expo-image-manipulator';







const Profile = ({ }) => {

    const [displayMode, setDisplayMode] = useState('system');
    const slideAnimation = useRef(new Animated.Value(0)).current;
    const { user } = useAuth();
    const [name, setName] = useState<string>('');
    const [LastName, setLastName] = useState<string>('');
    const [userPin, setUserPin] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const ProfilePicturePlaceholder = () => (
        <AnimatedPlaceholder width={50} height={50} style={{ borderRadius: 25 }} />
      );
    
      const TextPlaceholder = ({ width }) => (
        <AnimatedPlaceholder width={width} height={20} style={{ marginBottom: 5 }} />
      );

      const pickImage = async () => {
        try {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1, // Use full quality here, we'll compress later
          });
      
          console.log("ImagePicker result:", result);  // Log the result for debugging
      
          if (!result.canceled) {
            // The selected image URI is now directly on the result object
            const imageUri = result.uri || result.assets?.[0]?.uri;
            
            if (!imageUri) {
              throw new Error("No image URI found in the result");
            }
      
            // Resize and compress the image
            const manipulatedImage = await ImageManipulator.manipulateAsync(
              imageUri,
              [{ resize: { width: 500, height: 500 } }], // Resize to 500x500
              { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG } // Compress to 70% quality
            );
      
            // Get the current user data
            const userDoc = await getDoc(doc(db, "users", user.uid));
            const userData = userDoc.data();
      
            // If there's a previous image, delete it
            if (userData && userData.profilePictureRef) {
              const oldImageRef = ref(getStorage(), userData.profilePictureRef);
              await deleteObject(oldImageRef).catch(error => {
                console.log("Error deleting old image:", error);
              });
            }
      
            // Convert image to blob
            const response = await fetch(manipulatedImage.uri);
            const blob = await response.blob();
      
            // Upload new image
            const fileRef = ref(getStorage(), `profilePictures/${user.uid}_${Date.now()}.jpg`);
            const uploadResult = await uploadBytesResumable(fileRef, blob);
      
            // We're done with the blob, close and release it
            blob.close();
      
            const uploadUrl = await getDownloadURL(fileRef);
      
            // Update user document with new image URL and reference
            await setDoc(doc(db, "users", user.uid), { 
              profilePicture: uploadUrl,
              profilePictureRef: fileRef.fullPath
            }, { merge: true });
      
            setProfilePicture(uploadUrl);
          } else {
            console.log("Image picking was canceled");
          }
        } catch (e) {
          console.error("Error in pickImage: ", e);
          if (e.message) {
            console.error("Error message: ", e.message);
          }
          if (e.stack) {
            console.error("Error stack: ", e.stack);
          }
          alert("An error occurred while picking or uploading the image.");
        }
      };
    const uploadImageAsync = async (uri) => {
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (e) {
                reject(new TypeError('Network request failed'));
            };
            xhr.responseType = 'blob';
            xhr.open('GET', uri, true);
            xhr.send(null);
        });

        const fileRef = ref(getStorage(), `profilePictures/${Date.now()}.png`);
        const result = await uploadBytesResumable(fileRef, blob);

        // We're done with the blob, close and release it
        blob.close();

        return await getDownloadURL(fileRef);
    }
    useEffect(() => {
        if (user?.uid)
            getUsers();
    }, []);

    const getUsers = async () => {
        setIsLoading(true);
        const userQuery = query(usersRef, where('userId', '==', user?.uid));

        const querySnapshot = await getDocs(userQuery);
        let data = [];
        querySnapshot.forEach(doc => {
            data.push({ ...doc.data() });
        });

        if (data.length > 0) {
            setName(data[0].firstName);
            setLastName(data[0].lastName);
            setUserPin(data[0].PIN);
            setProfilePicture(data[0].profilePicture);
        }
        setIsLoading(false);
    }

    const { logout: logoutUser } = useAuth();

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

        },
        profileImage: {
            width: 50,
            height: 50,
            borderRadius: 25,
        },
    });

    const { logout } = useAuth();

    const handleLogout = async () => {

        await logout();
    }


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topProf}>
                <TouchableOpacity onPress={pickImage}>
                    {isLoading ? (
                        <ProfilePicturePlaceholder />
                    ) : profilePicture ? (
                        <Image
                            source={{ uri: profilePicture }}
                            style={styles.profileImage}
                        />
                    ) : (
                        <View style={styles.profileCircle}>
                            <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 25, color: theme == 'dark' ? Colors.light.textColor : Colors.dark.textColor, }}>
                                {name ? name[0].toUpperCase() : 'U'}
                            </Text>
                        </View>
                    )}
                </TouchableOpacity>
                <View style={styles.vertText}>
                    {isLoading ? (
                        <>
                            <TextPlaceholder width={150} />
                            <TextPlaceholder width={200} />
                        </>
                    ) : (
                        <>
                            <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 25, color: theme == 'light' ? Colors.light.textColor : Colors.dark.textColor, marginLeft: "10%", }}>{name + " " + LastName}</Text>
                            <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 13, color: 'grey', marginLeft: "10%", marginTop: 2 }}>iyansonesra@gmail.com</Text>
                        </>
                    )}
                </View>
                <Ionicons name="ellipsis-horizontal" size={20} color={theme == 'light' ? Colors.light.textColor : Colors.dark.textColor} />
            </View>

            <View style={styles.settingsOptions}>
                {/* <View style={styles.divider}></View> */}

                <View style={styles.pinSection}>
                    <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 20, color: theme == 'light' ? Colors.light.textColor : Colors.dark.textColor, marginLeft: "7%", marginTop: 10, }}>Your Pin</Text>

                    {isLoading ? (
                        <View style={{ marginLeft: "7%", marginTop: 10, }}>
                            <TextPlaceholder width={100} />
                        </View>
                    ) : (
                        <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 25, color: theme == 'light' ? Colors.light.textColor : Colors.dark.textColor, marginLeft: "7%", marginBottom: 0, marginTop: 10, }}>
                            {userPin ? userPin.slice(0, 4) + '-' + userPin.slice(4) : 'Loading...'}
                        </Text>
                    )}
                </View>
                <View style={styles.divider}></View>

                <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 20, color: theme == 'light' ? Colors.light.textColor : Colors.dark.textColor, marginLeft: "7%", marginBottom: 10, marginTop: 10, }}><Text style={{ fontSize: 15, alignSelf: "center", marginBottom: 10, }}></Text> Theme</Text>

                <ModeSelector />

                <View style={styles.divider}></View>



                <View style={styles.portfolioDetails}>
                    <TouchableOpacity style={styles.optionsComp} onPress={handleLogout}>
                        <View style={styles.profText}>

                            <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 20, color: "#FF5555", marginLeft: "3%", marginTop: "1%" }}>Logout</Text>
                        </View>
                        <Ionicons name="log-out-outline" size={30} color="#FF5555" />
                    </TouchableOpacity>
                </View>

            </View>
        </SafeAreaView>
    );
};

export default Profile;

