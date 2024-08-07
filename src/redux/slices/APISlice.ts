import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useQuery } from "react-query";
import {
  getAllDecksApi,
  getAllFlashcardsAdmindApi,
  getAllInstituteApi,
  getAllProfessorApi,
  getAllQuestionsAdmindApi,
  getAllStudentsApi,
  getAllTagsApi,
} from "../../utils/api/admin";
import { AdminCookies } from "../../utils/constants/DataTypes";
import {
  getAllClassesApi,
  getAllExamsApi,
  getAllFlashcardsByIdApi,
  getClassByIdApi,
  getClassDecksApi,
  getDashboardDataApi,
  getExamQuestionsApi,
} from "../../utils/api/professors";
import { getAllSubjectsApi } from "../../utils/api/all";
import {
  getAllCustomClassesApi,
  getAllQuesitonsApi,
  getAllResultApi,
  getCustomClassDecksApi,
  getReviewDecksApi,
  restudyCardAPI,
  studentGetAllClassesApi,
} from "../../utils/api/Students";

export const useProfessorsQuery = (cookies: AdminCookies) => {
  const {
    data: { data: allProfessors = [] } = {},
    isLoading: allProfessorsLoading,
    error: errorAllProfessors,
    refetch: refetchAllProfessors,
  } = useQuery(
    [
      "allProfessors",
      {
        cookies,
      },
    ],
    async () => {
      return getAllProfessorApi(cookies?.admin?.token);
    },
    {
      enabled: !!cookies?.admin?.token,
    }
  );

  return {
    allProfessors,
    allProfessorsLoading,
    errorAllProfessors,
    refetchAllProfessors,
  };
};
export const useStudentsQuery = (cookies: AdminCookies) => {
  const {
    data: { data: allStudents = [] } = {},
    isLoading: allStudentsLoading,
    error: errorAllStudents,
    refetch: refetchAllStudents,
  } = useQuery(
    [
      "allStudents",
      {
        cookies,
      },
    ],
    async () => {
      return getAllStudentsApi(cookies?.admin?.token);
    }
    // {
    //   enabled: !!cookies?.admin?.token,
    // }
  );

  return {
    allStudents,
    allStudentsLoading,
    errorAllStudents,
    refetchAllStudents,
  };
};

export const useAllTagsQuery = (cookies: any, type?: string) => {
  // const {
  //   data: { data: { tags: allTags = [] } = {} } = {},
  //   isLoading: allTagsLoading,
  //   error: errorAllTags,
  //   refetch: refetchAllTags,
  // } = useQuery(
  //   [
  //     "allTags",
  //     {
  //       cookies,
  //     },
  //   ],
  //   async () => {
  //     return getAllTagsApi(cookies?.admin?.token);
  //   },
  //   {
  //     // enabled: !!cookies?.admin?.token,
  //   }
  // );
  const { data, isLoading, error, refetch } = useQuery(
    "allTags",
    async () => {
      const response = await getAllTagsApi(cookies?.admin?.token);
      // console.log("API response:", response);
      return response;
    },
    {
      // enabled: !!cookies?.admin?.token,
      select: (data) => {
        // console.log("Raw data:", data);
        if (data && data.data && data.data.tags) {
          if (type !== "admin") {
            return data.data.tags.filter((tag: any) => tag.status === "active");
          } else {
            return data.data.tags;
          }
        }
        return [];
      },
    }
  );

  return {
    allTags: data,
    allTagsLoading: isLoading,
    errorAllTags: error,
    refetchAllTags: refetch,
  };
};

export const useAllClassesQuery = (cookies: any) => {
  const {
    data: { data: { class: allClasses = [] } = {} } = {},
    isLoading: allClassesLoading,
    error: errorAllClasses,
    refetch: refetchAllClasses,
  } = useQuery(
    [
      "allClasses",
      {
        cookies,
      },
    ],
    async () => {
      return getAllClassesApi(cookies?.professor?.token);
    },
    {
      enabled: !!cookies?.professor?.token,
    }
  );

  return {
    allClasses,
    allClassesLoading,
    errorAllClasses,
    refetchAllClasses,
  };
};

export const useAllDecksQuery = (token: any) => {
  const {
    data: { data: { decks: allDecks = [] } = {} } = {},
    isLoading: allDecksLoading,
    error: errorAllDecks,
    refetch: refetchAllDecks,
  } = useQuery(
    [
      "allDecks",
      {
        token,
      },
    ],
    async () => {
      return getAllDecksApi(token);
    },
    {
      enabled: !!token,
    }
  );

  return {
    allDecks,
    allDecksLoading,
    errorAllDecks,
    refetchAllDecks,
  };
};

export const useAllExamsQuery = (cookies: any) => {
  const {
    data: { data: allExams = [] } = {},
    isLoading: allExamsLoading,
    error: errorAllExams,
    refetch: refetchAllExams,
  } = useQuery(
    [
      "allExams",
      {
        cookies,
      },
    ],
    async () => {
      return getAllExamsApi(cookies?.token);
    },
    {
      enabled: !!cookies?.token,
    }
  );

  return {
    allExams,
    allExamsLoading,
    errorAllExams,
    refetchAllExams,
  };
};

