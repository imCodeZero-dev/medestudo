import React from "react";
import { QueryClient } from "react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      // TODO: set to true in production.
      staleTime: 1000 * 60 * 60 * 24 * 7, // 7 days
      cacheTime: Infinity,
      onError(error) {
        // debugger
        console.log(error);
      },
    },
    mutations: {
      onError(error) {
        console.log(error);
      },
    },
  },
});
