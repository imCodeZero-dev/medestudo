// src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import languageReducer from "./slices/languageSlice";
// import professorsReducer from "./slices/ProfessorSlice";
import modalReducer from "./slices/ModalSlice";

const store = configureStore({
  reducer: {
    language: languageReducer,
    modal: modalReducer,
    // professors: professorsReducer,
    // Add other reducers here
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
