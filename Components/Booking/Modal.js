import React, {useState, useEffect} from 'react';
import {AiFillCloseCircle} from 'react-icons/ai';
import {modalConfig} from '../config/model';
import {getPartner} from '../../utils/api';
import {assignPartners} from '../../utils/api';
import {Timestamp} from 'firebase/firestore';
import {toast} from 'react-toastify';

let initialState = {
  date: null,
  time: null,
  remarks: '',
  partnerId: null,
  partnerName: '',
  assigned_timestamp: Timestamp.now(),
  Status: 'assigned',
};

const index = ({props}) => {
  const [assignPartner, setAssignPartner] = useState(initialState);
  const {modalState, setModalState} = props;
  const [booking, setbooking] = useState([]);
  const [optionItems, setOptionItems] = useState([]);
  const [selectedPartnerName, setSelectedPartnerName] = useState('');

  useEffect(() => {
    getPartnerData();
  }, [modalState]);

  const getPartnerData = async () => {
    let res = await getPartner();
    setbooking(res);
  };

  const loopPartners = () => {
    setOptionItems(
      Object.keys(booking).map((item, index) => (
        <option value={booking[item].name} key={index} id={booking[item].timestamp.seconds}>
          {booking[item].name}
        </option>
      ))
    );
  };


  const submit = async () => {
    toast.info('Processing');
    var val = await assignPartners(assignPartner, props.querry, props.docId);
    setModalState(modalConfig.MODEL_DONE);
    setAssignPartner(initialState);
    toast.info('Assigned Successfully');
  };
  useEffect(() => {
    loopPartners();
  }, [booking]);



  const handleChange = (value) => {
    setSelectedPartnerName(value);
    assignPartner.partnerName = value;
    const PId = booking.filter(partner =>partner.name===value);
    setAssignPartner({...assignPartner, partnerId: PId[0].timestamp.seconds, partnerName: PId[0].name});
 };


  useEffect(() => {
  }, [assignPartner, selectedPartnerName]);

  const changeHandler = (e) => {
    setAssignPartner({...assignPartner, [e.target.name]: e.target.value});
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center bg-[#303030] rounded-[10px] z-100 p-8 w-[700px] relative">
        <button
          className="btn text-white cursor-pointer absolute top-[4px] right-[4px] text-4xl "
          onClick={() => setModalState(modalConfig.MODEL_DESTROYED)}
        >
          <AiFillCloseCircle />
        </button>
        <h1 className="text-[18px] font-bold text-[#FFFFFF] mb-5">Assign</h1>

        <div className="flex flex-col md:flex-row gap-3 md:gap-[22px] mb-5 w-full">
          <div className="w-full md:w-[34%]">
            <label
              htmlFor="address"
              className="block mb-1 font-semibold text-white text-semibold text-[15px]"
            >
              Date *
            </label>
            <input
              type="date"
              name="date"
              onChange={changeHandler}
              placeholder="Flat no. 6, Second floor, Rohine Residency"
              className="w-full text-[14px] px-4 py-[10px] rounded outline-none"
            />
          </div>
          <div className="w-full md:w-[33%]">
            <label
              htmlFor="address"
              className="block mb-1 font-semibold text-white text-semibold text-[15px]"
            >
              Time *
            </label>
            <input
              type="time"
              name="time"
              placeholder="Guwahati"
              onChange={changeHandler}
              className="w-full bg-white text-[14px] px-4 py-[10px] rounded outline-none"
            />
          </div>
          <div className="w-full md:w-[33%]">
            <label
              htmlFor="address"
              className="block mb-1 font-semibold text-white text-semibold text-[15px]"
            >
              Assign to *
            </label>
            <select
              required
             
              className="w-full bg-white text-[14px] px-4 py-[10px] rounded outline-none"
              onChange={(e) => {
                handleChange(e.target.value);                               
              }}
            >
              <option>--SELECT--</option>
              {optionItems}
            </select>
          </div>
        </div>

        <div className="w-full mb-5">
          <label
            htmlFor="address"
            className="block mb-1 font-semibold text-white text-semibold text-[15px]"
          >
            Remarks *
          </label>
          <textarea
            rows="6"
            placeholder="Please make sure you do thiss...."
            className="rounded-md w-full p-2"
            name="remarks"
            onChange={changeHandler}
          ></textarea>
        </div>
        <div
          className="bg-[#FFC044] w-1/2 mx-auto rounded-md text-center text-[15px] text-black font-normal cursor-pointer"
          onClick={submit}
        >
          <button className="py-4">Assign</button>
        </div>
      </div>
    </>
  );
};

export default index;
