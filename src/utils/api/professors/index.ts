import apiRequest from "../../../config/axios";

export const professorLoginApi = async (data: any) => {
  // console.log("professorLoginApi", data);
  const response = await apiRequest({
    method: "Post",
    url: `/professor/loginProfessor`,
    data,
  });
  return response;
};

export const createClassApi = async (data: any, token: string) => {
  // console.log("professorLoginApi", data);
  const response = await apiRequest({
    method: "Post",
    url: `/professor/createClass`,
    data,
    token,
  });
  return response;
};

export const getAllClassesApi = async (token: string) => {
  // console.log("professorLoginApi", data);
  const response = await apiRequest({
    method: "Get",
    url: `/professor/getAllClass`,
    token,
  });
  return response;
};

export const getClassByIdApi = async (classId: string, token: string) => {
  // console.log("professorLoginApi", data);
  const response = await apiRequest({
    method: "Get",
    url: `/professor/getClassById/${classId}`,
    token,
  });
  return response;
};
