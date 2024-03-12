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
  const response = await apiRequest({
    method: "Post",
    url: "/admin/createProfessor",
    data,
    token,
  });
  return response;
};

export const getAllProfessorApi = async (token: string) => {
  console.log("getAllProfessorApi", token);
  const response = await apiRequest({
    method: "Get",
    url: `/admin/professor/getAll`,
    token,
  });
  return response;
};

export const changeProfessorStatusApi = async (
  data: any,
  professorId: string,
  token: string
) => {
  console.log("changeProfessorStatusApi", data, "professorId", professorId);
  const response = await apiRequest({
    method: "Put",
    url: `/admin/updateProfessorstatus/${professorId}`,
    data,
    token,
  });
  return response;
};

export const changeStudentStatusApi = async (
  data: any,
  studentId: string,
  token: string
) => {
  console.log("changeStudentStatusApi", data, "token", token);
  const response = await apiRequest({
    method: "Put",
    url: `/admin/updateUserstatus/:${studentId}`,
    data,
    token,
  });
  return response;
};



export const createDeckApi = async (data: any, token: string) => {
  const response = await apiRequest({
    method: "Post",
    url: "/admin/createDeck",
    data,
    token,
  });
  return response;
};