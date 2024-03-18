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
  updateAdminProfileApi,
} from "../../../../utils/api/admin";
import useLocale from "../../../../locales";
import {
  CLOUDINARY_CLOUD_NAME,
  passwordRegex,
} from "../../../../utils/constants/constants";
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
    currentPassword: yup
      .string()
      .required("Password is required")
      .matches(passwordRegex, "Invalid password format"),
    newPassword: yup
      .string()
      .required("Password is required")
      .matches(passwordRegex, "Invalid password format"),
    name: yup.string().required("Name is required"),
    username: yup.string().required("Username is required"),
    image: yup.string().required("Picture is required"),
    confirmPassword: yup
      .string()
      .required("Confirm Password is required")
      .oneOf([yup.ref("newPassword")], "Passwords must match"),
  });
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm({
    // resolver: yupResolver(validationSchema),
    defaultValues: {
      username: "",
      email: "",
      newPassword: "",
      name: "",
      image: "",
    },
  });
  const [professorLoading, setProfessorLoading] = useState<boolean>(false);

  const onSubmitUpdateAdmin = async (data: any) => {
    console.log("onSubmitUpdateAdmin", data);
    try {
      setProfessorLoading(true);

      let imageUrl = "";
      if (data?.image) {
        imageUrl = await uploadImageToCloudinary(data.image);
      }

      const params = {
        name: data?.name,
        email: data?.email,
        password: data?.newPassword,
        username: data?.username,
        pic: imageUrl,
      };

      const response = await updateAdminProfileApi(
        params,
        cookies?.admin?._id,
        cookies?.admin?.token
      );
      console.log("response", response);

      showSuccessToast(localeSuccess?.SUCCESS_ADMIN_UPDATED);
    } catch (error: any) {
      console.log("error", error);
      showErrorToast(error?.response?.data?.errorMessage);
    } finally {
      setProfessorLoading(false);
    }
  };

  const uploadImageToCloudinary = async (image: File): Promise<string> => {
    console.log("uploadImageToCloudinary", image);
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "hqwykwvl");

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Failed to upload image to Cloudinary");
    }

    const data = await response.json();
    return data.secure_url; // Return the URL of the uploaded image
  };

  return {
    control,
    errors,
    handleSubmit,

    onSubmitUpdateAdmin,
    professorLoading,
    watch,
  };
};
