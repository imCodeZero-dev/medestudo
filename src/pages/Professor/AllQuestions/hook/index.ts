import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../../config/toastProvider/toastUtils";

import useLocale from "../../../../locales";
import { passwordRegex } from "../../../../utils/constants/constants";
import { useCookies } from "react-cookie";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../../../redux/slices/CreateClassModalSlice";

import {
  deleteExamApi,
  deleteFlashcardApi,
  editFlashcardApi,
} from "../../../../utils/api/professors";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import {
  useAllClassesQuery,
  useAllExamsQuery,
  useAllFlashcardsQuery,
  useAllTagsQuery,
  useExamQuestionsQuery,
} from "../../../../redux/slices/APISlice";
import { Flashcard, Tag } from "../../../../utils/constants/DataTypes";
import { examCardData } from "../../../../components/LVL3_Cells/DashboardExams/@types";

export const useAllQuestions = () => {
  // const navigate = useNavigate();
  const { localeSuccess } = useLocale();
  const [cookies] = useCookies(["professor"]);
  const dispatch = useDispatch();
  const { examId } = useParams();
  // console.log("AllQuestion Exams", examId);
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
    getValues,
    reset,
  } = useForm<{
    question: string;
    solution: string;
    tags: string[];
    title: string;
    institute: string;
    year: string;
  }>({
    // resolver: yupResolver(validationSchema),
    defaultValues: {},
  });

  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [deleteModal, setdeleteModal] = useState<boolean>(false);
  const [deleteExamModal, setdeleteExamModal] = useState<boolean>(false);
  const [enableEdit, setEnableEdit] = useState<boolean>(false);
  const [editLoading, setEditLoading] = useState<boolean>(false);
  const [flashcardData, setFlashcardData] = useState<any>();
  const location = useLocation().state;
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(
    location?.currentIndex
  );
  const examDetails = location?.examsDetails;
  // console.log("AllQuestion Exams", location);
  // console.log("AllQuestion Exams", examDetails);

  const [editModal, setEditModal] = useState(false);

  const openEditModal = (data: examCardData) => {
    // setSelectedExamId(data?._id);
    setEditModal(true);
    setValue("title", data?.title);
    setValue("institute", data?.institute);
    setValue("year", data?.year);
  };

  const handleEditClose = () => {
    setEditModal(false);
  };

  const openDeleteExamModal = () => {
    setdeleteExamModal(true);
  };

  const closeDeleteExamModal = () => {
    setdeleteExamModal(false);
  };

  const handleDeleteOpen = (data: any) => {
    setdeleteModal(true);
    setFlashcardData(data);
  };
  const handleDeleteClose = () => {
    setdeleteModal(false);
  };

  const handleEditOpen = (data: any) => {
    setEnableEdit(true);
    setFlashcardData(data);
    // navigate("/professor/classes/deck/flashcard", { state: data });
  };

  // const handleEditClose = () => {
  //   setEnableEdit(false);
  // };

  const {
    examQuestions,
    errorexamQuestions,
    examQuestionsLoading,
    refetchexamQuestions,
  } = useExamQuestionsQuery(cookies, examId as string);

  const { refetchAllExams } = useAllExamsQuery(cookies);

  // console.log("examQuestions", examQuestions);

  // const getDetails = (data: string) => {
  //   navigate(`/professor/classes/deck?${data}`, { state: data });
  // };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) =>
      prevIndex < examQuestions?.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : prevIndex
    );
  };

  const onDeleteConfirm = async () => {
    try {
      setDeleteLoading(true);
      let response;
      response = await deleteFlashcardApi(
        flashcardData?._id,
        cookies?.professor?.token
      );
      console.log("response", response);

      showSuccessToast(localeSuccess?.SUCCESS_FLASH_DELETED);
      refetchexamQuestions();
    } catch (error: any) {
      console.log("error", error);
      showErrorToast(error?.response?.data?.errorMessage);
    } finally {
      setDeleteLoading(false);
      handleDeleteClose();
    }
  };

  const onDeleteExamConfirm = async () => {
    try {
      setDeleteLoading(true);
      let response;
      response = await deleteExamApi(
        examId as string,
        cookies?.professor?.token
      );
      console.log("response", response);

      showSuccessToast(localeSuccess?.SUCCESS_EXAM_DELETED);
      navigate(-1);
      refetchAllExams();
    } catch (error: any) {
      console.log("error", error);
      showErrorToast(error?.response?.data?.errorMessage);
    } finally {
      setDeleteLoading(false);
      closeDeleteExamModal();
    }
  };

  const onSubmitEdit = async (data: any) => {
    try {
      const tagsLabels = data?.tags?.map(
        (tag: { value: string; label: string }) => tag.label
      );
      const base64Question = btoa(data.question);
      const base64Answer = btoa(data.answer);

      const payload = {
        question: base64Question,
        answer: base64Answer,
        tags: tagsLabels,
      };

      setEditLoading(true);
      const response = await editFlashcardApi(
        payload,
        flashcardData?._id,
        cookies?.professor?.token
      );
      console.log("response", response);
      showSuccessToast(localeSuccess?.SUCCESS_FLASH_EDIT);
      refetchexamQuestions();
    } catch (error: any) {
      console.log("error", error);
      showErrorToast(error?.response?.data?.errorMessage);
    } finally {
      setEditLoading(false);
      reset();
      // navigate(-1);
    }
  };

  useEffect(() => {
    // Set initial values when component mounts or currentQuestionIndex changes
    if (examQuestions[currentQuestionIndex]) {
      const { question, detailedSolution, tags } =
        examQuestions[currentQuestionIndex];
      try {
        const decodedQuestion = atob(question);
        const decodedSolution = atob(detailedSolution);
        setValue("question", decodedQuestion);
        setValue("solution", decodedSolution);
        if (tags && tags.length > 0) {
          const filteredTags = tags?.map((item: Tag) => ({
            title: item,
            value: item,
            label: item,
          }));
          setValue("tags", filteredTags);
        } else {
          setValue("tags", []);
        }
      } catch (error) {
        console.error("Error decoding base64 string:", error);
      }
    }
    console.log("examQuestions", examQuestions[currentQuestionIndex]);
  }, [currentQuestionIndex, examQuestions, setValue]);

  // console.log("allTags", allTags, "watchTags", tags);

  return {
    control,
    errors,
    handleSubmit,
    setValue,
    watch,

    handleNextQuestion,
    handlePreviousQuestion,
    examQuestions,
    currentQuestionIndex,
    onDeleteConfirm,
    deleteModal,
    deleteLoading,
    handleDeleteOpen,
    handleDeleteClose,
    handleEditOpen,
    handleEditClose,
    enableEdit,
    onSubmitEdit,
    editLoading,
    examQuestionsLoading,
    examDetails,
    openEditModal,
    deleteExamModal,
    openDeleteExamModal,
    onDeleteExamConfirm,
    closeDeleteExamModal,
  };
};
