import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import {  fetchTransaction, makeTransaction } from "../../store/transaction";
import "./TransactionModal.css";


function PostBuyTransaction({stock}) {
    const dispatch = useDispatch();
    const user = useSelector((state) => (state.session.user));
    const [transactionType, setTransactionType] = useState('buy');
    const [totalShares, setTotalShares] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    // const buyingPower = useSelector((state) => (state.current_user.portfolio.buyingPower))

    const handleSubmit = async (e) => {
        e.preventDefault();

        const transactionData = {
            stock_id: stock.id,
            user_id: user.id,
            transaction_type: transactionType,
            total_shares: totalShares,
            total_price: totalPrice
        }
        const transaction = await dispatch(makeTransaction(transactionData))
        if(transaction){
            dispatch(fetchTransaction())
            closeModal()
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Shares:
                <input
                    type="number"
                    value={totalShares}
                    onChange={(e) => setTotalShares(parseInt(e.target.value))}
                />
            </label>

            <label>
                Total:{totalShares * stock.price}
            </label>
            <button type="submit">Buy</button>
        </form>
    );
}

export default PostBuyTransaction
