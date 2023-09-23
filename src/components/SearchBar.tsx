import styles from "@/styles/SearchBar.module.css";

import { useAppDispatch } from "@/store/hooks";
import { fetchNewsData } from "@/store/newsSlice";
import React, { useState } from "react";

type Props = {};

export default function SearchBar({}: Props) {
  const [text, setText] = useState("");
  const dispatch = useAppDispatch();

  const fetchData = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(fetchNewsData({ keyWord: text }));
  };

  return (
    <div className={styles.mainContainer}>
      <form>
        <div className={styles.searchInputDiv}>
          <input
            value={text}
            onChange={(e) => setText(e.currentTarget.value)}
            type="text"
            placeholder="Search..."
          />
          <button onClick={fetchData}>Find</button>
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
