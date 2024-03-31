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
import { useLocation, useSearchParams } from "react-router-dom";

export const useDeckDetails = () => {
  // const navigate = useNavigate();
  const { localeSuccess } = useLocale();
  const [cookies] = useCookies(["professor"]);
  const dispatch = useDispatch();

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

  const [createLoading, setCreateLoading] = useState<boolean>(false);
  const location = useLocation();

  const deckId = location?.state;

  console.log("deckId", deckId);

  const openCreate = useSelector((state: any) => state.modal.isOpen);

  const handleCloseCreate = () => {
    dispatch(closeModal());
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
        deckId
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
    const params = {
      deckId: data?.class?.value?._id,
    };
    console.log("onSubmitCreate", data);
    // try {
    //   setCreateLoading(true);
    //   let response;
    //   response = await createClassApi(params, cookies?.professor?.token);
    //   console.log("response", response);
    //   refetchAllClasses();
    //   showSuccessToast(localeSuccess?.SUCCESS_PROFESSOR_STATUS_CHANGED);
    // } catch (error: any) {
    //   console.log("error", error);
    //   showErrorToast(error?.response?.data?.errorMessage);
    // } finally {
    //   setCreateLoading(false);
    // }
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

    classDetails,
  };
};
