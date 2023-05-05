import React from 'react';
import { logout } from "../../store/session";
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
	const dispatch = useDispatch();
	const sessionUser = useSelector(state => state.session.user);

	const handleLogout = (e) => {
		e.preventDefault();
		dispatch(logout());
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
						<label>
							<input
								placeholder='search'
								type='text'
							/>
						</label>
					</>
				)}
			</div>
		</ul>
	);
}

export default Navigation;
