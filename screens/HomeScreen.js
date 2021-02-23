import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, ScrollView, ImageBackground} from 'react-native';
import FloatingAction from "react-native-floating-action/src/FloatingAction";
import Card from "../components/Card";
import Day from "../components/Day";
import Card2 from "../components/Card2";
export default class Home extends React.Component{
    state = {
        color : '#136DF3',
        activestate : 'rgba(255, 255, 255, 0.291821)'
    };

    change = (navData) => {
        return(
            navData('Mission')
        );
    };
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.containerone}>
                    <View style={styles.boxone}>
                    </View>
                    <View style={styles.boxtwo}>
                        <Text style={styles.name}>Hi, Mahid</Text>
                        <Text style={styles.subtitle}>Here is your health.</Text>
                    </View>
                    <View style={styles.boxthree}>
                        <ImageBackground source={require('../assets/images/graphone.png')} style={{width:400, height:'120%', paddingBottom:80}}/>
                    </View>
                    <View style={styles.boxfour}>
                        <Day dayname='Sun' active={this.state.activestate}/>
                        <Day dayname='Mon'/>
                        <Day dayname='Tue'/>
                        <Day dayname='Wed'/>
                        <Day dayname='Thu'/>
                        <Day dayname='Fri'/>
                        <Day dayname='Sat'/>
                    </View>
                </View>
                <View style={styles.containertwo}>
                    <View style={styles.line}>
                    </View>
                    <ScrollView>
                    <View style={styles.progress}>
                        <Text style={styles.textone}>My Progress</Text>
                    </View>
                    <View style={styles.card1}>
                        <Card
                            move="bounceInLeft"
                            image={require('../assets/images/checkbox.png')}
                            title="Mission"
                            subtitle="85% Completed"
                            completed="85%"
                            screenchange = {()=>this.change()}
                        />
                    </View>
                    <View style={styles.card2}>
                        <Card
                            move="bounceInRight"
                            image={require('../assets/images/checktodo.png')}
                            title="Completed"
                            subtitle="5K out of 10K steps"
                            completed="50%"
                        />
                    </View>
                    <View style={styles.card3}>
                        <Card2/>
                    </View>
                    </ScrollView>
                    <FloatingAction
                        position={"right"}
                        animated={false}
                        showBackground={false}
                        onPressMain={() => console.log('button is pressed')}
                    />
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container : {
        flex : 1,
        display : 'flex',
        backgroundColor : '#ff3333'
    },
    containerone : {
        flex : 1.3,
        display : 'flex'
    },
    containertwo : {
        flex : 1.2,
        backgroundColor : '#fff',
        borderTopRightRadius : 60,
        borderTopLeftRadius : 60,
    },
    boxone : {
        flex : 1,
    },
    boxtwo : {
        flex : 0.8,
        marginHorizontal : 35
    },
    boxthree : {
        flex : 2.5,
    },
    boxfour : {
        flex : 0.5,
        color : '#fff',
        flexDirection : 'row'
    },
    name : {
        fontSize : 38,
        color : '#fff',
        fontWeight : 'bold',
        letterSpacing : -0.5,
    },
    subtitle : {
        fontSize : 20,
        color : '#fff'
    },
    line : {
        width : 66,
        height : 4,
        backgroundColor : '#F4F0F0',
        borderRadius : 2,
        marginVertical : 25,
        left : 150
    },
    progress : {
        left : 50
    },
    textone : {
        fontSize : 20,
        color : '#2D2D2D',
        letterSpacing : -0.5
    },
    card1 : {
        flex : 0.5,
        display : 'flex',
        marginTop : 10,
        marginHorizontal : 30
    },
    card2 : {
        flex : 0.5,
        display : 'flex',
        marginTop : 10,
        marginHorizontal : 30
    },
    card3 : {
        flex : 0.5,
        display : 'flex',
        marginTop : 10,
        marginHorizontal : 10
    },

});
