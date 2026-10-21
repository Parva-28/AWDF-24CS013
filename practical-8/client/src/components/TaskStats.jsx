// Heavy third-party chart (recharts). This module is only downloaded when the Tasks page needs it.
import { Cell, Legend, Pie, PieChart, Tooltip } from 'recharts'

const COLORS = ['#1f4e79', '#9aa6b6']

export default function TaskStats({ tasks }) {
  const done = tasks.filter((task) => task.completed).length
  const data = [
    { name: 'Done', value: done },
    { name: 'Open', value: tasks.length - done },
  ]

  return (
    <div className="chart-wrap" aria-label={`${done} of ${tasks.length} tasks done`}>
      <PieChart width={260} height={200}>
        <Pie data={data} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} isAnimationActive={false}>
          {data.map((entry, index) => (
            <Cell key={entry.name} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  )
}
