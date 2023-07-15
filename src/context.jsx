import React, { useContext, useState, useEffect, useRef } from "react";
import { registerLocale } from "react-datepicker";

const Appcontext = React.createContext();

const AppProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [konModal, setKonModal] = useState(false);
  const [registerInfo, setRegisterInfo] = useState("");
  const [choosenPill, setChoosenPill] = useState("");
  const [patsientInfo, setPatsientInfo] = useState("");

  const inialValue = {
    birthday: "",
    fullname: "",
    passport: "",
    password: "",
    phone: "",
    position: "",
    province: "Tashkent",
    specialty: "",
    workplace: "",
  };
  const [formInfo, setFormInfo] = useState(inialValue);

  return (
    <Appcontext.Provider
      value={{
        showModal,
        setShowModal,
        konModal,
        setKonModal,
        formInfo,
        setFormInfo,
        registerInfo,
        setRegisterInfo,
        choosenPill,
        setChoosenPill,
        patsientInfo,
        setPatsientInfo,
      }}
    >
      {children}
    </Appcontext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(Appcontext);
};
export { Appcontext, AppProvider };
