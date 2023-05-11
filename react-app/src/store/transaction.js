const GET_TRANSACTIONS = "session/GET_TRANSACTIONS"
const ADD_TRANSACTION = "session/ADD_TRANSACTION"


const getTransaction = (transactions) => ({
    type: GET_TRANSACTIONS,
    transactions
})

const addTransaction =  (transaction) => ({
    type: ADD_TRANSACTION,
    transaction
})

export const fetchTransaction = () => async (dispatch) => {
    const response = await fetch('/api/transactions')
    if(response.ok){
        const transaction = await response.json()
        dispatch(getTransaction(transaction))
    }
}

export const makeTransaction = (transaction) => async (dispatch) => {
    const response = await fetch('/api/transactions', {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(transaction)
    })
    if (response.ok){
        const transaction = await response.json()
        dispatch(addTransaction(transaction))
    }
}


const initialState = {}

export default function transactionReducer(state = initialState, action){
    let newState = {}
    switch(action.type){
        case GET_TRANSACTIONS:{
            newState[action.transactions.id] = action.transactions
            return {...newState}
        }
        case ADD_TRANSACTION: {
            newState = {...state}
            newState[action.transaction.id]=action.transaction
            return {...newState}
        }
        default:
            return state
    }
}