import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { changeBuyingPower } from "../../store/portfolio";
import './AddFundsModal.css'

function AddFundsModal() {
    const dispatch = useDispatch()
    let buyingPower = useSelector((state) => (state.portfolioReducer?.portfolio?.buyingPower || 0))
    const portfolio = useSelector((state)=> (state.portfolioReducer.portfolio))
    const [totalFunds, setTotalFunds] = useState(0);
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();


    const handleSubmit = async(e) => {
        e.preventDefault();

          const buyingpowerData = {
            ...portfolio,
            buyingPower: Number(buyingPower) + Number(totalFunds)
        }

        const transfer = await dispatch(changeBuyingPower(portfolio.id, buyingpowerData))
        if (transfer) {
            setErrors(transfer)
        } else {
            closeModal();
        }
    }

    return (
        <div>
        <form onSubmit={handleSubmit} className="form-container">
            <label>
                How much would you like to add to your account?
                <input
                    type="number"
                    value={totalFunds}
                    onChange={(e) => setTotalFunds(e.target.value)}
                />
            </label>

            <label>
                New total buying power:{Number(buyingPower) + Number(totalFunds)}
            </label>
            <button type="submit" disabled={totalFunds < 0}>Add funds</button>
        </form>
        </div>
    );
}

export default AddFundsModal;
