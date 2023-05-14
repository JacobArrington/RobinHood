const GET_WATCHLISTS = "session/GET_WATCHLISTS";
const ADD_WATCHLIST = "session/ADD_WATCHLIST";
const UPDATE_WATCHLIST = 'sessions/UPDATE_WATCHLIST'
const DELETE_WATCHLIST = 'sessions/DELETE_WATCHLIST'


const getWatchlist = (watchlists) => ({
   type: GET_WATCHLISTS,
   watchlists
})

const addWatchlist = (watchlist) => ({
   type: ADD_WATCHLIST,
   watchlist
})


const updateWatchlist = (watchlist) => ({
   type: UPDATE_WATCHLIST,
   watchlist
})

const deleteWatchlist = (watchlist) => ({
   type: DELETE_WATCHLIST,
   watchlist
 });

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

export const editWatchlist =(id, watchlistData) => async(dispatch) =>{
   const response = await fetch(`/api/watchlist/${id}/stocks`,{
      method: 'PUT',
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify(watchlistData)
   })
   if(response.ok){
      const updatedWatchlists = await response.json();
      console.log('updatedWatchlists!!!!!!!!!!!:', updatedWatchlists);
      dispatch(updateWatchlist(updatedWatchlists))
   }
}  

export const destroyWatchlist = (id) => async (dispatch) => {
   const response = await fetch(`/api/watchlist/${id}`, {
     method: "DELETE"
   });
 
   if (response.ok) {
     dispatch(deleteWatchlist({id:id}));
   }
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
         newState[action.watchlist.id] = action.watchlist
         return newState
      }
      case UPDATE_WATCHLIST: {
         const newState = { ...state };
         newState[action.watchlist.id] = action.watchlist
         return newState
      }
      case DELETE_WATCHLIST: {
         const newState = { ...state };
         delete newState[action.watchlist.id];
         return newState;
       }
      default:
         return state
   }
}
