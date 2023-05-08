import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { fetchWallet } from "../../store/wallet";
import './wallet.css'

const Wallet = () => {
    const dispatch = useDispatch()
    const allWallets = useSelector((state) => state.walletReducer);

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(fetchWallet()).then(() => setIsLoaded(true));
    }, [dispatch]);

    return (
        <div>
                {Object.values(allWallets).map(wallet => (
                    <div key={wallet.id}>
                        <p>{wallet.account_type}</p>
                    </div>
                ))}

        </div>
    );
}

export default Wallet;
