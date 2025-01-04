import styles from "./UserCard.module.css";
import AuthorIcon from "../../assets/icons/author-icon.svg";
import { Instrument } from "../../types/global";

export type UserCardProps = {
  title: string | undefined;
  instruments: Instrument[] | undefined;
};

export function UserCard(props: UserCardProps) {
  const { title, instruments } = props;

  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardHead}>
        <img src={AuthorIcon} alt="icon" />
        <h2 className={styles.title}>{title}</h2>
      </div>
      <div className={styles.cardBody}>
        <ul>
          {instruments?.map((instrument, index) => (
            <li key={index}>{instrument.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
