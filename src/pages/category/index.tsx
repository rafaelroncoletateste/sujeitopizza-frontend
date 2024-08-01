import { FormEvent, useState } from "react";
import Head from "next/head";

import { Header } from "../../components/Header";
import styles from "./styles.module.scss";

export default function Category() {
  const [name, setName] = useState("");

  async function handleRegister(e: FormEvent) {
    e.preventDefault();
  }

  return (
    <>
      <Head>
        <title>Nova Categoria - Sujeito Pizzaria</title>
      </Head>
      <div>
        <Header />

        <main className={styles.container}>
          <h1>Cadastrar categorias</h1>

          <form onSubmit={handleRegister} className={styles.form}>
            <input
              type="text"
              placeholder="Digite o Nome da Categoria"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
            />

            <button type="submit" className={styles.buttonAdd}>
              Cadastrar
            </button>
          </form>
        </main>
      </div>
    </>
  );
}
