import React, { useEffect, useState } from "react";
import Image from "next/image";
import img from "../../../../images/cite-logo.png";
import { FiChevronDown } from "react-icons/fi";
import { RxExit } from "react-icons/rx";
import { CiGlobe } from "react-icons/ci";
import { useRouter } from "next/router";
import { BsArrowLeft } from "react-icons/bs";
import { BsCheck2 } from "react-icons/bs";
import { GoPlus } from "react-icons/go";
import { BsClock } from "react-icons/bs";
import { IoIosClose } from "react-icons/io";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { FieldArray, useFormik, Formik, Form, Field } from "formik";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["add", "account"])),
    },
  };
}

function Rengen() {
  const { t } = useTranslation();
  const router = useRouter();
  const [numberEatDrug, setNumberEatDrug] = useState([1]);
  const [token, setToken] = useState("");
  const [id, setId] = useState("");
  const initialValues = {
    title: "",
    description: "",
    times: [""],
    duration: "",
  };
  const onSubmit = async (values) => {
    if (id && token) {
      values.patientId = id;
      const response = await fetch(
        "https://vitainline.uz/api/v1/recommendations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(values),
        }
      );
      const info = await response.json();
      window.localStorage.setItem("tavsiyaId", info.data.id);
      if (response.status === 200) {
        window.location.pathname = "/account/patsient/tavsiyanoma";
      }
    }
  };
  useEffect(() => {
    let value;
    let item;
    value = localStorage.getItem("token") || "";
    setToken(value);
    item = localStorage.getItem("patId") || "";
    setId(item);
  }, []);
  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  const handleExit = () => {
    router.pathname = "";
  };

  const AddClock = () => {
    let id = new Date().getTime();
    setNumberEatDrug([...numberEatDrug, id]);
  };

  const GoToBackBtn = () => {
    router.push("/account/patsient/tavsiyanoma");
  };

  const removeElement = (index) => {
    const newA = numberEatDrug.filter((_, i) => i !== index);
    setNumberEatDrug(newA);
  };

  const ChangeLangBtn = (e) => {
    let lang = e.target.value;
    if (lang === "ru") {
      router.push("/ru/account/patsient/tavsiyanoma/add");
    } else {
      window.location.pathname = "/account/patsient/tavsiyanoma/add";
    }
  };

  return (
    <div className=" h-[100vh] bg-[#F7FEFE]">
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
              <RxExit className="mx-2 my-auto" />
              {t("account:exit_account")}
            </button>
          </div>
        </div>

        {/* body  */}
        <Formik onSubmit={onSubmit} initialValues={initialValues}>
          <Form>
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
                    {t("add:add_advice")}
                  </h3>
                </div>
                <div className="mr-10 flex items-center">
                  <button
                    type="submit"
                    className="px-[30px] bg-[#1BB7B5] py-2 text-white rounded-[12px] flex items-center"
                  >
                    <BsCheck2 className="mr-3" />
                    {t("add:save")}
                  </button>
                </div>
              </div>

              <FieldArray name="times">
                {(props) => {
                  const { push, remove, form } = props;
                  const { values } = form;
                  const { times } = values;
                  return (
                    <div className="mx-6 mt-10 rounded-[18px]   border border-[#D7E6E7] relative">
                      <div className="flex">
                        <div className="text-[14px] text-[#759495] pl-5 font-[400] border rounded-tl-[18px] border-[#D7E6E7] w-[270px] flex items-center p-2">
                          {t("add:num_check")}
                          <button
                            className=" w-7 h-7 bg-[#1BB7B5] rounded-[8px]  ml-auto flex items-center justify-center"
                            onClick={() => push("")}
                          >
                            <GoPlus className=" text-white " />
                          </button>
                        </div>
                        <div className="text-[14px] text-[#759495] font-[400] border border-[#D7E6E7] w-[180px] flex items-center p-2">
                          <p className="ml-4">{t("add:time")} </p>
                        </div>
                        <div className="text-[14px] text-[#759495] w-[250px] font-[400] border border-[#D7E6E7]  flex items-center p-2">
                          <p className="ml-4">{t("add:name")} </p>
                        </div>
                        <div className="text-[14px] text-[#759495] font-[400] border w-[300px] rounded-tr-[18px] border-[#D7E6E7]  flex items-center p-2">
                          <p className="ml-4 "> {t("add:additional_info")} </p>
                        </div>
                      </div>
                      <div className="flex bg-[#F8FCFC] rounded-b-[18px] min-h-[300px]">
                        <div className="flex flex-col text-[14px] text-[#759495] font-[400] border rounded-bl-[18px] border-[#D7E6E7] w-[270px] pl-5 p-2">
                          {times.map((item, index) => {
                            return (
                              <div className="my-3" key={index + 1}>
                                <div className="flex items-center">
                                  <p className="mr-1">
                                    {index + 1}-{t("add:first_num")}
                                  </p>
                                  <div className="border bg-white border-[#D7E6E7] rounded-[12px] w-[100px] h-[40px] flex items-center">
                                    <BsClock className="text-[#1BB7B5] ml-3" />
                                    <Field
                                      type="time"
                                      format="HH:mm"
                                      name={`times[${index}]`}
                                      className="w-9 h-3  outline-none dark:bg-white dark:text-black placeholder:text-[#C5D7D8]"
                                    />
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => remove(index)}
                                  >
                                    <IoIosClose className="text-[20px] ml-1" />
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        <div className="border w-[182px]  border-[#D7E6E7] ">
                          <Field
                            type="number"
                            name="duration"
                            placeholder={t("add:days")}
                            className="border placeholder:text-[#C5D7D8] outline-none w-[120px] dark:bg-white dark:text-black border-[#D7E6E7]  mx-4 h-11 rounded-xl px-2 mt-4"
                          />
                        </div>
                        <div className="border  border-[#D7E6E7] w-[250px] ">
                          <Field
                            type="text"
                            name="title"
                            placeholder="Nomini kiriting"
                            className="border placeholder:text-[#C5D7D8] outline-none dark:bg-white dark:text-black border-[#D7E6E7] mx-4 h-11 rounded-xl px-2 mt-4"
                          />
                        </div>
                        <div className="border border-[#D7E6E7] w-[302px] rounded-br-[18px]">
                          <Field
                            as="textarea"
                            name="description"
                            rows={3}
                            className="border placeholder:text-[#C5D7D8] w-[260px] dark:bg-white dark:text-black  mx-4 px-2 mt-4  rounded-xl p-1 border-[#D7E6E7] resize-none outline-none "
                            placeholder={t("add:add_info_input")}
                          />
                        </div>
                      </div>
                    </div>
                  );
                }}
              </FieldArray>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default Rengen;
