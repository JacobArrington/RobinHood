import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { fetchWatchlist, editWatchlist } from "../../store/watchlist";
import "./EditWatchlist.css";

function EditWatchlistModal({ watchlistId }) {
   const dispatch = useDispatch();
   const allStocks = useSelector((state) => state.stocksReducer);
   const user = useSelector(state => state.session.user)
   const watchlist = useSelector(state => state.watchlistReducer[watchlistId])

   const [name, setName] = useState('');
   const [selectStockId, setSelectStockId] = useState([]);

   const { closeModal } = useModal();

   useEffect(() => {
      if (watchlist) {
         setName(watchlist.name)
         setSelectStockId(watchlist.stock_ids || [])
      }
   }, [watchlist,watchlist.name, watchlist.stock_ids])

   const handleStockSelect = (e) =>{
      const selectedId = parseInt(e.target.value);
      setSelectStockId(prev => [...prev, selectedId]);
   }

   const handleStockRemove = (e) =>{
      const selectedId = parseInt(e.target.value);
      setSelectStockId(prev => prev.filter(id => id !== selectedId));
   }

   const handleSubmit = async (e) => {
      e.preventDefault();
      const watchlistData = {
          user_id: user.id,
          name,
          stock_ids: selectStockId
      }

      console.log('selectStockId:', selectStockId); 
    console.log('watchlist.stock_ids:', watchlist.stock_ids); 

  
      const stocksToAdd = watchlist && watchlist.stock_ids
      ? selectStockId.filter((id) => !watchlist.stock_ids.includes(id))
      : [];
      const stocksToRemove = watchlist && watchlist.stock_ids
      ? watchlist.stock_ids.filter((id) => !selectStockId.includes(id))
      : [];

    console.log('stocksToAdd:', stocksToAdd); 
    console.log('stocksToRemove:', stocksToRemove); 

  
      for(const stock_id of stocksToAdd){
          watchlistData.action ='add'
          watchlistData.stock_id = stock_id
          console.log("Adding stock, watchlist:", watchlist) 
          await dispatch(editWatchlist(watchlist.id,watchlistData))
          await dispatch(fetchWatchlist())
      }
      for(const stock_id of stocksToRemove){
          watchlistData.action ='remove'
          watchlistData.stock_id = stock_id
          await dispatch(editWatchlist(watchlist.id,watchlistData))
          await dispatch(fetchWatchlist())
      }
  
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
                  onChange={selectStockId.includes(stock.id) ? handleStockRemove : handleStockSelect}
               
               />
               <label>{stock.name}</label>
            </div>
         ))}
         <button type="submit">Edit Watchlist</button>
      </form>
   )
}

export default EditWatchlistModal;
