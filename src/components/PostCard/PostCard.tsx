import { Button } from "../Button/Button";
import styles from "./PostCard.module.css";
import InstrumentIcon from "../../assets/icons/instrument-icon.svg";
// import InstrumentsIcon from "../../assets/icons/instruments.svg";
import AuthorIcon from "../../assets/icons/author-icon.svg";

export type PostCardProps = {
  variant: "join" | "view";
  title: string;
  author: string;
  instrument: string;
  onClick?: () => void;
};

export function PostCard(props: PostCardProps) {
  const { variant, title, author, instrument, onClick } = props;

  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardHead}>
        <h2 className={styles.title}>{title}</h2>
      </div>

      <div className={styles.cardBody}>
        <div className={styles.cardInfoSection}>
          <div className={styles.cardInfo}>
            <img src={AuthorIcon} alt="icon" />
            <p className={styles.author}>{author}</p>
          </div>

          <div className={styles.cardInfo}>
            <img src={InstrumentIcon} alt="icon" />
            <p className={styles.instrument}> {instrument}</p>
          </div>
        </div>

        {/* <img src={InstrumentsIcon} alt="icon" /> */}
      </div>

      {variant === "join" && (
        <div className={styles.cta}>
          <Button variant="secondary" size="auto" onClick={onClick}>
            Join
          </Button>
        </div>
      )}
    </div>
  );
}
