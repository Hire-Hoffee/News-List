import styles from "@/styles/SearchBar.module.css";

import { useAppDispatch } from "@/store/hooks";
import {
  changeKeywordState,
  changePageSizeState,
  changeOrderByState,
} from "@/store/newsSlice";
import { fetchNewsData } from "@/store/newsSlice";
import React, { useState } from "react";

type Props = {};

export default function SearchBar({}: Props) {
  const [text, setText] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [sortBy, setSortBy] = useState("newest");
  const dispatch = useAppDispatch();

  const handleChangePageLength = (event: any) => {
    setPageSize(event.currentTarget.value);
    dispatch(changePageSizeState(event.currentTarget.value));
  };

  const handleSortBy = (event: any) => {
    const value = event.currentTarget.value;

    setSortBy(value);
    dispatch(changeOrderByState(value));
    dispatch(fetchNewsData({ keyWord: text, pageSize, orderBy: value }));
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
          <select value={sortBy} onChange={handleSortBy}>
            <option disabled value="">
              Sort by
            </option>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="relevance">Relevance</option>
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
