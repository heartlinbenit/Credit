import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

function Charts({ transactions }) {
  const COLORS = ["#0088FE", "#FF8042"];

  const fraudCount = transactions.filter(tx => tx.isFraud).length;
  const nonFraudCount = transactions.length - fraudCount;

  const pieData = [
    { name: "Fraud", value: fraudCount },
    { name: "Non-Fraud", value: nonFraudCount },
  ];

  const dailyData = transactions.reduce((acc, tx) => {
    const date = new Date(tx.createdAt).toLocaleDateString();
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const barData = Object.keys(dailyData).map(date => ({ date, count: dailyData[date] }));

  return (
    <div className="charts-container">
      <div className="chart">
        <h3>Fraud vs Non-Fraud</h3>
        <PieChart width={300} height={300}>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>

      <div className="chart">
        <h3>Transactions Per Day</h3>
        <BarChart width={500} height={300} data={barData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#82ca9d" />
        </BarChart>
      </div>
    </div>
  );
}

export default Charts;
