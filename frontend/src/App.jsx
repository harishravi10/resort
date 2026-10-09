import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Cursor } from './components/Cursor';
import { LoadingScreen } from './components/LoadingScreen';
import { BookingModal } from './components/BookingModal';
import { Home } from './pages/Home';
import { Rooms } from './pages/Rooms';
import { RoomDetail } from './pages/RoomDetail';
import { Dining } from './pages/Dining';
import { Spa } from './pages/Spa';
import { Activities } from './pages/Activities';
import { UserDashboard } from './pages/UserDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { useAuth } from './context/AuthContext';

function App() {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const { user, isAdmin } = useAuth();

  return (
    <div className="aurelia-app">
      {/* Cinematic 3D Loading Screen on Initial Mount */}
      {!loadingComplete && <LoadingScreen onFinish={() => setLoadingComplete(true)} />}

      {/* Luxury Custom Cursor */}
      <Cursor />

      {/* Floating Glass Navigation */}
      <Navbar />

      {/* Core Page Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/rooms/:id" element={<RoomDetail />} />
        <Route path="/dining" element={<Dining />} />
        <Route path="/spa" element={<Spa />} />
        <Route path="/activities" element={<Activities />} />

        {/* User Protected Dashboard */}
        <Route path="/dashboard" element={<UserDashboard />} />

        {/* Admin Dashboard */}
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Global Booking System Modal */}
      <BookingModal />

      {/* Editorial Luxury Footer */}
      <Footer />
    </div>
  );
}

export default App;
