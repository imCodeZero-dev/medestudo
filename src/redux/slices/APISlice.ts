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
  getClassDecksApi,
  getDashboardDataApi,
  getExamQuestionsApi,
} from "../../utils/api/professors";
import { getAllSubjectsApi } from "../../utils/api/all";
import {
  getAllCustomClassesApi,
  getAllQuesitonsApi,
  getReviewDecksApi,
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

export const useAllTagsQuery = (cookies: any) => {
  const {
    data: { data: { tags: allTags = [] } = {} } = {},
    isLoading: allTagsLoading,
    error: errorAllTags,
    refetch: refetchAllTags,
  } = useQuery(
    [
      "allTags",
      {
        cookies,
      },
    ],
    async () => {
      return getAllTagsApi(cookies?.admin?.token);
    },
    {
      // enabled: !!cookies?.admin?.token,
    }
  );

  return {
    allTags,
    allTagsLoading,
    errorAllTags,
    refetchAllTags,
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
  console.log("useAllFlashcardsQuery", deckId, "cookies", cookies);
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

export const useAllInstituteQuery = () => {
  const {
    data: { data: { tags: allInstitute = [] } = {} } = {},
    isLoading: allInstituteLoading,
    error: errorAllInstitute,
    refetch: refetchAllInstitute,
  } = useQuery(
    [
      "allInstitute",
      // {
      //   cookies,
      // },
    ],
    async () => {
      return getAllInstituteApi();
    },
    {
      // enabled: !!cookies?.admin?.token,
    }
  );

  return {
    allInstitute,
    allInstituteLoading,
    errorAllInstitute,
    refetchAllInstitute,
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
  console.log("useAllClassDecksQuery", classId, cookies);
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

export const useAllReviewDecksQuery = (cookies: {
  token: string;
  student: { _id: string };
}) => {
  console.log("useAllReviewDecksQuery", cookies);
  const {
    data: { data: { ratings: reviewDecks = [] } = {} } = {},
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
      return getReviewDecksApi(cookies?.student?._id, cookies?.token);
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
