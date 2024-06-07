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
import { closeModal2 } from "../../../../redux/slices/CreateExamModalSlice";
import {
  useAllDecksQuery,
  useAllExamsQuery,
  useAllInstituteQuery,
} from "../../../../redux/slices/APISlice";
import {
  createClassApi,
  createExamApi,
  deleteExamApi,
  editExamApi,
} from "../../../../utils/api/professors";
import { examForm } from "../../../../utils/constants/DataTypes";
import { useNavigate } from "react-router-dom";
import { examCardData } from "../../../../components/LVL3_Cells/DashboardExams/@types";
import { getAllResultApi } from "../../../../utils/api/Students";

export const useStudentResult = () => {
  // const navigate = useNavigate();
  const { localeSuccess } = useLocale();
  const [cookies] = useCookies(["student"]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [filteredArray, setFilteredArray] = useState<examCardData[]>([]);

  const validationSchema = yup.object().shape({
    title: yup.string().required("title is required"),
  });
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    reset,
    setValue,
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      title: "",
      // institute: "",
      // year: "",
    },
  });

  // console.log("watchInst", watchInst);

  // const { allDecks, allDecksLoading, errorAllDecks, refetchAllDecks } =
  //   useAllDecksQuery(cookies?.professor?.token);

  // const {
  //   allInstitute,
  //   allInstituteLoading,
  //   errorAllInstitute,
  //   refetchAllInstitute,
  // } = useAllInstituteQuery();

  // console.log("allInstitute", allInstitute);

  // const { allExams, allExamsLoading, errorAllExams, refetchAllExams } =
  //   useAllExamsQuery(cookies);

  const [createLoading, setCreateLoading] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [selecteExamId, setSelecteExamId] = useState<null | string>(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [updatedInstitutes, setUpdatedInstitutes] = useState<any[]>([]);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const questions = [
    {
      questionText:
        "Man, 50 years old, complaining of palpitations and malaise for 3 days, developed drowsiness and chest pain. He comes to the emergency department bringing the ECG with him. The initial conduct is:",
      options: [
        "Measure biomarkers and initiate therapy for acute coronary syndrome.",
        "Synchronized electrical cardioversion.",
        "Synchronized electrical cardioversion.",
        "Synchronized electrical cardioversion.",
      ],
      correctAnswer: 1,
      selectedAnswer: 2,
      image: "/path/to/image.png",
    },
    // Add more questions as needed
  ];

  const handleOpenDrawer = () => {
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  const openCreate = useSelector((state: any) => state.modalCreateExam.isOpen);

  const {
    data: { data: { allResult = [] } = {} } = {},
    isLoading: allResultLoading,
    error: errorAllResult,
    refetch: refetchAllResult,
  } = useQuery(
    [
      "allResult",
      {
        cookies,
      },
    ],

    async () => {
      return getAllResultApi(cookies?.student?.token);
    },
    {
      enabled: !!cookies?.student?.token,
    }
  );

  console.log("allResult", allResult);

  const handleCloseCreate = () => {
    dispatch(closeModal2());
  };
  const handleDeleteClose = () => {
    setDeleteModal(false);
  };

  const openDeleteModal = (id: string) => {
    setSelecteExamId(id);
    setDeleteModal(true);
  };
  const openEditModal = (data: examCardData) => {
    setSelecteExamId(data?._id);
    setEditModal(true);
    setValue("title", data?.title);
    setValue("institute", data?.institute);
    setValue("year", data?.year);
  };

  const handleEditClose = () => {
    setEditModal(false);
  };

  // const onSubmitEdit = async (data: any) => {
  //   console.log("onSubmitEdit", data);
  //   const params = {
  //     title: data?.title,
  //     institute: data?.institute?.label,
  //     year: data?.year?.label,
  //   };
  //   try {
  //     setCreateLoading(true);
  //     let response;
  //     response = await editExamApi(
  //       params,
  //       selecteExamId as string,
  //       cookies?.student?.token
  //     );
  //     console.log("response", response);
  //     refetchAllExams();
  //     reset();
  //     showSuccessToast(localeSuccess?.SUCCESS_EXAM_UPDATED);
  //   } catch (error: any) {
  //     console.log("error", error);
  //     showErrorToast(error?.response?.data?.message);
  //   } finally {
  //     setCreateLoading(false);
  //     handleEditClose();
  //   }
  // };

  // const onSubmitCreate = async (data: any) => {
  //   console.log("onSubmitCreate", data);
  //   const params = {
  //     title: data?.title,
  //     institute: data?.institute?.label,
  //     year: data?.year?.label,
  //   };
  //   try {
  //     setCreateLoading(true);
  //     let response;
  //     response = await createExamApi(params, cookies?.student?.token);
  //     console.log("response", response);
  //     refetchAllExams();
  //     reset();
  //     showSuccessToast(localeSuccess?.SUCCESS_EXAM_CREATED);
  //   } catch (error: any) {
  //     console.log("error", error);
  //     showErrorToast(error?.response?.data?.message);
  //   } finally {
  //     setCreateLoading(false);
  //     handleCloseCreate();
  //   }
  // };

  // const onDeleteConfirm = async () => {
  //   try {
  //     setDeleteLoading(true);
  //     let response;
  //     response = await deleteExamApi(
  //       selecteExamId as string,
  //       cookies?.student?.token
  //     );
  //     console.log("response", response);
  //     refetchAllExams();
  //     showSuccessToast(localeSuccess?.SUCCESS_EXAM_DELETED);
  //     setSelecteExamId(null);
  //   } catch (error: any) {
  //     console.log("error", error);
  //     showErrorToast(error?.response?.data?.message);
  //   } finally {
  //     setDeleteLoading(false);
  //     handleDeleteClose();
  //   }
  // };

  const getDetails = (data: string) => {
    console.log("getDetails", data);
    handleOpenDrawer()
    // navigate(`/student/exams/exam?${data}`, { state: data });
  };

  // useEffect(() => {
  //   if (allInstitute) {
  //     const updatedInstitutes = allInstitute.map((institute: any) => ({
  //       ...institute,
  //       name: institute.title,
  //       title: undefined,
  //     }));
  //     setUpdatedInstitutes(updatedInstitutes);
  //   }
  // }, [allInstitute]);

  const clearFilter = () => {
    setValue("filter_year", "");
    setValue("filter_institute", "");
    setValue("filter_title", "");
  };

  const year = watch("filter_year");
  const institute = watch("filter_institute");
  const title = watch("filter_title");
  useEffect(() => {
    console.log("year", year, "institute", institute, "title", title);
    const filteredData = allResult?.filter((item: examCardData) => {
      if (!year && !institute && !title) {
        return true;
      }
      return (
        (!year || item?.year === year?.label) &&
        (!title || item?.title.toLowerCase().includes(title.toLowerCase())) &&
        (!institute || item?.institute === institute?.label)
      );
    });

    setFilteredArray(filteredData);
  }, [allResult, year, institute, title]);

  return {
    control,
    errors,
    handleSubmit,

    watch,

    handleCloseCreate,
    // onSubmitCreate,
    openCreate,
    createLoading,
    // allDecks,
    // onDeleteConfirm,
    // allExams,
    deleteLoading,
    getDetails,
    openDeleteModal,
    deleteModal,
    handleDeleteClose,
    handleEditClose,
    openEditModal,
    editModal,
    // onSubmitEdit,
    updatedInstitutes,
    filteredArray,
    clearFilter,
    allResult,
    isDrawerOpen,
    questions,
    handleOpenDrawer,
    handleCloseDrawer,
  };
};
