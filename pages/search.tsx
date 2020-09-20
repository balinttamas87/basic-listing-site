import Head from "next/head";
import styles from "../styles/Search.module.css";
import { useState, useEffect, useRef } from "react";
import algoliasearch from "algoliasearch";
import debounce from "lodash.debounce";
import Card from "../components/Card";

function Search(props) {
  const [searchInputValue, setSearchInputValue] = useState("");
  const [index, setIndex] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const client = algoliasearch(
      "NSJ5JLKUGR",
      "dee646598d711bfc8ca326b526bd40f9"
    );
    const index = client.initIndex("dev_search");
    setIndex(index);
  }, []);

  const environment = props.environment;
  console.log({ environment});
  console.log({ hits: props.hits });

  const search = useRef(
    debounce(
      (query: string, index) => {
        index
          .search(`${query}`, {
            // attributesToRetrieve: ["name", "address.city"],
            hitsPerPage: 20,
            page: 0
          })
          .then(({ hits }) => {
            console.log(hits);
            setSearchResults(hits);
          });
      },
      2000,
      { trailing: true, leading: false }
    )
  ).current;

  const onSearchValueChange = (e) => {
    const value = e.target.value;
    setSearchInputValue(value);
    search(value, index);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h2 className={styles.title}>Search user</h2>
        <div className={styles["search-wrapper"]} style={{ display: "flex" }}>
          <img src="/assets/algolia-blue-mark.svg" alt="algolia-blue-mark" />
          <input
            className={styles["search-input"]}
            type="text"
            value={searchInputValue}
            onChange={onSearchValueChange}
          />
        </div>
{/*         <h2>Client Search Results</h2>
        <ul>
          {searchResults.map((result) => (
            <li key={result.id}>{`name: ${JSON.stringify(
              result,
              null,
              2
            )}`}</li>
          ))}
        </ul> */}
        <h2>Server Search Results</h2>
        {<ul>
          {props.hits.map((result) => (
            <li key={result.id} className={`${styles.card} ${styles.li}`}>
              <Card user={result} />
            </li> 
          ))}
        </ul>}
      </main>
        <p style={{ color: "#0070f3", fontSize: "20px", fontWeight: "bold" }}>{props.environment}</p>
    </div>
  );
}

export async function getServerSideProps(context) {
  const environment = process.env.ENVIRONMENT;

  const client = algoliasearch(
    "NSJ5JLKUGR",
    "dee646598d711bfc8ca326b526bd40f9"
  );
  const index = client.initIndex("dev_search");

  const res = await index.search("", {
    // attributesToRetrieve: ["name", "address.city"],
    hitsPerPage: 20,
    page: 0
  });

  const { hits } = res;
  console.log({ besthits: hits });

  return {
    props: { environment, hits }, // will be passed to the page component as props
  };
}

export default Search;
