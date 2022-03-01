import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
interface IDatePickerProps {
  label: string;
  name: string
}
const StatementDatePicker : React.FC<IDatePickerProps> = ({label, name}) => {
  const [value, setValue] = React.useState<Date | null>(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label={label}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => <TextField name={name} {...params} />}
      />
    </LocalizationProvider>
  );
}

export default StatementDatePicker;