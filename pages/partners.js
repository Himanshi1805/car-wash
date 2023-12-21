import { useContext, useEffect } from "react";
import Partners from "../Components/Partners/index";
import { UserContext } from "../context/UserContext";
import Router  from "next/router";
import Layout from "../Components/Layout";

const PartnersPage = () => {

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
      <Partners />
    </Layout>
  );
};

export default PartnersPage;
