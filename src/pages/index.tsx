import { Inter } from "next/font/google";
import styles from "@/styles/MainPage.module.css";

import { useEffect } from "react";

import NewsCard from "@/components/NewsCard";
import SearchBar from "@/components/SearchBar";

import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { fetchNewsData } from "@/store/newsSlice";

const inter = Inter({ subsets: ["latin"] });

export default function MainPage() {
  const dispatch = useAppDispatch();
  const newsData = useAppSelector((state) => state.newsData.news);

  useEffect(() => {
    dispatch(fetchNewsData({}));
  }, []);

  return (
    <main className={`${inter.className} ${styles.main}`}>
      <SearchBar />
      <div className={styles.gridContainer}>
        {newsData.response?.results.map((item) => {
          return (
            <NewsCard
              fields={item.fields}
              webTitle={item.webTitle}
              webPublicationDate={item.webPublicationDate}
              key={item.id}
            />
          );
        })}
      </div>
    </main>
  );
}
