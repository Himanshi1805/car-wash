import { useContext, useEffect } from "react";
import Pincode from "../Components/Pincode/index";
import { UserContext } from "../context/UserContext";
import Router  from "next/router";
import Layout from "../Components/Layout";


const PincodePage = () => {

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
       <Pincode />
    </Layout>
  );
};

export default PincodePage;
