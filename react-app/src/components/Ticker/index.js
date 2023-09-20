import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStocks } from '../../store/stock';
import './ticker.css';

function Ticker(){
  const dispatch = useDispatch();
  const stocksArray = useSelector((state) => Object.values(state.stocksReducer || {}));



  useEffect(() => {
      dispatch(fetchStocks());
  },[dispatch])

  return (
      <div className="ticker">
        
          <div className="ticker-content">
              {stocksArray.map((stock) => (
                  // Check if price exists before using toFixed
                  <span key={stock.id} className="ticker-item">
                      {stock.ticker}: ${stock.price ? stock.price.toFixed(2) : "N/A"}
                  </span>
              ))}
          </div>
      </div>
  );
}
       
 export default Ticker;  
