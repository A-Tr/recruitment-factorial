import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

export default function InsertMetric() {
  const [metricName, setMetricName] = useState('temperature');
  const navigate = useNavigate();

  function handleSubmitMetric(e) {
    const data = new FormData(e.currentTarget);
    return MetricsService.insertMetric({
      name: metricName,
      value: parseInt(data.get('value')),
      timestamp: Date.now() / 1000,
    }).then(() => {
      navigate('/dashboard');
    }).catch((err) => {
      debugger;
      console.log(JSON.stringify(err));
    });
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          component="form"
          onSubmit={(e) => {
            e.currentTarget.set('name', metricName);
            handleSubmitMetric(e);
          }}
          noValidate
          sx={{mt: 1}}
        >
          <FormControl>
            <Select
              id="name"
              value={metricName}
              label="Metric Name"
              onChange={(e) => setMetricName(e.target.value)}
            >
              <MenuItem value="temperature">Temperature</MenuItem>
              <MenuItem value="voltage">Voltage</MenuItem>
              <MenuItem value="humidity">Humidity</MenuItem>
            </Select>
            <TextField
              margin="normal"
              required
              fullWidth
              id="value"
              label="Metric Value"
              name="value"
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{mt: 3, mb: 2}}
            >
            Insert Metric
            </Button>
          </FormControl>
        </Box>
      </Box>
    </Container>
  );
}
