const GET_PORTFOLIO = "stock/GET_PORTFOLIO"
const UPDATE_PORTFOLIO = "stock/UPDATE_PORTFOLIO"

const getPortfolio = (portfolio) => ({
    type: GET_PORTFOLIO,
    portfolio
})

const subtractBuyingPower = (newBuyingPower, portfolio) => ({
    type: UPDATE_PORTFOLIO,
    payload: {newBuyingPower, portfolio}
})
// const subtractBuyingPower = (newBuyingPower) => ({
//     type: UPDATE_PORTFOLIO,
//     payload: { buyingPower: newBuyingPower }
// })


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

// export const reduceBuyingPower = (newBuyingPower) => async (dispatch) => {
//     const response = await fetch('/api/portfolios')
//     if (response.ok){
//         const portfolio = await response.json()
//         dispatch(subtractBuyingPower(newBuyingPower, portfolio))
//     }
// }


export const reduceBuyingPower = (newBuyingPower) => async (dispatch) => {
    const response = await fetch('/api/portfolios')
    if (response.ok){
        const portfolio = await response.json()
        dispatch(subtractBuyingPower(newBuyingPower, portfolio))
    }
}

const initialState = {}

export default function portfolioReducer(state = initialState, action){
    let newState = {}
    switch (action.type){
        case GET_PORTFOLIO:{
            // newState[action.portfolio.user_id] = action.portfolio
            // return newState
            return {portfolio: action.portfolio}
        }
        // case UPDATE_PORTFOLIO:{
        //     newState = {...state}
        //     newState['portfolio']['buyingPower'] = {...action.payload.newBuyingPower}
        //     console.log(newState, "!@!@!@!@!@!@!@!@!@!@!@!@!@!@")
        //     return {portfolio: newState}
        // }
        case UPDATE_PORTFOLIO:{
            return {...state,
                portfolio: {...state.portfolio,buyingPower: action.payload.buyingPower}
            }
        }
        default:
            return state;
    }
}
