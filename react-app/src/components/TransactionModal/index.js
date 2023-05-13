import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { fetchTransaction } from "../../store/transaction";
import { fetchShares } from "../../store/shares";
import OpenModalButton from "../OpenModalButton";
import { useModal } from '../../context/Modal';

const TransactionModal = () => {
   const dispatch = useDispatch()
   const userId = useSelector((state) => state.session.user.id)
   const allTransactions = useSelector((state) => state.transactionReducer)
   // const [isLoaded, setIsLoaded] = useState(false);
   console.log("<-----here----->", allTransactions)
   const { closeModal } = useModal();

   useEffect(() => {
      dispatch(fetchTransaction())
      dispatch(fetchShares())
   }, [dispatch])

   const userTransactions = Object.values(allTransactions).filter(
      (transaction) => transaction.user_id === userId
   );


   return (
      <div>
         {userTransactions.map((transactions) => (
            <div key={transactions.id}>
               <p>{transactions.stock_id}</p>
               <p>{transactions.user_id}</p>
               <p>{transactions.transaction_type}</p>
               <p>{transactions.createdAt}</p>
            </div>
         ))}
      </div>
   )
}

export default TransactionModal;
