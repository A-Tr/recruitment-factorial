/* eslint-disable @typescript-eslint/ban-ts-comment */
import { inject, injectable, singleton } from 'tsyringe';
import { MetricsRepository } from './MetricsRepository';
import {
  GetMetricsResponse,
  GroupedMetrics,
  Metric,
  MetricName,
  MetricsGroupBy,
  metricsGroupByTimeMap,
} from './model/Metric';
import { MetricDb } from './model/MetricDb';

@singleton()
@injectable()
export class MetricsService {
  constructor(@inject(MetricsRepository) private metricsRepository: MetricsRepository) {}

  async getMetricsByNameAvg(
    groupBy: MetricsGroupBy,
    fromTimestamp?: number,
    upToTimestamp?: number,
  ): Promise<GetMetricsResponse> {
    const metricsDb = await this.metricsRepository.find(fromTimestamp, upToTimestamp);

    return this.groupMetricsByDateAvg(metricsDb, metricsGroupByTimeMap[groupBy]);
  }

  async createMetric(metric: Metric) {
    return this.metricsRepository.create(metric);
  }

  private groupMetricsByDateAvg(metricsDb: MetricDb[], timeAggregator: number) {
    const metricsMap: GroupedMetrics = metricsDb.reduce(
      (acc, curr) => {
        const roundedTimestamp = new Date(
          Math.floor(curr.timestamp / timeAggregator) * timeAggregator * 1000,
        ).toUTCString();
        const metricName = curr.name as MetricName;

        if (!acc[metricName][roundedTimestamp]) {
          acc[metricName][roundedTimestamp] = [curr.value];
        } else {
          acc[metricName][roundedTimestamp].push(curr.value);
        }
        return acc;
      },
      { temperature: {}, humidity: {}, voltage: {} } as GroupedMetrics,
    );

    const result: GetMetricsResponse = {
      temperature: [],
      voltage: [],
      humidity: [],
    };

    Object.keys(metricsMap).forEach((metricName) => {
      result[metricName as MetricName] = Object.keys(metricsMap[metricName]).map((timestamp) => {
        return {
          timestamp,
          average:
            metricsMap[metricName][timestamp].reduce((acc, curr) => acc + curr, 0) /
            metricsMap[metricName][timestamp].length,
        };
      });
    });

    return result;
  }
}
