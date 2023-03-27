import Head from "next/head";
import styles from "../styles/Home.module.css";
import Banner from "../components/banner/banner";
import NavBar from "../components/nav/navbar";
import Card from "../components/card/card";
import SectionCards from "../components/card/section-cards";
import { getPopularVideos, getVideos } from "../lib/videos";
import { magic } from "../lib/magic-client";
import { startFetchMyQuery } from "../lib/db/hasura";

export async function getServerSideProps(context) {
  const disneyVideos = await getVideos("chillhop");
  const productivityVideos = await getVideos("Coding music");

  const travelVideos = await getVideos("jazzfunk");
  const popularVideos = await getPopularVideos();

  return {
    props: { disneyVideos, travelVideos, productivityVideos, popularVideos },
  };
}

export default function Home({
  disneyVideos,
  travelVideos,
  productivityVideos,
  popularVideos,
}) {
  startFetchMyQuery();
  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.main}>
        <NavBar />
        <Banner
          title="LoFi Girl"
          description="Chillhop is a music label dedicated to releasing the best lofi hip hop music for studying, relaxing, and working."
          imgUrl="https://i.ytimg.com/vi/5qap5aO4i9A/maxresdefault.jpg"
          videoId="5qap5aO4i9A"
        />
        <div className={styles.sectionWrapper}>
          <SectionCards title="Chillhop Greatest Hits" videos={disneyVideos} size="large" />
          <SectionCards title="Jazz Funk Section" videos={travelVideos} size="small" />
          <SectionCards
            title="More LoFi"
            videos={productivityVideos}
            size="medium"
          />
          <SectionCards title="Popular" videos={popularVideos} size="small" />
        </div>
      </div>
    </div>
  );
}