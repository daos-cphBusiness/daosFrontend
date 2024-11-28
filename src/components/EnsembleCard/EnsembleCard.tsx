import { Button } from "../Button/Button";
import styles from "./EnsembleCard.module.css";
// import InstrumentIcon from "../../assets/icons/instruments.svg";

export type EnsembleCardProps = {
  title: string;
  description: string;
  onClick: () => void;
};

export function EnsembleCard(props: EnsembleCardProps) {
  const { title, description, onClick } = props;

  return (
    <div className={styles.ensembleCard}>
      <div className={styles.cardHead}>
        <h2 className={styles.title}>{title}</h2>
        {/* <img src={InstrumentIcon} alt="icon" /> */}
      </div>
      <p className={styles.description}>{description}</p>
      <div className={styles.cta}>
        <Button variant="secondary" size="auto" onClick={onClick}>
          Join
        </Button>
      </div>
    </div>
  );
}
