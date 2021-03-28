import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Image,
  Alert,
} from "react-native";
import FloatingAction from "react-native-floating-action/src/FloatingAction";
import Card from "../components/Card";
import Day from "../components/Day";
import Card2 from "../components/Card2";
import AsyncStorage from "@react-native-community/async-storage";
import { connect, useDispatch, useSelector } from "react-redux";
import * as authAction from "../redux/actions/authAction";
import * as WebBrowser from "expo-web-browser";
import {
  makeRedirectUri,
  useAuthRequest,
  getRedirectUrl,
  ResponseType,
} from "expo-auth-session";
import { generateSecureRandom } from "react-native-securerandom";
import * as Random from "expo-random";
import * as Crypto from "expo-crypto";
import { Entypo } from "@expo/vector-icons";
import moment from "moment";

WebBrowser.maybeCompleteAuthSession();

const useProxy = Platform.select({ web: false, default: true });

// const discovery = {
//   authorizationEndpoint: "https://www.fitbit.com/oauth2/authorize",
//   tokenEndpoint: "https://api.fitbit.com/oauth2/token",
//   revocationEndpoint: "https://api.fitbit.com/oauth2/revoke",
// };

const discovery = {
  authorizationEndpoint: "https://www.fitbit.com/oauth2/authorize",
  tokenEndpoint: "https://api.fitbit.com/oauth2/token",
  revocationEndpoint: "https://api.fitbit.com/oauth2/revoke",
};

