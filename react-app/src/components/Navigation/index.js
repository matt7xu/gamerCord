import React, { useState, useEffect, useRef } from "react";
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import './Navigation.css';
import logoPicture from "./logo.png";

function Navigation({ isLoaded }) {
	const [showMenu, setShowMenu] = useState(false);
	const ulRef = useRef();

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

	const sessionUser = useSelector(state => state.session.user);
  const closeMenu = () => setShowMenu(false);
	return (
		<ul>
			<li>
				<NavLink exact to="/"><img src={logoPicture} alt="logo"></img></NavLink>
			</li>
			{isLoaded && (
				<>
					<li>
						<ProfileButton user={sessionUser} />
					</li>
				</>
			)}
		</ul>
	);
}

export default Navigation;
