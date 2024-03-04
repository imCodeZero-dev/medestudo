// toastUtils.js

import { toast } from "react-toastify";

const showToast = (message:string, type:any) => {
  toast[type](message, { position: "top-right" });
};

export const showSuccessToast = (message) => showToast(message, "success");
export const showErrorToast = (message) => showToast(message, "error");
export const showWarningToast = (message) => showToast(message, "warning");
export const showInfoToast = (message) => showToast(message, "info");
