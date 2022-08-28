export interface Metric {
  name: string,
  value: number,
  timestamp: number,
}



export type MetricsGroupBy = 'minute' | 'hour' | 'day'

export const metricsGroupByTimeMap = {
  'minute': 60,
  'hour': 60 * 60,
  'day': 60 * 60 * 24
}

export type MetricName = 'temperature' | 'voltage' | 'humidity'

export type GroupedMetrics = {
  [metricName: string]: {
    [timestamp: string]: number[] 
  }
}

interface MetricAverage { timestamp: string, average: number }
export interface GetMetricsResponse {
  temperature: MetricAverage[]
  voltage: MetricAverage[]
  humidity: MetricAverage[]
} 