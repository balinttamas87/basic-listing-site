import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useState } from "react";

function Home(props) {
  const link = props.link;
  console.log({ link: props.link });

  const [searchInputValue, setSearchInputValue] = useState(""); 

  const onSearchValueChange = (e) => {
    setSearchInputValue(e.target.value);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h2 className={styles.title}>
          Search user
        </h2>
        <div className={styles["search-wrapper"]} style={{ display: "flex" }}>
          <img src="/assets/algolia-blue-mark.svg" alt="algolia-blue-mark"/>
          <input className={styles["search-input"]}type="text" value={searchInputValue} onChange={onSearchValueChange}/>
        </div>
      </main>
      <a href={link}>{link}</a>
    </div>
  )
}

export async function getServerSideProps(context) {
  const link = process.env.LINK;
  return {
    props: { link }, // will be passed to the page component as props
  }
}


export default Home;
