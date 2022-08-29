import { Model } from "mongoose"
import { inject, singleton } from "tsyringe"
import { DatabaseError } from "../../common/errors/DomainError"
import { getErrorMessage } from "../../common/errors/ErrorMapper"
import { Metric } from "./model/Metric"
import { MetricDb } from "./model/MetricDb"

@singleton()
export class MetricsRepository {
  constructor(@inject('MetricModel') private metricModel: Model<MetricDb>) {}

  async find(fromTimestamp?: number, upToTimestamp?: number) {
    const queryParams: {[key: string]: any} = {
      timestamp: { $gte: 0 },
    }
    if (fromTimestamp) {
      queryParams.timestamp['$gte'] = fromTimestamp
    }
    if (upToTimestamp) {
      queryParams.timestamp['$lte'] = upToTimestamp
    }

    try {
      return await this.metricModel.find(queryParams, null, { sort: {timestamp: 1 }})
    } catch (error) {
      throw new DatabaseError(`Error retrieving metrics from database. ${getErrorMessage(error)}`)
    }
  }

  async create(metric: Metric) {
    try {
      return await this.metricModel.create(metric)
    } catch (error) {
      throw new DatabaseError(`Error inserting metric ${metric}. ${getErrorMessage(error)}`)
    }
  }
}