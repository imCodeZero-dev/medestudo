import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../../config/toastProvider/toastUtils";

import useLocale from "../../../../locales";
import { useCookies } from "react-cookie";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../../../redux/slices/CreateClassModalSlice";

import { uploadImageToCloudinary } from "../../../../utils/hooks/helper";
import { passwordValidationSchema } from "../../../../utils/hooks/inputValidation";
import {
  resetStudentPasswordApi,
  updateStudentPictureApi,
  updateStudentProfileApi,
} from "../../../../utils/api/Students";

export const useStudentSettings = () => {
  // const navigate = useNavigate();
  const { localeSuccess } = useLocale();
  const [cookies, setCookie] = useCookies(["student"]);
  const dispatch = useDispatch();

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm({
    // resolver: yupResolver(validationSchema),
    defaultValues: {
      email: cookies?.student?.student?.email,
      name: cookies?.student?.student?.name,
      username: cookies?.student?.student?.username,
      location: cookies?.student?.student?.location,
    },
  });
  const {
    handleSubmit: handleSubmitImage,
    control: controlImage,
    formState: { errors: errorsImg },
    watch: watchImg,
  } = useForm({
    defaultValues: { pic: cookies?.student?.student?.pic },
  });

  const {
    handleSubmit: handleSubmitPassword,
    control: controlPassword,
    formState: { errors: errorPassword },
    reset: resetPassword,
    // watch: watchEmail,
  } = useForm({
    resolver: yupResolver(passwordValidationSchema),
    defaultValues: {},
  });
  const {
    handleSubmit: handleSubmitPrivacy,
    control: controlPrivacy,
    formState: { errors: errorPrivacy },
    // watch: watchEmail,
  } = useForm({
    defaultValues: {},
  });

  const [generalLoading, setGeneralLoading] = useState<boolean>(false);
  const [profilePicLoading, setProfilePicLoading] = useState<boolean>(false);
  const [passwordLoading, setPasswordLoading] = useState<boolean>(false);

  const onSubmitGeneral = async (data: any) => {
    // const params = {
    //   name: data?.name,
    //   username: data?.username,
    //   location: JSON.parse(data?.location).name,
    // };
    const params = {
      name: data?.name,
      username: data?.username,
      location: data?.location,
    };
    console.log("params", params);

    try {
      setGeneralLoading(true);
      let response;
      response = await updateStudentProfileApi(
        params,
        cookies?.student?.student?._id,
        cookies?.student?.token
      );
      console.log("response", response);
      // refetchAllProfessors();
      setCookie(
        "student",
        { ...cookies.student, student: response?.data?.student },
        {
          expires: new Date(Date.now() + 86400 * 1000), // 1 day
          path: "/",
          sameSite: "strict",
          secure: true,
        }
      );
      showSuccessToast(localeSuccess?.SUCCESS_GENERAL_INFO_UPDATED);
    } catch (error: any) {
      console.log("error", error);
      showErrorToast(error?.response?.data?.message);
    } finally {
      setGeneralLoading(false);
    }
  };
  const onSubmitImage = async (data: any) => {
    let imageUrl = "";
    setProfilePicLoading(true);
    imageUrl = await uploadImageToCloudinary(data?.pic);
    const params = {
      pic: imageUrl,
    };
    try {
      let response;
      response = await updateStudentPictureApi(
        params,
        cookies?.student?.student?._id,
        cookies?.student?.token
      );
      console.log("response", response);
      // refetchAllProfessors();
      setCookie(
        "student",
        { ...cookies.student, student: response?.data?.student },
        {
          expires: new Date(Date.now() + 86400 * 1000), // 1 day
          path: "/",
          sameSite: "strict",
          secure: true,
        }
      );
      showSuccessToast(localeSuccess?.SUCCESS_PROFILE_PICTURE_UPDATED);
    } catch (error: any) {
      console.log("error", error);
      showErrorToast(error?.response?.data?.message);
    } finally {
      setProfilePicLoading(false);
    }
  };

  const onSubmitPassword = async (data: any) => {
    const params = {
      currentPassword: data?.currentPassword,
      newPassword: data?.newPassword,
      confirmPassword: data?.confirmPassword,
    };
    try {
      setPasswordLoading(true);
      let response;
      response = await resetStudentPasswordApi(
        params,
        cookies?.student?.student?._id,
        cookies?.student?.token
      );
      console.log("response", response);
      showSuccessToast(localeSuccess?.SUCCESS_PASSWORD_RESET);
      resetPassword();
    } catch (error: any) {
      console.log("error", error);
      showErrorToast(error?.response?.data?.message);
    } finally {
      setPasswordLoading(false);
    }
  };
  const onSubmitPrivacy = async (data: any) => {
    console.log("params", data);
  };

  return {
    control,
    controlImage,
    controlPassword,
    errors,
    handleSubmit,

    watch,
    watchImg,

    handleSubmitImage,
    onSubmitGeneral,
    onSubmitImage,
    handleSubmitPassword,
    onSubmitPassword,
    handleSubmitPrivacy,
    onSubmitPrivacy,
    generalLoading,
    profilePicLoading,
    passwordLoading,
  };
};
