import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<ul>
			{/* <li>
				<NavLink exact to="/">Home</NavLink>
			</li> */}

			{isLoaded && (
				<li>
					<ProfileButton user={sessionUser} />
				</li>
			)}
			{/* <div>
				{!sessionUser || (
					<>
						<button> LogOut </button>
						<label>
							<input
								placeholder='search'
								type='text'
							/>
						</label>
					</>
				)}
			</div> */}
		</ul>
	);
}

export default Navigation;
