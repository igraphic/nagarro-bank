import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { Stack, TextField } from "@mui/material";

export default function StatementAmountRange() {
  const [value, setValue] = React.useState<number[]>([0, 1000]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const handleMinAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValue([parseInt(event.target.value), value[1]]);
  };

  const handleMaxAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValue([value[0], parseInt(event.target.value)]);
  };

  return (
    <Box sx={{ my: 2 }}>
      <Stack direction="row">
        <TextField
          id="amount-min"
          sx={{ width: 200 }}
          name="minAmount"
          label="Min Amount"
          onChange={handleMinAmountChange}
          value={value[0]}
        />

        <TextField
          id="amount-max"
          sx={{ width: 200 }}
          name="maxAmount"
          label="Max Amount"
          onChange={handleMaxAmountChange}
          value={value[1]}
        />
      </Stack>
      <Slider
        getAriaLabel={() => "Amount range"}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        max={1000}
        step={10}
      />
    </Box>
  );
}
