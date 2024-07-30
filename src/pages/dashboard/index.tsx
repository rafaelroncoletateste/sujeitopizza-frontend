import { GetServerSideProps } from "next";

import styles from "./styles.module.scss";

import { canSSRAuth } from "../../utils/canSSRAuth";

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = canSSRAuth(
  async (ctx) => {
    return {
      props: {},
    };
  }
);
