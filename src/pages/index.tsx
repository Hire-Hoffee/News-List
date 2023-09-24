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
  const [page, setPage] = useState(2);

  const { ref, inView, entry } = useInView({});

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
      <div className={styles.gridContainer}>
        {newsData.map((item) => {
          return (
            <NewsCard
              fields={item?.fields}
              webTitle={item?.webTitle}
              webPublicationDate={item?.webPublicationDate}
              key={item?.id}
            />
          );
        })}
        {newsData ? <div ref={ref}></div> : ""}
      </div>
    </main>
  );
}
