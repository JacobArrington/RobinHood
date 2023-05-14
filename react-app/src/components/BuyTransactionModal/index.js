import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import {  fetchTransaction, makeTransaction } from "../../store/transaction";
import "./BuyTransactionModal.css";
import { changeBuyingPower } from "../../store/portfolio";


function PostBuyTransaction({stock}) {
    const dispatch = useDispatch();
    const user = useSelector((state) => (state.session.user));
    const portfolio = useSelector((state)=> (state.portfolioReducer.portfolio))
    const [transactionType, setTransactionType] = useState('buy');
    const [totalShares, setTotalShares] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    const buyingPower = useSelector((state) => (state.portfolioReducer.portfolio.buyingPower))

    const handleSubmit = async (e) => {
        e.preventDefault();

        const transactionData = {
            stock_id: stock.id,
            user_id: user.id,
            portfolio_id: portfolio.id,
            transaction_type: transactionType,
            total_shares: totalShares,
            total_price: totalPrice
        }

        const buyingpowerData = {
            ...portfolio,
            buyingPower: buyingPower - totalPrice
        }

        const transfer = await dispatch(changeBuyingPower(portfolio.id, buyingpowerData))
        const transaction = await dispatch(makeTransaction(transactionData))
        if (transaction && transfer) {
            setErrors(transaction);
            setErrors(transfer)
        } else {
            dispatch(fetchTransaction());
            closeModal();
        }
    }

    return (
        <form onSubmit={handleSubmit} className="buyTransactionModal">
            <label>
                Shares:
                <input
                    type="number"
                    value={totalShares}
                    onChange={(e) => setTotalShares(parseInt(e.target.value), setTotalPrice(e.target.value * stock.price))}
                />
            </label>

            <label>
                Total:{totalShares * stock.price}
            </label>
            <button type="submit" disabled={totalPrice > buyingPower}>Buy</button>
        </form>
    );
}

export default PostBuyTransaction
