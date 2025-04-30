import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MoviesPage from './pages/MoviesPage';
import { ProtectedRoute } from './ProtectedRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/movies" element={
          <ProtectedRoute>
            <MoviesPage />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
