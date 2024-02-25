import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { useCookies } from "react-cookie";

interface UserState {
  username: string;
}

const userSlice = createSlice({
  name: "user",
  initialState: null as UserState | null,
  reducers: {
    loginUser: (state, action: PayloadAction<UserState>) => {
      return action.payload;
    },
    logoutUser: (state) => {
      return null;
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
