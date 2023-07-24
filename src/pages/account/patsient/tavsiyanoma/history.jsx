import React, { useEffect, useState } from "react";
import Image from "next/image";
import img from "../../../../images/cite-logo.png";
import { FiChevronDown } from "react-icons/fi";
import { RxExit } from "react-icons/rx";
import { CiGlobe } from "react-icons/ci";
import { BsArrowLeft } from "react-icons/bs";
import { RxCounterClockwiseClock } from "react-icons/rx";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { BsClock } from "react-icons/bs";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["register", "account"])),
    },
  };
}

function TavsiyanomaHistory() {
  const { t } = useTranslation();
  const [allRecom, setAllRecom] = useState("");
  const [hasInfo, setHasInfo] = useState(false);

  const router = useRouter();

  useEffect(() => {
    let token = localStorage.getItem("ptoken") || "";
    const fetchFunck = async () => {
      setHasInfo(false);

      const singResponse = await fetch(
        `https://vitainline.uz/api/v1/recommendations/patient?type=history`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const jsonData = await singResponse.json();
      setAllRecom(jsonData);

      if (singResponse.status === 200) {
        setHasInfo(true);
      }
    };
    fetchFunck();
  }, []);

  const GoToBackBtn = () => {
    router.push("/account/patsient/tavsiyanoma");
  };
  const handleExit = () => {
    window.location.pathname = "";
  };

  const addNewBtn = () => {
    router.push("/account/patsient/tavsiyanoma/add");
  };

  const ChangeLangBtn = (e) => {
    let lang = e.target.value;
    if (lang === "ru") {
      router.push("/ru/account/patsient/tavsiyanoma/history");
    } else {
      window.location.pathname = "/account/patsient/tavsiyanoma/history";
    }
  };
  let array = [];

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
                {t("account:recom")}
              </h3>
            </div>
            <div className="mr-10 flex items-center">
              <button className="px-[30px] dark:text-[#1B3B3C] font-[500] bg-[#F8FCFC] py-2 rounded-[12px] flex items-center">
                <RxCounterClockwiseClock className="mr-[13px]" />{" "}
                {t("account:history")}
              </button>
            </div>
          </div>
          <div className="flex flex-wrap">
            {hasInfo ? (
              allRecom.data.map((item) => {
                return (
                  <div className="flex mx-2 ml-5 mt-5 mb-20" key={item.id}>
                    <div className="border rounded-[12px] dark:text-[#1B3B3C] p-3 flex  shadow-[0px_6px_16px] shadow-[#EFF4F4] flex-col w-[305px]  ">
                      <div className="flex items-center  mb-2">
                        <span className="bg-[url('../images/tavsiyanoma/davleniya.png')]  bg-center  rounded-[32px] bg-[#EAF9FB] bg-no-repeat w-8 h-8"></span>
                        <p className="text-[#1B3B3C]  ml-2 font-[500] flex">
                          <p>{item.title}</p>
                        </p>
                      </div>
                      {item.times.map((time, index) => {
                        return (
                          <div
                            key={index}
                            className="flex items-center rounded-[8px] mb-3 px-2 h-[42px]   bg-[#E8FCEB] text-[12px]"
                          >
                            <BsClock className="text-[#1BB7B5] mx-2 ml-[14px]" />
                            <p>{time}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="w-[194px] text-center mx-auto my-[150px]">
                <span className="block bg-[url('../images/davolash/history.png')] mx-auto w-20 h-20 bg-center rounded-[80px] bg-[#EAF9FB] bg-no-repeat"></span>
                <p className="text-[#759495]">{t("account:no-info")}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TavsiyanomaHistory;
