import React, { useEffect, useState } from "react";
import { View, Image, Button, StyleSheet, LogBox } from "react-native";
import { Card, TextInput, Text } from "react-native-paper";
import {
  //TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import AsyncStorage from "@react-native-community/async-storage";
import RoundedCheckbox from "react-native-rounded-checkbox";
import NumericInput from "react-native-numeric-input";
import Counter from "react-native-counters";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import CircleCheckBox, { LABEL_POSITION } from "react-native-circle-checkbox";
import * as authAction from "../redux/actions/authAction";
//LogBox.ignoreAllLogs();

const formSchema = yup.object({
  glucose_level: yup.number().min(1).max(59),
  fasting: yup.boolean(),
});

const DailyHealth = (navData) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [checkDiabeticYes, setCheckDiabeticYes] = useState(false);
  const [checkDiabeticNo, setCheckDiabeticNo] = useState(true);
  const [checkStudentYes, setCheckStudentYes] = useState(false);
  const [checkStudentNo, setCheckStudentNo] = useState(true);
  const [checkFastingYes, setCheckFastingYes] = useState(false);
  const [checkFastingNo, setCheckFastingNo] = useState(true);
  const [diabeticYes, setDiabeticYes] = useState("blue");
  const [diabeticNo, setDiabeticNo] = useState("blue");

  const loadData = async () => {
    try {
      let name = await AsyncStorage.getItem("name");
      let email = await AsyncStorage.getItem("email");
      let token = await AsyncStorage.getItem("token");
      if (name !== null) {
        setName(name);
      }
      if (email !== null) {
        setEmail(email);
      }
      if (token !== null) {
        setToken(token);
        console.log("Token in async function:", token);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
    // LogBox.ignoreLogs[
    //   "Warning: componentWillReceiveProps has been renamed, and is not recommended for use. See https://fb.me/react-async-component-lifecycle-hooks for details."
    // ];
  }, []);

  return (
    <Formik
      initialValues={{
        glucose_level: "1",
        fasting: false,
        token: `${token}`,
      }}
      validationSchema={formSchema}
      onSubmit={(glucose_level, fasting, token) => {
        console.log("Register Screen Payload:", glucose_level);
        //console.log("Token in formik dispatch:", token);
        dispatch(authAction.dailyHealth(glucose_level, fasting, token))
          .then(async (response) => {
            //console.log("Edit Response:", response);
            // if (response !== null) {
            //   try {
            //     await AsyncStorage.setItem("token", response.token);
            //     await AsyncStorage.setItem("id", response.resultData._id);
            //     await AsyncStorage.setItem(
            //       "name",
            //       response.resultData.fullname
            //     );
            //     await AsyncStorage.setItem("email", response.resultData.email);
            //     navData.navigation.navigate("Home");
            //   } catch (err) {
            //     console.log(err);
            //   }
            // } else {
            //   Alert.alert("Registration Failed. Try Again.");
            //   //console.log("Response:", response);
            // }
          })
          .catch((err) => console.log(err));
      }}
    >
      {(props) => (
        <View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Enter Daily Health</Text>
          </View>

          <ScrollView
            style={styles.ScrollView}
            contentContainerStyle={styles.ScrollViewContent}
          >
            <View></View>
            <View style={styles.card}>
              <Text style={styles.question}>
                Enter Today's Blood-Glucose Level:
              </Text>
              <TextInput
                //label="Email"
                value={props.values.glucose_level}
                onChangeText={props.handleChange("glucose_level")}
                placeholder={"0-50"}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.card}>
              <View>
                <Text style={styles.question}>Are you fasting today?</Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <CircleCheckBox
                    innerColor={"blue"}
                    outerColor={"blue"}
                    checked={checkFastingYes}
                    onToggle={(checked) => {
                      //console.log("My state is: ", checked);
                      if (checkFastingYes) {
                        //props.handleChange("diabetic");
                        props.setFieldValue("fasting", false);
                        console.log(props.values.fasting);
                        setCheckFastingYes(false);
                        setCheckFastingNo(true);
                      } else {
                        props.setFieldValue("fasting", true);
                        setCheckFastingYes(true);
                        setCheckFastingNo(false);
                      }
                    }}
                  />
                  <Text style={styles.Options}>Yes</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <CircleCheckBox
                    innerColor={"blue"}
                    outerColor={"blue"}
                    checked={checkFastingNo}
                    onToggle={(checked) => {
                      //console.log("My state is: ", checked);
                      if (!checkFastingNo) {
                        //props.handleChange("diabetic");
                        props.setFieldValue("fasting", false);
                        setCheckFastingNo(true);
                        setCheckFastingYes(false);
                      } else {
                        props.setFieldValue("fasting", true);
                        setCheckFastingNo(false);
                        setCheckFastingYes(true);
                      }
                    }}
                  />
                  <Text style={styles.Options}>No</Text>
                </View>
              </View>
            </View>
            <View>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={async () => {
                  props.setFieldValue("token", token);
                  props.handleSubmit();
                }}
              >
                <Text style={styles.submitText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      )}
    </Formik>
  );
};

export default DailyHealth;

const styles = StyleSheet.create({
  card: {
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    borderRadius: 10,
    backgroundColor: "#ffffff",
    elevation: 5,
    //height: 300,
    //margin: 10,
    paddingVertical: "2%",
    paddingHorizontal: "2%",
    marginHorizontal: "2%",
    marginVertical: "2%",
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
  question: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  ScrollView: {
    height: "100%",
    marginTop: "2%",
    paddingBottom: "50%",
  },
  ScrollViewContent: {
    paddingBottom: "50%",
  },
  Options: {
    fontSize: 18,
  },

  submitButton: {
    //width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: "2%",
  },
  submitText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#ffffff",
    textAlign: "center",
  },
});
