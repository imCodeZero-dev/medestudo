import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../config/toastProvider/toastUtils";
import { loginAdmin } from "../../../redux/slices/AdminSlice";
import { adminLoginApi } from "../../../utils/api/admin";

// import { useLocation, useNavigate } from "react-router-dom";

const validationSchema = yup.object().shape({
  email: yup.string(),
  // .required(localeErrors.ERROR_EMAIL_REQUIRED)
  // .email(localeErrors.ERROR_EMAIL_INVALID),
  password: yup.string(),
  // .required(localeErrors.ERROR_PW_REQUIRED)
  // .matches(password_regex, localeErrors.ERROR_PW_INVALID),
  // rememberme: yup.boolean().required(),
});
export const useAdminLogin = () => {
  const [loadingLogin, setLoadingLogin] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cookies, setCookie, removeCookie] = useCookies(["admin"]);

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

  const onSubmit = async (data: any) => {
    console.log("loginForm", data);
    const params = {
      email: data?.email,
      password: data?.password,
    };

    try {
      setLoadingLogin(true);
      let response;
      response = await adminLoginApi(params);
      console.log("response", response);

      const updatedUserData = {
        ...response?.data,
        updateUser: {
          ...response?.data?.updateUser,
          role: data?.accountHolder,
        },
      };

      dispatch(loginAdmin(response?.data));
      setCookie("admin", response?.data, { maxAge: 86400 });
      showSuccessToast("Login Successfully");

      navigate("/admin");
    } catch (error:any) {
      console.log("error", error);
      showErrorToast(error?.response?.data?.errorMessage);
      // toast.error("Login failed");
    } finally {
      setLoadingLogin(false);
    }
  };

  return {
    control,
    errors,
    handleSubmit,
    onSubmit,
  };
};
