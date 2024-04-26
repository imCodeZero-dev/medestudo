import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import { validationSchema } from "../../../utils/hooks/inputValidation";
import { professorLoginApi } from "../../../utils/api/professors";
import { loginAdmin } from "../../../redux/slices/AdminSlice";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../config/toastProvider/toastUtils";
import { loginProfessor } from "../../../redux/slices/ProfessorSlice";
// import { useLocation, useNavigate } from "react-router-dom";

export const useLoginPage = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: "",
      password: "",
      // rememberme: false,
    },
  });
  const [forgotModal, setForgotModal] = useState<boolean>(false);
  const [forgotLoading, setForgotLoading] = useState<boolean>(false);
  const [loadingLogin, setLoadingLogin] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cookies, setCookie] = useCookies(["professor"]);
  // const navigate = useNavigate();

  const handleForgotClose = () => {
    setForgotModal(false);
  };

  const openForgotModal = () => {
    setForgotModal(true);
  };

  const onSubmitForgotEmail = async (data: any) => {
    console.log("loginForm", data);
    // const params = {
    //   email: data?.email,
    //   password: data?.password,
    // };

    // try {
    //   setForgotLoading(true);
    //   let response;
    //   response = await professorLoginApi(params);
    //   console.log("response", response);

    //   dispatch(loginProfessor(response?.data));
    //   setCookie("professor", response?.data, { maxAge: 86400 });
    //   showSuccessToast("Login Successfully");

    //   navigate("/professor");
    // } catch (error: any) {
    //   console.log("error", error);
    //   showErrorToast(error?.response?.data?.errorMessage);
    // } finally {
    //   setForgotLoading(false);
    // }
  };

  const onSubmit = async (data: any) => {
    console.log("loginForm", data);
    const params = {
      email: data?.email,
      password: data?.password,
    };

    try {
      setLoadingLogin(true);
      let response;
      response = await professorLoginApi(params);
      console.log("response", response);

      dispatch(loginProfessor(response?.data));
      setCookie("professor", response?.data, { maxAge: 86400 });
      showSuccessToast("Login Successfully");

      navigate("/professor");
    } catch (error: any) {
      console.log("error", error);
      showErrorToast(error?.response?.data?.errorMessage);
    } finally {
      setLoadingLogin(false);
    }
  };
  const googleLoginBtn = async (data: any) => {};

  return {
    control,
    errors,
    handleSubmit,
    onSubmit,
    googleLoginBtn,
    loadingLogin,

    forgotLoading,
    forgotModal,
    handleForgotClose,
    onSubmitForgotEmail,
    openForgotModal,
  };
};
