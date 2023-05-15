import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStockHistory } from "../../store/stock";
import StockChart from "../Graph/chart";

const DefaultStockChart = ({ selectedStockId }) => {
  const dispatch = useDispatch();
  const allStocks = useSelector((state) => state.stocksReducer);
  const [defaultStockId, setDefaultStockId] = useState(null);
  const [timeframe, setTimeframe] = useState('monthly')

  useEffect(() => {
   
    if (Object.keys(allStocks).length > 0 && !defaultStockId) {
      const firstStockId = Object.keys(allStocks)[0];
      setDefaultStockId(firstStockId);
      dispatch(fetchStockHistory(firstStockId));
    }
  }, [allStocks, defaultStockId, dispatch]);

 
  const stockIdToDisplay = selectedStockId || defaultStockId;

  return (
    <>
      {stockIdToDisplay && (
        <StockChart
          stockHistory={allStocks[stockIdToDisplay].stockHistory}
          timeframe={timeframe} ticker={allStocks[stockIdToDisplay].ticker}
          stock={allStocks[stockIdToDisplay]} />
      )}
    </>
  )
}

export default DefaultStockChart;
