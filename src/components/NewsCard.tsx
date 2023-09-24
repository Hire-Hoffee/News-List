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
          <span>Details</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="20"
          >
            <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
