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

import {
  createClassDeckApi,
  createQuestionApi,
  deleteExamApi,
  editExamApi,
  editQuestionApi,
  getExamByIdApi,
} from "../../../../utils/api/professors";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {
  useAllExamsQuery,
  useAllSubjectsQuery,
  useAllTagsQuery,
  useExamQuestionsQuery,
} from "../../../../redux/slices/APISlice";
import { examCardData } from "../../../../components/LVL3_Cells/DashboardExams/@types";
import { Tag } from "../../../../utils/constants/DataTypes";
import { uploadImageToCloudinary } from "../../../../utils/hooks/helper";
import { exmaQuestionValidation } from "../../../../utils/hooks/inputValidation";

interface Subject {
  id: number;
  title: string;
}
export const useCreateExamQuestion = () => {
  // const navigate = useNavigate();
  const { localeSuccess } = useLocale();
  const [cookies] = useCookies(["professor"]);
  const [modifiedSubjects, setModifiedSubjects] = useState<Tag[]>();
  const [createLoading, setCreateLoading] = useState<boolean>(false);
  const [editExamLoading, setEditExamLoading] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [selectedExamId, setSelectedExamId] = useState<null | string>(null);
  const [editModal, setEditModal] = useState(false);
  const dispatch = useDispatch();
  const examId = location?.state;

  // console.log("examId", examId);

  type FormData = {
    answers: {
      isCorrect: boolean;
      text: string;
      reason: string;
      image: File | null;
    }[];
  };

  const {
    allSubjects,
    allSubjectsLoading,
    errorAllSubjects,
    refetchAllSubjects,
  } = useAllSubjectsQuery(cookies);

  useEffect(() => {
    if (allSubjects) {
      const transformedArray = allSubjects.map((item: string) => {
        return { _id: item, title: item };
      });
      setModifiedSubjects(transformedArray);
    }
  }, [allSubjects]);

  useEffect(() => {
    if (examId?.status === "edit") {
      const decodedSolution = atob(examId?.detailedSolution);
      const decodedQuestion = atob(examId?.question);
      if (examId?.tags && examId?.tags.length > 0) {
        const filteredTags = examId?.tags?.map((item: Tag) => ({
          title: item,
          value: item,
          label: item,
        }));
        setValue("tags", filteredTags);
      } else {
        setValue("tags", []);
      }
      if (examId?.subjects && examId?.subjects.length > 0) {
        const filteredSubjects = examId?.subjects?.map((item: Tag) => ({
          title: item,
          value: item,
          label: item,
        }));
        setValue("subjects", filteredSubjects);
      } else {
        setValue("subjects", []);
      }

      setValue("solution", decodedSolution);
      setValue("question", decodedQuestion);
      // console.log("examId", examId);
      const answerWithId = examId?.answers?.map((ans: any, index: number) => ({
        ...ans,
        id: index,
      }));

      setValue("answers", answerWithId);
      setValue("detailedSolution", decodedSolution);
    }
  }, [examId]);

  // console.log("allSubjects", allSubjects);

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
    reset,
    getValues,
  } = useForm<any>({
    resolver: yupResolver(exmaQuestionValidation),
    defaultValues: {
      answers: [
        { id: "1", isCorrect: false, text: "", reason: "", image: null },
        { id: "2", isCorrect: false, text: "", reason: "", image: null },
        { id: "3", isCorrect: false, text: "", reason: "", image: null },
        { id: "4", isCorrect: false, text: "", reason: "", image: null },
        { id: "5", isCorrect: false, text: "", reason: "", image: null },
      ],
    },
  });

  const handleEditClose = () => {
    setEditModal(false);
  };

  const { refetchAllExams } = useAllExamsQuery(cookies);

  const { allTags, refetchAllTags, allTagsLoading, errorAllTags } =
    useAllTagsQuery(cookies);

  const {
    examQuestions,
    errorexamQuestions,
    examQuestionsLoading,
    refetchexamQuestions,
  } = useExamQuestionsQuery(
    cookies,
    examId?.status === "edit" ? examId?.examId : (examId?._id as string)
  );

  // console.log("allTags", allTags);

  const {
    // data: examsDetails,
    data: { data: examsDetails = {} } = {},
    isLoading: examsDetailsLoading,
    error: errorexamsDetails,
    refetch: refetchexamsDetails,
  } = useQuery(
    [
      "examsDetails",
      {
        cookies,
        examId,
      },
    ],

    async () => {
      return getExamByIdApi(
        examId?.status === "edit" ? examId?.examId : (examId?._id as string),
        cookies?.professor?.token
      );
    },
    {
      enabled: !!cookies?.professor?.token && !!examId,
    }
  );

  // console.log("examsDetails", examsDetails);

  const onSubmitCreate = async (data: any) => {
    console.log("onSubmitCreate", data);
    const hasCorrectAnswer = data?.answers?.some(
      (answer: any) => answer?.isCorrect
    );

    if (hasCorrectAnswer) callUploadFunction(data, "create");
    else {
      showErrorToast("1 answer must be true");
    }
  };

  const onSubmitEditQuestion = async (data: any) => {
    console.log("onSubmitEditQuestion", data);
    const hasCorrectAnswer = data?.answers?.some(
      (answer: any) => answer?.isCorrect
    );

    if (hasCorrectAnswer) callUploadFunction(data, "edit");
    else {
      showErrorToast("1 answer must be true");
    }
  };

  const callUploadFunction = async (data: any, type: string) => {
    try {
      setCreateLoading(true);

      let questionImgUrl;
      if (data?.questionImage) {
        questionImgUrl = await uploadImageToCloudinary(data?.questionImage);
      }
      let solutionImgUrl;
      if (data?.solutionImage) {
        solutionImgUrl = await uploadImageToCloudinary(data?.solutionImage);
      }

      // Filter out answers with image files
      const answersWithImages = data?.answers.filter(
        (answer: any) => answer.image
      );
      // console.log("answersWithImages", answersWithImages);
      // Upload images to Cloudinary
      const uploadedAnswers = await Promise.all(
        answersWithImages.map(async (answer: any, index: number) => {
          const imageUrl = await uploadImageToCloudinary(answer.image);

          // console.log("answersWithImages map", answer);
          return {
            id: answer.id,
            image: imageUrl,
          };
        })
      );

      const updatedAnswers = data?.answers.map((answer: any) => {
        const uploadedAnswer = uploadedAnswers.find(
          (uploadedAnswer: any) => uploadedAnswer.id === answer.id
        );
        // console.log("answersWithImages uploadedAnswer", uploadedAnswer);
        return uploadedAnswer
          ? { ...answer, image: uploadedAnswer.image }
          : answer;
      });

      const tags = data?.tags?.map((tag: any) => tag.label);
      const subjects = data?.subjects?.map((tag: any) => tag.label);

      // Encode question and solution to base64
      const base64Question = btoa(data.question);
      const base64Solution = btoa(data.solution);

      const params = {
        subjects,
        tags,
        question: base64Question,
        questionImage: questionImgUrl,
        answers: updatedAnswers,
        detailedSolution: base64Solution,
        detailedSolutionImage: solutionImgUrl,
      };

      // Call createQuestionApi
      let response;
      if (type === "create") {
        response = await createQuestionApi(
          params,
          examId?._id,
          cookies?.professor?.token
        );
        showSuccessToast(localeSuccess?.SUCCESS_QUESTION_CREATED);
      } else {
        response = await editQuestionApi(
          params,
          examId?._id,
          cookies?.professor?.token
        );
        showSuccessToast(localeSuccess?.SUCCESS_QUESTION_UPDATED);
      }
      console.log("response", response);

      refetchexamQuestions();
      navigate(-1);
    } catch (error: any) {
      console.log("error", error);
      showErrorToast(error?.response?.data?.message);
    } finally {
      setCreateLoading(false);
    }
  };

  return {
    control,
    handleSubmit,
    watch,
    onSubmitCreate,
    setValue,
    examsDetailsLoading,
    examsDetails,
    errors,
    allTags,
    modifiedSubjects,
    createLoading,
    onSubmitEditQuestion,
    getValues,
  };
};
