// modalActions.ts
// import { AppDispatch } from "./store";
// import { openModal, closeModal } from "./modalSlice";

import { closeModal, openModal } from "../slices/CreateClassModalSlice";
import { closeModal2, openModal2 } from "../slices/CreateExamModalSlice";
import { AppDispatch } from "../store";

export const openCreateModalClass = () => (dispatch: AppDispatch) => {
  dispatch(openModal());
};

export const closeCreateModalClass = () => (dispatch: AppDispatch) => {
  dispatch(closeModal());
};

export const openCreateModalExam = () => (dispatch: AppDispatch) => {
  dispatch(openModal2());
};

export const closeCreateModalExam = () => (dispatch: AppDispatch) => {
  dispatch(closeModal2());
};
