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

import { useNavigate } from "react-router-dom";
import {
  useAllClassesQuery,
  useAllDecksQuery,
  useAllExamsQuery,
} from "../../../../redux/slices/APISlice";

export const useStudentFlashcardsExplore = () => {
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
    useAllExamsQuery(cookies);

  const { allDecks, allDecksLoading, errorAllDecks, refetchAllDecks } =
    useAllDecksQuery(cookies);
  // console.log("allClasses", allClasses);

  const onSubmitCreate = async (data: any) => {};
  const onDeleteConfirm = async () => {};

  const getDetails = (data: string) => {
    navigate(`/student/flashcard/deck?${data}`, { state: data });
  };
  const getDetailsExam = (data: string) => {
    // navigate(`/professor/exams/exam?${data}`, { state: data });
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
