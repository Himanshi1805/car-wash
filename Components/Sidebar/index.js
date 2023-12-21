import { useState, useContext } from "react";
import Router from "next/router";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import {auth} from '../../config/firebase/index'
import {signOut} from "firebase/auth";
import { UserContext } from '../../context/UserContext';
import { toast } from "react-toastify";


const Sidebar = () => {

  const context = useContext(UserContext)
  const [bookingOpen, setBookingOpen] = useState(false);

  const LogoutFun = () => { 
    close();
      signOut(auth)
      .then(() => {
        context.setIsUser({status:false, user: null});
        toast.warn("You have been logged out");
        Router.push('/');
      })
      .catch((error) => {
        toast.error(error)
      });
  };


  return (
    <>
      <ul>
        <li
          className="flex justify-between items-center py-2 ml-[70px] cursor-pointer mt-1 text-white"
          onClick={() => {
            setBookingOpen(!bookingOpen);
            // Router.push("/booking");
          }}
        >
          Bookings
          {bookingOpen ? (
            <FaChevronUp className="mr-4" />
          ) : (
            <FaChevronDown className="mr-4" />
          )}
        </li>
        {bookingOpen && (
          <ul className="px-4">
            <li
              className="text-white text-center py-2 cursor-pointer"
              onClick={() => Router.push("/booking?type=One_time_wash")}
            >
              One time wash
            </li>
            <li
              className="text-white text-center py-2 border-b cursor-pointer"
              onClick={() => Router.push("/booking?type=subscription_wash")}
            >
              Subscription wash
            </li>
          </ul>
        )}
        <li
          className="py-4 ml-[70px] cursor-pointer mt-1 text-white"
          onClick={() => Router.push("/partners")}
        >
          Partners
        </li>
        <li
          className="py-4 ml-[70px] cursor-pointer mt-1 text-white"
          onClick={() => Router.push("/addplans")}
        >
          Plans
        </li>
        <li
          className="py-4 ml-[70px] cursor-pointer mt-1 text-white"
          onClick={() => Router.push("/addcouponcodes")}
        >
          Coupon Codes
        </li>
        <li
          className="py-4 ml-[70px] cursor-pointer mt-1 text-white"
          onClick={() => Router.push("/contact")}
        >
          Contact
        </li>
        <li
          className="py-4 ml-[70px] cursor-pointer mt-1 text-white"
          onClick={() => Router.push("/pincode")}
        >
          Pin Codes
        </li>
        <li className="py-4 ml-[70px] cursor-pointer mt-1 text-white">
          GPS tracking
        </li>
        <li
          className="py-4 ml-[70px] cursor-pointer mt-1 text-white"
          onClick={() => Router.push("/addon")}
        >
          Add Ons
        </li>
        <li className="py-4 ml-[70px] cursor-pointer mt-1 text-white" onClick={LogoutFun}>
          Logout
        </li>
      </ul>
    </>
  );
};

export default Sidebar;
