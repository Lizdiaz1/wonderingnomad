import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import SpotDetail from './components/SpotDetail';
import NewSpot from './components/NewSpot';
import ManageSpots from './components/ManageSpots';
import UpdateSpot from './components/UpdateSpot';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        {/* Define your routes here */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/spots/:id" element={<SpotDetail />} />
        <Route path="/spots/new" element={<NewSpot />} />
        <Route path="/manage-spots" element={<ManageSpots />} />
        <Route path="/spots/:id/edit" element={<UpdateSpot />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
