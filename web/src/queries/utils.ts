import { useQuery, useQueryClient } from "@tanstack/react-query";

const ONE_MINUTE = 1000 * 60;

export const useQueryWrapper = <TKey = unknown, TRequest = unknown>({
  queryKey,
  queryFn,
}: {
  queryKey: TKey[];
  queryFn: () => Promise<TRequest>;
}) => {
  const queryClient = useQueryClient();
  return {
    fetch: () =>
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useQuery({
        queryKey,
        queryFn,
        staleTime: ONE_MINUTE,
        refetchOnWindowFocus: false,
      }),
    invalidate: () => queryClient.invalidateQueries({ queryKey }),
    refetch: () => queryClient.fetchQuery({ queryKey }),
  };
};

interface IFetchProps {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  data?: unknown;
  formData?: FormData;
  headers?: Headers;
}

export const request = async ({
  url,
  method,
  data,
  formData,
  headers,
}: IFetchProps) => {
  const body = formData || JSON.stringify(data);
  const _headers =
    headers ||
    (formData
      ? undefined
      : new Headers({ "content-type": "application/json" }));

  const res = await fetch(url, {
    method,
    body,
    headers: _headers,
  });

  const json = await res.json();

  if (!res.ok) {
    return Promise.reject({
      status: res.status,
      message: `${res.status} - ${JSON.parse(json)}`,
    });
  }

  return json;
};
