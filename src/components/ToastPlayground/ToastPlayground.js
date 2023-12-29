import React from "react";

import Button from "../Button";
import ToastShelf from "../ToastShelf";

import styles from "./ToastPlayground.module.css";
import { ToastContext } from "../ToastProvider";

const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];

const INITIAL_FORM_STATE = {
  message: "",
  selectedVariant: VARIANT_OPTIONS[0],
};

function ToastPlayground() {
  const [{ message, selectedVariant }, setFormState] =
    React.useState(INITIAL_FORM_STATE);
  const { addToast } = React.useContext(ToastContext);

  // Helper functions for dealing with the form state
  const setMessage = React.useCallback((m) => {
    setFormState((s) => ({ ...s, message: m }));
  }, []);
  const setSelectedVariant = React.useCallback((v) => {
    setFormState((s) => ({ ...s, selectedVariant: v }));
  }, []);
  const resetState = React.useCallback(
    () => setFormState(INITIAL_FORM_STATE),
    []
  );

  const popToast = React.useCallback((evt) => {
    evt.preventDefault();
    if(!message.trim()) {
      return;
    }
    addToast(message, selectedVariant);
    resetState();
  }, [addToast, message, resetState, selectedVariant]);

  return (
    <form onSubmit={popToast}>
      <div className={styles.wrapper}>
        <header>
          <img alt="Cute toast mascot" src="/toast.png" />
          <h1>Toast Playground</h1>
        </header>
        <ToastShelf />
        <div className={styles.controlsWrapper}>
          <div className={styles.row}>
            <label
              htmlFor="message"
              className={styles.label}
              style={{ alignSelf: "baseline" }}
            >
              Message
            </label>
            <div className={styles.inputWrapper}>
              <textarea
                id="message"
                className={styles.messageInput}
                value={message}
                onChange={(evt) => setMessage(evt.target.value)}
              />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.label}>Variant</div>
            <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
              {VARIANT_OPTIONS.map((name) => {
                const id = `variant-${name}`;
                return (
                  <label htmlFor={id} key={id}>
                    <input
                      id={id}
                      type="radio"
                      name="variant"
                      value={name}
                      checked={selectedVariant === name}
                      onChange={(evt) => setSelectedVariant(evt.target.value)}
                    />
                    {name}
                  </label>
                );
              })}
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.label} />
            <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
              <Button onClick={popToast}>Pop Toast!</Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default ToastPlayground;
