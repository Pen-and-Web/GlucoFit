import React from "react";
import { View, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import * as Animatable from "react-native-animatable";
export default class Card extends React.Component {
  render() {
    return (
      <Animatable.View
        animation={this.props.move}
        duration={1500}
        style={{
          flex: 1,
          marginBottom: 15,
          display: "flex",
          flexDirection: "row",
          backgroundColor: this.props.Background,
          borderRadius: 10,
        }}
      >
        <TouchableOpacity
          style={styles.box1}
          onSubmit={this.props.screenchange}
        >
          <View
            style={{
              borderRadius: 21,
              backgroundColor: "rgba(255, 190, 134, 0.2);",
              height: "100%",
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image source={this.props.image} />
          </View>
        </TouchableOpacity>
        <View style={styles.box2}>
          <Text style={{ fontSize: 20, color: "#2D2D2D", letterSpacing: -0.9 }}>
            {this.props.title}
          </Text>
          <Text
            style={{
              fontSize: 15,
              color: "grey",
              letterSpacing: -0.5,
              paddingVertical: 5,
            }}
          >
            {this.props.subtitle}
          </Text>
        </View>
        <View style={styles.box3}>
          <View
            style={{
              borderWidth: 1,
              borderColor: this.props.BorderColor,
              alignItems: "center",
              justifyContent: "center",
              width: 80,
              height: 80,
              borderRadius: 40,
              alignSelf: "center",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "#136DF3",
                textAlign: "center",
              }}
            >
              {this.props.completed}
            </Text>
          </View>
        </View>
      </Animatable.View>
    );
  }
}
const styles = StyleSheet.create({
  cardone: {
    flex: 1,
    marginBottom: 15,
    display: "flex",
    flexDirection: "row",
  },
  cardtwo: {
    flex: 1,
  },
  box1: {
    flex: 1.1,
    paddingHorizontal: 10,
  },
  box2: {
    flex: 1.1,
    paddingHorizontal: 10,
  },
  box3: {
    flex: 1,
  },
});
