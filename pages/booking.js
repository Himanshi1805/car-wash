import { useContext, useEffect } from "react";
import Booking from "../Components/Booking/index";
import { UserContext } from "../context/UserContext";
import Router  from "next/router";
import Layout from "../Components/Layout";

const Admin = () => {

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
      <Booking/>
    </Layout>
  );
};

export default Admin;
