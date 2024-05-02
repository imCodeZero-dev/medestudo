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
  getExamByIdApi,
} from "../../../../utils/api/professors";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {
  useAllExamsQuery,
  useAllSubjectsQuery,
  useAllTagsQuery,
} from "../../../../redux/slices/APISlice";
import { examCardData } from "../../../../components/LVL3_Cells/DashboardExams/@types";
import { Tag } from "../../../../utils/constants/DataTypes";
import { uploadImageToCloudinary } from "../../../../utils/hooks/helper";

interface Subject {
  id: number;
  title: string;
}
export const useCreateExamQuestion = () => {
  // const navigate = useNavigate();
  const { localeSuccess } = useLocale();
  const [cookies] = useCookies(["professor"]);
  const [modifiedSubjects, setModifiedSubjects] = useState<Tag[]>();
  const dispatch = useDispatch();

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

  console.log("allSubjects", allSubjects);

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<any>({
    // resolver: yupResolver(validationSchema),
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
  const [createLoading, setCreateLoading] = useState<boolean>(false);
  const [editExamLoading, setEditExamLoading] = useState<boolean>(false);
  const location = useLocation();

  const examId = location?.state;

  console.log("examId", examId);

  const navigate = useNavigate();
  const [createModal, setCreateModal] = useState(false);
  const [specificDecks, setSpecificDecks] = useState();
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteExamModal, setDeleteExamModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [selectedExamId, setSelectedExamId] = useState<null | string>(null);
  const [editModal, setEditModal] = useState(false);

  const openEditModal = (data: examCardData) => {
    setSelectedExamId(data?._id);
    setEditModal(true);
    setValue("title", data?.title);
    setValue("institute", data?.institute);
    setValue("year", data?.year);
  };

  const handleEditClose = () => {
    setEditModal(false);
  };
  const handleCloseCreate = () => {
    setCreateModal(false);
  };

  const handleDeleteClose = () => {
    setDeleteModal(false);
  };
  const openDeleteModal = (id: string) => {
    console.log("openDeleteModal", id);
    setSelectedExamId(id);
    setDeleteModal(true);
  };

  const handleDeleteExamClose = () => {
    setDeleteExamModal(false);
  };
  const openDeleteExamModal = (id: string) => {
    console.log("openDeleteModal", id);
    setSelectedExamId(id);
    setDeleteExamModal(true);
  };

  const { allExams, allExamsLoading, errorAllExams, refetchAllExams } =
    useAllExamsQuery(cookies);
  const { allTags, refetchAllTags, allTagsLoading, errorAllTags } =
    useAllTagsQuery(cookies);

  console.log("allTags", allTags);

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
      return getExamByIdApi(examId, cookies?.professor?.token);
    },
    {
      enabled: !!cookies?.professor?.token && !!examId,
    }
  );

  console.log("examsDetails", examsDetails);

  const onSubmitCreate = async (data: any) => {
    console.log("onSubmitCreate", data);

    try {
      setCreateLoading(true);

      // Filter out answers with image files
      const answersWithImages = data?.answers.filter(
        (answer: any) => answer.image
      );

      // Upload images to Cloudinary
      const uploadedAnswers = await Promise.all(
        answersWithImages.map(async (answer: any) => {
          // Upload image to Cloudinary
          const imageUrl = await uploadImageToCloudinary(answer.image);

          // Return the image URL along with the answer ID
          return {
            id: answer.id,
            image: imageUrl,
          };
          // return {
          //   ...answer,
          //   image: imageUrl,
          // };
        })
      );

      // Combine uploaded images with the original answers
      const updatedAnswers = data?.answers.map((answer: any) => {
        const uploadedAnswer = uploadedAnswers.find(
          (uploadedAnswer: any) => uploadedAnswer.id === answer.id
        );
        return uploadedAnswer
          ? { ...answer, image: uploadedAnswer.image }
          : answer;
      });

      // Extract tags and subjects
      const tags = data?.tags?.map((tag: any) => tag.label);
      const subjects = data?.subjects?.map((tag: any) => tag.label);

      // Encode question and solution to base64
      const base64Question = btoa(data.question);
      const base64Solution = btoa(data.solution);

      // Prepare parameters for createQuestionApi
      const params = {
        subjects,
        tags,
        question: data.question,
        answers: updatedAnswers,
        detailedSolution: base64Solution,
      };

      // Call createQuestionApi
      const response = await createQuestionApi(
        params,
        examId?._id,
        cookies?.professor?.token
      );
      console.log("response", response);

      showSuccessToast(localeSuccess?.SUCCESS_DECK_CREATED);
      navigate(-1);
    } catch (error: any) {
      console.log("error", error);
      showErrorToast(error?.response?.data?.errorMessage);
    } finally {
      setCreateLoading(false);
      handleCloseCreate();
    }
  };

  // const onSubmitCreate = async (data: any) => {
  //   console.log("onSubmitCreate", data);
  //   const base64Question = btoa(data.question);
  //   const base64Solution = btoa(data.solution);
  //   const tags = data?.tags?.map((tag: any) => tag.label);
  //   const subjects = data?.subjects?.map((tag: any) => tag.label);

  //   try {
  //     setCreateLoading(true);
  //     const uploadedAnswers = await Promise.all(
  //       data?.answers.map(async (answer: any) => {
  //         // Upload image to Cloudinary
  //         const imageUrl = await uploadImageToCloudinary(answer.image);

  //         // Replace the image file with the Cloudinary URL
  //         return {
  //           ...answer,
  //           imageUrl: imageUrl,
  //         };
  //       })
  //     );
  //     const params = {
  //       subjects,
  //       tags,
  //       question: base64Question,
  //       answers: uploadedAnswers,
  //       detailedSolution: base64Solution,
  //     };
  //     let response;
  //     response = await createQuestionApi(
  //       params,
  //       examId?._id,
  //       cookies?.professor?.token
  //     );
  //     console.log("response", response);
  //     // refetchClassDetails();
  //     // refetchclassDecks();
  //     showSuccessToast(localeSuccess?.SUCCESS_DECK_CREATED);
  //   } catch (error: any) {
  //     console.log("error", error);
  //     showErrorToast(error?.response?.data?.errorMessage);
  //   } finally {
  //     setCreateLoading(false);
  //     handleCloseCreate();
  //   }
  // };

  const onDeleteConfirm = async () => {
    // try {
    //   setDeleteLoading(true);
    //   let response;
    //   response = await deleteClassDeckApi(
    //     selectedExamId,
    //     cookies?.professor?.token
    //   );
    //   console.log("response", response);
    //   refetchClassDetails();
    //   refetchclassDecks();
    //   showSuccessToast(localeSuccess?.SUCCESS_DECK_DELETED);
    // } catch (error: any) {
    //   console.log("error", error);
    //   showErrorToast(error?.response?.data?.errorMessage);
    // } finally {
    //   setDeleteLoading(false);
    //   handleDeleteClose();
    // }
  };
  const onExamDeleteConfirm = async () => {
    try {
      setDeleteLoading(true);
      let response;
      response = await deleteExamApi(
        selectedExamId as string,
        cookies?.professor?.token
      );
      console.log("response", response);

      refetchAllExams();
      navigate("/professor/exams");
      showSuccessToast(localeSuccess?.SUCCESS_EXAM_DELETED);
    } catch (error: any) {
      console.log("error", error);
      showErrorToast(error?.response?.data?.errorMessage);
    } finally {
      setDeleteLoading(false);
      handleDeleteClose();
      // }
    }
  };

  const onSubmitEditExam = async (data: any) => {
    console.log("onSubmitEdit", data);
    const params = {
      title: data?.title,
      institute: data?.institute?.label,
      year: data?.year?.label,
    };
    try {
      setEditExamLoading(true);
      let response;
      response = await editExamApi(
        params,
        selectedExamId as string,
        cookies?.professor?.token
      );
      console.log("response", response);
      refetchAllExams();
      refetchexamsDetails();
      reset();
      showSuccessToast(localeSuccess?.SUCCESS_EXAM_UPDATED);
    } catch (error: any) {
      console.log("error", error);
      showErrorToast(error?.response?.data?.errorMessage);
    } finally {
      setEditExamLoading(false);
      handleEditClose();
    }
  };

  const getDetails = (data: string) => {
    navigate(`/professor/classes/deck?${data}`, { state: data });
  };

  return {
    control,
    errors,
    handleSubmit,
    setValue,
    watch,

    handleCloseCreate,
    onSubmitCreate,

    openDeleteModal,
    onDeleteConfirm,
    deleteModal,
    handleDeleteClose,
    deleteLoading,

    getDetails,
    examsDetailsLoading,
    examsDetails,
    openDeleteExamModal,
    handleDeleteExamClose,
    onExamDeleteConfirm,
    deleteExamModal,
    editModal,
    openEditModal,
    handleEditClose,
    onSubmitEditExam,
    editExamLoading,
    allTags,
    modifiedSubjects,
    createLoading,
  };
};
