import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../../config/toastProvider/toastUtils";

import useLocale from "../../../../locales";
import { useCookies } from "react-cookie";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  useAllClassesQuery,
  useAllReviewDecksQuery,
  useAllTagsQuery,
} from "../../../../redux/slices/APISlice";
import { reviewDeckType, Tag } from "../../../../utils/constants/DataTypes";
import {
  BookmarkApi,
  provideRateToCardApi,
} from "../../../../utils/api/Students";

export const useStudentReviewDecks = () => {
  // const navigate = useNavigate();
  const { localeSuccess } = useLocale();
  const [cookies] = useCookies(["student"]);
  const dispatch = useDispatch();

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
    getValues,
    reset,
  } = useForm<any>({
    // resolver: yupResolver(validationSchema),
    defaultValues: {},
  });

  const tags = watch("tags");

  const [bookmarkLoading, setBookmarkLoading] = useState<boolean>(false);
  const [ratingLoading, setRatingLoading] = useState<boolean>(false);
  const [openViewCardModal, setOpenViewCardModal] = useState<boolean>(false);
  const navigate = useNavigate();
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [key, setKey] = useState(0);

  const {
    reviewDecks,
    refetchReviewDecks,
    reviewDecksLoading,
    errorReviewDecks,
  } = useAllReviewDecksQuery(cookies?.student);

  const { allTags, refetchAllTags, allTagsLoading, errorAllTags } =
    useAllTagsQuery(cookies);

  const handleViewCardModalClose = () => {
    setOpenViewCardModal(false);
  };
  const handleViewCardModalOpen = () => {
    setOpenViewCardModal(true);
  };


  const { allClasses, allClassesLoading, errorAllClasses, refetchAllClasses } =
    useAllClassesQuery(cookies);

  const getDetails = (data: any) => {
    navigate(`/student/flashcard/deck?${data?._id}`, {
      state: { ...data },
    });
  };

  const handleNextFlashcard = () => {
    setCurrentFlashcardIndex((prevIndex) =>
      prevIndex < reviewDecks?.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const handlePreviousFlashcard = () => {
    setCurrentFlashcardIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : prevIndex
    );
  };

  const toggleBookmark = async (data: any) => {
    setBookmarkLoading(true);
    const params = {
      studentId: cookies?.student?.student?._id,
      cardId: data?._id,
    };
    try {
      let response;
      response = await BookmarkApi(params, cookies?.student?.token);
      console.log("response", response);
      showSuccessToast(localeSuccess?.SUCCESS_BOOKMARK_ADDED);
      // refetchAllFlashcards();
      // navigate(-1);
    } catch (error: any) {
      console.log("error", error);
      showErrorToast(error?.response?.data?.message);
    } finally {
      setBookmarkLoading(false);
      // handleDeleteClose();
    }
  };

  useEffect(() => {
    // Set initial values when component mounts or currentFlashcardIndex changes
    reviewDecks.forEach((deck: reviewDeckType, i: number) => {
      if (deck?.data?.rated) {
        const { question, answer, tags, questionImage, answerImage } =
          deck?.data?.rated;
        try {
          setKey((prevKey) => prevKey + 1);

          const decodedQuestion = atob(question);
          const decodedAnswer = atob(answer);
          setValue(`question-${i}`, decodedQuestion);
          setValue(`answer-${i}`, decodedAnswer);
          setValue(`questionImage-${i}`, questionImage);
          setValue(`answerImage-${i}`, answerImage);
          setValue(`new_questionImage-${i}`, questionImage);
          setValue(`new_answerImage-${i}`, answerImage);
          if (tags && tags.length > 0) {
            const filteredTags = tags.map((item: Tag) => ({
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
    });
  }, [currentFlashcardIndex, reviewDecks]);

  const handleRatingChange = async (rating: number, id: string) => {
    const params = {
      rate: rating,
      studentId: cookies?.student?.student?._id,
      cardId: id,
      // cardId: reviewDecks?.[0]?.data?.rated?._id,
      // cardId: reviewDecks?.[0]?.rated?._id,
    };
    try {
      setRatingLoading(true);
      let response;
      response = await provideRateToCardApi(params, cookies?.student?.token);
      console.log("response", response);
    } catch (error: any) {
      console.log("error", error);
      showErrorToast(error?.response?.data?.message);
    } finally {
      setRatingLoading(false);
    }
  };


  return {
    control,
    errors,
    handleSubmit,
    setValue,
    watch,
    handleNextFlashcard,
    handlePreviousFlashcard,
    allTags,
    currentFlashcardIndex,
    tags,
    allClasses,
    allClassesLoading,
    handleViewCardModalClose,
    openViewCardModal,
    handleViewCardModalOpen,
    toggleBookmark,
    reviewDecks,
    getDetails,
    reviewDecksLoading,
    key,
    handleRatingChange,
    ratingLoading,
    bookmarkLoading,
  };
};
