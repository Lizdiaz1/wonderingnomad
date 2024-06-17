import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import LoginModal from './LoginFormPage/LoginModal';
import SignUpModal from './SignUpModal';

const Header = () => {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setSignUpModalOpen] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const userMenuRef = useRef(null);

  useEffect(() => {
    const loggedIn = JSON.parse(localStorage.getItem('loggedIn'));
    if (loggedIn) {
      setLoggedIn(true);
      setUser(loggedIn);
    }
  }, []);

  const openLoginModal = () => setLoginModalOpen(true);
  const closeLoginModal = () => setLoginModalOpen(false);

  const openSignUpModal = () => setSignUpModalOpen(true);
  const closeSignUpModal = () => setSignUpModalOpen(false);

  const handleLogin = (user) => {
    setLoggedIn(true);
    setUser(user);
    localStorage.setItem('loggedIn', JSON.stringify(user));
    closeLoginModal();
  };

  const handleSignUp = (user) => {
    setLoggedIn(true);
    setUser(user);
    localStorage.setItem('loggedIn', JSON.stringify(user));
    closeSignUpModal();
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUser(null);
    localStorage.removeItem('loggedIn');
    navigate('/');
  };

  const toggleUserMenu = () => setUserMenuOpen((prev) => !prev);

  const closeUserMenu = (e) => {
    if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
      setUserMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', closeUserMenu);
    return () => {
      document.removeEventListener('click', closeUserMenu);
    };
  }, []);

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <img src="/path/to/logo.png" alt="NomadNook Logo" />
        </Link>
        <nav className="nav">
          {isLoggedIn && (
            <>
              <Link to="/spots/new" className="create-spot-button">
                Create a New Spot
              </Link>
              <div className="user-menu" ref={userMenuRef}>
                <button onClick={toggleUserMenu} className="user-menu-button">
                  {user.firstName}
                </button>
                {isUserMenuOpen && (
                  <div className="user-menu-dropdown">
                    <p>Hello, {user.firstName}</p>
                    <p>{user.email}</p>
                    <Link to="/manage-spots">Manage Spots</Link>
                    <button onClick={handleLogout}>Log out</button>
                  </div>
                )}
              </div>
            </>
          )}
          {!isLoggedIn && (
            <div className="dropdown">
              <button className="dropbtn">Account</button>
              <div className="dropdown-content">
                <button onClick={openLoginModal}>Log in</button>
                <button onClick={openSignUpModal}>Sign up</button>
              </div>
            </div>
          )}
        </nav>
      </div>
      {isLoginModalOpen && <LoginModal onClose={closeLoginModal} onLogin={handleLogin} />}
      {isSignUpModalOpen && <SignUpModal onClose={closeSignUpModal} onSignUp={handleSignUp} />}
    </header>
  );
};

export default Header;
