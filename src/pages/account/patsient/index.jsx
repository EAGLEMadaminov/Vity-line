import React, { useEffect, useState } from "react";
import Image from "next/image";
import img from "../../../images/cite-logo.png";
import { FiChevronDown } from "react-icons/fi";
import { RxExit } from "react-icons/rx";
import { IoMdPerson } from "react-icons/io";
import { CiGlobe } from "react-icons/ci";
import { BsArrowLeft } from "react-icons/bs";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { GoLocation } from "react-icons/go";
import { VscBriefcase } from "react-icons/vsc";
import { FiChevronRight } from "react-icons/fi";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useGlobalContext } from "@/context";
import Link from "next/link";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["register", "account"])),
    },
  };
}

function Patsient() {
  const { t } = useTranslation();
  const { patsientInfo, setPatsientInfo } = useGlobalContext();
  const [token, setToken] = useState("");
  const router = useRouter();

  const fetchFunck = async () => {
    if (token) {
      let singResponse;
      let jsonData;
      try {
        singResponse = await fetch("https://vitainline.uz/api/v1/auth/user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        jsonData = await singResponse.json();
      } catch (error) {
        console.log(error);
      }
      // console.log(singResponse.status);
      setPatsientInfo(jsonData.data);
    }
  };
  useEffect(() => {
    let value;
    value = localStorage.getItem("ptoken") || "";
    setToken(value);
  }, []);

  fetchFunck();

  const handleKonsultant = () => {
    // router.push("/account/patsient/konsultatsiya");
  };
  const handleExit = () => {
    window.location.pathname = "";
  };
  const GoToBackBtn = () => {
    router.push("/account");
  };

  const ChangeLangBtn = (e) => {
    let lang = e.target.value;
    if (lang === "ru") {
      router.push("/ru/account/patsient");
    } else {
      window.location.pathname = "/account/patsient";
    }
  };

  return (
    <div className="h-[105vh]  bg-[#F7FEFE]">
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
              <FiChevronDown className="text-xl " />
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
          <div className="flex justify-between">
            <div>
              <button
                className="flex items-center dark:text-[#1B3B3C] ml-[40px] py-1 mt-[30px] bg-[#F8FCFC] border rounded-[12px] w-[208px] font-[500]"
                onClick={GoToBackBtn}
              >
                <BsArrowLeft className="mx-3" /> {t("account:go_back_btn")}
              </button>
              <div className="bg-[url('../images/patsient/patsient-left.png')] bg-no-repeat  ml-[74px] w-[226px] h-[194px]"></div>
            </div>

            <div className="text-center">
              <div className="w-[130px] mx-auto h-[130px]  relative mt-[65px] rounded-[130px] border  place-items-center border-[#D7E6E7]  ">
                <IoMdPerson className="text-[70px] ml-[28px] text-[#1BB7B5] mt-[25px] " />
              </div>
              <p className="text-[18px] text-[#759495] text-center">
                {t("account:patsient")}
              </p>
              <h2 className="text-[24px] text-[#1B3B3C] text-center">
                {patsientInfo.fullname}
              </h2>
            </div>

            <div className="bg-[url('../images/patsient/patsient-right.png')] bg-no-repeat w-[260px] h-[271px] mt-10 mr-16"></div>
          </div>

          <div className="flex justify-between">
            <div className="w-[305px] ml-[40px] mr-[18px] flex px-4 pt-1 border border-[#E9F6F7] rounded-[18px] bg-[#F8FEFE]">
              <div className="w-14 h-14 bg-[#E9F9FB] flex items-center justify-center rounded-[56px]  ">
                <MdOutlineCalendarMonth className="text-2xl text-[#1BB7B5]" />
              </div>
              <div className="ml-[18px] text-[#759495]">
                <p>{t("account:birth_date")}</p>
                <h3 className="text-[18px] text-[#1B3B3C]">
                  {patsientInfo.birthday}
                </h3>
              </div>
            </div>

            <div className="w-[305px] mr-[18px] flex px-4 py-2 border border-[#E9F6F7] rounded-[18px] bg-[#F8FEFE]">
              <div className="w-14 h-14 bg-[#E9F9FB] flex items-center justify-center rounded-[56px]  ">
                <GoLocation className="text-2xl text-[#1BB7B5]" />
              </div>
              <div className="ml-[18px] text-[#759495]">
                <p>{t("register:cities")}</p>
                <h3 className="text-[18px] text-[#1B3B3C]">
                  {patsientInfo.province} viloyati
                </h3>
              </div>
            </div>

            <div className="w-[305px] mr-10 flex px-4 py-2 border border-[#E9F6F7] rounded-[18px] bg-[#F8FEFE]">
              <div className="w-14 h-14 bg-[#E9F9FB] flex items-center justify-center rounded-[56px]  ">
                <VscBriefcase className="text-3xl text-[#1BB7B5] " />
                <span className="block "></span>
              </div>
              <div className="ml-[18px] text-[#759495]">
                <p>{t("register:job_place")}</p>
                <h3 className="text-[18px] text-[#1B3B3C]">
                  {patsientInfo.workplace}
                </h3>
              </div>
            </div>
          </div>
          <span className="w-full  border-[0.5px] border-[#D7E6E7] block"></span>
          <div className="mx-10 my-5">
            <h2 className="font-[500] text-[24px] text-[#1B3B3C] ">
              {t("account:pattsient_btn")}
            </h2>
            <div className="flex justify-around w-full">
              <Link
                className="w-[305px] p-2 flex items-center rounded-[12px] shadow-[0px_6px_16px_#EFF4F4]"
                href="/account/patsient/davolash"
              >
                <span className="block w-10 bg-center h-10 rounded-[40px] mr-2 bg-[#EAF9FB]  bg-[url('../images/patsient/heart.png')] bg-no-repeat"></span>
                <p className="dark:text-[#1B3B3C]">{t("account:davo")}</p>
                <FiChevronRight className="text-[#759495] ml-auto " />
              </Link>
              <Link
                className="w-[305px] flex items-center p-2 rounded-[12px] shadow-[0px_6px_16px_#EFF4F4]"
                href="/account/patsient/tavsiyanoma"
              >
                <span className="block w-10 h-10 bg-center mr-2 rounded-[40px] bg-[#EAF9FB]  bg-[url('../images/patsient/books.png')] bg-no-repeat"></span>
                <p className="dark:text-[#1B3B3C]">{t("account:recom")} </p>
                <FiChevronRight className="text-[#759495] ml-auto" />
              </Link>
              {/* <button
                className=" w-[305px] ml-5 p-2 flex  items-center rounded-[12px] shadow-[0px_6px_16px_#EFF4F4]"
                onClick={handleKonsultant}
              >
                <span className="block w-10 h-10 mr-2 rounded-[40px] bg-[#EAF9FB] bg-center bg-[url('../images/patsient/konsultant.png')] bg-no-repeat"></span>
                <p className="dark:text-[#1B3B3C]">
                  {t("account:consultant")}{" "}
                </p>
                <FiChevronRight className="text-[#759495] ml-auto" />
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Patsient;
