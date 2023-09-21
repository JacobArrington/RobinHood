import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { fetchWatchlist, editWatchlist } from "../../store/watchlist";
import "../AddWatchlistModal/AddWatchlist.css";

function EditWatchlistModal({ watchlistId }) {
   const dispatch = useDispatch();
   const allStocks = useSelector((state) => state.stocksReducer);
   const user = useSelector(state => state.session.user)
   const watchlist = useSelector(state => state.watchlistReducer[watchlistId])

   const [name, setName] = useState('');
   const [selectStockId, setSelectStockId] = useState([]);
   const [touchedStockIds, setTouchedStockIds] = useState([]);

   const { closeModal } = useModal();

   useEffect(() => {
      if (watchlist) {
         setName(watchlist.name)
         setSelectStockId(watchlist.stock_ids || [])
      }
   }, [watchlist, watchlist.name, watchlist.stock_ids])

   const handleCheckboxChange = (e) => {
      const selectId = parseInt(e.target.value);
      const isChecked = e.target.checked;
  
      if (isChecked) {
        if (selectStockId.length >= 5) {
          alert("You can only add up to 5 stocks to a watchlist.");
          return;
        }
        setSelectStockId([...selectStockId, selectId]);
      } else {
        setSelectStockId(selectStockId.filter((id) => id !== selectId));
      }
    };

   const handleSubmit = async (e) => {
      e.preventDefault();
      const watchlistData = {
         user_id: user.id,
         name,
         stock_ids: selectStockId
      }
      if (name !== watchlist.name && selectStockId.sort().join(',') === watchlist.stock_ids.sort().join(',')) {
         const updateNameData = {
           user_id: user.id,
           name,
           action: 'add',
           stock_ids: watchlist.stock_ids
         }
         await dispatch(editWatchlist(watchlist.id, updateNameData))
       }




      // const stocksToAdd = watchlist && watchlist.stock_ids
      // ? selectStockId.filter((id) => !watchlist.stock_ids.includes(id))
      // : [];
      // const stocksToRemove = watchlist && watchlist.stock_ids
      // ? touchedStockIds.filter((id) => !selectStockId.includes(id))
      // : [];
      const stocksToAdd = selectStockId.filter((id) => !watchlist.stock_ids.includes(id));
      const stocksToRemove = watchlist.stock_ids.filter((id) => !selectStockId.includes(id))

      if (stocksToAdd.length > 0) {
         const addData = {
            user_id: user.id,
            name,
            action: 'add',
            stock_ids: stocksToAdd

         }
         await dispatch(editWatchlist(watchlist.id, addData))
      }

      if (stocksToRemove.length > 0) {
         const removeData = {
            user_id: user.id,
            name,
            action: 'remove',
            stock_ids: stocksToRemove
         }
         await dispatch(editWatchlist(watchlist.id, removeData))
      }
      await dispatch(fetchWatchlist());
      setName("")
      setSelectStockId([])
      closeModal()
   };



   return (
      <form onSubmit={handleSubmit} className="add-watchlist-form">
        <label>
          Watchlist Name:
          <input
            type="text"
            value={name}
            className="form-input"
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        {Object.values(allStocks).map((stock) => (
          <div key={stock.id} className="stock-select">
            <input
              type="checkbox"
              value={stock.id}
              checked={selectStockId.includes(stock.id)}
              onChange={handleCheckboxChange}
              disabled={selectStockId.length >= 5 && !selectStockId.includes(stock.id)}
            />
            <label>{stock.name}</label>
          </div>
        ))}
        <button type="submit">Edit Watchlist</button>
      </form>
    );
  }
  
  export default EditWatchlistModal;
