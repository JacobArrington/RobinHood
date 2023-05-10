import React, { useState, useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { Redirect } from "react-router-dom";
import { fetchWatchlist } from "../../store/watchlist";
import AddWatchlistModal from "../AddWatchlistModal";

import './Watchlists.css'
import OpenModalButton from "../OpenModalButton";

const Watchlists = () => {
   const dispatch = useDispatch()
   const allWatchlist = useSelector((state) => state.watchlistReducer);
   

   const [watchlist, setWatchlist] = useState(false);

   useEffect(() => {
      dispatch(fetchWatchlist())
   }, [dispatch]);


   return (
      <div>

         {Object.values(allWatchlist).map(watchlist => (
            <div key={watchlist.id} onClick={() => setWatchlist(watchlist)}>
               <li key={watchlist.id}>{watchlist.name}</li>
            </div>
         ))}
         <p>Marlon is Gay</p>
         <OpenModalButton
            buttonText="Create Watchlist"
            modalComponent={
               <AddWatchlistModal fetchWatchlist={fetchWatchlist} />
            }
         />
      </div>

   )
}

export default Watchlists
