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
import { getAllDecksByIdApi } from "../../../../utils/api/Students";

export const useStudentDeckDetails = () => {
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

  const watchSubDeck = watch("subDeck");
  const watchnNestedSubDeck = watch("nestedSubDeck");
  const deepNestedsubDeck = watch("deepNestedsubDeck");

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedDecks, setSelectedDecks] = useState<any>([]);

  const handleClickOptions = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseOptions = () => {
    setAnchorEl(null);
  };

  const [createLoading, setCreateLoading] = useState<boolean>(false);
  const location = useLocation();

  const deckId = location?.state;
  const mode = location?.state?.mode;

  console.log("deckId in studente", deckId, mode);

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

  // const { allDecks, allDecksLoading, errorAllDecks, refetchAllDecks } =
  //   useAllDecksQuery(cookies?.student?.token);

  const {
    data: { data: { decks: allDecks = [] } = {} } = {},
    isLoading: allDecksLoading,
    error: errorallDecks,
    refetch: refetchallDecks,
  } = useQuery(
    [
      "allDecks",
      {
        cookies,
        deckId,
      },
    ],

    async () => {
      return getAllDecksByIdApi(deckId?._id, cookies?.student?.token);
    },
    {
      enabled: !!cookies?.student?.token && !!deckId?.deckId?._id,
    }
  );
  console.log("allDecks in deckDetails", allDecks);

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
      return getClassByIdApi(deckId?._id, cookies?.student?.token);
    },
    {
      enabled: !!cookies?.student?.token && !!deckId?._id,
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
      return getClassDecksApi(classDetails?._id, cookies?.student?.token);
    },
    {
      enabled: !!cookies?.student?.token && !!classDetails,
    }
  );
  console.log("classDecks", classDecks);
  // console.log("classDetails", classDetails);

  const handleCheckboxDecks = (isChecked: boolean, deck: any) => {
    if (isChecked) {
      setSelectedDecks([...selectedDecks, deck]);
    } else {
      const remove = selectedDecks?.filter((d: any) => d._id !== deck?._id);
      setSelectedDecks(remove);
    }
  };

  const handleAllSelect = (isChecked: boolean) => {
    console.log("handleAllSelect", isChecked);
    if (isChecked) {
      const getAll = allDecks?.flatMap((deck: any) => deck || []);
      setSelectedDecks(getAll);
    } else {
      // const remove = selectedDecks?.filter((d: any) => d._id !== deck?._id);
      setSelectedDecks([]);
    }
  };
  useEffect(() => {
    console.log("selectedDecks", selectedDecks);
  }, [selectedDecks]);

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
        cookies?.student?.token
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
        cookies?.student?.token
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
        cookies?.student?.token
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
    allDecks,
    mode,
    handleAllSelect,
    selectedDecks,
    handleCheckboxDecks,
  };
};
