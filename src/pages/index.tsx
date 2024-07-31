import { FormEvent, useContext, useState } from "react";
import { GetServerSideProps } from "next";

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import { AuthContext } from "../contexts/AuthContext";

import logo from "../../public/logo.svg";
import styles from "../styles/home.module.scss";

import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";

import { toast } from "react-toastify";

import { canSSRGuest } from "../utils/canSSRGuest";

export default function SignUp() {
  const { signIn } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleLogin(e: FormEvent) {
    e.preventDefault();

    if (!email || !password) {
      toast.warn("Preencha os Dados Corretamente!");
      return;
    }

    setLoading(true);

    let data = {
      email,
      password,
    };

    await signIn(data);

    setLoading(false);
  }

  return (
    <>
      <Head>
        <title>Faça seu Login - Sujeito Pizzaria</title>
      </Head>
      <main className={styles.containerCenter}>
        <Image src={logo} alt="Logo Sujeito Pizzaria" />

        <div className={styles.login}>
          <form onSubmit={handleLogin}>
            <Input
              type="email"
              placeholder="Digite seu E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Digite sua Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button type="submit" loading={loading}>
              Acessar
            </Button>
          </form>

          <Link href="/signup">
            <span className={styles.text}>
              Não possui uma conta? Cadastre-se
            </span>
          </Link>
        </div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = canSSRGuest(
  async (ctx) => {
    return {
      props: {},
    };
  }
);
