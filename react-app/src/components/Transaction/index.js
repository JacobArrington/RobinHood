// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Redirect } from "react-router-dom";
// import { fetchTransaction } from "../../store/transaction";
// import './transaction.css'
// import { fetchShares } from "../../store/shares";

// const Transaction = () => {
//     const dispatch = useDispatch()
//     const userId = useSelector((state) => state.session.user.id)
//     const stock = useSelector((state) => state.stocksReducer)
//     // const buyingPower = userSelector((state) => state.portfolioReducer) PLACE HOLDER
//     const allTransactions = useSelector((state) => state.transactionReducer)
//     const [isLoaded, setIsLoaded] = useState(false);

//     useEffect(()=> {
//         dispatch(fetchTransaction())
//         //dispatch(fetchShares())
//     }, [dispatch])

//     const userTransactions = Object.values(allTransactions).filter(
//       (transaction) => transaction.user_id === userId
//     );


//     // return (
//     //     <>
//     //      {Object.values(allTransactions).map((transaction) => (
//     //        <div key={transaction.id}>
//     //          <p>{transaction.stock_id}</p>
//     //          <p>{transaction.user_id}</p>
//     //          <p>{transaction.transaction_type}</p>
//     //          <p>{transaction.createdAt}</p>
//     //        </div>
//     //      ))}
//     //    </>
//     // )

//     return (
//     <>
//       {userTransactions.map((transaction) => (
//         <div key={transaction.id}>
//           <p>{stock[transaction.stock_id].name}</p>
//           <p>{transaction.transaction_type}</p>
//           <p>${transaction.total_price.toFixed(2)}</p>
//           <p>{new Date(transaction.created_at).toLocaleDateString()}</p>
//         </div>
//       ))}
//     </>
//     );
// }




// export default Transaction


import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { fetchTransaction } from "../../store/transaction";
import "./transaction.css";
import { fetchShares } from "../../store/shares";

const Transaction = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.session.user.id);
  const stock = useSelector((state) => state.stocksReducer);
  // const buyingPower = userSelector((state) => state.portfolioReducer) PLACE HOLDER
  const allTransactions = useSelector((state) => state.transactionReducer);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(fetchTransaction());
    //dispatch(fetchShares())
  }, [dispatch]);

  const userTransactions = Object.values(allTransactions).filter(
    (transaction) => transaction.user_id === userId
  );

  return (
    <div className="transaction-container">
      {userTransactions.slice(-5).map((transaction) => (
        <div className="transaction-card" key={transaction.id}>
          <span className="transaction-stock-name">
            {stock[transaction.stock_id]?.name}
          <span className="transaction-price">
            ${transaction.total_price.toFixed(2)}
          </span>
          </span>
          {/* <div className="transaction-info"> */}
          <span className="transaction-type">Transaction Type: {transaction.transaction_type}</span>
          <span className="transaction-date">
            Purchese Date: {new Date(transaction.created_at).toLocaleDateString()}
          </span>
          {/* </div> */}
        </div>
      )).reverse()}
    </div>
  );
};

export default Transaction;
