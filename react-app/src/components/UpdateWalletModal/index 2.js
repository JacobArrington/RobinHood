import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { updateUserWallet, fetchWallet } from "../../store/wallet";
import "./UpdateWalletModal.css";

function UpdateWalletModal({ wallet, fetchUpdateWallet }) {
    const dispatch = useDispatch();
    const [accountType, setAccountType] = useState(wallet.account_type);
    const [accountNum, setAccountNum] = useState(wallet.account_num);
    const [routingNum, setRoutingNum] = useState(wallet.routing_num);
    const [cash, setCash] = useState(wallet.cash);
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();


    // const handleSubmit = (e) => {
    //     e.preventDefault();

    //     const updatedWalletData = {
    //         account_type: accountType,
    //         account_num: accountNum,
    //         routing_num: routingNum,
    //         cash,
    //     };
    //     dispatch(updateUserWallet(wallet.id, updatedWalletData)).then(dispatch(fetchWallet()));
    //     closeModal()
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const updatedWalletData = {
            account_type: accountType,
            account_num: accountNum,
            routing_num: routingNum,
            cash,
        };
        await dispatch(updateUserWallet(wallet.id, updatedWalletData));
        fetchUpdateWallet(); // Call the function passed from the parent component to refresh the wallet data.
        closeModal();
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Account Type:
                <select value={accountType} onChange={(e) => setAccountType(e.target.value)}>
                    <option value="checking">Checking</option>
                    <option value="savings">Savings</option>
                </select>
            </label>

            <label>
                Account Number:
                <input
                    type="text"
                    value={accountNum}
                    onChange={(e) => setAccountNum(parseInt(e.target.value))}
                />
            </label>

            <label>
                Routing Number:
                <input
                    type="text"
                    value={routingNum}
                    onChange={(e) => setRoutingNum(parseInt(e.target.value))}
                />
            </label>
            <label>
                Cash:
                <input
                    type="number"
                    value={cash}
                    onChange={(e) => setCash(e.target.value)}
                />
            </label>
            <button type="submit">Update Wallet</button>
        </form>
    );
};

export default UpdateWalletModal;
