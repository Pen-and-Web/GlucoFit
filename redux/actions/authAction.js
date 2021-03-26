export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS";
export const REGISTER_USER_FAIL = "REGISTER_USER_FAIL";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAIL = "LOGIN_USER_FAIL";
export const WEEKLY_SUBMISSION_SUCCESS = "WEEKLY_SUBMISSION_SUCCESS";
export const WEEKLY_SUBMISSION_FAIL = "WEEKLY_SUBMISSION_FAIL";
export const WEEKLY_SUMMARY_SUCCESS = "WEEKLY_SUMMARY_SUCCESS";
export const WEEKLY_SUMMARY_FAIL = "WEEKLY_SUMMARY_FAIL";
export const CALORIES_SUCCESS = "CALORIES_SUCCESS";
export const CALORIES_FAIL = "CALORIES_FAIL";
export const STEPS_SUCCESS = "STEPS_SUCCESS";
export const STEPS_FAIL = "STEPS_FAIL";
export const ME_SUCCESS = "ME_SUCCESS";
export const ME_FAIL = "ME_FAIL";
export const ACTIVITIES_SUCCESS = "ACTIVITIES_SUCCESS";
export const ACTIVITIES_FAIL = "ACTIVITIES_FAIL";
export const TODAY_ACTIVITIES_SUCCESS = "TODAY_ACTIVITIES_SUCCESS";
export const TODAY_ACTIVITIES_FAIL = "TODAY_ACTIVITIES_FAIL";

import jwt_decode from "jwt-decode";

const BASE_URL = "https://gentle-ravine-47650.herokuapp.com";

export const loginUser = ({ email, password }) => {
  return async (dispatch) => {
    // logic to make a post to LOGIN the user

    try {
      const result = await fetch(`${BASE_URL}/api/auth`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (result.status === 200) {
        console.log("200");
        let token = await result.json();
        let decodedData = jwt_decode(token);
        console.log("Decoded :", decodedData);
        dispatch({
          type: LOGIN_USER_SUCCESS,
          payload: { decodedData: decodedData, token: token },
        });
        return { decodedData: decodedData, token: token };
      } else {
        console.log("400");
        dispatch({
          type: LOGIN_USER_FAIL,
        });
        return null;
      }
    } catch (error) {
      console.error(error);
    }

    // const resultData = JSON.stringify(result);
    // console.log(resultData);
  };
};

export const registerUser = ({ fullname, email, password }) => {
  return async (dispatch) => {
    // logic to make a post to REGISTER the user

    try {
      // const result = await fetch(
      //   `http://192.168.100.102:3000/api/users/register`,

      const result = await fetch(`${BASE_URL}/api/users/register`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname,
          email,
          password,
        }),
      });
      //console.log(await result.json());
      if (result.status === 200) {
        console.log("200");
        let resultData = await result.json();
        let header = result.headers.get("X-Auth-Token");
        console.log("Result Data: ", JSON.stringify(resultData));
        console.log("Header: ", header);
        dispatch({
          type: REGISTER_USER_SUCCESS,
          payload: { resultData: resultData, token: header },
        });
        return { resultData: resultData, token: header };
        //return null;
      } else {
        console.log("400");
        dispatch({
          type: REGISTER_USER_FAIL,
        });
        console.log("REGISTER FAIL");
        return null;
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const editUser = ({
  // fullname,
  // email,
  // password,
  diabetic_type,
  target_glucose_level,
  isStudent,
  insulinDependent,
  dailyStepGoal,
  weeklyBGSubmissionGoal,
  token,
}) => {
  return async (dispatch) => {
    // logic to make a post to REGISTER the user
    try {
      // const result = await fetch(
      //   `http://192.168.100.102:3000/api/users/register`,
      console.log("Token in PATCH request: ", token);
      const result = await fetch(`${BASE_URL}/api/users/register`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify({
          // fullname,
          // email,
          // password,
          diabetic_type,
          target_glucose_level,
          isStudent,
          insulinDependent,
          dailyStepGoal,
          weeklyBGSubmissionGoal,
        }),
      });
      let resultData = await result.json();
      console.log(JSON.stringify(resultData));
      // if (result.status === 200) {
      //   console.log("200");
      //   let resultData = await result.json();
      //   let header = result.headers.get("X-Auth-Token");
      //   console.log("Result Data: ", JSON.stringify(resultData));
      //   console.log("Header: ", header);
      //   dispatch({
      //     type: REGISTER_USER_SUCCESS,
      //     payload: { resultData: resultData, token: header },
      //   });
      //   return { resultData: resultData, token: header };
      //   //return null;
      // } else {
      //   console.log("400");
      //   dispatch({
      //     type: REGISTER_USER_FAIL,
      //   });
      //   console.log("REGISTER FAIL");
      //   return null;
      // }
    } catch (error) {
      console.error(error);
    }
  };
};

export const resetPassword = ({ email }) => {
  return async (dispatch) => {
    // logic to make a post to LOGIN the user

    try {
      const result = await fetch(`${BASE_URL}/api/auth/recover`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });
      console.log(await result.json());

      // if (result.status === 200) {
      //   console.log("200");
      //   let token = await result.json();
      //   let decodedData = jwt_decode(token);
      //   console.log("Decoded :", decodedData);
      //   dispatch({
      //     type: LOGIN_USER_SUCCESS,
      //     payload: { decodedData: decodedData, token: token },
      //   });
      //   return { decodedData: decodedData, token: token };
      // } else {
      //   console.log("400");
      //   dispatch({
      //     type: LOGIN_USER_FAIL,
      //   });
      //   return null;
      // }
    } catch (error) {
      console.error(error);
    }

    // const resultData = JSON.stringify(result);
    // console.log(resultData);
  };
};

