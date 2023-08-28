import React, { useState, useEffect } from "react";
import Image from "next/image";
import img from "../../../../images/cite-logo.png";
import { FiChevronDown } from "react-icons/fi";
import { RxExit } from "react-icons/rx";
import { CiGlobe } from "react-icons/ci";
import { useRouter } from "next/router";
import { BsArrowLeft } from "react-icons/bs";
import { BsCheck2 } from "react-icons/bs";
import { GoPlus } from "react-icons/go";
import { IoIosClose } from "react-icons/io";
import { Formik, Form, FieldArray, Field, useFormik } from "formik";
import { RxCross2 } from "react-icons/rx";
import { GrSubtract } from "react-icons/gr";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import MuiPicker from "@/components/Davolash/MuiPicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const DynamicHeader = dynamic(
  () => import("@/components/Davolash/LiveSearch"),
  {
    ssr: false,
  }
);
export async function getStaticProps({ locale }) {
  let pills;
  const res = await fetch("https://vitainline.uz/api/v1/pills");
  pills = await res.json();
  console.log(pills);
  return {
    props: {
      ...(await serverSideTranslations(locale, ["add", "account"])),
      pills,
    },
  };
}

function Add({ pills }) {
  const { t } = useTranslation();
  const router = useRouter();
  const [numberEatDrug, setNumberEatDrug] = useState([1]);
  const [token, setToken] = useState("");
  const [patId, setPatId] = useState("");
  const [loading, setLoading] = useState(false);

  const initialValues = {
    healings: [
      {
        pill: "",
        times: [""],
        quantity: 0,
        type: "",
        period: "",
        extraInformation: "",
      },
    ],
  };
  const onSubmit = async (values) => {
    setLoading(true);
    let item;
    for (let i = 0; i < values.healings.length; i++) {
      item = values.healings[i];
      if (
        item.pill == "" ||
        item.quantity == 0 ||
        item.type == "" ||
        item.period == "" ||
        item.extraInformation == ""
      ) {
        setLoading(false);
        return;
      }
    }
    delete values.quantity;
    values.patientId = patId;
    console.log(values);
    const response = await fetch("https://vitainline.uz/api/v1/healings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    });

    if (response.status == 200 || response.status == 201) {
      setLoading(false);
      location.pathname = "/account/patsient/davolash";
    }
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
  });
  const handleExit = () => {
    localStorage.clear();
    window.location.pathname = "";
  };

  const GoToBackBtn = () => {
    router.push("/account/patsient/davolash");
  };

  const removeElement = (index) => {
    const newA = numberEatDrug.filter((_, i) => i !== index);
    setNumberEatDrug(newA);
  };

  const ChangeLangBtn = (e) => {
    let lang = e.target.value;
    if (lang === "ru") {
      router.push("/ru/account/patsient/davolash/add");
    } else {
      window.location.pathname = "/account/patsient/davolash/add";
    }
  };

  useEffect(() => {
    let value;
    let itemId;
    value = localStorage.getItem("token") || "";
    setToken(value);
    itemId = localStorage.getItem("patId") || "";
    setPatId(itemId);
  }, []);

  return (
    <div className=" min-h-[100vh] bg-[#F7FEFE]">
      <div className="w-[1035px] mx-auto">
        {/* head */}
        <div className="flex h-[60px] pt-9 justify-between">
          <div className="flex">
            <Image
              src={img}
              width={50}
              height={50}
              className="w-auto h-auto"
              alt="logo"
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
              type="button"
              onClick={handleExit}
              className="w-[200px] ml-[18px] flex py-[5px]  px-[18px]items-center h-[36px] text-[#FF0000] border rounded-[12px] border-[#D7E6E7]"
            >
              <RxExit className="mx-2 my-auto" /> {t("account:exit_account")}
            </button>
          </div>
        </div>

        {/* body  */}
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          <Form>
            <FieldArray name="healings">
              {(props) => {
                const { push, remove, form } = props;
                const { values, setFieldValue } = form;
                const { healings } = values;
                return (
                  <div
                    className="bg-white border border-[#D7E6E7] rounded-[24px] mt-6"
                    id="index"
                  >
                    <div className="flex justify-between mt-7 mb-3">
                      <div className="flex items-center">
                        <button
                          type="button"
                          className="flex dark:text-[#1B3B3C] items-center ml-[40px] py-1 bg-[#F8FCFC] border rounded-[12px] w-[188px] font-[500]"
                          onClick={GoToBackBtn}
                        >
                          <BsArrowLeft className="mx-3" />{" "}
                          {t("account:go_back_btn")}
                        </button>
                        <h3 className="text-[24px] ml-[18px] text-[#1B3B3C]">
                          {t("add:add_tool")}
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
                    {healings.map((group, index) => {
                      return (
                        <div key={index}>
                          <div
                            className="mx-6 mt-10 rounded-[18px] border  border-[#D7E6E7] relative"
                            key={index}
                          >
                            <div className="text-left flex ">
                              <div className="flex flex-col border min-h-[300px] border-[#D7E6E7]  rounded-l-[18px]">
                                <div className="text-[14px] pl-5 text-[#759495] h-18 border-b font-[400] w-[200px]  p-2 ">
                                  {t("add:tool")}
                                </div>
                                <div className="text-[14px] text-[#759495]  h-100%  font-[400] w-[200px]  p-2 ">
                                  <DynamicHeader />
                                </div>
                              </div>

                              <div className="flex flex-col  border border-[#D7E6E7] ">
                                <FieldArray name={`healings[${index}].times`}>
                                  {(arrayProps) => {
                                    const { form, push, remove } = arrayProps;
                                    const { values } = form;
                                    const { healings } = values;
                                    return (
                                      <div>
                                        <div
                                          className="text-[14px] h-[38px] pl-2 text-[#759495] flex font-[400] border-b w-[200px] items-center "
                                          type="button"
                                        >
                                          {t("add:how_much")}
                                          <button
                                            type="button"
                                            className=" w-7 h-7 bg-[#1BB7B5] rounded-[8px] ml-3 flex items-center justify-center"
                                            onClick={() => push("")}
                                          >
                                            <GoPlus className=" text-white " />
                                          </button>
                                        </div>

                                        <div className="flex flex-col text-[14px] text-[#759495] font-[400]    items-center p-2">
                                          {healings[index].times.map(
                                            (time, idx) => {
                                              return (
                                                <div className="my-3" key={idx}>
                                                  <div className="flex items-center">
                                                    <p
                                                      key={idx}
                                                      className="mr-1"
                                                    >
                                                      {idx + 1}-
                                                      {t("add:first_num")}
                                                    </p>
                                                    <div className=" h-[34px] flex my-2 justify-around items-center">
                                                      <LocalizationProvider
                                                        dateAdapter={
                                                          AdapterDateFns
                                                        }
                                                      >
                                                        <MuiPicker
                                                          data={healings}
                                                          index={index}
                                                          idx={idx}
                                                        />
                                                      </LocalizationProvider>
                                                    </div>
                                                    <button
                                                      type="button"
                                                      onClick={() =>
                                                        remove(idx)
                                                      }
                                                    >
                                                      <IoIosClose className="text-[20px] ml-1" />
                                                    </button>
                                                  </div>
                                                </div>
                                              );
                                            }
                                          )}
                                        </div>
                                      </div>
                                    );
                                  }}
                                </FieldArray>
                              </div>
                              <div className="flex flex-col border border-[#D7E6E7]">
                                <div className="text-[14px] text-[#759495] font-[400] w-[150px] p-2 border-b border-[#D7E6E7]">
                                  {t("add:num_eat")}
                                </div>
                                <div className="text-[14px] text-[#759495] mt-3  items-center font-[400] w-[150px] p-2  flex">
                                  <button
                                    type="button"
                                    className="bg-white border ml-3  border-[#E9F6F6] rounded-[8px] w-8 h-8"
                                    onClick={(e) => {
                                      setFieldValue(
                                        "quantity",
                                        group.quantity--
                                      );
                                      {
                                        if (group.quantity <= 0) {
                                          group.quantity = 0;
                                        }
                                      }
                                    }}
                                  >
                                    <GrSubtract className="mx-auto" />
                                  </button>
                                  <Field
                                    name={`healings[${index}].quantity`}
                                    disabled
                                    value={group.quantity}
                                    className="ml-4 text-[#1B3B3C] disabled:bg-transparent outline-none  rounded-[8px] w-8 h-8"
                                  />
                                  <button
                                    type="button"
                                    className="rounded-[8px] w-8 h-8 bg-[#1BB7B5] pb-1 ml-0 text-[30px] leading-3 text-white "
                                    onClick={() =>
                                      setFieldValue(
                                        "quantity",
                                        group.quantity++
                                      )
                                    }
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                              <div className="flex flex-col border border-[#D7E6E7]">
                                <div className="text-[14px] text-[#759495] font-[400] w-[150px] p-2 border-b border-[#D7E6E7]">
                                  {t("add:schedule_eat")}
                                </div>
                                <div className="text-[14px] text-[#759495] font-[400] w-[150px] p-2 ">
                                  <Field
                                    as="fieldset"
                                    name={`healings[${index}].type`}
                                  >
                                    <div className="border border-[#D7E6E7] p-1 rounded-xl">
                                      <input
                                        type="radio"
                                        id="radio1"
                                        name={`healings[${index}].type`}
                                        value="Ovqatdan oldin"
                                        className="form-radio  bg-white brightness-150 active:brightness-150 hover:brightness-150"
                                      />
                                      <label
                                        htmlFor="radio1"
                                        className="ml-1 dark:text-[#1B3B3C]"
                                      >
                                        {t("add:before_eat")}
                                      </label>
                                    </div>
                                    <div className="border border-[#D7E6E7] mt-3 p-1 rounded-xl">
                                      <input
                                        type="radio"
                                        id="radio2"
                                        value="Ovqatdan keyin"
                                        name={`healings[${index}].type`}
                                        className="brightness-150 form-radio p-2 after:w-2 after:h-2 active:brightness-150 hover:brightness-150"
                                      />
                                      <label
                                        htmlFor="radio2"
                                        className="ml-1 dark:text-[#1B3B3C]"
                                      >
                                        {t("add:after_eat")}
                                      </label>
                                    </div>
                                  </Field>
                                </div>
                              </div>
                              <div className="flex flex-col border border-[#D7E6E7]">
                                <div className="text-[14px] text-[#759495] font-[400] w-[120px] p-2 border-b border-[#D7E6E7]">
                                  <p className="w-[90px]">{t("add:time")}</p>
                                </div>
                                <div className="text-[14px] text-[#759495] font-[400] w-[120px] p-2 ">
                                  <Field
                                    type="text"
                                    placeholder={t("add:days")}
                                    name={`healings[${index}].period`}
                                    className="outline-none dark:bg-white dark:text-black p-2 border border-[#D7E6E7] rounded-xl w-[100%]"
                                  />
                                </div>
                              </div>
                              <div className="flex flex-col border border-[#D7E6E7] w-[156px] rounded-r-[18px]">
                                <div className="text-[14px] text-[#759495] font-[400]  w-full p-2 border-b border-[#D7E6E7]">
                                  {t("add:additional_info")}
                                </div>
                                <div className="text-[14px] text-[#759495] font-[400] w-full p-2">
                                  <Field
                                    as="textarea"
                                    name={`healings[${index}].extraInformation`}
                                    rows={3}
                                    className="border  w-[140px] dark:bg-white dark:text-black rounded-xl p-1 border-[#D7E6E7] resize-none outline-none "
                                    placeholder={t("add:add_info_input")}
                                  ></Field>
                                </div>
                              </div>
                            </div>
                            <button
                              type="button"
                              className="absolute pl-1  ml-auto w-6 h-6 top-[-7px] right-[-7px] bg-white text-[#759495] rounded-[40px] border border-[#D7E6E7]  "
                              onClick={() => remove(index)}
                            >
                              <RxCross2 />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                    <button
                      type="button"
                      className="bg-[#1BB7B5] text-white rounded-[12px] w-[170px] ml-5 mb-8 mt-2 p-2"
                      onClick={() =>
                        push({
                          pill: "",
                          times: [""],
                          quantity: "",
                          type: "",
                          period: "",
                          extraInformation: "",
                        })
                      }
                    >
                      + {t("add:add_again")}
                    </button>
                  </div>
                );
              }}
            </FieldArray>
          </Form>
        </Formik>
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
    </div>
  );
}

export default Add;
