import React, {useState, Fragment, useEffect} from 'react';
import {Timestamp} from 'firebase/firestore';
import {addData} from '../../utils/api';
import {modelName} from '../../utils/collections';
import {AiFillCloseCircle} from 'react-icons/ai';
import {modalConfig} from '../config/model';
import {plan_months_heading} from '../../styles/Home.module.css';

const maxFeatureCharacter = '16';

const initialState = {
  packageName: '',
  vehicleType: 'car',
  washCount: null,
  packageType: '',
  packageDiscount: 0,

  // ---- 4x
  pricehatchback_1_4x: null,
  priceSedanMiniSuv_1_4x: null,
  pricesuv_1_4x: null,
  //
  pricehatchback_3_4x: null,
  priceSedanMiniSuv_3_4x: null,
  pricesuv_3_4x: null,
  //
  pricehatchback_6_4x: null,
  priceSedanMiniSuv_6_4x: null,
  pricesuv_6_4x: null,
  // ----
  // ---- 6x
  pricehatchback_1_6x: null,
  priceSedanMiniSuv_1_6x: null,
  pricesuv_1_6x: null,
  //
  pricehatchback_3_6x: null,
  priceSedanMiniSuv_3_6x: null,
  pricesuv_3_6x: null,
  //
  pricehatchback_6_6x: null,
  priceSedanMiniSuv_6_6x: null,
  pricesuv_6_6x: null,
  // ----
  // ---- 8x
  pricehatchback_1_8x: null,
  priceSedanMiniSuv_1_8x: null,
  pricesuv_1_8x: null,
  //
  pricehatchback_3_8x: null,
  priceSedanMiniSuv_3_8x: null,
  pricesuv_3_8x: null,
  //
  pricehatchback_6_8x: null,
  priceSedanMiniSuv_6_8x: null,
  pricesuv_6_8x: null,
  // ----
  // ---- 12x
  pricehatchback_1_12x: null,
  priceSedanMiniSuv_1_12x: null,
  pricesuv_1_12x: null,
  //
  pricehatchback_3_12x: null,
  priceSedanMiniSuv_3_12x: null,
  pricesuv_3_12x: null,
  //
  pricehatchback_6_12x: null,
  priceSedanMiniSuv_6_12x: null,
  pricesuv_6_12x: null,
  // ----

  // ----subscription-bike
  //4x
  priceBike_1_4x: null,
  priceBike_3_4x: null,
  priceBike_6_4x: null,
  // 6x
  priceBike_1_6x: null,
  priceBike_3_6x: null,
  priceBike_6_6x: null,

  //8x
  priceBike_1_8x: null,
  priceBike_3_8x: null,
  priceBike_6_8x: null,
  //12x
  priceBike_1_12x: null,
  priceBike_3_12x: null,
  priceBike_6_12x: null,

  //--------- one-time-car
  pricehatchback: null,
  priceSedanMiniSuv: null,
  pricesuv: null,

  //---------- one-time-bike
  pricebike: null,

  desc: '',
  fe1: '',
  fe2: '',
  fe3: '',
  fe4: '',
  fe5: '',
  timestamp: Timestamp.now(),
};

