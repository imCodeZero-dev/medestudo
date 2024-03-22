import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { useCookies } from "react-cookie";

interface ProfessorState {
  username: string;
}

const ProfessorSlice = createSlice({
  name: "professor",
  initialState: null as ProfessorState | null,
  reducers: {
    loginProfessor: (state: any, action: PayloadAction<ProfessorState>) => {
      return action.payload;
    },
    logoutProfessor: (state: any) => {
      return null;
    },
  },
});

export const { loginProfessor, logoutProfessor } = ProfessorSlice.actions;
export default ProfessorSlice.reducer;
