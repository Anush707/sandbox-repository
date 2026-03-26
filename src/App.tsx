import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserList } from './pages/UserList';
import { UserProfile } from './pages/UserProfile';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/user/:id" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
}