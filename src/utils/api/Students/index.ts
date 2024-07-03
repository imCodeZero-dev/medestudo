import apiRequest from "../../../config/axios";
import { examForm } from "../../constants/DataTypes";
import { constructUrlWithParams } from "../../hooks/helper";

export const studentRegistrationApi = async (data: any) => {
  // console.log("studentRegistrationApi", data);
  const response = await apiRequest({
    method: "Post",
    url: `/user/registerStudent`,
    data,
  });
  return response;
};

export const googleLoginApi = async () => {
  // console.log("studentRegistrationApi", data);
  const response = await apiRequest({
    method: "get",
    url: `https://medestudo.onrender.com/api/v1/auth/google`,
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
  console.log("getAllDecksByIdApi", classId);
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

export const getAllCustomCardsByIdApi = async (
  deckId: string,
  token: string
) => {
  console.log("getAllCustomCardsByIdApi", deckId);
  const response = await apiRequest({
    method: "Get",
    url: `/user/getAllFlashCard/${deckId}`,
    token,
  });
  return response;
};

export const provideRateToCardApi = async (data: any, token: string) => {
  // console.log("provideRateToCardApi", data, "token", token);
  const response = await apiRequest({
    method: "Post",
    url: `/user/rating`,
    data,
    token,
  });
  return response;
};

export const createCustomClassApi = async (data: any, token: string) => {
  console.log("createCustomClassApi", data, "token", token);
  const response = await apiRequest({
    method: "Post",
    url: `/user/createClass`,
    data,
    token,
  });
  return response;
};
export const getAllCustomClassesApi = async (token: string) => {
  // console.log("createCustomClassApi", data, "token", token);
  const response = await apiRequest({
    method: "get",
    url: `/user/getStudentClasses`,
    token,
  });
  return response;
};

export const getCustomClassDecksApi = async (
  classId: string,
  token: string
) => {
  console.log("createCustomClassApi", classId, "token", token);
  const response = await apiRequest({
    method: "get",
    url: `/user/getDeckByClassId/${classId}`,
    token,
  });
  return response;
};

export const creteCustomDecksApi = async (
  data: any,
  classId: string,
  token: string
) => {
  // console.log("creteCustomDecksApi", classId, "token", token);
  const response = await apiRequest({
    method: "Post",
    url: `/user/createDeck/${classId}`,
    data,
    token,
  });
  return response;
};

export const editCustomDecksApi = async (
  data: any,
  id: string,
  token: string
) => {
  // console.log("editCustomDecksApi", id, "token", token);
  const response = await apiRequest({
    method: "Put",
    url: `/user/updateDeck/${id}`,
    data,
    token,
  });
  return response;
};

export const deleteCustomDecksApi = async (deckId: string, token: string) => {
  console.log("deleteCustomDecksApi", deckId, "token", token);
  const response = await apiRequest({
    method: "Delete",
    url: `/user/deleteDeck/${deckId}`,
    token,
  });
  return response;
};

export const startStudyingApi = async (data: any, token: string) => {
  console.log("startStudyingApi", data, token);
  const fullUrl = constructUrlWithParams("/user/startStudyingDecks", data);
  console.log("startStudyingApi, fullUrl", fullUrl);
  const response = await apiRequest({
    method: "Get",
    url: fullUrl,
    // url: `/user/startStudyingDecks`,
    token,
  });
  return response;
};

// export const startStudyingApi = async (data: any, token: string) => {
//   console.log("startStudyingApi", token);
//   const response = await apiRequest({
//     method: "Get",
//     url: `/user/startStudying`,
//     data,
//     token,
//   });
//   return response;
// };

export const createCustomFlashcardApi = async (
  data: any,
  deckId: string,
  token: string
) => {
  // console.log("createCustomFlashcardApi", data, "deckId", deckId);
  const response = await apiRequest({
    method: "Post",
    url: `/user/createFlashCard/${deckId}`,
    data,
    token,
  });
  return response;
};

export const editCustomFlashcardApi = async (
  data: any,
  flashCardId: string,
  token: string
) => {
  // console.log("editCustomFlashcardApi", data, "id", flashCardId);
  const response = await apiRequest({
    method: "Put",
    url: `/user/updateFlashCard/${flashCardId}`,
    data,
    token,
  });
  return response;
};

export const deleteCustomFlashcardApi = async (
  flashCardId: string | null,
  token: string
) => {
  // console.log("deleteCustomFlashcardApi", flashCardId);
  const response = await apiRequest({
    method: "Delete",
    url: `/user/deleteFlashCard/${flashCardId}`,
    token,
  });
  return response;
};

export const BookmarkApi = async (data: any, token: string) => {
  // console.log("addBookmarkApi", data);
  const response = await apiRequest({
    method: "Post",
    url: `/user/bookmark`,
    token,
    data,
  });
  return response;
};

export const removeBookmarkApi = async (data: any, token: string) => {
  // console.log("removeBookmarkApi", data);
  const response = await apiRequest({
    method: "Post",
    url: `/user/un-bookmark`,
    token,
    data,
  });
  return response;
};

export const getBookmarkCardsApi = async (studentId: any, token: string) => {
  // console.log("toogleBookmarkApi", studentId);
  const response = await apiRequest({
    method: "Get",
    url: `/user/getStudentsBookmarks/${studentId}`,
    token,
  });
  return response;
};

export const updateCustomClassApi = async (
  data: any,
  classId: string,
  token: string
) => {
  // console.log("updateCustomClassApi", data, "deckId", classId);
  const response = await apiRequest({
    method: "Put",
    url: `/user/updateClass/${classId}`,
    data,
    token,
  });
  return response;
};

export const deleteCustomClassApi = async (classId: string, token: string) => {
  // console.log("deleteCustomClassApi", "deckId", classId);
  const response = await apiRequest({
    method: "Delete",
    url: `/user/deleteClass/${classId}`,

    token,
  });
  return response;
};

export const getReviewDecksApi = async (studentId: string, token: string) => {
  console.log("getReviewDecksApi", "studentId", studentId);
  const response = await apiRequest({
    method: "Get",
    url: `/user/reviewDecks/${studentId}`,

    token,
  });
  return response;
};

export const getAllQuesitonsApi = async (data: any, token: string) => {
  console.log("getAllQuesitonsApi", data);
  const response = await apiRequest({
    method: "Post",
    url: `/user/getAllQuestions`,
    data,
    token,
  });
  return response;
};

export const getAllResultApi = async (token: string) => {
  // console.log("getAllResultApi", );
  const response = await apiRequest({
    method: "Get",
    url: `/user/getAllResult`,
    token,
  });
  return response;
};

export const createResultApi = async (data: any, token: string) => {
  console.log("getAllResultApi", data);
  const response = await apiRequest({
    method: "Post",
    url: `/user/createResult`,
    token,
    data,
  });
  return response;
};

export const deleteResultByIDApi = async (id: string, token: string) => {
  // console.log("getAllResultApi", );
  const response = await apiRequest({
    method: "Delete",
    url: `/user/deleteResult/${id}`,
    token,
  });
  return response;
};

export const updateStudentProfileApi = async (
  data: any,
  studentId: string,
  token: string
) => {
  console.log("updateStudentProfileApi", data, "id", studentId);
  const response = await apiRequest({
    method: "Put",
    url: `/user/updateSettings/${studentId}`,
    data,
    token,
  });
  return response;
};

export const updateStudentPictureApi = async (
  data: any,
  studentId: string,
  token: string
) => {
  console.log("updateStudentPictureApi", data, "id", studentId);
  const response = await apiRequest({
    method: "Put",
    url: `/user/updatePicture/${studentId}`,
    data,
    token,
  });
  return response;
};

export const resetStudentPasswordApi = async (
  data: any,
  studentId: string,
  token: string
) => {
  console.log("resetStudentPasswordApi", data, "id", studentId);
  const response = await apiRequest({
    method: "Put",
    url: `/user/resetPassword/${studentId}`,
    data,
    token,
  });
  return response;
};
