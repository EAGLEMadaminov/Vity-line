import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import { FiChevronDown } from "react-icons/fi";
import { CiGlobe } from "react-icons/ci";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useGlobalContext } from "@/context.jsx";
import { useForm } from "react-hook-form";
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["home"])),
    },
  };
}

export default function Home(props) {
  const { t } = useTranslation();
  const router = useRouter();
  const [inputType, setInputType] = useState("password");
  const [resInfo, setResInfo] = useState("");
  const { setFormInfo } = useGlobalContext();
  const { register, handleSubmit } = useForm();

  const handleEnterList = (e) => {
    e.preventDefault();
    location.pathname = "/register";
  };
  let info;
  const onSubmit = async (data) => {
    const response = await fetch(
      "https://vitainline.uz/api/v1/auth/signin/doctor",
      {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    info = await response.json();
    setFormInfo(info);
    if (response.status == 200) {
      window.localStorage.setItem("token", info.token);
      location.pathname = "account";
    } else {
      if (window.location.pathname === "/ru") {
        setResInfo("Логин или пароль введен неверно. Попробуйте еще раз!");
      } else {
        setResInfo("Login yoki parol xato kiritilgan. Qayta urinib ko'ring!");
      }
    }
  };
  setTimeout(() => {
    setResInfo("");
  }, 5000);

  const ChangeLangBtn = (e) => {
    let lang = e.target.value;
    if (lang === "ru") {
      router.push("/ru");
    } else {
      window.location.pathname = "";
    }
  };

  return (
    <div className="bg-[#F5FAFB] w-full">
      <Head>
        <title>Vita in line</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex overflow-auto login-page  w-[100vw]">
        <div className="">
          <div className=" w-[250px] lg:w-auto mx-auto relative">
            <span className=" absolute bg-[url('../images/top-left.png')] bg-cover left-[56px] top-[40px] sm:bg-center w-[100px] md:w-[250px] sm:h-[316] h-[125px] md:left-[px] md:top-[0px] bg-no-repeat"></span>
            <span className="absolute bg-[url('../images/top-bottom.png')] left-[250px] top-[300px] bg-cover w-[120px] h-[130px]  lg:left-[56px] lg:top-[323px] bg-no-repeat"></span>
            <span className="absolute bg-[url('../images/middle.png')]  bg-cover w-0 h-[130px] left-5 lg:left-[471px] lg:top-[54px] bg-no-repeat "></span>
            <span className=" absolute  bg-[url('../images/top-right.png')] md:w-0 bg-cover w-[120px] top-[500px]  h-[130px] right-3  lg:top-[32px] bg-no-repeat"></span>
          </div>
          <div className=" bg-[url('../images/young-doctor1.png')] w-0 md:w-[50vw]  bg-cover h-[100vh] mx-auto bg-no-repeat  left-0 bottom-0 "></div>
        </div>

        <div className=" w-[100vw] flex flex-col justify-center items-center">
          <div className="border relative flex items-center justify-center border-[#C5D7D8] rounded-full bg-white w-[123px] h-[123px] mt-[10px] ">
            <span className="bg-[url('../images/Frame.png')] bg-contain w-[90px] h-[85px] bg-no-repeat absolute"></span>
          </div>
          <div className="flex flex-col items-center w-[300px] md:w-[400px] lg:w-[397px] mt-5 ">
            <h2 className="text-[24px] text-center w-[213px] text-[Black] mx-auto font-[500] leading-[38px]">
              {t("home:enter_system")} <span className="text-[#1BB7B5]"></span>
            </h2>
            <h1 className="z-[3] text-black">{props.locale}</h1>
            <p className="text-center text-red-400 w-[250px] md:w-[350px]  lg:w-[430px]">
              {resInfo}
            </p>
            <form
              action="https://vitainline.uz/api/v1/auth/signin/doctor"
              className="w-full flex flex-col "
              autoComplete="off"
              id="my-awesome-dropzone"
              onSubmit={handleSubmit(onSubmit)}
              method="POST"
              netlify
            >
              <label htmlFor="login" className="mt-[10px] mb-2 text-[#759495]">
                {t("home:login")}
              </label>
              <input
                name="passport"
                maxLength={10}
                className="border border-[#D7E6E7] rounded-[12px] p-2 dark:bg-white dark:text-black"
                type="text"
                {...register("passport", { required: true })}
                placeholder={t("home:input_login")}
                autoComplete="off"
              />
              <label
                htmlFor="password"
                className="mt-[14px]  mb-2 text-[#759495]"
              >
                {t("home:parol")}
              </label>
              <div className="border relative border-[#D7E6E7] rounded-[12px]">
                <input
                  name="password"
                  type={inputType}
                  minLength={4}
                  className=" w-full p-2 rounded-[12px] dark:bg-white dark:text-black"
                  placeholder="*******"
                  {...register("password", { required: true })}
                  autoComplete="off"
                />
                <span
                  onClick={() => {
                    inputType === "password"
                      ? setInputType("text")
                      : setInputType("password");
                  }}
                  className="bg-[url('../images/glass.png')] w-[22px] bg-no-repeat h-[14px] absolute right-4 top-3"
                ></span>
              </div>
              <button
                type="submit"
                className="mt-[24px] transform- py-[13px] bg-gradient-to-t from-[#1BB7B5] to-[#0EC5C9] text-white rounded-[12px]  font-[500] hover:bg-gradient-to-t hover:from-[#0F9694] hover:to-[#0A7476]"
              >
                {t("home:enter")}
              </button>
              <button
                className="py-[13px] mt-[12px] bg-white text-[#1BB7B5] font-[500] rounded-[12px]
            hover:bg-gradient-to-t  hover:from-[#1BB7B5] hover:to-[#12A7AA] hover:text-white"
                onClick={handleEnterList}
              >
                {t("home:autorization_btn")}
              </button>
            </form>
          </div>
          <div className="flex ml-[450px] mt-14  w-[111px] h-[36px] dark:text-[#1B3B3C] items-center relative justify-between border border-[#D7E6E7] px-2 rounded-[12px]">
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
        </div>
      </div>
    </div>
  );
}
