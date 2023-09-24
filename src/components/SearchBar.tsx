import styles from "@/styles/SearchBar.module.css";

import { useAppDispatch } from "@/store/hooks";
import { changeKeywordState, changePageSizeState } from "@/store/newsSlice";
import { fetchNewsData } from "@/store/newsSlice";
import React, { useState } from "react";

type Props = {};

export default function SearchBar({}: Props) {
  const [text, setText] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const dispatch = useAppDispatch();

  const handleChangePageLength = (event: any) => {
    setPageSize(event.currentTarget.value);
    dispatch(changePageSizeState(event.currentTarget.value));
  };

  const fetchData = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(fetchNewsData({ keyWord: text, pageSize }));
    dispatch(changeKeywordState(text));
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

          <select value={pageSize} onChange={handleChangePageLength}>
            <option disabled value="">
              News on page
            </option>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
      </form>
    </div>
  );
}
