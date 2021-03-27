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
  ME_SUCCESS,
  ME_FAIL,
  ACTIVITIES_SUCCESS,
  ACTIVITIES_FAIL,
  TODAY_ACTIVITIES_SUCCESS,
  TODAY_ACTIVITIES_FAIL,
  DAILY_HEALTH_FAIL,
  DAILY_HEALTH_SUCCESS,
  EDIT_USER_FAIL,
  EDIT_USER_SUCCESS,
} from "../actions/authAction";

const initialState = {
  user: {},
  errors: {},
  summary: {},
  weeklySubmissions: {},
  calories: {},
  steps: {},
  me: {},
  lifetimeActivities: {},
  todayActivities: {},
  editUser: {},
  dailyHealth: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case REGISTER_USER_SUCCESS:
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
    case ME_SUCCESS:
      return {
        ...state,
        me: action.payload,
      };
    case ME_FAIL:
      return {
        ...state,
        errors: true,
      };
    case ACTIVITIES_SUCCESS:
      return {
        ...state,
        lifetimeActivities: action.payload,
      };
    case ACTIVITIES_FAIL:
      return {
        ...state,
        errors: true,
      };
    case TODAY_ACTIVITIES_SUCCESS:
      return {
        ...state,
        todayActivities: action.payload,
      };
    case TODAY_ACTIVITIES_FAIL:
      return {
        ...state,
        errors: true,
      };
    case EDIT_USER_SUCCESS:
      return {
        ...state,
        editUser: action.payload,
      };
    case EDIT_USER_FAIL:
      return {
        ...state,
        errors: true,
      };
    case DAILY_HEALTH_SUCCESS:
      return {
        ...state,
        dailyHealth: action.payload,
      };
    case DAILY_HEALTH_FAIL:
      return {
        ...state,
        errors: true,
      };
  }

  return state;
}
