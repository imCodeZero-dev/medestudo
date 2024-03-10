
// import { toast } from "react-toastify";

// const showToast = (message: string, type: any) => {
//   toast[type](message, { position: "top-right" });
// };

// export const showSuccessToast = (message) => showToast(message, "success");
// export const showErrorToast = (message) => showToast(message, "error");
// export const showWarningToast = (message) => showToast(message, "warning");
// export const showInfoToast = (message) => showToast(message, "info");


import { toast, ToastPosition } from "react-toastify";

type ToastType = "success" | "error" | "warning" | "info";

const showToast = (message: string, type: ToastType, position: ToastPosition) => {
  toast[type](message, { position });
};

export const showSuccessToast = (message: string, position: ToastPosition = "top-right") =>
  showToast(message, "success", position);

export const showErrorToast = (message: string, position: ToastPosition = "top-right") =>
  showToast(message, "error", position);

export const showWarningToast = (message: string, position: ToastPosition = "top-right") =>
  showToast(message, "warning", position);

export const showInfoToast = (message: string, position: ToastPosition = "top-right") =>
  showToast(message, "info", position);
