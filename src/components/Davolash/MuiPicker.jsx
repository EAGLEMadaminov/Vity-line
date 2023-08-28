import React, { useState } from "react";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { Stack } from "@mui/material";
import { Field } from "formik";

function MuiPicker({ healings, index, idx }) {
  const [selectedTime, setSelectedTime] = useState(null);
  console.log(healings, index, idx);

  return (
    <Stack className="w-[105px] ">
      <TimePicker
        renderInput={() => (
          <Field
            type="time"
            format="HH:mm"
            className="border-0 rounded-md focus:outline-none active:border-0 focus:border-blue-500"
          />
        )}
        value={selectedTime}
        onChange={(newValue) => {
          setSelectedTime(newValue);
          let hour = newValue?.getHours();
          let min = newValue?.getMinutes();
          if (hour.lenght == 1) {
            hour = `0${hour}`;
          }
          if (min === 0) {
            min = "00";
          }
          let time = hour + ":" + min;
          console.log(time);
          healings[index].times[idx] = time;
        }}
      />
    </Stack>
  );
}

export default MuiPicker;
