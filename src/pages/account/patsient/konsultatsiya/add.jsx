import React, { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import Image from "next/image";
import img from "../../../../images/cite-logo.png";
import { FiChevronDown } from "react-icons/fi";
import { RxExit } from "react-icons/rx";
import { CiGlobe } from "react-icons/ci";
import { useRouter } from "next/router";
import { BsArrowLeft } from "react-icons/bs";
import { BsCheck2 } from "react-icons/bs";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useGlobalContext } from "@/context";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useFormik, Formik, Form, Field, useField } from "formik";
import KonsultatsiyaModal from "@/components/Konsultatsiya/modal";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["add", "account"])),
    },
  };
}

function Add() {
  const { konModal, setKonModal } = useGlobalContext();
  const { t } = useTranslation();
  const router = useRouter();
  const [allData, setAllData] = useState({});
  const handleExit = () => {
    router.pathname = "";
  };

  const GoToBackBtn = () => {
    router.push("/account/patsient/konsultatsiya");
  };
  const ChangeLangBtn = (e) => {
    let lang = e.target.value;
    if (lang === "ru") {
      router.push("/ru/account/patsient/konsultatsiya/add");
    } else {
      window.location.pathname = "/account/patsient/konsultatsiya/add";
    }
  };
  const initialValues = {
    doctorName: "",
    patientId: "",
    time: new Date(),
    description: "",
  };

  const onSubmit = (data) => {
    console.log(data);
    let token = localStorage.getItem("token");
    let id = localStorage.getItem("patId");
    data.patientId = id;
    flushSync(() => {
      setAllData(data);
    });
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  return (
    <div className=" h-[100vh] bg-[#F7FEFE]">
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <div className="w-[1035px] mx-auto">
          {/* head */}
          <div className="flex h-[60px] pt-9 justify-between">
            <div className="flex">
              <Image
                src={img}
                width={50}
                height={50}
                alt="logo"
                className="h-auto w-auto"
              />
              <p className="text-black font-[500]">
                Vita in <span className="text-[#57D0CF]">line</span>
              </p>
            </div>
            <div className="flex">
              <div className="flex dark:text-[#1B3B3C] w-[111px] h-[36px] items-center relative justify-between border border-[#D7E6E7] px-2 rounded-[12px]">
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

          <Form action="" method="post">
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
                    {t("add:new_advice")}
                  </h3>
                </div>
                <div className="mr-10 flex items-center">
                  <button
                    type="submit"
                    className="px-[30px] bg-[#1BB7B5] py-2 text-white rounded-[12px] flex items-center"
                    onClick={() => setKonModal(true)}
                  >
                    <BsCheck2 className="mr-3" />
                    {t("add:save")}
                  </button>
                </div>
              </div>
              {konModal && allData !== undefined ? (
                <KonsultatsiyaModal data={allData} />
              ) : (
                ""
              )}

              <div className="mx-6 mt-10 rounded-[18px] border border-[#D7E6E7] relative">
                <div className="flex">
                  <div className="text-[14px] text-[#759495] rounded-tl-[18px] pl-5 font-[400] border  border-[#D7E6E7] w-[287px] flex items-center p-2">
                    Doctorni ismini kiriting
                  </div>
                  <div className="text-[14px] text-[#759495] font-[400] border w-[360px]  border-[#D7E6E7]  flex items-center p-2">
                    <p className="ml-4 "> {t("add:when")} </p>
                  </div>
                  <div className="text-[14px] text-[#759495] font-[400] border w-[380px] rounded-tr-[18px] border-[#D7E6E7]  flex items-center p-2">
                    <p className="ml-4 "> {t("add:additional_info")} </p>
                  </div>
                </div>
                <div className="flex bg-[#F8FCFC] rounded-b-[18px] min-h-[300px]">
                  <div className="flex flex-col text-[14px] text-[#759495] font-[400] border rounded-bl-[18px] border-[#D7E6E7] w-[300px] pl-5 p-2">
                    <div className="flex border border-[#D7E6E7] bg-white mt-2 mx-2 rounded-[12px] p-2">
                      <Field
                        name="doctorName"
                        className="outline-none text-black bg-white active:bg-white dark:bg-white dark:text-black"
                      />
                    </div>
                  </div>

                  <div className="border w-[380px] flex items-start justify-center border-[#D7E6E7] ">
                    <div className="flex border border-[#D7E6E7] bg-white mx-2 mt-4 rounded-[12px] p-2">
                      <span className="bg-[url('../images/calendar.png')] bg-no-repeat mx-2 w-[25px] h-[19px] inline-block"></span>
                      <Field name="time">
                        {({ form, field }) => {
                          const { value } = field;
                          return (
                            <ReactDatePicker
                              selected={value}
                              id="time"
                              name="time"
                              {...field}
                              onChange={(val) =>
                                form.setFieldValue("time", val)
                              }
                              dateFormat="dd.MM.yyyy"
                              peekNextMonth
                              showMonthDropdown
                              showYearDropdown
                              dropdownMode="select"
                              className="bg-white text-black dark:bg-white active:bg-white customDatePicker border-none w-full  dark:text-black "
                              customStyles={{ dateInput: { borderWidth: 0 } }}
                            />
                          );
                        }}
                      </Field>
                    </div>
                  </div>
                  <div className="border border-[#D7E6E7] w-[400px] rounded-br-[18px]">
                    <Field
                      as="textarea"
                      name="description"
                      rows={3}
                      className="placeholder:text-[#C5D7D8] dark:bg-white dark:text-[#1B3B3C] border w-[250px] mx-4 px-2 mt-4  rounded-xl p-1 border-[#D7E6E7] resize-none outline-none "
                      placeholder={t("add:add_info_input")}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </Formik>
    </div>
  );
}

export default Add;
