



import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import UpdateWalletModal from "../UpdateWalletModal"
import AddFundsModal from "../AddFundsModal"
import PostWalletModal from "../PostWalletModal";
import OpenModalButton from "../OpenModalButton";
import { fetchWallet, destroyWallet, updateUserWallet } from "../../store/wallet";
import './wallet.css'

const Wallet = () => {
  const dispatch = useDispatch()
  const allWallets = useSelector((state) => state.walletReducer);
  const portfolioState = useSelector((state) => state.portfolioReducer);

  const [isLoaded, setIsLoaded] = useState(false);

  const deleteWallet = (walletId) => {
    const confirm = window.confirm(
        'Are you sure? This action cannot be undone'
    )
    if(confirm){
        dispatch(destroyWallet(walletId))
    }

  }

  const fetchUpdateWallet = async () => {
    await dispatch(fetchWallet())
  }

  const updateUserWallet = (id, updateWalletData) => {
    dispatch(updateUserWallet(id, updateWalletData))
  }

  useEffect(() => {
    dispatch(fetchWallet()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const isWalletsEmpty = Object.keys(allWallets).length === 0;

  return (
    <div className="wallet-container">
      <div className="wallet-list">
        {!isWalletsEmpty ? (
          Object.values(allWallets).map((wallet) => (
            <div key={wallet.id} className="wallet-card">
              <p>Account Type: {wallet.account_type}</p>
              <p>Routing # {wallet.routing_num}</p>
              
              <div className="wallet-card-actions">
                <button className="delete-button" onClick={() => deleteWallet(wallet.id)}>
                <i className="fas fa-trash-alt"></i>
                </button>
                <OpenModalButton
                  buttonText={<><i className="fas fa-edit"></i> </>}
                  modalComponent={
                    <UpdateWalletModal
                      wallet={wallet}
                      fetchUpdateWallet={fetchUpdateWallet}
                    />
                  }
                />
                <OpenModalButton
                  buttonText="Add funds"
                  modalComponent={<AddFundsModal />}
                />
              </div>
              <div className="buying-power">
                <p>${portfolioState?.portfolio?.buyingPower}: Buying Power</p>
              </div>
            </div>
          ))
        ) : (
          <div>
            <p>No wallet found. Please add one.</p>
            <OpenModalButton
              buttonText="Create Wallet"
              modalComponent={
                <PostWalletModal fetchUpdateWallet={fetchUpdateWallet} />
              }
            />
          </div>
        )}
      </div>
    </div>

  );
            }
  
export default Wallet;
