import React, { useState, useEffect } from "react";
import {
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
  getMetadata,
} from "firebase/storage";
import { storage } from "../../config/firebase";
import { Timestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import { addData } from "../../utils/api";
import { modelName } from "../../utils/collections";
import { AiFillCloseCircle } from "react-icons/ai";
import { modalConfig } from "../config/model";

const PartnerModal = ({props}) => {

  let initialState = {
    name: "",
    phone: "",
    documentType: "",
    documentId: "",
    joiningDate: "",
    city: "",
    address: "",
    area: "",
    landmark: "",
    pinCode: "",
    fromTime: "",
    toTime: "",
    profileImg: "",
    aadharImg: "",
    partnerId: Timestamp.now().seconds,
    timestamp: Timestamp.now(),  

  };


  const [labourInfo, setLaourInfo] = useState(initialState)
  const [uploadStatus, setUploadStatus] = useState(false)

  const { modalState, setModalState } = props;

  // UPLOAD FILE
  const onUpload = (e, docType) => {
    toast("Uploading the File:Please Wait", {
      type: "info",
      toastId: "1",
    });

    const file = e.target.files[0];
    setUploadStatus(true);

    /** @type {any} */
    const metadata = {
      contentType: "application/jpg",
    };

    const storageRef = ref(storage, "Labour Files/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        switch (snapshot.state) {
          case "paused":
            break;
          case "running":
            break;
        }
      },
      (error) => {
        switch (error.code) {
          case "storage/unauthorized":
            break;
          case "storage/canceled":
            break;
          case "storage/unknown":
            break;
        }
        setUploadStatus(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          let key = docType;
          if (key == "profileImg") {
            setLaourInfo({ ...labourInfo, profileImg: downloadURL });
          } else {
            setLaourInfo({ ...labourInfo, aadharImg: downloadURL });
          }
          toast.update("1", {
            render: "File has been successfully uploaded",
            type: "success",
            autoClose: 5000,
          });
          setUploadStatus(false);
        });
      }
    );
  };

  const addParner = async () => {
    // setLaourInfo({ ...labourInfo, partnerId: initialState.timestamp.seconds});
    let val = await addData(labourInfo, modelName.PARTNERS);
    setModalState(modalConfig.MODEL_DONE);
    // console.log(initialState.timestamp.seconds);
    console.log(initialState.partnerId);
    // location.reload();
  }

  return (
    <div className="absolute flex flex-col top-10 rounded-[10px] w-[700px]">
      <div className="bg-[#303030] relative mb-10 p-8 rounded-[10px]">
        <button className="btn text-white cursor-pointer absolute top-[4px] right-[4px] text-4xl "

          onClick={() => setModalState(modalConfig.MODEL_DESTROYED)}

        >
          <AiFillCloseCircle />
        </button>
        {/* <div className="absolute right-3 top-2 bg-[#3030303] p-3 rounded-full cursor-pointer">
          X
        </div> */}
        <h1 className="text-[18px] font-bold text-[#FFFFFF] mb-5">
          ADD PARTNER
        </h1>
        <div className="flex flex-col md:flex-row gap-3 md:gap-[22px] mb-5 w-full">
          <div className="w-full md:w-[34%]">
            <label
              htmlFor="name"
              className="block mb-1 font-semibold text-white text-semibold text-[15px]"
            >
              Name *
            </label>
            <input
              type="text"
              name="name"
              placeholder="Ram kumar"
              className="w-full text-[14px] px-4 py-[10px] rounded outline-none"
              onChange={(e) => {
                setLaourInfo({ ...labourInfo, name: e.target.value });
              }}
            />
          </div>
          <div className="w-full md:w-[33%]">
            <label
              htmlFor="phone"
              className="block mb-1 font-semibold text-white text-semibold text-[15px]"
            >
              Phone *
            </label>
            <input
              type="number"
              name="phone"
              placeholder="65224944094"
              className="w-full bg-white text-[14px] px-4 py-[10px] rounded outline-none"
              onChange={(e) => {
                setLaourInfo({ ...labourInfo, phone: e.target.value });
              }}
            />
          </div>
        </div>

        <div className="flex flex-col mb-5">
          <div className="flex flex-row space-x-10 mb-4">
            <div className="flex items-center space-x-3 ">
              <label
                htmlFor="joining"
                className="block font-semibold text-white text-semibold text-[15px]"
              >
                Aadhar Number *
              </label>
              <input type="radio" name="aadhar" value="Aadhar" className="cursor-pointer"
                onChange={(e) => {
                  setLaourInfo({ ...labourInfo, documentType: e.target.value });
                }}
              />
            </div>
            <div className="flex items-center space-x-3 ">
              <label
                htmlFor="joining"
                className="block font-semibold text-white text-semibold text-[15px]"
              >
                Voter ID *
              </label>
              <input type="radio" name="voter" value="VoterID" className="cursor-pointer"
                onChange={(e) => {
                  setLaourInfo({ ...labourInfo, documentType: e.target.value });
                }}
              />
            </div>
          </div>
          <div>
            <input
              type="text"
              name="documentid"
              placeholder="8978 8976 8907 7894"
              className="w-[35%] bg-white text-[14px] px-4 py-[10px] rounded outline-none"
              onChange={(e) => {
                setLaourInfo({ ...labourInfo, documentId: e.target.value });
              }}
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-3 md:gap-[22px] mb-5 w-full">
          <div className="w-full md:w-[34%]">
            <label
              htmlFor="joining"
              className="block mb-1 font-semibold text-white text-semibold text-[15px]"
            >
              Joining Date *
            </label>
            <input
              type="date"
              name="joining"
              className="w-full text-[14px] px-4 py-[10px] rounded outline-none"
              onChange={(e) => {
                setLaourInfo({ ...labourInfo, joiningDate: e.target.value });
              }}
            />
          </div>
          <div className="w-full md:w-[33%]">
            <label
              htmlFor="city"
              className="block mb-1 font-semibold text-white text-semibold text-[15px]"
            >
              City *
            </label>
            <input
              type="text"
              name="city"
              placeholder="Guwahati"
              className="w-full bg-white text-[14px] px-4 py-[10px] rounded outline-none"
              onChange={(e) => {
                setLaourInfo({ ...labourInfo, city: e.target.value });
              }}
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-3 md:gap-[22px] mb-5 w-full">
          <div className="w-full ">
            <label
              htmlFor="address"
              className="block mb-1 font-semibold text-white text-semibold text-[15px]"
            >
              Address *
            </label>
            <input
              type="text"
              name="address"
              placeholder="Flat no. 6, Second floor, Rohine Residency"
              className="w-full text-[14px] px-4 py-[10px] rounded outline-none"
              onChange={(e) => {
                setLaourInfo({ ...labourInfo, address: e.target.value });
              }}
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-3 md:gap-[22px] mb-5 w-full">
          <div className="w-full md:w-[34%]">
            <label
              htmlFor="area"
              className="block mb-1 font-semibold text-white text-semibold text-[15px]"
            >
              Area *
            </label>
            <input
              type="text"
              name="area"
              placeholder="Maan Chowk"
              className="w-full text-[14px] px-4 py-[10px] rounded outline-none"
              onChange={(e) => {
                setLaourInfo({ ...labourInfo, area: e.target.value });
              }}
            />
          </div>
          <div className="w-full md:w-[33%]">
            <label
              htmlFor="landmark"
              className="block mb-1 font-semibold text-white text-semibold text-[15px]"
            >
              Landmark *
            </label>
            <input
              type="text"
              name="landmark"
              placeholder="Vinayak Hospital"
              className="w-full bg-white text-[14px] px-4 py-[10px] rounded outline-none"
              onChange={(e) => {
                setLaourInfo({ ...labourInfo, landmark: e.target.value });
              }}
            />
          </div>
          <div className="w-full md:w-[33%]">
            <label
              htmlFor="pincode"
              className="block mb-1 font-semibold text-white text-semibold text-[15px]"
            >
              Pin Code *
            </label>
            <input
              type="number"
              name="pincode"
              placeholder="282007"
              className="w-full bg-white text-[14px] px-4 py-[10px] rounded outline-none"
              onChange={(e) => {
                setLaourInfo({ ...labourInfo, pinCode: e.target.value });
              }}
            />
          </div>
        </div>

        <div className="flex flex-col mb-5">
          <h2>Working Hour</h2>
        </div>

        <div className="flex flex-col md:flex-row gap-3 md:gap-[22px] mb-5 w-full">
          <div className="w-full md:w-[34%]">
            <label
              htmlFor="fromtime"
              className="block mb-1 font-semibold text-white text-semibold text-[15px]"
            >
              From *
            </label>
            <input
              type="time"
              name="fromtime"
              placeholder="10:00AM"
              className="w-full text-[14px] px-4 py-[10px] rounded outline-none"
              onChange={(e) => {
                setLaourInfo({ ...labourInfo, fromTime: e.target.value });
              }}
            />
          </div>
          <div className="w-full md:w-[33%]">
            <label
              htmlFor="endtime"
              className="block mb-1 font-semibold text-white text-semibold text-[15px]"
            >
              To *
            </label>
            <input
              type="time"
              name="endtime"
              placeholder="10:00AM"
              className="w-full bg-white text-[14px] px-4 py-[10px] rounded outline-none"
              onChange={(e) => {
                setLaourInfo({ ...labourInfo, toTime: e.target.value });
              }}
            />
          </div>
        </div>

        {/* upload profile picture */}
        <div className="flex flex-col md:flex-row gap-3 md:gap-[22px] mb-5 w-full">
          <div className="w-full">
            <label
              htmlFor="profile"
              className="block mb-1 font-semibold text-white text-semibold text-[15px]"
            >
              Upload Profile Picture
            </label>
            <input type="file" disabled={uploadStatus} onChange={(e) => {
              onUpload(e, "profileImg")
            }} />
          </div>
        </div>

        {/* upload aadhar */}
        <div className="flex flex-col md:flex-row gap-3 md:gap-[22px] mb-5 w-full">
          <div className="w-full">
            <label
              htmlFor="profile"
              className="block mb-1 font-semibold text-white text-semibold text-[15px]"
            >
              Upload Aadhar
            </label>
            <input disabled={uploadStatus} type="file"
              onChange={(e) => {
                onUpload(e, "aadharImg")
              }}
            />
          </div>
        </div>

        <div className="bg-[#FFC044] w-[60%] mx-auto rounded-md">
          <button className="w-full py-[14px] text-black" disabled={uploadStatus} onClick={addParner}>Add</button>
        </div>
      </div>
    </div>
  );
};

export default PartnerModal;