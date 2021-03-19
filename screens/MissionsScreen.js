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
import { useDispatch, useSelector } from "react-redux";
import CircleCheckBox, { LABEL_POSITION } from "react-native-circle-checkbox";
import * as authAction from "../redux/actions/authAction";
import AwesomeButton from "react-native-really-awesome-button";
import * as FileSystem from "expo-file-system";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
import XLSX from "xlsx";
import * as Sharing from "expo-sharing";

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

const MissionsScreen = (navData) => {
  console.log("XLSX:", XLSX);
  const dispatch = useDispatch();
  const mission = useSelector(
    (state) => state.auth.weeklySubmissions.weeklySubmissions
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [submissionCount, setSubmissionCount] = useState("");
  const [submissionGoal, setSubmissionGoal] = useState("");
  const [previousWeekCount, setPreviousWeekCount] = useState("");
  const [checkDiabeticYes, setCheckDiabeticYes] = useState(false);
  const [checkDiabeticNo, setCheckDiabeticNo] = useState(true);
  const [checkStudentYes, setCheckStudentYes] = useState(false);
  const [checkStudentNo, setCheckStudentNo] = useState(true);
  const [checkInsulinYes, setCheckInsulinYes] = useState(false);
  const [checkInsulinNo, setCheckInsulinNo] = useState(true);
  const [diabeticYes, setDiabeticYes] = useState("blue");
  const [diabeticNo, setDiabeticNo] = useState("blue");

  console.log(mission);

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

  const summary = async () => {
    dispatch(authAction.weeklySummary(token))
      .then(async (response) => {
        console.log("Summary in mission screen: ", response.summary.summary);
        var data = [
          {
            label: "Summary Generation Date",
            value: "2021-03-17",
          },
          {
            label: "Summary Period",
            value: "2021-03-08 to 2021-03-14",
          },
          {
            label: "Summary Generation Date",
            value: "2021-03-17",
          },
          {
            label: "Summary Period",
            value: "2021-03-08 to 2021-03-14",
          },
          {
            label: "Summary Generation Date",
            value: "2021-03-17",
          },
          {
            label: "Summary Period",
            value: "2021-03-08 to 2021-03-14",
          },
          {
            label: "Summary Generation Date",
            value: "2021-03-17",
          },
          {
            label: "Summary Period",
            value: "2021-03-08 to 2021-03-14",
          },
          {
            label: "Summary Generation Date",
            value: "2021-03-17",
          },
          {
            label: "Summary Period",
            value: "2021-03-08 to 2021-03-14",
          },
          {
            label: "Summary Generation Date",
            value: "2021-03-17",
          },
          {
            label: "Summary Period",
            value: "2021-03-08 to 2021-03-14",
          },
          {
            label: "Summary Generation Date",
            value: "2021-03-17",
          },
          {
            label: "Summary Period",
            value: "2021-03-08 to 2021-03-14",
          },
          {
            label: "Summary Generation Date",
            value: "2021-03-17",
          },
          {
            label: "Summary Period",
            value: "2021-03-08 to 2021-03-14",
          },
          {
            label: "Summary Generation Date",
            value: "2021-03-17",
          },
          {
            label: "Summary Period",
            value: "2021-03-08 to 2021-03-14",
          },
          {
            label: "Summary Generation Date",
            value: "2021-03-17",
          },
          {
            label: "Summary Period",
            value: "2021-03-08 to 2021-03-14",
          },
          {
            label: "Summary Generation Date",
            value: "2021-03-17",
          },
          {
            label: "Summary Period",
            value: "2021-03-08 to 2021-03-14",
          },
          {
            label: "Summary Generation Date",
            value: "2021-03-17",
          },
          {
            label: "Summary Period",
            value: "2021-03-08 to 2021-03-14",
          },
          {
            label: "Summary Generation Date",
            value: "2021-03-17",
          },
          {
            label: "Summary Period",
            value: "2021-03-08 to 2021-03-14",
          },
          {
            label: "Summary Generation Date",
            value: "2021-03-17",
          },
          {
            label: "Summary Period",
            value: "2021-03-08 to 2021-03-14",
          },
        ];

        var ws = XLSX.utils.json_to_sheet(data);

        var wb = XLSX.utils.book_new();
        var wscols = [{ wch: 60 }];

        ws["!cols"] = wscols;
        XLSX.utils.book_append_sheet(wb, ws, "Summary");
        const wbout = XLSX.write(wb, {
          type: "base64",
          bookType: "xlsx",
        });
        const uri = FileSystem.cacheDirectory + "Summary.xlsx";
        //console.log(`Writing to ${JSON.stringify(uri)} with text: ${wbout}`);
        await FileSystem.writeAsStringAsync(uri, wbout, {
          encoding: FileSystem.EncodingType.Base64,
        });

        await Sharing.shareAsync(uri, {
          mimeType:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          dialogTitle: "MyWater data",
          UTI: "com.microsoft.excel.xlsx",
        });

        //let data = response.summary.split(",");
        //let data = [JSON.stringify(response.summary)];
        //const rowString = [data].map((d) => `${d[0]},${d[1]}\n`).join("");
        //console.log("Row String: ", data);
        // const fileUri = FileSystem.documentDirectory + "filename.xlsx";
        // const url = fileRoute;
        // await FileSystem.writeAsStringAsync
        // let downloadObject = FileSystem.createDownloadResumable(url, fileUri);
        // let respond = await downloadObject.downloadAsync();
        // const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        // if (status === "granted") {
        //   let fileUri = FileSystem.documentDirectory + "summary.txt"; //done
        //   //const url = fileRoute; //done
        //   await FileSystem.writeAsStringAsync(fileUri, response.summary, {
        //     encoding: FileSystem.EncodingType.UTF8,
        //   });

        //await file.downloadAsync();

        //   const asset = await MediaLibrary.createAssetAsync(fileUri);
        //   await MediaLibrary.createAlbumAsync("Summary", asset, true);
        // }
      })
      .catch((error) => console.log(error));
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
        target_glucose_level: 1,
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
        target_glucose_level,
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
            target_glucose_level,
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
            <Text style={styles.titleMain}>Mission</Text>
          </View>

          <ScrollView
            style={styles.ScrollView}
            contentContainerStyle={styles.ScrollViewContent}
          >
            <View style={styles.card}>
              <Text style={styles.title}>Submission Count:</Text>
              <Text style={styles.value}>{mission.submission_count}</Text>
              <Text style={styles.title}>Submission Goal:</Text>
              <Text style={styles.value}>{mission.submission_goal}</Text>
              <Text style={styles.title}>Previous Week Count:</Text>
              <Text style={styles.value}>{mission.previous_week_count}</Text>
              <Text style={styles.title}>
                7 Days Average Blood Glucose Level:
              </Text>
              <Text style={styles.value}>
                {mission["7_day_average_bgl_mmol_L"]}
              </Text>
              <Text style={styles.title}>
                2 Month Average Blood Glucose Level:
              </Text>
              <Text style={styles.value}>
                {mission["2_month_average_bgl_mmol_L"]}
              </Text>
              <Text style={styles.title}>Predicted A1c DCCT:</Text>
              <Text style={styles.value}>{mission["predicted_A1c_DCCT%"]}</Text>
              <Text style={styles.title}>Predicted A1c IFFC:</Text>
              <Text style={styles.value}>
                {mission["predicted_A1c_IFCC_mmol_mol"]}
              </Text>
              <Text style={styles.title}>7 Days Hypos:</Text>
              <Text style={styles.value}>{mission["7_day_hypos"]}</Text>
              <Text style={styles.title}>7 Days Hypers:</Text>
              <Text style={styles.value}>{mission["7_day_hypers"]}</Text>
              <Text style={styles.title}>Submission Goal Met:</Text>
              <Text style={styles.value}>
                {mission.submission_goal_met === true ? "Yes" : "No"}
              </Text>
              <Text style={styles.title}>Mission:</Text>
              <Text style={styles.value}>{mission["mission%"]}%</Text>
              <Text style={styles.title}>Goal Feedback:</Text>
              <Text style={styles.value}>{mission.goal_feedback}</Text>
              <Text style={styles.title}>Previous Week Feedback:</Text>
              <Text style={styles.value}>{mission.previous_week_feedback}</Text>
            </View>

            <View style={styles.card}>
              <AwesomeButton progress onPress={summary}>
                Previous Week Summary
              </AwesomeButton>
            </View>
          </ScrollView>
        </View>
      )}
    </Formik>
  );
};

export default MissionsScreen;

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
    backgroundColor: "#ff3333",
  },
  titleMain: {
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  value: {
    fontSize: 20,
    fontWeight: "bold",
    color: "grey",
    textAlign: "right",
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
