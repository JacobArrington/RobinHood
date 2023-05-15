// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Redirect } from "react-router-dom";
// // import UpdateWalletModal from "../UpdateWalletModal"
// // import PostWalletModal from "../PostWalletModal";
// // import OpenModalButton from "../OpenModalButton";
// import { fetchPortfolio } from "../../store/portfolio";
// import './Portfolio.css'

// const Portfolio = () => {
//     const dispatch = useDispatch()
//     const portfolioState = useSelector((state) => state.portfolioReducer)
//     useEffect(() => {
//         dispatch(fetchPortfolio())
//     }, [dispatch])

//     return (
//         <>
//         <p>{portfolioState?.portfolio?.user}</p>
//         <p>{portfolioState?.portfolio?.wallet}</p>
//         <p>${portfolioState?.portfolio?.buyingPower}: Buying Power</p>
//        </>
//     )
// }

// export default Portfolio;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { fetchPortfolio } from "../../store/portfolio";
import "./Portfolio.css";

const Portfolio = () => {
  const dispatch = useDispatch();
  const portfolioState = useSelector((state) => state.portfolioReducer);

  useEffect(() => {
    dispatch(fetchPortfolio());
  }, [dispatch]);

  return (
    <div className="portfolio-container">
      <h2 className="portfolio-title">{portfolioState?.portfolio?.user}</h2>
      <div className="grid-container">
        {/* <div className="grid-item wallet"> */}
          {/* <h3 className="grid-item-title">Wallet</h3> */}
          {/* <p className="grid-item-value">${portfolioState?.portfolio?.wallet}</p> */}
        {/* </div>
        <div className="grid-item buying-power">
          <h3 className="grid-item-title">Buying Power</h3>
          <p className="grid-item-value">${portfolioState?.portfolio?.buyingPower}</p>
        </div> */}
      </div>
    // </div>
  );
};

export default Portfolio;
