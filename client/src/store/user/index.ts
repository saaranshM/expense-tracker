import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

interface UserType {
  firstName: string;
  lastName: string;
  email: string;
  userId: string;
}
interface UserState {
  user: UserType;
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
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserType>) => {
      const userPayload = action.payload;
      state.user = userPayload;
    },
  },
});

export const { setUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;
export const selectIsLoggedIn = (state: RootState) => state.user.isLoggedIn;

export default userSlice.reducer;
