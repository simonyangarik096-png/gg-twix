import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import YanaPanel from './pages/YanaPanel.jsx';
import EvaPanel from './pages/EvaPanel.jsx';
import GamePage from './pages/GamePage.jsx';
import Login from './pages/Login.jsx';

import YanaAdmin from './pages/admin/YanaAdmin.jsx';
import EvaAdmin from './pages/admin/EvaAdmin.jsx';
import GeneralAdmin from './pages/admin/GeneralAdmin.jsx';
import LeaderAdmin from './pages/admin/LeaderAdmin.jsx';

import ProtectedRoute from './components/ProtectedRoute.jsx';

export default function App() {
  return (
    <Routes>
      {/* ============ ՀԱՆՐԱՅԻՆ ԷՋԵՐ ============ */}
      <Route
        path="/"
        element={
          <>
            <Navbar />
            <Home />
            <Footer />
          </>
        }
      />

      <Route
        path="/yana"
        element={
          <>
            <Navbar />
            <YanaPanel />
            <Footer />
          </>
        }
      />

      <Route
        path="/eva"
        element={
          <>
            <Navbar />
            <EvaPanel />
            <Footer />
          </>
        }
      />

      <Route
        path="/game"
        element={
          <>
            <Navbar />
            <GamePage />
            <Footer />
          </>
        }
      />

      {/* ============ LOGIN ============ */}
      <Route path="/admin/login" element={<Login />} />

      {/* ============ ADMIN PANELS (Protected) ============ */}
      <Route
        path="/admin/yana"
        element={
          <ProtectedRoute roles={['yana']}>
            <YanaAdmin />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/eva"
        element={
          <ProtectedRoute roles={['eva']}>
            <EvaAdmin />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/general"
        element={
          <ProtectedRoute roles={['general']}>
            <GeneralAdmin />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/leader"
        element={
          <ProtectedRoute roles={['leader']}>
            <LeaderAdmin />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}