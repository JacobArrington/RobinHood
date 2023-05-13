import React from 'react';
import { useModal } from '../../context/Modal';

export default function SearchResModal({searchResults, onStockSelect}) {
    const { closeModal } = useModal();

    const handleClick = (stockId) => {
        onStockSelect(stockId);
        closeModal();
      };
      return(
        <div>
        {searchResults.map(stock =>(
            <div key={stock.id} onClick={() =>handleClick(stock.id)}>
                {stock.name}
            </div>
        ))}
        </div>
      )
}