export const useAllFlashcardsQuery = (cookies: any, deckId: string) => {
  const {
    data: { data: { cards: allFlashcards = [] } = {} } = {},
    isLoading: allFlashcardsLoading,
    error: errorallFlashcards,
    refetch: refetchallFlashcards,
  } = useQuery(
    [
      "allFlashcards",
      {
        cookies,
        deckId,
      },
    ],
    async () => {
      return getAllFlashcardsByIdApi(deckId, cookies?.professor?.token);
    },
    {
      enabled: !!cookies?.professor?.token && !!deckId,
    }
  );

  return {
    allFlashcards,
    allFlashcardsLoading,
    errorallFlashcards,
    refetchallFlashcards,
  };
};

export const useAllInstituteQuery = (type?: string) => {
  const { data, isLoading, error, refetch } = useQuery(
    "allInstitute",
    async () => {
      const response = await getAllInstituteApi();
      // console.log("API response:", response);
      return response;
    },
    {
      // enabled: !!cookies?.admin?.token,
      select: (data) => {
        // console.log("Raw data:", data);
        if (data && data.data && data.data.tags) {
          if (type !== "admin") {
            return data.data.tags.filter(
              (institute: any) => institute.status === "active"
            );
          } else {
            return data.data.tags;
          }
        }
        return [];
      },
    }
  );

  // console.log("Filtered institutes:", data);

  return {
    allInstitute: data,
    allInstituteLoading: isLoading,
    errorAllInstitute: error,
    refetchAllInstitute: refetch,
  };
};

export const useAllSubjectsQuery = () => {
  const {
    data: { data: { names: allSubjects = [] } = {} } = {},
    isLoading: allSubjectsLoading,
    error: errorAllSubjects,
    refetch: refetchAllSubjects,
  } = useQuery(
    [
      "allSubjects",
      // {
      //   cookies,
      // },
    ],
    async () => {
      return getAllSubjectsApi();
    },
    {
      // enabled: !!cookies?.admin?.token,
    }
  );

  return {
    allSubjects,
    allSubjectsLoading,
    errorAllSubjects,
    refetchAllSubjects,
  };
};

export const useExamQuestionsQuery = (cookies: any, examId: string) => {
  // console.log("useExamQuestionsQuery", cookies, "examId", examId);
  const {
    data: { data: examQuestions = {} } = {},
    isLoading: examQuestionsLoading,
    error: errorexamQuestions,
    refetch: refetchexamQuestions,
  } = useQuery(
    [
      "allSubjects",
      {
        cookies,
        examId,
      },
    ],
    async () => {
      return getExamQuestionsApi(examId, cookies?.professor?.token);
    },
    {
      enabled: !!cookies?.professor?.token && !!examId,
    }
  );

  return {
    examQuestions,
    examQuestionsLoading,
    errorexamQuestions,
    refetchexamQuestions,
  };
};

export const useStudentAllClassesQuery = (cookies: any) => {
  const {
    data: { data: { class: allClasses = [] } = {} } = {},
    isLoading: allClassesLoading,
    error: errorAllClasses,
    refetch: refetchAllClasses,
  } = useQuery(
    [
      "allClasses",
      {
        cookies,
      },
    ],
    async () => {
      return studentGetAllClassesApi(cookies?.student?.token);
    },
    {
      enabled: !!cookies?.student?.token,
    }
  );
  return {
    allClasses,
    allClassesLoading,
    errorAllClasses,
    refetchAllClasses,
  };
};

export const useCustomAllClassesQuery = (cookies: any) => {
  const {
    data: { data: { classes: customClasses = [] } = {} } = {},
    isLoading: customClassesLoading,
    error: errorCustomClasses,
    refetch: refetchCustomClasses,
  } = useQuery(
    [
      "customClasses",
      {
        cookies,
      },
    ],
    async () => {
      return getAllCustomClassesApi(cookies?.student?.token);
    },
    {
      enabled: !!cookies?.student?.token,
    }
  );
  return {
    customClasses,
    customClassesLoading,
    errorCustomClasses,
    refetchCustomClasses,
  };
};

export const useallQuestionsQuery = (
  cookies: any,
  params: any,
  location: any
) => {
  const {
    data: { data: { questions: allQuestions = [] } = {} } = {},
    isLoading: allQuestionsLoading,
    error: errorallQuestions,
    refetch: refetchallQuestions,
  } = useQuery(
    [
      "allQuestions",
      {
        cookies,
        params,
      },
    ],
    async () => {
      return getAllQuesitonsApi(params, cookies?.student?.token);
    },
    {
      enabled: !!cookies?.student?.token && !!location?.totalQuestions,
    }
  );
  return {
    allQuestions,
    allQuestionsLoading,
    errorallQuestions,
    refetchallQuestions,
  };
};

