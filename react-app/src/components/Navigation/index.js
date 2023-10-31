import React, { useState, useEffect, useRef } from "react";
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logoPicture from "./logo.png";

function Navigation({ isLoaded }) {
	const [showMenu, setShowMenu] = useState(false);
	const ulRef = useRef();

	const sessionUser = useSelector(state => state.session.user);

	useEffect(() => {
		if (!showMenu) return;

		const closeMenu = (e) => {
			if (!ulRef.current.contains(e.target)) {
				setShowMenu(false);
			}
		};

		document.addEventListener("click", closeMenu);

		return () => document.removeEventListener("click", closeMenu);
	}, [showMenu]);

	return (
		<div className="menu-top">
			<div className="image_top">
				<NavLink exact to="/"><img className="image_top_image" src={logoPicture} alt="logo"></img></NavLink>
			</div>
			{isLoaded && (
				<div className="menu_top">
					<ProfileButton user={sessionUser} />
				</div>
			)}
		</div>
	);
}

export default Navigation;
