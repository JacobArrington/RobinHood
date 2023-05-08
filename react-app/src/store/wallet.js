const GET_WALLET = "session/GET_WALLET";
const GET_WALLETS = "session/GET_WALLETS";

const getWallet = (wallet) => ({
    type: GET_WALLET,
    wallet
})

export const fetchWallet= () => async (dispatch) => {
    
    const response = await fetch('/api/wallet');
    if(response.ok){
        const wallet = await response.json();
        dispatch(getWallet(wallet))
    } 
}

const initialState = {}

export default function walletReducer(state = initialState, action){
    let newState = {}
        switch (action.type){
            case GET_WALLET:{
                newState[action.wallet.id]=action.wallet
                // action.wallet.forEach(singleWallet => {
                //     console.log(singleWallet)
                //     newState[singleWallet.id] = singleWallet 
                // })
                return {...newState}
            }
            default:
                return state
        }
    }
