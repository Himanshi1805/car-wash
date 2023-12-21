import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const Contact = () => {
  const [openId, setOpenId] = useState("7248455555");

  const toggleDetails = (id) => {
    openId == id ? setOpenId("") : setOpenId(id);
  };
  return (
    <>
      <div className="flex flex-row items-center justify-between px-4 mt-10">
        <h1 className="mt-4 text-lg font-bold text-black mb-4">Respones</h1>
      </div>

      <table className="w-full text-left text-[14px] whitespace-no-wrap mt-5">
        <thead>
          <tr className="space-x-4">
            <th className="px-4 w-[30%] py-3 title-font tracking-wider font-semibold text-gray-900  text-sm rounded-tl rounded-bl">
              Name
            </th>
            <th className="px-4 w-[60%] py-3 title-font tracking-wider font-semibold text-gray-900  text-sm">
              Phone
            </th>
            <th className="title-font tracking-wider font-semibold text-gray-900  text-sm rounded-tr rounded-br"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-4 py-3 w-max">Rakesh Kumar</td>
            <td className="px-4 py-3 text-gray-900 w-max">7248455555</td>
            <td>
              <div className="flex flex-row items-center justify-center">
                <div
                  className="ml-5 p-[2px]"
                  onClick={() => toggleDetails("7248455555")}
                >
                  <FaChevronDown className="cursor-pointer" />
                </div>
              </div>
            </td>
          </tr>
          <tr className="border-b border-[#EFEEEB]">
            <td colSpan={3}>
              {openId == "7248455555" && (
                <div className="flex px-2 py-3 text-[#151515]">
                  <div className="flex flex-col w-1/2 ">
                    <h1 className="text-[16px] font-bold ">Address Details</h1>
                    <div className="flex">
                      <div className="flex flex-col">
                        <p className="mr-[10px]">Address</p>
                        <p className="mr-[10px]">City</p>
                        <p className="mr-[10px]">Area</p>
                        <p className="mr-[10px]">Landmark</p>
                        <p className="mr-[10px]">Pincode</p>
                      </div>
                      <div className="flex flex-col">
                        <p>
                          : Flat no. 6, Second floor, Rohine Residency, Guwhati,
                          282007
                        </p>
                        <p>: Manish Kumar </p>
                        <p>: Manish Kumar </p>
                        <p>: 724/2 </p>
                        <p>: 278702</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col w-1/2">
                    <h1 className="text-[16px] font-bold ">Message</h1>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Rhoncus arcu proin consequat auctor suscipit vel varius
                      tortor urna. Hendrerit mattis cras varius etiam lorem quam
                      nunc sed habitant.
                    </p>
                  </div>
                </div>
              )}
            </td>
          </tr>
          {/* ----------------------------------- */}
          <tr>
            <td className="px-4 py-3 w-max">Rakesh Kumar</td>
            <td className="px-4 py-3 text-gray-900 w-max">7248455909</td>
            <td>
              <div className="flex flex-row items-center justify-center">
                <div
                  className="ml-5 p-[2px]"
                  onClick={() => toggleDetails("7248455909")}
                >
                  <FaChevronDown className="cursor-pointer" />
                </div>
              </div>
            </td>
          </tr>
          <tr className="border-b border-[#EFEEEB]">
            <td colSpan={3}>
              {openId == "7248455909" && (
                <div className="flex px-2 py-3 text-[#151515]">
                  <div className="flex flex-col w-1/2 ">
                    <h1 className="text-[16px] font-bold ">Address Details</h1>
                    <div className="flex">
                      <div className="flex flex-col">
                        <p className="mr-[10px]">Address</p>
                        <p className="mr-[10px]">City</p>
                        <p className="mr-[10px]">Area</p>
                        <p className="mr-[10px]">Landmark</p>
                        <p className="mr-[10px]">Pincode</p>
                      </div>
                      <div className="flex flex-col">
                        <p>
                          : Flat no. 6, Second floor, Rohine Residency, Guwhati,
                          282007
                        </p>
                        <p>: Manish Kumar </p>
                        <p>: Manish Kumar </p>
                        <p>: 724/2 </p>
                        <p>: 278702</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col w-1/2">
                    <h1 className="text-[16px] font-bold ">Message</h1>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Rhoncus arcu proin consequat auctor suscipit vel varius
                      tortor urna. Hendrerit mattis cras varius etiam lorem quam
                      nunc sed habitant.
                    </p>
                  </div>
                </div>
              )}
            </td>
          </tr>
          {/* ----------------------------------- */}
          <tr>
            <td className="px-4 py-3 w-max">Rakesh Kumar</td>
            <td className="px-4 py-3 text-gray-900 w-max">7258955555</td>
            <td>
              <div className="flex flex-row items-center justify-center">
                <div
                  className="ml-5 p-[2px]"
                  onClick={() => toggleDetails("7258955555")}
                >
                  <FaChevronDown className="cursor-pointer" />
                </div>
              </div>
            </td>
          </tr>
          <tr className="border-b border-[#EFEEEB]">
            <td colSpan={3}>
              {openId == "7258955555" && (
                <div className="flex px-2 py-3 text-[#151515]">
                  <div className="flex flex-col w-1/2 ">
                    <h1 className="text-[16px] font-bold ">Address Details</h1>
                    <div className="flex">
                      <div className="flex flex-col">
                        <p className="mr-[10px]">Address</p>
                        <p className="mr-[10px]">City</p>
                        <p className="mr-[10px]">Area</p>
                        <p className="mr-[10px]">Landmark</p>
                        <p className="mr-[10px]">Pincode</p>
                      </div>
                      <div className="flex flex-col">
                        <p>
                          : Flat no. 6, Second floor, Rohine Residency, Guwhati,
                          282007
                        </p>
                        <p>: Manish Kumar </p>
                        <p>: Manish Kumar </p>
                        <p>: 724/2 </p>
                        <p>: 278702</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col w-1/2">
                    <h1 className="text-[16px] font-bold ">Message</h1>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Rhoncus arcu proin consequat auctor suscipit vel varius
                      tortor urna. Hendrerit mattis cras varius etiam lorem quam
                      nunc sed habitant.
                    </p>
                  </div>
                </div>
              )}
            </td>
          </tr>
          {/* ----------------------------------- */}
          <tr>
            <td className="px-4 py-3 w-max">Rakesh Kumar</td>
            <td className="px-4 py-3 text-gray-900 w-max">7248411111</td>
            <td>
              <div className="flex flex-row items-center justify-center">
                <div
                  className="ml-5 p-[2px]"
                  onClick={() => toggleDetails("7248411111")}
                >
                  <FaChevronDown className="cursor-pointer" />
                </div>
              </div>
            </td>
          </tr>
          <tr className="border-b border-[#EFEEEB]">
            <td colSpan={3}>
              {openId == "7248411111" && (
                <div className="flex px-2 py-3 text-[#151515]">
                  <div className="flex flex-col w-1/2 ">
                    <h1 className="text-[16px] font-bold ">Address Details</h1>
                    <div className="flex">
                      <div className="flex flex-col">
                        <p className="mr-[10px]">Address</p>
                        <p className="mr-[10px]">City</p>
                        <p className="mr-[10px]">Area</p>
                        <p className="mr-[10px]">Landmark</p>
                        <p className="mr-[10px]">Pincode</p>
                      </div>
                      <div className="flex flex-col">
                        <p>
                          : Flat no. 6, Second floor, Rohine Residency, Guwhati,
                          282007
                        </p>
                        <p>: Manish Kumar </p>
                        <p>: Manish Kumar </p>
                        <p>: 724/2 </p>
                        <p>: 278702</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col w-1/2">
                    <h1 className="text-[16px] font-bold ">Message</h1>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Rhoncus arcu proin consequat auctor suscipit vel varius
                      tortor urna. Hendrerit mattis cras varius etiam lorem quam
                      nunc sed habitant.
                    </p>
                  </div>
                </div>
              )}
            </td>
          </tr>
          {/* ----------------------------------- */}
        </tbody>
      </table>
    </>
  );
};

export default Contact;
