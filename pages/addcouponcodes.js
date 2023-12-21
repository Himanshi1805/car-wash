import { useContext, useEffect } from "react";
import AddCouponCodes from "../Components/AddCouponCodes/index";
import { UserContext } from "../context/UserContext";
import Router  from "next/router";
import Layout from "../Components/Layout";

const AddCouponCodesPage  = () => {

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
      <AddCouponCodes />
    </Layout>
  );
};

export default AddCouponCodesPage;
