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
  let otherStockDetails = [];

  
  Object.values(userOwnedStocks).forEach(stock => {
    const stockPercentage = (stock.totalShares / totalShares) * 100;
    if (stockPercentage < 5) {
        otherStockDetails.push(stock);
    } else {
        mainStocks.push(stock);
    }
});

if (otherStockDetails.length) {
    mainStocks.push({
        stockName: "Other",
        ticker: "Other",
        totalShares: otherStockDetails.reduce((sum, stock) => sum + stock.totalShares, 0),
        otherStocks: otherStockDetails
    });
}

const chartData = mainStocks.map(stock => ({
    name: stock.stockName,
    symb: stock.ticker,
    value: stock.totalShares,
    otherStocks: stock.otherStocks // Include the otherStocks in the chart data for "Other" category
}));

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;

        if (data.name === "Other" && data.otherStocks) {
            return (
                <div className="custom-tooltip" style={{ color: 'black' }}>
                    <div className="tooltip-item">{`Name: ${data.name}`}</div>
                    {data.otherStocks.map(stock => {
                        const percent = (stock.totalShares / totalShares) * 100;
                        return (
                            <div key={stock.ticker} className="tooltip-item">
                                {`${stock.ticker}: `}
                                {`${stock.totalShares} shares, `}
                                {`${percent.toFixed(2)}%`}
                            </div>
                        );
                    })}
                </div>
            );
        } else {
            const percent = (data.value / totalShares) * 100;
            return (
                <div className="custom-tooltip" style={{ color: 'black' }}>
                    <div className="tooltip-item">{`Name: ${data.name}`}</div>
                    <div className="tooltip-item">{`Shares: ${data.value}`}</div>
                    <div className="tooltip-item">{`Percentage: ${percent.toFixed(2)}%`}</div>
                </div>
            );
        }
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
  symb,
}) => {
  const pathId = `path-${symb}`;  // unique ID for the path

  

  const startX = cx + innerRadius * Math.cos(-midAngle * RADIAN);
  const startY = cy + innerRadius * Math.sin(-midAngle * RADIAN);
  const endX = cx + outerRadius * Math.cos(-midAngle * RADIAN);
  const endY = cy + outerRadius * Math.sin(-midAngle * RADIAN);

  let displayText = symb;
  if (symb === "Other") {
      displayText = "Other >5%";
  }

  return (
      <>
          <defs>
              <path
                  id={pathId}
                  d={`M ${startX} ${startY} L ${endX} ${endY}`}
              />
          </defs>
          <text fill="black">
              <textPath href={`#${pathId}`} startOffset="40%">
                  {displayText}
              </textPath>
          </text>
      </>
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
      <div className="chart-and-wallet">
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
        <Wallet />
      </div>
    </div>
  );
            }

export default OwnedStock;
