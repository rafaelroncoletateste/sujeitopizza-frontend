import { FormEvent, useContext } from "react";

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import { AuthContext } from "../contexts/AuthContext";

import logo from "../../public/logo.svg";
import styles from "../styles/home.module.scss";

import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";

export default function SignUp() {
  const { signIn } = useContext(AuthContext);

  async function handleLogin(e: FormEvent) {
    e.preventDefault();

    let data = {
      email: "email@teste.com",
      password: "teste123",
    };

    await signIn(data);
  }

  return (
    <>
      <Head>
        <title>SujeitoPizza - Faça seu Login</title>
      </Head>
      <main className={styles.containerCenter}>
        <Image src={logo} alt="Logo Sujeito Pizzaria" />

        <div className={styles.login}>
          <form onSubmit={handleLogin}>
            <Input type="text" placeholder="Digite seu E-mail" />
            <Input type="password" placeholder="Digite seu Senha" />

            <Button type="button" loading={false}>
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
