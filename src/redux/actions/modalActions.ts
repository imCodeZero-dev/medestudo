// modalActions.ts
// import { AppDispatch } from "./store";
// import { openModal, closeModal } from "./modalSlice";

import { closeModal, openModal } from "../slices/ModalSlice";
import { AppDispatch } from "../store";

export const openCreateModal = () => (dispatch: AppDispatch) => {
  dispatch(openModal());
};

export const closeCreateModal = () => (dispatch: AppDispatch) => {
  dispatch(closeModal());
};
