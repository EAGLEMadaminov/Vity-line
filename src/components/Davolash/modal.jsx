import React from "react";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { useGlobalContext } from "@/context";
import { BsClock } from "react-icons/bs";
import { SlClose } from "react-icons/sl";
function Modal() {
  const { setShowModal } = useGlobalContext();

  return (
    <div className=" z-[3] absolute top-0 left-0 right-0 bottom-0 bg-[#809291]">
      <div className="relative bg-white w-full  md:w-[500px] lg:w-[600px] p-3 lg:p-10 mx-auto mt-[70px] rounded-[18px]">
        <button
          className="absolute text-2xl  text-[#759495] top-2 lg:top-8 right-10"
          onClick={() => setShowModal(false)}
        >
          <SlClose className="text-[#759495]" />
        </button>
        <h1 className="text-black text-[32px]">Parasetomol 500 mg</h1>
        <p className="text-[#1B3B3C] ">
          Parasetomol preparadi istima tushirish uchun eng samarali dorilardan
          biri hisoblanadi
        </p>
        <div className="flex justify-between flex-wrap mt-10 mb-5">
          <div className="flex w-[200px] md:w-[250px] lg:w-[300px]  p-2 border-b border-[#E9F6F6]">
            <MdOutlineCalendarMonth className="text-[20px] text-[#1BB7B5]" />
            <p className="text-[#759495] ml-2">Qo’llanish muddati</p>
          </div>
          <p className="text-[#1B3B3C] font-[500] p-2">15 kun</p>
        </div>
        <div className="flex justify-between flex-wrap mb-5">
          <div className="flex w-[200px] md:w-[250px] items-center lg:w-[300px]  p-2 border-b border-[#E9F6F6]">
            <BsClock className="text-[#1BB7B5]" />
            <p className="text-[#759495] ml-2">Qo’llanish soatlari</p>
          </div>
          <p className="text-[#1B3B3C] font-[500] p-2">9:00,12:00,18:00</p>
        </div>
        <div className="flex justify-between mb-5 flex-wrap">
          <div className="flex w-[200px] md:w-[250px] lg:w-[300px]  p-2 border-b border-[#E9F6F6]">
            <div className="bg-[url('../images/davolash/trash.png')] bg-no-repeat w-5" ></div>
            <p className="text-[#759495] ml-2">Qo’llanish</p>
          </div>
          <p className="text-[#1B3B3C] font-[500] p-2">15 kun</p>
        </div>

        <h2 className="text-[#1B3B3C] font-[600] text-[18px]">
          Qo’shimcha ma’lumotlar
        </h2>
        <p className="text-[#1B3B3C] mt-2">
          Parasetamol preparadini 5 kunda davomida xar 3 soatda och qoringa
          qo’llanish tavsiya qilinadi.
        </p>
      </div>
    </div>
  );
}

export default Modal;
