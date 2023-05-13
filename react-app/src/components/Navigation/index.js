import React from 'react';
import { logout } from "../../store/session";
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import StockSearch from '../Search';
import { Redirect, useHistory } from "react-router-dom";
import Icon from '../Logo';
import './Navigation.css';

function Navigation({ isLoaded }) {
	const dispatch = useDispatch();
	const history = useHistory();
	const sessionUser = useSelector(state => state.session.user);


	// if (!sessionUser) return <Redirect to="/" />;

	const handleLogout = (e) => {
		e.preventDefault();
		dispatch(logout()).then(() => history.push('/'));

	};

	return (
		<ul>
			{isLoaded && (
				<div>
					<ProfileButton user={sessionUser} />
				</div>
			)}
			<div>
				{!sessionUser || (
					<>
						<button onClick={handleLogout}>Log Out</button>
						<StockSearch />
					</>
				)}
			</div>
		</ul>
	);
}

export default Navigation;
