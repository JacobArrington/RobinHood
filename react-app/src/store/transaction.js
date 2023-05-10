const GET_TRANSACTION = "session/GET_TRANSACTION"
const ADD_TRANSACTION = "session/ADD_TRANSACTION"


const getTransaction = (transaction) => ({
    type: GET_TRANSACTION,
    transaction
})

const addTransaction =  (transaction) => ({
    type: ADD_TRANSACTION,
    transaction
})

export const fetchTransaction = () => async (dispatch) => {
    const response = await fetch('/api/transactions')
    if(response.ok){
        const wallet = await response.json()
        dispatch(getTransaction(transaction))
    }
}


const initialState = {}

export default function transactionReducer(state = initialState, action){
    let newState = {}
    switch(action.type){
        case GET_TRANSACTION:{
            newState[action.transaction.id] = action.transaction
            return {...newState}
        }
        default:
            return state
    }
}
