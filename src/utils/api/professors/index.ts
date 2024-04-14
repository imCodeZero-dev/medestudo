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

export const deleteClassApi = async (classId: string | null, token: string) => {
  console.log("deleteClassApi", classId);
  const response = await apiRequest({
    method: "Delete",
    url: `/professor/deleteClassById/${classId}`,
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

export const getClassDecksApi = async (classId: string, token: string) => {
  // console.log("professorLoginApi", data);
  const response = await apiRequest({
    method: "Get",
    url: `/professor/getAllDeck/${classId}`,
    token,
  });
  return response;
};

export const createClassDeckApi = async (
  data: any,
  classId: string,
  token: string
) => {
  console.log("createClassDeckApi", data);
  const response = await apiRequest({
    method: "Post",
    url: `/professor/createDeck/${classId}`,
    data,
    token,
  });
  return response;
};

export const createFlashcardApi = async (
  data: any,
  deckId: string,
  token: string
) => {
  console.log("createFlashcardApi", data);
  const response = await apiRequest({
    method: "Post",
    url: `/professor/createFlashCard/${deckId}`,
    data,
    token,
  });
  return response;
};

export const editFlashcardApi = async (
  data: any,
  flashCardId: string,
  token: string
) => {
  console.log("editFlashcardApi", data);
  const response = await apiRequest({
    method: "Put",
    url: `/professor/updateFlashCard/${flashCardId}`,
    data,
    token,
  });
  return response;
};

export const deleteClassDeckApi = async (
  deckId: string | null,
  token: string
) => {
  console.log("deleteDeckApi", deckId);
  const response = await apiRequest({
    method: "Delete",
    url: `/professor/deleteDeck/${deckId}`,
    token,
  });
  return response;
};

export const deleteFlashcardApi = async (
  flashCardId: string | null,
  token: string
) => {
  console.log("deleteFlashcardApi", flashCardId);
  const response = await apiRequest({
    method: "Delete",
    url: `/professor/deleteFlashCard/${flashCardId}`,
    token,
  });
  return response;
};

export const getAllFlashcardsByIdApi = async (
  deckId: string | undefined,
  token: string
) => {
  console.log("getAllFlashcardsByIdApi", deckId);
  const response = await apiRequest({
    method: "Get",
    url: `/professor/getAllFlashCard/${deckId}`,
    token,
  });
  return response;
};

// export const deleteClassApi = async (
//   classId: string | null,
//   token: string
// ) => {
//   console.log("deleteClassApi", classId);
//   const response = await apiRequest({
//     method: "Delete",
//     url: `/professor/deleteClassById/${classId}`,
//     token,
//   });
//   return response;
// };
