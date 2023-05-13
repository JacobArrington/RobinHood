import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
// import UpdateWalletModal from "../UpdateWalletModal"
// import PostWalletModal from "../PostWalletModal";
// import OpenModalButton from "../OpenModalButton";
import { fetchTransaction } from "../../store/transaction";
import './transaction.css'
import { fetchShares } from "../../store/shares";

const Transaction = () => {
    const dispatch = useDispatch()
    const userId = useSelector((state) => state.session.user.id)
    // const buyingPower = userSelector((state) => state.portfolioReducer) PLACE HOLDER
    const allTransactions = useSelector((state) => state.transactionReducer)
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(()=> {
        dispatch(fetchTransaction())
        dispatch(fetchShares())
    }, [dispatch])

    const userTransactions = Object.values(allTransactions).filter(
      (transaction) => transaction.user_id === userId
    );

    // return (
    //     <>
    //      {Object.values(allTransactions).map((transaction) => (
    //        <div key={transaction.id}>
    //          <p>{transaction.stock_id}</p>
    //          <p>{transaction.user_id}</p>
    //          <p>{transaction.transaction_type}</p>
    //          <p>{transaction.createdAt}</p>
    //        </div>
    //      ))}
    //    </>
    // )

    return (
    <>
      {userTransactions.map((transaction) => (
        <div key={transaction.id}>
          <p>{transaction.stock_id}</p>
          <p>{transaction.user_id}</p>
          <p>{transaction.transaction_type}</p>
          <p>{transaction.createdAt}</p>
        </div>
      ))}
    </>
    );
}




export default Transaction
