import styles from "./EnsembleCard.module.css";
// import InstrumentIcon from "../../assets/icons/instruments.svg";

export type EnsembleCardProps = {
  title: string;
  description: string;
};

export function EnsembleCard(props: EnsembleCardProps) {
  const { title, description } = props;

  return (
    <div className={styles.ensembleCard}>
      <div className={styles.cardHead}>
        <h2 className={styles.title}>{title}</h2>
        {/* <img src={InstrumentIcon} alt="icon" /> */}
      </div>
      <p className={styles.description}>{description}</p>
    </div>
  );
}
