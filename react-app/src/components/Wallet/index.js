import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import UpdateWalletModal from "../UpdateWalletModal"
import AddFundsModal from "../AddFundsModal"
import PostWalletModal from "../PostWalletModal";
import OpenModalButton from "../OpenModalButton";
import { fetchWallet, destroyWallet, updateUserWallet } from "../../store/wallet";
import './wallet.css'

const Wallet = () => {
    const dispatch = useDispatch()
    const allWallets = useSelector((state) => state.walletReducer);
    console.log(allWallets)

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
        <div>
          {!isWalletsEmpty ? (
           
            <>
             {console.log(allWallets, '!!!!!!!!!!!!!!!!')}
              {Object.values(allWallets).map((wallet) => (
                <div key={wallet.id}>
                  <p>{wallet.account_type}</p>
                  <p>{wallet.routing_num}</p>
                  <button onClick={() => deleteWallet(wallet.id)}>
                    Delete Wallet
                  </button>
                  <OpenModalButton
                    buttonText="Update Wallet"
                    modalComponent={
                      <UpdateWalletModal
                        wallet={wallet}
                        fetchUpdateWallet={fetchUpdateWallet}
                      />
                    }
                  />
                  <OpenModalButton
                    buttonText="Add funds"
                    modalComponent={
                      <AddFundsModal />
                    }
                  />
                </div>
              ))}
            </>
          ) : (
            <div>
            <p>Marlon is Gay</p>
            <OpenModalButton
              buttonText="Create Wallet"
              modalComponent={
                <PostWalletModal fetchUpdateWallet={fetchUpdateWallet} />
                
              }
            />
            </div>
          )}
        </div>
      );
            }

export default Wallet;
