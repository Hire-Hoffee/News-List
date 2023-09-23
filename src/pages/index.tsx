import { Inter } from "next/font/google";
import styles from "@/styles/MainPage.module.css";

import SearchBar from "@/components/SearchBar";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={`${inter.className} ${styles.main}`}>
      <SearchBar />
    </main>
  );
}
