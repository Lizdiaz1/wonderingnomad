import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
//import Header from './components/Header/Header';
import LandingPage from './components/LandingPage/LandingPage';
import SpotDetail from './components/SpotDetail/SpotDetail';
import NewSpot from './components/NewSpot/NewSpot';
import ManageSpots from './components/ManageSpots/ManageSpots';
import UpdateSpot from './components/UpdateSpot/UpdateSpot';
import LoginFormPage from './components/LoginFormPage/LoginModal';
import SignupFormPage from './components/SignupFormPage/SignUpModal';
import Navigation from './components/Navigation/Navigation';
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
