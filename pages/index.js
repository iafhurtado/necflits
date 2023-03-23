import Head from "next/head";
import styles from "../styles/Home.module.css";
import Banner from "../components/banner/banner";
import NavBar from "../components/nav/navbar";
import Card from "../components/card/card";
import SectionCards from "@/components/card/section-cards";
import { getVideos } from "@/lib/videos";


export default function Home() {
  const disneyVideos = getVideos();
  return (
    <div className={styles.container}>
      <Head>
        <title>Necflits</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <NavBar username="John Doe" />

      <Banner
        title="Clifford the red dog"
        subTitle="a very cute dog"
        imgUrl="/static/clifford.webp"
      />

      <div className={styles.sectionWrapper}>
        <SectionCards title="Disney" videos={disneyVideos} size="large" />
        <SectionCards title="Disney" videos={disneyVideos} size="medium" />
      </div>
      

      {/* <Navbar />
      <Card /> */}
    </div>
  );
}