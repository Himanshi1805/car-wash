import React, { useState, useEffect, Fragment } from "react";
import AddonModal from "./Modal";
import { BsPlusLg } from "react-icons/bs";
import { deleteDocument, getAddon } from "../../utils/api";
import { modalConfig } from "../config/model";

const Addon = () => {

  const [isModal, setIsModal] = useState(false);
  const [addonData, setAddonData] = useState([]);
  const [modalState, setModalState] = useState("");
  
  useEffect(() => {
    getAddonData();
  }, [modalState]);

  const getAddonData = async () => {
    let res = await getAddon();
    setAddonData(res);
  };
  
  const deleteHandler = async (id) => {
    let dlt = await deleteDocument("addon", id);
    getAddonData();
    // location.reload();
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
          <h1 className="mt-4 text-lg font-bold text-black mb-4">Add Ons</h1>
          <div
            className="w-fit flex items-center text-white rounded-lg bg-[#141414] py-2 px-4 space-x-2 cursor-pointer"
            onClick={() => {
              setIsModal(!isModal)
              setModalState(modalConfig.MODEL_STARTED)
            
            }}
          >
            <BsPlusLg />
            <span>Add addons</span>
          </div>
        </div>
        <table className="w-full text-left text-[14px] whitespace-no-wrap mt-5 mb-6">
          <thead className="border-b-2 border-[#EFEFEF]">
            <tr className="space-x-4">
              <th className="px-4 w-[150px] py-3 title-font tracking-wider font-semibold text-gray-900  text-sm rounded-tl rounded-bl">
                Sr No.
              </th>
              <th className="px-4 w-[250px] py-3 title-font tracking-wider font-semibold text-gray-900  text-sm">
                Addon
              </th>
              <th className="px-4 w-[120px] py-3 title-font tracking-wider font-semibold text-gray-900  text-sm">
                Price
              </th>
              <th className="px-4 w-[150px] py-3 title-font tracking-wider font-semibold text-gray-900  text-sm">
                Vehicle type
              </th>
              <th className="px-4 w-[150px] py-3 title-font tracking-wider font-semibold text-gray-900  text-sm">
               Type
              </th>
              <th className="w-[100px] title-font tracking-wider font-semibold text-gray-900  text-sm rounded-tr rounded-br"></th>
            </tr>
          </thead>
          <tbody>
            {addonData.map((item, index) => {
              return (
                <Fragment key={index}>
                  <tr className="border-b border-[#EFEEEB]">
                    <td className="px-4 py-3 w-max">#{index + 1}</td>
                    <td className="px-4 py-3 w-max">{item.addon}</td>
                    <td className="px-4 py-3 text-gray-900 w-max">
                      {item.price}
                    </td>
                    <td className="px-4 py-3 text-gray-900 w-max">
                      {item.vehicleType}
                    </td>
                    <td className="px-4 py-3 text-gray-900 w-max">
                      {item.carType}
                    </td>
                    <td className="px-4 py-3 text-gray-900 w-max">
                      <div className="flex py-1 px-5 rounded-md items-center justify-center cursor-pointer bg-[#FFC044]">
                        <button
                          onClick={() => {
                            deleteHandler(item.id);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
      {isModal && (
        <div className="absolute flex justify-center items-center inset-0 z-50 outline-none focus:outline-none backdrop-blur-sm">
          <AddonModal props={{ modalState, setModalState }} />
        </div>
      )}
    </>
  );
};

export default Addon;
