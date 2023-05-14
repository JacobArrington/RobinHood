// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchTransaction } from "../../store/transaction";
// import { fetchShares } from "../../store/shares";
// import { fetchStocks } from "../../store/stocks";

// const OwnedStock = () =>{
//     const dispatch = useDispatch()
//     const userId = useSelector((state) => state.session.user.id)
//     const allTransactions = useSelector((state) => state.transactionReducer)
//     const stocks = useSelector((state) => state.stocksReducer)

//     useEffect(()=> {
//         dispatch(fetchTransaction())
//         dispatch(fetchShares())
//         dispatch(fetchStocks())
//     }, [dispatch])

//     const userTransactions = Object.values(allTransactions).filter(
//         (transaction) => transaction.user_id === userId
//       );
//       const userOwnedStocks = userTransactions.reduce((acc,transaction) =>{
//         if(!acc[transaction.stock_id]){
//             acc[transaction.stock_id] ={
//                 stockName: stocks
//             }
//         }
//       })


//     return (
//         <div>
//             <h2>Owned_Stocks</h2>

//         </div>
//     )


// }

// export default OwnedStock;
