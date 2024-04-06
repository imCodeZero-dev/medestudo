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
  deleteClassApi,
  deleteClassDeckApi,
  getAllClassesApi,
  getClassByIdApi,
} from "../../../../utils/api/professors";
import { useNavigate } from "react-router-dom";
import { useAllClassesQuery } from "../../../../redux/slices/APISlice";

export const useProfessorClasses = () => {
  // const navigate = useNavigate();
  const { localeSuccess } = useLocale();
  const [cookies] = useCookies(["professor"]);
  const dispatch = useDispatch();
  const [viewClass, setViewClass] = useState<boolean>(true);
  const [viewClassDetails, setViewClassDetails] = useState<boolean>(false);
  const [classId, setClassId] = useState<string>();
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm({
    // resolver: yupResolver(validationSchema),
    defaultValues: {},
  });
  const {
    handleSubmit: handleSubmitFlashcard,
    control: controlFlashcard,
    formState: { errors: errorsFlashcard },
    watch: watchFlashcard,
  } = useForm({
    // resolver: yupResolver(validationSchema),
    defaultValues: {},
  });

  const [createLoading, setCreateLoading] = useState<boolean>(false);

  const openCreate = useSelector((state: any) => state.modal.isOpen);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [selecteClassId, setSelecteClassId] = useState<null | string>(null);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClickOptions = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseOptions = () => {
    setAnchorEl(null);
  };

  const handleCloseCreate = () => {
    dispatch(closeModal());
  };

  const handleDeleteClose = () => {
    setDeleteModal(false);
  };

  const openDeleteModal = (id: string) => {
    console.log("openDeleteModal", id);
    handleCloseOptions();
    setSelecteClassId(id);
    setDeleteModal(true);
  };

  // const {
  //   data: { data: { class: classDetails = [] } = {} } = {},
  //   isLoading: classDetailsLoading,
  //   error: errorclassDetails,
  //   refetch: refetchclassDetails,
  // } = useQuery(
  //   [
  //     "classDetails",
  //     {
  //       cookies,
  //     },
  //   ],

  //   async () => {
  //     return getClassByIdApi(classId as string, cookies?.professor?.token);
  //   },
  //   {
  //     enabled: !!cookies?.professor?.token && !!classId,
  //   }
  // );

  // console.log("classDetails", classDetails);

  const { allClasses, allClassesLoading, errorAllClasses, refetchAllClasses } =
    useAllClassesQuery(cookies);
  // console.log("allClasses", allClasses);

  const {
    data: { data: { decks: allDecks = [] } = {} } = {},
    isLoading: allDecksLoading,
    error: errorAllDecks,
    refetch: refetchAllDecks,
  } = useQuery(
    [
      "allDecks",
      {
        cookies,
      },
    ],

    async () => {
      return getAllDecksApi(cookies?.professor?.token);
    },
    {
      enabled: !!cookies?.professor?.token,
    }
  );

  const onSubmitCreate = async (data: any) => {
    const params = {
      deckId: data?.class?.value?._id,
    };
    console.log("onSubmitCreate", data);
    try {
      setCreateLoading(true);
      let response;
      response = await createClassApi(params, cookies?.professor?.token);
      console.log("response", response);
      refetchAllClasses();
      showSuccessToast(localeSuccess?.SUCCESS_CLASS_CREATED);
    } catch (error: any) {
      console.log("error", error);
      showErrorToast(error?.response?.data?.errorMessage);
    } finally {
      setCreateLoading(false);
      handleCloseCreate();
    }
  };
  const onDeleteConfirm = async () => {
    try {
      setDeleteLoading(true);
      let response;
      response = await deleteClassApi(
        selecteClassId,
        cookies?.professor?.token
      );
      console.log("response", response);
      refetchAllClasses();
      showSuccessToast(localeSuccess?.SUCCESS_CLASS_DELETED);
    } catch (error: any) {
      console.log("error", error);
      showErrorToast(error?.response?.data?.errorMessage);
    } finally {
      setDeleteLoading(false);
      handleDeleteClose();
    }
  };

  const getDetails = (data: string) => {
    navigate(`/professor/classes/deck?${data}`, { state: data });
  };

  // console.log("filteredDecks", filteredDecks);
  return {
    control,
    errors,
    handleSubmit,

    watch,

    handleCloseCreate,
    onSubmitCreate,
    openCreate,
    createLoading,
    allDecks,
    handleSubmitFlashcard,
    controlFlashcard,
    allClasses,
    getDetails,
    viewClass,
    viewClassDetails,
    anchorEl,
    handleClickOptions,
    handleCloseOptions,
    openDeleteModal,
    deleteLoading,
    deleteModal,
    handleDeleteClose,
    onDeleteConfirm,
  };
};
