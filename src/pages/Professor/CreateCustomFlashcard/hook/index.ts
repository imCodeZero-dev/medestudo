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

import { createFlashcardApi } from "../../../../utils/api/professors";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {
  useAllClassesQuery,
  useAllFlashcardsQuery,
  useAllTagsQuery,
} from "../../../../redux/slices/APISlice";
import { uploadImageToCloudinary } from "../../../../utils/hooks/helper";
import {
  createCustomFlashcardApi,
  getAllCustomCardsByIdApi,
} from "../../../../utils/api/Students";

export const useCreateCustomFlashcard = () => {
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
    reset,
  } = useForm({
    // resolver: yupResolver(validationSchema),
    defaultValues: {},
  });

  const [createLoading, setCreateLoading] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();
  const deckData = location?.state;

  const { allTags, refetchAllTags, allTagsLoading, errorAllTags } =
    useAllTagsQuery(cookies);

  const {
    allFlashcards,
    allFlashcardsLoading,
    errorallFlashcards,
    refetchallFlashcards,
  } = useAllFlashcardsQuery(cookies, deckData?.deckId?._id as string);

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
      return getAllCustomCardsByIdApi(
        deckData?._id as string,
        cookies?.student?.token
      );
    },
    {
      enabled: !!cookies?.student?.token,
    }
  );

  console.log("CreateDeckData", deckData);

  useEffect(() => {
    if (!deckData) {
      navigate(-1);
    }
  });

  // const openCreate = useSelector((state: any) => state.modal.isOpen);
  const [createModal, setCreateModal] = useState(false);
  const handleCloseCreate = () => {
    setCreateModal(false);
  };

  const { allClasses, allClassesLoading, errorAllClasses, refetchAllClasses } =
    useAllClassesQuery(cookies);

  const getDetails = (data: string) => {
    navigate(`/student/classes/deck?${data}`, { state: data });
  };

  const onSubmitCreate = async (data: any) => {
    try {
      setCreateLoading(true);
      let questionImgUrl;
      if (data?.questionImage) {
        questionImgUrl = await uploadImageToCloudinary(data?.questionImage);
      }
      let answerImgUrl;
      if (data?.answerImage) {
        answerImgUrl = await uploadImageToCloudinary(data?.answerImage);
      }

      const tagsLabels = data?.tags?.map(
        (tag: { value: string; label: string }) => tag.label
      );
      const base64Question = btoa(data.question);
      const base64Answer = btoa(data.answer);

      // Prepare the payload with base64 encoded question and answer
      const payload = {
        question: base64Question,
        questionImage: questionImgUrl,
        answer: base64Answer,
        answerImage: answerImgUrl,
        tags: tagsLabels,
      };

      // Make the API call with the modified payload
      const response = await createCustomFlashcardApi(
        payload,
        deckData?._id,
        cookies?.student?.token
      );
      console.log("response", response);
      // refetchClassDetails();
      showSuccessToast(localeSuccess?.SUCCESS_FLASH_CREATED);
      // this refetch is not working, 
      refetchdeckDetails();
    } catch (error: any) {
      console.log("error", error);
      showErrorToast(error?.response?.data?.message);
    } finally {
      setCreateLoading(false);
      reset();
      navigate(-1);
    }
  };

  // console.log("filteredDecks", filteredDecks);
  return {
    control,
    errors,
    handleSubmit,
    setValue,
    watch,

    handleCloseCreate,
    onSubmitCreate,
    createLoading,
    setCreateModal,
    createModal,

    // classDetails,
    allTags,
    deckData,
    allClasses,
    allClassesLoading,
    getDetails,
  };
};
