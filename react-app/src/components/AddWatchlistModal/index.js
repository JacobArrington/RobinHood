import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { fetchWatchlist, postWatchlist } from "../../store/watchlist";
import { fetchStockHistory } from "../../store/stock";
import "./AddWatchlist.css";

function AddWatchlistModal() {
   const dispatch = useDispatch();
   const allStocks = useSelector((state) => state.stocksReducer);

   const [name, setName] = useState('');
   const [stock, setStock] = useState(null);

   const { closeModal } = useModal();

   console.log('line 17<------1------>', allStocks)
   const handleStockClick = async (stockId) => {
      setStock(stockId);
      dispatch(fetchStockHistory(stockId))

      const WatchlistData = {
         name: name,
         stockId
      };
      const Success = await dispatch(postWatchlist(WatchlistData));
      if (Success) {
         dispatch(fetchWatchlist());
         closeModal();
      }
   }

   const handleSubmit = async (e) => {
      e.preventDefault();
   };



   return (
      <form onSubmit={handleStockClick}>
         <label>
            Watchlist Name:
            <input type="text"
               value={name}
               onChange={(e) => setName(e.target.value)} />
         </label>
         <select>

         </select>
         <label>
            {Object.values(allStocks).map(stock => (
               <div key={stock.name} onClick={() => handleStockClick(stock.id)}>
               {stock.name}
               <select>
                  <option value={allStocks}>{allStocks.name}</option>

               </select>
            </div>
         ))}


         </label>
         <button type="submit">Create Watchlist</button>
      </form>
   )
}

export default AddWatchlistModal;
