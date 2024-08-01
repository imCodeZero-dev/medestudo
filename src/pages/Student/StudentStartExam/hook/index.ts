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

import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  useAllResultQuery,
  useExamQuestionsQuery,
  useallQuestionsQuery,
} from "../../../../redux/slices/APISlice";
import {
  SelectedAnswersType,
  Tag,
} from "../../../../utils/constants/DataTypes";
import { createResultApi } from "../../../../utils/api/Students";

export const useStudentStartExam = () => {
  // const navigate = useNavigate();
  const { localeSuccess } = useLocale();
  const [cookies] = useCookies(["student"]);
  const dispatch = useDispatch();
  const { examId } = useParams();
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
  const [selectedAnswer, setSelectedAnswer] = useState<SelectedAnswersType>();
  const [totalMarks, setTotalMarks] = useState<number>(0);
  const [totalTime, setTotalTime] = useState<number>(0);
  const [stopTimer, setStopTimer] = useState<boolean>(false);
  const [createResultModal, setCreateResultModal] = useState<boolean>(false);
  const [createLoading, setCreateLoading] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(5); // Initialize with the desired time in seconds



  const practice = pathName?.includes("practice");

  const questionTime = location?.time;
  // const questionTime = location?.totalQuestions * 5;
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
  useEffect(() => {
    setCountdown(questionTime);
  }, [questionTime]);



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
    // setSelectedAnswer(null);
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
    // console.log("selectAnswers", data);
    const selectedAns = { ...selectedAnswer, [currentQuestionIndex]: data };
    setSelectedAnswer(selectedAns);
  };
  // console.log("setelectedAnswer", selectedAnswer);

  const respondToNext = () => {
    if (selectedAnswer?.[currentQuestionIndex]?.isCorrect) {
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
    // console.log("allQuestions useEffect", allQuestions[currentQuestionIndex]);
  }, [currentQuestionIndex, allQuestions]);
  useEffect(() => {
    allQuestions.forEach((deck: any, i: number) => {
      // if (deck?.question) {
      const { question, answer, tags, questionImage, answerImage } = deck;
      // console.log("allQuestions for Each", answer);
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
    // console.log("totaltime", time);
    setStopTimer(true);
    if (time) {
      setTotalTime(time);
    }
  };
  // useEffect(() => {
  //   console.log("questionTime");
  //   if (questionTime === 0) {
  //     finishExam();
  //   }
  // }, [questionTime]);

  useEffect(() => {
    if (!practice) {
      if (countdown > 0) {
        const timer = setInterval(() => {
          setCountdown((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(timer); // Cleanup the interval on component unmount
      } else {
        finishExam();
      }
    }
  }, [countdown]);

  const finishExam = () => {
    getTotalTime();
    handleResultModalOpen();
  };

  const { refetchAllResult } = useAllResultQuery(cookies?.student);

  const onCreateResult = async (data: any) => {
    const params = {
      type: practice ? "PRACTICE" : "MOCK",
      title: data?.title,
      achievedMarks: totalMarks.toString(),
      totalQuestions: (allQuestions?.length).toString(),
    };
    try {
      setCreateLoading(true);
      let response;
      response = await createResultApi(params, cookies?.student?.token);
      console.log("response", response);
      refetchAllResult();
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
    questionTime,
  };
};
