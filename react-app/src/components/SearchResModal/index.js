// import React from 'react';
// import { useModal } from '../../context/Modal';
// import "./SearchRes.css"

// export default function SearchResModal({searchResults, onStockSelect}) {
//     const { closeModal } = useModal();

//     const handleClick = (stockId) => {
//         onStockSelect(stockId);
//         closeModal();
//       };
//       return(
//         <div>
//         {searchResults.map(stock =>(
//             <div key={stock.id} onClick={() =>handleClick(stock.id)}>
//                 {stock.name}
//             </div>
//         ))}
//         </div>
//       )
// }


import React from 'react';
import { useModal } from '../../context/Modal';
import "./SearchRes.css"

export default function SearchResModal({ searchResults, onStockSelect }) {
  const { closeModal } = useModal();

  const handleClick = (stockId) => {
    onStockSelect(stockId);
    closeModal();
  };

  return (
    <div className="search-res-modal">
      <div className="search-res-list">
        {searchResults.slice(0, 10).map((stock) => (
          <div key={stock.id} onClick={() => handleClick(stock.id)}>
            {stock.name}
          </div>
        ))}
      </div>
    </div>
  );
}
