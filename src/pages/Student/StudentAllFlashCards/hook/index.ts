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
  createFlashcardApi,
  deleteFlashcardApi,
  editFlashcardApi,
  getAllClassesApi,
  getAllFlashcardsByIdApi,
  getClassByIdApi,
  getDeckDetailsApi,
} from "../../../../utils/api/professors";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import {
  useAllClassesQuery,
  useAllFlashcardsQuery,
  useAllTagsQuery,
} from "../../../../redux/slices/APISlice";
import { Flashcard, Tag } from "../../../../utils/constants/DataTypes";
import { uploadImageToCloudinary } from "../../../../utils/hooks/helper";
import {
  deleteCustomFlashcardApi,
  editCustomFlashcardApi,
  getAllCardsByIdApi,
  getAllCustomCardsByIdApi,
  provideRateToCardApi,
  startStudyingApi,
} from "../../../../utils/api/Students";

export const useStudentAllFlashCards = () => {
  // const navigate = useNavigate();
  const { localeSuccess } = useLocale();
  const [cookies] = useCookies(["student"]);
  const dispatch = useDispatch();
  const { deckId } = useParams();

  const location = useLocation();

  const mode = location?.state?.mode;
  const combine = location?.pathname?.includes("combine");
  const custom = location?.pathname?.includes("custom");
  const customId = location?.state?._id;
  console.log("customVariable", custom, "customId", customId);

  console.log("AllFlashCards mode", mode);
  console.log("AllFlashCards location", location);
  const deckIds = location?.state?.ids?.map((deck: any) => deck?._id);
  console.log("deckIds", deckIds);
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
    questionImage: string;
    new_questionImage: string;
    answerImage: string;
    new_answerImage: string;
    answer: string;
    tags: string[];
  }>({
    // resolver: yupResolver(validationSchema),
    defaultValues: {},
  });

  const tags = watch("tags");

  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [openViewCardModal, setOpenViewCardModal] = useState<boolean>(false);
  const [allSetModal, setAllSetModal] = useState<boolean>(false);
  const [deleteModal, setdeleteModal] = useState<boolean>(false);
  const [enableEdit, setEnableEdit] = useState<boolean>(false);
  const [editLoading, setEditLoading] = useState<boolean>(false);
  const [flashcardData, setFlashcardData] = useState<any>();
  const navigate = useNavigate();
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);

  const { allTags, refetchAllTags, allTagsLoading, errorAllTags } =
    useAllTagsQuery(cookies);

  const handleViewCardModalClose = () => {
    setOpenViewCardModal(false);
  };
  const handleViewCardModalOpen = () => {
    setOpenViewCardModal(true);
  };
  const handleAllSetModalClose = () => {
    setAllSetModal(false);
  };
  const handleAllSetModalOpen = () => {
    setAllSetModal(true);
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

  const handleEditClose = () => {
    setEnableEdit(false);
  };

  // console.log("flashcardData", flashcardData);

  const { allClasses, allClassesLoading, errorAllClasses, refetchAllClasses } =
    useAllClassesQuery(cookies);

  // const {
  //   allFlashcards,
  //   allFlashcardsLoading,
  //   errorallFlashcards,
  //   refetchallFlashcards,
  // } = useAllFlashcardsQuery(cookies, deckId as string);

  const {
    data: allFlashcardsData = {} as any,
    isLoading: allFlashcardsLoading,
    error: errorAllFlashcards,
    refetch: refetchAllFlashcards,
  } = useQuery(
    ["allFlashcards", { cookies, deckIds, deckId, combine, custom }],
    async () => {
      if (combine) {
        return startStudyingApi(deckIds as string, cookies?.student?.token);
      } else if (custom) {
        return getAllCustomCardsByIdApi(
          customId as string,
          cookies?.student?.token
        ); // Assuming a custom API exists
      } else {
        // Call the default API when neither combine nor custom is true
        return getAllCardsByIdApi(deckId as string, cookies?.student?.token);
      }
    },
    {
      enabled: !!cookies?.student?.token && (combine ? !!deckIds : !!deckId),
    }
  );

  const allFlashcards = combine
    ? allFlashcardsData?.data?.combinedCards || []
    : custom
    ? allFlashcardsData?.data?.cards || []
    : allFlashcardsData?.data?.cards || [];

  // const {
  //   data: { data: { combinedCards: allFlashcards = [] } = {} } = {},
  //   isLoading: allFlashcardsLoading,
  //   error: errorAllFlashcards,
  //   refetch: refetchAllFlashcards,
  // } = useQuery(
  //   [
  //     "allFlashcards",
  //     {
  //       cookies,
  //       deckIds,
  //     },
  //   ],

  //   async () => {
  //     return startStudyingApi(deckIds as string, cookies?.student?.token);
  //   },
  //   {
  //     enabled: !!cookies?.student?.token && !!deckIds,
  //   }
  // );
  // const {
  //   data: { data: { cards: allFlashcards = [] } = {} } = {},
  //   isLoading: allFlashcardsLoading,
  //   error: errorAllFlashcards,
  //   refetch: refetchAllFlashcards,
  // } = useQuery(
  //   [
  //     "allFlashcards",
  //     {
  //       cookies,
  //       deckId,
  //     },
  //   ],

  //   async () => {
  //     return getAllCardsByIdApi(deckId as string, cookies?.student?.token);
  //   },
  //   {
  //     enabled: !!cookies?.student?.token && !!deckId,
  //   }
  // );

  console.log("allFlashcards", allFlashcards);

  const {
    data: { data: { Deck: deckDetails = [] } = {} } = {},
    isLoading: deckDetailsLoading,
    error: errordeckDetails,
    refetch: refetchdeckDetails,
  } = useQuery(
    [
      "deckDetails",
      {
        cookies,
      },
    ],

    async () => {
      return getDeckDetailsApi(deckId as string, cookies?.student?.token);
    },
    {
      enabled: !!cookies?.student?.token,
    }
  );

  // console.log("deckDetails", deckDetails);

  const getDetails = (data: string) => {
    navigate(`/professor/classes/deck?${data}`, { state: data });
  };

  // console.log("allFlashcards", allFlashcards);

  const handleNextFlashcard = () => {
    setCurrentFlashcardIndex((prevIndex) =>
      prevIndex < allFlashcards?.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const handlePreviousFlashcard = () => {
    setCurrentFlashcardIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : prevIndex
    );
  };
  const handleRatingChange = async (rating: number) => {
    console.log(`Selected Rating: ${rating}`);
    const params = {
      rate: rating,
      studentId: cookies?.student?.student?._id,
      cardId: allFlashcards?.[0]?._id,
    };
    try {
      setDeleteLoading(true);
      let response;
      response = await provideRateToCardApi(params, cookies?.student?.token);
      console.log("response", response);
      // showSuccessToast(localeSuccess?.SUCCESS_RATE);
      handleAllSetModalOpen();
      // refetchallFlashcards();
      // navigate(-1);
    } catch (error: any) {
      console.log("error", error);
      showErrorToast(error?.response?.data?.message);
    } finally {
      setDeleteLoading(false);
      // handleDeleteClose();
    }
  };

  const onDeleteConfirm = async () => {
    try {
      setDeleteLoading(true);
      let response;
      response = await deleteCustomFlashcardApi(
        flashcardData?._id,
        cookies?.student?.token
      );
      console.log("response", response);
      showSuccessToast(localeSuccess?.SUCCESS_FLASH_DELETED);
      refetchAllFlashcards();
      navigate(-1);
    } catch (error: any) {
      console.log("error", error);
      showErrorToast(error?.response?.data?.message);
    } finally {
      setDeleteLoading(false);
      handleDeleteClose();
    }
  };

  const onSubmitEdit = async (data: any) => {
    try {
      let questionImgUrl = data?.questionImage;
      if (data?.questionImage !== data?.new_questionImage) {
        questionImgUrl = await uploadImageToCloudinary(data?.new_questionImage);
      }
      let answerImgUrl = data?.answerImage;
      if (data?.answerImage !== data?.new_answerImage) {
        answerImgUrl = await uploadImageToCloudinary(data?.new_answerImage);
      }
      const tagsLabels = data?.tags?.map(
        (tag: { value: string; label: string }) => tag.label
      );
      const base64Question = btoa(data.question);
      const base64Answer = btoa(data.answer);
      const payload = {
        question: base64Question,
        questionImage: questionImgUrl,
        answerImage: answerImgUrl,
        answer: base64Answer,
        tags: tagsLabels,
      };
      setEditLoading(true);
      const response = await editCustomFlashcardApi(
        payload,
        flashcardData?._id,
        cookies?.student?.token
      );
      console.log("response", response);
      showSuccessToast(localeSuccess?.SUCCESS_FLASH_EDIT);
      refetchAllFlashcards();
    } catch (error: any) {
      console.log("error", error);
      showErrorToast(error?.response?.data?.message);
    } finally {
      setEditLoading(false);
      reset();
      // navigate(-1);
    }
  };

  useEffect(() => {
    // Set initial values when component mounts or currentFlashcardIndex changes
    if (allFlashcards[currentFlashcardIndex]) {
      const { question, answer, tags, questionImage, answerImage } =
        allFlashcards[currentFlashcardIndex];
      try {
        const decodedQuestion = atob(question);
        const decodedAnswer = atob(answer);
        setValue("question", decodedQuestion);
        setValue("answer", decodedAnswer);
        setValue("questionImage", questionImage);
        setValue("answerImage", answerImage);
        setValue("new_questionImage", questionImage);
        setValue("new_answerImage", answerImage);
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
  }, [currentFlashcardIndex, allFlashcards]);

  // console.log("allTags", allTags, "watchTags", tags);

  return {
    control,
    errors,
    handleSubmit,
    setValue,
    watch,

    handleNextFlashcard,
    handlePreviousFlashcard,
    allFlashcards,
    allTags,
    currentFlashcardIndex,
    onDeleteConfirm,
    deleteModal,
    deleteLoading,
    handleDeleteOpen,
    handleDeleteClose,
    handleEditOpen,
    handleEditClose,
    enableEdit,
    tags,
    allClasses,
    allClassesLoading,
    getDetails,
    onSubmitEdit,
    editLoading,
    allFlashcardsLoading,
    deckDetails,
    mode,
    handleRatingChange,
    handleViewCardModalClose,
    openViewCardModal,
    handleViewCardModalOpen,
    allSetModal,
    handleAllSetModalClose,
    custom,
  };
};
