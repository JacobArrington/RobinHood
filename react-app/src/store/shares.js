
// const GET_SHARES = "session/GET_SHARES"
// const ADD_TRANSACTION = "session/ADD_TRANSACTION"


// const getShares = (shares) => ({
//     type: GET_SHARES,
//     shares
// })

// const addTransaction = (transaction) => ({
//     type: ADD_TRANSACTION,
//     transaction
// })

// export const fetchShares = () => async (dispatch) => {
//     const response = await fetch('/api/shares')
//     if (response.ok) {
//         const share = await response.json()
//         dispatch(getShares(share))
//     }
// }


// export const makeTransaction = (transaction) => async (dispatch) => {
//     const response = await fetch('/api/shares', {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(transaction)
//     })
//     if (response.ok) {
//         const transaction = await response.json()
//         dispatch(addTransaction(transaction))
//         dispatch(fetchShares())
//     }
// }


// const initialState = {}

// export default function sharesReducer(state = initialState, action) {
//     let newState = {}
//     switch (action.type) {
//         case GET_SHARES: {
//             newState = { ...state }
//             action.shares.forEach(transaction => {
//                 newState[transaction.id] = transaction
//             })
//             return { ...newState }
//         }
//         // case ADD_TRANSACTION: {
//         //     newState = {...state}
//         //     // let newShares = action.transaction.total_shares
//         //     let oldShares =  newState[action.transaction.stock_id].total_shares
//         //     newState[action.transaction.stock_id] = action.transaction
//         //     return {...newState}
//         // }
//         case ADD_TRANSACTION: {
//             const newState = { ...state };
//             const transaction = action.transaction;
//             const stockId = transaction.stock_id;
//             let oldShares = 0;
//             let share_price = 0;

//             if (newState[stockId]) {
//                 oldShares = newState[stockId].total_shares
//                 share_price = newState[stockId].total_price
//             }
//             const newTotalShares = transaction.total_shares + oldShares;
//             if (newTotalShares <= 0) {
//                 // Remove the stock from the state when shares hit 0
//                 delete newState[stockId];
//             } else {
//                 newState[stockId] = {
//                     ...transaction,
//                     total_shares: newTotalShares,
//                     total_price: transaction.total_price + share_price
//                 };
//             }

//             return { ...newState };
//         }
//         default:
//             return state
//     }
// }
