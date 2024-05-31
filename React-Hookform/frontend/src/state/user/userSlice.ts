import {  PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { StringValidation } from "zod";

interface UserState {
  id: string;
  isLogin: boolean;
  jwt : string;
  result: String;
}

const initialState: UserState = {
  id: "",
  isLogin: false,
  jwt: "",
  result: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.id = "";
      state.isLogin = false;
      state.jwt = "";
      state.result = "";
    },
    clrResult: (state) => {
      state.result = "";
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, () => {
        console.log("login pending ...");
      })
      .addCase(
        loginAsync.fulfilled,
        (state, action: PayloadAction<object>) => {
          console.log(action.payload);
          state.id = action.payload.id;
          state.isLogin = action.payload.isLogin;
          state.jwt = action.payload.jwt;
          state.result = action.payload.result;
        }
      )
      .addCase(createAsync.pending, () => {
        console.log("create pending ...");
      })
      .addCase(
        createAsync.fulfilled,
        (state, action: PayloadAction<object>) => {
          console.log(action.payload);
          state.id = action.payload.id;
          state.isLogin = action.payload.isLogin;
          state.jwt = action.payload.jwt;
          state.result = action.payload.result;
        }
      );
  },
  
});

export const loginAsync = createAsyncThunk(
  "user/loginAsync",
  async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const response = await fetch("/auth/login",{
      method: "POST",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      }, 
      body: JSON.stringify(data),
    });
    
    const res=await response.json();

    if (response.ok) {
      const arrayToken = res.jwtToken.split('.');
      const tokenPayload = JSON.parse(atob(arrayToken[1]));
      return({
        "id": tokenPayload.userId,
        "isLogin": true, 
        "jwt": res.jwtToken,
        "result" : ""
      });
    } else {
      return({
        "id": "",
        "isLogin": false, 
        "jwt": "",
        "result" : "Login failure"
      });
    }

  }
);

export const createAsync = createAsyncThunk(
  "user/createAsync",
  async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const response = await fetch("/auth/create",{
      method: "POST",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      }, 
      body: JSON.stringify(data),
    });
    
    const res=await response.json();

    if (response.status === 201) {
       return({
        "id": res.userId,
        "isLogin": false, 
        "jwt": "",
        "result": "User created"
      });
    } else {
      return({
        "id": "",
        "isLogin": false, 
        "jwt": "",
        "result": "User creation failure"
      });
    }

  }
);

export const { logout, clrResult } = userSlice.actions;

export default userSlice.reducer;