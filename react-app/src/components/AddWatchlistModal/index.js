import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { fetchWatchlist, postWatchlist } from "../../store/watchlist";
// import { fetchStocks} from "../../store/stock";
import "./AddWatchlist.css";

function AddWatchlistModal() {
   const dispatch = useDispatch();
   const allStocks = useSelector((state) => state.stocksReducer);
   const stocks = Object.values(allStocks)

   const [name, setName] = useState('');
   const [stock, setStock] = useState([]);

   const { closeModal } = useModal();

   const handleStockSubmit = async (e) => {
      e.preventDefault();
      // dispatch(fetchStocks(stock))

      console.log('line 17<------1------>', stock)
      const WatchlistData = {
         stockName: stock,
         stockId: stock
      };


      const Success = await dispatch(postWatchlist(WatchlistData));
      if (Success) {
         dispatch(fetchWatchlist(WatchlistData));
         closeModal();
      }
   }

   const handleStockClick = async (e) => {
      e.preventDefault()
      setStock(e.target.value)
   }

   return (
      <form onSubmit={handleStockSubmit}>
         <label>
            Watchlist Name:
            <input type="text"
               value={name}
               onChange={(e) => setName(e.target.value)} />
         </label>

         <label>
            Stocks:
            <select key={stock.id} value={stock} onChange={handleStockClick}>
               {stocks.map(stock => (
                  <option key={stock.id} value={stock} >
                     {/* {console.log(stock)} */}
                     {stock.name}
                  </option>
               ))}
            </select>
         </label>
         <button type="submit">Create Watchlist</button>
      </form>
   )
}

export default AddWatchlistModal;
