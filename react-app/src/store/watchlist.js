const GET_WATCHLISTS = "session/GET_WATCHLISTS";
const ADD_WATCHLIST = "session/ADD_WATCHLIST";


const getWatchlist = (watchlists) => ({
   type: GET_WATCHLISTS,
   watchlists
})

// const addWatchlist = (watchlists) => ({
//    type: ADD_WATCHLIST,
//    watchlists
// })
const addWatchlist = (watchlists) => ({
   type: ADD_WATCHLIST,
   watchlist: []
})

export const fetchWatchlist = () => async (dispatch) => {
   const response = await fetch('/api/watchlist');
   if (response.ok) {
      const watchlists = await response.json();
      dispatch(getWatchlist(watchlists))
   };
};

export const postWatchlist = (watchlistData) => async (dispatch) => {
   const response = await fetch('/api/watchlist', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(watchlistData)
   });
   if (response.ok) {
      const watchlists = await response.json();
      dispatch(addWatchlist(watchlists))
   };
};


const initialState = {};

export default function watchlistReducer(state = initialState, action) {
   let newState = {}
   switch (action.type) {
      case GET_WATCHLISTS: {
         action.watchlists.forEach((watchlist) => {
            newState[watchlist.id] = watchlist
         })
         return newState
      }
      case ADD_WATCHLIST:{
         return {
            ...state,
            watchlist: [...state.watchlist, action.payload]
         }
         }
      // case ADD_WATCHLIST: {
      //    newState[action.watchlist.id] = action.watchlist
      //    return {...newState}
      // }
      default:
         return state
   }
}
