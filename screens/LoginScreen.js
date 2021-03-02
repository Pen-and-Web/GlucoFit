import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
  Alert,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-community/async-storage";
import * as authAction from "../redux/actions/authAction";

const formSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required().min(6),
});

const LoginScreen = (navData) => {
  const dispatch = useDispatch();
  const loadData = async () => {
    try {
      let token = await AsyncStorage.getItem("token");
      if (token !== null) {
        navData.navigation.navigate("Home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={formSchema}
        onSubmit={(email, password) => {
          dispatch(authAction.loginUser(email, password))
            .then(async (response) => {
              console.log("Login Screen Response:", response);
              if (response !== null) {
                console.log("Login Response: ", response);
                try {
                  await AsyncStorage.setItem("token", response.token);
                  await AsyncStorage.setItem("id", response.decodedData._id);
                  await AsyncStorage.setItem(
                    "name",
                    response.decodedData.fullname
                  );
                  await AsyncStorage.setItem(
                    "email",
                    response.decodedData.email
                  );
                  navData.navigation.navigate("Home");
                } catch (err) {
                  console.log(err);
                }
              } else {
                Alert.alert("Login Failed. Try Again");
              }
            })
            .catch((err) => console.log(err));
        }}
      >
        {(props) => (
          <View style={styles.container}>
            <View style={styles.logo}>
              <Image
                source={require("../assets/images/logo.png")}
                style={styles.image}
              />
            </View>
            <Text style={styles.logoText}>GlucoFit</Text>
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                placeholder="Email"
                placeholderTextColor="#003f5c"
                keyboardType="email-address"
                onChangeText={props.handleChange("email")}
                value={props.values.email}
                onBlur={props.handleBlur("email")}
              />
            </View>
            <Text style={styles.error}>
              {props.touched.email && props.errors.email}
            </Text>
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                placeholder="Password"
                placeholderTextColor="#003f5c"
                secureTextEntry={true}
                onChangeText={props.handleChange("password")}
                value={props.values.password}
                onBlur={props.handleBlur("password")}
              />
            </View>
            <Text style={styles.error}>
              {props.touched.password && props.errors.password}
            </Text>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={props.handleSubmit}
            >
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.forgot}>Forgot Password?</Text>
            </TouchableOpacity>
            <View style={styles.registerContainer}>
              <Text style={styles.SignUpText}>Don't have account? </Text>
              <TouchableOpacity
                style={styles.SignUpButton}
                onPress={() => navData.navigation.navigate("Register")}
              >
                <Text style={styles.Register}>Register</Text>
              </TouchableOpacity>
            </View>
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
  logo: {
    marginTop: 60,
    marginBottom: 20,
  },
  image: {
    height: 75,
    width: 75,
    borderRadius: 10,
    opacity: 0.5,
  },
  logoText: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fb5b5a",
    marginBottom: 30,
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
    marginTop: 10,
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

export default LoginScreen;
