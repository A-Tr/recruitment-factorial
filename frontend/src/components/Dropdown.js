import React from 'react';
import {
  Box,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
} from '@mui/material';

export default function Dropdown({handleChange}) {
  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <FormControl>
        <Typography variant="h5" component="div" sx={{flexGrow: 1}}>
            Group metrics by
        </Typography>
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
    </Box>
  );
}
