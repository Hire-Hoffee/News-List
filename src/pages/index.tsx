import { Inter } from "next/font/google";
import styles from "@/styles/MainPage.module.css";
import NewsCard from "@/components/NewsCard";

import SearchBar from "@/components/SearchBar";

const inter = Inter({ subsets: ["latin"] });

export default function MainPage() {
  return (
    <main className={`${inter.className} ${styles.main}`}>
      <SearchBar />
      <NewsCard />
    </main>
  );
}
