import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useState, useEffect, useRef } from "react";
import algoliasearch from 'algoliasearch';
import debounce from 'lodash.debounce';

function Home(props) {
  const [searchInputValue, setSearchInputValue] = useState(""); 
  const [index, setIndex] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const client = algoliasearch('NSJ5JLKUGR', 'dee646598d711bfc8ca326b526bd40f9');
    const index = client.initIndex('dev_search');
    setIndex(index);
  }, []) 

  const link = props.link;
  console.log({ link: props.link });

  const search = useRef(
    debounce((query: string, index) => {
      index.search(`${query}`, {
        attributesToRetrieve: ['name'],
        hitsPerPage: 50,
      }).then(({ hits }) => {
        console.log(hits);
        setSearchResults(hits);
      });
  }, 2000, { trailing: true, leading: false })
  ).current;

  const onSearchValueChange = (e) => {
    const value = e.target.value;
    setSearchInputValue(value);
    search(value, index);
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
        <ul>

        </ul>
        {
          searchResults.map((result) => (
            <li key={result.name}>{`name: ${result.name}`}</li>
          ))
        }
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
