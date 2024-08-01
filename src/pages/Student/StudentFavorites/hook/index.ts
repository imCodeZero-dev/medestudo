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
  useAllTagsQuery,
} from "../../../../redux/slices/APISlice";
import { Tag } from "../../../../utils/constants/DataTypes";
import {
  BookmarkApi,
  getBookmarkCardsApi,
  removeBookmarkApi,
} from "../../../../utils/api/Students";

export const useStudentFavorites = () => {
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
  const [revealAnswer, setRevealAnswer] = useState(false);
  const [bookmarkLoading, setBookmarkLoading] = useState<boolean>(false);
  const [openViewCardModal, setOpenViewCardModal] = useState<boolean>(false);
  const [emptyArray, setEmptyArray] = useState<boolean>(false);
  const navigate = useNavigate();
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [key, setKey] = useState(0);

  let {
    data: {
      data: { bookMarks: bookmarkCards = [], bookMarksCount = 0 } = {},
    } = {},
    // data: { bookMarks = [], bookMarksCount = 0 } = {},
    isLoading: bookmarkCardsLoading,
    error: errorbookmarkCards,
    refetch: refetchbookmarkCards,
  } = useQuery(
    [
      "bookmarkCards",
      {
        cookies,
      },
    ],

    async () => {
      return getBookmarkCardsApi(
        cookies?.student?.student?._id,
        cookies?.student?.token
      );
    },
    {
      enabled: !!cookies?.student?.token,
    }
  );

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
      prevIndex < bookmarkCards?.length - 1 ? prevIndex + 1 : prevIndex
    );
    setRevealAnswer(false);
  };

  const handlePreviousFlashcard = () => {
    setCurrentFlashcardIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : prevIndex
    );
    setRevealAnswer(false);
  };

  const toggleBookmark = async (data: any) => {
    const params = {
      studentId: cookies?.student?.student?._id,
      cardId: data?.cardId,
    };
    try {
      setBookmarkLoading(true);
      setCurrentFlashcardIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      );
      setKey((prevKey) => prevKey + 1);
      let response;
      if (data?.bookmarked) {
        response = await removeBookmarkApi(params, cookies?.student?.token);
        showSuccessToast(localeSuccess?.SUCCESS_BOOKMARK_REMOVED);
        if (bookmarkCards?.length === 1) {
          setKey(-1);
          setEmptyArray(true);
        }
      } else {
        response = await BookmarkApi(params, cookies?.student?.token);
        showSuccessToast(localeSuccess?.SUCCESS_BOOKMARK_ADDED);
      }
      console.log("response", response);
      refetchbookmarkCards();
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
    if (bookmarkCards.length === 0 && emptyArray) {
      setEmptyArray(false); // Reset the emptyArray state
      setValue("question", "");
      setValue("answer", "");
      setValue("questionImage", "");
      setValue("answerImage", "");
      setValue("tags", []);
    } else if (bookmarkCards[currentFlashcardIndex]?.card) {
      const { question, answer, tags, questionImage, answerImage } =
        bookmarkCards[currentFlashcardIndex]?.card;
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
  }, [currentFlashcardIndex, bookmarkCards]);


  // useEffect(() => {
  //   if (bookmarkCards[currentFlashcardIndex]?.card) {
  //     const { question, answer, tags, questionImage, answerImage } =
  //       bookmarkCards[currentFlashcardIndex]?.card;
  //     try {
  //       setKey((prevKey) => prevKey + 1);
  //       const decodedQuestion = atob(question);
  //       const decodedAnswer = atob(answer);
  //       setValue("question", decodedQuestion);
  //       setValue("answer", decodedAnswer);
  //       setValue("questionImage", questionImage);
  //       setValue("answerImage", answerImage);
  //       setValue("new_questionImage", questionImage);
  //       setValue("new_answerImage", answerImage);
  //       if (tags && tags.length > 0) {
  //         const filteredTags = tags?.map((item: Tag) => ({
  //           title: item,
  //           value: item,
  //           label: item,
  //         }));
  //         setValue("tags", filteredTags);
  //       } else {
  //         setValue("tags", []);
  //       }
  //     } catch (error) {
  //       console.error("Error decoding base64 string:", error);
  //     }
  //   }
  //   console.log("bookmarkCards[currentFlashcardIndex]", bookmarkCards);
  // }, [currentFlashcardIndex, bookmarkCards]);

  // console.log("bookmarkCards", bookmarkCards);

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
    bookmarkCards,
    getDetails,
    bookmarkCardsLoading,
    key,
    revealAnswer,
    setRevealAnswer,
    bookmarkLoading,
  };
};
