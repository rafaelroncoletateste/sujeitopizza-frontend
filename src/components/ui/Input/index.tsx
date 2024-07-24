import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

import styles from "./styles.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}
interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function Input({ ...rest }: InputProps) {
  return <input {...rest} className={styles.inputs} />;
}

export function TextArea({ ...rest }: TextAreaProps) {
  return <textarea {...rest} className={styles.inputs} />;
}
