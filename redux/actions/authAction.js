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
export const EDIT_USER_SUCCESS = "EDIT_USER_SUCCESS";
export const EDIT_USER_FAIL = "EDIT_USER_FAIL";
export const DAILY_HEALTH_SUCCESS = "DAILY_HEALTH_SUCCESS";
export const DAILY_HEALTH_FAIL = "DAILY_HEALTH_FAIL";

import jwt_decode from "jwt-decode";
import { bool } from "yup";

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
        console.log("LOGIN_USER_SUCCESS");
        let token = await result.json();
        let decodedData = jwt_decode(token);
        console.log("Decoded :", decodedData);
        dispatch({
          type: LOGIN_USER_SUCCESS,
          payload: { decodedData: decodedData, token: token },
        });
        return { decodedData: decodedData, token: token };
      } else {
        console.log("LOGIN_USER_FAIL");
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
        console.log("REGISTER_USER_SUCCESS");
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
        console.log("REGISTER_USER_FAIL");
        dispatch({
          type: REGISTER_USER_FAIL,
        });

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
      // let resultData = await result.json();
      // console.log(JSON.stringify(resultData));
      if (result.status === 200) {
        console.log("200");
        let message = await result.json();

        console.log("Result Data: ", JSON.stringify(message));

        dispatch({
          type: EDIT_USER_SUCCESS,
          payload: { message },
        });
        return { message };
        //return null;
      } else {
        console.log("EDIT_USER_FAIL");
        let message = await result.json();
        dispatch({
          type: EDIT_USER_FAIL,
          payload: { message },
        });

        return { message };
      }
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
      if (fasting === true) {
        fasting = true;
      } else {
        fasting = false;
      }
      //fasting = Boolean(fasting);
      console.log("Token in POST request: ", token);
      console.log("fasting in POST request: ", fasting);
      console.log("glucose level in POST request: ", parseInt(glucose_level));
      const result = await fetch(`${BASE_URL}/api/bg_readings/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify({
          fasting,
          glucose_level: parseInt(glucose_level),
        }),
      });
      // let resultData = await result.json();
      // console.log(resultData);
      if (result.status === 200) {
        //console.log("200");
        let message = await result.json();
        console.log("DAILY_HEALTH_SUCCESS: ", JSON.stringify(message));

        dispatch({
          type: DAILY_HEALTH_SUCCESS,
          payload: { message },
        });
        return { message };
        //return null;
      } else {
        let message = await result.json();
        // console.log("DAILY_HEALTH_SUCCESS: ", );
        console.log("DAILY_HEALTH_FAIL", JSON.stringify(message));
        dispatch({
          type: DAILY_HEALTH_FAIL,
          payload: { message },
        });

        return { message };
      }
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
      console.log("Token in POST request: ", token);

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
        console.log("WEEKLY_SUBMISSION_SUCCESS");
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
        let weeklySubmissions = await result.json();
        console.log("WEEKLY_SUBMISSION_FAIL", weeklySubmissions);
        dispatch({
          type: WEEKLY_SUBMISSION_FAIL,
        });

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
        console.log("WEEKLY_SUMMARY_SUCCESS");
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
        console.log("WEEKLY_SUMMARY_FAIL");
        dispatch({
          type: WEEKLY_SUMMARY_FAIL,
        });

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
        console.log("CALORIES_SUCCESS");
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
        let calories = await result.json();
        console.log("CALORIES_FAIL: ", calories);
        dispatch({
          type: CALORIES_FAIL,
        });

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
        console.log("STEPS_SUCCESS");
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
        let steps = await result.json();
        console.log("STEPS_FAIL", steps);
        dispatch({
          type: STEPS_FAIL,
        });

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
        console.log("ME_SUCCESS");
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
        console.log("ME_FAIL");
        dispatch({
          type: ME_FAIL,
        });

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
        console.log("ACTIVITIES_SUCCESS");
        let lifetimeActivities = await result.json();
        //console.log("lifetime Activities :", lifetimeActivities);
        dispatch({
          type: ACTIVITIES_SUCCESS,
          payload: { lifetimeActivities: lifetimeActivities },
        });
        return { lifetimeActivities: lifetimeActivities };
      } else {
        console.log("ACTIVITIES_FAIL");
        dispatch({
          type: ACTIVITIES_FAIL,
        });

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
        console.log("TODAY_ACTIVITIES_SUCCESS");
        let todayActivities = await result.json();
        //console.log("today Activities :", todayActivities);
        dispatch({
          type: TODAY_ACTIVITIES_SUCCESS,
          payload: { todayActivities: todayActivities },
        });
        return { todayActivities: todayActivities };
      } else {
        console.log("TODAY_ACTIVITIES_FAIL");
        dispatch({
          type: TODAY_ACTIVITIES_FAIL,
        });

        return null;
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const revokeFitbit = (token) => {
  console.log("Fitbit token in auth action:", token);
  return async (dispatch) => {
    try {
      const formData = new FormData();
      formData.append("token", token);

      const result = await fetch(`https://api.fitbit.com/oauth2/revoke`, {
        method: "POST",
        headers: {
          Authorization: `Basic MjJDNUJEOjU1ZTVjMmU0OTFlYmJlZWVmOGQ2NTIwM2UxOGJiZTM4`,
          // Authorization: `Basic MjJDNVZEOmU0MjVmNzk4ZDhjNWE4NzA5OTVmNWM4NmQ5ZTQxMTkw`,
        },
        body: formData,
      });

      let revoke = await result.json();
      console.log("Revoke :", revoke);
      // if (result.status === 200) {
      //   console.log("TODAY_ACTIVITIES_SUCCESS");
      //   let todayActivities = await result.json();
      //   //console.log("today Activities :", todayActivities);
      //   dispatch({
      //     type: TODAY_ACTIVITIES_SUCCESS,
      //     payload: { todayActivities: todayActivities },
      //   });
      //   return { todayActivities: todayActivities };
      // } else {
      //   console.log("TODAY_ACTIVITIES_FAIL");
      //   dispatch({
      //     type: TODAY_ACTIVITIES_FAIL,
      //   });

      //   return null;
      // }
    } catch (error) {
      console.error(error);
    }
  };
};
