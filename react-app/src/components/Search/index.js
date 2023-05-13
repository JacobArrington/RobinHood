import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStocks, fetchStockHistory } from "../../store/stock";
import StockChart from "../Graph/chart";
import './StockHistory.css'


export default function StockSearch(){
    const dispatch = useDispatch()
    const allStocks = useSelector((state) => state.stocksReducer)
    const [searchInput, setSearchInput] = useState('')
    const [selectedStockId, setSelectedStockId] = useState(null);
    const [timeframe, setTimeFrame] = useState('monthly')

    useEffect(() => {
        dispatch(fetchStocks)
    }, [dispatch])

    const handleChange = (e) =>{
        e.preventDefault();
        setSearchInput(e.target.value);

        const result = Object.values(allStocks).filter(stock =>{
            if(e.target.value === "") return stock
            return stock.name.toLowerCase().includes(e.target.value.toLowerCase())
        })
        setSelectedStockId(result[0]?.id)
        dispatch(fetchStockHistory(result[0]?.id))

    }
    const handleTimeframeChange =(e) =>{
        setTimeFrame(e .target.value)
    }
    
}
