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

const setStockHistory = (stockId,stockHistory) =>({
    type: SET_STOCK_HIST,
    stockId,
    stockHistory,
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

export const fetchStockHistory =(stockId) => async (dispatch) =>{
    const response = await fetch(`/api/stocks/${stockId}/stock_history`);

    if(response.ok){
        const stockHistory = await response.json()
        dispatch(setStockHistory(stockId, stockHistory.stock_history))
        
    }
}


const initialState = {}

export default  function stocksReducer(state = initialState, action){
    let newState = {};
    switch (action.type) {
        case SET_STOCK: {
            newState = {...state};
            action.stocks.forEach(stock => {
                newState[stock.id] = {
                    ...newState[stock.id],
                    
                    
                    ...stock
                };
            });
            return {...newState};
            };
        case GET_STOCK_BY_ID: {
            newState = {...state}
            newState = newState[action.stock.id] = action.stock
            return {...newState}
        }
        case SET_STOCK_HIST:{
            newState = {...state};
            const stockId = action.stockId;
            if(!newState[stockId]) {
                newState[stockId] = {stockHistory: {}}
            }
            newState[stockId].stockHistory = action.stockHistory.reduce((acc, history) =>{
                acc[history.date] = history
                return acc
            },{})
                return {...newState}
            }
        default:
            return state;
    }
}
