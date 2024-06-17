import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import SpotDetail from './components/SpotDetail';
import NewSpot from './components/NewSpot';
import ManageSpots from './components/ManageSpots';
import UpdateSpot from './components/UpdateSpot';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import Navigation from './components/Navigation';
import * as sessionActions from './store/session';

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <LandingPage /> },
      { path: '/login', element: <LoginFormPage /> },
      { path: '/signup', element: <SignupFormPage /> },
      { path: '/spots/:id', element: <SpotDetail /> },
      { path: '/spots/new', element: <NewSpot /> },
      { path: '/manage-spots', element: <ManageSpots /> },
      { path: '/spots/:id/edit', element: <UpdateSpot /> }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
