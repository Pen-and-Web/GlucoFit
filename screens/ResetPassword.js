import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-community/async-storage";
import * as authAction from "../redux/actions/authAction";
import axios from "axios";

const formSchema = yup.object({
  email: yup.string().email().required(),
});

const ResetPassword = (navData) => {
  const dispatch = useDispatch();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <Formik
        initialValues={{ email: "" }}
        validationSchema={formSchema}
        onSubmit={(email) => {
          //console.log("Register Screen Payload:", fullname, email, password);
          dispatch(authAction.resetPassword(email))
            .then(async (response) => {
              console.log("Register Response:", response);
              //   if (response !== null) {
              //     try {
              //       await AsyncStorage.setItem("token", response.token);
              //       await AsyncStorage.setItem("id", response.resultData._id);
              //       await AsyncStorage.setItem(
              //         "name",
              //         response.resultData.fullname
              //       );
              //       await AsyncStorage.setItem(
              //         "email",
              //         response.resultData.email
              //       );
              //       navData.navigation.navigate("Home");
              //     } catch (err) {
              //       console.log(err);
              //     }
              //   } else {
              //     Alert.alert("Registration Failed. Try Again.");
              //     //console.log("Response:", response);
              //   }
            })
            .catch((err) => console.log(err));
        }}
      >
        {(props) => (
          <View style={styles.container}>
            <Text style={styles.logoText}>Enter email to recover password</Text>
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                placeholder="Email"
                placeholderTextColor="#003f5c"
                onChangeText={props.handleChange("email")}
                value={props.values.email}
                onBlur={props.handleBlur("email")}
              />
            </View>
            <Text style={styles.error}>
              {props.touched.email && props.errors.email}
            </Text>

            <TouchableOpacity
              style={styles.loginButton}
              onPress={props.handleSubmit}
              //onPress={apicall}
            >
              <Text style={styles.loginText}>Submit</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#003f5c",
    alignItems: "center",
    justifyContent: "center",
  },
  inputView: {
    width: "80%",
    backgroundColor: "#738289",
    borderRadius: 25,
    marginBottom: 10,
    height: 50,
    justifyContent: "center",
    padding: 20,
  },
  logoText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#fb5b5a",
    padding: 20,
    //marginTop: 50,
  },
  inputText: {
    height: 50,
    color: "white",
  },
  error: {
    color: "red",
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  loginButton: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  loginText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#ffffff",
    textAlign: "center",
  },
  forgot: {
    color: "white",
    fontSize: 13,
  },
  registerContainer: {
    alignItems: "flex-end",
    justifyContent: "center",
    flexDirection: "row",
    paddingVertical: 70,
  },
  SignUpText: {
    color: "#738289",
    fontSize: 16,
  },
  SignUpButton: {
    color: "#738289",
    fontSize: 16,
    fontWeight: "bold",
  },
  Register: {
    color: "white",
  },
});

export default ResetPassword;
