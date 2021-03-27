import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from "react-native";
import { connect, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-community/async-storage";
import * as authAction from "../redux/actions/authAction";
import moment from "moment";

function Card2() {
  const dispatch = useDispatch();
  const [calories, setCalories] = useState();

  const loadData = async () => {
    try {
      let token = await AsyncStorage.getItem("token");

      if (token !== null && token !== undefined) {
        //setToken(token);
        // this.setState({
        //   token: token,
        // });
        console.log("Card2: ", token);
        await caloriesBurnt(token);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const caloriesBurnt = async (token) => {
    //console.log("token in sub", token);
    dispatch(authAction.caloriesBurnt(token))
      .then(async (response) => {
        console.log("Response Calories: ", response);
        if (response !== null) {
          setCalories(response.calories.todays_calories_burned);
        } else {
          setCalories(0);
          //Alert.alert("Response Failed. Try Again");
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadData();
  }, []);
  return (
    <View style={styles.card}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Calories Burnt Today</Text>
      </View>
      <View style={styles.imageContainer}>
        <ImageBackground
          source={require("../assets/images/calories.jpg")}
          style={styles.image}
        >
          <Text style={styles.statistics}>{calories} Kcal</Text>
          <View style={styles.date}>
            <Text style={styles.dateText}>{moment().format("h:mm:ss a")}</Text>
          </View>
        </ImageBackground>
      </View>
      {/* <View style={styles.description}>
        <Text style={styles.descriptionText}>Your heartbeat is moderate.</Text>
      </View> */}
    </View>
  );
}

export default Card2;

const styles = StyleSheet.create({
  card: {
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    borderRadius: 10,
    borderStyle: "solid",
    backgroundColor: "#F0FFF0",
    elevation: 5,
    height: 300,
    margin: 10,
  },
  titleContainer: {
    //height: "15%",
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "gray",
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
  statistics: {
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
  },
  descriptionText: {
    fontSize: 16,
    color: "gray",
  },
});
