import { FormEvent, useState } from "react";
import Head from "next/head";

import { Header } from "../../components/Header";
import styles from "./styles.module.scss";
import { toast } from "react-toastify";

import { setupAPIClient } from "../../services/api";

import { canSSRAuth } from "../../utils/canSSRAuth";

export default function Category() {
  const [name, setName] = useState("");

  async function handleRegister(e: FormEvent) {
    e.preventDefault();

    if (!name) {
      toast.error("Preencha Todos os Campos!");
      return;
    }

    const apiClient = setupAPIClient();
    await apiClient.post("/category", {
      name: name,
    });

    toast.success("Criado com Sucesso!");
    setName("");
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

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {},
  };
});
