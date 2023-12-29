import React from "react";

import { ToastContext } from "../ToastProvider";

import Toast from "../Toast";
import styles from "./ToastShelf.module.css";

function ToastShelf() {
  const { toasts, removeToast } = React.useContext(ToastContext);
  return (
    <ol className={styles.wrapper}>
      {toasts.map(({ id, message, variant }) => (
        <li className={styles.toastWrapper} key={id}>
          <Toast variant={variant} onClose={() => removeToast(id)}>
            {message}
          </Toast>
        </li>
      ))}
    </ol>
  );
}

export default ToastShelf;
