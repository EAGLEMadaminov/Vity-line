import React, { useState } from "react";
import Image from "next/image";
import img from "../../../../images/cite-logo.png";
import { FiChevronDown } from "react-icons/fi";
import { RxExit } from "react-icons/rx";
import { CiGlobe } from "react-icons/ci";
import { BsArrowLeft } from "react-icons/bs";
import { RxCounterClockwiseClock } from "react-icons/rx";
import { AiOutlinePlus } from "react-icons/ai";
import { BsClock } from "react-icons/bs";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useEffect } from "react";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["register", "account"])),
    },
  };
}

function History() {
  const { t } = useTranslation();
  const router = useRouter();
  const [hasInfo, setHasInfo] = useState(false);
  const [consInfo, setConsInfo] = useState("");
  const [token, setToken] = useState("");

  const handleTavsiyahistoryBtn = () => {
    router.push("/account/patsient/konsultatsiya/history");
  };
  const GoToBackBtn = () => {
    router.push("/account/patsient/konsultatsiya");
  };
  const handleExit = () => {
    window.location.pathname = "";
  };
  const showFormBtn = () => {};

  const ChangeLangBtn = (e) => {
    let lang = e.target.value;
    if (lang === "ru") {
      router.push("/ru/account/patsient/konsultatsiya/history");
    } else {
      window.location.pathname = "/account/patsient/konsultatsiya/history";
    }
  };

  const fetchFunck = async () => {
    const response = await fetch(
      "https://vitainline.uz/api/v1/consultations/patient?type=history",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const jsonData = await response.json();
    if (response.status === 200 && jsonData.data !== []) {
      setConsInfo(jsonData);
      setHasInfo(true);
    }
  };

  useEffect(() => {
    let value;
    value = localStorage.getItem("ptoken") || "";
    setToken(value);
    fetchFunck();
  }, [value]);

  return (
    <div className="h-[100vh]  bg-[#F7FEFE]">
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
            <div className="flex w-[111px] dark:text-[#1B3B3C] h-[36px] items-center relative justify-between border border-[#D7E6E7] px-2 rounded-[12px]">
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
        <div className="bg-white border border-[#D7E6E7] min-h-[500px] rounded-[24px] mt-6">
          <div className="flex justify-between mt-7 mb-3">
            <div className="flex items-center">
              <button
                className="flex items-center dark:text-[#1B3B3C] ml-[40px] py-1 bg-[#F8FCFC] border rounded-[12px] w-[188px] font-[500]"
                onClick={GoToBackBtn}
              >
                <BsArrowLeft className="mx-3" /> {t("account:go_back_btn")}
              </button>
              <h3 className="text-[24px] ml-[18px] text-[#1B3B3C]">
                {t("account:history")}
              </h3>
            </div>
          </div>

          {hasInfo ? (
            <div>
              {consInfo.data.map((item, index) => {
                return (
                  <div key={index}>
                    <div className=" text-center dark:text-[#1B3B3C]  mx-10">
                      <h2 className="davolash-line w-[875px] mx-10">
                        22.05.2023
                      </h2>
                    </div>

                    <div className="flex mx-10 mt-5 mb-20">
                      <div
                        className="border rounded-[12px] p-3 flex  flex-col  shadow-[0px_6px_16px] shadow-[#EFF4F4] w-[305px] cursor-pointer "
                        onClick={showFormBtn}
                      >
                        <div className="flex items-center mb-2">
                          <div className="bg-[url('../images/konsultatsiya/doctor.png')] object-cover bg-center bg-no-repeat w-8 h-8"></div>
                          <p className="text-[#1B3B3C]  ml-2 font-[500]">
                            {t("account:consult_with")}
                          </p>
                        </div>

                        <div className=" dark:text-[#1B3B3C] flex items-center mb-3 rounded-[8px] px-2 h-[42px]  bg-[#E8FCEB] text-[12px]">
                          <p className="bg-[url('../images/davolash/sand-clock.png')] bg-no-repeat w-4 h-5"></p>
                          <BsClock className="text-[#1BB7B5] mx-2 ml-3" />
                          <p>12:00</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="w-[194px] text-center mx-auto my-[120px]">
              <span className="block bg-[url('../images/davolash/history.png')] mx-auto w-20 h-20 bg-center rounded-[80px] bg-[#EAF9FB] bg-no-repeat"></span>
              <p className="text-[#759495]">{t("account:no-info")}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default History;
