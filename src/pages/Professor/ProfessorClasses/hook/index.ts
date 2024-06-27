import * as yup from "yup";
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
import { closeModal } from "../../../../redux/slices/CreateClassModalSlice";

import {
  createClassApi,
  deleteClassApi,
} from "../../../../utils/api/professors";
import { useNavigate } from "react-router-dom";
import {
  useAllClassesQuery,
  useAllDecksQuery,
  useAllExamsQuery,
} from "../../../../redux/slices/APISlice";

export const useProfessorClasses = () => {
  // const navigate = useNavigate();
  const { localeSuccess } = useLocale();
  const [cookies] = useCookies(["professor"]);
  const dispatch = useDispatch();
  const [viewClass, setViewClass] = useState<boolean>(true);

  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    reset,
  } = useForm<{ name: string }>({
    // resolver: yupResolver(validationSchema),
    defaultValues: {},
  });
  // const {
  //   handleSubmit: handleSubmitFlashcard,
  //   control: controlFlashcard,
  //   formState: { errors: errorsFlashcard },
  //   watch: watchFlashcard,
  // } = useForm({
  //   // resolver: yupResolver(validationSchema),
  //   defaultValues: {},
  // });

  const [createLoading, setCreateLoading] = useState<boolean>(false);

  const openCreate = useSelector((state: any) => state.modalCreateClass.isOpen);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [selecteClassId, setSelecteClassId] = useState<null | string>(null);

  const handleCloseCreate = () => {
    dispatch(closeModal());
  };

  const handleDeleteClose = () => {
    setDeleteModal(false);
  };

  const openDeleteModal = (id: string) => {
    console.log("openDeleteModal", id);
    setSelecteClassId(id);
    setDeleteModal(true);
  };

  const { allClasses, allClassesLoading, errorAllClasses, refetchAllClasses } =
    useAllClassesQuery(cookies);
  const { allExams, allExamsLoading, errorAllExams, refetchAllExams } =
    useAllExamsQuery(cookies?.professor);

  const { allDecks, allDecksLoading, errorAllDecks, refetchAllDecks } =
    useAllDecksQuery(cookies?.professor?.token);
  // console.log("allClasses", allClasses);

  const onSubmitCreate = async (data: any) => {
    const params = {
      deckId: data?.class?.value?._id,
    };
    const deckExists = allClasses.some(
      (classItem: any) => classItem.deckId._id === params.deckId
    );

    if (deckExists) {
      showErrorToast("This class already exists.");
      return;
    } else {
      console.log("onSubmitCreate", data);
      try {
        setCreateLoading(true);
        let response;
        response = await createClassApi(params, cookies?.professor?.token);
        console.log("response", response);
        refetchAllClasses();
        reset();
        showSuccessToast(localeSuccess?.SUCCESS_CLASS_CREATED);
      } catch (error: any) {
        console.log("error", error);
        showErrorToast(error?.response?.data?.message);
      } finally {
        setCreateLoading(false);
        handleCloseCreate();
      }
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
      showErrorToast(error?.response?.data?.message);
    } finally {
      setDeleteLoading(false);
      handleDeleteClose();
    }
  };

  const getDetails = (data: string) => {
    navigate(`/professor/classes/deck?${data}`, { state: data });
  };
  const getDetailsExam = (data: string) => {
    navigate(`/professor/exams/exam?${data}`, { state: data });
  };

  // console.log("filteredDecks", filteredDecks);
  return {
    control,
    handleSubmit,
    watch,
    handleCloseCreate,
    onSubmitCreate,
    openCreate,
    createLoading,
    allDecks,
    allClasses,
    getDetails,
    viewClass,
    openDeleteModal,
    deleteLoading,
    deleteModal,
    handleDeleteClose,
    onDeleteConfirm,
    allExams,
    getDetailsExam,
  };
};
