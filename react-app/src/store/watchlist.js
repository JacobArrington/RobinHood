const GET_WATCHLISTS = "session/GET_WATCHLISTS"

const getWatchlist = (watchlists) => ({
   type: GET_WATCHLISTS,
   watchlists
})

export const fetchWatchlist = () => async (dispatch) => {
   const response = await fetch('/api/watchlist');
   if (response.ok) {
      const watchlists = await response.json();
      dispatch(getWatchlist(watchlists))
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
      default:
         return state
   }
}
