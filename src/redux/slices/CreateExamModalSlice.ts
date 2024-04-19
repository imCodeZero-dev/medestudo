import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};

const modalSlice = createSlice({
  name: "createExammodal",
  initialState,
  reducers: {
    openModal2: (state) => {
      state.isOpen = true;
    },
    closeModal2: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openModal2, closeModal2 } = modalSlice.actions;
export default modalSlice.reducer;
