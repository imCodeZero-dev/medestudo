import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../../config/toastProvider/toastUtils";

import useLocale from "../../../../locales";
import { useCookies } from "react-cookie";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";

import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import {
  useExamQuestionsQuery,
  useallQuestionsQuery,
} from "../../../../redux/slices/APISlice";
import { Flashcard, Tag } from "../../../../utils/constants/DataTypes";
import { examCardData } from "../../../../components/LVL3_Cells/DashboardExams/@types";
import {
  createResultApi,
  getAllQuesitonsApi,
} from "../../../../utils/api/Students";

export const useStudentStartExam = () => {
  // const navigate = useNavigate();
  const { localeSuccess } = useLocale();
  const [cookies] = useCookies(["student"]);
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
    questionImage: string;
    detailedSolutionImage: string;
    tags: string[];
    title: string;
    institute: string;
    year: string;
  }>({
    // resolver: yupResolver(validationSchema),
    defaultValues: {},
  });
  const {
    control: allQuestionControl,
    watch: allQuestionWatch,
    setValue: allQuestionSetValue,
    getValues: allQuestionGetValues,
  } = useForm<any>({
    defaultValues: {},
  });

  const [flashcardData, setFlashcardData] = useState<any>();
  const location = useLocation().state;
  const pathName = useLocation().pathname;
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const examDetails = location?.examsDetails;
  const [resultModal, setResultModal] = useState<boolean>(false);
  const [revealedAnswer, setRevealedAnswer] = useState<boolean>(false);
  const [selectedAnswer, setSelectedAnswer] = useState<any>();
  const [totalMarks, setTotalMarks] = useState<number>(0);
  const [totalTime, setTotalTime] = useState<number>(0);
  const [stopTimer, setStopTimer] = useState<boolean>(false);
  const [createResultModal, setCreateResultModal] = useState<boolean>(false);
  const [createLoading, setCreateLoading] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  // console.log("AllQuestion Exams", location);
  // console.log("pathName", pathName);

  const practice = pathName?.includes("practice");
  // console.log("practice", practice);
  // console.log("AllQuestion Exams", examDetails);

  const params = {
    totalQuestions: location?.totalQuestions,
    year: location?.selectedYears,
    examType: location?.selectedExamTypes,
    institute: location?.selectedInstitutes,
    subject: location?.selectedSubjects,
  };

  const {
    allQuestions,
    allQuestionsLoading,
    errorallQuestions,
    refetchallQuestions,
  } = useallQuestionsQuery(cookies, params, location);

  console.log("allQuestions", allQuestions);

  // const openEditModal = (data: examCardData) => {
  //   // setSelectedExamId(data?._id);
  //   setEditModal(true);
  //   setValue("title", data?.title);
  //   setValue("institute", data?.institute);
  //   setValue("year", data?.year);
  // };

  const toggleReveal = () => [setRevealedAnswer(!revealedAnswer)];

  const handleOpenDrawer = () => {
    setIsDrawerOpen(true);
    handleResultModalClose();
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    handleResultModalOpen();
  };

  const handleCloseCreateResult = () => {
    setCreateResultModal(false);
  };

  const handleOpenCreateResult = () => {
    setCreateResultModal(true);
    handleResultModalClose();
  };

  const handleResultModalOpen = () => {
    setResultModal(true);
  };

  const handleResultModalClose = () => {
    setResultModal(false);
    // navigate(-1);
  };

  const {
    examQuestions,
    errorexamQuestions,
    examQuestionsLoading,
    refetchexamQuestions,
  } = useExamQuestionsQuery(cookies, examId as string);

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setRevealedAnswer(false);
    setCurrentQuestionIndex((prevIndex) =>
      prevIndex < allQuestions?.length - 1 ? prevIndex + 1 : prevIndex
    );
    if (allQuestions?.length - 1 === currentQuestionIndex) {
      finishExam();
    }
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : prevIndex
    );
  };

  const selectAnswer = (data: any) => {
    console.log("selectAnswers", data);

    setSelectedAnswer(data);
  };

  const respondToNext = () => {
    if (selectedAnswer?.isCorrect) {
      setTotalMarks((prevMarks) => prevMarks + 1);
    } else {
      setTotalMarks((prevMarks) => prevMarks + 0);
    }
    handleNextQuestion();
  };

  useEffect(() => {
    if (allQuestions[currentQuestionIndex]) {
      const {
        question,
        detailedSolution,
        tags,
        questionImage,
        detailedSolutionImage,
      } = allQuestions[currentQuestionIndex];
      try {
        const decodedQuestion = atob(question);
        const decodedSolution = atob(detailedSolution);
        setValue("question", decodedQuestion);
        setValue("questionImage", questionImage);
        setValue("detailedSolutionImage", detailedSolutionImage);
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
    console.log("allQuestions useEffect", allQuestions[currentQuestionIndex]);
  }, [currentQuestionIndex, allQuestions]);
  useEffect(() => {
    allQuestions.forEach((deck: any, i: number) => {
      // if (deck?.question) {
      const { question, answer, tags, questionImage, answerImage } = deck;
      console.log("allQuestions for Each", answer);
      try {
        const decodedQuestion = atob(question);
        // const decodedAnswer = atob(answer);
        allQuestionSetValue(`question-${i}`, decodedQuestion);
        // allQuestionSetValue(`answer-${i}`, decodedAnswer);
        allQuestionSetValue(`questionImage-${i}`, questionImage);
        allQuestionSetValue(`answerImage-${i}`, answerImage);
        allQuestionSetValue(`new_questionImage-${i}`, questionImage);
        allQuestionSetValue(`new_answerImage-${i}`, answerImage);
        if (tags && tags.length > 0) {
          const filteredTags = tags.map((item: Tag) => ({
            title: item,
            value: item,
            label: item,
          }));
          allQuestionSetValue("tags", filteredTags);
        } else {
          allQuestionSetValue("tags", []);
        }
      } catch (error) {
        console.error("Error decoding base64 string:", error);
      }
      // }
    });
  }, [allQuestions]);

  const getTotalTime = (time?: number) => {
    console.log("totaltime", time);
    setStopTimer(true);
    if (time) {
      setTotalTime(time);
    }
  };

  const finishExam = () => {
    getTotalTime();
    handleResultModalOpen();
  };

  const onCreateResult = async (data: any) => {
    const params = {
      title: data?.title,
      achievedMarks: totalMarks.toString(),
      totalQuestions: (allQuestions?.length).toString(),
    };
    try {
      setCreateLoading(true);
      let response;
      response = await createResultApi(params, cookies?.student?.token);
      console.log("response", response);

      showSuccessToast(localeSuccess?.SUCCESS_RESULT_CREATED);
      navigate(-1);
      // refetchAllExams();
    } catch (error: any) {
      console.log("error", error);
      showErrorToast(error?.response?.data?.message);
    } finally {
      setCreateLoading(false);
      handleCloseCreateResult();
    }
  };

  return {
    control,
    errors,
    handleSubmit,
    watch,
    handleNextQuestion,
    handlePreviousQuestion,
    currentQuestionIndex,

    examQuestionsLoading,
    allQuestions,
    selectAnswer,
    revealedAnswer,
    selectedAnswer,
    respondToNext,
    handleResultModalClose,
    resultModal,
    totalTime,
    getTotalTime,
    stopTimer,
    onCreateResult,
    createResultModal,
    handleOpenCreateResult,
    handleCloseCreateResult,
    createLoading,
    finishExam,
    totalMarks,
    isDrawerOpen,
    handleCloseDrawer,
    handleOpenDrawer,
    allQuestionControl,
    practice,
    toggleReveal,
  };
};
