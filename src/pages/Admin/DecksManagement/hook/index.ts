import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../../config/toastProvider/toastUtils";
import {
  createDeckApi,
  deleteDeckByIdApi,
  getAllDecksApi,
  updateDeckApi,
} from "../../../../utils/api/admin";
import useLocale from "../../../../locales";
import { useCookies } from "react-cookie";
import { useQuery } from "react-query";
// import { useLocation, useNavigate } from "react-router-dom";

export const useDecksManagement = () => {
  // const navigate = useNavigate();
  const { localeSuccess } = useLocale();
  const [cookies] = useCookies(["admin"]);

  const initialDefaultValue = {
    deck: [{ name: "" }], // Set initial default deck
  };

  const validationSchema = yup.object().shape({});
  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
    setValue,
    watch,
    reset,
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
    defaultValues: initialDefaultValue,
  });
  const [createSection, setcreateSection] = useState<boolean>(false);
  const [editSection, setEditSection] = useState<boolean>(false);
  const [deckLoading, setDeckLoading] = useState<boolean>(false);
  const [deckData, setDeckData] = useState<any>();
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [editLoading, setEditLoading] = useState<boolean>(false);
  const [deleteModal, setdeleteModal] = useState<boolean>(false);

  const handleCreate = () => {
    setcreateSection(true);
  };
  const handleCreateCancel = () => {
    setcreateSection(false);
  };

  const handleEdit = (data: any) => {
    setEditSection(true);
    console.log("handleEdit", data);
    setDeckData(data);

    setValue("deck[0].name", data.name);

    // Set the subDeck values
    data.subDeck.forEach((subDeck: any, index: number) => {
      setValue(`deck[0].subDeck[${index}].name`, subDeck.name);

      // If there are nested subdecks, set their values
      if (subDeck.subDeck) {
        subDeck.subDeck.forEach((nestedSubDeck: any, nestedIndex: number) => {
          setValue(
            `deck[0].subDeck[${index}].subDeck[${nestedIndex}].name`,
            nestedSubDeck.name
          );

          // If there are deeply nested subdecks, set their values
          if (nestedSubDeck.subDeck) {
            nestedSubDeck.subDeck.forEach(
              (deepNestedSubDeck: any, deepNestedIndex: number) => {
                setValue(
                  `deck[0].subDeck[${index}].subDeck[${nestedIndex}].subDeck[${deepNestedIndex}].name`,
                  deepNestedSubDeck.name
                );
                if (deepNestedSubDeck.subDeck) {
                  deepNestedSubDeck.subDeck.forEach(
                    (lastDeck: any, lastDeckIndex: number) => {
                      setValue(
                        `deck[0].subDeck[${index}].subDeck[${nestedIndex}].subDeck[${deepNestedIndex}].subDeck[${lastDeckIndex}].name`,
                        lastDeck.name
                      );
                    }
                  );
                }
              }
            );
          }
        });
      }
    });
  };

  console.log("watchdecks", watch("deck"));

  const handleEditCancel = () => {
    setEditSection(false);
    reset();
  };

  const handleDeleteOpen = (data: any) => {
    setdeleteModal(true);
    setDeckData(data);
  };
  const handleDeleteClose = () => {
    setdeleteModal(false);
  };

  console.log("deckData", deckData);

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
      return getAllDecksApi(cookies?.admin?.token);
    },
    {
      enabled: !!cookies?.admin?.token,
    }
  );

  // console.log("allDecks", allDecks);

  const onCreateSubmission = async (data: any) => {
    console.log("onCreateSubmission", data);
    if (!data?.deck?.[0]?.name) {
      showErrorToast("Deck must be filled");
    } else {
      const params = {
        name: data?.deck?.[0]?.name,
        subDeck: data?.deck?.[0]?.subDeck,
        image:
          "https://res.cloudinary.com/dmzieqsir/image/upload/v1711538928/Rectangle_30_qqyv5m.png",
      };
      try {
        setDeckLoading(true);
        let response;
        response = await createDeckApi(params, cookies?.admin?.token);
        console.log("response", response);

        showSuccessToast(localeSuccess?.SUCCESS_DECK_CREATED);
        refetchAllDecks();
      } catch (error: any) {
        console.log("error", error);
        showErrorToast(error?.response?.data?.message);
      } finally {
        setDeckLoading(false);
        handleCreateCancel();
      }
    }
  };

  const onConfirmEdit = async (data: any) => {
    console.log("onConfirmEdit", data);
    const params = {
      name: data?.deck?.[0]?.name,
      subDeck: data?.deck?.[0]?.subDeck,
    };
    console.log("onConfirmEdit params", params);
    try {
      setDeckLoading(true);
      let response;
      response = await updateDeckApi(
        params,
        deckData?._id,
        cookies?.admin?.token
      );
      console.log("response", response);

      showSuccessToast(localeSuccess?.SUCCESS_DECK_UPDATED);
      refetchAllDecks();
    } catch (error: any) {
      console.log("error", error);
      showErrorToast(error?.response?.data?.message);
    } finally {
      setDeckLoading(false);
      handleEditCancel();
    }
  };

  const onDeleteConfirm = async () => {
    try {
      setDeleteLoading(true);
      let response;
      response = await deleteDeckByIdApi(deckData?._id, cookies?.admin?.token);
      console.log("response", response);

      showSuccessToast(localeSuccess?.SUCCESS_DECK_DELETED);
      refetchAllDecks();
    } catch (error: any) {
      console.log("error", error);
      showErrorToast(error?.response?.data?.message);
    } finally {
      setDeleteLoading(false);
      handleDeleteClose();
    }
  };

  return {
    control,
    errors,
    handleSubmit,

    onCreateSubmission,
    deckLoading,
    createSection,
    handleCreate,
    handleCreateCancel,
    getValues,
    setValue,
    watch,
    allDecks,
    handleDeleteOpen,
    handleDeleteClose,
    deleteModal,
    onDeleteConfirm,
    deleteLoading,
    editSection,
    handleEdit,
    handleEditCancel,
    onConfirmEdit,
    allDecksLoading,
  };
};
