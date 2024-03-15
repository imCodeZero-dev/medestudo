import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../../config/toastProvider/toastUtils";
import {
  changeProfessorStatusApi,
  createProfessorApi,
  getAllProfessorApi,
} from "../../../../utils/api/admin";
import useLocale from "../../../../locales";
import { passwordRegex } from "../../../../utils/constants/constants";
import { useCookies } from "react-cookie";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import {
  useProfessorsQuery,
  useStudentsQuery,
} from "../../../../redux/slices/APISlice";

export const useAdminProfile = () => {
  // const navigate = useNavigate();
  const { localeSuccess } = useLocale();
  const [cookies] = useCookies(["admin"]);

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
    image: yup.string().required("Name is required"),
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
      image: "",
    },
  });
  const [professorLoading, setProfessorLoading] = useState<boolean>(false);

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
      showErrorToast(error?.response?.data?.errorMessage);
    } finally {
      setProfessorLoading(false);
    }
  };

  return {
    control,
    errors,
    handleSubmit,

    onSubmitCreateProfessor,
    professorLoading,
    watch,
  };
};
