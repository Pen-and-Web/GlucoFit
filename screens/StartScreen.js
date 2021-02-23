import React from 'react'
import {View, Text, Image, Button, StyleSheet} from 'react-native'
import {TextInput,ScrollView,TouchableOpacity} from 'react-native-gesture-handler'
import navData from "@react-navigation/core/src/SceneView";

function StartScreen() {
    return (
        <View style={styles.container}>
            <Text>Start Screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default StartScreen;
