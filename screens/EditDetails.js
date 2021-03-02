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
  fullname: yup.string().min(3),
  email: yup.string().email(),
  password: yup.string().min(6),
  diabetic_type: yup.string(),
  target_glucose_level: yup.number().min(1).max(59),
  isStudent: yup.boolean(),
  insulinDependent: yup.boolean(),
  dailyStepGoal: yup.number().min(0).max(500000),
  weeklyBGSubmissionGoal: yup.number().min(0).max(50),
});

const EditDetails = (navData) => {
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
  const [checkInsulinYes, setCheckInsulinYes] = useState(false);
  const [checkInsulinNo, setCheckInsulinNo] = useState(true);
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
        fullname: "",
        email: "",
        password: "",
        diabetic_type: "non-diabetic",
        target_glucoce_level: 1,
        isStudent: false,
        insulinDependent: false,
        dailyStepGoal: 0,
        weeklyBGSubmissionGoal: 0,
        token: `${token}`,
      }}
      validationSchema={formSchema}
      onSubmit={(
        fullname,
        email,
        password,
        diabetic_type,
        target_glucoce_level,
        isStudent,
        insulinDependent,
        dailyStepGoal,
        weeklyBGSubmissionGoal,
        token
      ) => {
        console.log("Register Screen Payload:", fullname);
        //console.log("Token in formik dispatch:", token);
        dispatch(
          authAction.editUser(
            fullname,
            email,
            password,
            diabetic_type,
            target_glucoce_level,
            isStudent,
            insulinDependent,
            dailyStepGoal,
            weeklyBGSubmissionGoal,
            token
          )
        )
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
            <Text style={styles.title}>Edit User Details</Text>
          </View>

          <ScrollView
            style={styles.ScrollView}
            contentContainerStyle={styles.ScrollViewContent}
          >
            <View style={styles.card}>
              <Text style={styles.question}>Full Name:</Text>
              <TextInput
                //label="Email"
                value={props.values.fullname}
                onChangeText={props.handleChange("fullname")}
                placeholder={name}
              />
            </View>
            <View style={styles.card}>
              <Text style={styles.question}>Email:</Text>
              <TextInput
                //label="Email"
                value={props.values.email}
                onChangeText={props.handleChange("email")}
                placeholder={email}
              />
            </View>
            <View style={styles.card}>
              <Text style={styles.question}>Password:</Text>
              <TextInput
                //label="Email"
                value={props.values.password}
                onChangeText={props.handleChange("password")}
              />
            </View>
            <View style={styles.card}>
              <View>
                <Text style={styles.question}>Are you diabetic?</Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <CircleCheckBox
                    innerColor={"blue"}
                    outerColor={"blue"}
                    checked={checkDiabeticYes}
                    onToggle={(checked) => {
                      //console.log("My state is: ", checked);
                      if (checkDiabeticYes) {
                        //props.handleChange("diabetic");
                        props.setFieldValue("diabetic_type", "diabetic");
                        setCheckDiabeticYes(false);
                        setCheckDiabeticNo(true);
                      } else {
                        props.setFieldValue("diabetic_type", "non-diabetic");
                        setCheckDiabeticYes(true);
                        setCheckDiabeticNo(false);
                      }
                    }}
                    //labelPosition={LABEL_POSITION.RIGHT}
                    //label="Checkbox example"
                  />
                  <Text style={styles.Options}>Yes</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <CircleCheckBox
                    innerColor={"blue"}
                    outerColor={"blue"}
                    checked={checkDiabeticNo}
                    onToggle={(checked) => {
                      //console.log("My state is: ", checked);
                      if (!checkDiabeticNo) {
                        //props.handleChange("diabetic");
                        props.setFieldValue("diabetic_type", "diabetic");
                        setCheckDiabeticNo(true);
                        setCheckDiabeticYes(false);
                      } else {
                        props.setFieldValue("diabetic_type", "non-diabetic");
                        setCheckDiabeticNo(false);
                        setCheckDiabeticYes(true);
                      }
                    }}
                    //labelPosition={LABEL_POSITION.RIGHT}
                    //label="Checkbox example"
                  />
                  <Text style={styles.Options}>No</Text>
                </View>
              </View>
            </View>
            <View style={styles.card}>
              <View>
                <Text style={styles.question}>
                  What is your target glucose level? (1-59)
                </Text>
                <NumericInput
                  type="up-down"
                  onChange={(value) => {
                    console.log(value);
                    props.handleChange("target_glucose_level");
                  }}
                  minValue={1}
                  maxValue={59}
                  value={props.values.target_glucose_level}
                />
              </View>
              {/* <Counter start={1} onChange={(value) => console.log(value)} /> */}
            </View>
            <View style={styles.card}>
              <View>
                <Text style={styles.question}>Are you a student?</Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <CircleCheckBox
                    innerColor={"blue"}
                    outerColor={"blue"}
                    checked={checkStudentYes}
                    onToggle={(checked) => {
                      //console.log("My state is: ", checked);
                      if (checkStudentYes) {
                        //props.handleChange("student");
                        props.setFieldValue("isStudent", true);
                        setCheckStudentYes(false);
                        setCheckStudentNo(true);
                      } else {
                        props.setFieldValue("isStudent", false);
                        setCheckStudentYes(true);
                        setCheckStudentNo(false);
                      }
                    }}
                    //labelPosition={LABEL_POSITION.RIGHT}
                    //label="Checkbox example"
                  />
                  <Text style={styles.Options}>Yes</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <CircleCheckBox
                    innerColor={"blue"}
                    outerColor={"blue"}
                    checked={checkStudentNo}
                    onToggle={(checked) => {
                      //console.log("My state is: ", checked);
                      if (!checkStudentNo) {
                        //props.handleChange("student");
                        props.setFieldValue("isStudent", true);
                        setCheckStudentNo(true);
                        setCheckStudentYes(false);
                      } else {
                        props.setFieldValue("isStudent", false);
                        setCheckStudentNo(false);
                        setCheckStudentYes(true);
                      }
                    }}
                    //labelPosition={LABEL_POSITION.RIGHT}
                    //label="Checkbox example"
                  />
                  <Text style={styles.Options}>No</Text>
                </View>
              </View>
            </View>
            <View style={styles.card}>
              <View>
                <Text style={styles.question}>Are you insulin dependent?</Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <CircleCheckBox
                    innerColor={"blue"}
                    outerColor={"blue"}
                    checked={checkInsulinYes}
                    onToggle={(checked) => {
                      //console.log("My state is: ", checked);
                      if (checkInsulinYes) {
                        //props.handleChange("diabetic");
                        props.setFieldValue("insulinDependent", true);
                        setCheckInsulinYes(false);
                        setCheckInsulinNo(true);
                      } else {
                        props.setFieldValue("insulinDependent", false);
                        setCheckInsulinYes(true);
                        setCheckInsulinNo(false);
                      }
                    }}
                    //labelPosition={LABEL_POSITION.RIGHT}
                    //label="Checkbox example"
                  />
                  <Text style={styles.Options}>Yes</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <CircleCheckBox
                    innerColor={"blue"}
                    outerColor={"blue"}
                    checked={checkInsulinNo}
                    onToggle={(checked) => {
                      //console.log("My state is: ", checked);
                      if (!checkInsulinNo) {
                        //props.handleChange("diabetic");
                        props.setFieldValue("insulinDependent", true);
                        setCheckInsulinNo(true);
                        setCheckInsulinYes(false);
                      } else {
                        props.setFieldValue("insulinDependent", false);
                        setCheckInsulinNo(false);
                        setCheckInsulinYes(true);
                      }
                    }}
                    //labelPosition={LABEL_POSITION.RIGHT}
                    //label="Checkbox example"
                  />
                  <Text style={styles.Options}>No</Text>
                </View>
              </View>
            </View>
            <View style={styles.card}>
              <View>
                <Text style={styles.question}>
                  What is your daily step goal?
                </Text>
                <NumericInput
                  type="up-down"
                  onChange={(value) => {
                    console.log(value);
                    props.handleChange("dailyStepGoal");
                  }}
                  minValue={0}
                  maxValue={500000}
                  value={props.values.dailyStepGoal}
                />
              </View>
            </View>
            <View style={styles.card}>
              <View>
                <Text style={styles.question}>
                  What is your weekly blood glucose submission goal? (0-50)
                </Text>
                <NumericInput
                  type="up-down"
                  onChange={(value) => {
                    console.log(value);
                    props.handleChange("weeklyBGSubmissionGoal");
                  }}
                  minValue={0}
                  maxValue={50}
                  value={props.values.weeklyBGSubmissionGoal}
                />
              </View>
            </View>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={async () => {
                //props.setFieldValue("token", token);
                props.handleSubmit();
              }}
            >
              <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}
    </Formik>
  );
};

export default EditDetails;

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
