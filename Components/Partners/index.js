import React, { useEffect, useState, Fragment } from "react";
import { BsPlusLg } from "react-icons/bs";
import { FaChevronDown } from "react-icons/fa";
import PartnersModal from "./Modal";
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

const {  PARTNERS } = modelName;

const Partners = () => {
  const [isModal, setIsModal] = useState(false);
  const [openId, setOpenId] = useState("");
  const [labourData, setLabourData] = useState([])
  const [modalState, setModalState] = useState("");
  const toggleDetails = (id) => {
    openId == id ? setOpenId("") : setOpenId(id);
  };

  const getLabours = async () => {
    const q = query(collection(db, PARTNERS),orderBy("timestamp", "desc"));
    await onSnapshot(q, (querySnapshot) => {
      const arr = [];
      querySnapshot.forEach((doc) => {
        arr.push(...labourData,{
         ...doc.data(),
          id: doc.id
        })
      })
      setLabourData(arr)
    });
  };

  useEffect(() => {
    getLabours();
  }, [])

  const deleteLabour = async (id, name) => {
    const confirmModal = window.confirm(`Are you sure you want to delete ${name}?`);
    if (!confirmModal) return;
    let dlt = await deleteDocument(modelName.PARTNERS, id);
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
        <h1 className="mt-4 text-lg font-bold text-black mb-4">Partners</h1>
        <div
          className="w-fit flex items-center text-white rounded-lg bg-[#141414] py-2 px-4 space-x-2 cursor-pointer"
         
          onClick={() => {
            setIsModal(!isModal);
            setModalState(modalConfig.MODEL_STARTED);
          }}
        >
          <BsPlusLg />
          <span>Add Partners</span>
        </div>
      </div>

      <table className="w-full text-left text-[14px] whitespace-no-wrap mt-5 mb-6">
        <thead>
          <tr className="space-x-4">
            <th className="px-4 w-[150px] py-3 title-font tracking-wider font-semibold text-gray-900  text-sm rounded-tl rounded-bl">
              Partners ID
            </th>
            <th className="px-4 w-[250px] py-3 title-font tracking-wider font-semibold text-gray-900  text-sm">
              Name
            </th>
            <th className="px-4 w-[120px] py-3 title-font tracking-wider font-semibold text-gray-900  text-sm">
              Joining
            </th>
            <th className="px-4 w-[150px] py-3 title-font tracking-wider font-semibold text-gray-900  text-sm">
              Actions
            </th>
            <th className="w-[100px] title-font tracking-wider font-semibold text-gray-900  text-sm rounded-tr rounded-br"></th>
          </tr>
        </thead>
        <tbody>
          {labourData.map((data, i) => (
            <Fragment key={i}>
              <tr>
                <td className="px-4 py-3 w-max">{data.timestamp.seconds}</td>
                <td className="px-4 py-3 w-max">{data.name}</td>
                <td className="px-4 py-3 text-gray-900 w-max">{data.joiningDate}</td>
                <td>
                  <div className="flex flex-row items-center justify-between">
                    <div className="flex py-1 px-5 rounded-md items-center bg-[#FFC044]">
                      <button onClick={() => {
                        deleteLabour(data.id, data.name)
                      }}>Delete</button>
                    </div>
                    <div
                      className="ml-5 p-[2px]"
                      onClick={() => toggleDetails(data.id)}
                    >
                      <FaChevronDown className="cursor-pointer" />
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="border-b border-[#EFEEEB]">
                <td colSpan={5}>
                  {openId == data.id && (
                    <div className="flex px-2 py-3 text-[#151515]">
                      <div className="flex flex-col justify-center w-1/2 items-center">
                        <div className="flex">
                          <img
                            src={data.profileImg}
                            alt=""
                            className="w-[80px] h-[80px] rounded-full border-2 border-[#FFC044]"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col w-1/2">
                        <h1 className="text-[16px] font-bold ">Personal Details</h1>
                        <div className="flex flex-row">
                          <div className="flex flex-col">
                            <p htmlFor="name" className="mr-[10px]">
                              Name:
                            </p>
                            <p htmlFor="name" className="mr-[10px]">
                              Phone:
                            </p>
                            <p htmlFor="name" className="mr-[10px]">
                              Address:
                            </p>
                            <p htmlFor="name" className="mr-[10px]">
                              Document:
                            </p>
                          </div>
                          <div className="flex flex-col">
                            <p>{data.name}</p>
                            <p>{data.phone}</p>
                            <p>{data.city},{data.area},{data.address},{data.landmark},{data.pinCode}</p>
                            <p>{data.documentType} : {data.documentId}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            </Fragment>
          ))}
        </tbody>
      </table>
      {isModal && (
        <div className="absolute flex justify-center items-center inset-0 z-50 outline-none focus:outline-none backdrop-blur-sm">
          <PartnersModal props={{ modalState, setModalState }} />
        </div>
      )}
    </>
  );
};

export default Partners;