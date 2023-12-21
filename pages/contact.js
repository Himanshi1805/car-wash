import { useContext, useEffect } from "react";
import Contact from "../Components/Contact/index";
import { UserContext } from "../context/UserContext";
import Router  from "next/router";
import Layout from "../Components/Layout";

const ContactPage = () => {

  
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
      <Contact />
    </Layout>
  );
};

export default ContactPage;
