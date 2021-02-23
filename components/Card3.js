import React from 'react';
import {StyleSheet, View, Text, Image, ImageBackground, TouchableOpacity} from 'react-native';

function Card3() {
    return(
        <View style={styles.card}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Daily Step Count</Text>
            </View>
            <View style={styles.imageContainer}>
                <ImageBackground source={require('../assets/images/running.jpg')} style={styles.image}>
                    <Text style={styles.statistics}>10140 steps</Text>
                    <View style={styles.date}>
                        <Text style={styles.dateText}>15/01/2021</Text>
                    </View>
                </ImageBackground>
            </View>
            <View style={styles.description}>
                <Text style={styles.descriptionText}>You have reached your goal of 10k steps!</Text>
            </View>
        </View>
    );
}

export default Card3;

const styles = StyleSheet.create({
    card: {
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2},
        shadowRadius: 8,
        borderRadius: 10,
        borderStyle: 'solid',
        backgroundColor: '#F0FFF0',
        elevation: 5,
        height: 300,
        margin: 10
    },
    titleContainer: {
        height: '15%',
        padding: 10
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'gray'
    },
    imageContainer: {
        width: '100%',
        height: '65%',
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
    statistics: {
        fontSize: 30,
        color: '#fff',
        margin: 10
    },
    date: {
        margin: 10,
        backgroundColor: '#2652B0',
        height: 25,
        width: 120,
        borderRadius: 5
    },
    dateText: {
        fontSize: 20,
        color: '#fff',
        textAlign: 'center'
    },
    description: {
        margin: 10
    },
    descriptionText: {
        fontSize: 16,
        color: 'gray'
    }
});
