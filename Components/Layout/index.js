import React from 'react'
import Sidebar from "../../Components/Sidebar/index";
import { mainContents } from "../../styles/Home.module.css";
import Navbar from "../../Components/Navbar/index";


export default function Layout({children}) {
  return (
    <div className="flex flex-col min-h-screen">
    <Navbar />
    <div className="flex flex-row min-h-full">
      <div className="w-[255px] bg-[#141414] pt-[100px]">
        <Sidebar />
      </div>
      <section className={mainContents}>
        <div className="mx-auto my-5 w-[90%] px-[100px] border-2 border-[#EFEEEB] rounded-2xl">
          <div>
           {children}
          </div>
        </div>
      </section>
    </div>
  </div>
  )
}
