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

import {
  getClassByIdApi,
  getClassDecksApi,
} from "../../../../utils/api/professors";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {
  useAllClassesQuery,
  useAllDecksQuery,
  useCustomAllClassesQuery,
} from "../../../../redux/slices/APISlice";
import { DeckId } from "../../../../utils/constants/DataTypes";
import {
  creteCustomDecksApi,
  deleteCustomClassApi,
  deleteCustomDecksApi,
  editCustomDecksApi,
  getAllDecksByIdApi,
  getCustomClassDecksApi,
  updateCustomClassApi,
} from "../../../../utils/api/Students";

export const useCustomDeckDetails = () => {
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
  } = useForm<any>({
    // resolver: yupResolver(validationSchema),
    defaultValues: {},
  });

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedDecks, setSelectedDecks] = useState<any>([]);

  const handleCheckboxDecks = (isChecked: boolean, deck: any) => {
    if (isChecked) {
      setSelectedDecks([...selectedDecks, deck]);
    } else {
      const remove = selectedDecks?.filter((d: any) => d._id !== deck?._id);
      setSelectedDecks(remove);
    }
  };
  const handleAllSelect = (isChecked: boolean) => {
    // console.log("handleAllSelect", isChecked);
    if (isChecked) {
      const getAll = allCustomDecks?.flatMap((deck: any) => deck || []);
      setSelectedDecks(getAll);
    } else {
      // const remove = selectedDecks?.filter((d: any) => d._id !== deck?._id);
      setSelectedDecks([]);
    }
  };

  const [createLoading, setCreateLoading] = useState<boolean>(false);
  const location = useLocation();

  const deckData = location?.state;
  const mode = location?.state?.mode;

  console.log("deckData in studente", deckData, mode);

  // const openCreate = useSelector((state: any) => state.modal.isOpen);
  const navigate = useNavigate();
  const [createModal, setCreateModal] = useState(false);
  const [specificDecks, setSpecificDecks] = useState();
  const [editClassModal, setEditClassModal] = useState(false);
  const [editDeckModal, setEditDeckModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteClassModal, setDeleteClassModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [selectedDeckId, setSelectedDeckId] = useState<null | string>(null);

  const handleClickOptions = (
    event: React.MouseEvent<HTMLElement>,
    data: any
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedDeckId(data?._id);
  };

  const handleCloseOptions = () => {
    setAnchorEl(null);
    // setSelectedDeckId(null);
  };

  const handleCloseCreate = () => {
    setCreateModal(false);
  };

  const handleOpenEditClass = () => {
    setEditClassModal(true);
    setValue("title", deckData?.title);
  };
  const handleCloseEditClass = () => {
    setEditClassModal(false);
  };

  const handleOpenEditDeck = (data: any) => {
    setEditDeckModal(true);
    setValue("deckTitle", data?.title);
    setSelectedDeckId(data?._id);
  };
  const handleCloseEditDeck = () => {
    setEditDeckModal(false);
  };

  const handleDeleteClose = () => {
    setDeleteModal(false);
  };
  const openDeleteModal = () => {
    // console.log("openDeleteModal", data);
    handleCloseOptions();
    // setSelectedDeckId(data?._id);
    setDeleteModal(true);
  };

  const handleDeleteClassClose = () => {
    setDeleteClassModal(false);
  };
  const openDeleteClassModal = () => {
    setDeleteClassModal(true);
  };

  const { allClasses, allClassesLoading, errorAllClasses, refetchAllClasses } =
    useAllClassesQuery(cookies);

  const {
    customClasses,
    customClassesLoading,
    errorCustomClasses,
    refetchCustomClasses,
  } = useCustomAllClassesQuery(cookies);

  // const { allDecks, allDecksLoading, errorAllDecks, refetchAllDecks } =
  //   useAllDecksQuery(cookies?.student?.token);

  const {
    data: { data: { decks: allCustomDecks = [] } = {} } = {},
    isLoading: allCustomDecksLoading,
    error: errorallCustomDecks,
    refetch: refetchallCustomDecks,
  } = useQuery(
    [
      "allCustomDecks",
      {
        cookies,
        deckData,
      },
    ],

    async () => {
      return getCustomClassDecksApi(deckData?._id, cookies?.student?.token);
    },
    {
      enabled: !!cookies?.student?.token && !!deckData?._id,
    }
  );
  console.log("allCustomDecks in deckDetails", allCustomDecks);

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
  //       deckData,
  //     },
  //   ],

  //   async () => {
  //     return getClassByIdApi(deckData?._id, cookies?.student?.token);
  //   },
  //   {
  //     enabled: !!cookies?.student?.token && !!deckData?._id,
  //   }
  // );

  // const {
  //   data: { data: { decksWithCardCounts: classDecks = [] } = {} } = {},
  //   isLoading: classDecksLoading,
  //   error: errorclassDecks,
  //   refetch: refetchclassDecks,
  // } = useQuery(
  //   [
  //     "classDecks",
  //     {
  //       cookies,
  //       classDetails,
  //     },
  //   ],

  //   async () => {
  //     return getClassDecksApi(classDetails?._id, cookies?.student?.token);
  //   },
  //   {
  //     enabled: !!cookies?.student?.token && !!classDetails,
  //   }
  // );
  // console.log("classDecks", classDecks);
  // console.log("classDetails", classDetails);

  const onSubmitClassEdit = async (data: any) => {
    // console.log("onSubmitCreate", data);

    const params = {
      title: data?.title,
    };

    try {
      setEditLoading(true);
      let response;
      response = await updateCustomClassApi(
        params,
        deckData?._id,
        cookies?.student?.token
      );
      console.log("response", response);
      // refetchClassDetails();
      // refetchclassDecks();
      refetchCustomClasses();
      showSuccessToast(localeSuccess?.SUCCESS_CLASS_EDITED);
    } catch (error: any) {
      console.log("error", error);
      showErrorToast(error?.response?.data?.message);
    } finally {
      setEditLoading(false);
      handleCloseEditClass();
    }
  };

  const onSubmitCreate = async (data: any) => {
    console.log("onSubmitCreate", data);

    const params = {
      title: data?.deckTitle,
    };

    try {
      setCreateLoading(true);
      let response;
      response = await creteCustomDecksApi(
        params,
        deckData?._id,
        cookies?.student?.token
      );
      console.log("response", response);
      // refetchClassDetails();
      refetchallCustomDecks();
      showSuccessToast(localeSuccess?.SUCCESS_DECK_CREATED);
    } catch (error: any) {
      console.log("error", error);
      showErrorToast(error?.response?.data?.message);
    } finally {
      setCreateLoading(false);
      handleCloseCreate();
    }
  };

  const onSubmitEditDeck = async (data: any) => {
    // console.log("onSubmitCreate", data);

    const params = {
      title: data?.deckTitle,
    };

    try {
      setCreateLoading(true);
      let response;
      response = await editCustomDecksApi(
        params,
        selectedDeckId as string,
        cookies?.student?.token
      );
      console.log("response", response);
      // refetchClassDetails();
      refetchallCustomDecks();
      showSuccessToast(localeSuccess?.SUCCESS_DECK_UPDATED);
    } catch (error: any) {
      console.log("error", error);
      showErrorToast(error?.response?.data?.message);
    } finally {
      setCreateLoading(false);
      handleCloseEditDeck();
    }
  };

  const onDeleteClassConfirm = async () => {
    try {
      setDeleteLoading(true);
      let response;
      response = await deleteCustomClassApi(
        deckData?._id,
        cookies?.student?.token
      );
      console.log("response", response);
      refetchCustomClasses();
      showSuccessToast(localeSuccess?.SUCCESS_CLASS_DELETED);
      navigate(-1);
    } catch (error: any) {
      console.log("error", error);
      showErrorToast(error?.response?.data?.message);
    } finally {
      setDeleteLoading(false);
      handleDeleteClassClose();
    }
  };

  const onDeleteConfirm = async () => {
    try {
      setDeleteLoading(true);
      let response;
      response = await deleteCustomDecksApi(
        selectedDeckId as string,
        cookies?.student?.token
      );
      console.log("response", response);
      refetchallCustomDecks();
      showSuccessToast(localeSuccess?.SUCCESS_DECK_DELETED);
    } catch (error: any) {
      console.log("error", error);
      showErrorToast(error?.response?.data?.message);
    } finally {
      setDeleteLoading(false);
      handleDeleteClose();
    }
  };

  const getDetails = (data: string) => {
    navigate(`/student/flashcard/deck?${data}`, { state: data });
  };

  // useEffect(() => {
  //   console.log("classDetails", classDetails);
  //   if (allDecks?.length > 0) {
  //     const currentClass = allDecks?.filter(
  //       (deck: DeckId) => deck?._id === classDetails?.deckId?._id
  //     );
  //     setSpecificDecks(currentClass);
  //   }
  // }, [classDetails, allDecks]);

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
    openDeleteModal,
    onDeleteConfirm,
    deleteModal,
    handleDeleteClose,
    deleteLoading,
    anchorEl,
    handleClickOptions,
    handleCloseOptions,
    allClasses,
    allClassesLoading,
    getDetails,
    specificDecks,
    // classDecks,
    // classDecksLoading,
    handleDeleteClassClose,
    openDeleteClassModal,
    deleteClassModal,
    onDeleteClassConfirm,
    allCustomDecks,
    mode,
    deckData,
    handleCheckboxDecks,
    selectedDecks,
    handleAllSelect,
    handleOpenEditClass,
    handleCloseEditClass,
    editClassModal,
    onSubmitClassEdit,
    editLoading,
    handleOpenEditDeck,
    handleCloseEditDeck,
    editDeckModal,
    onSubmitEditDeck,
    allCustomDecksLoading,
  };
};
