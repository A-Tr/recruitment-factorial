import * as dotenv from 'dotenv';
dotenv.config()

import { MetricModel } from '../src/domains/metrics/model/MetricDb';
import { connectToDb, disconnectFromDb } from '../src/common/Database';


async function seedMetrics() {
  await connectToDb()
  // We seed data from 3 days ago
  const now = Math.floor(Date.now() / 1000)
  let from = now - 60 * 60 * 24 * 3


  while (from < now) {
    await MetricModel.insertMany([
      {name: 'temperature', value: Math.floor(Math.random() * 50), timestamp: from},
      {name: 'voltage', value: Math.floor(Math.random() * 12), timestamp: from},
      {name: 'humidity', value: Math.floor(Math.random() * 100), timestamp: from},
    ])
    // each ten minutes
    from += 60 * 10
  }
  console.log('Metrics created')
  await disconnectFromDb()
}

seedMetrics()