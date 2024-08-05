import Modal from "react-modal";
import styles from "./styles.module.scss";

import { FiX } from "react-icons/fi";
import { OrderItemProps } from "../../pages/dashboard";

interface ModalOrderProps {
  isOpen: boolean;
  order: OrderItemProps[];
  onRequestClose: () => void;
}

export function ModalOrder({ isOpen, order, onRequestClose }: ModalOrderProps) {
  const customStyles = {
    content: {
      top: "50%",
      bottom: "auto",
      left: "50%",
      ridht: "auto",
      padding: "30px",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#1d1d2e",
    },
  };

  return (
    <Modal isOpen={isOpen} style={customStyles} onRequestClose={onRequestClose}>
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
        style={{ backgroundColor: "transparent", border: 0 }}
      >
        <FiX size={25} color="#f34748" />
      </button>

      <div className={styles.container}>
        <h2>Detalhes do Pedido</h2>
        <span className={styles.table}>
          Mesa: {order[0].order.table}
        </span>

        {order.map((item) => (
          <section key={item.id} className={styles.containerItem}>
            <span>
              {item.amount} - <strong>{item.product.name}</strong>
            </span>
            <span className={styles.description}>
              {item.product.description}
            </span>
          </section>
        ))}

        <button onClick={() => {}} className={styles.buttonOrder}>Concluir Pedido</button>
      </div>
    </Modal>
  );
}
