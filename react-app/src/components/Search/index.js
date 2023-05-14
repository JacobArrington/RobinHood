import React, { useState, useEffect } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { fetchStocks, fetchStockHistory } from "../../store/stock";
import SearchResModal from "../SearchResModal";
import OpenModalButton from "../OpenModalButton";
import StockChart from "../Graph/chart";
import "./Search.css"

export default function StockSearch() {
    const dispatch = useDispatch()
    const allStocks = useSelector((state) => state.stocksReducer)
    const [searchInput, setSearchInput] = useState('')
    const [searchResults, setSearchResults] = useState([]);
    const [selectedStockId, setSelectedStockId] = useState(null);
    const [timeframe, setTimeFrame] = useState('monthly')
    const [showModal, setShowModal] = useState(false);
    const { openModal } = useModal();
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
        setShowModal(false)
      };
    
      const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            setShowModal(true);
        }
    }

    const handleTimeframeChange = (e) => {
        setTimeFrame(e.target.value)
    }
    return (
        <>
   <div className="search-container">
    < div className="search-bar-container">
                <input
                    type="text"
                    placeholder="Search for a stock"
                    className="searchField"
                    value={searchInput}
                    onChange={handleChange}
                    onClick={handleChange}
                    onKeyDown={handleKeyDown}

                />
          {showModal && <SearchResModal searchResults={searchResults} onStockSelect={handleStockSelect} />}
      </div>
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
