
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useCookies } from "react-cookie";
import useLocale from "../../../locales";
import { useStudentsQuery } from "../../../redux/slices/APISlice";


export const useHome = () => {
  // const navigate = useNavigate();
  const { localeSuccess } = useLocale();
  const [cookies] = useCookies(["admin"]);

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {},
  });

  const {
    allStudents,
    refetchAllStudents,
    allStudentsLoading,
    errorAllStudents,
  } = useStudentsQuery(cookies as any);

 
console.log('allStudents',allStudents)

  return {
    control,
    errors,
    watch,
    allStudents,
    allStudentsLoading,
  };
};
