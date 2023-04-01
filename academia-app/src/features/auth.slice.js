import { createSlice } from "@reduxjs/toolkit";
import AuthStore from "../services/authStore";

const payload = AuthStore.getData();
const initState = {
  isLogin: payload ? true : false,
  payload: payload || {},
  error: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState: initState,
  reducers: {
    resetState: (state) => {
      AuthStore.removeStore();
      return {
        isLogin: false,
        payload: {},
        error: "",
      };
    },
    loginSuccess: (state, { payload }) => {
      state.isLogin = true;
      state.payload = payload;
      AuthStore.setStore(payload);
    },
    loginFaild: (state, { payload }) => {
      state.isLogin = false;
      state.error = payload;
    },
  },
});

export const { resetState, loginSuccess, loginFaild } = authSlice.actions;
export default authSlice.reducer;
