import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { fetchStocks } from "../../store/stock";
import './stock.css'


const Stock = () => {
    const dispatch = useDispatch()
    const allStocks = useSelector((state) => state.stocksReducer);

    const [stocks, setStock] = useState(Object.keys(allStocks))


    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(fetchStocks()).then(() => setIsLoaded(true));
    }, [dispatch]);

    return (
        <div>
            {/* {Object.values(allStocks).map(stock => (
                <div key={stock.id} onClick={() => setStock(stock)}>
                    {stock.id}
                </div>
            ))} */}
        </div>
    );
}

export default Stock;
