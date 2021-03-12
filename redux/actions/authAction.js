export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS";
export const REGISTER_USER_FAIL = "REGISTER_USER_FAIL";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAIL = "LOGIN_USER_FAIL";
export const WEEKLY_SUBMISSION_SUCCESS = "WEEKLY_SUBMISSION_SUCCESS";
export const WEEKLY_SUBMISSION_FAIL = "WEEKLY_SUBMISSION_FAIL";
export const WEEKLY_SUMMARY_SUCCESS = "WEEKLY_SUMMARY_SUCCESS";
export const WEEKLY_SUMMARY_FAIL = "WEEKLY_SUMMARY_FAIL";

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
        console.log("200");
        let weeklySubmissions = await result.json();
        //let header = result.headers.get("X-Auth-Token");
        console.log("Result Data: ", JSON.stringify(weeklySubmissions));
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
      console.log("Token in POST request: ", token);

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
        let summary = await result.text();
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
