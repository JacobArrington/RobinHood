import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { fetchStocks } from "../../store/stock";
import './stock.css'

const Stock = ({stock}) =>{
    return(
        <div className="stock">
            <h2>{stock.name}</h2>
            <h3>{stock.ticker}</h3>
            <p>Price: ${stock.price}</p>
        </div>
    )
}

export default Stock;
