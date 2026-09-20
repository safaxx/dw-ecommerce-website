import axios from "axios";
import {
  LOAD_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER_REQUEST,
  REGISTER_USER_FAIL,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_REQUEST,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  CLEAR_ERRORS,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
} from "../constants/UserConstants";
import { clearCart, loadCart } from "./CartActions";
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_USER_REQUEST });
    const { data } = await axios.post(
      "/api/v1/user/login",
      { email, password },
      { withCredentials: true }
    );
    dispatch({ type: LOGIN_USER_SUCCESS, payload: data.user });
    dispatch(loadCart());
  } catch (error) {
    dispatch({
      type: LOGIN_USER_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });
    const { data } = await axios.post("/api/v1/user/register", userData, {
      withCredentials: true,
    });
    dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
    dispatch(loadCart());
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: LOGOUT_USER_REQUEST });
    await axios.get("/api/v1/user/logout", { withCredentials: true });
    dispatch({ type: LOGOUT_USER_SUCCESS });
    dispatch(clearCart());
  } catch (error) {
    dispatch({
      type: LOGOUT_USER_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });
    const { data } = await axios.get("/api/v1/user/my-account", {
      withCredentials: true,
    });
    dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
    dispatch(loadCart());
  } catch (error) {
    dispatch({ type: LOAD_USER_FAIL });
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });
    const { data } = await axios.post(
      "/api/v1/user/forgot-password",
      { email },
      { withCredentials: true }
    );
    dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const resetPassword = (token, passwords) => async (dispatch) => {
  try {
    dispatch({ type: RESET_PASSWORD_REQUEST });
    const { data } = await axios.put(
      `/api/v1/user/reset-password/${token}`,
      passwords,
      { withCredentials: true }
    );
    dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const updatePassword = (passwords) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });
    const { data } = await axios.put(
      `/api/v1/user/update-password`,
      passwords,
      { withCredentials: true }
    );
    dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type:UPDATE_PASSWORD_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });
    const { data } = await axios.put(
      `/api/v1/user/my-account/update`,
      userData,
      { withCredentials: true }
    );
    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type:UPDATE_PROFILE_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
