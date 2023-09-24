import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import type { OneNewsDataType } from "@/types/newsTypes";

import { Inter } from "next/font/google";
import styles from "@/styles/DetailsPage.module.css";

import parse from "html-react-parser";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function NewsDetailsPage({
  result,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const data = result.response.content;
  const router = useRouter();

  return (
    <div className={`${inter.className} ${styles.mainContainer}`}>
      <header className={styles.head}>
        <h1>{data.fields.headline}</h1>
        <div className={styles.newsMetadata}>
          <div className={styles.newsPublicTime}>
            <i>
              {"First publication: " +
                new Date(data.fields.firstPublicationDate).toLocaleString()}
            </i>
            <i>
              {"Last modified: " +
                new Date(data.fields.lastModified).toLocaleString()}
            </i>
          </div>
          <div className={styles.externalLinkDiv}>
            <a href={data.fields.shortUrl} target="_blank">
              Read on Guardian
            </a>
            <i>Words: {data.fields.wordcount}</i>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <img src={data.fields.thumbnail} alt="" />
        </div>
      </header>
      <main className={styles.mainContent}>{parse(data.fields.body)}</main>
      <footer className={styles.footer}>
        <button onClick={() => router.push("/")}>Back to main page</button>
      </footer>
    </div>
  );
}

export const getServerSideProps = (async ({ query }) => {
  const URL = `https://content.guardianapis.com/${query.id}?`;
  const searchParams = new URLSearchParams({
    "api-key": "a16af744-449d-4a89-86de-2a2118d3a7a0",
    "show-fields":
      "body,thumbnail,headline,wordcount,firstPublicationDate,lastModified,shortUrl",
  });

  const response = await fetch(URL + searchParams);
  const result: { response: { content: OneNewsDataType } } =
    await response.json();

  return { props: { result } };
}) satisfies GetServerSideProps;
