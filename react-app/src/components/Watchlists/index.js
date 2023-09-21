import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { fetchWatchlist, destroyWatchlist } from "../../store/watchlist";
import AddWatchlistModal from "../AddWatchlistModal";
import EditWatchlistModal from "../EditWatchlistModal";

import './Watchlists.css'
import OpenModalButton from "../OpenModalButton";

const Watchlists = () => {
   const dispatch = useDispatch()
   const allWatchlist = useSelector((state) => state.watchlistReducer);

   const [watchlist, setWatchlist] = useState(null);
   const [stocks, setStocks] = useState([]);

   useEffect(() => {
      dispatch(fetchWatchlist())
   }, [dispatch]);

   const handleDelete = async () => {
      const confirm = window.confirm("Are you sure? This action can't be undone.");
      if (confirm) {
         await dispatch(destroyWatchlist(watchlist.id));
         setWatchlist(null);
      }
   }

   return (
      <div className="watchlist-container">

         {Object.values(allWatchlist).map(watchlist => (
            <div key={watchlist.id} onClick={() => { setWatchlist(watchlist); setStocks(watchlist.stocks); }}>
<div className="stocklist-container"> 
               <div className="watchlist-name">
                  {watchlist.name}
               </div>
               
          <ul className="watchlist-stock-list">
            {watchlist.stocks && watchlist.stocks.map((stock) => (
              <li key={stock.id}>{stock.name}</li>
            ))}
          </ul>
        </div>
            </div>
         ))}

         <OpenModalButton
            buttonText="Create Watchlist"
            modalComponent={
               <AddWatchlistModal />
            }
         />
         {watchlist && (
            <>
               <OpenModalButton
                  buttonText="Edit Watchlist"
                  modalComponent={
                     <EditWatchlistModal
                        watchlistId={watchlist.id}
                        editwatchlist={watchlist} />
                  }
               />
               <button onClick={handleDelete} className="delete-button">Delete Watchlist</button>
            </>
         )}
      </div>
   )
}




export default Watchlists
