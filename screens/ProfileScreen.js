import React, { useEffect, useState } from "react";
import { View, Text, Image, Button, StyleSheet, Alert } from "react-native";
import { Card } from "react-native-paper";
import {
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import Card2 from "../components/Card2";
import AsyncStorage from "@react-native-community/async-storage";

const ProfileScreen = (navData) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [acronym, setAcronym] = useState("");

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem("email");
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("id");
      await AsyncStorage.removeItem("name");
      navData.navigation.navigate("Login");
    } catch (err) {
      alert(err);
    }
  };

  const loadData = async () => {
    try {
      let name = await AsyncStorage.getItem("name");
      let email = await AsyncStorage.getItem("email");
      if (name !== null) {
        setName(name);
        let matches = name.match(/\b(\w)/g);
        setAcronym(matches.join(""));
      }
      if (email !== null) {
        setEmail(email);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);
  return (
    <View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Settings</Text>
      </View>
      <Card style={styles.card}>
        <View style={styles.userLogo}>
          <Text style={styles.initials}>{acronym}</Text>
        </View>
        <View>
          <TouchableOpacity>
            <Text style={styles.user}>{name}</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => navData.navigation.navigate("EditDetails")}
          >
            <Text style={styles.settings}>Edit User Details</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.settings}>About Us</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.settings}>Help & Support</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.button}>
          <TouchableOpacity onPress={signOut}>
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
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    borderRadius: 10,
    backgroundColor: "#ffffff",
    elevation: 5,
    height: 300,
    margin: 10,
    paddingVertical: "1%",
  },
  titleContainer: {
    paddingVertical: 50,
    //flex: 1,
    alignItems: "center",
    backgroundColor: "blue",
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
  userLogo: {
    backgroundColor: "#bcbec1",
    alignItems: "center",
    justifyContent: "center",
    width: 80,
    height: 80,
    borderRadius: 40,
    alignSelf: "center",
  },
  initials: {
    color: "white",
    fontSize: 28,
    alignItems: "center",
  },
  user: {
    color: "black",
    fontSize: 35,
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 5,
  },
  settings: {
    color: "blue",
    fontSize: 15,
    padding: 10,
    alignItems: "center",
    alignSelf: "center",
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
    alignSelf: "center",
  },
  signoutText: {
    color: "white",
  },
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
