import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { fetchStocks } from "../../store/stock";
import './stock.css'






const Stock = () => {
    const dispatch = useDispatch()
    const allStocks = useSelector((state) => state?.stocks);
    const objArr = Object.values(allStocks)

    console.log(objArr)

    useEffect(() => {
        dispatch(fetchStocks());
    }, [dispatch]);

return (
        <div>
        </div>
    );
}

export default Stock;
