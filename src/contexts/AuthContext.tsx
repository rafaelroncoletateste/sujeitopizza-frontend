import { createContext, ReactNode, useState } from "react";
import { destroyCookie, setCookie, parseCookies } from "nookies";
import { api } from "../services/apiClient";
import Router from "next/router";

import { toast } from "react-toastify";

interface UserProps {
  id: string;
  name: string;
  email: string;
}

type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  signUp: (credentials: SignUpProps) => Promise<void>;
  signOut: () => void;
};

type SignInProps = {
  email: string;
  password: string;
};

type SignUpProps = {
  name: string;
  email: string;
  password: string;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export function signOut() {
  try {
    destroyCookie(undefined, "@nextauth.token");

    Router.push("/");
  } catch {
    toast.error("Erro ao Deslogar");
  }
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>();
  const isAuthenticated = !!user;

  async function signIn({ email, password }: SignInProps) {
    try {
      const response = await api.post("/session", {
        email,
        password,
      });
      const { id, name, token } = response.data;

      setCookie(undefined, "@nextauth.token", token, {
        maxAge: 60 * 60 * 24 * 30, // 1 Mês
        path: "/", // Quais rotas terão acesso ao cookie (todas)
      });

      setUser({
        id,
        name,
        email,
      });

      // Passar o token para as próximas requisições
      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      toast.success("Logado com Sucesso!");

      Router.push("/dashboard");
    } catch {
      toast.error("Erro ao Acessar!");
    }
  }

  async function signUp({ name, email, password }: SignUpProps) {
    try {
      api.post("/users", {
        name,
        email,
        password,
      });

      toast.success("Cadastrado com Sucesso");
      Router.push("/");
    } catch {
      toast.error("Erro ao Cadastrar");
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, signIn, signOut, signUp }}
    >
      {children}
    </AuthContext.Provider>
  );
}
