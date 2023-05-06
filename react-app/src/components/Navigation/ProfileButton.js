import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import './ProfileButton.css'
import { useHistory } from "react-router-dom";
import { HamburgerIcon } from 'react-hamburger-icon'

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  //   const sessionUser = useSelector(state => state.session.user);
  //   const [showMenu, setShowMenu] = useState(false);
  //   const [hide, setHide] = useState(true);
  //   const ulRef = useRef();

  const [navbarOpen, setNavbarOpen] = useState(false);
  const history = useHistory()



  //   const openMenu = () => {
  //     if (showMenu) return;
  //     setShowMenu(true);
  //   };

  //   useEffect(() => {
  //     if (!showMenu) return;

  //     const closeMenu = (e) => {
  //       if (!ulRef.current.contains(e.target)) {
  //         setShowMenu(false);
  //       }
  //     };

  //     document.addEventListener("click", closeMenu);

  //     return () => document.removeEventListener("click", closeMenu);
  //   }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout()).then(() => history.push('/'));
  };

  const ref = useRef();
  useEffect(() => {
    const handler = (event) => {
      if (
        navbarOpen &&
        ref.current &&
        !ref.current.contains(event.target)
      ) {
        setNavbarOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', handler);
    };
  }, [navbarOpen]);


  //   // const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setNavbarOpen(false);

  return (
    <nav ref={ref} className="navbar">
      <button
        className="toggle button"
        onClick={() => setNavbarOpen((prev) => !prev)}
      >
        {navbarOpen ? (
          <HamburgerIcon style={{ width: '24px', height: '24px', color: "white" }} />
        ) : (
          <HamburgerIcon
            style={{
              width: '24px',
              height: '24px',
              color: "white"
            }}
          />
        )}
      </button>
      <ul className={`menu-nav${navbarOpen ? ' show-menu' : ''}`}>
        {user ? (
          <>
            <div>{user.username}</div>
            <div>{user.email}</div>
            <li onClick={() => setNavbarOpen((prev) => !prev)}>
              <button onClick={handleLogout} className="button">Log Out</button>
            </li>
          </>
        ) : (
          <>
            <li onClick={() => setNavbarOpen((prev) => !prev)}>
              <OpenModalButton
                buttonText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
            </li>
            <li onClick={() => setNavbarOpen((prev) => !prev)}>
              <OpenModalButton
                id="log-in"
                buttonText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </li>
          </>
        )}
      </ul>
    </nav>

    //     <>
    //       {!sessionUser ?(
    //         <>
    //       {/* <button onClick={openMenu}>
    //         <i className="fas fa-user-circle" />
    //       </button> */}
    //       <div 
    //       // className={ulClassName} 
    //       ref={ulRef}>
    //         {user ? (
    //           <>
    //             <div>{user.username}</div>
    //             <div>{user.email}</div>
    //             <div>
    //               <button onClick={handleLogout}>Log Out</button>
    //             </div>
    //           </>
    //         ) : (
    //           <>
    //             <OpenModalButton
    //               buttonText="Log In"
    //               onItemClick={closeMenu}
    //               modalComponent={<LoginFormModal />}
    //             />

    //             <OpenModalButton
    //               buttonText="Sign Up"
    //               onItemClick={closeMenu}
    //               modalComponent={<SignupFormModal />}
    //             />
    //           </>
    //         )}
    //       </div>
    //           </>
    //       ) : ([hide])}
    //     </>
  );

}

export default ProfileButton;
