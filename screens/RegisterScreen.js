import React from "react";
import {StyleSheet, View, Text, ScrollView, KeyboardAvoidingView, TextInput, TouchableOpacity, Platform,} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import {useDispatch} from "react-redux";
import AsyncStorage from '@react-native-community/async-storage';
import * as authAction from '../redux/actions/authAction'

const formSchema = yup.object({
  fullName: yup.string().required().min(3),
  email: yup.string().email().required(),
  password: yup.string().required().min(6),
});

const RegisterScreen = (navData) => {
    const dispatch = useDispatch();
  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
      <Formik initialValues={{fullName: "", email: "", password: "",}}
        validationSchema={formSchema}
          onSubmit={(fullName, email, password) => {
              console.log(fullName, email, password);
              dispatch(authAction.registerUser({fullName, email, password}))
                  .then(async response => {
                      if(response.success) {
                          try{
                              await AsyncStorage.setItem('token', response.token);
                              navData.navigation.navigate('Home')
                          } catch (err) {
                              console.log(err)
                          }
                      }
                      else {
                          Alert.alert('Registration Failed. Try Again.')
                      }
                  })
                  .catch(err => console.log(err))
          }}      >
        {(props) => (
          <View style={styles.container}>
            <Text style={styles.logoText}>GlucoFit</Text>
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                placeholder="Full Name"
                placeholderTextColor="#003f5c"
                onChangeText={props.handleChange("fullName")}
                value={props.values.fullName}
                onBlur={props.handleBlur("fullName")}
              />
            </View>
              <Text style={styles.error}>
                {props.touched.fullName && props.errors.fullName}
              </Text>
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

            <TouchableOpacity style={styles.loginButton} onPress={props.handleSubmit}>
              <Text style={styles.loginText}>Register</Text>
            </TouchableOpacity>
          <View style={styles.registerContainer}>
              <Text style={styles.SignUpText}>Have an account? </Text>
              <TouchableOpacity style={styles.SignUpButton} onPress={() => navData.navigation.navigate("Login")}>
                <Text style={styles.Register}>Login</Text>
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
      backgroundColor: '#003f5c',
      alignItems: 'center',
      justifyContent: 'center',
  },
  inputView:{
      width: "80%",
      backgroundColor: "#738289",
      borderRadius: 25,
      marginBottom: 10,
      height: 50,
      justifyContent: "center",
      padding: 20
  },
  logoText:{
      fontWeight: "bold",
      fontSize: 50,
      color: "#fb5b5a",
      padding: 20,
      marginTop: 50
  },
  inputText:{
      height: 50,
      color: "white"
  },
  error: {
      color: 'red',
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
      marginBottom: 10
  },
  loginText: {
      fontSize: 16,
      fontWeight: '500',
      color: '#ffffff',
      textAlign: 'center'
  },
  forgot:{
      color: "white",
      fontSize: 13
  },
  registerContainer: {
      alignItems: 'flex-end',
      justifyContent: 'center',
      flexDirection: 'row',
      paddingVertical: 70
  },
  SignUpText: {
      color: '#738289',
      fontSize: 16
  },
  SignUpButton: {
      color: '#738289',
      fontSize: 16,
      fontWeight: 'bold'
  },
  Register:{
      color:"white"
  }
});

export default RegisterScreen;
