import type { AxiosRequestConfig } from "axios";

export const authRequestConfig = (token: string | null): AxiosRequestConfig | undefined => {
  if (!token) return undefined;

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
