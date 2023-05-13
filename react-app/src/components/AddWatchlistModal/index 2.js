import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { fetchWatchlist, postWatchlist } from "../../store/watchlist";
// import { fetchStocks} from "../../store/stock";
import "./AddWatchlist.css";

function AddWatchlistModal() {
   const dispatch = useDispatch();
   const allStocks = useSelector((state) => state.stocksReducer);
   const user = useSelector(state => state.session.user.id)
   const stocks = Object.values(allStocks)

   const [name, setName] = useState('');
   const [stock, setStock] = useState([{}]);


   const { closeModal } = useModal();

   const handleStockSubmit = async (e) => {
      e.preventDefault();

      console.log('line 17<------1------>', user)
      const WatchlistData = {
         stock_id: stock,
         user_id: user,
         name
      };


      const Success = await dispatch(postWatchlist(WatchlistData));
      if (Success) {
         dispatch(fetchWatchlist(WatchlistData)).then(() => closeModal());
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
            <select value={stock.id} onChange={handleStockClick}>
               {stocks.map(stock => (
                  <option key={stock.id} value={stock.id} onClick={handleStockClick}>
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
