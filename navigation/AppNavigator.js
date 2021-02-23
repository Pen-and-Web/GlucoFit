import React from 'react';
import {Text, View, Image, StyleSheet} from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MaterialIcons} from '@expo/vector-icons';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import MenuScreen from "../screens/MenuScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Home() {
    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarIcon: () => {
                    let iconName;
                    if(route.name==="Main") {
                        iconName = "home";
                    }
                    else if(route.name==="Menu") {
                        iconName = "menu";
                    }
                    else {
                        iconName = "settings";
                    }
                    return <MaterialIcons name={iconName} size={24} color="black" />
                }
            })}
        >
                <Tab.Screen name="Main" component={HomeScreen}/>
                <Tab.Screen name="Menu" component={MenuScreen}/>
                <Tab.Screen name="Profile" component={ProfileScreen}/>
        </Tab.Navigator>
    );
}

function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator>

                <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
                <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown: true}}/>
                <Stack.Screen name="Home" component={Home} options={{headerShown:false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigator;

const styles = StyleSheet.create({
   container: {
       flex: 1,
       justifyContent: 'center',
       alignItems: 'center'
   }
});
