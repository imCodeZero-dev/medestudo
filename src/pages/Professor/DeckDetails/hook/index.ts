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
  deleteClassDeckApi,
  getAllClassesApi,
  getClassByIdApi,
} from "../../../../utils/api/professors";
import { useLocation, useSearchParams } from "react-router-dom";

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

  console.log("deckId", deckId);

  // const openCreate = useSelector((state: any) => state.modal.isOpen);
  const [createModal, setCreateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
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
  console.log("classDetails", classDetails);

  const onSubmitCreate = async (data: any) => {
    const requestData: any = {
      name: "anxzc",
      deckId: classDetails?.deckId?._id,
      subDeck: {
        name: watchSubDeck.label,
        subDeck: [],
      },
    };

    if (watchnNestedSubDeck) {
      requestData.subDeck.subDeck.push({
        name: watchnNestedSubDeck.label,
        subDeck: [],
      });
    }

    if (deepNestedsubDeck) {
      requestData.subDeck.subDeck[
        requestData.subDeck.subDeck.length - 1
      ].subDeck.push({
        name: deepNestedsubDeck.label,
        subDeck: [],
      });
    }

    const lastNestedsubDeck = watch("lastNestedsubDeck");
    if (lastNestedsubDeck) {
      requestData.subDeck.subDeck[
        requestData.subDeck.subDeck.length - 1
      ].subDeck[
        requestData.subDeck.subDeck[requestData.subDeck.subDeck.length - 1]
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
      showSuccessToast(localeSuccess?.SUCCESS_DECK_CREATED);
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
      response = await deleteClassDeckApi(
        selectedDeckId,
        cookies?.professor?.token
      );
      console.log("response", response);
      refetchClassDetails();
      showSuccessToast(localeSuccess?.SUCCESS_DECK_DELETED);
    } catch (error: any) {
      console.log("error", error);
      showErrorToast(error?.response?.data?.errorMessage);
    } finally {
      setDeleteLoading(false);
      handleDeleteClose();
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

    classDetails,
    openDeleteModal,
    onDeleteConfirm,
    deleteModal,
    handleDeleteClose,
    deleteLoading,
    anchorEl,
    handleClickOptions,
    handleCloseOptions,
  };
};
