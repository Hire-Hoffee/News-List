import { Inter } from "next/font/google";
import styles from "@/styles/MainPage.module.css";

import { useEffect, useState } from "react";

import NewsCard from "@/components/NewsCard";
import SearchBar from "@/components/SearchBar";

import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { fetchNewsData } from "@/store/newsSlice";

import { useInView } from "react-intersection-observer";

const inter = Inter({ subsets: ["latin"] });

export default function MainPage() {
  const dispatch = useAppDispatch();
  const newsData = useAppSelector((state) => state.newsData.news);
  const keyWord = useAppSelector((state) => state.newsData.keyWord);
  const pageSize = useAppSelector((state) => state.newsData.pageSize);
  const orderBy = useAppSelector((state) => state.newsData.orderBy);
  const isLoadingData = useAppSelector((state) => state.newsData.isLoadingData);
  const [page, setPage] = useState(2);

  const { ref, inView, entry } = useInView({ threshold: 1 });

  useEffect(() => {
    dispatch(fetchNewsData({}));
  }, []);

  useEffect(() => {
    if (inView) {
      dispatch(fetchNewsData({ page, keyWord, pageSize, orderBy }));
      setPage(page + 1);
    }
  }, [inView, entry]);

  return (
    <main className={`${inter.className} ${styles.main}`}>
      <SearchBar />
      {!isLoadingData ? (
        <div className={styles.gridContainer}>
          {newsData.map((item) => {
            return (
              <NewsCard
                fields={item?.fields}
                webTitle={item?.webTitle}
                webPublicationDate={item?.webPublicationDate}
                id={item?.id}
                key={item?.id}
              />
            );
          })}
          {newsData ? <div ref={ref}></div> : ""}
        </div>
      ) : (
        <div className={styles.spinnerContainer}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
            className={styles.loadingSpinner}
          >
            <path d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-155.5t86-127Q252-817 325-848.5T480-880q17 0 28.5 11.5T520-840q0 17-11.5 28.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-17 11.5-28.5T840-520q17 0 28.5 11.5T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480-80Z" />
          </svg>
        </div>
      )}
    </main>
  );
}
