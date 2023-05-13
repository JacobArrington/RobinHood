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

        const WalletData = {

            account_type: accountType,
            account_num: accountNum,
            routing_num: routingNum,
        };
        const Success = await dispatch(postWallet(WalletData));
        if (Success) {
            setErrors(Success);
        } else {
            dispatch(fetchWallet());
            closeModal();
        }
    };

    return (
        <form onSubmit={handleSubmit}>
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
            <button type="submit">Update Wallet</button>
        </form>
    );
};

export default PostWalletModal;
