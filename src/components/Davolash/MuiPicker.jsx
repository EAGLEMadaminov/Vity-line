import React, { useState } from "react";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { Stack, TextField } from "@mui/material";

import { Field, FieldArray } from "formik";

function MuiPicker({ index, idx }) {
  const [selectedTime, setSelectedTime] = useState(null);
  return (
    <Stack className="w-[105px] ">
      <FieldArray>
        {(props) => {
          const { form } = props;
          const { values } = form;
          const { healings } = values;
          return (
            <TimePicker
              slots={{
                textField: (textFieldProps) => (
                  <TextField {...textFieldProps} />
                ),
              }}
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
          );
        }}
      </FieldArray>
    </Stack>
  );
}

export default MuiPicker;
