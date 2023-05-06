import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { fetchStocks, fetchStockHistory } from "../../store/stock";
import StockChart from "../Graph/chart";
import './StockHistory.css'


const StockHistory = () => {
    const dispatch = useDispatch()
    const allStocks = useSelector((state) => state.stocksReducer)
    const [timeframe, setTimeFrame] = useState('monthly')
    const [selectedStockId, setSelectedStockId] = useState(null);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(!open);
    };

    const handleMenuOne = () => {
        // do something
        setOpen(false);
    };

    useEffect(() =>{
        dispatch(fetchStocks)
    })

    const handleStockClick = (stockId) => {
        setSelectedStockId(stockId);
        dispatch(fetchStockHistory(stockId))
    }

    const handleTimeframeChange =(e) =>{
        setTimeFrame(e.target.value)
    }


    return (
     <div>
         <select value={timeframe} onChange={handleTimeframeChange}>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="yearly">Yearly</option>
            </select>
        <div className="dropdown">
            <button onClick={handleOpen}>Stocks</button>
                {open ? (
                    <ul className="menu">
                        {Object.values(allStocks).map(stock =>(
                            <li lassName="menu-item" key ={stock.id} onClick={() => handleStockClick(stock.id)}>
                                {stock.name}
                            </li>
                        ))}
                        {selectedStockId && (
                        <StockChart stockHistory={allStocks[selectedStockId].stockHistory} timeframe ={timeframe}/>)}
                    </ul>
            ) : null}
        </div>
    </div>);
}

export default StockHistory;
