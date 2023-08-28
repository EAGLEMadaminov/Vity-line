import React, { useState, useEffect } from "react";
import Image from "next/image";
import img from "../../../../images/cite-logo.png";
import { FiChevronDown } from "react-icons/fi";
import { RxExit } from "react-icons/rx";
import { CiGlobe } from "react-icons/ci";
import { BsArrowLeft } from "react-icons/bs";
import { RxCounterClockwiseClock } from "react-icons/rx";
import { AiOutlinePlus } from "react-icons/ai";
import { BsClock } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useGlobalContext } from "@/context";
import dynamic from "next/dynamic";

const DynamicModal = dynamic(() => import("@/components/Davolash/modal"), {
  ssr: false,
});
import Link from "next/link";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["register", "account"])),
    },
  };
}

function Davolash() {
  const { t } = useTranslation();
  const { showModal, setShowModal } = useGlobalContext();
  const [hasInfo, setHasInfo] = useState(false);
  const [hillInfo, setHillInfo] = useState("");
  const [loading, setLoading] = useState(true);
  const [itemInfo, setItemInfo] = useState({});

  const router = useRouter();

  const GoToBackBtn = () => {
    router.push("/account/patsient");
  };
  const handleExit = () => {
    localStorage.clear();
    window.location.pathname = "";
  };
  const showFormBtn = () => {
    setShowModal(true);
  };

  const ChangeLangBtn = (e) => {
    let lang = e.target.value;
    if (lang === "ru") {
      router.push("/ru/account/patsient/davolash");
    } else {
      window.location.pathname = "/account/patsient/davolash";
    }
  };

  const fetchFunck = async () => {
    setHasInfo(false);
    const token = localStorage.getItem("ptoken");
    const response = await fetch(
      `https://vitainline.uz/api/v1/healings/patient?type=current`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const jsonData = await response.json();

    if (response.status === 200 && jsonData.data) {
      setHillInfo(jsonData);
      setHasInfo(true);
    }
  };
  useEffect(() => {
    fetchFunck();
  }, []);

  setTimeout(() => {
    setLoading(false);
  }, 1000);
  return (
    <div className="min-h-[100vh]  bg-[#F7FEFE]">
      <div className="w-[1035px] mx-auto">
        {/* head */}
        <div className="flex h-[60px] pt-9 justify-between">
          <div className="flex">
            <Image
              src={img}
              width={50}
              height={50}
              alt="logo"
              className="w-auto"
            />
            <p className="text-black font-[500]">
              Vita in <span className="text-[#57D0CF]">line</span>
            </p>
          </div>
          <div className="flex">
            <div className="flex w-[111px] h-[36px] dark:text-[#1B3B3C] items-center relative justify-between border border-[#D7E6E7] px-2 rounded-[12px]">
              <CiGlobe className="text-[#1BB7B5] text-xl" />
              <select
                onChange={ChangeLangBtn}
                style={{ WebkitAppearance: "none" }}
                className="outline-none  bg-[#F5FAFB] px-2 absolute ml-7 pr-10  bg-transparent font-[500] "
              >
                <option value="uz">UZ</option>
                <option value="ru">RU</option>
              </select>
              <FiChevronDown className="text-xl" />
            </div>
            <button
              onClick={handleExit}
              className="w-[200px] ml-[18px] flex py-[5px]  px-[18px]items-center h-[36px] text-[#FF0000] border rounded-[12px] border-[#D7E6E7]"
            >
              <RxExit className="mx-2 my-auto" /> {t("account:exit_account")}
            </button>
          </div>
        </div>

        {/* body  */}
        <div className="bg-white border border-[#D7E6E7] rounded-[24px] mt-6">
          <div className="flex justify-between mt-7 mb-3">
            <div className="flex items-center">
              <button
                className="flex items-center dark:text-[#1B3B3C] ml-[40px] py-1 bg-[#F8FCFC] border rounded-[12px] w-[188px] font-[500]"
                onClick={GoToBackBtn}
              >
                <BsArrowLeft className="mx-3" /> {t("account:go_back_btn")}
              </button>
              <h3 className="text-[24px] ml-[18px] text-[#1B3B3C]">
                {t("account:davo")}
              </h3>
            </div>
            <div className="mr-10 flex items-center">
              <Link
                className="px-[30px] bg-[#F8FCFC] dark:text-[#1B3B3C] font-[500] py-2 rounded-[12px] flex items-center"
                href="/account/patsient/davolash/history"
              >
                <RxCounterClockwiseClock className="mr-[13px]" />{" "}
                {t("account:history")}
              </Link>
              <Link
                className="bg-[#1BB7B5] py-2 rounded-[12px] ml-5 flex items-center text-white px-[30px] "
                href="/account/patsient/davolash/add"
              >
                <AiOutlinePlus className="font-[500] mr-4" />{" "}
                {t("account:add_new")}
              </Link>
            </div>
          </div>
          <div className=" text-center  mx-10">
            <h2 className="davolash-line w-[875px] dark:text-[#1B3B3C] mx-10">
              {t("account:today")}
            </h2>
          </div>

          {hasInfo ? (
            <div className="flex flex-wrap ml-8">
              {hillInfo.data.map((item, index) => {
                return (
                  <div key={index} className="flex mx-2 mt-5 mb-20">
                    {showModal ? <DynamicModal data={itemInfo} /> : ""}
                    <div
                      className="border rounded-[12px] p-3 flex shadow-[0px_6px_16px] shadow-[#EFF4F4] flex-col w-[305px] cursor-pointer "
                      onClick={() => {
                        setShowModal(true), setItemInfo(hillInfo.data[index]);
                      }}
                    >
                      <div className="flex items-center mb-2">
                        <div className="bg-[url('../images/davolash/davolash-dori.png')] bg-no-repeat w-8 h-8"></div>
                        <p className="text-[#1B3B3C]  ml-2 font-[500]">
                          {item.pill}
                        </p>
                        <AiOutlineExclamationCircle className="rotate-180 text-[#1BB7B5] text-[18px] ml-3" />
                      </div>
                      {item.times.map((time, idx) => {
                        return (
                          <div
                            key={idx}
                            className="flex items-center mb-3 rounded-[8px] px-2 h-[42px] justify-between  bg-[#E8FCEB] text-[12px]"
                          >
                            <BsClock className="text-[#1BB7B5] " />
                            <p className="dark:text-[#1B3B3C]">{time}</p>
                            <p className="text-[#86BC8E]  ">
                              {item.quantity} {t("account:num_drug")}
                            </p>
                            <RxDotFilled className="text-[#1BB7B5]" />
                            <p className="text-[#86BC8E] ">{item.type}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="w-[194px] text-center mx-auto my-[150px]">
              <span className="block bg-[url('../images/davolash/history.png')] mx-auto w-20 h-20 bg-center rounded-[80px] bg-[#EAF9FB] bg-no-repeat"></span>
              <p className="text-[#759495]">{t("account:no-info")}</p>
            </div>
          )}
        </div>
      </div>
      {loading ? (
        <div className="z-[2] absolute left-0 bottom-0 right-0 top-0 bg-[rgba(0,0,0,0.2)] ">
          <div className="pl1">
            <div className="pl1__a"></div>
            <div className="pl1__b"></div>
            <div className="pl1__c"></div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Davolash;
