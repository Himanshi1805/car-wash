import React, {useState, useEffect, Fragment} from 'react';
import {BsPlusLg} from 'react-icons/bs';
import {FaChevronDown} from 'react-icons/fa';
import AddplansModal from './Modal';
import {deleteDocument} from '../../utils/api';
import {modelName} from '../../utils/collections';
import {modalConfig} from '../config/model';
import {collection, query, onSnapshot, orderBy} from 'firebase/firestore';
import {db} from '../../config/firebase';

const {PLANS} = modelName;

const AddPlans = () => {
  const [isModal, setIsModal] = useState(false);
  const [openId, setOpenId] = useState('1');
  const [plans, setPlans] = useState([]);
  const [modalState, setModalState] = useState('');

  const toggleDetails = (id) => {
    openId == id ? setOpenId('') : setOpenId(id);
  };

  const getPlanData = async () => {
    const q = query(collection(db, PLANS), orderBy('timestamp', 'desc'));
    await onSnapshot(q, (querySnapshot) => {
      const arr = [];
      querySnapshot.forEach((doc) => {
        arr.push(...plans, {
          ...doc.data(),
          id: doc.id,
        });
      });
      setPlans(arr);
    });
  };

  useEffect(() => {
    getPlanData();
  }, []);

  const deletePlan = async (id, name) => {
    const confirmModal = window.confirm(
      `Are you sure you want to delete ${name}?`
    );
    if (!confirmModal) return;
    let dlt = await deleteDocument(modelName.PLANS, id);
  };

  useEffect(() => {
    if (
      modalState === modalConfig.MODEL_DESTROYED ||
      modalState === modalConfig.MODEL_DONE
    ) {
      setIsModal(false);
    }
  }, [modalState]);

  const retriveBikePricing = (name, data) => {
    let keyName = name + data.washCount;
    return data[keyName];
  };

  return (
    <>
      <div className="flex flex-row items-center justify-between px-4 mt-10">
        <h1 className="mt-4 text-lg font-bold text-black mb-4">Plans</h1>
        <div
          className="w-fit flex items-center text-white rounded-lg bg-[#141414] py-2 px-4 space-x-2 cursor-pointer"
          onClick={() => {
            setIsModal(!isModal);
            setModalState(modalConfig.MODEL_STARTED);
          }}
        >
          <BsPlusLg />
          <span>Add Plans</span>
        </div>
      </div>

      <table className="w-full text-left text-[14px] whitespace-no-wrap mt-5">
        <thead>
          <tr className="space-x-4">
            <th className="px-4 w-[150px] py-3 title-font tracking-wider font-semibold text-gray-900  text-sm rounded-tl rounded-bl">
              Plan ID
            </th>
            <th className="px-4 w-[250px] py-3 title-font tracking-wider font-semibold text-gray-900  text-sm">
              Plan Name
            </th>
            <th className="px-4 w-[120px] py-3 title-font tracking-wider font-semibold text-gray-900  text-sm">
              Category
            </th>
            <th className="px-4 w-[120px] py-3 title-font tracking-wider font-semibold text-gray-900  text-sm">
              Package Type
            </th>
            <th className="px-4 w-[120px] py-3 title-font tracking-wider font-semibold text-gray-900  text-sm">
              No of washes p/m
            </th>
            <th className="px-4 w-[120px] py-3 title-font tracking-wider font-semibold text-gray-900  text-sm">
              Discount percentage
            </th>
            <th className="px-4 w-[150px] py-3 title-font tracking-wider font-semibold text-gray-900  text-sm">
              Actions
            </th>
            <th className="w-[100px] title-font tracking-wider font-semibold text-gray-900  text-sm rounded-tr rounded-br"></th>
          </tr>
        </thead>
        <tbody>
          {plans.map((data, i) => (
            <Fragment key={i}>
              <tr>
                <td className="px-4 py-3 w-max">{data.timestamp.seconds}</td>
                <td className="px-4 py-3 w-max">{data.packageName}</td>
                <td className="px-4 py-3 text-gray-900 w-max">
                  {data.vehicleType == 'car' ? 'Car' : 'Bike'}
                </td>
                <td className="px-4 py-3">{data.packageType}</td>
                <td className="px-4 py-3">
                  {' '}
                  {data.packageType == 'subscription' ? data.washCount : '-'}
                </td>
                <td className="px-4 py-3">{data.packageDiscount}</td>
                <td>
                  <div className="flex flex-row items-center justify-between">
                    {/* <div className="flex py-1 px-5 rounded-md items-center bg-[#FFC044]">
                      <button>Edit</button>
                    </div> */}
                    <div className="flex py-1 px-5 mx-5 rounded-md items-center text-white bg-[#DC143C]">
                      <button
                        onClick={() => {
                          deletePlan(data.id, data.packageName);
                        }}
                      >
                        Delete
                      </button>
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
                      <div className="flex flex-col w-1/2">
                        <h1 className="text-[16px] font-bold ">Features</h1>
                        <span>{data.fe1}</span>
                        <span>{data.fe2}</span>
                        <span>{data.fe3}</span>
                        <span>{data.fe4}</span>
                        <span>{data.fe5}</span>
                      </div>
                      <Fragment>
                        {data.vehicleType == 'car' ? (
                          <div className="flex flex-col w-1/2">
                            <h1 className="text-[16px] font-bold">
                              Pricing Details
                            </h1>
                            <div className="flex flex-row">
                              {data.packageType == 'subscription' ? (
                                <>
                                  <div className="flex flex-col">
                                    <p htmlFor="name" className="mr-[10px]">
                                      Hatchback:
                                    </p>
                                    <br />
                                    <br />
                                    <p htmlFor="name" className="mr-[10px]">
                                      Sedan/Mini SUV:
                                    </p>
                                    <br />
                                    <br />
                                    <p htmlFor="name" className="mr-[10px]">
                                      SUV:
                                    </p>
                                    <br />
                                    <br />
                                  </div>
                                  <div className="flex flex-col w-1/2">
                                    <div className="flex flex-col">
                                      <p>
                                        1 month : ₹{' '}
                                        {retriveBikePricing(
                                          'pricehatchback_1_',
                                          data
                                        )}
                                      </p>
                                      <p>
                                        3 month : ₹{' '}
                                        {retriveBikePricing(
                                          'pricehatchback_3_',
                                          data
                                        )}
                                      </p>
                                      <p>
                                        6 month : ₹{' '}
                                        {retriveBikePricing(
                                          'pricehatchback_6_',
                                          data
                                        )}
                                      </p>
                                    </div>
                                    <div className="flex flex-col">
                                      <p>
                                        1 months : ₹{' '}
                                        {retriveBikePricing(
                                          'priceSedanMiniSuv_1_',
                                          data
                                        )}
                                      </p>
                                      <p>
                                        3 months : ₹{' '}
                                        {retriveBikePricing(
                                          'priceSedanMiniSuv_3_',
                                          data
                                        )}
                                      </p>
                                      <p>
                                        6 months : ₹{' '}
                                        {retriveBikePricing(
                                          'priceSedanMiniSuv_6_',
                                          data
                                        )}
                                      </p>
                                    </div>
                                    <div className="flex flex-col">
                                      <p>
                                        1 months : ₹{' '}
                                        {retriveBikePricing(
                                          'pricesuv_1_',
                                          data
                                        )}
                                      </p>
                                      <p>
                                        3 months : ₹{' '}
                                        {retriveBikePricing(
                                          'pricesuv_3_',
                                          data
                                        )}
                                      </p>
                                      <p>
                                        6 months : ₹{' '}
                                        {retriveBikePricing(
                                          'pricesuv_6_',
                                          data
                                        )}
                                      </p>
                                    </div>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div className="flex flex-col">
                                    <p htmlFor="name" className="mr-[10px]">
                                      Hatchback:
                                    </p>

                                    <p htmlFor="name" className="mr-[10px]">
                                      Sedan/Mini SUV:
                                    </p>

                                    <p htmlFor="name" className="mr-[10px]">
                                      SUV:
                                    </p>
                                  </div>
                                  <div className="flex flex-col w-1/2">
                                    <div className="flex flex-col">
                                      <p>₹ {data.pricehatchback}</p>
                                      <p>₹ {data.priceSedanMiniSuv}</p>
                                      <p>₹ {data.pricesuv}</p>
                                    </div>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="flex flex-col w-1/2">
                              <h1 className="text-[16px] font-bold">
                                Pricing Details
                              </h1>
                              <div className="flex flex-row">
                                <div className="flex flex-col">
                                  <p htmlFor="name" className="mr-[10px]">
                                    Price:
                                  </p>
                                </div>
                                {data.packageType == 'subscription' ? (
                                  <div className="flex flex-col w-1/2">
                                    <div className="flex flex-col">
                                      <p>
                                        1 month : ₹{' '}
                                        {retriveBikePricing(
                                          'priceBike_1_',
                                          data
                                        )}
                                      </p>
                                    </div>
                                    <div className="flex flex-col">
                                      <p>
                                        3 months : ₹{' '}
                                        {retriveBikePricing(
                                          'priceBike_3_',
                                          data
                                        )}
                                      </p>
                                    </div>
                                    <div className="flex flex-col">
                                      <p>
                                        6 months : ₹{' '}
                                        {retriveBikePricing(
                                          'priceBike_6_',
                                          data
                                        )}
                                      </p>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="flex flex-col w-1/2">
                                    <div className="flex flex-col">
                                      <p>₹ {data.pricebike}</p>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </>
                        )}
                      </Fragment>
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
          <AddplansModal props={{modalState, setModalState}} />
        </div>
      )}
    </>
  );
};

export default AddPlans;