export const useDashboardDataQuery = (cookies: { token: string }) => {
  const {
    data: { data: { data: dashboardData = [] } = {} } = {},
    isLoading: dashboardDataLoading,
    error: errorDashboardData,
    refetch: refetchDashboardData,
  } = useQuery(
    [
      "dashboardData",
      {
        cookies,
      },
    ],
    async () => {
      return getDashboardDataApi(cookies?.token);
    },
    {
      enabled: !!cookies,
    }
  );

  return {
    dashboardData,
    dashboardDataLoading,
    errorDashboardData,
    refetchDashboardData,
  };
};

export const useAllFlashcardsAdminQuery = (cookies: { token: string }) => {
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
      return getAllFlashcardsAdmindApi(cookies?.token);
    },
    {
      enabled: !!cookies?.token,
    }
  );

  return {
    allFlashcards,
    allFlashcardsLoading,
    errorAllFlashcards,
    refetchAllFlashcards,
  };
};

export const useAllQuestionsAdminQuery = (cookies: { token: string }) => {
  const {
    data: { data: allQuestions = [] } = {},
    isLoading: allQuestionsLoading,
    error: errorAllQuestions,
    refetch: refetchAllQuestions,
  } = useQuery(
    [
      "allQuestions",
      {
        cookies,
      },
    ],
    async () => {
      return getAllQuestionsAdmindApi(cookies?.token);
    },
    {
      enabled: !!cookies?.token,
    }
  );

  return {
    allQuestions,
    allQuestionsLoading,
    errorAllQuestions,
    refetchAllQuestions,
  };
};

export const useAllClassDecksQuery = (
  classId: string,
  cookies: { token: string }
) => {
  // console.log("useAllClassDecksQuery", classId, cookies);
  const {
    data: { data: { decksWithCardCount: classDecks = [] } = {} } = {},
    isLoading: classDecksLoading,
    error: errorclassDecks,
    refetch: refetchclassDecks,
  } = useQuery(
    [
      "classDecks",
      {
        cookies,
        classId,
      },
    ],
    async () => {
      return getClassDecksApi(classId, cookies?.token);
    },
    {
      enabled: !!cookies?.token && !!classId,
    }
  );

  return {
    classDecks,
    classDecksLoading,
    errorclassDecks,
    refetchclassDecks,
  };
};








export const useClassDetailsQuery = (
  classId: string,
  cookies: { token: string }
) => {
  // console.log("useAllClassDecksQuery", classId, cookies);
  const {
    data: { data: { class: classDetails = [] } = {} } = {},
  isLoading: classDetailsLoading,
  error: errorClassDetails,
  refetch: refetchClassDetails,
  } = useQuery(
    [
      "classDetails",
      {
        cookies,
        classId,
      },
    ],
    async () => {
      return getClassByIdApi(classId, cookies?.token);
    },
    {
      enabled: !!cookies?.token && !!classId,
    }
  );

  return {
    classDetails,
    classDetailsLoading,
    errorClassDetails,
    refetchClassDetails,
  };
};

export const useAllReviewDecksQuery = (cookies: {
  token: string;
  student: { _id: string };
}) => {
  // console.log("useAllReviewDecksQuery", cookies);
  const {
    // data: { data: { ratings: reviewDecks = [] } = {} } = {},
    data: { data: { batches: [reviewDecks = []] = [] } = {} } = ({} = {}),
    isLoading: reviewDecksLoading,
    error: errorReviewDecks,
    refetch: refetchReviewDecks,
  } = useQuery(
    [
      "reviewDecks",
      {
        cookies,
      },
    ],
    async () => {
      return restudyCardAPI(cookies?.student?._id, cookies?.token);
      // return getReviewDecksApi(cookies?.student?._id, cookies?.token);
    },
    {
      enabled: !!cookies?.token,
    }
  );

  return {
    reviewDecks,
    reviewDecksLoading,
    errorReviewDecks,
    refetchReviewDecks,
  };
};

export const useCustomClassDecksQuery = (
  deckData: string,
  cookies: { token: string }
) => {
  // console.log("useCustomClassDecksQuery", cookies);
  const {
    data: { data: { decks: allCustomDecks = [] } = {} } = {},
    isLoading: allCustomDecksLoading,
    error: errorallCustomDecks,
    refetch: refetchallCustomDecks,
  } = useQuery(
    [
      "allCustomDecks",
      {
        cookies,
        deckData,
      },
    ],
    async () => {
      return getCustomClassDecksApi(deckData, cookies?.token);
    },
    {
      enabled: !!cookies?.token && !!deckData,
    }
  );

  return {
    allCustomDecks,
    allCustomDecksLoading,
    errorallCustomDecks,
    refetchallCustomDecks,
  };
};

export const useAllResultQuery = (cookies: { token: string }) => {
  // console.log("useAllResultQuery", cookies);
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
      return getAllResultApi(cookies?.token);
    },
    {
      enabled: !!cookies?.token,
    }
  );

  return {
    allResult,
    allResultLoading,
    errorAllResult,
    refetchAllResult,
  };
};
