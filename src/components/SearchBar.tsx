import styles from "@/styles/SearchBar.module.css";

type Props = {};

export default function SearchBar({}: Props) {
  return (
    <div className={styles.mainContainer}>
      <form>
        <div className={styles.searchInputDiv}>
          <input type="text" placeholder="Search..." />
          <button>Find</button>
        </div>
        <div className={styles.searchOptionsDiv}>
          <select name="" id="">
            <option value="">Sort by</option>
            <option value=""></option>
          </select>
          <select name="" id="">
            <option value="">Items on page</option>
            <option value=""></option>
          </select>
        </div>
      </form>
    </div>
  );
}
