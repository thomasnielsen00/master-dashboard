import React from "react";
import styles from "./ai_assistant.module.css";
import AiSuggestion from "../_components/ai_suggestion";

export default function AiAssistiantSection() {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img
          className={styles.image}
          src="\AiAssistant.svg"
          alt="Ai assistant drawing"
        />
      </div>
      <div className={styles.aiContainer}>
        {/* max 4 */}
        <h3 >Råd fra din KI-assistent</h3>
        <AiSuggestion textSuggestion="Gruppe 1 må deles opp pga. konflikt" />
        <AiSuggestion textSuggestion="Gruppe 2 forstår ikke oppgaven ser det ut som" />
        <AiSuggestion textSuggestion="Ola er ikke interessert i temaet, lavt engasjement" />
        <AiSuggestion textSuggestion="Klassen har nedadgående engasjement, snart behov for pause" />
      </div>
    </div>
  );
}
