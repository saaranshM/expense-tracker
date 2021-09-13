import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

interface UserType {
  firstName: string;
  lastName?: string;
  email: string;
  userId: string;
}
interface UserState {
  user: UserType;
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  user: {
    firstName: "",
    lastName: "",
    email: "",
    userId: "",
  },
  isLoggedIn: false,
  isError: false,
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
    setIsError: (state, action: PayloadAction<boolean>) => {
      state.isError = action.payload;
    },
  },
});

export const { setUser, setIsFetching, setIsError, setIsSuccess } =
  userSlice.actions;

export const userSelector = (state: RootState) => state.user;

export default userSlice.reducer;
