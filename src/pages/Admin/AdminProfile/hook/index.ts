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
  resetAdminPasswordApi,
  updateAdminProfileApi,
} from "../../../../utils/api/admin";
import useLocale from "../../../../locales";
import {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_FOLDER,
  CLOUDINARY_UPLOAD_PRESET,
  passwordRegex,
} from "../../../../utils/constants/constants";
import { useCookies } from "react-cookie";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import {
  useProfessorsQuery,
  useStudentsQuery,
} from "../../../../redux/slices/APISlice";
import dayjs from "dayjs";
import { uploadImageToCloudinary } from "../../../../utils/hooks/helper";
import { passwordValidationSchema } from "../../../../utils/hooks/inputValidation";

export const useAdminProfile = () => {
  // const navigate = useNavigate();
  const { localeSuccess } = useLocale();
  const [cookies, setCookie] = useCookies(["admin"]);

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .required("Email is required")
      .email("Invalid email format"),
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    image: yup.string().required("Picture is required"),
  });
 

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      lastName: cookies?.admin?.lastName,
      email: cookies?.admin?.email,
      // newPassword: "",
      firstName: cookies?.admin?.firstName,
      image: cookies?.admin?.pic,
    },
  });
  const {
    handleSubmit: handleSubmitPassword,
    control: controlPassword,
    formState: { errors: passwordErrors },
    watch: watchPasswordFields,
  } = useForm({
    resolver: yupResolver(passwordValidationSchema),
    defaultValues: {
      newPassword: "",
    },
  });
  const [profileLoading, setProfileLoading] = useState<boolean>(false);
  const [resetLoading, setResetLoading] = useState<boolean>(false);

  const onSubmitUpdateAdmin = async (data: any) => {
    console.log("onSubmitUpdateAdmin", data);
    try {
      setProfileLoading(true);

      let imageUrl = "";
      if (data?.image) {
        imageUrl = await uploadImageToCloudinary(watch("image"));
      }

      const params = {
        firstName: data?.firstName,
        lastName: data?.lastName,
        email: data?.email,
        pic: imageUrl,
      };

      const response = await updateAdminProfileApi(
        params,
        cookies?.admin?._id,
        cookies?.admin?.token
      );
      console.log("response", response);

      const updatedAdmin = {
        ...cookies?.admin,
        firstName: data?.firstName,
        lastName: data?.lastName,
        email: data?.email,
        pic: imageUrl,
      };
      // setCookie("admin", updatedAdmin, { maxAge: 86400 });
      setCookie("admin", updatedAdmin, {
        path: "/",
        expires: new Date(dayjs().add(Number(30), "day").toString()),
      });

      showSuccessToast(localeSuccess?.SUCCESS_ADMIN_UPDATED);
    } catch (error: any) {
      console.log("error", error);
      showErrorToast(error?.response?.data?.message);
    } finally {
      setProfileLoading(false);
    }
  };

 
  const onSubmitResetPasswordAdmin = async (data: any) => {
    console.log("onSubmitResetPasswordAdmin", data);
    try {
      setResetLoading(true);

      const params = {
        currentPassword: data?.currentPassword,
        newPassword: data?.newPassword,
      };

      const response = await resetAdminPasswordApi(
        params,
        cookies?.admin?._id,
        cookies?.admin?.token
      );
      console.log("response", response);

      showSuccessToast(localeSuccess?.SUCCESS_PASSWORD_RESET);
    } catch (error: any) {
      console.log("error", error);
      showErrorToast(error?.response?.data?.message);
    } finally {
      setResetLoading(false);
    }
  };

  return {
    control,
    errors,
    handleSubmit,

    onSubmitUpdateAdmin,
    profileLoading,
    watch,
    handleSubmitPassword,
    controlPassword,
    passwordErrors,
    watchPasswordFields,
    onSubmitResetPasswordAdmin,
    resetLoading,
  };
};
