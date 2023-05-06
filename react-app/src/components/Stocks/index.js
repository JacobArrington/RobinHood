import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStocks, fetchStockHistory } from "../../store/stock";
import StockChart from "../Graph/chart";
import "./stock.css";

const Stock = () => {
  const dispatch = useDispatch();
  const allStocks = useSelector((state) => state.stocksReducer);
  const [selectedStockId, setSelectedStockId] = useState(null);
  const selectedStockHistory = useSelector((state) => state.stocksReducer[selectedStockId]?.stockHistory);
  
  const [timePeriod, setTimePeriod] = useState("");

  useEffect(() => {
    dispatch(fetchStocks(timePeriod));
  }, [dispatch, timePeriod]);

  const handleStockClick = (stockId) => {
    setSelectedStockId(stockId);
    dispatch(fetchStockHistory(stockId));
  };

  const handleTimeChange = (e) => {
    setTimePeriod(e.target.value);
  };

  return (
    <div className="stockListContainer">
      <div className="stockListFilter">
        <label htmlFor="stockListTimeFilter">Time Period</label>
        <select
          name="stockListTimeFilter"
          value={timePeriod}
          onChange={handleTimeChange}
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="quaterly">Quarterly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>
      {selectedStockId && (
        <div className="selectedStockChart">
          <StockChart stockHistory={selectedStockHistory} />
        </div>
      )}
      <div className="stockList">
        {Object.values(allStocks).map((stock) => (
          <div key={stock.id}>
            <div onClick={() => handleStockClick(stock.id)}>
              {stock.name}
            </div>
            {selectedStockId === stock.id && (
              <StockChart key={stock.id} stockHistory={selectedStockHistory} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stock;
