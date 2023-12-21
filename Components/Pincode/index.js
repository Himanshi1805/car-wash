import React, { useEffect, useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { deleteDocument, getPincode } from "../../utils/api";
import { modalConfig } from "../config/model";
import PincodeModal from "./Modal";
import {
  collection,
  query,
  onSnapshot,
  orderBy
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { modelName } from "../../utils/collections";

const {  PINCODE } = modelName;

const PinCode = () => {
  const [isModal, setIsModal] = useState(false);
  const [pinData, setPinData] = useState([]);
  const [modalState, setModalState] = useState("");

  const getPincodeData = async () => {
    const q = query(collection(db, PINCODE),orderBy("timestamp", "desc"));
    await onSnapshot(q, (querySnapshot) => {
      const arr = [];
      querySnapshot.forEach((doc) => {
        arr.push(...pinData,{
         ...doc.data(),
          id: doc.id
        })
      })
      setPinData(arr)
    });
  };

  useEffect(() => {
    getPincodeData();
  }, []);


  const deleteHandler = async (id, pinCode) => {
    const confirmModal = window.confirm(`Are you sure you want to delete ${pinCode}?`);
    if (!confirmModal) return;
    let dlt = await deleteDocument("pincode", id);
  };

  useEffect(() => {
    if (modalState === modalConfig.MODEL_DESTROYED || modalState === modalConfig.MODEL_DONE) {
      setIsModal(false);
    }
  }, [modalState]);
  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-row items-center justify-between px-4 mt-10 mb-5">
          <h1 className="mt-4 text-lg font-bold text-black mb-4">
            Currnent Pincodes
          </h1>
          <div
            className="w-fit flex items-center text-white rounded-lg bg-[#141414] py-2 px-4 space-x-2 cursor-pointer"
            onClick={() => {
              setIsModal(!isModal)
              setModalState(modalConfig.MODEL_STARTED)
            
            }}
          >
            <BsPlusLg />
            <span>Add Pincode</span>
          </div>
        </div>
        {pinData.map((item, i) => {
          return (
            <div
              className="flex justify-between items-center space-x-4 px-4 mt-2 border-b border-[#EFEFEF]"
              key={i}
            >
              <p className="w-full flex justify-center py-3">{item.pincode}</p>
              <div className="flex px-2 rounded-md items-center justify-center cursor-pointer h-[30px] bg-[#FFC044]">
                <button
                  onClick={() => {
                    deleteHandler(item.id, item.pincode);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {isModal && (
        <div className="absolute flex justify-center items-center inset-0 z-50 outline-none focus:outline-none backdrop-blur-sm">
          <PincodeModal props={{ modalState, setModalState }} />
        </div>
      )}
    </>
  );
};

export default PinCode;
