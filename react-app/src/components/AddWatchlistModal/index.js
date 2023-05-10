import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { fetchWatchlist, postWatchlist } from "../../store/watchlist";
import { fetchStockHistory } from "../../store/stock";
import "./AddWatchlist.css";

function AddWatchlistModal() {
   const dispatch = useDispatch();
   const allStocks = useSelector((state) => state.stocksReducer);
   const user = useSelector(state => state.session.user)

   const [name, setName] = useState('');
   const [selectStockId, setSelectStockId] = useState([]);

   const { closeModal } = useModal();

   console.log('line 17<------1------>', allStocks)
   const handleStockSelect = (e) =>{
      const selectId = parseInt(e.target.value);
      if(selectStockId.includes(selectId)){
         setSelectStockId(selectStockId.filter(id => id !== selectId));
      }else{
         setSelectStockId([...selectStockId, selectId]);
      }
   }

   const handleSubmit = async (e) => {
      e.preventDefault();
      const watchlistData = {
         user_id:user.id,
         name,
         stock_ids:selectStockId
      }
      await dispatch(postWatchlist(watchlistData))
      await dispatch(fetchWatchlist())
      setName("")
      setSelectStockId([])
      closeModal()
   };



   return (
      <form onSubmit={handleSubmit}>
         <label>
            Watchlist Name:
            <input type="text"
               value={name}
               onChange={(e) => setName(e.target.value)} required />
         </label>
         {Object.values(allStocks).map(stock =>(
            <div key={stock.id} className="stockSelect">
               <input 
                  type="checkbox"
                  value={stock.id}
                  checked={selectStockId.includes(stock.id)}
                  onChange={handleStockSelect}
               
               />
               <label>{stock.name}</label>
            </div>
         ))}
         <button type="submit">Create Watchlist</button>
      </form>
   )
}

export default AddWatchlistModal;
