import Head from "next/head";
import styles from "../styles/Home.module.css";
import Banner from "../components/banner/banner";
import NavBar from "../components/nav/navbar";


export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Necflits</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Necflits</h1>

      <NavBar username="John Doe" />

      <Banner
        title="Clifford the red dog"
        subTitle="a very cute dog"
        imgUrl="/static/clifford.webp"
      />

      {/* <Navbar />
      <Card /> */}
    </div>
  );
}