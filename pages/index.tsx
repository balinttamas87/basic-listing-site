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
        <link href={link}>{link}</link>
      </Head>

      <main className={styles.main}>
        <h2 className={styles.title}>
          Welcome to Test branch 2 <a href="https://nextjs.org">Next.js!</a>
        </h2>
      </main>
    </div>
  )
}

Home.getServerSideProps = async (ctx) => {
  // const res = await fetch('https://api.github.com/repos/vercel/next.js')
  // const json = await res.json()
  const link = process.env.LINK;
  return { link }
}

export default Home;
