export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS";
export const REGISTER_USER_FAIL = "REGISTER_USER_FAIL";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAIL = "LOGIN_USER_FAIL";
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
  target_glucoce_level,
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
          target_glucoce_level,
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
