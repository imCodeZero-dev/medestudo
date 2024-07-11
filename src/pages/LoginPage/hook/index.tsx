import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import {
  validationSchema,
  validationSchemaRegistration,
} from "../../../utils/hooks/inputValidation";
import { professorLoginApi } from "../../../utils/api/professors";
import { loginAdmin } from "../../../redux/slices/AdminSlice";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../config/toastProvider/toastUtils";
import { loginProfessor } from "../../../redux/slices/ProfessorSlice";
import {
  resetPasswordApi,
  sendOtpToEmailApi,
  verifyOTPApi,
} from "../../../utils/api/all";
import useLocale from "../../../locales";
import { forgotSteps } from "../../../components/LVL4_Organs/ForgotPasswordModal/types";
import {
  googleLoginApi,
  studentLoginApi,
  studentRegistrationApi,
} from "../../../utils/api/Students";
// import { useLocation, useNavigate } from "react-router-dom";

export const useLoginPage = () => {
  const [authType, setAuthType] = useState<string>("login");

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(
      authType === "login" ? validationSchema : validationSchemaRegistration
    ),
    defaultValues: {
      email: "",
      password: "",
      // rememberme: false,
    },
  });
  const pathName = useLocation().pathname;
  const professorPanel = pathName.includes("/professor");
  const { localeSuccess } = useLocale();
  const [forgotModal, setForgotModal] = useState<boolean>(false);
  const [forgotLoading, setForgotLoading] = useState<boolean>(false);
  const [loadingLogin, setLoadingLogin] = useState<boolean>(false);
  const [loadingRegister, setLoadingRegister] = useState<boolean>(false);
  const [validOtp, setValidOtp] = useState<boolean>(true);
  const [forgotEmail, setforgotEmail] = useState<string>("");
  const [forgotSteps, setForgotSteps] = useState<forgotSteps>({
    email: true,
    otp: false,
    password: false,
    success: false,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cookies, setCookie, removeCookie] = useCookies([
    "professor",
    "student",
    "admin",
  ]);
  // const navigate = useNavigate();
  const switchToRegistration = () => {
    setAuthType("registration");
  };
  const switchToLogin = () => {
    setAuthType("login");
  };

  const handleForgotClose = () => {
    setForgotModal(false);
  };

  const openForgotModal = () => {
    setForgotModal(true);
  };

  const onSubmitForgotEmail = async (data: any) => {
    console.log("onSubmitForgotEmail", data);
    const params = {
      email: data?.forgotEmail,
    };
    setforgotEmail(data?.forgotEmail);
    try {
      setForgotLoading(true);
      let response;
      response = await sendOtpToEmailApi(params);
      console.log("response", response);

      showSuccessToast(localeSuccess.SUCCESS_OTP_SENT_CHANGED);
      setForgotSteps({ ...forgotSteps, otp: true, email: false });
    } catch (error: any) {
      console.log("error", error);
      showErrorToast(error?.response?.data);
    } finally {
      setForgotLoading(false);
    }
  };

  const resendOtp = async () => {
    const params = {
      email: forgotEmail,
    };
    try {
      setForgotLoading(true);
      let response;
      response = await sendOtpToEmailApi(params);
      console.log("response", response);

      showSuccessToast(localeSuccess.SUCCESS_OTP_SENT_CHANGED);
      setForgotSteps({ ...forgotSteps, otp: true, email: false });
    } catch (error: any) {
      console.log("error", error);
      showErrorToast(error?.response?.data);
    } finally {
      setForgotLoading(false);
    }
  };

  const onSubmitOTP = async (data: any) => {
    console.log("onSubmitOTP", data);
    // console.log("onSubmitOTP json", JSON.parse(localStorage.getItem("email")));
    const params = {
      otp: data?.otp?.join(""),
      email: data?.forgotEmail,
      // otp: data?.otp,
    };

    try {
      setForgotLoading(true);
      let response;
      response = await verifyOTPApi(params);
      console.log("response", response);
      if (response?.data?.valid) {
        showSuccessToast(localeSuccess.SUCCESS_VALID_OTP);
        setForgotSteps({ ...forgotSteps, otp: false, password: true });
      } else {
        setValidOtp(false);
      }
    } catch (error: any) {
      console.log("error", error);
      showErrorToast(error?.response?.data);
    } finally {
      setForgotLoading(false);
    }
  };

  const onSubmitPassword = async (data: any) => {
    console.log("onSubmitPassword", data);
    const params = {
      newPassword: data?.passwordForgot,
      confirmPassword: data?.confirmPasswordForgot,
    };

    try {
      setForgotLoading(true);
      let response;
      response = await resetPasswordApi(params);
      console.log("response", response);

      showSuccessToast(localeSuccess.SUCCESS_PASSWORD_RESET);
      setForgotSteps({ ...forgotSteps, password: false, success: true });
    } catch (error: any) {
      console.log("error", error);
      showErrorToast(error?.response?.data);
    } finally {
      setForgotLoading(false);
    }
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
      const cookieOptions = {};
      if (professorPanel) {
        response = await professorLoginApi(params);
        console.log("response", response);
        debugger;
        if (response?.data?.professor?.status === "active") {
          removeCookie("admin", cookieOptions);
          removeCookie("student", cookieOptions);
          dispatch(loginProfessor(response?.data));
          setCookie("professor", response?.data, { maxAge: 86400 });
          showSuccessToast("Login Successfully");

          navigate("/professor");
        } else {
          showErrorToast("Your Account has been disabled");
        }
      } else {
        response = await studentLoginApi(params);
        console.log("response", response);

        if (response?.data?.student?.status === "active") {
          debugger;
          removeCookie("admin", cookieOptions);
          removeCookie("professor", cookieOptions);
          dispatch(loginProfessor(response?.data));
          setCookie("student", response?.data, { maxAge: 86400 });
          showSuccessToast("Login Successfully");
          if (response?.data?.student?.importantQuestions) {
            navigate("/student/");
          } else {
            navigate("/student/survey");
          }
        } else {
          showErrorToast("Your Account has been disabled");
        }
      }
    } catch (error: any) {
      console.log("error", error);
      showErrorToast(error?.response?.data);
    } finally {
      setLoadingLogin(false);
    }
  };
  const onSubmitRegistration = async (data: any) => {
    console.log("onSubmitRegistration", data);
    const params = {
      name: data?.name,
      email: data?.email,
      password: data?.password,
    };

    try {
      setLoadingRegister(true);
      let response;
      response = await studentRegistrationApi(params);
      console.log("response", response);

      // dispatch(loginProfessor(response?.data));
      setCookie("student", response?.data, { maxAge: 86400 });
      showSuccessToast("Registration Successfully");

      navigate("/student/survey");
    } catch (error: any) {
      console.log("error", error);
      showErrorToast(error?.response?.data);
    } finally {
      setLoadingRegister(false);
    }
  };
  const registerGoogle = async () => {
    window.location.href =
      "http://medestudo.onrender.com/api/v1/register/google";
  };
  const loginGoogle = async () => {
    // const newWindow = window.open(
    //   "https://medestudo.onrender.com/api/v1/auth/google"
    // );
    window.location.href = "https://medestudo.onrender.com/api/v1/auth/google";
  };

  return {
    control,
    errors,
    handleSubmit,
    onSubmit,
    loginGoogle,
    loadingLogin,

    forgotLoading,
    forgotModal,
    handleForgotClose,
    onSubmitForgotEmail,
    openForgotModal,
    forgotSteps,
    onSubmitPassword,
    onSubmitOTP,
    resendOtp,
    validOtp,
    onSubmitRegistration,
    switchToRegistration,
    switchToLogin,
    authType,
    loadingRegister,
    registerGoogle,
  };
};
