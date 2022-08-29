import getToken from '../helpers/AuthHeader';
import {get, post} from '../helpers/Fetch';

const getMetrics = ({groupBy}) => {
  return get(
      `${process.env.REACT_APP_API_BASE_URL}/api/metrics?groupBy=${groupBy}`,
      getToken(),
  );
};

const insertMetric = ({name, value, timestamp}) => {
  return post(`${process.env.REACT_APP_API_BASE_URL}/api/metrics`, getToken(), {
    name,
    value,
    timestamp,
  });
};

const MetricsService = {
  getMetrics,
  insertMetric,
};

export default MetricsService;
