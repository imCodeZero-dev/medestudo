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

import {
  createClassApi,
  createClassDeckApi,
  deleteClassApi,
  deleteClassDeckApi,
  getAllClassesApi,
  getClassByIdApi,
  getClassDecksApi,
} from "../../../../utils/api/professors";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {
  useAllClassesQuery,
  useAllDecksQuery,
} from "../../../../redux/slices/APISlice";
import { DeckId } from "../../../../utils/constants/DataTypes";

export const useDeckDetails = () => {
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
  } = useForm<any>({
    // resolver: yupResolver(validationSchema),
    defaultValues: {},
  });

  const watchSubDeck = watch("subDeck");
  const watchnNestedSubDeck = watch("nestedSubDeck");
  const deepNestedsubDeck = watch("deepNestedsubDeck");

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClickOptions = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseOptions = () => {
    setAnchorEl(null);
  };

  const [createLoading, setCreateLoading] = useState<boolean>(false);
  const location = useLocation();

  const deckId = location?.state;

  // console.log("deckId", deckId);

  // const openCreate = useSelector((state: any) => state.modal.isOpen);
  const navigate = useNavigate();
  const [createModal, setCreateModal] = useState(false);
  const [specificDecks, setSpecificDecks] = useState();
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteClassModal, setDeleteClassModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [selectedDeckId, setSelectedDeckId] = useState<null | string>(null);
  const handleCloseCreate = () => {
    setCreateModal(false);
  };

  const handleDeleteClose = () => {
    setDeleteModal(false);
  };
  const openDeleteModal = (id: string) => {
    console.log("openDeleteModal", id);
    handleCloseOptions();
    setSelectedDeckId(id);
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

  const { allDecks, allDecksLoading, errorAllDecks, refetchAllDecks } =
    useAllDecksQuery(cookies);

  // console.log("allDecks in deckDetails", allDecks);

  const {
    data: { data: { class: classDetails = [] } = {} } = {},
    isLoading: classDetailsLoading,
    error: errorClassDetails,
    refetch: refetchClassDetails,
  } = useQuery(
    [
      "classDetails",
      {
        cookies,
        deckId,
      },
    ],

    async () => {
      return getClassByIdApi(deckId, cookies?.professor?.token);
    },
    {
      enabled: !!cookies?.professor?.token && !!deckId,
    }
  );

  const {
    data: { data: { decksWithCardCounts: classDecks = [] } = {} } = {},
    isLoading: classDecksLoading,
    error: errorclassDecks,
    refetch: refetchclassDecks,
  } = useQuery(
    [
      "classDecks",
      {
        cookies,
        classDetails,
      },
    ],

    async () => {
      return getClassDecksApi(classDetails?._id, cookies?.professor?.token);
    },
    {
      enabled: !!cookies?.professor?.token && !!classDetails,
    }
  );
  console.log("classDecks", classDecks);
  // console.log("classDetails", classDetails);

  const onSubmitCreate = async (data: any) => {
    console.log("onSubmitCreate", data);
    const requestData: any = {
      // name: "anxzc",
      deckId: classDetails?.deckId?._id,
      subdeck: {
        name: watchSubDeck.label,
        subDeck: [],
      },
    };

    if (watchnNestedSubDeck) {
      requestData.subdeck.subDeck.push({
        name: watchnNestedSubDeck.label,
        subDeck: [],
      });
    }

    if (deepNestedsubDeck) {
      requestData.subdeck.subDeck[
        requestData.subdeck.subDeck.length - 1
      ].subDeck.push({
        name: deepNestedsubDeck.label,
        subDeck: [],
      });
    }

    const lastNestedsubDeck = watch("lastNestedsubDeck");
    if (lastNestedsubDeck) {
      requestData.subdeck.subDeck[
        requestData.subdeck.subDeck.length - 1
      ].subDeck[
        requestData.subdeck.subDeck[requestData.subdeck.subDeck.length - 1]
          .subDeck.length - 1
      ].subDeck.push({
        name: lastNestedsubDeck.label,
        // subDeck: [], // Initialize subDeck if needed
      });
    }

    // Now you can send the requestData to your API
    console.log("API Request Data:", requestData);

    console.log("onSubmitCreate", data);
    try {
      setCreateLoading(true);
      let response;
      response = await createClassDeckApi(
        requestData,
        classDetails?._id,
        cookies?.professor?.token
      );
      console.log("response", response);
      refetchClassDetails();
      refetchclassDecks();
      showSuccessToast(localeSuccess?.SUCCESS_DECK_CREATED);
    } catch (error: any) {
      console.log("error", error);
      showErrorToast(error?.response?.data?.message);
    } finally {
      setCreateLoading(false);
      handleCloseCreate();
    }
  };

  const onDeleteClassConfirm = async () => {
    try {
      setDeleteLoading(true);
      let response;
      response = await deleteClassApi(
        classDetails?._id,
        cookies?.professor?.token
      );
      console.log("response", response);
      refetchAllClasses();
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
      response = await deleteClassDeckApi(
        selectedDeckId,
        cookies?.professor?.token
      );
      console.log("response", response);
      refetchClassDetails();
      refetchclassDecks();
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
    navigate(`/professor/classes/deck?${data}`, { state: data });
  };

  useEffect(() => {
    if (allDecks?.length > 0) {
      const currentClass = allDecks?.filter(
        (deck: DeckId) => deck?._id === classDetails?.deckId?._id
      );
      setSpecificDecks(currentClass);
    }
  }, [classDetails, allDecks]);

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

    classDetails,
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
    classDecks,
    classDecksLoading,
    handleDeleteClassClose,
    openDeleteClassModal,
    deleteClassModal,
    onDeleteClassConfirm,
  };
};
