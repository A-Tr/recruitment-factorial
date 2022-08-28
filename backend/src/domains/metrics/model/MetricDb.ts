import mongoose from "mongoose";

export interface Metric {
  name: string,
  value: number,
  timestamp: number,
}

export interface MetricDb extends mongoose.Document {
  name: string,
  value: number,
  timestamp: number,
}

export const MetricSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    value: { type: Number, required: true},
    timestamp: { type: Number, required: true},
  }
)

export const MetricModel = mongoose.model<MetricDb>('Metric', MetricSchema)