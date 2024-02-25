import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  useForm,
} from "react-hook-form";
// import { useLocation, useNavigate } from "react-router-dom";

export const useLoginPage = () => {
  // const navigate = useNavigate();
  const validationSchema = yup.object().shape({
    email: yup.string(),
    // .required(localeErrors.ERROR_EMAIL_REQUIRED)
    // .email(localeErrors.ERROR_EMAIL_INVALID),
    password: yup.string(),
    // .required(localeErrors.ERROR_PW_REQUIRED)
    // .matches(password_regex, localeErrors.ERROR_PW_INVALID),
    rememberme: yup.boolean().required(),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberme: false,
    },
  });

  return {
    control,
    errors,
    handleSubmit,
  };
};
