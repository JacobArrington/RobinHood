import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { fetchTransaction } from "../../store/transaction";
import "../Wallet";
import "./ownedStock.css";
import Wallet from "../Wallet";

const OwnedStock = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.session.user.id);
  const allTransactions = useSelector((state) => state?.transactionReducer);
  const stocks = useSelector((state) => state.stocksReducer);

  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchTransaction());
      setIsDataLoaded(true);
    };
    fetchData();
  }, [dispatch]);

  if (!isDataLoaded || !allTransactions) {
    return null;
  }

  const userTransactions = Object.values(allTransactions).filter(
    (transaction) => transaction.user_id === userId
  );

  const userOwnedStocks = userTransactions.reduce((acc, transaction) => {
    const stock = stocks[transaction.stock_id];
    if (!stock) return acc; 

    const shares = Number(transaction.total_shares);
    let newTotalShares = (acc[transaction.stock_id]?.totalShares || 0);

    if (transaction.transaction_type === "buy") {
      newTotalShares += shares;
    } else if (transaction.transaction_type === "sell") {
      newTotalShares -= shares;
    }

    if (newTotalShares > 0) {
      acc[transaction.stock_id] = {
        stockName: stock.name,
        ticker: stock.ticker,
        totalShares: newTotalShares,
        totalValue: newTotalShares * stock.price
      };
    } else {
      delete acc[transaction.stock_id];
    }

    return acc;
  }, {});

  const totalShares = Object.values(userOwnedStocks).reduce(
    (sum, stock) => sum + stock.totalShares,
    0
  );

  const mainStocks = [];
  let otherShares = 0;

  Object.values(userOwnedStocks).forEach(stock => {
    const stockPercentage = (stock.totalShares / totalShares) * 100;
    if (stockPercentage < 5) {
      otherShares += stock.totalShares;
    } else {
      mainStocks.push(stock);
    }
  });

  if (otherShares > 0) {
    mainStocks.push({ stockName: "Other", ticker:"Other", totalShares: otherShares });
  }

  const chartData = mainStocks.map(stock => ({
    name: stock.stockName,
    symb: stock.ticker,
    value: stock.totalShares
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const percent = (data.value / totalShares) * 100;

      return (
        <div className="custom-tooltip" style={{ color: 'black' }}>
          <div className="tooltip-item">{`Name: ${data.name}`}</div>
          <div className="tooltip-item">{`Shares: ${data.value}`}</div>
          <div className="tooltip-item">{`Percentage: ${percent.toFixed(2)}%`}</div>
        </div>
      );
    }
    return null;
  };

  const RADIAN = Math.PI / 180;
  const renderLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    symb
}) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
    let rotateAngle = -midAngle;
    
    return (
        <text
            x={x}
            y={y}
            fill="black"
            textAnchor={x > cx ? "start" : "end"}
            dominantBaseline="central"
            transform={`rotate(${rotateAngle}, ${x}, ${y})`}
        >
            {symb}
        </text>
    );
};

  const COLORS = [
    '#0088FE', '#00C49F', '#FFBB28', '#FF8042', 
    '#A0D468', '#FC6E51', '#967ADC', '#37BC9B', 
    '#3BAFDA', '#D770AD', '#F6BB42', '#E9573F', 
    '#8CC152', '#656D78', '#434A54', '#EC87C0', 
    '#4FC1E9', '#A0D468', '#AC92EC', '#5D9CEC'
  ];

  return (
    <div className="owned-stock-container">
      <div className="pie-wrapper">
      <PieChart width={700} height={700}>
        <Pie
          data={chartData}
          cx={350}
          cy={350}
          outerRadius={150}
          fill="#8884d8"
          dataKey="value"
          labelLine={false}
          label={renderLabel}
        >
          {
            chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
          }
        </Pie>
        <Tooltip content={<CustomTooltip />} />
      </PieChart>
      </div>
     
    </div>
  );
};

export default OwnedStock;
