import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../../config/toastProvider/toastUtils";
import { createDeckApi, getAllDecksApi } from "../../../../utils/api/admin";
import useLocale from "../../../../locales";
import { useCookies } from "react-cookie";
import { useQuery } from "react-query";
// import { useLocation, useNavigate } from "react-router-dom";

export const useDecksManagement = () => {
  // const navigate = useNavigate();
  const { localeSuccess } = useLocale();
  const [cookies] = useCookies(["admin"]);

  const initialDefaultValue = {
    decks: [{ name: "" }], // Set initial default deck
  };

  const validationSchema = yup.object().shape({});
  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialDefaultValue,
  });
  const [createSection, setcreateSection] = useState<boolean>(false);
  const [deckLoading, setDeckLoading] = useState<boolean>(false);
  const handleCreate = () => {
    setcreateSection(true);
  };
  const handleCreateCancel = () => {
    setcreateSection(false);
  };

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

  console.log("allDecks", allDecks);

  const onCreateSubmission = async (data: any) => {
    console.log("onCreateSubmission", data);
    const params = {};
    // try {
    //   setDeckLoading(true);
    //   let response;
    //   response = await createDeckApi(params, cookies?.admin?.token);
    //   console.log("response", response);

    //   showSuccessToast(localeSuccess?.SUCCESS_DECK_CREATED);
    // } catch (error: any) {
    //   console.log("error", error);
    //   showErrorToast(error?.response?.data?.errorMessage);
    // } finally {
    //   setDeckLoading(false);
    // }
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
  };
};
