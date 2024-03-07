import apiRequest from "../../../config/axios";

export const adminLoginApi = async (data: any) => {
  // console.log("userLoginApi", data);
  const response = await apiRequest({
    method: "Post",
    url: "/admin/loginAdmin",
    data,
  });
  return response;
};

export const createProfessorApi = async (data: any, token: string) => {
  console.log("createProfessorApi", data, "token", token);
  const response = await apiRequest({
    method: "Post",
    url: "/admin/createProfessor",
    data,
    token,
  });
  return response;
};
