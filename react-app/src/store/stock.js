const SET_STOCK = "stock/SET_STOCK"
const GET_STOCK_BY_ID = "stock/GET_STOCK_BY_ID"
const SET_STOCK_HIST = "stock/SET_STOCK_HIST"

const setStock = (stocks) => ({
    type: SET_STOCK,
    stocks
})

const getStockById = (stock) => ({
    type: GET_STOCK_BY_ID,
    stock
})


export const fetchStocks = () => async (dispatch) => {
    const response = await fetch('/api/stocks');
    if(response.ok){
        const stocks = await response.json();
        dispatch(setStock(stocks))
    };
};

export const fetchStockById = (id) => async (dispatch) => {
    const response = await fetch(`/api/stocks/${id}`)
    if (response.ok){
        const stock = await response.json()
        dispatch(getStockById(stock))
    }
}


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
        case GET_STOCK_BY_ID: {
            newState = {...state}
            newState = newState[action.stock.id] = action.stock
            return {...newState}
        }
        default:
            return state;
    }
}
