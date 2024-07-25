import { FormEvent, useContext, useState } from "react";

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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleLogin(e: FormEvent) {
    e.preventDefault();

    let data = {
      email,
      password,
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
            <Input
              type="text"
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

            <Button type="button" loading={loading}>
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
