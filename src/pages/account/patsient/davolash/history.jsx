import React, { useState, useEffect } from "react";
import Image from "next/image";
import img from "../../../../images/cite-logo.png";
import { FiChevronDown } from "react-icons/fi";
import { RxExit } from "react-icons/rx";
import { CiGlobe } from "react-icons/ci";
import { BsArrowLeft } from "react-icons/bs";
import { RxCounterClockwiseClock } from "react-icons/rx";
import { AiOutlinePlus } from "react-icons/ai";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { BsClock } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["register", "account"])),
    },
  };
}

function Davolash() {
  const { t } = useTranslation();
  const router = useRouter();
  const [hasInfo, setHasInfo] = useState(false);
  const [hillInfo, setHilInfo] = useState("");

  const GoToBackBtn = () => {
    router.push("/account/patsient/davolash");
  };
  const handleExit = () => {
    window.location.pathname = "";
  };

  const addNewBtn = () => {
    router.push("/account/patsient/davolash/add");
  };

  const ChangeLangBtn = (e) => {
    let lang = e.target.value;
    if (lang === "ru") {
      router.push("/ru/account/patsient/davolash/history");
    } else {
      window.location.pathname = "/account/patsient/davolash/history";
    }
  };

  const fetchFunck = async () => {
    setHasInfo(false);
    let token = localStorage.getItem("ptoken");
    const response = await fetch(
      `https://vitainline.uz/api/v1/healings/patient?type=history`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const jsonData = await response.json();
    console.log(jsonData);

    if (response.status === 200) {
      setHilInfo(jsonData);
      setHasInfo(true);
    }
  };
  useEffect(() => {
    fetchFunck();
  }, []);

  console.log(hillInfo.endedDate)
  return (
    <div className="min-h-[100vh]  bg-[#F7FEFE]">
      <div className="w-[1035px] mx-auto">
        {/* head */}
        <div className="flex h-[60px] pt-9 justify-between">
          <div className="flex">
            <Image src={img} width={50} height={50} alt="logo" />
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
              className="w-[200px] ml-[18px] flex py-[5px]  px-[18px]items-center h-[36px] text-[#FF0000] border rounded-[12px] border-[#D7E6E7]"
              onClick={handleExit}
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
                {t("account:davo")}{" "}
              </h3>
            </div>
            <div className="mr-10 flex items-center">
              <button className="px-[30px] dark:text-[#1B3B3C] font-[500] bg-[#F8FCFC] py-2 rounded-[12px] flex items-center">
                <RxCounterClockwiseClock className="mr-[13px]" />{" "}
                {t("account:history")}
              </button>
              <button
                className="bg-[#1BB7B5] py-2 rounded-[12px] ml-5 flex items-center text-white px-[30px] "
                onClick={addNewBtn}
              >
                <AiOutlinePlus className="font-[500] mr-4" />{" "}
                {t("account:add_new")}
              </button>
            </div>
          </div>
          {hasInfo ? (
            <div className="flex flex-wrap ml-8 mt-5">
              {hillInfo.data.map((item, index) => {
                return (
                  <div key={index} className="border rounded-[12px] mt-5 shadow-[0px_6px_16px] shadow-[#EFF4F4] p-3 flex flex-col w-[305px] ml-4 cursor-pointer">
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
    </div>
  );
}

export default Davolash;
