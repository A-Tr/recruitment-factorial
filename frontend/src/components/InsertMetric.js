import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import TextField from '@mui/material/TextField';
import React, {useState} from 'react';
import MetricsService from '../services/MetricsService';
import Typography from '@mui/material/Typography';

export default function InsertMetric() {
  const [metricName, setMetricName] = useState('temperature');
  const [metricValue, setMetricValue] = useState(0);
  const [metricTimestamp, setMetricTimestamp] = useState(
      Math.floor(Date.now() / 1000),
  );

  function handleSubmitMetric() {
    MetricsService.insertMetric({
      name: metricName,
      value: parseInt(metricValue),
      timestamp: Math.floor(Date.now() / 1000),
    })
        .then(() => {
          location.reload();
        })
        .catch((err) => {
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
        <Box noValidate sx={{mt: 1}}>
          <Typography variant="h5" component="div" sx={{flexGrow: 1}}>
            Insert Metric
          </Typography>
          <FormControl>
            <FormLabel id="metricName">Metric Type</FormLabel>
            <RadioGroup
              aria-labelledby="metricName"
              value={metricName}
              name="metricName"
              onChange={(e) => setMetricName(e.target.value)}
            >
              <FormControlLabel
                value="temperature"
                control={<Radio />}
                label="Temperature"
              />
              <FormControlLabel
                value="voltage"
                control={<Radio />}
                label="Voltage"
              />
              <FormControlLabel
                value="humidity"
                control={<Radio />}
                label="Humidity"
              />
            </RadioGroup>
            <FormLabel id="metricValue">Metric Value</FormLabel>

            <TextField
              margin="normal"
              required
              fullWidth
              id="value"
              label="Metric Value"
              name="value"
              value={metricValue}
              autoFocus
              onChange={(e) => setMetricValue(e.target.value)}
            />
            <TextField
              margin="normal"
              fullWidth
              id="timestamp"
              label="Timestamp in seconds"
              name="timestamp"
              value={metricTimestamp}
              autoFocus
              onChange={(e) => setMetricTimestamp(e.target.value)}
            />
            <Button
              fullWidth
              variant="contained"
              onClick={handleSubmitMetric}
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
