import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { fetchTransaction, makeTransaction } from "../../store/transaction";
import { changeBuyingPower } from "../../store/portfolio";
import "./BuyTransactionModal.css";

function PostBuyTransaction({ stock }) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const portfolio = useSelector((state) => state.portfolioReducer.portfolio);
    const [transactionType] = useState('buy');
    const [totalShares, setTotalShares] = useState(0);
    const [pricePerShare, setPricePerShare] = useState(stock.price);
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    const buyingPower = useSelector((state) => state.portfolioReducer.portfolio.buyingPower);

    useEffect(() => {
        setErrors([]);
    }, [totalShares, pricePerShare]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const totalPrice = totalShares * pricePerShare;

        if (totalPrice > buyingPower) {
            setErrors(["Not enough buying power."]);
            return;
        }

        if (totalShares <= 0) {
            setErrors(["You must buy at least one share."]);
            return;
        }

        const transactionData = {
            stock_id: stock.id,
            user_id: user.id,
            portfolio_id: portfolio.id,
            transaction_type: transactionType,
            total_shares: totalShares,
            total_price: totalPrice,
            price_per_share: pricePerShare,  // Added this line
            is_pending: totalPrice > stock.price // Replace with your condition for setting is_pending
        }

        const buyingPowerData = {
            ...portfolio,
            buyingPower: buyingPower - totalPrice
        }



        await dispatch(changeBuyingPower(portfolio.id, buyingPowerData));
        await dispatch(makeTransaction(transactionData));
        dispatch(fetchTransaction());
        closeModal();
    }




    return (
        <form onSubmit={handleSubmit} className="buy-form">
            <label>
                Shares:
                <input
                    type="number"
                    min="0"
                    value={totalShares}
                    onChange={(e) => setTotalShares(e.target.value)}
                />
            </label>

            <label>
                Price per Share:
                <input
                    type="number"
                    min="0"
                    value={pricePerShare}
                    onChange={(e) => setPricePerShare(e.target.value)}
                />
            </label>

            <label>
                Total: {totalShares * pricePerShare}
            </label>

            {errors && errors.map((error, idx) => (
                <div key={idx} className="error-message">{error}</div>
            ))}

            <button type="submit" disabled={totalShares <= 0}>Buy</button>
        </form>
    );
}

export default PostBuyTransaction;
