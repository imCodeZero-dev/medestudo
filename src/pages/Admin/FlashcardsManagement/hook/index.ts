import { useForm } from "react-hook-form";

import { getAllFlashcardsAdmindApi } from "../../../../utils/api/admin";
import useLocale from "../../../../locales";
import { passwordRegex } from "../../../../utils/constants/constants";
import { useCookies } from "react-cookie";
import { useQuery } from "react-query";
import { useDashboardDataQuery } from "../../../../redux/slices/APISlice";
// import { useLocation, useNavigate } from "react-router-dom";

export const useFlashcardsManagement = () => {
  // const navigate = useNavigate();
  const { localeSuccess } = useLocale();
  const [cookies] = useCookies(["admin"]);

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm({
    // resolver: yupResolver(validationSchema),
    defaultValues: {},
  });

  const {
    data: { data: { cards: allFlashcards = [] } = {} } = {},
    isLoading: allFlashcardsLoading,
    error: errorAllFlashcards,
    refetch: refetchAllFlashcards,
  } = useQuery(
    [
      "allFlashcards",
      {
        cookies,
      },
    ],

    async () => {
      return getAllFlashcardsAdmindApi(cookies?.admin?.token);
    },
    {
      enabled: !!cookies?.admin?.token,
    }
  );

  const {
    dashboardData,
    dashboardDataLoading,
    errorDashboardData,
    refetchDashboardData,
  } = useDashboardDataQuery(cookies?.admin);

  return {
    control,
    watch,
    allFlashcards,
    allFlashcardsLoading,
    dashboardData,
  };
};
