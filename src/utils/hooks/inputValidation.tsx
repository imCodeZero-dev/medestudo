import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export const validationSchema = yup.object().shape({
    email: yup.string(),
    // .required(localeErrors.ERROR_EMAIL_REQUIRED)
    // .email(localeErrors.ERROR_EMAIL_INVALID),
    password: yup.string(),
    // .required(localeErrors.ERROR_PW_REQUIRED)
    // .matches(password_regex, localeErrors.ERROR_PW_INVALID),
    // rememberme: yup.boolean().required(),
  });