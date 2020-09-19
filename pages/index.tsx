import Head from 'next/head'
import styles from '../styles/Home.module.css'

function Home(props) {
  const link = props.link;
  console.log({ link: props.link });
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
        <div>
          <img src="/assets/algolia-blue-mark.svg" alt="algolia-blue-mark"/>
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
