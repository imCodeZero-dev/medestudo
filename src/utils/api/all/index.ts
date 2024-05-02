import apiRequest from "../../../config/axios";
import { examForm } from "../../constants/DataTypes";

export const sendOtpToEmailApi = async (data: { email: string }) => {
  // console.log("professorLoginApi", data);
  const response = await apiRequest({
    method: "Post",
    url: `/medestudo/otp/sendOtp`,
    data,
  });
  return response;
};

export const verifyOTPApi = async (data: { otp: string; email: string }) => {
  console.log("verifyOTPApi", data);
  const response = await apiRequest({
    method: "Post",
    url: `/medestudo/otp/verifyOtp`,
    data,
  });
  return response;
};

export const resetPasswordApi = async (data: {
  newPassword: string;
  confirmPassword: string;
}) => {
  const response = await apiRequest({
    method: "Post",
    url: `/user/resetPasswordStudent`,
    data,
  });
  return response;
};

export const getAllSubjectsApi = async () => {
  const response = await apiRequest({
    method: "Get",
    url: `/professor/getAllSubjects`,
  });
  return response;
};
