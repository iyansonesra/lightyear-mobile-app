import React, { useState, useContext, ReactNode } from 'react';
import { Link } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Text, useWindowDimensions, Image, TextInput, Button, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, FlatList, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '../../components/Colors';
import ThemeContext from '../../context/ThemeContext';
import { LineChart } from "react-native-gifted-charts";
import { SelectList } from 'react-native-dropdown-select-list'

const Stats = ({ }) => {
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
        upperSection: {
            height:180,
            borderBottomLeftRadius: 80,
            borderBottomRightRadius: 80,
        },
        horizontalView: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        logo: {
            width: 70,
            height: 70,
            marginTop: "5%",
            marginBottom: "2.5%",
            borderRadius: 60,
            marginRight: '7%',

        },
        innerStats: {
            alignSelf: 'center',
            height: '50%',
            backgroundColor: theme == 'light' ? Colors.light.backgroundColor : Colors.dark.backgroundColor,
            width: '80%',
            borderRadius: 40,
            marginTop: '5%'
        },
        blueBox: {
            height: '45%',
            width: '20%',
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
        },
        dumbells: {
            height: "70%",
            width: "90%",
        },
        chartArea: {
            marginTop: "5%",
            height: '60%',
            width: '100%',
            borderRadius: 40,
            alignSelf: 'center',
            alignItems: 'center',

        }


    });

    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();

    const [selected, setSelected] = React.useState("");

    const ptData = [
        { value: 160, date: '1 Apr 2022' },
        { value: 180, date: '2 Apr 2022' },
        { value: 190, date: '3 Apr 2022' },
        { value: 180, date: '4 Apr 2022' },
        { value: 140, date: '5 Apr 2022' },
        { value: 145, date: '6 Apr 2022' },
        { value: 160, date: '7 Apr 2022' },
        { value: 200, date: '8 Apr 2022' },

        { value: 220, date: '9 Apr 2022' },
        {
            value: 240,
            date: '10 Apr 2022',
            label: '10 Apr',
            labelTextStyle: { color: 'lightgray', width: 60 },
        },
        { value: 280, date: '11 Apr 2022' },
        { value: 260, date: '12 Apr 2022' },
        { value: 340, date: '13 Apr 2022' },
        { value: 385, date: '14 Apr 2022' },
        { value: 280, date: '15 Apr 2022' },
        { value: 390, date: '16 Apr 2022' },

        { value: 370, date: '17 Apr 2022' },
        { value: 285, date: '18 Apr 2022' },
        { value: 295, date: '19 Apr 2022' },
        {
            value: 300,
            date: '20 Apr 2022',
            label: '20 Apr',
            labelTextStyle: { color: 'lightgray', width: 60 },
        },
        { value: 280, date: '21 Apr 2022' },
        { value: 295, date: '22 Apr 2022' },
        { value: 260, date: '23 Apr 2022' },
        { value: 255, date: '24 Apr 2022' },

        { value: 190, date: '25 Apr 2022' },
        { value: 220, date: '26 Apr 2022' },
        { value: 205, date: '27 Apr 2022' },
        { value: 230, date: '28 Apr 2022' },
        { value: 210, date: '29 Apr 2022' },
        {
            value: 200,
            date: '30 Apr 2022',
            label: '30 Apr',
            labelTextStyle: { color: 'lightgray', width: 60 },
        },
        { value: 240, date: '1 May 2022' },
        { value: 250, date: '2 May 2022' },
        { value: 280, date: '3 May 2022' },
        { value: 250, date: '4 May 2022' },
        { value: 210, date: '5 May 2022' },
    ];

    const workoutSelections = [
        { key: '1', value: 'Preacher Curl' },
        { key: '2', value: 'Bench Press' },
        { key: '3', value: 'Pec Fly' },
        { key: '4', value: 'Leg Extension' },
    ]

    return (

            <ScrollView style ={styles.container}>
            <LinearGradient
                style={styles.upperSection}
                colors={["#6ED4FF", "#061121"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}>
                <SafeAreaView>
                    <View style={styles.horizontalView}>
                        <View>
                            <Text style={{ fontFamily: 'Montserrat-italic', fontSize: 15, color: "white", marginLeft: '15%', marginTop: '5%' }}>{month}/{date}/{year}</Text>
                            <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 35, color: "white", marginLeft: '15%' }}>Hello, Iyan</Text>
                        </View>

                        <Image style={styles.logo} source={require('./../../assets/prof-pic.jpg')} />
                    </View>

                    {/* <View style={styles.innerStats}>
                        <View style={{
                            flexDirection: 'row', flex: 1, alignItems: 'center', gap: 30, justifyContent: 'center'
                        }}>
                            <View style={styles.blueBox}>
                                <LinearGradient
                                    style={{
                                        height: "100%", width: "100%", borderRadius: 20, alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                    colors={["#6ED4FF", "#061121"]}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 0, y: 1 }}>
                                    <Image style={styles.dumbells} source={require('./../../assets/dumbells.png')} />
                                </LinearGradient>

                                <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 25, color: theme == 'light' ? Colors.light.textColor : Colors.dark.textColor, }}>150</Text>
                                <Text style={{ fontFamily: 'Montserrat-regular', fontSize: 15, bottom: 3, color: theme == 'light' ? Colors.light.textColor : Colors.dark.textColor, }}>lbs</Text>

                            </View>

                            <View style={styles.blueBox}>
                                <LinearGradient
                                    style={{
                                        height: "100%", width: "100%", borderRadius: 20, alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                    colors={["#6ED4FF", "#061121"]}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 0, y: 1 }}>
                                    <Image style={styles.dumbells} source={require('./../../assets/dumbells.png')} />
                                </LinearGradient>

                                <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 25, color: theme == 'light' ? Colors.light.textColor : Colors.dark.textColor, }}>150</Text>
                                <Text style={{ fontFamily: 'Montserrat-regular', fontSize: 15, bottom: 3, color: theme == 'light' ? Colors.light.textColor : Colors.dark.textColor, }}>lbs</Text>

                            </View>

                            <View style={styles.blueBox}>
                                <LinearGradient
                                    style={{
                                        height: "100%", width: "100%", borderRadius: 20, alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                    colors={["#6ED4FF", "#061121"]}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 0, y: 1 }}>
                                    <Image style={styles.dumbells} source={require('./../../assets/dumbells.png')} />
                                </LinearGradient>

                                <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 25, color: theme == 'light' ? Colors.light.textColor : Colors.dark.textColor, }}>150</Text>
                                <Text style={{ fontFamily: 'Montserrat-regular', fontSize: 15, bottom: 3, color: theme == 'light' ? Colors.light.textColor : Colors.dark.textColor, }}>lbs</Text>
                            </View>
                        </View>
                    </View> */}
                </SafeAreaView>

            </LinearGradient>
            
        
            <View style={styles.chartArea}>
                <Text style={{ fontFamily: 'Montserrat-ExtraBold', fontSize: 30, color: theme == 'light' ? Colors.light.textColor : Colors.dark.textColor, marginBottom: '2%'}}>Progression</Text>
                <SelectList
                    inputStyles={{  color: theme == 'light' ? Colors.light.textColor : Colors.dark.textColor, fontFamily: 'Montserrat-Regular', marginLeft: "2%"}}
                    dropdownTextStyles={{  color: theme == 'light' ? Colors.light.textColor : Colors.dark.textColor, fontFamily: 'Montserrat-Regular'}}
                    dropdownItemStyles={{ justifyContent: 'center', alignItems: 'center' }}
                    dropdownStyles={{ backgroundColor: theme == 'light' ? Colors.light.backgroundColor : Colors.dark.backgroundColor }}
                    boxStyles={{ borderWidth: 0, backgroundColor: 'transparent', borderColor: theme == 'light' ? Colors.light.textColor : Colors.dark.textColor, borderTopWidth: 1, borderLeftWidth: 1, borderRightWidth: 1, borderBottomWidth: 1, borderRadius: 50 }}
                    arrowicon={<Ionicons name="chevron-down-outline" size={15} color={theme == 'light' ? Colors.light.textColor : Colors.dark.textColor} />}
                    search={false}
                    setSelected={(val: React.SetStateAction<string>) => setSelected(val)}
                    data={workoutSelections}
                    save="value"
                    maxHeight={150}
                    dropdownShown={false}
                />

                <View style={{ position: "absolute", top: 60, zIndex: -10, width: "100%", marginTop: "17%", alignSelf: 'center', borderRadius: 70 }}>
                    <LineChart
                        areaChart
                        curved
                        hideAxesAndRules

                        data={ptData}
                        width={500}
                        disableScroll
                        hideDataPoints
                        spacing={10}
                        // Remove the 'hideXAxisLabel' property
                        // hideXAxisLabel={false}
                        showXAxisIndices={false}
                        xAxisLabelsHeight={0}
                        color="#5197B6"
                        thickness={2}
                        startFillColor="#6ED4FF"
                        endFillColor={theme == 'light' ? "white" : "#061121"}
                        startOpacity={0.9}
                        endOpacity={0.2}
                        initialSpacing={0}
                        noOfSections={5}
                        maxValue={400}
                        yAxisColor="white"
                        yAxisThickness={0}
                        rulesType="solid"
                        rulesColor="gray"
                        xAxisLabelTextStyle={{ color: "black" }}
                        yAxisTextStyle={{ color: 'gray' }}
                        pointerConfig={{
                            pointerStripHeight: 160,
                            showPointerStrip: false,
           
                            pointerStripColor: 'lightgray',
                            pointerStripWidth: 2,
                            pointerColor: 'lightgray',
                            radius: 6,
                            pointerLabelWidth: 100,
                            pointerLabelHeight: 90,
                            activatePointersOnLongPress: true,
                            autoAdjustPointerLabelPosition: false,
                            pointerLabelComponent: (items: {
                                date: ReactNode; value: string; 
}[]) => {
                                return (
                                    <View
                                        style={{
                                            height: 130,
                                            width: 100,
                                            justifyContent: 'center',
                                            marginTop: -30,
                                            marginLeft: -40,
                                        }}>
                                        <Text style={{ color: 'white', fontSize: 14, marginBottom: 6, textAlign: 'center' }}>
                                            {items[0].date}
                                        </Text>

                                        <View style={{ paddingHorizontal: 14, paddingVertical: 6, borderRadius: 16, backgroundColor: 'white' }}>
                                            <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>
                                                {'$' + items[0].value + '.0'}
                                            </Text>
                                        </View>
                                    </View>
                                );
                            },
                        }}
                    />
                </View>

            </View>
            </ScrollView>
     

    );
};

export default Stats;



