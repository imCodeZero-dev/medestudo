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

import { useNavigate } from "react-router-dom";
import {
  useAllExamsQuery,
  useCustomAllClassesQuery,
  useStudentAllClassesQuery,
} from "../../../../redux/slices/APISlice";
import { createCustomClassApi } from "../../../../utils/api/Students";
import { ModeType } from "../../../../components/LVL3_Cells/ModeDropdown/@types";

export const useStudentFlashcardsExplore = () => {
  // const navigate = useNavigate();
  const { localeSuccess } = useLocale();
  const [cookies] = useCookies(["student"]);
  const dispatch = useDispatch();
  const [viewClass, setViewClass] = useState<boolean>(true);
  const [viewClassDetails, setViewClassDetails] = useState<boolean>(false);
  const [classId, setClassId] = useState<string>();
  const [modeType, setModeType] = useState<ModeType>("free");
  const navigate = useNavigate();
  const [selectedClasses, setSelectedClasses] = useState<any>([]);
  const [selectedDecks, setSelectedDecks] = useState<any>([]);

  const {
    customClasses,
    customClassesLoading,
    errorCustomClasses,
    refetchCustomClasses,
  } = useCustomAllClassesQuery(cookies);

  useEffect(() => {
    console.log("modeType", modeType);
  }, [modeType]);
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<any>({
    // resolver: yupResolver(validationSchema),
    defaultValues: {},
  });
  const {
    handleSubmit: handleSubmitFlashcard,
    control: controlFlashcard,
    formState: { errors: errorsFlashcard },
    watch: watchFlashcard,
  } = useForm({
    // resolver: yupResolver(validationSchema),
    defaultValues: {},
  });
  const handleCheckboxChange = (isChecked: boolean, deck: any) => {
    console.log("handleCheckboxChange", deck, "isChecked", isChecked);
    if (isChecked) {
      deck.forEach((dck: any) => {
        selectedClasses.push(dck);
      });

      setSelectedClasses([...selectedClasses]);
    } else {
      const updatedSelectedClasses = selectedClasses.filter(
        (selectedClass: any) =>
          !deck.some((d: any) => d._id === selectedClass._id)
      );

      setSelectedClasses([...updatedSelectedClasses]);
    }
  };
  // useEffect(() => {
  //   console.log("selectedClasses", selectedClasses);
  // }, [selectedClasses]);
  // useEffect(() => {
  //   console.log("selectedDecks", selectedDecks);
  // }, [selectedDecks]);
  // setSelectedDecks([...selectedDecks, selected]);

  const handleCheckboxDecks = (isChecked: boolean, deck: any) => {
    if (isChecked) {
      setSelectedDecks([...selectedDecks, deck]);
    } else {
      const remove = selectedDecks?.filter((d: any) => d._id !== deck?._id);
      setSelectedDecks(remove);
    }
  };

  useEffect(() => {
    if (selectedClasses?.length > 0) {
      setSelectedDecks((prevState: any) => [
        // ...prevState,
        ...selectedClasses.flatMap((deck: any) => deck || []),
      ]);
    }
  }, [selectedClasses]);

  const [createLoading, setCreateLoading] = useState<boolean>(false);

  const openCreate = useSelector((state: any) => state.modalCreateClass.isOpen);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [selecteClassId, setSelecteClassId] = useState<null | string>(null);

  const handleCloseCreate = () => {
    dispatch(closeModal());
  };

  const handleDeleteClose = () => {
    setDeleteModal(false);
  };

  const openDeleteModal = (id: string) => {
    console.log("openDeleteModal", id);
    setSelecteClassId(id);
    setDeleteModal(true);
  };

  const { allClasses, allClassesLoading, errorAllClasses, refetchAllClasses } =
    useStudentAllClassesQuery(cookies);
  const { allExams, allExamsLoading, errorAllExams, refetchAllExams } =
    useAllExamsQuery(cookies?.student);

  console.log("allClasses", allClasses);

  const onSubmitCreate = async (data: any) => {
    console.log("onSubmitCreate", data);
    const params = {
      title: data?.title,
    };
    try {
      setCreateLoading(true);
      let response;
      response = await createCustomClassApi(params, cookies?.student?.token);
      console.log("response", response);
      refetchCustomClasses();
      showSuccessToast(localeSuccess?.SUCCESS_CUSTOM_CLASS_CREATED);
    } catch (error: any) {
      console.log("error", error);
      showErrorToast(error?.response?.data?.message);
    } finally {
      setCreateLoading(false);
      handleCloseCreate();
    }
  };
  const onDeleteConfirm = async () => {};

  const getDetails = (data: any) => {
    navigate(`/student/flashcard/deck?${data?._id}`, {
      state: { ...data, mode: modeType },
    });
  };
  const getDetailsExam = (data: string) => {
    // navigate(`/professor/exams/exam?${data}`, { state: data });
  };

  // console.log("filteredDecks", filteredDecks);
  return {
    control,
    errors,
    handleSubmit,
    watch,
    handleCloseCreate,
    onSubmitCreate,
    openCreate,
    createLoading,

    allClasses,
    getDetails,
    viewClass,
    openDeleteModal,
    deleteLoading,
    deleteModal,
    handleDeleteClose,
    onDeleteConfirm,
    allExams,
    getDetailsExam,
    setModeType,
    modeType,
    handleCheckboxChange,
    handleCheckboxDecks,
    selectedDecks,
    customClasses,
  };
};
