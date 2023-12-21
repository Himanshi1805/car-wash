import React, {useEffect, useState, useContext} from 'react';
import { UserContext } from '../../context/UserContext';
import {FiSearch} from 'react-icons/fi';
import {ImCross} from 'react-icons/im';
import {useRouter} from 'next/router';
import BookingData from './BookingData';
import {getFilterText, getAllPinCodes} from '../../utils/api';
import { CSVLink, CSVDownload } from "react-csv";

const BookingMain = () => {
  const context = useContext(UserContext);
  const [page, setPage] = useState(null);
  const [btnPreview, setbtnPreview] = useState({
    next: true,
    previous: true,
  });
  const [filterText, setFilterText] = useState('');
  const [filteredDAta, setFilteredDAta] = useState([]);
  const [count, setCount] = useState(0);
  var router = useRouter();
  const [querry, setQuerry] = useState('');
  const [downloadExcel, setDownloadExcel] = useState(null);
  const [status, setStatus] = useState("")  
  const [key, setKey] = useState("")
  const [pinCodes, setPinCodes] = useState([])

  useEffect(() => {
    if (page === 0) {
      setbtnPreview({...btnPreview, previous: false, next: true});
    } else {
      setbtnPreview({...btnPreview, previous: true});
    }
  }, [page]);

  useEffect(() => {
    if (router.query.type) {
      setQuerry(router.query.type);
    }
  }, [router]);

  useEffect(() => {
    setDownloadExcel(context.excelData)
    console.log(context.excelData)
  }, [context]);

  const downloadToExcel = () => {
    <CSVDownload data={downloadExcel} target="_blank" />;
  }

  // const filterbyText = async () => {
  //   if (filterText) {
  //     const res = await getFilterText(filterText, querry);
  //     setFilteredDAta(res);
  //   }
  // };

  const searchByOrderId = () => {
    setStatus(filterText)
  }

  const getPinCodes = async () => {
      const res = await getAllPinCodes();
      setPinCodes(res)
  };

  useEffect(()=>{
    getPinCodes();
  },[])

  const handleChange = (value) => {
    setStatus(value)
  };

  return (
    <>
      <div className="w-90%">
        <h1 className="my-6 text-lg font-bold text-black mb-6">
          {querry == 'One_time_wash' ? 'One Time Wash ' : 'Subscription Wash '}
          Bookings
        </h1>
         <div className="flex flex-row space-x-6 mb-6">
          <div className="w-[301px] relative rounded-md ">
            <input
              type="text"
              placeholder="Search by order-id"
              className="px-3 py-[10px] w-full rounded-md text-black outline-none bg-[#F6F6F6]"
              onChange={(e) =>  {
                setKey("orderNo")
                let orderId = parseInt(e.target.value);
                setFilterText(orderId)
              }}
            />
            <FiSearch
              className="absolute top-[10px] right-12 w-6 h-6 cursor-pointer"
              onClick={()=>{
                searchByOrderId()
              }}
            />
            <ImCross
              className="absolute top-[18px] right-3 w-6 h-3 cursor-pointer"
              onClick={()=>{
               window.location.reload();
;              }}
            />
          </div>
          <select className="bg-[#F6F6F6] px-4 rounded-[6px] h-[35px]"  
            onChange={(e) => {
                setKey("Status")
                handleChange(e.target.value);                               
             }}
           >
            <option value="all">All Status</option>
            <option value="assigned">Assigned</option>
            <option value="unassigned">Unassigned</option>
            <option value="arrived">Arrived</option>
            <option value="inprogress">In-progress</option>
            <option value="done">Done</option>
          </select>

          <select className="bg-[#F6F6F6] px-4 rounded-[6px] h-[35px]"
           onChange={(e) => {
            setKey("pincode")
            handleChange(e.target.value);                               
         }}
          >
            <option value="all">Pincodes</option>
            {pinCodes.map((item)=> (
              <>
            <option value={item.pincode}>{item.pincode}</option>
             </>
            ))}
          </select>

          <select className="bg-[#F6F6F6] px-4 rounded-[6px] h-[35px]"
           onChange={(e) => {
            setKey("area")
            handleChange(e.target.value);                               
         }}
          >
            <option value="all">Area</option>
            {pinCodes.map((item)=> (
              item.areas.map((area)=> (
                <>
                 <option value={area}>{area}</option>
                </>
              ))
            ))}
          </select>
          {/* <select className="bg-[#F6F6F6] px-4 rounded-[6px] h-[35px]">
            <option value="Status">8July - 15July</option>
            <option value="Status">Status</option>
            <option value="Status">Status</option>
            <option value="Status">Status</option>
          </select> */}

         {/* <button onClick={downloadToExcel}>
          Download
         </button> */}
         
         {/* {downloadExcel ? (
          <CSVLink data={downloadExcel} separator={";"}>
             Download me
          </CSVLink>
          ) : ""} */}
        </div> 

        <table className="w-full text-left text-[14px] whitespace-no-wrap" dataSource={filteredDAta? filteredDAta:[]}>
          <thead>
            <tr>
              <th className="px-4 w-[80px] py-3 title-font tracking-wider font-[400] text-gray-900  text-sm rounded-tl rounded-bl">
                Order ID
              </th>
              <th className="px-4 w-[230px] py-3 title-font tracking-wider font-[400] text-gray-900  text-sm">
                Order Type
              </th>
              <th className="px-4 w-[230px] py-3 title-font tracking-wider font-[400] text-gray-900  text-sm">
                Total Price
              </th>
              <th className="px-4 w-[60px] py-3 title-font tracking-wider font-[400] text-gray-900  text-sm">
                Payment
              </th>
              <th className="px-4 w-[120px] py-3 title-font tracking-wider font-[400] text-gray-900  text-sm">
                Assign
              </th>
              <th className="px-4 w-[120px] py-3 title-font tracking-wider font-[400] text-gray-900  text-sm">
                To
              </th>
              <th className="px-4 w-[120px] py-3 title-font tracking-wider font-[400] text-gray-900  text-sm">
                Status
              </th>
              <th className="w-10 title-font tracking-wider font-[400] text-gray-900  text-sm rounded-tr rounded-br"></th>
            </tr>
          </thead>
          <BookingData
            props={{
              page,
              setPage,
              btnPreview,
              setbtnPreview,
              filteredDAta,
              count,
              status,
              key,
            }}
          />
        </table>
        <span className="button items-center flex justify-center w-[100%] gap-5 my-5 ">
          {btnPreview.previous && (
            <button
              className="px-8 py-1 bg-[#FFC044] rounded-md font-bold"
              onClick={() => {
                setCount(count + 1);
                setPage(0);
              }}
            >
              Previous
            </button>
          )}
          {btnPreview.next && (
            <button
              className="px-8 py-1 bg-[#FFC044] rounded-md font-bold"
              onClick={() => {
                setCount(count + 1);
                setPage(1);
              }}
            >
              Next
            </button>
          )}
        </span>
      </div>
    </>
  );
};

export default BookingMain;
