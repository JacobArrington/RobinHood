import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './chart.css'

const StockChart = ({stockHistory}) => {
  if(!stockHistory){
    return <div>No Stock Avail</div>
  }

    let data = Object.values(stockHistory).map((history) => ({
        date: history.date,
        price: history.price
    }))
    console.log(data)

    return (
      <ResponsiveContainer width={1200} height={750}>
        <LineChart
          width={500}
          height={300}
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
