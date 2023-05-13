const GET_WATCHLISTS = "session/GET_WATCHLISTS";
const ADD_WATCHLIST = "session/ADD_WATCHLIST";


const getWatchlist = (watchlists) => ({
   type: GET_WATCHLISTS,
   watchlists
})

const addWatchlist = (watchlists) => ({
   type: ADD_WATCHLIST,
   watchlists
})

export const fetchWatchlist = () => async (dispatch) => {
   const response = await fetch('/api/watchlist');
   if (response.ok) {
      const watchlists = await response.json();
      dispatch(getWatchlist(watchlists))
   };
};

export const postWatchlist = (watchlistData) => async (dispatch) => {
   console.log('<-----------2----------->', watchlistData);
   const response = await fetch('/api/watchlist', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(watchlistData)
   });
   if (response.ok) {
      const watchlists = await response.json();
      console.log('Received watchlist from server:', watchlists);
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
      case ADD_WATCHLIST: {
         newState[action.watchlists.id] = action.watchlists
         return { ...newState }
      }
      default:
         return state
   }
}
