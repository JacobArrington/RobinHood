import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import {  fetchWallet, postWallet } from "../../store/wallet";
import "./Post.css";

function PostWalletModal() {
    const dispatch = useDispatch();
    const [accountType, setAccountType] = useState('checking');
    const [accountNum, setAccountNum] = useState('');
    const [routingNum, setRoutingNum] = useState('');
    const [cash, setCash] = useState(0);
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

        if (!accountType || !accountNum || !routingNum) {
            setErrors(["Please fill out all required fields."]);
            return;
        }
    
        const WalletData = {
            
            account_type: accountType,
            account_num: parseInt(accountNum),
            routing_num: parseInt(routingNum),
        };
        const Success = await dispatch(postWallet(WalletData));
        if (Success) {
            setErrors(Success);
        } else {
            setErrors([]);
            closeModal();
        } 
        dispatch(fetchWallet());   
    };

    return (
        <form onSubmit={handleSubmit} className="wallet-form">
            <label>
                Account Type:
                <select value={accountType} onChange={(e) => setAccountType(e.target.value)}>
                    <option value="checking">checking</option>
                    <option value="savings">savings</option>
                </select>
            </label>

            <label>
                Account Number:
                <input
                    type="text"
                   // defaultValue={'00000000000'}
                    value={accountNum}
                    onChange={(e) => setAccountNum(e.target.value)}
                />
            </label>

            <label>
                Routing Number:
                <input
                    type="text"
                   // defaultValue={'00000000000'}
                    value={routingNum}
                    onChange={(e) => setRoutingNum(e.target.value)} 
                />
            </label>
            <button type="submit">Create Wallet</button>
        </form>
    );
};

export default PostWalletModal;
