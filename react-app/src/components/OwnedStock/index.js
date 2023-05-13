import React from "react";
import { useSelector } from "react-redux";

const OwnedStock = () =>{
    const shares = useSelector((state) => shares);

    const sharesList = Object.values(shares)

    return (
        <div>
            <h2>Owned_Stocks</h2>
            <ul>
                {sharesList.map((share)=>(
                    <div key={share.id}>
                        <h3>{share.stock.name}</h3>
                        <p>Shares: {share.total.price}</p>
                        <p>price per: {share.total.price}</p>
                        <p>Shares: {share.total.price}</p>
                    </div>
                ))}
            </ul>
        </div>
    )

    
}
