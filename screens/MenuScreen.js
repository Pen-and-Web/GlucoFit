import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import Card from "../components/Card";
import Card2 from "../components/Card2";
import Card3 from "../components/Card3";
import { TextInput, ScrollView } from "react-native-gesture-handler";
import { Header } from "@react-navigation/stack";
import FloatingAction from "react-native-floating-action/src/FloatingAction";

const MenuScreen = () => {
  return (
    <View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Menu</Text>
      </View>
      <ScrollView style={{ paddingBottom: "50%" }}>
        <View style={styles.card3}>
          <Card3 />
        </View>
        <View>
          <FloatingAction
            position={"right"}
            onPressMain={() => console.log("button is pressed")}
          />
        </View>

        <View style={styles.card3}>
          <Card2 />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    borderRadius: 10,
    backgroundColor: "#ffffff",
    elevation: 5,
    height: 300,
    margin: 10,
    paddingVertical: 40,
  },
  titleContainer: {
    padding: 50,
    //flex: 1,
    alignItems: "center",
    backgroundColor: "green",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
  imageContainer: {
    width: "100%",
    height: "65%",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  price: {
    fontSize: 30,
    color: "#fff",
    margin: 10,
  },
  date: {
    margin: 10,
    backgroundColor: "#2652B0",
    height: 25,
    width: 120,
    borderRadius: 5,
  },
  dateText: {
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
  },
  description: {
    margin: 10,
    backgroundColor: "blue",
  },
  descriptionText: {
    fontSize: 16,
    color: "gray",
  },
  card3: {
    flex: 0.5,
    display: "flex",
    marginTop: 10,
    marginHorizontal: 10,
  },
});

export default MenuScreen;
