import React, { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import "./TransactionHistory.css"

function TransactionHistoryModal({userTransactions}) {
    const {closeModal} = useModal()
    const stock = useSelector((state) => state.stocksReducer);

    return (
        <div className="transaction-container-modal">
          {userTransactions.map((transaction) => (
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
}

export default TransactionHistoryModal;
