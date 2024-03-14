import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useQuery } from "react-query";
import { getAllProfessorApi, getAllStudentsApi } from "../../utils/api/admin";

// // Define the type for professor state
// interface ProfessorState {
//   allProfessors: any[]; // Adjust the type according to your professor data structure
//   loading: boolean;
//   error: string | null;
// }

// // Define an initial state for professors
// const initialState: ProfessorState = {
//   allProfessors: [],
//   loading: false,
//   error: null,
// };

// // Create a thunk action creator for fetching professors
// export const fetchProfessors = createAsyncThunk(
//   "professors/fetchProfessors",
//   async (cookies: any) => {
//     const response = await getAllProfessorApi(cookies?.admin?.token); // Pass cookies?.admin?.token as a parameter
//     return response.data;
//   }
// );

// // Create a slice for managing professors state
// const professorSlice = createSlice({
//   name: "professors",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     // Handle actions related to fetching professors
//     builder
//       .addCase(fetchProfessors.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchProfessors.fulfilled, (state, action) => {
//         state.loading = false;
//         state.allProfessors = action.payload;
//       })
//       .addCase(fetchProfessors.rejected, (state, action) => {
//         state.loading = false;
//         state.error =
//           action.error.message ??
//           "An error occurred while fetching professors.";
//       });
//   },
// });

// // Export the reducer function generated by createSlice
// export default professorSlice.reducer;

// Custom hook to use in components for fetching professors and refetching
export const useProfessorsQuery = (cookies: any) => {
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
export const useStudentsQuery = (cookies: any) => {
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
