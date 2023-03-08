import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useService = <T,>(options: UseQueryOptions) => {
  return useQuery<unknown, unknown, T, any>({
    ...options,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    refetchOnMount: false,
  });
};
