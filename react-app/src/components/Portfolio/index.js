import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
// import UpdateWalletModal from "../UpdateWalletModal"
// import PostWalletModal from "../PostWalletModal";
// import OpenModalButton from "../OpenModalButton";
import { fetchPortfolio } from "../../store/portfolio";
import './Portfolio.css'

const Portfolio = () => {
    const dispatch = useDispatch()
    const portfolioState = useSelector((state) => state.portfolioReducer)
    useEffect(() => {
        dispatch(fetchPortfolio())
    }, [dispatch])

    return (
        <>
        <p>Your current Buying Power is : ${portfolioState?.portfolio?.buyingPower.toFixed(2)}</p>
       </>
    )
}

export default Portfolio;
