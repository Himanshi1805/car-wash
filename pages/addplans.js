import { useContext, useEffect } from "react";
import Addplans from "../Components/Addplans/index";
import { UserContext } from "../context/UserContext";
import Router  from "next/router";
import Layout from "../Components/Layout";

const AddplansPage  = () => {

  const context = useContext(UserContext);

  useEffect(() => {
    redirect()
  },[context])
   

  const redirect = () => {
    if (!context.isUser?.status) {
      return Router.push("/");
    }
  }

  return (
    <Layout>
       <Addplans />
    </Layout>
  );
};

export default AddplansPage;
