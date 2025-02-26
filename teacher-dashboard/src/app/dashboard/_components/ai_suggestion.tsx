import React from "react";
import styles from "./ai_suggestion.module.css";

type AiProps = {
  textSuggestion: string;
};

export default function AiSuggestion({ textSuggestion }: AiProps) {
  return <p className={styles.text}>{textSuggestion}</p>;
}