export const dailyHealth = ({ glucose_level, fasting, token }) => {
  return async (dispatch) => {
    // logic to make a post to REGISTER the user
    try {
      // const result = await fetch(
      //   `http://192.168.100.102:3000/api/users/register`,
      console.log("Token in POST request: ", token);
      console.log("fasting in POST request: ", fasting);
      console.log("glucose level in POST request: ", glucose_level);
      const result = await fetch(`${BASE_URL}/api/bg_readings/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify({
          glucose_level,
          fasting,
        }),
      });
      let resultData = await result.json();
      console.log(JSON.stringify(resultData));
      // if (result.status === 200) {
      //   console.log("200");
      //   let resultData = await result.json();
      //   let header = result.headers.get("X-Auth-Token");
      //   console.log("Result Data: ", JSON.stringify(resultData));
      //   console.log("Header: ", header);
      //   dispatch({
      //     type: REGISTER_USER_SUCCESS,
      //     payload: { resultData: resultData, token: header },
      //   });
      //   return { resultData: resultData, token: header };
      //   //return null;
      // } else {
      //   console.log("400");
      //   dispatch({
      //     type: REGISTER_USER_FAIL,
      //   });
      //   console.log("REGISTER FAIL");
      //   return null;
      // }
    } catch (error) {
      console.error(error);
    }
  };
};

export const weeklySubmissions = (token) => {
  return async (dispatch) => {
    // logic to make a post to REGISTER the user
    try {
      // const result = await fetch(
      //   `http://192.168.100.102:3000/api/users/register`,
      //console.log("Token in POST request: ", token);

      const result = await fetch(
        `${BASE_URL}/api/bg_readings/weekly_submissions`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        }
      );
      // let resultData = await result.json();
      // console.log(JSON.stringify(resultData));
      if (result.status === 200) {
        console.log("200");
        let weeklySubmissions = await result.json();
        //let header = result.headers.get("X-Auth-Token");
        //console.log("Result Data: ", JSON.stringify(weeklySubmissions));
        //console.log("Header: ", header);
        dispatch({
          type: WEEKLY_SUBMISSION_SUCCESS,
          payload: { weeklySubmissions },
        });
        return { weeklySubmissions };
        //return null;
      } else {
        console.log("400");
        dispatch({
          type: WEEKLY_SUBMISSION_FAIL,
        });
        console.log("REGISTER FAIL");
        return null;
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const weeklySummary = (token) => {
  return async (dispatch) => {
    // logic to make a post to REGISTER the user
    try {
      // const result = await fetch(
      //   `http://192.168.100.102:3000/api/users/register`,
      //console.log("Token in POST request: ", token);

      const result = await fetch(`${BASE_URL}/api/summary`, {
        method: "GET",
        headers: {
          Accept: "text/csv;charset=utf-8",
          "Content-Type": "text/csv;charset=utf-8",
          "x-auth-token": token,
        },
      });
      // let resultData = await result.json();
      // console.log(JSON.stringify(resultData));
      if (result.status === 200) {
        console.log("200");
        let summary = await result.json();
        //let header = result.headers.get("X-Auth-Token");
        //console.log("Weekly Summary: ",summary);
        //console.log("Header: ", header);
        dispatch({
          type: WEEKLY_SUMMARY_SUCCESS,
          payload: { summary: summary },
        });
        return { summary: summary };
        //return null;
      } else {
        console.log("400");
        dispatch({
          type: WEEKLY_SUMMARY_FAIL,
        });
        console.log("REGISTER FAIL");
        return null;
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const caloriesBurnt = (token) => {
  return async (dispatch) => {
    // logic to make a post to REGISTER the user
    try {
      // const result = await fetch(
      //   `http://192.168.100.102:3000/api/users/register`,
      //console.log("Token in POST request: ", token);

      const result = await fetch(`${BASE_URL}/api/activity/todays_calories`, {
        method: "GET",
        headers: {
          "x-auth-token": token,
        },
      });
      // let resultData = await result.json();
      // console.log(JSON.stringify(resultData));
      if (result.status === 200) {
        console.log("200");
        let calories = await result.json();
        //let header = result.headers.get("X-Auth-Token");
        //console.log("Weekly Summary: ",summary);
        //console.log("Header: ", header);
        dispatch({
          type: CALORIES_SUCCESS,
          payload: { calories: calories },
        });
        return { calories: calories };
        //return null;
      } else {
        console.log("400");
        dispatch({
          type: CALORIES_FAIL,
        });
        console.log("REGISTER FAIL");
        return null;
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const dailySteps = (token) => {
  return async (dispatch) => {
    // logic to make a post to REGISTER the user
    try {
      // const result = await fetch(
      //   `http://192.168.100.102:3000/api/users/register`,
      //console.log("Token in POST request: ", token);

      const result = await fetch(`${BASE_URL}/api/activity/todays_steps`, {
        method: "GET",
        headers: {
          "x-auth-token": token,
        },
      });
      // let resultData = await result.json();
      // console.log(JSON.stringify(resultData));
      if (result.status === 200) {
        console.log("200");
        let steps = await result.json();
        //let header = result.headers.get("X-Auth-Token");
        //console.log("Weekly Summary: ",summary);
        //console.log("Header: ", header);
        dispatch({
          type: STEPS_SUCCESS,
          payload: { steps: steps },
        });
        return { steps: steps };
        //return null;
      } else {
        console.log("400");
        dispatch({
          type: STEPS_FAIL,
        });
        console.log("REGISTER FAIL");
        return null;
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const me = (token) => {
  return async (dispatch) => {
    // logic to make a post to REGISTER the user
    try {
      // const result = await fetch(
      //   `http://192.168.100.102:3000/api/users/register`,
      //console.log("Token in POST request: ", token);

      const result = await fetch(`${BASE_URL}/api/users/me`, {
        method: "GET",
        headers: {
          "x-auth-token": token,
        },
      });
      // let resultData = await result.json();
      // console.log(JSON.stringify(resultData));
      if (result.status === 200) {
        console.log("200");
        let me = await result.json();
        //let header = result.headers.get("X-Auth-Token");
        //console.log("Weekly Summary: ",summary);
        //console.log("Header: ", header);
        dispatch({
          type: ME_SUCCESS,
          payload: { me: me },
        });
        return { me: me };
        //return null;
      } else {
        console.log("400");
        dispatch({
          type: ME_FAIL,
        });
        console.log("REGISTER FAIL");
        return null;
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const lifetimeActivities = (token, id) => {
  return async (dispatch) => {
    try {
      const result = await fetch(
        `https://api.fitbit.com/1/user/${id}/activities.json`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (result.status === 200) {
        console.log("200");
        let lifetimeActivities = await result.json();
        //console.log("lifetime Activities :", lifetimeActivities);
        dispatch({
          type: ACTIVITIES_SUCCESS,
          payload: { lifetimeActivities: lifetimeActivities },
        });
        return { lifetimeActivities: lifetimeActivities };
      } else {
        console.log("400");
        dispatch({
          type: ACTIVITIES_FAIL,
        });
        console.log("REGISTER FAIL");
        return null;
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const todayActivities = (token, id) => {
  return async (dispatch) => {
    try {
      const result = await fetch(
        `https://api.fitbit.com/1/user/${id}/activities/date/today.json`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (result.status === 200) {
        console.log("200");
        let todayActivities = await result.json();
        //console.log("today Activities :", todayActivities);
        dispatch({
          type: TODAY_ACTIVITIES_SUCCESS,
          payload: { todayActivities: todayActivities },
        });
        return { todayActivities: todayActivities };
      } else {
        console.log("400");
        dispatch({
          type: TODAY_ACTIVITIES_FAIL,
        });
        console.log("REGISTER FAIL");
        return null;
      }
    } catch (error) {
      console.error(error);
    }
  };
};
