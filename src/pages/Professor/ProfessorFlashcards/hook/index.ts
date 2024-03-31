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
  getAllClassesApi,
  getClassByIdApi,
} from "../../../../utils/api/professors";
import { useNavigate } from "react-router-dom";

export const useProfessorFlashcards = () => {
  // const navigate = useNavigate();
  const { localeSuccess } = useLocale();
  const [cookies] = useCookies(["professor"]);
  const dispatch = useDispatch();
  const [viewClass, setViewClass] = useState<boolean>(true);
  const [createFlashcard, setCreateFlashcard] = useState<boolean>(false);
  const [viewClassDetails, setViewClassDetails] = useState<boolean>(false);
  const [classId, setClassId] = useState<string>();
  const navigate = useNavigate();

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .required("Email is required")
      .email("Invalid email format"),
    password: yup
      .string()
      .required("Password is required")
      .matches(passwordRegex, "Invalid password format"),
    phone: yup.string().required("Phone number is required"),
    // .matches(/^\d{10}$/, "Invalid phone number format"),
    name: yup.string().required("Name is required"),
    confirmPassword: yup
      .string()
      .required("Confirm Password is required")
      .oneOf([yup.ref("password")], "Passwords must match"),
  });
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

  const handleCloseCreate = () => {
    dispatch(closeModal());
  };

  const {
    data: { data: { class: classDetails = [] } = {} } = {},
    isLoading: classDetailsLoading,
    error: errorclassDetails,
    refetch: refetchclassDetails,
  } = useQuery(
    [
      "classDetails",
      {
        cookies,
      },
    ],

    async () => {
      return getClassByIdApi(classId as string, cookies?.professor?.token);
    },
    {
      enabled: !!cookies?.professor?.token && !!classId,
    }
  );

  console.log("classDetails", classDetails);

  const {
    data: { data: { class: allClasses = [] } = {} } = {},
    isLoading: allClassesLoading,
    error: errorAllClasses,
    refetch: refetchAllClasses,
  } = useQuery(
    [
      "allClasses",
      {
        cookies,
      },
    ],

    async () => {
      return getAllClassesApi(cookies?.professor?.token);
    },
    {
      enabled: !!cookies?.professor?.token,
    }
  );

  console.log("allClasses", allClasses);

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
      showSuccessToast(localeSuccess?.SUCCESS_PROFESSOR_STATUS_CHANGED);
    } catch (error: any) {
      console.log("error", error);
      showErrorToast(error?.response?.data?.errorMessage);
    } finally {
      setCreateLoading(false);
    }
  };

  const filteredDecks = allDecks?.map(
    ({ name, _id }: { name: string; _id: string }) => ({ name, _id })
  );

  const getDetails = (data: string) => {
    // setViewClass(false);
    // setViewClassDetails(true);
    // setClassId(data);
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
    filteredDecks,
    handleSubmitFlashcard,
    controlFlashcard,
    allClasses,
    getDetails,
    viewClass,
    viewClassDetails,
    createFlashcard,
    setCreateFlashcard,
  };
};
