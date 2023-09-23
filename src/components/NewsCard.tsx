import styles from "@/styles/NewsCard.module.css";
import { OneNewsDataType } from "@/types/newsTypes";

export default function NewsCard({
  fields,
  webTitle,
  webPublicationDate,
}: Partial<OneNewsDataType>) {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.imageContainer}>
        <img src={fields?.thumbnail} alt="" />
      </div>
      <div className={styles.detailsContainer}>
        <span>{new Date(webPublicationDate!).toLocaleString()}</span>
        <p>{webTitle}</p>
        <button>Details</button>
      </div>
    </div>
  );
}
