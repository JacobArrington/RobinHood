const GET_PORTFOLIO = "stock/GET_PORTFOLIO"

const getPortfolio = (portfolio) => ({
    type: GET_PORTFOLIO,
    portfolio
})

export const fetchPortfolio = () => async (dispatch) => {
    const response = await fetch('/api/portfolios')
    if (response.ok){
        const portfolio = await response.json()
        dispatch(getPortfolio(portfolio))
    }
}

const initialState = {}

export default function portfolioReducer(state = initialState, action){
    let newState = {}
    switch (action.type){
        case GET_PORTFOLIO:{
            newState[action.portfolio.id] = action.portfolio
            return newState
        }
        default:
            return state;
    }
}
