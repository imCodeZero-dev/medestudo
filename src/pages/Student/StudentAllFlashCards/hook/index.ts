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
import { getDeckDetailsApi } from "../../../../utils/api/professors";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import {
  useAllClassesQuery,
  useAllFlashcardsQuery,
  useAllReviewDecksQuery,
  useAllTagsQuery,
} from "../../../../redux/slices/APISlice";
import {
  Flashcard,
  Tag,
  flashcardData,
} from "../../../../utils/constants/DataTypes";
import {
  calculateConfidenceLevel,
  uploadImageToCloudinary,
} from "../../../../utils/hooks/helper";
import {
  BookmarkApi,
  deleteCustomFlashcardApi,
  editCustomFlashcardApi,
  getAllCardsByIdApi,
  getAllCustomCardsByIdApi,
  provideRateToCardApi,
  ratingOccuranceApi,
  removeBookmarkApi,
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

  const deckIds = location?.state?.ids?.map((deck: any) => deck?._id);
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

  const [bookmarkLoading, setBookmarkLoading] = useState<boolean>(false);
  const [stopTimer, setStopTimer] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [occuranceLoading, setOccuranceLoading] = useState<boolean>(false);
  const [ratingLoading, setRatingLoading] = useState<boolean>(false);
  const [openViewCardModal, setOpenViewCardModal] = useState<boolean>(false);
  const [allSetModal, setAllSetModal] = useState<boolean>(false);
  const [checkpointModal, setCheckpointModal] = useState<boolean>(false);
  const [deleteModal, setdeleteModal] = useState<boolean>(false);
  const [enableEdit, setEnableEdit] = useState<boolean>(false);
  const [editLoading, setEditLoading] = useState<boolean>(false);
  const [flashcardData, setFlashcardData] = useState<any>();
  const navigate = useNavigate();
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [flashcards, setFlashcards] = useState<flashcardData[]>([]);
  const [batchflashcardId, setBatchflashcardId] = useState<string[]>([]);
  const [currentBatchIndex, setCurrentBatchIndex] = useState(0);
  const [confidenceLevel, setConfidenceLevel] = useState(0);
  const [rateArray, setRateArray] = useState<number[]>([]);
  const BATCH_SIZE = 10;
  const [allFlashcardsLoaded, setAllFlashcardsLoaded] = useState(false);
  const [revealAnswer, setRevealAnswer] = useState(false);

  const [key, setKey] = useState(0);

  const [TotalTime, setTotalTime] = useState<number>(0);

  const { allTags, refetchAllTags, allTagsLoading, errorAllTags } =
    useAllTagsQuery(cookies);

  const {
    reviewDecks,
    refetchReviewDecks,
    reviewDecksLoading,
    errorReviewDecks,
  } = useAllReviewDecksQuery(cookies?.student);

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
    callOccuranceAPI();
    setAllSetModal(true);
  };
  const handleCheckpointModalClose = () => {
    setCheckpointModal(false);
  };
  const handleCheckpointModalOpen = () => {
    setCheckpointModal(true);
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
    setKey((prevKey) => prevKey + 1);
    // navigate("/professor/classes/deck/flashcard", { state: data });
  };

  const handleEditClose = () => {
    setEnableEdit(false);
    setKey((prevKey) => prevKey + 1);
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
        );
      } else {
        return getAllCardsByIdApi(deckId as string, cookies?.student?.token);
      }
    },
    {
      enabled: !!cookies?.student?.token && (combine ? !!deckIds : !!deckId),
    }
  );

  let allFlashcards = combine
    ? allFlashcardsData?.data?.combinedCards || []
    : custom
    ? allFlashcardsData?.data?.cards || []
    : allFlashcardsData?.data?.cards || [];

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

  // const handleNextFlashcard = () => {
  //   setCurrentFlashcardIndex((prevIndex) =>
  //     prevIndex < allFlashcards?.length - 1 ? prevIndex + 1 : prevIndex
  //   );
  // };

  const handleNextFlashcard = () => {
    setCurrentFlashcardIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;

      console.log("nextIndex", nextIndex, "BATCH_SIZE", BATCH_SIZE);
      if (nextIndex >= BATCH_SIZE) {
        if (!allFlashcardsLoaded) {
          loadMoreFlashcards();
        } else {
          handleAllSetModalOpen();
        }
      }

      return nextIndex < flashcards.length ? nextIndex : prevIndex;
    });
    setRevealAnswer(false);
  };

  const handlePreviousFlashcard = () => {
    setCurrentFlashcardIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : prevIndex
    );
    setRevealAnswer(false);
  };
  const handleRatingChange = async (rating: number) => {
    console.log(`Selected Rating: ${rating}`);
    const params = {
      rate: rating,
      studentId: cookies?.student?.student?._id,
      cardId: allFlashcards?.[0]?._id,
    };
    try {
      setRatingLoading(true);
      let response;
      response = await provideRateToCardApi(params, cookies?.student?.token);
      console.log("response", response);

      if (flashcards?.length - 1 === currentFlashcardIndex) {
        if (flashcards?.length !== allFlashcards?.length) {
          getTotalTime();
          handleCheckpointModalOpen();
          setConfidenceLevel;
        } else {
          handleAllSetModalOpen();
        }
      } else {
        handleNextFlashcard();
      }

      const calculate = calculateConfidenceLevel(rating, flashcards?.length);
      setConfidenceLevel((prev) => prev + calculate);
      rateArray.push(rating);
      refetchReviewDecks();
      setRateArray([...rateArray]);
    } catch (error: any) {
      console.log("error", error);
      showErrorToast(error?.response?.data?.message);
    } finally {
      setRatingLoading(false);
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
      setEditLoading(true);
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
      const response = await editCustomFlashcardApi(
        payload,
        flashcardData?._id,
        cookies?.student?.token
      );
      console.log("response", response);
      handleEditClose();
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
  const toggleBookmark = async (data: any) => {
    console.log("toggleBookmark", data);
    const params = {
      studentId: cookies?.student?.student?._id,
      cardId: data?._id,
    };

    try {
      setBookmarkLoading(true);
      let response;
      if (data?.bookmarked) {
        response = await removeBookmarkApi(params, cookies?.student?.token);
        showSuccessToast(localeSuccess?.SUCCESS_BOOKMARK_REMOVED);
      } else {
        response = await BookmarkApi(params, cookies?.student?.token);
        showSuccessToast(localeSuccess?.SUCCESS_BOOKMARK_ADDED);
      }

      const updatedFlashcards = flashcards?.map((obj) => {
        if (obj._id === data?._id) {
          return { ...obj, bookmarked: !obj.bookmarked };
        }
        return obj;
      });

      setFlashcards(updatedFlashcards);
    } catch (error: any) {
      console.log("error", error);
      showErrorToast(error?.response?.data?.message);
    } finally {
      setBookmarkLoading(false);
    }
  };

  useEffect(() => {
    if (allFlashcards[currentFlashcardIndex]) {
      const { question, answer, tags, questionImage, answerImage } =
        allFlashcards[currentFlashcardIndex];
      try {
        setKey((prevKey) => prevKey + 1);
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
  }, [currentFlashcardIndex, flashcards, enableEdit]);

  useEffect(() => {
    if (allFlashcards.length > 0) {
      loadInitialFlashcards();
    }
  }, [allFlashcards]);

  const loadInitialFlashcards = () => {
    const initialBatch = allFlashcards.slice(0, BATCH_SIZE);
    const currentBatchID = initialBatch?.map(({ _id }: any) => _id);
    setBatchflashcardId(currentBatchID);
    setFlashcards(initialBatch);

    setCurrentBatchIndex(0);
    setCurrentFlashcardIndex(0);
    setAllFlashcardsLoaded(allFlashcards.length <= BATCH_SIZE);
  };

  // console.log("batchflashcardId", batchflashcardId);

  const loadMoreFlashcards = () => {
    const startIndex = (currentBatchIndex + 1) * BATCH_SIZE;
    const endIndex = startIndex + BATCH_SIZE;
    const newBatch = allFlashcards.slice(startIndex, endIndex);
    const currentBatchID = newBatch?.map(({ _id }: any) => _id);
    setBatchflashcardId(currentBatchID);

    setFlashcards(newBatch);
    setCurrentBatchIndex((prevIndex) => prevIndex + 1);
    setCurrentFlashcardIndex(0); // Reset to the first card in the new batch
    handleCheckpointModalClose();
    setAllFlashcardsLoaded(newBatch.length < BATCH_SIZE);
    callOccuranceAPI();
  };

  const callOccuranceAPI = async () => {
    try {
      setOccuranceLoading(true);
      let response;
      response = await ratingOccuranceApi(
        {
          studentId: cookies?.student?.student?._id,
          flashcards: batchflashcardId,
        },
        cookies?.student?.token
      );
      console.log("response", response);
      // showSuccessToast(localeSuccess?.SUCCESS_FLASH_DELETED);
      // refetchAllFlashcards();
      // navigate(-1);
    } catch (error: any) {
      console.log("error", error);
      showErrorToast(error?.response?.data?.message);
    } finally {
      setOccuranceLoading(false);
    }
  };

  const getTotalTime = (time?: number) => {
    console.log("totaltime", time);
    setStopTimer(true);
    if (time) {
      setTotalTime(time);
    }
  };

  const navigateToDashboard = () => {
    navigate("/student");
    handleCheckpointModalClose();
  };

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
    toggleBookmark,
    flashcards,
    currentBatchIndex,
    checkpointModal,
    handleCheckpointModalClose,
    loadMoreFlashcards,
    getTotalTime,
    TotalTime,
    stopTimer,
    navigateToDashboard,
    key,
    revealAnswer,
    setRevealAnswer,
    confidenceLevel,
    bookmarkLoading,
    rateArray,
    ratingLoading,
    // setgetTotalTime,
  };
};
