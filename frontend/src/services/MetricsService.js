import getToken from '../helpers/AuthHeader';
import {get, post} from '../helpers/Fetch';

const getMetrics = ({groupBy}) => {
  return get(`http://localhost:4000/api/metrics?groupBy=${groupBy}`, getToken());
};

const insertMetric = ({name, value, timestamp}) => {
  return post(`http://localhost:4000/api/metrics`, getToken(), {name, value, timestamp});
};

const MetricsService = {
  getMetrics,
  insertMetric,
};

export default MetricsService;
