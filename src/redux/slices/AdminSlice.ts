import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { useCookies } from "react-cookie";

interface AdminState {
  username: string;
}

const AdminSlice = createSlice({
  name: "admin",
  initialState: null as AdminState | null,
  reducers: {
    loginAdmin: (state: any, action: PayloadAction<AdminState>) => {
      return action.payload;
    },
    logoutAdmin: (state: any) => {
      return null;
    },
  },
});

export const { loginAdmin, logoutAdmin } = AdminSlice.actions;
export default AdminSlice.reducer;
