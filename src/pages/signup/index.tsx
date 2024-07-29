import { FormEvent, useState } from "react";

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import logo from "../../../public/logo.svg";
import styles from "../../styles/home.module.scss";

import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleSignUp(e: FormEvent) {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Preencha os Dados Corretamente!");
      return;
    }

    setLoading(true);
  }

  return (
    <>
      <Head>
        <title>SujeitoPizza - Faça seu Cadastro</title>
      </Head>
      <main className={styles.containerCenter}>
        <Image src={logo} alt="Logo Sujeito Pizzaria" />

        <div className={styles.login}>
          <h1>Criando sua Conta</h1>

          <form onSubmit={handleSignUp}>
            <Input
              type="text"
              placeholder="Digite seu Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              type="email"
              placeholder="Digite seu E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Digite seu Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button type="submit" loading={loading}>
              Cadastrar
            </Button>
          </form>

          <Link href="/">
            <span className={styles.text}>Já possui uma conta? Faça Login</span>
          </Link>
        </div>
      </main>
    </>
  );
}
