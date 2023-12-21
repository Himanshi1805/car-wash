import { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { BsPlusLg } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import { savePincode } from "../../utils/api";
import { modalConfig } from "../config/model";
import { Timestamp } from "firebase/firestore";

const PincodeModal = ({ props}) => {
  const { modalState, setModalState } = props;
  const [pincode, setPincode] = useState("");
  const [areas, setAreas] = useState([""]);

  const addHandler = () => {
    const data = [...areas, []];
    setAreas(data);
  };

  const changeHandler = (onChangeValue, i) => {
    const inputData = [...areas];
    inputData[i] = onChangeValue.target.value;
    setAreas(inputData);
  };

  const deleteHandler = (index) => {
    const deleteValue = [...areas];
    deleteValue.splice(index);
    setAreas(deleteValue);
  };

  const submit = async () => {
    var payload = {
      pincode,
      areas,
      timestamp: Timestamp.now()
    };
    await savePincode(payload);
    setModalState(modalConfig.MODEL_DONE);
  };


  return (
    <div className="flex flex-col top-10 rounded-[10px] w-[400px]">
      <div className="bg-[#303030] mb-[50px] p-8 rounded-[10px] relative">
        <button className="btn text-white cursor-pointer absolute top-[4px] right-[4px] text-4xl "
          onClick={() => setModalState(modalConfig.MODEL_DESTROYED)}>
          <AiFillCloseCircle />
        </button>
        <h1 className="text-[16px] font-bold text-[#FFFFFF] mb-5">
          Add Pincode
        </h1>
        <div className="flex gap-5">
          <input
            type="number"
            placeholder="282007"
            className="p-3 outline-none text-center w-full rounded-md"
            onChange={(e) => setPincode(e.target.value)}
          />
        </div>

        <div className="flex flex-col mt-6 w-full">
          <div className="flex flex-row items-center justify-between">
            <h1 className="text-[16px] font-bold text-[#FFFFFF]">Add Area</h1>
            <div
              className="w-fit flex items-center text-white rounded-lg bg-[#141414] py-2 px-4 space-x-2 cursor-pointer"
              onClick={() => addHandler()}
            >
              <BsPlusLg />
              <span>Add</span>
            </div>
          </div>
          {areas.map((area, i) => {
            return (
              <div className="flex felx-row w-full mt-4" key={i}>
                <input
                  className="bg-[#F9F9F9] py-[10px] px-3 rounded-md w-[90%] outline-none"
                  placeholder="Ram Chock"
                  onChange={(e) => changeHandler(e, i)}
                />
                <div
                  className="flex items-center bg-white ml-3 px-3 py-2 rounded-[4px] cursor-pointer w-1/10"
                  onClick={() => deleteHandler(i)}
                >
                  <FaTrash color="#FF2525" size="1.5rem" />
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-8 py-[10px] w-[50%] mx-auto rounded-md bg-[#FFC044]">
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

export default PincodeModal;
