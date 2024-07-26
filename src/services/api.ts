import axios, { AxiosError } from "axios";
import { parseCookies } from "nookies";
import { AuthTokenError } from "./errors/AuthTokenError";

import { signOut } from "../contexts/AuthContext";

export function setupAPIClient(ctx = undefined) {
  let cookies = parseCookies(ctx);

  const api = axios.create({
    baseURL: "http://localhost:3333",
    headers: {
      Authorization: `Bearer ${cookies["@nextauth.token"]}`,
    },
  });

  // Middleware
  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (err: AxiosError) => {
      if (err.response.status === 401) {
        // Não Autorizado
        signOut();

        if (typeof window !== undefined) {
        } else {
          return Promise.reject(new AuthTokenError());
        }
      }

      return Promise.reject(err);
    }
  );

  return api;
}
