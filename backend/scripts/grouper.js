const _ = require('lodash')
const testMetrics = [
  {value: 1, timestamp: 0},
  {value: 3, timestamp: 1},
  {value: 5, timestamp: 2},
  {value: 2, timestamp: 3},
  {value: 7, timestamp: 4},
  {value: 6, timestamp: 5},
  {value: 6, timestamp: 6},
  {value: 2, timestamp: 7},
  {value: 4, timestamp: 8},
  {value: 8, timestamp: 9},
  {value: 9, timestamp: 10},
  {value: 1, timestamp: 11},
  {value: 2, timestamp: 12},
  {value: 5, timestamp: 13},
  {value: 3, timestamp: 14},
  {value: 3, timestamp: 15},
  {value: 3, timestamp: 16},
]

function roundToNearestUnitTime(timestampSeconds, unitTime = 'minutes') {
  

  // 👇️ replace Math.round with Math.ceil to always round UP
  return Math.round(date.getTime() / unitTime) * unitTime;
}

function getGroupedMetrics(metrics, timeAggregator) {
  return metrics.reduce((acc, curr) => {
    const roundedTimestamp = Math.round((curr.timestamp / timeAggregator))
    if (!acc[roundedTimestamp]) {
      acc[roundedTimestamp] = [curr.value]
    } else {
      acc[roundedTimestamp].push(curr.value)
    }
    return acc
  }, {})
}

console.log(splitByInterval(testMetrics, 3))