const Home = (navData) => {
  // state = {
  //   color: "#136DF3",
  //   activestate: "rgba(255, 255, 255, 0.291821)",
  //   name: "",
  //   email: "",
  //   token: "",
  //   percentage: "",
  // };
  const url = getRedirectUrl("redirect");
  //console.log("URL :", url);
  const [color, setColor] = useState("#136DF3");
  const [activeState, setActiveState] = useState(
    "rgba(255, 255, 255, 0.291821)"
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [percentage, setPercentage] = useState("");
  const [steps, setSteps] = useState("");
  const [totalSteps, setTotalSteps] = useState("");
  const [stepsPercentage, setStepsPercentage] = useState("");
  const [sedentaryMinutes, setSedentaryMinutes] = useState(null);
  const [acronym, setAcronym] = useState("");
  const [borderColorOne, setBorderColorOne] = useState("#136DF3");
  const [borderColorTwo, setBorderColorTwo] = useState("#136DF3");
  const dispatch = useDispatch();
  const mission = useSelector(
    (state) => state.auth.weeklySubmissions.weeklySubmissions
  );
  console.log(mission?.mission);

  const change = (navData) => {
    return navData("Mission");
  };

  // change = (navData) => {
  //   this.props.authAction.weeklySubmissions(navData)
  // }

  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: "22C5BD",
      scopes: ["activity", "sleep", "weight", "profile"],
      expires_in: "3600",
      // For usage in managed apps using the proxy
      redirectUri: makeRedirectUri({
        useProxy,
        // For usage in bare and standalone
        //native: 'your.app://redirect',
      }),
    },
    discovery
  );

  const loadData = async () => {
    try {
      let name = await AsyncStorage.getItem("name");
      let email = await AsyncStorage.getItem("email");
      let token = await AsyncStorage.getItem("token");
      // Random.getRandomBytesAsync(8).then((randomBytes) => {
      //   console.log("Random Bytes", randomBytes);
      //   let sequence = randomBytes
      //     .toString("base64")
      //     .replace(/\+/g, "-")
      //     .replace(/\//g, "_")
      //     .replace(/=/g, "");

      //   console.log("Sequence: ", sequence);
      // });
      // const digest = await Crypto.digestStringAsync(
      //   Crypto.CryptoDigestAlgorithm.SHA256,
      //   "Github stars are neat 🌟"
      // );
      //console.log("Digest: ", digest);

      if (name !== null) {
        let firstword = name.split(" ")[0];
        setName(firstword);
        let matches = name.match(/\b(\w)/g);
        setAcronym(matches.join(""));
        // this.setState({
        //   name: firstword,
        // });
      }
      if (email !== null) {
        setEmail(email);
        // this.setState({
        //   email: email,
        // });
      }
      if (token !== null && token !== undefined) {
        setToken(token);
        // this.setState({
        //   token: token,
        // });
        //console.log("console: ", token);
        await weeklySubmissions(token);
        await dailySteps(token);
        await me(token);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const weeklySubmissions = async (token) => {
    //console.log("token in sub", token);
    dispatch(authAction.weeklySubmissions(token))
      .then(async (response) => {
        console.log("Weekly Submission Response:", response);
        if (response !== null) {
          // this.setState({
          //   percentage: response.weeklySubmissions["mission%"],
          // });
          setPercentage(response.weeklySubmissions.mission);

          //console.log("Percentage:", percentage);
        } else {
          setPercentage(0);
          //Alert.alert("Response Failed. Try Again");
        }
      })
      .catch((err) => console.log(err));
  };

  const dailySteps = async (token) => {
    //console.log("token in sub", token);
    dispatch(authAction.dailySteps(token))
      .then(async (response) => {
        //console.log("Daily Steps: ", response);
        if (response !== null) {
          setSteps(response.steps.todays_steps);
          setStepsPercentage(response.steps.mission);
        } else {
          setSteps(0);
          setStepsPercentage(0);
          //Alert.alert("Response Failed. Try Again");
        }
      })
      .catch((err) => console.log(err));
  };

  const me = async (token) => {
    //console.log("token in sub", token);
    dispatch(authAction.me(token))
      .then(async (response) => {
        //console.log("Daily Steps: ", response);
        if (response !== null) {
          setTotalSteps(response.me.user.dailyStepGoal);
        } else {
          setTotalSteps(0);
          //Alert.alert("Response Failed. Try Again");
        }
      })
      .catch((err) => console.log(err));
  };

  const lifetimeActivities = async (token, id) => {
    //console.log("token in sub", token);
    dispatch(authAction.lifetimeActivities(token, id))
      .then(async (response) => {
        console.log("Lifetime Activities: ", response);
        if (response !== null) {
          //setTotalSteps(response.me.user.dailyStepGoal);
        } else {
          Alert.alert("Response Failed. Try Again");
        }
      })
      .catch((err) => console.log(err));
  };

  const todayActivities = async (token, id) => {
    //console.log("token in sub", token);
    dispatch(authAction.todayActivities(token, id))
      .then(async (response) => {
        console.log("Today Activities: ", response);
        if (response !== null) {
          setSedentaryMinutes(
            response.todayActivities.summary.sedentaryMinutes
          );
        } else {
          Alert.alert("Response Failed. Try Again");
        }
      })
      .catch((err) => console.log(err));
  };

  const setFitbitToken = async (token) => {
    //console.log("token in sub", token);
    try {
      await AsyncStorage.setItem("fitbitToken", token);

      //navData.navigation.navigate("Home");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    console.log("Fitbit response: ", response);
    if (response?.type === "success") {
      const data = response.params;
      lifetimeActivities(data.access_token, data.user_id);
      todayActivities(data.access_token, data.user_id);
      setFitbitToken(data.access_token);

      console.log("data:", data);
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <View style={styles.containerone}>
        <View style={styles.boxone}></View>
        <View style={styles.boxtwo}>
          <View>
            <Text style={styles.name}>Hi, {name}</Text>
            <Text style={styles.subtitle}>Here is your health.</Text>
          </View>
          <TouchableOpacity
            onPress={() => navData.navigation.navigate("Profile")}
          >
            <View style={styles.userLogo}>
              <Text style={styles.initials}>{acronym}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.boxthree}>
          <ImageBackground
            source={require("../assets/images/graphone.png")}
            style={{ width: 400, height: "120%", paddingBottom: 80 }}
          />
        </View>
        <View style={styles.boxfour}>
          <Day dayname={moment().format("MMMM Do YYYY")} active={activeState} />
          {/* <Day dayname="Mon" />
          <Day dayname="Tue" />
          <Day dayname="Wed" />
          <Day dayname="Thu" />
          <Day dayname="Fri" />
          <Day dayname="Sat" /> */}
        </View>
      </View>
      <View style={styles.containertwo}>
        <View style={styles.line}></View>
        <ScrollView contentContainerStyle={{ paddingBottom: "30%" }}>
          <View style={styles.progress}>
            <Text style={styles.textone}>My Progress</Text>
          </View>
          <View style={styles.card1}>
            <Text style={{ textAlign: "center", fontWeight: "bold" }}>
              Connect to Fitbit
            </Text>
            <TouchableOpacity
              style={styles.fitbitButton}
              disabled={!request}
              onPress={() => {
                promptAsync({ useProxy });
              }}
            >
              <Image
                source={require("../assets/images/fitbit.png")}
                style={styles.fitbit}
              />
            </TouchableOpacity>
            {/* <TouchableOpacity
              //style={styles.loginButton}
              disabled={!request}
              onPress={() => {
                promptAsync({ useProxy });
              }}
            >
              <Image
                source={require("../assets/images/fitbit1.png")}
                //style={styles.fitbit}
              />
            </TouchableOpacity> */}

            <TouchableOpacity
              onPress={() => navData.navigation.navigate("MissionsScreen")}
            >
              <Card
                move="bounceInLeft"
                image={require("../assets/images/checkbox.png")}
                title="Mission"
                subtitle={`${percentage}% Completed`}
                completed={`${percentage}%`}
                screenchange={() => change()}
                BorderColor={percentage === 100 ? "green" : "#136DF3"}
                Background="#add8e6"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.card2}>
            <Card
              move="bounceInRight"
              image={require("../assets/images/running.png")}
              title="Sedentary Minutes"
              //subtitle={`${percentage}% Completed`}
              completed={`${
                sedentaryMinutes === null ? "0" : sedentaryMinutes
              }\nmin`}
              screenchange={() => change()}
              BorderColor="#136DF3"
              Background="white"
            />
          </View>
          <View style={styles.card2}>
            <Card
              move="bounceInRight"
              image={require("../assets/images/checktodo.png")}
              title="Completed"
              subtitle={`${steps} out of ${totalSteps} steps`}
              completed={`${stepsPercentage}%`}
              BorderColor={stepsPercentage === "100" ? "green" : "#136DF3"}
              Background="white"
            />
          </View>
          {/* <View style={styles.card3}>
            <Card2 />
          </View> */}
        </ScrollView>
        <FloatingAction
          position={"right"}
          animated={false}
          showBackground={false}
          onPressMain={() => navData.navigation.navigate("DailyHealth")}
        />
      </View>
    </View>
  );
};

// const mapStateToProps = (state) => {
//   console.log("State: ", state);
//   return { user: state.user };
// };

// const mapDispatchToProps = {
//   weeklySubmissions,
//   // weeklySubmissions
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Home);

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    backgroundColor: "#ff3333",
  },
  containerone: {
    flex: 1.3,
    display: "flex",
  },
  containertwo: {
    flex: 1.2,
    backgroundColor: "#fff",
    borderTopRightRadius: 60,
    borderTopLeftRadius: 60,
  },
  boxone: {
    flex: 1,
  },
  boxtwo: {
    flex: 0.8,
    marginHorizontal: 35,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  boxthree: {
    flex: 2.5,
  },
  boxfour: {
    flex: 0.5,
    color: "#fff",
    flexDirection: "row",
  },
  name: {
    fontSize: 38,
    color: "#fff",
    fontWeight: "bold",
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 20,
    color: "#fff",
  },
  line: {
    width: 66,
    height: 4,
    backgroundColor: "#F4F0F0",
    borderRadius: 2,
    marginVertical: 25,
    left: 150,
  },
  progress: {
    left: 50,
  },
  textone: {
    fontSize: 20,
    color: "#2D2D2D",
    letterSpacing: -0.5,
  },
  card1: {
    flex: 0.5,
    display: "flex",
    marginTop: 10,
    marginHorizontal: 30,
    justifyContent: "center",
    //alignSelf: "center",
    //alignContent: "center",
    //alignItems: "center",
  },
  card2: {
    flex: 0.5,
    display: "flex",
    marginTop: 10,
    marginHorizontal: 30,
  },
  card3: {
    flex: 0.5,
    display: "flex",
    marginTop: 10,
    marginHorizontal: 10,
  },
  fitbitButton: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
    alignSelf: "center",
  },
  fitbit: {
    height: 30,
    width: 120,
    //borderRadius: 10,
    //opacity: 0.5,
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
});
