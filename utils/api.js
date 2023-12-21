import { async } from "@firebase/util";
import { updateDoc } from "firebase/firestore";

import {
  doc,
  setDoc,
  Timestamp,
  addDoc,
  collection,
  getDoc,
  query,
  onSnapshot,
  limit,
  getDocs,
  startAfter,
  startAt,
  orderBy,
  where,
  deleteDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../config/firebase";
import { modelName as collectionNames } from "./collections"

let pageperLimit = 50;

const modelName = collectionNames;
const { ONE_TIME_BOOKING, SUBSCRIPTION_BOOKING, ASSIGNED_ORDER, PARTNERS, PLANS, ADDON, PINCODE, COUPON } = modelName;

const assignOrder = async () => {
  const colref = collection(db, ASSIGNED_ORDER);
  const initialState = {
    date: "24/11/2001",
    remarks: "He is the best guy i ever meet",
    assignto: "ANKUR Thakur",
    time: "2:53",
    timestamp: "123",
  };
  let data = await addDoc(colref, initialState);
};

const getFilterText = async (text, collectionName) => {
  let brr = [];
  const colref = collection(db, collectionName);
  let q = query(colref, where("orderNo", "==", parseInt(text)));
  let val = await getDocs(q);
  val.docs.forEach((doc) => {
    brr.push(doc.data());
  });
  return brr;
};

const addPartner = async (labourData) => {
  const colref = collection(db, PARTNERS);
  let data = await addDoc(colref, labourData);
};

const getPartner = async () => {
  let arr = [];
  const q = query(collection(db, PARTNERS));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    arr.push({ ...doc.data(), id: doc.id });
  });
  return arr;
};

const assignPartners = async (data, collection, id) => {
  const updateBooking = doc(db, collection, id);
  await updateDoc(updateBooking, data);
};

const getPincode = async () => {
  const q = query(collection(db, PINCODE));
  let arr = [];
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    arr.push({ ...doc.data(), id: doc.id });
  });
  return arr;
};

const getAddon = async () => {
  const q = query(collection(db, ADDON), orderBy("timestamp", "desc"));
  let arr = [];
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    arr.push({ ...doc.data(), id: doc.id });
  });
  return arr;
};

const getCoupon =  async () => {
  const q = query(collection(db, COUPON), orderBy("timestamp", "desc"));
  let arr = [];
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    arr.push({ ...doc.data(), id: doc.id });
  });
  return arr;
};

const deleteDocument = async (collection, id) => {
  let dlt = await deleteDoc(doc(db, collection, id));
  return toast.success("Successfully Deleted");
};

const savePincode = async (pinData) => {
  const colref = collection(db, PINCODE);
  let data = await addDoc(colref, pinData);
  return data;
};

const saveAddon = async (addonData) => {
  const colref = collection(db, ADDON);
  let data = await addDoc(colref, addonData);
  return data;
};

const saveCoupon = async (couponData) => {
  const colref = collection(db, COUPON);
  let data = await addDoc(colref, couponData);
  return data;
};

const addData = async (parsedData, collectionName) => {
  const colref = collection(db, collectionName);
  let data = await addDoc(colref, parsedData);
};
const getPlans = async () => {
  let arr = [];
  const q = query(collection(db, PLANS));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    arr.push({ ...doc.data(), id: doc.id });
  });
  return arr;
}

const assignFilter = async (data, collectionName) => {
  let brr = [];
  const colref = collection(db, collectionName);
  let q = query(colref, where("Status", "==",data));
  let val = await getDocs(q);
  val.docs.forEach((doc) => {
    brr.push(doc.data());
  });
  return brr;
};

const getAllPinCodes = async () => {
  const q = query(collection(db, PINCODE), orderBy("timestamp", "desc"));
  let arr = [];
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    arr.push({ ...doc.data(), id: doc.id });
  });
  return arr;
}

export {
  assignOrder,
  addPartner,
  getFilterText,
  deleteDocument,
  savePincode,
  saveAddon,
  getPincode,
  getAddon,
  getCoupon,
  saveCoupon,
  addData,
  getPlans,
  assignFilter,
  getPartner,
  assignPartners,
  getAllPinCodes,
 };
