import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Image,
} from "react-native";
import FloatingAction from "react-native-floating-action/src/FloatingAction";
import Card from "../components/Card";
import Day from "../components/Day";
import Card2 from "../components/Card2";
import AsyncStorage from "@react-native-community/async-storage";
import { connect, useDispatch } from "react-redux";
import * as authAction from "../redux/actions/authAction";
import * as WebBrowser from "expo-web-browser";
import {
  makeRedirectUri,
  useAuthRequest,
  getRedirectUrl,
} from "expo-auth-session";
// import * as expoAuthSession from "expo-auth-session";
// console.log("Expo auth session:",expoAuthSession);

WebBrowser.maybeCompleteAuthSession();

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
  console.log("URL :", url);
  const [color, setColor] = useState("#136DF3");
  const [activeState, setActiveState] = useState(
    "rgba(255, 255, 255, 0.291821)"
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [percentage, setPercentage] = useState("");
  const dispatch = useDispatch();

  const change = (navData) => {
    return navData("Mission");
  };

  // change = (navData) => {
  //   this.props.authAction.weeklySubmissions(navData)
  // }

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: "22C5BD",
      scopes: ["activity", "sleep"],
      // For usage in managed apps using the proxy
      redirectUri: makeRedirectUri({
        // For usage in bare and standalone
        //native: "your.app://redirect",
        //useProxy: false,
      }),
    },
    discovery
  );

  const loadData = async () => {
    try {
      let name = await AsyncStorage.getItem("name");
      let email = await AsyncStorage.getItem("email");
      let token = await AsyncStorage.getItem("token");
      if (name !== null) {
        let firstword = name.split(" ")[0];
        setName(firstword);
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
        console.log("console: ", token);
        await weeklySubmissions(token);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const [request, response, promptAsync] = useAuthRequest(
  //   {
  //     clientId: "CLIENT_ID",
  //     scopes: ["activity", "sleep"],
  //     // For usage in managed apps using the proxy
  //     redirectUri: makeRedirectUri({
  //       // For usage in bare and standalone
  //       native: "host.exp.exponent://redirect",
  //     }),
  //   },
  //   discovery
  // );

  const weeklySubmissions = async (token) => {
    console.log("token in sub", token);
    dispatch(authAction.weeklySubmissions(token))
      .then(async (response) => {
        console.log("Weekly Submission Response:", response);
        if (response !== null) {
          // this.setState({
          //   percentage: response.weeklySubmissions["mission%"],
          // });
          setPercentage(response.weeklySubmissions["mission%"]);
          console.log("Percentage:", percentage);
        } else {
          Alert.alert("Response Failed. Try Again");
        }
      })
      .catch((err) => console.log(err));
  };

  // componentDidMount = async () => {
  //   this.loadData();
  //   this.fitbit();

  //   // this.weeklySubmissions(this.state.token);
  //   //this.change();
  // };

  useEffect(() => {
    loadData();
    //weeklySubmissions();
  }, []);

  useEffect(() => {
    console.log("Fitbit response: ", response);
    if (response?.type === "success") {
      const { code } = response.params;
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <View style={styles.containerone}>
        <View style={styles.boxone}></View>
        <View style={styles.boxtwo}>
          <Text style={styles.name}>Hi, {name}</Text>
          <Text style={styles.subtitle}>Here is your health.</Text>
        </View>
        <View style={styles.boxthree}>
          <ImageBackground
            source={require("../assets/images/graphone.png")}
            style={{ width: 400, height: "120%", paddingBottom: 80 }}
          />
        </View>
        <View style={styles.boxfour}>
          <Day dayname="Sun" active={activeState} />
          <Day dayname="Mon" />
          <Day dayname="Tue" />
          <Day dayname="Wed" />
          <Day dayname="Thu" />
          <Day dayname="Fri" />
          <Day dayname="Sat" />
        </View>
      </View>
      <View style={styles.containertwo}>
        <View style={styles.line}></View>
        <ScrollView>
          <View style={styles.progress}>
            <Text style={styles.textone}>My Progress</Text>
          </View>
          <View style={styles.card1}>
            <TouchableOpacity
              //style={styles.loginButton}
              disabled={!request}
              onPress={() => {
                promptAsync();
              }}
            >
              <Image
                source={require("../assets/images/fitbit1.png")}
                //style={styles.fitbit}
              />
            </TouchableOpacity>
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
              />
            </TouchableOpacity>
          </View>
          <View style={styles.card2}>
            <Card
              move="bounceInRight"
              image={require("../assets/images/checktodo.png")}
              title="Completed"
              subtitle="5K out of 10K steps"
              completed="50%"
            />
          </View>
          <View style={styles.card3}>
            <Card2 />
          </View>
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
});
