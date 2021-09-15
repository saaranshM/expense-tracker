import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

interface UserType {
  firstName: string;
  lastName?: string;
  email: string;
}
interface UserState {
  user: UserType;
  isFetching: boolean;
  isSuccess: boolean;
  isError: string | undefined | null;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  user: {
    firstName: "",
    lastName: "",
    email: "",
  },
  isLoggedIn: false,
  isError: null,
  isFetching: false,
  isSuccess: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserType>) => {
      const userPayload = action.payload;
      state.user = userPayload;
    },
    setIsFetching: (state, action: PayloadAction<boolean>) => {
      state.isFetching = action.payload;
    },
    setIsSuccess: (state, action: PayloadAction<boolean>) => {
      state.isSuccess = action.payload;
    },
    setIsError: (state, action: PayloadAction<string>) => {
      state.isError = action.payload;
    },
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const {
  setUser,
  setIsFetching,
  setIsError,
  setIsSuccess,
  setIsLoggedIn,
} = userSlice.actions;

export const userSelector = (state: RootState) => state.user;

export default userSlice.reducer;
