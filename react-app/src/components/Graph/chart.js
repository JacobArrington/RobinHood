import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './chart.css'

const StockChart = ({stockHistory}) => {
  if (!stockHistory) {
    return <div>No Stock Avail</div>;
  }

  let data = []

  Object.values(stockHistory).forEach((history) => {
    if (history.stockHistory) {
      Object.entries(history.stockHistory).forEach(([date, price]) => {
        data.push({
          date: history.date,
          price: history.close_price,
        });
      });
    }
  });
  
  console.log("Data for chart:", data);
  

    return (
      <ResponsiveContainer width='70%' height={750}>
        <LineChart
          width={1200}
          height={750}
          data={data}
          margin={{
            top: 5,
            right: 30,
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
  }


  export default StockChart
