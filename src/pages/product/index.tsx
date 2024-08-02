import { useState, ChangeEvent } from "react";

import Head from "next/head";
import styles from "./styles.module.scss";
import { Header } from "../../components/Header";

import { canSSRAuth } from "../../utils/canSSRAuth";

import { FiUpload } from "react-icons/fi";

export default function Product() {
  const [avatarUrl, setAvatarUrl] = useState("");
  const [imageAvatar, setImageAvatar] = useState(null);

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) {
      return;
    }

    const image = e.target.files[0];

    setImageAvatar(image);
    setAvatarUrl(URL.createObjectURL(image))
  }

  return (
    <>
      <Head>
        <title>Novo Produto - Sujeito Pizzaria</title>
      </Head>
      <div>
        <Header />
        <main className={styles.container}>
          <h1>Novo Produto</h1>

          <form className={styles.form}>
            <label className={styles.labelAvatar}>
              <span>
                <FiUpload size={30} color="#fff" />
              </span>

              <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleFile}
              />

              {avatarUrl && (
                <img
                  src={avatarUrl}
                  alt="Foto do Produto"
                  width={250}
                  height={250}
                  className={styles.preview}
                />
              )}
            </label>

            <select>
              <option>Bebidas</option>
              <option>Pizzas</option>
            </select>

            <input
              type="text"
              placeholder="Digite o Nome do Produto"
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Digite o Preço do Produto"
              className={styles.input}
            />

            <textarea placeholder="Descreva seu Produto" />

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
