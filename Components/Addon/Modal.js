import React, { useState } from "react";
import { saveAddon } from "../../utils/api";
import { AiFillCloseCircle } from "react-icons/ai";
import { modalConfig } from "../config/model";
import { Timestamp } from "firebase/firestore";

const Modal = ({ props }) => {
  const { modalState, setModalState } = props;
  const initialValue = {
    addon: "",
    vehicleType: "car",
    price: "",
    timestamp: Timestamp.now(),
  };
  const [addons, setAddons] = useState(initialValue);

  const changeHandler = (e) => {
    setAddons({ ...addons, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    var val = await saveAddon(addons);
    setModalState(modalConfig.MODEL_DONE)
    setAddons(initialValue);  
  };

  return (
    <div className="flex flex-col top-10 rounded-[10px] w-[500px]">
      <div className="bg-[#303030] mb-[50px] relative p-8 rounded-[10px] justify-center">
        <button className="btn text-white cursor-pointer absolute top-[4px] right-[4px] text-4xl "
          onClick={() => setModalState(modalConfig.MODEL_DESTROYED)}
        >
          <AiFillCloseCircle />
        </button>
        <h1 className="text-[20px] text-center font-bold text-[#FFFFFF] mb-5">
          Add addons
        </h1>
        <div className="flex flex-col">
          <div className="p-4">
            <label htmlFor="addon" className="text-white">
              Add-on *
            </label>
            <input
              className="py-2 px-3 rounded-md outline-none w-full"
              type="text"
              name="addon"
              required
              onChange={changeHandler}
            />
          </div>
          <div className="p-4">
            <label htmlFor="price" className="text-white">
              Price *
            </label>
            <input
              className="py-2 px-3 rounded-md outline-none w-full"
              type="number"
              name="price"
              required
              onChange={changeHandler}
            />
          </div>
          <div className="p-4 w-full">
            <label htmlFor="vehicle" className="text-white">
              Vehicle
            </label>
            <select
              name="vehicleType"
              id="cars"
              className="py-2 px-3 rounded-md outline-none w-full"
              onChange={changeHandler}
            >
              <option value="car">Car</option>
              <option value="2 wheeler">Bike</option>
            </select>
          </div>
          <div>
        {addons.vehicleType == "car" ? (
        <div className="p-4 w-full">
        <label htmlFor="vehicle" className="text-white">
            Car Type
            </label>
            <select
              name="carType"
              id="carType"
              className="py-2 px-3 rounded-md outline-none w-full"
              onChange={changeHandler}
            >
               <option>--SELECT--</option>
               <option value="hatchback">Hatchback</option>
               <option value="sedan">Sedan</option>
               <option value="minisuv">Mini SUV</option>
               <option value="suv">SUV</option>
          </select>
          </div>
          ) :"" }
          </div>
        </div>
        <div className="mt-4 py-[10px] w-[50%] mx-auto rounded-md bg-[#FFC044]">
          <button
            className=" w-full text-center rounded-md text-black"
            onClick={submit}
          >
            ADD
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
