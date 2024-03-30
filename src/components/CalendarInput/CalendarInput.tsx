import React, { useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const CalendarInput = ({ setSelectedDate }: any): JSX.Element => {
  const [errorMessage, setError] = useState<any>();

  return (
    <div className="relative">
      <span className="absolute right-14 top-3 text-xs font-medium text-greyThinLightColor">46 Yrs</span>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]}>
          <DatePicker
            onChange={(newValue) => setSelectedDate(newValue)}
            disableFuture
            onError={(newError) => setError(newError)}
            slotProps={{
              textField: {
                helperText: errorMessage,
              },
            }}
          />
        </DemoContainer>
      </LocalizationProvider>

      {errorMessage && <p className="text-redErrorColor absolute font-normal text-small font-Inter mt-0.287 pl-1">{errorMessage}</p>}
    </div>
  );
};

export default CalendarInput;
