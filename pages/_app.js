import { useState,useEffect } from "react";
import Head from "next/head";
import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from "react-toastify";
import { UserContext } from "../context/UserContext";
import {
  onAuthStateChanged,
  getAuth
} from "firebase/auth";

function MyApp({ Component, pageProps }) {
  const auth = getAuth();
  const [isUser, setIsUser] = useState(null);
  const [excelData, setExcelData] = useState(null)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsUser({status:true, user: user});
      }
    });
  }, []);


 return(
  <>
   <Head>
      <title>Urban Car Wash Admin</title>
      <link rel="icon" href="/favicon.ico" />
   </Head>
  <UserContext.Provider value={{isUser, setIsUser, excelData, setExcelData}}>
   <ToastContainer
     position="top-right"
     autoClose={false}
     newestOnTop={false}
     closeOnClick
     rtl={false}
     pauseOnFocusLoss
     draggable
   />
    <Component {...pageProps} />
    </UserContext.Provider>
  </>
 )
}
export default MyApp
