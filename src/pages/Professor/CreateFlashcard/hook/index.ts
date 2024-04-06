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
import { closeModal } from "../../../../redux/slices/ModalSlice";
import {
  changeProfessorStatusApi,
  getAllDecksApi,
} from "../../../../utils/api/admin";
import {
  createClassApi,
  createFlashcardApi,
  getAllClassesApi,
  getClassByIdApi,
} from "../../../../utils/api/professors";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useAllTagsQuery } from "../../../../redux/slices/APISlice";

export const useCreateFlashcard = () => {
  // const navigate = useNavigate();
  const { localeSuccess } = useLocale();
  const [cookies] = useCookies(["professor"]);
  const dispatch = useDispatch();

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    // resolver: yupResolver(validationSchema),
    defaultValues: {},
  });

  const { allTags, refetchAllTags, allTagsLoading, errorAllTags } =
    useAllTagsQuery(cookies);

  const [createLoading, setCreateLoading] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();

  const deckId = location?.state;

  console.log("deckId", deckId);

  useEffect(() => {
    if (!deckId) {
      navigate(-1);
    }
  });

  // const openCreate = useSelector((state: any) => state.modal.isOpen);
  const [createModal, setCreateModal] = useState(false);
  const handleCloseCreate = () => {
    setCreateModal(false);
  };

  // const {
  //   data: { data: { class: classDetails = [] } = {} } = {},
  //   isLoading: classDetailsLoading,
  //   error: errorClassDetails,
  //   refetch: refetchClassDetails,
  // } = useQuery(
  //   [
  //     "classDetails",
  //     {
  //       cookies,
  //       deckId,
  //     },
  //   ],

  //   async () => {
  //     return getClassByIdApi(deckId, cookies?.professor?.token);
  //   },
  //   {
  //     enabled: !!cookies?.professor?.token && !!deckId,
  //   }
  // );
  // console.log("classDetails", classDetails);

  const onSubmitCreate = async (data: any) => {
    try {
      const tagsLabels = data?.tags?.map(
        (tag: { value: string; label: string }) => tag.label
      );
      const base64Question = btoa(data.question);
      const base64Answer = btoa(data.answer);

      // Prepare the payload with base64 encoded question and answer
      const payload = {
        question: base64Question,
        answer: base64Answer,
        tags: tagsLabels,
      };

      // Make the API call with the modified payload
      setCreateLoading(true);
      const response = await createFlashcardApi(
        payload,
        deckId?._id,
        cookies?.professor?.token
      );
      console.log("response", response);
      // refetchClassDetails();
      showSuccessToast(localeSuccess?.SUCCESS_FLASH_CREATED);
    } catch (error: any) {
      console.log("error", error);
      showErrorToast(error?.response?.data?.errorMessage);
    } finally {
      setCreateLoading(false);
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
  };
};
