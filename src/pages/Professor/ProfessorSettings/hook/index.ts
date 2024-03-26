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

export const useProfessorSettings = () => {
  // const navigate = useNavigate();
  const { localeSuccess } = useLocale();
  const [cookies] = useCookies(["admin"]);
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
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: "",
      password: "",
      phone: "",
      name: "",
    },
  });
  const {
    handleSubmit: handleSubmitImage,
    control: controlImage,
    formState: { errors: errorsImg },
    watch: watchImg,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {},
  });
  const {
    handleSubmit: handleSubmitEmail,
    control: controlEmail,
    formState: { errors: errorEmail },
    watch: watchEmail,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {},
  });
  const {
    handleSubmit: handleSubmitPassword,
    control: controlPassword,
    formState: { errors: errorPassword },
    // watch: watchEmail,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {},
  });

  const [createLoading, setCreateLoading] = useState<boolean>(false);

  const openCreate = useSelector((state: any) => state.modal.isOpen);

  const handleCloseCreate = () => {
    dispatch(closeModal());
  };

  const onSubmitGeneral = async (data: any) => {
    const params = {
      status: data?.status === "active" ? "inactive" : "active",
    };
    console.log("params", params);
    // try {
    //   setProfessorLoading(true);
    //   let response;
    //   response = await changeProfessorStatusApi(
    //     params,
    //     data?._id,
    //     cookies?.admin?.token
    //   );
    //   console.log("response", response);
    //   refetchAllProfessors();
    //   showSuccessToast(localeSuccess?.SUCCESS_PROFESSOR_STATUS_CHANGED);
    // } catch (error: any) {
    //   console.log("error", error);
    //   showErrorToast(error?.response?.data?.errorMessage);
    // } finally {
    //   setProfessorLoading(false);
    // }
  };
  const onSubmitImage = async (data: any) => {
    console.log("params", data);
  };
  const onSubmitEmail = async (data: any) => {
    console.log("params", data);
  };
  const onSubmitPassword = async (data: any) => {
    console.log("params", data);
  };

  return {
    control,
    errors,
    handleSubmit,

    watch,

    handleSubmitImage,
    onSubmitGeneral,
    onSubmitImage,
    handleSubmitEmail,
    handleSubmitPassword,
    onSubmitEmail,
    onSubmitPassword,
  };
};