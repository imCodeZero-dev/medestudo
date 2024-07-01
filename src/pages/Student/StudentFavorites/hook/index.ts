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
  getBookmarkCardsApi,
  toogleBookmarkApi,
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

  const [bookmarkLoading, setBookmarkLoading] = useState<boolean>(false);
  const [openViewCardModal, setOpenViewCardModal] = useState<boolean>(false);
  const navigate = useNavigate();
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [key, setKey] = useState(0);

  const {
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

  // console.log("flashcardData", flashcardData);

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
  };

  const handlePreviousFlashcard = () => {
    setCurrentFlashcardIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : prevIndex
    );
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
      response = await toogleBookmarkApi(params, cookies?.student?.token);
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
    if (bookmarkCards[currentFlashcardIndex]?.cardId) {
      const { question, answer, tags, questionImage, answerImage } =
        bookmarkCards[currentFlashcardIndex]?.cardId;
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
    console.log(
      "bookmarkCards[currentFlashcardIndex]",
      bookmarkCards[currentFlashcardIndex]
    );
  }, [currentFlashcardIndex, bookmarkCards]);

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
  };
};
