import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './chart.css'

const StockChart = ({stockHistory}) => {
  if(!stockHistory){
    return <div>No Stock Avail</div>
  }

    let data = Object.values(stockHistory).map((history) => ({
        date: new Date(history.date).toLocaleDateString(),
        price: history.price
    }))
    console.log(data)

    return (
      <ResponsiveContainer width={1500} height={750}>
        <LineChart
          width={1200}
          height={600}
          data={data}
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
  }

  export default StockChart
