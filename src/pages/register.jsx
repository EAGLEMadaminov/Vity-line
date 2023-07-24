import React, { useState } from "react";
import { BiChevronRight } from "react-icons/bi";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useGlobalContext } from "@/context.jsx";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["register", "home"])),
    },
  };
}
export default function Register(props) {
  const { t } = useTranslation();
  const [startDate, setStartDate] = useState(new Date());
  const [inputType, setInputType] = useState("password");
  const [secondInput, setSecondInput] = useState("password");
  const [formErrors, setFormErrors] = useState({});
  const [show, setShow] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const { setRegisterInfo, setFormInfo, formInfo } = useGlobalContext();

  let response;
  const formSubmit = (e) => {
    e.preventDefault();
    if ((e.target.name = "birthday")) {
      let day = startDate.getDate();
      if (day < 10) {
        day = `0${day}`;
      }
      let month = startDate.getMonth() + 1;
      if (month < 10) {
        month = `0${month}`;
      }
      const year = startDate.getFullYear();
      const time = day + "." + month + "." + year;
      formInfo.birthday = time;
    }
    setShow(true);
  };

  const EnterAppBtn = async (e) => {
    setIsSubmit(false);
    if (((e.target.name === "password") === e.target.name) === "password2") {
    }
    delete formInfo["password2"];
    e.preventDefault();
    response = await fetch("https://vitainline.uz/api/v1/auth/signup/doctor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formInfo),
    });

    const info = await response.json();
    if (response.status == 201) {
      localStorage.setItem("info", JSON.stringify(formInfo));
      location.pathname = "account";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value === "") {
      if (window.location.pathname == "ru") {
        setRegisterInfo("Пожалуйста, заполните все поля.");
      } else {
        setRegisterInfo("Iltimos barcha maydonni to'ldiring.");
      }
      setIsSubmit(true);
    } else {
      setIsSubmit(false);
    }
    setFormInfo({ ...formInfo, [name]: value });
  };

  return (
    <div className="bg-[#F7FEFE] flex login-page  overflow-auto h-[115vh] dark:bg-[#F7FEFE]">
      <div className="w-[100vw] ">
        <div className=" w-[350px] lg:w-[50vh] mx-auto relative">
          <span className=" absolute bg-[url('../images/top-left.png')] bg-cover left-[56px] top-[80px] sm:bg-center w-[100px] md:w-[250px] sm:h-[316] h-[125px] md:left-[24px] md:top-[46px] bg-no-repeat"></span>
          <span className="absolute bg-[url('../images/top-bottom.png')] left-[-200px] top-[400px] bg-cover w-[120px] h-[130px]   lg:top-[200px] bg-no-repeat"></span>
          <span className="absolute bg-[url('../images/middle.png')]  bg-cover w-0 h-[130px] left-5 lg:left-[471px] lg:top-[54px] bg-no-repeat "></span>
          <span className=" absolute  bg-[url('../images/top-right.png')] top-[60px] bg-cover w-[120px] h-[130px]   lg:top-[32px] lg:right-[300px] bg-no-repeat"></span>
          <span className=" absolute  bg-[url('../images/top-right.png')] md:w-0 bg-cover w-[120px] top-[500px] left-8 h-[130px] lg:right-[200px] lg:top-[32px] bg-no-repeat"></span>
        </div>
        <div className="absolute bg-[url('../images/respons_logo.png')] w-[200px] h-[128px] left-[80px] top-[300px] bg-no-repeat md:w-0"></div>
        <div className="bg-[url('../images/young-doctor1.png')] w-0  lg:w-[50vw] bg-cover h-[115vh]  bg-no-repeat  left-0 bottom-0 "></div>
      </div>
      <form className="mt-[20px] mr-[150px] text-[12px] " id="form-data">
        <div className=" lg:w-[350px]">
          <h1 className="text-[24px] text-center font-[500] text-[#1B3B3C] ">
            {t("register:register_list")}
          </h1>
          <p className="text-[#759495] text-center">{t("register:top_info")}</p>
          {show ? (
            <div className="">
              <div className="flex w-10 mx-auto justify-between">
                <span className="rounded-[50px]  border border-[#D7E6E7] w-[16px] h-[16px] "></span>
                <span className="rounded-[50px] bg-[#1BB7B5] border-[#1BB7B5] border w-[16px]  h-[16px]"></span>
              </div>

              <label htmlFor="password" className=" text-[#759495] ">
                {t("home:parol")}
              </label>
              <div className="mb-3 mt-2 border relative border-[#D7E6E7] rounded-[12px]">
                <input
                  name="password"
                  className=" w-full p-2 rounded-[12px] dark:bg-white dark:text-black"
                  type={inputType}
                  placeholder="************"
                  autoComplete="off"
                  required
                  value={formInfo.password}
                  onChange={handleChange}
                />
                <span
                  onClick={() => {
                    inputType === "password"
                      ? setInputType("text")
                      : setInputType("password");
                  }}
                  className="bg-[url('../images/glass.png')] mb-1 w-[22px] bg-no-repeat h-[14px] absolute right-4 top-3"
                ></span>
              </div>
              <p>{formErrors.password}</p>
              <label htmlFor="password" className="  mb-2 text-[#759495]">
                {t("register:password_again")}
              </label>
              <div className="mt-2 border relative border-[#D7E6E7] rounded-[12px]">
                <input
                  name="password2"
                  className=" w-full p-2 rounded-[12px] dark:bg-white dark:text-black"
                  type={secondInput}
                  placeholder="************"
                  autoComplete="off"
                  required
                  onChange={handleChange}
                />
                <span
                  onClick={() => {
                    secondInput === "password"
                      ? setSecondInput("text")
                      : setSecondInput("password");
                  }}
                  className="bg-[url('../images/glass.png')] w-[22px] h-[14px] absolute right-4 top-3 bg-no-repeat"
                ></span>
              </div>
              <button
                className="text-white w-full rounded-[12px] text-[16px] mt-3 py-2 bg-gradient-to-t from-[#1BB7B5] to-[#0EC5C9] font-[500] hover:bg-gradient-to-t hover:from-[#0F9694] hover:to-[#0A7476]"
                onClick={EnterAppBtn}
              >
                {t("register:bottom_btn")}
              </button>
            </div>
          ) : (
            <div className="">
              <div className="flex w-10 mx-auto justify-between">
                <span className="rounded-[50px] bg-[#1BB7B5] border-[#1BB7B5] border w-[16px]  h-[16px]"></span>
                <span className="rounded-[50px]  border border-[#D7E6E7] w-[16px] h-[16px] "></span>
              </div>
              <div className="w-full flex flex-col text-[12px] dark:text-[#759495] dark:bg-[#F7FEFE]">
                <label htmlFor="user-info" className="text-[12px] mt-3 ">
                  {t("register:fish")}
                </label>
                <input
                  type="text"
                  name="fullname"
                  value={formInfo.fullname}
                  onChange={handleChange}
                  required
                  placeholder={t("register:name_input")}
                  className="w-full outline-none rounded-[12px] boder-[#D7E6E7] border p-2 bg-[#F8FCFC] focus:bg-white focus:border-[#C5D7D8] dark:bg-white dark:text-black"
                />
                <p>{formErrors.fullname}</p>
                <label htmlFor="data" className="mt-3 ">
                  {t("register:birth_date")}
                </label>
                <div className="w-full rounded-[12px] flex relative items-center dark:bg-white  border p-2 bg-[#F8FCFC] active:bg-white focus:border-[#C5D7D8] ">
                  <span className="bg-[url('../images/calendar.png')] mx-2 w-[25px] h-[19px] inline-block"></span>
                  <p className="mx-3 dark:text-black">{t("register:choose")}</p>
                  <ReactDatePicker
                    selected={startDate}
                    onChange={(date) => {
                      setStartDate(date), handleChange;
                    }}
                    dateFormat="dd.MM.yyyy"
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    name="birthday"
                    dropdownMode="select"
                    className="bg-[#F8FCFC] text-black dark:bg-white active:bg-white customDatePicker border-none w-full  dark:text-black "
                    customStyles={{ dateInput: { borderWidth: 0 } }}
                  />
                  <BiChevronRight className="text-[18px] ml-auto text-[#759495] " />
                </div>
                <p>{formErrors.birthday}</p>
                <label htmlFor="passport" className="mt-3">
                  {t("register:passport")}
                </label>
                <input
                  type="text"
                  name="passport"
                  required
                  value={formInfo.passport}
                  onChange={handleChange}
                  placeholder="(AA 2314658)"
                  className="outline-none rounded-[12px] boder-[#D7E6E7] border p-2 bg-[#F8FCFC] focus:bg-white focus:border-[#C5D7D8] dark:bg-white dark:text-black"
                />
                <p>{formErrors.passport}</p>
                <label htmlFor="province" className="mt-3">
                  {t("register:cities")}
                </label>
                <select
                  name="province"
                  id=""
                  value={formInfo.province}
                  onChange={handleChange}
                  className="bg-[#F8FCFC] p-2 outline-none border rounded-[12px] boder-[#D7E6E7] dark:bg-white dark:text-black"
                >
                  <option value="tosh">{t("register:tashkent")}</option>
                  <option value="and">{t("register:andijon")}</option>
                  <option value="bux">{t("register:buxoro")}</option>
                  <option value="far">{t("register:fargana")}</option>
                  <option value="jiz">{t("register:jizax")}</option>
                  <option value="xor">{t("register:xorazm")}</option>
                  <option value="nam">{t("register:namangan")}</option>
                  <option value="nav">{t("register:navoiy")}</option>
                  <option value="qash">{t("register:qash")}</option>
                  <option value="qor">{t("register:qora_qalpoq")}</option>
                  <option value="sam">{t("register:sam")}</option>
                  <option value="sir">{t("register:sirdaryo")}</option>
                  <option value="sur">{t("register:surxon")}</option>
                </select>
                <label htmlFor="specialty" className="mt-3">
                  {t("register:major")}
                </label>
                <input
                  type="text"
                  placeholder={t("register:job")}
                  name="specialty"
                  value={formInfo.specialty}
                  onChange={handleChange}
                  required
                  className="outline-none rounded-[12px] dark:bg-white dark:text-black boder-[#D7E6E7] border p-2 bg-[#F8FCFC] focus:bg-white focus:border-[#C5D7D8]"
                />
                <p>{formErrors.specialty}</p>
                <label htmlFor="workplace" className="mt-3">
                  {t("register:job_place")}
                </label>
                <input
                  type="text"
                  name="workplace"
                  value={formInfo.workplace}
                  onChange={handleChange}
                  placeholder={t("register:job_place_input")}
                  required
                  className="outline-none rounded-[12px] dark:bg-white dark:text-black boder-[#D7E6E7] border p-2 bg-[#F8FCFC] focus:bg-white focus:border-[#C5D7D8]"
                />
                <p>{formErrors.workplace}</p>
                <label htmlFor="position" className="mt-3">
                  {t("register:position")}
                </label>
                <input
                  type="text"
                  name="position"
                  value={formInfo.position}
                  onChange={handleChange}
                  required
                  className="outline-none dark:bg-white dark:text-black rounded-[12px] boder-[#D7E6E7] border p-2 bg-[#F8FCFC] focus:bg-white focus:border-[#C5D7D8]"
                />
                <p>{formErrors.position}</p>
                <label htmlFor="phone-num">{t("register:phone")}</label>
                <div className="  rounded-[12px] boder-[#D7E6E7] dark:text-black border p-2 bg-[#F8FCFC] focus:bg-white focus:border-[#C5D7D8]">
                  +998
                  <input
                    type="number"
                    name="phone"
                    value={formInfo.phone}
                    onChange={handleChange}
                    required
                    placeholder="-- --- -- --"
                    className="outline-none dark:bg-white dark:text-black bg-[#F8FCFC] focus:bg-white focus:border-[#C5D7D8]"
                  />
                </div>
                <p>{formErrors.phone}</p>
                <button
                  disabled={isSubmit}
                  onClick={formSubmit}
                  className="text-white rounded-[12px] text-[16px] mt-3 py-2 bg-gradient-to-t  from-[#1BB7B5] to-[#0EC5C9] font-[500] hover:bg-gradient-to-t hover:from-[#0F9694] hover:to-[#0A7476]"
                >
                  {t("register:bottom_btn")}
                </button>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}


