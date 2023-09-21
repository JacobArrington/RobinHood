import React, { useState, useEffect } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { fetchStocks, fetchStockHistory } from "../../store/stock";
import StockChart from "../Graph/chart";
import SearchResModal from "../SearchResModal";
import "./Search.css";


export default function StockSearch() {
    const dispatch = useDispatch()
    const allStocks = useSelector((state) => state.stocksReducer)
    const [searchInput, setSearchInput] = useState('')
    const [searchResults, setSearchResults] = useState([]);
    const [selectedStockId, setSelectedStockId] = useState(null);
    const [timeframe, setTimeFrame] = useState('monthly')
    const [stocksLoaded, setStocksLoaded] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const { openModal } = useModal();
    const [hasFetchedInitialHistory, setHasFetchedInitialHistory] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        dispatch(fetchStocks());
      }, [dispatch]);
    
      useEffect(() => {
        if (Object.keys(allStocks).length > 0 && !hasFetchedInitialHistory) {
          const firstStockId = Object.keys(allStocks)[0];
          setSelectedStockId(firstStockId);
    
          const fetchInitialHistory = async () => {
            await dispatch(fetchStockHistory(firstStockId));
            setHasFetchedInitialHistory(true);
          }
    
          fetchInitialHistory();
        }
      }, [allStocks,  hasFetchedInitialHistory]);
    
      useEffect(() => {
        if (selectedStockId) {
          setIsLoading(true);
          dispatch(fetchStockHistory(selectedStockId))
            .then(() => setIsLoading(false))
            .catch(() => setIsLoading(false)); // make sure to stop loading even if there's an error
        }
      }, [selectedStockId, dispatch]);
    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    
        if (Object.keys(allStocks).length > 0) {
            const results = Object.values(allStocks).filter(stock => {
                if (e.target.value === "") return stock;
                return stock.name.toLowerCase().includes(e.target.value.toLowerCase());
            });
            setSearchResults(results);
        }
    };
    
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
                    placeholder="press enter to list all stocks"
                    className="searchField"
                    value={searchInput}
                    onChange={handleChange}
                    onClick={handleChange}
                    onKeyDown={handleKeyDown}

                />
          {showModal && <SearchResModal searchResults={searchResults} onStockSelect={handleStockSelect} />}
      </div>
            </div>
            {/* <select value={timeframe} onChange={handleTimeframeChange}>
                <option value='daily'>Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="yearly">Yearly</option>
                <option value="full history">Full History</option>
            </select> */}
            
            {selectedStockId && (
                <StockChart
                    stockHistory={allStocks[selectedStockId].stockHistory}
                    timeframe={timeframe} ticker={allStocks[selectedStockId].ticker}
                    stock={allStocks[selectedStockId]} />)}
                    
        </>
    )
}
