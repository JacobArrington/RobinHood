const GET_PORTFOLIO = "stock/GET_PORTFOLIO"
const UPDATE_PORTFOLIO = "stock/UPDATE_PORTFOLIO"

const getPortfolio = (portfolio) => ({
    type: GET_PORTFOLIO,
    portfolio
})

const subtractBuyingPower = (newBuyingPower) => ({
    type: UPDATE_PORTFOLIO,
    newBuyingPower
})

const addToBuyingPower = (newBuyingPower) => ({
    type: UPDATE_PORTFOLIO,
    newBuyingPower
})

export const fetchPortfolio = () => async (dispatch) => {
    const response = await fetch('/api/portfolios')
    if (response.ok){
        const portfolio = await response.json()
        dispatch(getPortfolio(portfolio))
    }
}


export const changeBuyingPower = (portfolio_id, newBuyingPower) => async (dispatch) => {
    const response = await fetch(`/api/portfolios/${portfolio_id}`, {
        method: "PUT",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(newBuyingPower)
    })
    if (response.ok){
        const portfolio = await response.json()
        dispatch(subtractBuyingPower(portfolio.buyingPower))
    }
}

const initialState = {}

export default function portfolioReducer(state = initialState, action){
    let newState = {}
    switch (action.type){
        case GET_PORTFOLIO:{
            newState = {...state}
            newState['portfolio'] = action.portfolio
            return newState
        }
        case UPDATE_PORTFOLIO:{
            const updatedPortfolio = {
                ...state.portfolio,
                buyingPower: action.newBuyingPower
            };
            return {
                ...state,
                portfolio: updatedPortfolio
            };
        }
        default:
            return state;
    }
}
