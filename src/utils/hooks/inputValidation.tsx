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

export const exmaQuestionValidation = yup.object().shape({
  subjects: yup
    .array()
    .min(1, "Provide at least one subject")
    // .max(10, "Only 10 subjects are allowed")
    .required("Provide at least one subject"),
  // tags: yup.array().of(yup.string()).required("Tags are required"),
  tags: yup
    .array()
    .min(1, "Provide at least one tag")
    // .max(10, "Only 10 tags are allowed")
    .required("Provide at least one tag"),
  question: yup.string().required("Question is required"),
  answers: yup.array().of(
    yup.object().shape({
      text: yup.string().required("Answer text is required"),
      // isCorrect: yup
      //   .bool() // use bool instead of boolean
      //   .oneOf([true]),
      reason: yup.string().required("Reason is required"),
      // image: yup.string(),
    })
  ),
  solution: yup.string().required("Detailed solution is required"),
});
