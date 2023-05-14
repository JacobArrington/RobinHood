import React, { useState, useEffect } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { fetchStocks, fetchStockHistory } from "../../store/stock";
import SearchResModal from "../SearchResModal";
import OpenModalButton from "../OpenModalButton";
import StockChart from "../Graph/chart";
// abc

export default function StockSearch() {
    const dispatch = useDispatch()
    const allStocks = useSelector((state) => state.stocksReducer)
    const [searchInput, setSearchInput] = useState('')
    const [searchResults, setSearchResults] = useState([]);
    const [selectedStockId, setSelectedStockId] = useState(null);
    const [timeframe, setTimeFrame] = useState('monthly')

    useEffect(() => {
        dispatch(fetchStocks)
    }, [dispatch])

  
    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);

        const results = Object.values(allStocks).filter(stock => {
            if (e.target.value === "") return stock
            return stock.name.toLowerCase().includes(e.target.value.toLowerCase())
        })
       setSearchResults(results)

    }
    const handleStockSelect = (stockId) => {
        setSelectedStockId(stockId);
        dispatch(fetchStockHistory(stockId));
      };

    const handleTimeframeChange = (e) => {
        setTimeFrame(e.target.value)
    }
    return (
        <>
            <div className=" search-container">
                <input
                    type="text"
                    placeholder="Search for a stock"
                    className="searchField"
                    value={searchInput}
                    onChange={handleChange}


                />
                <OpenModalButton
        modalComponent={<SearchResModal searchResults={searchResults} onStockSelect={handleStockSelect} />}
        buttonText="Search"
      />


            </div>
            <select value={timeframe} onChange={handleTimeframeChange}>
                <option value='daily'>Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="yearly">Yearly</option>
                <option value="full history">Full History</option>
            </select>
            {selectedStockId && (
                <StockChart
                    stockHistory={allStocks[selectedStockId].stockHistory}
                    timeframe={timeframe} ticker={allStocks[selectedStockId].ticker}
                    stock={allStocks[selectedStockId]} />)}
        </>
    )
}
