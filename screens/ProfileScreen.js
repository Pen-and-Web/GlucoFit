import React from 'react'
import {View, Text, Image, Button, StyleSheet} from 'react-native'
import {Card} from 'react-native-paper';
import {TextInput,ScrollView,TouchableOpacity} from 'react-native-gesture-handler'
import Card2 from "../components/Card2";

const ProfileScreen = navData => {
    return(
        <View>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Settings</Text>
            </View>
            <Card style={styles.card}>
                <View style={styles.userLogo}>
                    <Text style={styles.initials}>MT</Text>
                </View>
                <View>
                    <TouchableOpacity>
                        <Text style={styles.user}>Mahid Tariq</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity>
                        <Text style={styles.settings}>Edit Profile Settings</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.settings}>About Us</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.settings}>Help & Support</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.button}>
                    <TouchableOpacity onPress={() => navData.navigation.navigate('Login')}>
                        <Text style={styles.signoutText}>SIGN OUT</Text>
                    </TouchableOpacity>
                </View>
            </Card>
        </View>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    card: {
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2},
        shadowRadius: 8,
        borderRadius: 10,
        backgroundColor: '#ffffff',
        elevation: 5,
        height: 300,
        margin: 10,
        paddingVertical: 40
    },
    titleContainer: {
        padding: 60,
        flex : 1,
        alignItems: 'center',
        backgroundColor: 'blue'
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white'
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
    userLogo: {
        backgroundColor: '#bcbec1',
        alignItems: 'center',
        justifyContent: 'center',
        width: 80,
        height: 80,
        borderRadius: 40,
        alignSelf: 'center',
    },
    initials: {
        color: 'white',
        fontSize: 28,
        alignItems: 'center'
    },
    user: {
        color: 'black',
        fontSize: 35,
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 5
    },
    settings: {
        color: 'blue',
        fontSize: 15,
        padding: 10,
        alignItems: 'center',
        alignSelf: 'center'
    },
    button: {
        width: "100%",
        backgroundColor: "#03A9F4",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
        marginBottom: 10,
        alignSelf: 'center'
    },
    signoutText: {
        color: 'white'
    }
});

/*export default ({navigation}) => (
    <View style={{paddingVertical: 40}}>
        <Card title={"Mahid Tariq"}>
            <View style={{
                backgroundColor: '#bcbec1',
                alignItems: 'center',
                justifyContent: 'center',
                width: 80,
                height: 80,
                borderRadius: 40,
                alignSelf: 'center',
                marginBottom: 'center'
            }}
            >
                <Text style={{color: 'white', fontSize: 28}}>MT</Text>
            </View>
            <Button/>
        </Card>
    </View>
) */
