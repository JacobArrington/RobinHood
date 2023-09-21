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
     <div className="wHead"><p>WATCHLIST</p></div> 
        {Object.values(allWatchlist).map(watchlist => (
          <div key={watchlist.id} className="watchlist-card" onClick={() => { setWatchlist(watchlist); setStocks(watchlist.stocks); }}>
    
            <div className="stocklist-container"> 
              {/* Buttons */}
              <div className="watchlist-buttons">
                <OpenModalButton
                  buttonText={<><i className="fas fa-edit"></i> </>}
                  modalComponent={
                    <EditWatchlistModal
                      watchlistId={watchlist.id}
                      editwatchlist={watchlist}
                    />
                  }
                />
                <button onClick={(e) => { e.stopPropagation(); handleDelete(watchlist.id); }} className="delete-button"><i className="fas fa-trash-alt"></i></button>
              </div>
              {/* Watchlist name */}
              <div className="watchlist-name">
                {watchlist.name}
              </div>
    
              {/* Stock list */}
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
      </div>
    )
         }



export default Watchlists
