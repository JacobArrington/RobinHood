import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { fetchStocks } from "../../store/stock";
import './stock.css'


const Stock = () => {
    const dispatch = useDispatch()
    const allStocks = useSelector((state) => state?.stocksReducer);


    const [isLoaded, setIsLoaded] = useState(false);
    console.log(allStocks)

    useEffect(() => {
        dispatch(fetchStocks()).then(() => setIsLoaded(true));
    }, [dispatch]);

    return (
        <div>
            {Object.values(allStocks).map(stock => (
                <div key={stock.id}>
                    <p>
                        {stock.name}{stock.ticker}{stock.price}
                    </p>
                </div>
            ))}
        </div>
    );
}

export default Stock;
