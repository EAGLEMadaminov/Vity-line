import React from "react";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { useGlobalContext } from "@/context";
import { BsClock } from "react-icons/bs";
import { SlClose } from "react-icons/sl";
function Modal({ data }) {
  const { setShowModal } = useGlobalContext();
  console.log(data);
  return (
    <div
      className=" z-[3] absolute left-0 top-0 right-0 bottom-0 bg-[#809291]"
      onClick={() => setShowModal(false)}
    >
      <div
        className="relative bg-white w-full top-[50%] translate-x-[-50%] translate-y-[-50%] left-[50%]  md:w-[500px] lg:w-[600px] p-3 lg:p-10  rounded-[18px] "
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute text-2xl  text-[#759495] top-2 lg:top-8 right-10"
          onClick={() => setShowModal(false)}
        >
          <SlClose className="text-[#759495]" />
        </button>
        <h1 className="text-black text-[32px]">{data.pill}</h1>
        <p className="text-[#1B3B3C] capitalize text-[20px]">{data.extraInformation}</p>
        <div className="flex justify-between flex-wrap mt-10 mb-5">
          <div className="flex w-[200px] md:w-[250px] lg:w-[300px]  p-2 border-b border-[#E9F6F6]">
            <MdOutlineCalendarMonth className="text-[20px] text-[#1BB7B5]" />
            <p className="text-[#759495] ml-2">Qo’llanish muddati</p>
          </div>
          <p className="text-[#1B3B3C] font-[500] p-2">10 kun</p>
        </div>
        <div className="flex justify-between flex-wrap mb-5">
          <div className="flex w-[200px] md:w-[250px] items-center lg:w-[300px]  p-2 border-b border-[#E9F6F6]">
            <BsClock className="text-[#1BB7B5]" />
            <p className="text-[#759495] ml-2">Qo’llanish soatlari</p>
          </div>
          <p className="text-[#1B3B3C] font-[500] p-2">{data.times}</p>
        </div>
        <div className="flex justify-between mb-5 flex-wrap">
          <div className="flex w-[200px] md:w-[250px] lg:w-[300px]  p-2 border-b border-[#E9F6F6]">
            <div className="bg-[url('../images/davolash/trash.png')] bg-no-repeat w-5"></div>
            <p className="text-[#759495] ml-2">Qo’llanish</p>
          </div>
          <p className="text-[#1B3B3C] font-[500] p-2">{data.period} kun</p>
        </div>

        <h2 className="text-[#1B3B3C] font-[600] text-[18px]">
          Qo’shimcha ma’lumotlar
        </h2>
        <p className="text-[#1B3B3C] capitalize text-[20px] mt-2">{data.extraInformation}</p>
      </div>
    </div>
  );
}

export default Modal;
