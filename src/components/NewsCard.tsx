import styles from "@/styles/NewsCard.module.css";

type Props = {};

export default function NewsCard({}: Props) {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.imageContainer}>
        <img src="https://placehold.jp/3d4070/ffffff/250x250.png" alt="" />
      </div>
      <div className={styles.detailsContainer}>
        <span>Lorem, ipsum dolor.</span>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
        <button>Details</button>
      </div>
    </div>
  );
}
