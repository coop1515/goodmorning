import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import koLocale from "dayjs/locale/ko";
import * as React from "react";


export default function EndDatePick(props) {
  const [datePickerValue, setDatePickerValue] = React.useState(dayjs());
  const endHandler = (value) => {
    setDatePickerValue(value.$d);
    props.setClickedEnd(value.$d)
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={koLocale}>
      <Stack spacing={3}>
        
        <DatePicker
          value={props.clickedEnd}
          onChange={endHandler}
          renderInput={(params) => <TextField {...params} />}
          label='종료일시'

        />

      </Stack>
    </LocalizationProvider>
  );
}
