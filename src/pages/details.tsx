import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import type { OneNewsDataType } from "@/types/newsTypes";

export default function NewsDetailsPage({
  result,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const data = result.response.content;
  console.log(data);

  return <div></div>;
}

export const getServerSideProps = (async ({ query }) => {
  const URL = `https://content.guardianapis.com/${query.id}?`;
  const searchParams = new URLSearchParams({
    "api-key": "a16af744-449d-4a89-86de-2a2118d3a7a0",
    "show-fields": "main,body,thumbnail,headline,wordcount",
  });

  const response = await fetch(URL + searchParams);
  const result: { response: { content: OneNewsDataType } } =
    await response.json();

  return { props: { result } };
}) satisfies GetServerSideProps;
