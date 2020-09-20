import useRouter from "next/router";
import Link from "next/link";

function Home(props) {
  return (
    <>
      <h1>Home page</h1>
      <Link href="/search">Click here to navigate to Search page `{'-->'}</Link>
    </>
  );
};

export default Home;
