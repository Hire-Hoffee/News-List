import styles from "@/styles/NewsCard.module.css";
import { OneNewsDataType } from "@/types/newsTypes";
import { useRouter } from "next/router";

export default function NewsCard({
  fields,
  webTitle,
  webPublicationDate,
  id,
}: Partial<OneNewsDataType>) {
  const router = useRouter();

  return (
    <div
      className={styles.mainContainer}
      onClick={() => router.push("/details?id=" + id)}
    >
      <div className={styles.imageContainer}>
        <img src={fields?.thumbnail} alt="" />
      </div>
      <div className={styles.detailsContainer}>
        <span>{new Date(webPublicationDate!).toLocaleString()}</span>
        <p>{webTitle}</p>
        <button onClick={() => router.push("/details?id=" + id)}>
          Details
        </button>
      </div>
    </div>
  );
}
