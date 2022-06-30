import { useQuery } from "react-query";

type Options = {
    refetchInterval?: number;
}

export const useRequest = (request: () => {}, options?: Options) =>
   useQuery(request.name, request, { ...options });