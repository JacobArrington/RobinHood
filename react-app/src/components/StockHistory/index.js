// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Redirect } from "react-router-dom";
// import { fetchStocks, fetchStockHistory } from "../../store/stock";
// import StockChart from "../Graph/chart";
// import './StockHistory.css'


// const StockHistory = () => {
//     const dispatch = useDispatch()
//     const allStocks = useSelector((state) => state.stocksReducer)

//     const [selectedStockId, setSelectedStockId] = useState(null);

//     useEffect(() =>{
//         dispatch(fetchStocks)
//     })

//     const handleStockClick = (stockId) => {
//         setSelectedStockId(stockId);
//         dispatch(fetchStockHistory(stockId))
//     }


//     return (
//      <div>
//         {Object.values(allStocks).map(stock =>(
//             <div key ={`{stock.id}_{stock.ticker} `}onClick={() => handleStockClick(stock.id)}>
//                 {stock.name}
//             </div>
//         ))}
//         {selectedStockId && (
//         <StockChart stockHistory={allStocks[selectedStockId].stockHistory}/>)}
//     </div>);
// }

// export default StockHistory;
