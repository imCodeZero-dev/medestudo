import apiRequest from "../../../config/axios";
import { examForm } from "../../constants/DataTypes";

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
  // console.log("createFlashcardApi", data);
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
  // console.log("editFlashcardApi", data);
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
  const response = await apiRequest({
    method: "Get",
    url: `/professor/getAllFlashCard/${deckId}`,
    token,
  });
  return response;
};

export const createExamApi = async (data: examForm, token: string) => {
  const response = await apiRequest({
    method: "Post",
    url: `/professor/createExam`,
    data,
    token,
  });
  return response;
};

export const deleteExamApi = async (examId: string, token: string) => {
  const response = await apiRequest({
    method: "Delete",
    url: `/professor/deleteExam/${examId}`,
    token,
  });
  return response;
};

export const editExamApi = async (
  data: examForm,
  examId: string,
  token: string
) => {
  const response = await apiRequest({
    method: "Put",
    url: `/professor/updateExam/${examId}`,
    data,
    token,
  });
  return response;
};

export const getExamByIdApi = async (examId: string, token: string) => {
  const response = await apiRequest({
    method: "Get",
    url: `/professor/getExam/${examId}`,
    token,
  });
  return response;
};

export const getAllExamsApi = async (token: string) => {
  const response = await apiRequest({
    method: "Get",
    url: `/professor/getAllExams`,
    token,
  });
  return response;
};

export const createQuestionApi = async (
  data: any,
  examId: string,
  token: string
) => {
  const response = await apiRequest({
    method: "Post",
    url: `/professor/createQns/${examId}`,
    token,
    data,
  });
  return response;
};

export const editQuestionApi = async (
  data: any,
  questionId: string,
  token: string
) => {
  const response = await apiRequest({
    method: "Put",
    url: `/professor/updateQns/${questionId}`,
    token,
    data,
  });
  return response;
};

export const deleteQuestionApi = async (questionId: string, token: string) => {
  const response = await apiRequest({
    method: "Delete",
    url: `/professor/deleteQns/${questionId}`,
    token,
  });
  return response;
};

export const getExamQuestionsApi = async (examId: string, token: string) => {
  const response = await apiRequest({
    method: "Get",
    url: `/professor/getAllQns/${examId}`,
    token,
  });
  return response;
};

export const getDeckDetailsApi = async (deckId: string, token: string) => {
  console.log("getDeckDetailsApi", deckId);
  const response = await apiRequest({
    method: "Get",
    url: `/professor/getDeckByDeckId/${deckId}`,
    token,
  });
  return response;
};

export const getDashboardDataApi = async (token: string) => {
  const response = await apiRequest({
    method: "Get",
    url: `/professor/getAllFlashCardMonthly`,
    token,
  });
  return response;
};
