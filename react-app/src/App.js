import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import Stock from "./components/Stocks";
// import GetStockById from "./components/getStocksById";
import StockHistory from "./components/StockHistory";
import LandingPage from "./components/LandingPage"
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Wallet from "./components/Wallet";
import Transaction from "./components/Transaction";
import ProtectedDashboard from "./components/Dashboard";
import Watchlists from "./components/Watchlists";
import Portfolio from "./components/Portfolio";
import OwnedStock from "./components/OwnedStock";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/" >
            <LandingPage />
          </Route>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <ProtectedRoute path="/portfolio">
            {/* <Stock />
            <GetStockById />
            <StockHistory /> */}
            <>
              <Stock />
              {/* <GetStockById /> */}
              <StockHistory />

              <Wallet />
              <Watchlists />
              <Transaction />
              <Portfolio />
            </>
          </ProtectedRoute>
        </Switch>
      )}
    </>
  );
}

export default App;
