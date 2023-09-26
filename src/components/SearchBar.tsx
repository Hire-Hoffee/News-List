import styles from "@/styles/SearchBar.module.css";

import { useAppDispatch } from "@/store/hooks";
import {
  changeKeywordState,
  changePageSizeState,
  changeOrderByState,
  changeLangState,
} from "@/store/newsSlice";
import { fetchNewsData } from "@/store/newsSlice";
import React, { useState } from "react";

type Props = {};

export default function SearchBar({}: Props) {
  const [keyWord, setKeyWord] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [orderBy, setOrderBy] = useState("newest");
  const [lang, setLang] = useState("en");
  const dispatch = useAppDispatch();

  const handleChangePageLength = (event: any) => {
    const value = event.currentTarget.value;
    setPageSize(value);
    dispatch(changePageSizeState(value));
    dispatch(fetchNewsData({ keyWord, orderBy, lang, pageSize: value }));
  };

  const handleNewsLang = (event: any) => {
    const value = event.currentTarget.value;
    setLang(value);
    dispatch(changeLangState(value));
    dispatch(fetchNewsData({ keyWord, pageSize, orderBy, lang: value }));
  };

  const handleOrderBy = (event: any) => {
    const value = event.currentTarget.value;
    setOrderBy(value);
    dispatch(changeOrderByState(value));
    dispatch(fetchNewsData({ keyWord, pageSize, lang, orderBy: value }));
  };

  const fetchData = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(fetchNewsData({ keyWord, pageSize, lang, orderBy }));
    dispatch(changeKeywordState(keyWord));
  };

  return (
    <div className={styles.mainContainer}>
      <form>
        <div className={styles.searchInputDiv}>
          <input
            value={keyWord}
            onChange={(e) => setKeyWord(e.currentTarget.value)}
            type="text"
            placeholder="Search..."
          />
          <button onClick={fetchData}>Find</button>
        </div>
        <div className={styles.searchOptionsDiv}>
          <div>
            <label htmlFor="orderBy">Sort news by:</label>
            <select id="orderBy" value={orderBy} onChange={handleOrderBy}>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="relevance">Relevance</option>
            </select>
          </div>

          <div>
            <label htmlFor="pageSize">News by page:</label>
            <select
              id="pageSize"
              value={pageSize}
              onChange={handleChangePageLength}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>

          <div>
            <label htmlFor="newsLang">News lang:</label>
            <select id="newsLang" value={lang} onChange={handleNewsLang}>
              <option value="en">English</option>
              <option value="ru">Russian</option>
              <option value="de">German</option>
            </select>
          </div>
        </div>
      </form>
    </div>
  );
}
