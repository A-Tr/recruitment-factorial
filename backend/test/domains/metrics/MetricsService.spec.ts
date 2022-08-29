import 'reflect-metadata';
import { container } from 'tsyringe';
import { MetricsRepository } from '../../../src/domains/metrics/MetricsRepository';
import { MetricsService } from '../../../src/domains/metrics/MetricsService';

const mockRepoFind = jest.fn();
const mockMetricsRepo = {
  find: mockRepoFind,
};

// 2 temperature metrics, one in the first minute and one in the second
// 3 voltage metrics, 2 in the first minute and one in the second
// 2 humidity metrics, both in the first minute
const MOCK_METRICS_DB = [
  {
    name: 'temperature',
    value: 24,
    timestamp: 0,
  },
  {
    name: 'temperature',
    value: 36,
    timestamp: 61,
  },
  {
    name: 'voltage',
    value: 3,
    timestamp: 0,
  },
  {
    name: 'voltage',
    value: 5,
    timestamp: 32,
  },
  ,
  {
    name: 'voltage',
    value: 6,
    timestamp: 61,
  },
  {
    name: 'humidity',
    value: 1,
    timestamp: 0,
  },
  {
    name: 'humidity',
    value: 4,
    timestamp: 32,
  },
];

describe('MetricsService tests', () => {
  let service: MetricsService;

  beforeEach(() => {
    jest.resetAllMocks();
    service = container
      .register<MetricsRepository>(MetricsRepository, { useValue: mockMetricsRepo as unknown as MetricsRepository })
      .resolve(MetricsService);
  });

  describe('getMetricsByNameAvg tests', () => {
    test('Should retrieve metrics from database and group them by average / minute', async () => {
      mockRepoFind.mockResolvedValue(MOCK_METRICS_DB);

      const result = await service.getMetricsByNameAvg('minute');
      expect(result.temperature.length).toEqual(2);
      expect(result.temperature[0].average).toEqual(24)
      expect(result.temperature[1].average).toEqual(36)

      expect(result.voltage.length).toEqual(2);
      expect(result.voltage[0].average).toEqual(4)
      expect(result.voltage[1].average).toEqual(6)

      expect(result.humidity.length).toEqual(1);
      expect(result.humidity[0].average).toEqual(2.5)
    });
  });
});
