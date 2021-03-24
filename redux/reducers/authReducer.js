import {
  REGISTER_USER_SUCCESS,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  REGISTER_USER_FAIL,
  WEEKLY_SUBMISSION_SUCCESS,
  WEEKLY_SUBMISSION_FAIL,
  WEEKLY_SUMMARY_SUCCESS,
  WEEKLY_SUMMARY_FAIL,
  CALORIES_SUCCESS,
  CALORIES_FAIL,
  STEPS_SUCCESS,
  STEPS_FAIL,
} from "../actions/authAction";

const initialState = {
  user: {},
  errors: {},
  summary: {},
  weeklySubmissions: {},
  calories: {},
  steps: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case REGISTER_USER_SUCCESS:
      //console.log({ user: JSON.parse(action.payload) }, "resturning");
      return {
        ...state,
        user: action.payload,
      };
    case REGISTER_USER_FAIL:
      return {
        ...state,
        errors: true,
      };
    case LOGIN_USER_SUCCESS:
      // console.log({ ...state, user: action.payload }, "resturning");
      return {
        ...state,
        user: action.payload,
      };
    case LOGIN_USER_FAIL:
      return {
        ...state,
        errors: true,
      };
    case WEEKLY_SUBMISSION_SUCCESS:
      return {
        ...state,
        weeklySubmissions: action.payload,
      };
    case WEEKLY_SUBMISSION_FAIL:
      return {
        ...state,
        errors: true,
      };
    case WEEKLY_SUMMARY_SUCCESS:
      return {
        ...state,
        summary: action.payload,
      };
    case WEEKLY_SUMMARY_FAIL:
      return {
        ...state,
        errors: true,
      };
    case CALORIES_SUCCESS:
      return {
        ...state,
        calories: action.payload,
      };
    case CALORIES_FAIL:
      return {
        ...state,
        errors: true,
      };
    case STEPS_SUCCESS:
      return {
        ...state,
        steps: action.payload,
      };
    case STEPS_FAIL:
      return {
        ...state,
        errors: true,
      };
  }

  return state;
}
