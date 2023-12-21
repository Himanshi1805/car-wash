import React, {useState} from 'react';
import {saveCoupon} from '../../utils/api';
import {AiFillCloseCircle} from 'react-icons/ai';
import {modalConfig} from '../config/model';
import {Timestamp} from 'firebase/firestore';

const AddCouponModal = ({props}) => {
  const {modalState, setModalState} = props;
  const initialValue = {
    coupon: '',
    discountType: '',
    packageDiscount: 0,
    timestamp: Timestamp.now(),
  };
  const [coupons, setCoupons] = useState(initialValue);

  const changeHandler = (e) => {
    setCoupons({...coupons, [e.target.name]: e.target.value});
  };

  const submit = async () => {
    var val = await saveCoupon(coupons);
    setModalState(modalConfig.MODEL_DONE);
    setCoupons(initialValue);
  };

  return (
    <div className="flex flex-col top-10 rounded-[10px] w-[500px]">
      <div className="bg-[#303030] mb-[50px] relative p-8 rounded-[10px] justify-center">
        <button
          className="btn text-white cursor-pointer absolute top-[4px] right-[4px] text-4xl "
          onClick={() => setModalState(modalConfig.MODEL_DESTROYED)}
        >
          <AiFillCloseCircle />
        </button>
        <h1 className="text-[20px] text-center font-bold text-[#FFFFFF] mb-5">
          Add coupons
        </h1>
        <div className="flex flex-col">
          <div className="p-4">
            <label htmlFor="coupon" className="text-white">
              Coupon Code *
            </label>
            <input
              className="py-2 px-3 rounded-md outline-none w-full"
              type="text"
              name="coupon"
              required
              onChange={changeHandler}
            />
          </div>
          <div className="p-4 w-full">
            <label htmlFor="discountType" className="text-white">
              Discount Type *
            </label>
            <select
              name="discountType"
              id="cars"
              className="py-2 px-3 rounded-md outline-none w-full"
              onChange={changeHandler}
            >
              <option>--SELECT--</option>
              <option value="Fixed Amount">Fixed Amount</option>
              <option value="Percentage Amount">Percentage Amount</option>
            </select>
          </div>
          <div className="p-4">
            <label htmlFor="packageDiscount" className="text-white">
              Discount *
            </label>
            <input
              className="py-2 px-3 rounded-md outline-none w-full"
              type="number"
              name="packageDiscount"
              required
              onChange={changeHandler}
            />
          </div>
        </div>
        <div className="mt-4 py-[10px] w-[50%] mx-auto rounded-md bg-[#FFC044]">
          <button
            className=" w-full text-center rounded-md text-black"
            onClick={submit}
          >
            ADD Coupon Code
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCouponModal;
