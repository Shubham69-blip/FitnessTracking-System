
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function ProgressChart({ data }) {
  return (
    <div className="chart-container">
      <div className="chart-heading">
        <div>
          <h3>Activity Overview</h3>
          <p>Your weekly workout performance</p>
        </div>
        <span className="chart-period">This Week</span>
      </div>

      <div className="chart-area">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid stroke="#263244" strokeDasharray="4 4" vertical={false} />
            <XAxis
              dataKey="day"
              stroke="#64748b"
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#64748b"
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                background: "#151d2c",
                border: "1px solid #263244",
                borderRadius: "10px",
                color: "#fff"
              }}
            />
            <Line
              type="monotone"
              dataKey="minutes"
              stroke="#a3e635"
              strokeWidth={3}
              dot={{ fill: "#a3e635", r: 4 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ProgressChart;
