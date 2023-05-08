const GET_WALLET = "session/GET_WALLET";
const DELETE_WALLET = "session/DELETE_WALLET"
const UPDATE_WALLET = "session/UPDATE_WALLET"

const getWallet = (wallet) => ({
    type: GET_WALLET,
    wallet
})

const deleteWallet = (wallet) => ({
    type: DELETE_WALLET,
    wallet
})

const updateWallet = (wallet) => ({
    type: UPDATE_WALLET,
    wallet
})

export const fetchWallet= () => async (dispatch) => {
    
    const response = await fetch('/api/wallet');
    if(response.ok){
        const wallet = await response.json();
        dispatch(getWallet(wallet))
    } 
}

export const destroyWallet= (id) => async(dispatch) => {
    const response = await fetch(`/api/wallet/${id}`, {
        method: "DELETE"
    })
    if (response.ok){
        dispatch(deleteWallet(id))
    }
}

export const updateUserWallet= (id, walletdata) => async(dispatch) => {
    const response = await fetch(`/api/wallet/${id}`, {
        method: "PUT",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(walletdata)
    })
    if (response.ok){
        const wallet = response.json()
        dispatch(updateWallet(wallet))
    }
}

const initialState = {}

export default function walletReducer(state = initialState, action){
    let newState = {}
        switch (action.type){
            case GET_WALLET:{
                newState[action.wallet.id]=action.wallet
                return {...newState}
            }
            case UPDATE_WALLET:{
                newState[action.wallet.id] = action.wallet
                return {...newState}
            }
            case DELETE_WALLET:{
                newState = {...state}
                delete newState[action.wallet]
                return newState
            }
            default:
                return state
        }
    }
