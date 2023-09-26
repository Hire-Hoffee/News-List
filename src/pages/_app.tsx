import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { store } from "@/store";
import { Provider } from "react-redux";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Loading from "@/components/Loading";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [isLoading, setData] = useState(false);

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setData(true);
    });
    router.events.on("routeChangeComplete", () => {
      setData(false);
    });
  }, []);

  return (
    <>
      <Head>
        <title>News List App</title>
        <meta name="description" content="Application for reading news" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Provider store={store}>
        {isLoading ? <Loading /> : <Component {...pageProps} />}
      </Provider>
    </>
  );
}
