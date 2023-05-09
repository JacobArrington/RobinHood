import React, { useState, useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { Redirect } from "react-router-dom";
import { fetchWatchlist } from "../../store/watchlist";

import './Watchlists.css'

const Watchlists = () => {
   const dispatch = useDispatch()
   const allWatchlist = useSelector((state) => state.watchlistReducer);

   const [watchlist, setWatchlist] = useState(false);

   console.log('heereeeee _____+>>>>',allWatchlist)
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
      </div>
   )
}

export default Watchlists
