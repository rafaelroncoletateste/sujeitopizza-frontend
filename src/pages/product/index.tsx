import { useState, ChangeEvent, FormEvent } from "react";

import Head from "next/head";
import styles from "./styles.module.scss";
import { Header } from "../../components/Header";

import { canSSRAuth } from "../../utils/canSSRAuth";

import { FiUpload } from "react-icons/fi";
import { toast } from "react-toastify";

import { setupAPIClient } from "../../services/api";

type ItemProps = {
  id: string;
  name: string;
};

type CategoryProps = {
  categoryList: ItemProps[];
};

export default function Product({ categoryList }: CategoryProps) {
  const [avatarUrl, setAvatarUrl] = useState("");
  const [imageAvatar, setImageAvatar] = useState(null);

  const [categories, setCategories] = useState(categoryList || []);
  const [categorySelected, setCategorySelected] = useState(0);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) {
      return;
    }

    const image = e.target.files[0];

    setImageAvatar(image);
    setAvatarUrl(URL.createObjectURL(image));
  }

  function handleChangeCategory(e) {
    setCategorySelected(e.target.value);
  }

  async function handleRegister(e: FormEvent) {
    e.preventDefault();

    try {
      const data = new FormData();

      if (!imageAvatar || !name || !price || !description) {
        toast.error("Preencha Todos os Campos!");
        return;
      }

      data.append("name", name);
      data.append("price", price);
      data.append("description", description);
      data.append("file", imageAvatar);
      data.append("category_id", categories[categorySelected].id);

      const apiClient = setupAPIClient();
      await apiClient.post("/product", data);

      toast.success("Cadastrado com Sucesso!");

      setAvatarUrl("");
      setName("");
      setPrice("");
      setDescription("");
    } catch {
      toast.error("Erro ao Cadastrar!");
    }
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

          <form onSubmit={handleRegister} className={styles.form}>
            <label className={styles.labelAvatar}>
              {!avatarUrl && (
                <span>
                  <FiUpload size={30} color="#fff" />
                </span>
              )}

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

            <select value={categorySelected} onChange={handleChangeCategory}>
              {categories.map((item, index) => {
                return (
                  <option key={item.id} value={index}>
                    {item.name}
                  </option>
                );
              })}
            </select>

            <input
              type="text"
              placeholder="Digite o Nome do Produto"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
            />
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Digite o Preço do Produto"
              className={styles.input}
            />

            <textarea
              placeholder="Descreva seu Produto"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
  const apiClient = setupAPIClient(ctx);

  const response = await apiClient.get("/category");

  return {
    props: {
      categoryList: response.data,
    },
  };
});
