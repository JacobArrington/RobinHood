import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransaction } from "../../store/transaction";
import { fetchShares } from "../../store/shares";
import { fetchStocks } from "../../store/stock";
// this means nothing 
const OwnedStock = () => {
    const dispatch = useDispatch()
    const userId = useSelector((state) => state.session.user.id)
    const allTransactions = useSelector((state) => state?.transactionReducer)
    const stocks = useSelector((state) => state.stocksReducer)

    const [isDataLoaded, setIsDataLoaded] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchTransaction());
            await dispatch(fetchStocks());
            setIsDataLoaded(true);
        };
        fetchData();
    }, [dispatch]);


    
    if (!isDataLoaded) {
        return null; 
    }

    const userTransactions = Object.values(allTransactions).filter(
        (transaction) => transaction.user_id === userId
    );
   
    const userOwnedStocks = userTransactions.reduce((acc, transaction) => {
        const stock = stocks[transaction.stock_id];
        const shares = Number(transaction.total_shares);
        let newTotalShares = 0;
        if (transaction.transaction_type === 'buy') {
            newTotalShares = (acc[transaction.stock_id]?.totalShares || 0) + shares;
        } else if (transaction.transaction_type === 'sell') {
            newTotalShares = (acc[transaction.stock_id]?.totalShares || 0) - shares;
        }
    
        if (newTotalShares > 0) {
            if (!acc[transaction.stock_id]) {
                acc[transaction.stock_id] = {
                    stockName: stocks[transaction.stock_id].name,
                    totalShares: 0,
                    totalValue: 0
                }
            }
            acc[transaction.stock_id].totalShares = newTotalShares;
            acc[transaction.stock_id].totalValue = newTotalShares * stock.price;
        } else {
            delete acc[transaction.stock_id]; // Remove the stock from the object if its share count is 0
        }
    
        return acc;
    }, {});
    console.log(userOwnedStocks)
    return (
        <>
            {Object.values(userOwnedStocks).map((stock) => {
                if (stock.totalShares > 0) {
                    return (
                        <div key={stock.stockName}>
                            <h3>Stock Name: {stock.stockName}</h3>
                            <p>Total Shares Owned: {stock.totalShares}</p>
                            <p>Total Value: ${stock.totalValue.toFixed(2)}</p>
                        </div>
                    )
                }
})}
        </>
    );
}

export default OwnedStock;
