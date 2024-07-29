import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import logo from "../../../public/logo.svg";
import styles from "../../styles/home.module.scss";

import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";

export default function Home() {
  return (
    <>
      <Head>
        <title>SujeitoPizza - Faça seu Cadastro</title>
      </Head>
      <main className={styles.containerCenter}>
        <Image src={logo} alt="Logo Sujeito Pizzaria" />

        <div className={styles.login}>
          <h1>Criando sua Conta</h1>

          <form>
            <Input type="text" placeholder="Digite seu Nome" />
            <Input type="email" placeholder="Digite seu E-mail" />
            <Input type="password" placeholder="Digite seu Senha" />

            <Button type="submit" loading={false}>
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
