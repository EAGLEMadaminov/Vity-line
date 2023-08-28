import React, { useState } from "react";
import { Stack, TextField } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { Field, FieldArray } from "formik";

function MuiTimePicker({ index }) {
  const [selectedTime, setSelectedTime] = useState(null);
  return (
    <Stack>
      <FieldArray>
        {(props) => {
          const { form } = props;
          const { values } = form;
          const { times } = values;
          return (
            <TimePicker
              slots={{
                textField: (textFieldProps) => (
                  <TextField {...textFieldProps} />
                ),
              }}
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
                times[index] = time;
              }}
            />
          );
        }}
      </FieldArray>
    </Stack>
  );
}

export default MuiTimePicker;
