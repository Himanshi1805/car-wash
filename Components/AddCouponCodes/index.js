import React, { useState, useEffect, Fragment } from "react";
import { BsPlusLg } from "react-icons/bs";
import AddplansModal from "./Modal";
import { deleteDocument } from "../../utils/api"
import { modelName } from "../../utils/collections";
import { modalConfig } from "../config/model";
import {
  collection,
  query,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { db } from "../../config/firebase";

const { COUPON } = modelName;

const AddPlans = () => {
  const [isModal, setIsModal] = useState(false);
  const [openId, setOpenId] = useState("1");
  const [coupons, setCoupons] = useState([])
  const [modalState, setModalState] = useState("");
  
  const toggleDetails = (id) => {
    openId == id ? setOpenId("") : setOpenId(id);
  };

  const getCouponData = async () => {
    const q = query(collection(db, COUPON),orderBy("timestamp", "desc"));
    await onSnapshot(q, (querySnapshot) => {
      const arr = [];
      querySnapshot.forEach((doc) => {
        arr.push(...coupons,{
         ...doc.data(),
          id: doc.id
        })
      })
      setCoupons(arr)
    });
  };

  useEffect(() => {
    getCouponData()
  }, [])

  const deleteCoupon = async (id, name) => {
    const confirmModal = window.confirm(`Are you sure you want to delete ${name}?`);
    if (!confirmModal) return;
    let dlt = await deleteDocument(modelName.COUPON, id);
  }
  
  useEffect(() => {
    if (
      modalState === modalConfig.MODEL_DESTROYED ||
      modalState === modalConfig.MODEL_DONE
    ) {
      setIsModal(false);
    }
  }, [modalState]);

  return (
    <>
      <div className="flex flex-row items-center justify-between px-4 mt-10">
        <h1 className="mt-4 text-lg font-bold text-black mb-4">Coupons</h1>
        <div
          className="w-fit flex items-center text-white rounded-lg bg-[#141414] py-2 px-4 space-x-2 cursor-pointer"
         

          onClick={() => {
            setIsModal(!isModal);
            setModalState(modalConfig.MODEL_STARTED);
          }}
        >
          <BsPlusLg />
          <span>Add Coupon Code</span>
        </div>
      </div>

      <table className="w-full text-left text-[14px] whitespace-no-wrap mt-5">
        <thead>
          <tr className="space-x-4">
            <th className="px-4 w-[150px] py-3 title-font tracking-wider font-semibold text-gray-900  text-sm rounded-tl rounded-bl">
              Coupon ID
            </th>
            <th className="px-4 w-[250px] py-3 title-font tracking-wider font-semibold text-gray-900  text-sm">
              Coupon Code
            </th>
            <th className="px-4 w-[120px] py-3 title-font tracking-wider font-semibold text-gray-900  text-sm">
              Discount Type
            </th>
            <th className="px-4 w-[120px] py-3 title-font tracking-wider font-semibold text-gray-900  text-sm">
              Discount
            </th>
           
            <th className="w-[100px] title-font tracking-wider font-semibold text-gray-900  text-sm rounded-tr rounded-br"></th>
          </tr>
        </thead>
        <tbody>
          {coupons.map((data, i) => (
            <Fragment key={i}>
              <tr>
                <td className="px-4 py-3 w-max">{data.timestamp.seconds}</td>
                <td className="px-4 py-3 w-max">{data.coupon}</td>
                <td className="px-4 py-3 text-gray-900 w-max">{data.discountType == "Fixed Amount" ? "Fixed Amount" : "Percentage Amount"}</td>
                <td className="px-4 py-3">{data.packageDiscount}</td>
                <td>
                  <div className="flex flex-row items-center justify-between">
                    {/* <div className="flex py-1 px-5 rounded-md items-center bg-[#FFC044]">
                      <button>Edit</button>
                    </div> */}
                    <div className="flex py-1 px-5 mx-5 rounded-md items-center text-white bg-[#DC143C]">
                      <button onClick={() => {
                        deleteCoupon(data.id, data.coupon)
                      }}>Delete</button>
                    </div>
                    <div
                      className="ml-5 p-[2px]"
                      onClick={() => toggleDetails(data.id)}
                    >
                     
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="border-b border-[#EFEEEB]">
                <td colSpan={5}>
                
                </td>
              </tr>
            </Fragment>
          ))}
        </tbody>
      </table>
      {isModal && (
        <div className="absolute flex justify-center items-center inset-0 z-50 outline-none focus:outline-none backdrop-blur-sm">
          <AddplansModal props={{ modalState, setModalState }} />
        </div>
      )}
    </>
  );
};

export default AddPlans;