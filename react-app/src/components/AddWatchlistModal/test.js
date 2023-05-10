import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { fetchWatchlist, postWatchlist } from "../../store/watchlist";
// import { fetchStocks} from "../../store/stock";
import "./AddWatchlist.css";

function AddWatchlistModal() {
   const dispatch = useDispatch();
   const storeWatchlist = useSelector(state => state.watchlist);
   const allStocks = useSelector((state) => state.stocksReducer);
   const stocks = Object.values(allStocks)

   const [name, setName] = useState('');
   const [watchlist, setWatchlist] = useState([]);
   const [addStock, setAddStock] = useState()

   const { closeModal } = useModal();

   const handleAddStock = async (e) => {
      e.preventDefault()
      setAddStock(e.target.value)
   }

   const handleSubmit = async () => {
      dispatch(postWatchlist(watchlist))
   }


   return (
      <form onSubmit={handleSubmit}>
         <label>
            Watchlist Name:
            <input type="text"
               value={name}
               onChange={(e) => setName(e.target.value)} />
         </label>

         <label>
            Stocks:
            <select key={stock.id} value={watchlist} onChange={setWatchlist}>
               {stocks.map(stock => (
                  <option value={addStock} onClick={handleAddStock}>
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
