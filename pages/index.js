import Head from "next/head";
import Login from "../Components/Login";
export default function Home() {

  return (
    <>
      <Head>
        <title>Urban Car Wash Admin</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Login/>
    </>
  );
}
