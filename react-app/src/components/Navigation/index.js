import React, {useState} from 'react';
import { logout } from "../../store/session";
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import { Redirect, useHistory } from "react-router-dom";
import './Navigation.css';
import StockChart from '../Graph/chart';
import { fetchStocks, fetchStockHistory } from "../../store/stock";


function Navigation({ isLoaded }) {
	const dispatch = useDispatch();
	const history = useHistory();
	const sessionUser = useSelector(state => state.session.user);
	const allStocks = useSelector((state) => state.stocksReducer)

	const [searchInput, setSearchInput] = useState(null);

	const handleSearchChange = (e) => {
		e.preventDefault();

		setSearchInput(e.target.value);
	};


	// if (!sessionUser) return <Redirect to="/" />;

	const handleLogout = (e) => {
		e.preventDefault();
		dispatch(logout()).then(() => history.push('/'));

	};

	return (
		<ul>
			{/* <li>
				<NavLink exact to="/">Home</NavLink>
			</li> */}

			{isLoaded && (
				<div>
					<ProfileButton user={sessionUser} />
				</div>
			)}
			<div>
				{!sessionUser || (
					<>
						<button onClick={handleLogout}>Log Out</button>
						<form>
						<label>
							<input
								placeholder='search'
								type='text'
								value={searchInput}
								// onChange={(e) => setSearchInput(e.target.value)}
							/>
						{/* <StockChart
							ticker={searchInput} /> */}
						</label>
							<button onClick={handleSearchChange}>
								{searchInput && (
									<StockChart ticker={allStocks[searchInput].ticker} />
								)}
								Search
							</button>
						</form>
					</>
				)}
			</div>
		</ul>
	);
}

export default Navigation;
