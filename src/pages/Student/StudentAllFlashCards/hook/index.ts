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
  useClassDetailsQuery,
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
  const classIds = location?.state?.classIds?.map((cl: any) => cl);
  console.log("all ids", "classIds", classIds, "deckIds", deckIds);
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
  const [occuranceRatings, setOccuranceRatings] = useState<number[]>([]);
  const [masteryLevel, setMasteryLevel] = useState<number>(0);
  const [ratings, setRatings] = useState([
    { label: "Total", value: 0, maxValue: 20 },
    { label: "1", value: 0, maxValue: 20 },
    { label: "2", value: 0, maxValue: 20 },
    { label: "3", value: 0, maxValue: 20 },
    { label: "4", value: 0, maxValue: 20 },
    { label: "5", value: 0, maxValue: 20 },
  ]);
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

  // const {
  //   classDetails,
  //   classDetailsLoading,
  //   errorClassDetails,
  //   refetchClassDetails,
  // } = useClassDetailsQuery(classIds?.[0], cookies?.student);

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
    // callOccuranceAPI();
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

  const getDetails = (data: string) => {
    navigate(`/professor/classes/deck?${data}`, { state: data });
  };

  const handleNextFlashcard = () => {
    setCurrentFlashcardIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      console.log("allFlashcardsLoaded", allFlashcardsLoaded);
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
    const params = {
      rate: rating,
      studentId: cookies?.student?.student?._id,
      cardId: allFlashcards?.[currentFlashcardIndex]?._id,
    };
    try {
      setRatingLoading(true);
      let response;
      response = await provideRateToCardApi(params, cookies?.student?.token);

      if (flashcards?.length - 1 === currentFlashcardIndex) {
        if (!allFlashcardsLoaded) {
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
    // console.log("toggleBookmark", data);
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
      if (combine) {
        callOccuranceAPI();
      }
    }
    console.log("allFlashcards", allFlashcards, "allClasses", allClasses);
  }, [allFlashcards]);

  useEffect(() => {
    if (deckDetails?.classId?._id) {
      callOccuranceAPI();
    }
  }, [deckDetails]);

  const loadInitialFlashcards = () => {
    const initialBatch = allFlashcards.slice(0, BATCH_SIZE);
    const currentBatchID = initialBatch?.map(({ _id }: any) => _id);
    setBatchflashcardId(currentBatchID);
    setFlashcards(initialBatch);

    setCurrentBatchIndex(0);
    setCurrentFlashcardIndex(0);
    setAllFlashcardsLoaded(allFlashcards.length <= BATCH_SIZE);
  };

  const loadMoreFlashcards = () => {
    setConfidenceLevel(0);
    setRateArray([]);
    const startIndex = (currentBatchIndex + 1) * BATCH_SIZE;
    const endIndex = startIndex + BATCH_SIZE;
    console.log("startIndex", startIndex, "endIndex", endIndex);
    const newBatch = allFlashcards.slice(startIndex, endIndex);
    const currentBatchID = newBatch?.map(({ _id }: any) => _id);
    setBatchflashcardId(currentBatchID);
    console.log("newBatch", newBatch.length, "BATCH_SIZE", BATCH_SIZE);

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
          // classId: classIds,
          classId: !combine ? [deckDetails?.classId?._id] : classIds,
        },
        cookies?.student?.token
      );
      console.log("response", response);
      setOccuranceRatings(response?.data?.data);
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
    setStopTimer(true);
    if (time) {
      setTotalTime(time);
    }
  };

  const navigateToDashboard = () => {
    navigate("/student");
    handleCheckpointModalClose();
  };

  useEffect(() => {
    let total = 0;
    let totalWeightedValue = 0;
    let totalResponses = 0;

    const updatedRatings = ratings.map((rating) => {
      const label = rating.label;

      if (label === "Total") {
        return rating; // Skip updating "Total" for now
      }

      const labelAsNumber = Number(label);
      if (labelAsNumber in occuranceRatings) {
        const value = occuranceRatings[labelAsNumber];
        total += value;
        totalWeightedValue += value * labelAsNumber;
        totalResponses += value;
        return { ...rating, value };
      }

      return rating;
    });

    // Update the "Total" label with the total value
    const newRatingIndex = updatedRatings.findIndex(
      (rating) => rating.label === "Total"
    );
    if (newRatingIndex !== -1) {
      updatedRatings[newRatingIndex] = {
        ...updatedRatings[newRatingIndex],
        value: total,
      };
    }

    setRatings(updatedRatings);

    // Calculate mastery level
    if (totalResponses > 0) {
      const averageRating = totalWeightedValue / totalResponses;
      const masteryLevel = (averageRating / 5) * 100;
      setMasteryLevel(Number(masteryLevel.toFixed(1)));
    } else {
      setMasteryLevel(0); // If no responses, set mastery to 0%
    }
  }, [occuranceRatings]);

  useEffect(() => {
    console.log("deckDetails", deckDetails);
  }, [deckDetails]);
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
    ratings,
    masteryLevel,
    combine,
    // setgetTotalTime,
  };
};
