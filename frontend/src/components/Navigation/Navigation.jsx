import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import * as sessionActions from '../../store/session';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import LoginModal from '../LoginFormPage/LoginModal';
import SignupModal from '../SignupFormPage/SignUpModal';
import './ProfileButton.css';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <button onClick={toggleMenu}>
        <FaUserCircle />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li>{user.username}</li>
            <li>{user.firstName} {user.lastName}</li>
            <li>{user.email}</li>
            <li>
              <button onClick={logout}>Log Out</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <OpenModalButton
                buttonText="Log In"
                onButtonClick={closeMenu}
                modalComponent={<LoginModal />}
              />
            </li>
            <li>
              <OpenModalButton
                buttonText="Sign Up"
                onButtonClick={closeMenu}
                modalComponent={<SignupModal />}
              />
            </li>
          </>
        )}
      </ul>
    </>
  );
}

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  const sessionLinks = sessionUser ? (
    <>
      <li>
        <ProfileButton user={sessionUser} />
      </li>
    </>
  ) : (
    <>
      <li>
        <OpenModalButton
          buttonText="Log In"
          modalComponent={<LoginModal />}
        />
      </li>
      <li>
        <OpenModalButton
          buttonText="Sign Up"
          modalComponent={<SignupModal />}
        />
      </li>
    </>
  );

  return (
    <ul>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      {isLoaded && sessionLinks}
    </ul>
  );
}

export default Navigation;


// import { NavLink } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import ProfileButton from './ProfileButton';
// import OpenModalButton from '../OpenModalButton';
// import LoginModal from '../LoginModal';
// import SignupModal from '../SignupModal';
// import './Navigation.css';

// function Navigation({ isLoaded }) {
//   const sessionUser = useSelector((state) => state.session.user);

//   let sessionLinks;
//   if (sessionUser) {
//     sessionLinks = (
//       <li>
//         <ProfileButton user={sessionUser} />
//       </li>
//     );
//   } else {
//     sessionLinks = (
//       <>
//         <li>
//           <OpenModalButton
//             buttonText="Log In"
//             modalComponent={<LoginModal />}
//           />
//         </li>
//         <li>
//           <OpenModalButton
//             buttonText="Sign Up"
//             modalComponent={<SignupModal />}
//           />
//         </li>
//       </>
//     );
//   }

//   return (
//     <ul>
//       <li>
//         <NavLink to="/">Home</NavLink>
//       </li>
//       {isLoaded && sessionLinks}
//     </ul>
//   );
// }

// export default Navigation;


// import { NavLink } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import ProfileButton from './ProfileButton';
// import * as sessionActions from '../../store/session';
// import './Navigation.css';

// function Navigation({ isLoaded }) {
//   const sessionUser = useSelector(state => state.session.user);
//   const dispatch = useDispatch();

//   const logout = (e) => {
//     e.preventDefault();
//     dispatch(sessionActions.logout());
//   };

//   const sessionLinks = sessionUser ? (
//     <>
//       <li>
//         <ProfileButton user={sessionUser} />
//       </li>
//       <li>
//         <button onClick={logout}>Log Out</button>
//       </li>
//     </>
//   ) : (
//     <>
//       <li>
//         <NavLink to="/login">Log In</NavLink>
//       </li>
//       <li>
//         <NavLink to="/signup">Sign Up</NavLink>
//       </li>
//     </>
//   );

//   return (
//     <ul>
//       <li>
//         <NavLink to="/">Home</NavLink>
//       </li>
//       {isLoaded && sessionLinks}
//     </ul>
//   );
// }

// export default Navigation;
