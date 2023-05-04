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


const initialState = {}

export default  function stocksReducer(state = initialState, action){
    let newState = {}
    switch (action.type){
        case SET_STOCK:{
            newState = {...state }
            action.stocks.forEach(stock => {
                newState[stock.id] = stock
            })
            return {...newState}
            };
        default:
            return state;
    }
}
