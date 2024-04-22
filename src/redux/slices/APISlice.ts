import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useQuery } from "react-query";
import {
  getAllDecksApi,
  getAllInstituteApi,
  getAllProfessorApi,
  getAllStudentsApi,
  getAllTagsApi,
} from "../../utils/api/admin";
import { AdminCookies } from "../../utils/constants/DataTypes";
import {
  getAllClassesApi,
  getAllExamsApi,
  getAllFlashcardsByIdApi,
} from "../../utils/api/professors";

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
    },
    {
      enabled: !!cookies?.admin?.token,
    }
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

export const useAllDecksQuery = (cookies: any) => {
  const {
    data: { data: { decks: allDecks = [] } = {} } = {},
    isLoading: allDecksLoading,
    error: errorAllDecks,
    refetch: refetchAllDecks,
  } = useQuery(
    [
      "allDecks",
      {
        cookies,
      },
    ],
    async () => {
      return getAllDecksApi(cookies?.professor?.token);
    },
    {
      enabled: !!cookies?.professor?.token,
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
    // data: { data: { decks: allExams = [] } = {} } = {},
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
      return getAllExamsApi(cookies?.professor?.token);
    },
    {
      enabled: !!cookies?.professor?.token,
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

export const useAllInstituteQuery = (cookies: any) => {
  const {
    data: { data: { tags: allInstitute = [] } = {} } = {},
    isLoading: allInstituteLoading,
    error: errorAllInstitute,
    refetch: refetchAllInstitute,
  } = useQuery(
    [
      "allInstitute",
      {
        cookies,
      },
    ],
    async () => {
      return getAllInstituteApi(cookies?.admin?.token);
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
