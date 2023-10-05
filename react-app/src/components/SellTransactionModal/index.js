import React, { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { fetchTransaction, makeTransaction } from "../../store/transaction";
import { changeBuyingPower } from "../../store/portfolio";
import "./SellTransactionModal.css"

function PostSellTransaction({ stock }) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const portfolio = useSelector((state) => state.portfolioReducer.portfolio);
    const [transactionType, setTransactionType] = useState('sell');
    const [totalShares, setTotalShares] = useState(1);
    const [totalPrice, setTotalPrice] = useState(stock.price);
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    const buyingPower = useSelector((state) => state.portfolioReducer.portfolio.buyingPower)

    const allTransactions = useSelector((state) => state.transactionReducer);
    const stocks = useSelector((state) => state.stocksReducer);

    const userTransactions = useMemo(() => {
        return Object.values(allTransactions).filter(transaction => transaction.user_id === user.id);
    }, [allTransactions, user.id]);

    const userOwnedStocks = useMemo(() => {
        return userTransactions.reduce((acc, transaction) => {
            const stock = stocks[transaction.stock_id];
            if (!acc[stock.id]) {
                acc[stock.id] = {
                    totalShares: transaction.total_shares,
                    stock: stock,
                };
            } else {
                acc[stock.id].totalShares += transaction.total_shares;
            }
            return acc;
        }, {});
    }, [userTransactions, stocks]);

    const ownedShares = userOwnedStocks[stock.id]?.totalShares || 0;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (totalShares > ownedShares) {
            setErrors(["You cannot sell more shares than you own."]);
            return;
        }

        const transactionData = {
            stock_id: stock.id,
            user_id: user.id,
            portfolio_id: portfolio.id,
            transaction_type: transactionType,
            total_shares: parseInt(totalShares),
            total_price: totalPrice
        }

        const buyingpowerData = {
            ...portfolio,
            buyingPower: buyingPower + totalPrice
        }

        const transfer = await dispatch(changeBuyingPower(portfolio.id, buyingpowerData))
        const transaction = await dispatch(makeTransaction(transactionData))
        if (transaction) {
            setErrors(transaction);
            setErrors(transfer)
        } else {
            dispatch(fetchTransaction());
            closeModal();
        }
    }

    return (
        <form onSubmit={handleSubmit} className="sell-form">
            <label>
                Shares:
                <input
    type="number"
    value={totalShares}
    onChange={(e) => {
        const value = parseInt(e.target.value, 10);
        if (value < 1) {
            setErrors(["Shares must be at least 1"]);
        } else if (value > ownedShares) {
            setErrors(["You cannot sell more shares than you own."]);
        } else {
            setTotalShares(value);
            setTotalPrice(value * stock.price);
            setErrors([]); 
        }
    }}
/>
            </label>

            <label>
                Total: {totalPrice}
            </label>
            <button type="submit">Sell</button>
        </form>
    );
}

export default PostSellTransaction;
