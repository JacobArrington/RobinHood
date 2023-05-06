import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './chart.css'
import { useHistory } from 'react-router-dom';


const filterDataByTimeframe = (data, timeframe) => {
  const currentDate = new Date()
  let filteredData = data
  switch (timeframe) {
    case 'daily':
      filteredData = data.filter((hist) => {
        const histDate = new Date(hist.date);
        return currentDate.toLocaleString() === histDate.toDateString()
      });
      break;
    case 'weekly':
      filteredData = data.filter((hist) => {
        const histDate = new Date(hist.date);
        
        const daysDifference = Math.floor((currentDate - histDate) / (1000 * 60 * 60 * 24));
        return daysDifference <7
      })
      break;
    case 'monthly':
      filteredData = data.filter((hist) => {
        const histDate = new Date(hist.date);
        return currentDate.getMonth() === histDate.getMonth() && currentDate.getFullYear() === histDate.getFullYear()
        // checks if the histdate falls in same month and year as the currentDate
      })
      break;
    case 'quarterly':
      filteredData = data.filter((hist) => {
        const histDate = new Date(hist.date);
        const currentQuarter = Math.floor((currentDate.getMonth() + 3) / 3);
        const histQuarter = Math.floor((histDate.getMonth() + 3) / 3);
        return currentQuarter === histQuarter && currentDate.getFullYear() === histDate.getFullYear();
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
    <ResponsiveContainer width={1500} height={750}>
      <LineChart
        width={1200}
        height={600}
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
