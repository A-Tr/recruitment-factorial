import React, {useEffect, useState} from 'react';

import MetricsChart from '../components/MetricsChart';
import MetricsService from '../services/MetricsService';
import Dropdown from '../components/Dropdown';
import {Box, Grid} from '@mui/material';

export default function Dashboard() {
  const [metrics, setMetrics] = useState('');
  const [groupBy, setGroupBy] = useState('minute');

  function handleChangeGroupBy(e) {
    setGroupBy(e.target.value);
  }

  useEffect(() => {
    MetricsService.getMetrics({groupBy})
        .then((respMetrics) => {
          setMetrics(respMetrics);
        });
  }, [groupBy]);

  return (
    <Box sx={{flexGrow: 1}}>
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <MetricsChart data={metrics} />
        </Grid>
        <Grid item xs={2}>
          <Dropdown handleChange={handleChangeGroupBy} />
        </Grid>
      </Grid>
    </Box>
  );
}
