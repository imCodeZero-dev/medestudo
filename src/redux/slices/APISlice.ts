import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useQuery } from "react-query";
import {
  getAllProfessorApi,
  getAllStudentsApi,
  getAllTagsApi,
} from "../../utils/api/admin";
import { AdminCookies } from "../../utils/constants/DataTypes";

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
