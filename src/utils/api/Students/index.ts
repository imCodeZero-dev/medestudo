import apiRequest from "../../../config/axios";
import { examForm } from "../../constants/DataTypes";

export const studentRegistrationApi = async (data: any) => {
  // console.log("studentRegistrationApi", data);
  const response = await apiRequest({
    method: "Post",
    url: `/user/registerStudent`,
    data,
  });
  return response;
};

export const studentLoginApi = async (data: any) => {
  // console.log("studentLoginApi", data);
  const response = await apiRequest({
    method: "Post",
    url: `/user/loginStudent`,
    data,
  });
  return response;
};

export const studentUpdateSurveyApi = async (data: any, token: string) => {
  // console.log("studentUpdateSurveyApi", data);
  const response = await apiRequest({
    method: "Put",
    url: `/user/updateDetails`,
    data,
    token,
  });
  return response;
};

export const studentGetAllClassesApi = async (token: string) => {
  // console.log("studentGetAllClassesApi");
  const response = await apiRequest({
    method: "Get",
    url: `/user/allClasses`,
    token,
  });
  return response;
};

export const getAllDecksByIdApi = async (classId: string, token: string) => {
  // console.log("getAllDecksByIdApi", classId);
  const response = await apiRequest({
    method: "Get",
    url: `/user/allDecks/${classId}`,
    token,
  });
  return response;
};

export const getAllCardsByIdApi = async (id: string, token: string) => {
  console.log("getAllCardsByIdApi", id);
  const response = await apiRequest({
    method: "Get",
    url: `/user/allCards/${id}`,
    token,
  });
  return response;
};

export const provideRateToCardApi = async (data: any, token: string) => {
  console.log("provideRateToCardApi", data, "token", token);
  const response = await apiRequest({
    method: "Post",
    url: `/user/rating`,
    data,
    token,
  });
  return response;
};