const AddPlanModal = ({props}) => {
  const {modalState, setModalState} = props;
  const [plan, setplan] = useState(initialState);

  const addPlan = async (data) => {
    let val = await addData(data, modelName.PLANS);
    setModalState(modalConfig.MODEL_DONE);
  };

  const retriveKey = (name) => {
    let keyName = name + plan.washCount;
    return keyName;
  };

  return (
    <div className="absolute flex flex-col top-10 rounded-[10px] w-[800px]">
      <div className="bg-[#303030] relative mb-[50px] p-8 rounded-[10px]">
        <button
          className="btn text-white cursor-pointer absolute top-[4px] right-[4px] text-4xl "
          onClick={() => setModalState(modalConfig.MODEL_DESTROYED)}
        >
          <AiFillCloseCircle />
        </button>
        <h1 className="text-[18px] font-bold text-[#FFFFFF] mb-5">ADD PLAN</h1>

        <div className="flex md:flex-row flex-col items-center md:flex-wrap text-white md:gap-[22px] tracking-wider mt-12 font-sans gap-6">
          <div className="w-full md:w-[31%] items-center justify-around flex-wrap md:flex-row">
            <label
              htmlFor="vehicle"
              className="block mb-1 font-semibold text-[12px] md:text-[15px]"
            >
              Vehicle Type *
            </label>
            <select
              name="vehicleType"
              id="cars"
              required
              className="w-full p-3 rounded-[5px] text-[#737373] mb-2 outline-none flex items-center"
              onChange={(e) => {
                setplan({...plan, vehicleType: e.target.value});
              }}
            >
              <option>--SELECT--</option>
              <option value="car">Car</option>
              <option value="2 wheeler">Bike</option>
            </select>
          </div>

          <div className="w-full md:w-[30%] items-center justify-around flex-wrap md:flex-row">
            <label
              htmlFor="vehicle"
              className="block mb-1 font-semibold text-[12px] md:text-[15px]"
            >
              Package Type *
            </label>
            <select
              name="service"
              id="cars"
              required
              className="w-full p-3 rounded-[5px] text-[#737373] mb-2 outline-none"
              onChange={(e) => {
                setplan({...plan, packageType: e.target.value});
              }}
            >
              <option>--SELECT--</option>
              <option value="subscription">Subscription wash</option>
              <option value="onetime">Onetime wash</option>
            </select>
          </div>

          {plan.packageType == 'subscription' ? (
            <div className="w-full md:w-[30%] items-center justify-around flex-wrap md:flex-row">
              <label
                htmlFor="vehicle"
                className="block mb-1 font-semibold text-[12px] md:text-[15px]"
              >
                No of washes p/m *
              </label>
              <select
                name="washpm"
                id="cars"
                required
                placeholder="--SELECT--"
                className="w-full p-3 rounded-[5px] text-[#737373] mb-2 outline-none"
                onChange={(e) => {
                  setplan({...plan, washCount: e.target.value});
                }}
                disabled={plan.washCount}
              >
                <option>--SELECT--</option>
                <option value="4x">4x</option>
                <option value="6x">6x</option>
                <option value="8x">8x</option>
                <option value="12x">12x</option>
              </select>
            </div>
          ) : (
            ''
          )}

          <div className="w-[100%]">
            <label
              htmlFor="address"
              className="block mb-1 font-semibold text-white text-semibold text-[15px]"
            >
              Initial Discount Percentage *
            </label>
            <input
              type="number"
              name="discount"
              required
              placeholder="Eg. 20"
              className="w-full text-[14px] px-4 py-[10px] text-black rounded outline-non md:w-[97%] items-center justify-around flex-wrap md:flex-row"
              onChange={(e) => {
                setplan({...plan, packageDiscount: e.target.value});
              }}
            />
            <span> %</span>
          </div>

          <div className="w-[100%]">
            <label
              htmlFor="address"
              className="block mb-1 font-semibold text-white text-semibold text-[15px]"
            >
              Package Name *
            </label>
            <input
              type="text"
              name="address"
              required
              placeholder="Eg. Gold Package"
              className="w-full text-[14px] px-4 py-[10px] text-black rounded outline-none"
              onChange={(e) => {
                setplan({...plan, packageName: e.target.value});
              }}
            />
          </div>
          {/* car subscription price*/}
          {plan.vehicleType == 'car' && plan.packageType == 'subscription' && plan.washCount ? (
            <Fragment>
              {/* ----- 1 month--- */}
              <div className={plan_months_heading}>
                <h1>1 Month Pricing</h1>

                <h2>{plan.washCount}</h2>
              </div>
              <div className="w-full md:w-[30%] items-center justify-around flex-wrap md:flex-row">
                <label
                  htmlFor="address"
                  className="block mb-1 font-semibold text-white text-semibold text-[15px]"
                >
                  Hatchback
                </label>
                <input
                  type="number"
                  name="address"
                  placeholder="Eg. 500"
                  className="w-full text-[14px] px-4 py-[10px] text-black rounded outline-none"
                  onChange={(e) => {
                    let keyName = retriveKey('pricehatchback_1_');
                    setplan({...plan, [keyName]: e.target.value});
                  }}
                />
              </div>
              <div className="w-full md:w-[30%] items-center justify-around flex-wrap md:flex-row">
                <label
                  htmlFor="address"
                  className="block mb-1 font-semibold text-white text-semibold text-[15px]"
                >
                  Sedan/Mini SUV
                </label>
                <input
                  type="number"
                  name="address"
                  placeholder="Eg. 500"
                  className="w-full text-[14px] px-4 py-[10px] text-black rounded outline-none"
                  onChange={(e) => {
                    let keyName = retriveKey('priceSedanMiniSuv_1_');
                    setplan({...plan, [keyName]: e.target.value});
                  }}
                />
              </div>

              <div className="w-full md:w-[30%] items-center justify-around flex-wrap md:flex-row">
                <label
                  htmlFor="address"
                  className="block mb-1 font-semibold text-white text-semibold text-[15px]"
                >
                  SUV
                </label>
                <input
                  type="number"
                  name="address"
                  placeholder="Eg. 500"
                  className="w-full text-[14px] px-4 py-[10px] text-black rounded outline-none"
                  onChange={(e) => {
                    let keyName = retriveKey('pricesuv_1_');
                    setplan({...plan, [keyName]: e.target.value});
                  }}
                />
              </div>

              {/* ----- 3 month--- */}
              <Fragment>
                <div className={plan_months_heading}>
                  <h1>3 Month Pricing</h1>
                  <h2>{plan.washCount}</h2>
                </div>
                <div className="w-full md:w-[30%] items-center justify-around flex-wrap md:flex-row">
                  <label
                    htmlFor="address"
                    className="block mb-1 font-semibold text-white text-semibold text-[15px]"
                  >
                    Hatchback
                  </label>
                  <input
                    type="number"
                    name="address"
                    placeholder="Eg. 500"
                    className="w-full text-[14px] px-4 py-[10px] text-black rounded outline-none"
                    onChange={(e) => {
                      let keyName = retriveKey('pricehatchback_3_');
                      setplan({...plan, [keyName]: e.target.value});
                    }}
                  />
                </div>
                <div className="w-full md:w-[30%] items-center justify-around flex-wrap md:flex-row">
                  <label
                    htmlFor="address"
                    className="block mb-1 font-semibold text-white text-semibold text-[15px]"
                  >
                    Sedan/Mini SUV
                  </label>
                  <input
                    type="number"
                    name="address"
                    placeholder="Eg. 500"
                    className="w-full text-[14px] px-4 py-[10px] text-black rounded outline-none"
                    onChange={(e) => {
                      let keyName = retriveKey('priceSedanMiniSuv_3_');
                      setplan({
                        ...plan,
                        [keyName]: e.target.value,
                      });
                    }}
                  />
                </div>

                <div className="w-full md:w-[30%] items-center justify-around flex-wrap md:flex-row">
                  <label
                    htmlFor="address"
                    className="block mb-1 font-semibold text-white text-semibold text-[15px]"
                  >
                    SUV
                  </label>
                  <input
                    type="number"
                    name="address"
                    placeholder="Eg. 500"
                    className="w-full text-[14px] px-4 py-[10px] text-black rounded outline-none"
                    onChange={(e) => {
                      let keyName = retriveKey('pricesuv_3_');
                      setplan({...plan, [keyName]: e.target.value});
                    }}
                  />
                </div>
              </Fragment>

              {/* 6 month */}
              <Fragment>
                <div className={plan_months_heading}>
                  <h1>6 Month Pricing</h1>
                  <h2>{plan.washCount}</h2>
                </div>
                <div className="w-full md:w-[30%] items-center justify-around flex-wrap md:flex-row">
                  <label
                    htmlFor="address"
                    className="block mb-1 font-semibold text-white text-semibold text-[15px]"
                  >
                    Hatchback
                  </label>
                  <input
                    type="number"
                    name="address"
                    placeholder="Eg. 500"
                    className="w-full text-[14px] px-4 py-[10px] text-black rounded outline-none"
                    onChange={(e) => {
                      let keyName = retriveKey('pricehatchback_6_');
                      setplan({...plan, [keyName]: e.target.value});
                    }}
                  />
                </div>
                <div className="w-full md:w-[30%] items-center justify-around flex-wrap md:flex-row">
                  <label
                    htmlFor="address"
                    className="block mb-1 font-semibold text-white text-semibold text-[15px]"
                  >
                    Sedan/Mini SUV
                  </label>
                  <input
                    type="number"
                    name="address"
                    placeholder="Eg. 500"
                    className="w-full text-[14px] px-4 py-[10px] text-black rounded outline-none"
                    onChange={(e) => {
                      let keyName = retriveKey('priceSedanMiniSuv_6_');
                      setplan({
                        ...plan,
                        [keyName]: e.target.value,
                      });
                    }}
                  />
                </div>

                <div className="w-full md:w-[30%] items-center justify-around flex-wrap md:flex-row">
                  <label
                    htmlFor="address"
                    className="block mb-1 font-semibold text-white text-semibold text-[15px]"
                  >
                    SUV
                  </label>
                  <input
                    type="number"
                    name="address"
                    placeholder="Eg. 500"
                    className="w-full text-[14px] px-4 py-[10px] text-black rounded outline-none"
                    onChange={(e) => {
                      let keyName = retriveKey('pricesuv_6_');
                      setplan({...plan, [keyName]: e.target.value});
                    }}
                  />
                </div>
              </Fragment>
            </Fragment>
          ) : (
            ''
          )}

          {/* car onetime price*/}
          {plan.vehicleType == 'car' && plan.packageType == 'onetime' ? (
            <Fragment>
              <div className="w-full md:w-[30%] items-center justify-around flex-wrap md:flex-row">
                <label
                  htmlFor="address"
                  className="block mb-1 font-semibold text-white text-semibold text-[15px]"
                >
                  Hatchback (Per wash)
                </label>
                <input
                  type="number"
                  name="address"
                  placeholder="Eg. 500"
                  className="w-full text-[14px] px-4 py-[10px] text-black rounded outline-none"
                  onChange={(e) => {
                    setplan({...plan, pricehatchback: e.target.value});
                  }}
                />
              </div>
              <div className="w-full md:w-[30%] items-center justify-around flex-wrap md:flex-row">
                <label
                  htmlFor="address"
                  className="block mb-1 font-semibold text-white text-semibold text-[15px]"
                >
                  Sedan/Mini-SUV (Per wash)
                </label>
                <input
                  type="number"
                  name="address"
                  placeholder="Eg. 500"
                  className="w-full text-[14px] px-4 py-[10px] text-black rounded outline-none"
                  onChange={(e) => {
                    setplan({...plan, priceSedanMiniSuv: e.target.value});
                  }}
                />
              </div>
              <div className="w-full md:w-[30%] items-center justify-around flex-wrap md:flex-row">
                <label
                  htmlFor="address"
                  className="block mb-1 font-semibold text-white text-semibold text-[15px]"
                >
                  SUV (Per wash)
                </label>
                <input
                  type="number"
                  name="address"
                  placeholder="Eg. 500"
                  className="w-full text-[14px] px-4 py-[10px] text-black rounded outline-none"
                  onChange={(e) => {
                    setplan({...plan, pricesuv: e.target.value});
                  }}
                />
              </div>
            </Fragment>
          ) : (
            ''
          )}

          {/* bike onetime price*/}
          {plan.vehicleType == '2 wheeler' && plan.packageType == 'onetime' ? (
            <Fragment>
              <div className="w-full md:w-[100%] items-center justify-around flex-wrap md:flex-row">
                <label
                  htmlFor="address"
                  className="block mb-1 font-semibold text-white text-semibold text-[15px]"
                >
                  Bike (Per wash)
                </label>
                <input
                  type="number"
                  name="address"
                  placeholder="Eg. 500"
                  className="w-full text-[14px] px-4 py-[10px] text-black rounded outline-none"
                  onChange={(e) => {
                    setplan({...plan, pricebike: e.target.value});
                  }}
                />
              </div>
            </Fragment>
          ) : (
            ''
          )}

          {/* bike subscription price*/}
          {plan.vehicleType == '2 wheeler' &&
          plan.packageType == 'subscription' ? (
            <Fragment>
              <div className={plan_months_heading}>
                <h2>1 Month Pricing</h2>
              </div>
              <div className="w-full md:w-[22%] items-center justify-around flex-wrap md:flex-row">
                <label
                  htmlFor="address"
                  className="block mb-1 font-semibold text-white text-semibold text-[15px]"
                >
                  Bike {plan.washCount}
                </label>
                <input
                  type="number"
                  name="address"
                  placeholder="Eg. 500"
                  className="w-full text-[14px] px-4 py-[10px] text-black rounded outline-none"
                  onChange={(e) => {
                    let keyName = retriveKey('priceBike_1_');
                    setplan({...plan, [keyName]: e.target.value});
                  }}
                />
              </div>

              <Fragment>
                <div className={plan_months_heading}>
                  <h2>3 Month Pricing</h2>
                </div>
                <div className="w-full md:w-[22%] items-center justify-around flex-wrap md:flex-row">
                  <label
                    htmlFor="address"
                    className="block mb-1 font-semibold text-white text-semibold text-[15px]"
                  >
                    Bike {plan.washCount}
                  </label>
                  <input
                    type="number"
                    name="address"
                    placeholder="Eg. 500"
                    className="w-full text-[14px] px-4 py-[10px] text-black rounded outline-none"
                    onChange={(e) => {
                      let keyName = retriveKey('priceBike_3_');
                    setplan({...plan, [keyName]: e.target.value});
                    }}
                  />
                </div>

                <Fragment>
                  <div className={plan_months_heading}>
                    <h2>6 Month Pricing</h2>
                  </div>
                  <div className="w-full md:w-[22%] items-center justify-around flex-wrap md:flex-row">
                    <label
                      htmlFor="address"
                      className="block mb-1 font-semibold text-white text-semibold text-[15px]"
                    >
                      Bike {plan.washCount}
                    </label>
                    <input
                      type="number"
                      name="address"
                      placeholder="Eg. 500"
                      className="w-full text-[14px] px-4 py-[10px] text-black rounded outline-none"
                      onChange={(e) => {
                        let keyName = retriveKey('priceBike_6_');
                    setplan({...plan, [keyName]: e.target.value});
                      }}
                    />
                  </div>
                </Fragment>
              </Fragment>
            </Fragment>
          ) : (
            ''
          )}

          <div className="w-full mb-5">
            <label
              htmlFor="address"
              className="block mb-1 font-semibold text-white text-semibold text-[15px]"
            >
              Description *
            </label>
            <textarea
              rows="6"
              placeholder="Please make sure you do thiss...."
              className="rounded-md w-full p-2 text-black"
              maxLength="300"
              required
              onChange={(e) => {
                setplan({...plan, desc: e.target.value});
              }}
            ></textarea>
          </div>
        </div>

        <div className="w-full mt-3">
          <label
            htmlFor="address"
            className="block mb-1 font-semibold text-white text-semibold text-[15px]"
          >
            Feature 1 *
          </label>
          <div className="flex flex-row">
            <input
              type="text"
              name="address"
              required
              placeholder="Feature Description"
              className="w-full text-[14px] px-4 py-[10px] rounded outline-none"
              maxLength={maxFeatureCharacter}
              onChange={(e) => {
                setplan({...plan, fe1: e.target.value});
              }}
            />
          </div>
        </div>
        <div className="w-full mt-4">
          <label
            htmlFor="address"
            className="block mb-1 font-semibold text-white text-semibold text-[15px]"
          >
            Feature 2 *
          </label>
          <div className="flex flex-row">
            <input
              type="text"
              name="address"
              required
              placeholder="Feature Description"
              className="w-full text-[14px] px-4 py-[10px] rounded outline-none"
              maxLength={maxFeatureCharacter}
              onChange={(e) => {
                setplan({...plan, fe2: e.target.value});
              }}
            />
          </div>
        </div>
        <div className="w-full mt-4">
          <label
            htmlFor="address"
            className="block mb-1 font-semibold text-white text-semibold text-[15px]"
          >
            Feature 3 *
          </label>
          <div className="flex flex-row">
            <input
              type="text"
              name="address"
              required
              placeholder="Feature Description"
              className="w-full text-[14px] px-4 py-[10px] rounded outline-none"
              maxLength={maxFeatureCharacter}
              onChange={(e) => {
                setplan({...plan, fe3: e.target.value});
              }}
            />
          </div>
        </div>
        <div className="w-full mt-4">
          <label
            htmlFor="address"
            className="block mb-1 font-semibold text-white text-semibold text-[15px]"
          >
            Feature 4 *
          </label>
          <div className="flex flex-row">
            <input
              type="text"
              name="address"
              required
              placeholder="Feature Description"
              className="w-full text-[14px] px-4 py-[10px] rounded outline-none"
              maxLength={maxFeatureCharacter}
              onChange={(e) => {
                setplan({...plan, fe4: e.target.value});
              }}
            />
          </div>
        </div>
        <div className="w-full mt-4">
          <label
            htmlFor="address"
            className="block mb-1 font-semibold text-white text-semibold text-[15px]"
          >
            Feature 5 *
          </label>
          <div className="flex flex-row">
            <input
              type="text"
              name="address"
              required
              placeholder="Feature Description"
              className="w-full text-[14px] px-4 py-[10px] rounded outline-none"
              maxLength={maxFeatureCharacter}
              onChange={(e) => {
                setplan({...plan, fe5: e.target.value});
              }}
            />
          </div>
        </div>

        <div className="bg-[#FFC044] w-[60%] mx-auto rounded-md mt-6">
          <button
            className="w-full py-[14px] text-black"
            onClick={() => {
              addPlan(plan);
            }}
          >
            Add Plan
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPlanModal;
