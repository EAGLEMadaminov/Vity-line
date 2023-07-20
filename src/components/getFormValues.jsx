import React from "react";

function getFormValues(form) {
  const formData = new FormData(document.getElementById("my-awesome-dropzone"));
  const values = [...formData.values()];
  const isEmpty = values.includes("");

  const data = Object.fromEntries(formData);
  return { isEmpty, data };
}

export default getFormValues;
