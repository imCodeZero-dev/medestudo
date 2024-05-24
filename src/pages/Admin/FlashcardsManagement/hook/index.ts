import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../../config/toastProvider/toastUtils";
import {
  createProfessorApi,
  getAllDecksApi,
  getAllFlashcardsAdmindApi,
} from "../../../../utils/api/admin";
import useLocale from "../../../../locales";
import { passwordRegex } from "../../../../utils/constants/constants";
import { useCookies } from "react-cookie";
import { useQuery } from "react-query";
// import { useLocation, useNavigate } from "react-router-dom";

export const useFlashcardsManagement = () => {
  // const navigate = useNavigate();
  const { localeSuccess } = useLocale();
  const [cookies] = useCookies(["admin"]);

  const validationSchema = yup.object().shape({});
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm({
    // resolver: yupResolver(validationSchema),
    defaultValues: {},
  });
  const [opneProfessorModal, setOpneProfessorModal] = useState<boolean>(false);
  const [professorLoading, setProfessorLoading] = useState<boolean>(false);
  const handleOpenProfessor = () => {
    setOpneProfessorModal(true);
  };
  const handleCloseProfessor = () => {
    setOpneProfessorModal(false);
  };

  const [editProfessorModal, setEditProfessorModal] = useState<boolean>(false);
  const [editLoading, setEditLoading] = useState<boolean>(false);
  const handleOpenEdit = () => {
    setEditProfessorModal(true);
  };
  const handleCloseEdit = () => {
    setEditProfessorModal(false);
  };

  const {
    data: { data: { cards: allFlashcards = [] } = {} } = {},
    isLoading: allFlashcardsLoading,
    error: errorAllFlashcards,
    refetch: refetchAllFlashcards,
  } = useQuery(
    [
      "allFlashcards",
      {
        cookies,
      },
    ],

    async () => {
      return getAllFlashcardsAdmindApi(cookies?.admin?.token);
    },
    {
      enabled: !!cookies?.admin?.token,
    }
  );

  const onSubmitCreateProfessor = async (data: any) => {
    const params = {
      name: data?.name,
      email: data?.email,
      password: data?.password,
      phone: data?.phone,
    };
    console.log("params", params);
    try {
      setProfessorLoading(true);
      let response;
      response = await createProfessorApi(params, cookies?.admin?.token);
      console.log("response", response);

      showSuccessToast(localeSuccess?.SUCCESS_PROFESSOR_CREATED);
    } catch (error: any) {
      console.log("error", error);
      showErrorToast(error?.response?.data?.message);
    } finally {
      setProfessorLoading(false);
    }
  };
  const onSubmitEditProfessor = async (data: any) => {
    // const params = {
    //   name: data?.name,
    //   email: data?.email,
    //   password: data?.password,
    //   phone: data?.phone,
    // };
    // console.log("params", params);
    // try {
    //   setProfessorLoading(true);
    //   let response;
    //   response = await createProfessorApi(params, cookies?.admin?.token);
    //   console.log("response", response);
    //   showSuccessToast(localeSuccess?.SUCCESS_PROFESSOR_CREATED);
    // } catch (error: any) {
    //   console.log("error", error);
    //   showErrorToast(error?.response?.data?.message);
    // } finally {
    //   setProfessorLoading(false);
    // }
  };

  return {
    control,
    errors,
    handleSubmit,
    opneProfessorModal,
    handleOpenProfessor,
    handleCloseProfessor,
    onSubmitCreateProfessor,
    professorLoading,
    editProfessorModal,
    handleOpenEdit,
    handleCloseEdit,
    editLoading,
    onSubmitEditProfessor,
    watch,
    allFlashcards,
    allFlashcardsLoading,
  };
};
