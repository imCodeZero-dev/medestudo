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

export const getAllStudentsApi = async (token: string) => {
  const response = await apiRequest({
    method: "Get",
    url: `/admin/student/getAll`,
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
  const response = await apiRequest({
    method: "Put",
    url: `/admin/updateUserstatus/${studentId}`,
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

export const createTagApi = async (data: any, token: string) => {
  const response = await apiRequest({
    method: "Post",
    url: `/admin/createTag`,
    data,
    token,
  });
  return response;
};

export const getAllTagsApi = async (token: string) => {
  const response = await apiRequest({
    method: "Get",
    url: `/admin/getAllTag`,
    token,
  });
  return response;
};

export const editTagApi = async (data: any, tagId: string, token: string) => {
  const response = await apiRequest({
    method: "Patch",
    url: `/admin/editTag/${tagId}`,
    data,
    token,
  });
  return response;
};

export const deleteTagApi = async (tagId: string, token: string) => {
  const response = await apiRequest({
    method: "Delete",
    url: `/admin/deleteTag/${tagId}`,
    token,
  });
  return response;
};

export const changeTagStatusApi = async (
  data: any,
  tagId: string,
  token: string
) => {
  const response = await apiRequest({
    method: "Patch",
    url: `/admin/statusTag/${tagId}`,
    data,
    token,
  });
  return response;
};

export const updateAdminProfileApi = async (
  data: any,
  adminId: string,
  token: string
) => {
  console.log("updateAdminProfileApi", data, "id", adminId);
  const response = await apiRequest({
    method: "Put",
    url: `/admin/updateAdminProfile/${adminId}`,
    data,
    token,
  });
  return response;
};

export const resetAdminPasswordApi = async (
  data: any,
  adminId: string,
  token: string
) => {
  console.log("resetAdminPasswordApi", data, "id", adminId);
  const response = await apiRequest({
    method: "Post",
    url: `/admin/resetAdminPassword/${adminId}`,
    data,
    token,
  });
  return response;
};

export const getAllDecksApi = async (token: string) => {
  const response = await apiRequest({
    method: "Get",
    url: `/admin/getAllDeck`,
    token,
  });
  return response;
};
