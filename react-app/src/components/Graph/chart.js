import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './chart.css'
import { useHistory } from 'react-router-dom';


const filterDataByTimeframe = (data, timeframe) => {
  const currentDate = new Date()
  let filteredData = data
  switch (timeframe) {
    case 'daily':
      const lastDateInHistory = new Date(Math.max.apply(null, data.map((hist) => new Date(hist.date))));
      const previousDateInHistory = new Date(lastDateInHistory - 24 * 60 * 60 * 1000);
      filteredData = data.filter((hist) => {
        const histDate = new Date(hist.date);
        return lastDateInHistory.toDateString() === histDate.toDateString() || previousDateInHistory.toDateString() === histDate.toDateString();
      });
      break;
      case 'weekly':
        const latestDateInHistory = new Date(Math.max.apply(null, data.map((hist) => new Date(hist.date))));
        filteredData = data.filter((hist) => {
          const histDate = new Date(hist.date);
          const startOfLastWeek = new Date(latestDateInHistory.getTime() - 7 * 24 * 60 * 60 * 1000);
          return histDate >= startOfLastWeek && histDate <= latestDateInHistory;
        });
        break;


        case 'monthly':
          filteredData = data.filter((hist) => {
            const histDate = new Date(hist.date);
            const startOfLastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
            const endOfLastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
            return histDate >= startOfLastMonth && histDate <= endOfLastMonth;
          });
          break;
    case 'quarterly':
      filteredData = data.filter((hist) => {
        const histDate = new Date(hist.date);

        if (currentDate.getFullYear() !== histDate.getFullYear()) {
          return false;
        }

        const currentQuarterStartMonth = Math.floor(currentDate.getMonth() / 3) * 3;
        const currentQuarterEndMonth = currentQuarterStartMonth + 2;

        return histDate.getMonth() >= currentQuarterStartMonth && histDate.getMonth() <= currentQuarterEndMonth;
      });
      break;

    case 'yearly':
      filteredData = data.filter((hist) => {
        const histDate = new Date(hist.date);
        return currentDate.getFullYear() === histDate.getFullYear();
      });
      break;
    default:
      break;
  }

  return filteredData;
}

const StockChart = ({ stockHistory, timeframe }) => {
  if (!stockHistory) {
    return <div>No Stock Available</div>;
  }

  let data = Object.values(stockHistory).map((history) => ({
    date: new Date(history.date).toLocaleDateString(),
    price: history.price,
  }));

  let filteredData = filterDataByTimeframe(data, timeframe);

  return (
    <ResponsiveContainer width={1250} height={325}>
      <LineChart
        width={600}
        height={300}
        data={filteredData}
        margin={{
          top: 5,
          right: 40,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="price" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default StockChart;
