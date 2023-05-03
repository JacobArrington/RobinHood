const SET_STOCK = "stock/SET_STOCK"
const SET_STOCK_HIST = "stock/SET_STOCK_HIST"

const setStock = (stocks) => ({
    type: SET_STOCK,
    stocks
})


export const fetchStocks = () => async (dispatch) => {
    const response = await fetch('/api/stocks');
    if(response.ok){
        const stocks = await response.json();
        dispatch(setStock(stocks))
    };
};


const initialState = {
    byId: {},
    allId: []
}

export default  function stocksReducer(state = initialState, action){
    switch (action.type){
        case SET_STOCK:{
            const allId = []
            const byId ={}
            action.stocks.forEach(stock =>{
               allId.push(stock.id)
               byId[stock.id] = stock 
            })
        
              return {...state, allId, byId}  
            };
    
        default: 
            return state;
    }
}
