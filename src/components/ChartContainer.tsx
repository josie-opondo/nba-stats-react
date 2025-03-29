import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
interface StatData {
  id: number
  name: string
  abbreviation?: string
  stats: Record<string, number>
}
interface ChartContainerProps {
  data: StatData[]
  statCategory: string
  type: 'player' | 'team'
}
export const ChartContainer: React.FC<ChartContainerProps> = ({
  data,
  statCategory,
  type,
}) => {
  // Format data for recharts
  const chartData = data.map((item) => {
    if (type === 'player') {
      return {
        name: item.name,
        value: item.stats[statCategory],
        color: getRandomColor(item.id),
      }
    } else {
      return {
        name: item.abbreviation || item.name,
        value: item.stats[statCategory],
        color: getRandomColor(item.id),
      }
    }
  })
  // Get stat category label
  const getStatLabel = () => {
    const statLabels: {
      [key: string]: string
    } = {
      ppg: 'Points Per Game',
      rpg: 'Rebounds Per Game',
      apg: 'Assists Per Game',
      spg: 'Steals Per Game',
      bpg: 'Blocks Per Game',
      fg: 'Field Goal %',
      threePt: '3-Point %',
      ft: 'Free Throw %',
      wins: 'Wins',
      losses: 'Losses',
      oppg: 'Opponent PPG',
    }
    return statLabels[statCategory] || statCategory.toUpperCase()
  }
  // Generate random color based on id for consistency
  function getRandomColor(id: number) {
    const colors = [
      '#FF6B6B',
      '#4ECDC4',
      '#45B7D1',
      '#FFA07A',
      '#98D8C8',
      '#F06292',
      '#7986CB',
      '#9575CD',
      '#4DD0E1',
      '#81C784',
      '#DCE775',
      '#FFD54F',
    ]
    return colors[id % colors.length]
  }
  if (data.length === 0) {
    return (
      <div className="flex justify-center items-center h-64 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-gray-500">
          Select {type === 'player' ? 'players' : 'teams'} to view statistics
        </p>
      </div>
    )
  }
  return (
    <div className="h-80">
      <h3 className="text-lg font-medium mb-4">{getStatLabel()} Comparison</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip
            formatter={(value: number) => {
              if (
                statCategory === 'fg' ||
                statCategory === 'threePt' ||
                statCategory === 'ft'
              ) {
                return [`${value}%`, getStatLabel()]
              }
              return [value, getStatLabel()]
            }}
          />
          <Legend />
          <Bar dataKey="value" name={getStatLabel()} radius={[4, 4, 0, 0]}>
            {chartData.map((entry, index) => (
              <Bar key={`cell-${index}`} fill={entry.color} dataKey={''} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
