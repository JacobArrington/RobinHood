import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import ProtectedRoute from '../auth/ProtectedRoute';
import Stock from '../Stocks';
// import GetStockById from '../getStocksById';
import StockHistory from '../StockHistory';

const Dashboard = () => {
    const user = useSelector(state => state.session.user);

    if (!user){
        return <Redirect to='/' />
    }

    return (
        <>
        <Stock />
        {/* <GetStockById /> */}
        <StockHistory />
        </>
    )
}

const ProtectedDashboard = () => {
    return (
        <ProtectedRoute path='/dashboard'>
            <Dashboard />
        </ProtectedRoute>
    )
}

export default ProtectedDashboard
