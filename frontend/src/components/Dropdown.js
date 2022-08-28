import React from 'react';
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';

export default function Dropdown({handleChange}) {
  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">
        Metrics time aggregator
      </FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="minute"
        name="radio-buttons-group"
        onChange={handleChange}
      >
        <FormControlLabel value="minute" control={<Radio />} label="Minute" />
        <FormControlLabel value="hour" control={<Radio />} label="Hour" />
        <FormControlLabel value="day" control={<Radio />} label="Day" />
      </RadioGroup>
    </FormControl>
  );
}
