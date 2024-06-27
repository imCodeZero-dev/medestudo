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
import {
  professorEditGeneralProfileApi,
  professorResetPasswordApi,
  professorUpdateProfilePictureApi,
} from "../../../../utils/api/admin";
import { uploadImageToCloudinary } from "../../../../utils/hooks/helper";
import { passwordValidationSchema } from "../../../../utils/hooks/inputValidation";

export const useProfessorSettings = () => {
  // const navigate = useNavigate();
  const { localeSuccess } = useLocale();
  const [cookies, setCookie] = useCookies(["professor"]);
  const dispatch = useDispatch();

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm({
    // resolver: yupResolver(validationSchema),
    defaultValues: {
      email: cookies?.professor?.professor?.email,
      name: cookies?.professor?.professor?.name,
      username: cookies?.professor?.professor?.username,
      location: cookies?.professor?.professor?.location,
    },
  });
  const {
    handleSubmit: handleSubmitImage,
    control: controlImage,
    formState: { errors: errorsImg },
    watch: watchImg,
  } = useForm({
    defaultValues: { pic: cookies?.professor?.professor?.pic },
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

  const [createLoading, setCreateLoading] = useState<boolean>(false);
  const [generalLoading, setGeneralLoading] = useState<boolean>(false);
  const [profilePicLoading, setProfilePicLoading] = useState<boolean>(false);
  const [passwordLoading, setPasswordLoading] = useState<boolean>(false);

  // const openCreate = useSelector((state: any) => state.modal.isOpen);

  const handleCloseCreate = () => {
    dispatch(closeModal());
  };

  const onSubmitGeneral = async (data: any) => {
    // console.log("params", data);
    const params = {
      name: data?.name,
      username: data?.username,
      location: data?.location,
    };
    // console.log("params", params);

    try {
      setGeneralLoading(true);
      let response;
      response = await professorEditGeneralProfileApi(
        params,
        cookies?.professor?.professor?._id,
        cookies?.professor?.token
      );
      console.log("response", response);
      // refetchAllProfessors();
      setCookie(
        "professor",
        { ...cookies.professor, professor: response?.data?.professor },
        { maxAge: 86400 }
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
    console.log("onSubmitImage params", data);
    setProfilePicLoading(true);
    let imageUrl = "";
    imageUrl = await uploadImageToCloudinary(data?.pic);
    const params = {
      pic: imageUrl,
    };
    console.log("onSubmitImage params", params);
    try {
      let response;
      response = await professorUpdateProfilePictureApi(
        params,
        cookies?.professor?.professor?._id,
        cookies?.professor?.token
      );
      console.log("response", response);
      // refetchAllProfessors();
      setCookie(
        "professor",
        { ...cookies.professor, professor: response?.data?.professor },
        { maxAge: 86400 }
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
    console.log("onSubmitPassword", data);
    const params = {
      currentPassword: data?.currentPassword,
      newPassword: data?.newPassword,
      confirmPassword: data?.confirmPassword,
    };
    try {
      setPasswordLoading(true);
      let response;
      response = await professorResetPasswordApi(
        params,
        cookies?.professor?.professor?._id,
        cookies?.professor?.token
      );
      console.log("response", response);
      // refetchAllProfessors();
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
