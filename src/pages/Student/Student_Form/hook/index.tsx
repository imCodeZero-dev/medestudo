import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import { validationSchema } from "../../../../utils/hooks/inputValidation";
import useLocale from "../../../../locales";
import {
  useAllInstituteQuery,
  useAllSubjectsQuery,
} from "../../../../redux/slices/APISlice";
import { Tag } from "../../../../utils/constants/DataTypes";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../../config/toastProvider/toastUtils";
import { studentUpdateSurveyApi } from "../../../../utils/api/Students";

// import { useLocation, useNavigate } from "react-router-dom";

export const useStudentFormPage = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<any>({
    // resolver: yupResolver(validationSchema),
    defaultValues: {
      // rememberme: false,
    },
  });
  const { localeSuccess } = useLocale();
  const [formLogin, setFormLogin] = useState<boolean>(false);
  const [allInstitutes, setAllInstitutes] = useState<any[]>([]);
  const [modifiedSubjects, setModifiedSubjects] = useState<Tag[]>();
  const [arrayOfSubjects, setArrayOfSubjects] = useState<any>([]);
  const [activeSection, setActiveSection] = useState<number>(0);

  const [selectedCheckboxes, setSelectedCheckboxes] = useState<string[]>([]);

  const whyChoose = [
    { label: "Flashcards", active: false },
    { label: "Questions", active: false },
    { label: "Personalized Study", active: false },
  ];
  const mainIntereset = [
    { label: "Clinica Cirugica", active: false },
    { label: "Clinica Medica", active: false },
    { label: "Ginecologia Obstrectricia", active: false },
    { label: "Pediatria", active: false },
    { label: "Medicina Preventiva", active: false },
  ];

  const [whyChooseArray, setWhyChooseArray] = useState(whyChoose);
  const [mainInteresetArray, setMainInteresetArray] = useState(mainIntereset);

  const toggleButtonWhyChoose = (index: number) => {
    whyChooseArray[index].active = !whyChooseArray[index].active;
    setWhyChooseArray([...whyChooseArray]);
  };

  const toggleButtonInterest = (index: number) => {
    mainInteresetArray[index].active = !mainInteresetArray[index].active;
    setMainInteresetArray([...mainInteresetArray]);
  };

  // useEffect(() => {
  //   // setArrayOfSubjects(selectedCheckboxes);

  //   console.log("selectedCheckboxes", selectedCheckboxes);
  // }, [selectedCheckboxes]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cookies, setCookie] = useCookies(["student"]);
  // const navigate = useNavigate();

  const {
    allInstitute,
    allInstituteLoading,
    errorAllInstitute,
    refetchAllInstitute,
  } = useAllInstituteQuery();

  useEffect(() => {
    if (allInstitute) {
      const updatedInstitutes = allInstitute.map((institute: any) => ({
        ...institute,
        name: institute.title,
        title: undefined,
      }));
      setAllInstitutes(updatedInstitutes);
    }
  }, [allInstitute]);

  const {
    allSubjects,
    allSubjectsLoading,
    errorAllSubjects,
    refetchAllSubjects,
  } = useAllSubjectsQuery();

  useEffect(() => {
    if (allSubjects) {
      const transformedArray = allSubjects.map((item: string) => {
        return { _id: item, name: item };
      });
      setModifiedSubjects(transformedArray);
    }
  }, [allSubjects]);

  useEffect(() => {
    if (watch("speciality")) {
      // console.log("arrayOfSubjects", watch("subject"));
      if (!arrayOfSubjects.includes(watch("speciality").label)) {
        arrayOfSubjects.push(watch("speciality").label);
        setArrayOfSubjects([...arrayOfSubjects]);
      }
    }
  }, [watch("speciality")]);

  useEffect(() => {
    console.log("selectedCheckboxes", selectedCheckboxes);
  }, [selectedCheckboxes]);

  // useEffect(() => {
  //   if (watch("state")) {
  //     console.log("watchState", watch("state"));
  //   }
  // }, [watch("state")]);
  const moveBack = () => {
    if (activeSection !== 0) {
      setActiveSection(activeSection - 1);
    }
  };

  const onSubmit = async (data: any) => {
    console.log("loginForm", data);
    if (activeSection === 0 && !(data?.institution && data?.year)) {
      {
        showErrorToast("All Fields are required");
      }
    } else if (
      activeSection === 1 &&
      !(
        data?.country &&
        data?.city &&
        data?.hospital &&
        selectedCheckboxes?.length > 0
      )
    ) {
      {
        showErrorToast("All Fields are required");
      }
    } else if (
      activeSection === 2 &&
      !(
        mainInteresetArray?.some((obj) => obj.active) &&
        whyChooseArray?.some((obj) => obj.active)
      )
    ) {
      {
        showErrorToast("All Fields are required");
      }
    } else {
      if (activeSection === 2) {
        const params = {
          institution: data?.institution.label,
          year: data?.year.label,
          country: JSON?.parse(data?.country).name,
          city: JSON?.parse(data?.city).name,
          speciality: selectedCheckboxes,
          hospital: data?.hospital,
          mainInterest: mainInteresetArray
            ?.filter((i) => i.active)
            ?.map((data) => data?.label),
          whyChoose: whyChooseArray
            ?.filter((i) => i.active)
            ?.map((data) => data?.label),
        };
        console.log("params", params);

        try {
          setFormLogin(true);
          let response;
          response = await studentUpdateSurveyApi(
            params,
            cookies?.student?.token
          );
          console.log("response", response);

          showSuccessToast("Submitted Successfully");

          navigate("/student");
        } catch (error: any) {
          console.log("error", error);
          showErrorToast(error?.response?.data);
        } finally {
          setFormLogin(false);
        }
      } else {
        setActiveSection(activeSection + 1);
      }
    }
  };

  return {
    control,
    errors,
    handleSubmit,
    onSubmit,
    allInstitutes,
    watch,
    modifiedSubjects,
    arrayOfSubjects,
    selectedCheckboxes,
    setSelectedCheckboxes,
    whyChooseArray,
    toggleButtonWhyChoose,
    toggleButtonInterest,
    mainInteresetArray,
    moveBack,
    activeSection,
    formLogin,
  };
};
