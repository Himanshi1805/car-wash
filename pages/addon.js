import { useContext, useEffect } from "react";
import Addon from "../Components/Addon/index"
import { UserContext } from "../context/UserContext";
import Router from 'next/router';
import Layout from "../Components/Layout";

const AddonsPage = () => {

  const context = useContext(UserContext);

  useEffect(()=>{
    redirect()
   },[context])
   

  const redirect = () => {
    if (!context.isUser?.status) {
      return Router.push("/");
    }
  }


  return (
    <Layout>
        <Addon />
    </Layout>
  );
};

export default AddonsPage ;
