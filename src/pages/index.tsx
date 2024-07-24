import Head from "next/head";
import Image from "next/image";

import logo from "../../public/logo.svg";
import styles from "../styles/home.module.scss";

import { Input } from "../components/ui/Input";

export default function Home() {
  return (
    <>
      <Head>
        <title>SujeitoPizza - Faça seu Login</title>
      </Head>
      <main className={styles.containerCenter}>
        <Image src={logo} alt="Logo Sujeito Pizzaria" />

        <div className={styles.login}>
          <form>
            <Input type="text" placeholder="Digite seu E-mail" />
            <Input type="password" placeholder="Digite seu Senha" />
          </form>
        </div>
      </main>
    </>
  );
}
