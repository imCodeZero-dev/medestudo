import apiRequest from "../../../config/axios";
import { examForm } from "../../constants/DataTypes";

export const studentRegistrationApi = async (data: any) => {
  console.log("studentRegistrationApi", data);
  const response = await apiRequest({
    method: "Post",
    url: `/user/registerStudent`,
    data,
  });
  return response;
};

export const studentLoginApi = async (data: any) => {
  console.log("studentLoginApi", data);
  const response = await apiRequest({
    method: "Post",
    url: `/user/loginStudent`,
    data,
  });
  return response;
};
