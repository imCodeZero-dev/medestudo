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

export const updateProfessorApi = async (
  data: any,
  professorId: string,
  token: string
) => {
  const response = await apiRequest({
    method: "Post",
    url: `/professor/editProfessor/${professorId}`,
    data,
    token,
  });
  return response;
};

export const deleteProfessorApi = async (
  professorId: string,
  token: string
) => {
  const response = await apiRequest({
    method: "Delete",
    url: `/admin/deleteProfessor/${professorId}`,
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
  console.log("getAllStudentsApi", token);
  const response = await apiRequest({
    method: "Get",
    url: `/admin/student/getAll`,
    token,
  });
  return response;
};

export const deleteStudentApi = async (studentId: string, token: string) => {
  const response = await apiRequest({
    method: "Delete",
    url: `/admin/deleteStudent/${studentId}`,
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
  console.log("createDeckApi", data, "token", token);
  const response = await apiRequest({
    method: "Post",
    url: `/admin/createDeck`,
    data,
    token,
  });
  return response;
};

export const updateDeckApi = async (
  data: any,
  deckId: string,
  token: string
) => {
  console.log("updateDeckApi", data);
  const response = await apiRequest({
    method: "Put",
    url: `/admin/updateDeck/${deckId}`,
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

export const deleteDeckByIdApi = async (deckId: string, token: string) => {
  const response = await apiRequest({
    method: "Delete",
    url: `/admin/deleteDeck/${deckId}`,
    token,
  });
  return response;
};

export const updateDeckByIdApi = async (
  deckId: string,
  data: any,
  token: string
) => {
  const response = await apiRequest({
    method: "Put",
    url: `/admin/updateDeck/${deckId}`,
    data,
    token,
  });
  return response;
};

export const createInstituteApi = async (data: any, token: string) => {
  const response = await apiRequest({
    method: "Post",
    url: `/admin/createInstitute`,
    data,
    token,
  });
  return response;
};

export const getAllInstituteApi = async () => {
  // console.log("getAllProfessorApi", token);
  const response = await apiRequest({
    method: "Get",
    url: `/admin/getAllInstitutes`,
    // token,
  });
  return response;
};

export const editInstituteTitleApi = async (
  data: any,
  instituteId: string,
  token: string
) => {
  const response = await apiRequest({
    method: "Patch",
    url: `/admin/editInstitute/${instituteId}`,
    data,
    token,
  });
  return response;
};

export const deleteInstituteApi = async (
  instituteId: string,
  token: string
) => {
  const response = await apiRequest({
    method: "Delete",
    url: `/admin/deleteInstitute/${instituteId}`,
    token,
  });
  return response;
};

export const changeInstituteStatusApi = async (
  data: any,
  instituteId: string,
  token: string
) => {
  const response = await apiRequest({
    method: "Patch",
    url: `/admin/statusInstitute/${instituteId}`,
    data,
    token,
  });
  return response;
};

export const professorCreateGeneralProfileApi = async (
  data: any,
  token: string
) => {
  const response = await apiRequest({
    method: "Post",
    url: `/professor/createSetting`,
    data,
    token,
  });
  return response;
};

export const professorEditGeneralProfileApi = async (
  data: any,
  token: string
) => {
  const response = await apiRequest({
    method: "Put",
    url: `/professor/updateSettings`,
    data,
    token,
  });
  return response;
};

export const professorUpdateProfilePictureApi = async (
  data: any,
  token: string
) => {
  const response = await apiRequest({
    method: "Put",
    url: `/professor/updatePicture`,
    data,
    token,
  });
  return response;
};

export const professorResetPasswordApi = async (data: any, token: string) => {
  const response = await apiRequest({
    method: "Put",
    url: `/professor/resetPassword`,
    data,
    token,
  });
  return response;
};

export const getAllQuestionsAdmindApi = async (token: string) => {
  const response = await apiRequest({
    method: "get",
    url: `/admin/getAllQuestions`,
    token,
  });
  return response;
};

export const getAllFlashcardsAdmindApi = async (token: string) => {
  const response = await apiRequest({
    method: "get",
    url: `/admin/getAllFlashCards`,
    token,
  });
  return response;
};
