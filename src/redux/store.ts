// src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import languageReducer from "./slices/languageSlice";
import CreateClassModalSlice from "./slices/CreateClassModalSlice";
import CreateExamModalSlice from "./slices/CreateExamModalSlice";
// import professorsReducer from "./slices/ProfessorSlice";
// import modalReducer from "./slices/CreateClassModalSlice";

const store = configureStore({
  reducer: {
    language: languageReducer,
    modalCreateClass: CreateClassModalSlice,
    modalCreateExam: CreateExamModalSlice,
    // professors: professorsReducer,
    // Add other reducers here
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
